import { after, NextResponse, type NextRequest } from "next/server";
import { writeArticle } from "@/lib/article-writer";
import { localePath, SITE_URL } from "@/lib/i18n";
import { toVisionJpeg, uploadImageAsWebp } from "@/lib/media";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { refreshSite } from "@/lib/site-cache";
import { slugify } from "@/lib/slugify";
import { supabase } from "@/lib/supabase";
import { articleToTelegramChunks, escapeHtml, sendTelegram, telegramApi } from "@/lib/telegram";

export const runtime = "nodejs";
// Writing an article takes a while; the work runs in after() once Telegram has its 200
export const maxDuration = 300;

const HELP = [
  "✍️ <b>Bot artikel dzikriramadhan.com</b>",
  "",
  "Kirim <b>foto + caption</b> berisi topik atau catatan kasar → saya tulis artikelnya, foto jadi sampul.",
  "Atau kirim <b>teks saja</b> (tanpa sampul).",
  "",
  "Hasilnya dikirim sebagai pratinjau dengan tombol <b>Publish</b> / <b>Hapus</b>; sampai kamu tekan Publish, artikel tetap draft.",
].join("\n");

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

type TelegramCallback = { id: string; from: { id: number }; data?: string; message?: { chat: { id: number }; message_id: number } };
type TelegramPhoto = { file_id: string; file_size?: number };
type TelegramMessage = {
  chat: { id: number };
  text?: string;
  caption?: string;
  media_group_id?: string;
  photo?: TelegramPhoto[];
  document?: { file_id: string; mime_type?: string };
};

// Webhook for the owner's Telegram bot. Telegram signs each call with the secret set in
// setWebhook; messages from any chat other than TELEGRAM_CHAT_ID are ignored.
export async function POST(request: NextRequest) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!secret || request.headers.get("x-telegram-bot-api-secret-token") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const update = (await request.json()) as { message?: TelegramMessage; callback_query?: TelegramCallback };
  const ok = NextResponse.json({ ok: true });
  if (update.callback_query) {
    await handleButton(update.callback_query);
    return ok;
  }
  const message = update.message;
  if (!message || String(message.chat.id) !== process.env.TELEGRAM_CHAT_ID) return ok;

  const brief = (message.text ?? message.caption ?? "").trim();
  const fileId =
    message.photo?.at(-1)?.file_id ??
    (message.document?.mime_type?.startsWith("image/") ? message.document.file_id : undefined);

  if (brief.startsWith("/start") || brief.startsWith("/help")) {
    after(() => sendTelegram(HELP));
    return ok;
  }
  if (!brief) {
    // Extra photos of an album arrive as separate captionless messages; only the captioned one counts
    if (!message.media_group_id) after(() => sendTelegram("Tambahkan topik atau catatan sebagai caption foto, ya."));
    return ok;
  }

  after(() => createDraft(brief, fileId));
  return ok;
}

async function createDraft(brief: string, fileId: string | undefined) {
  await sendTelegram("⏳ Sedang menulis artikel… (±1–2 menit)");
  try {
    const photo = fileId ? await downloadTelegramFile(fileId) : undefined;

    const { data: tagRows } = await supabase().from("articles").select("tags");
    const existingTags = [...new Set((tagRows ?? []).flatMap((r: { tags: string[] }) => r.tags))];
    const internalLinks = await getInternalLinks();

    const [{ article, costUsd }, coverImage] = await Promise.all([
      writeArticle({
        brief,
        existingTags,
        internalLinks,
        photo: photo && { base64: (await toVisionJpeg(photo)).toString("base64"), mediaType: "image/jpeg" },
      }),
      photo ? uploadImageAsWebp(photo, "articles") : Promise.resolve(""),
    ]);

    const slug = await uniqueSlug(slugify(article.slug) || slugify(article.title));
    const { data, error } = await supabase()
      .from("articles")
      .insert({
        slug,
        title: article.title,
        excerpt: article.excerpt,
        content_html: sanitizeArticleHtml(article.content_html),
        cover_image: coverImage,
        tags: article.tags.slice(0, 3),
        cover_alt: coverImage ? article.cover_alt : "",
        draft: true,
      })
      .select("id")
      .single();
    if (error) throw new Error(`Gagal menyimpan: ${error.message}`);

    // Preview in chat, then a control message whose buttons publish or delete the draft
    await sendTelegram(`🔎 Kata kunci: <b>${escapeHtml(article.focus_keyword)}</b>
URL: /id/blog/${slug}`);
    await sendTelegram(`📝 <b>${escapeHtml(article.title)}</b>

<i>${escapeHtml(article.excerpt)}</i>`);
    for (const chunk of articleToTelegramChunks(sanitizeArticleHtml(article.content_html))) await sendTelegram(chunk);
    await sendTelegram(`Publish artikel ini?
<i>Biaya AI: ±$${costUsd.toFixed(3)}</i>`, {
      buttons: [
        [
          { text: "✅ Publish", callback_data: `pub:${data.id}` },
          { text: "🗑 Hapus", callback_data: `del:${data.id}` },
        ],
        [{ text: "✏️ Edit di CMS dulu", url: `${SITE_URL}/admin-cms/articles/${data.id}` }],
      ],
    });
  } catch (err) {
    console.error("Article draft failed", err);
    await sendTelegram(`❌ Gagal membuat draft: ${escapeHtml(err instanceof Error ? err.message : String(err))}`);
  }
}

// Publish / delete buttons under a draft preview. Deleting only ever touches drafts, so a stale
// button can't remove a live article.
async function handleButton(query: TelegramCallback) {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (String(query.from.id) !== chatId || !query.message) return;
  const [action, id] = (query.data ?? "").split(":");
  const edit = (text: string) =>
    telegramApi("editMessageText", { chat_id: chatId, message_id: query.message!.message_id, text, parse_mode: "HTML" });
  let notice = "Sudah diproses.";

  if (UUID.test(id) && action === "pub") {
    const today = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10); // WIB date
    const { data } = await supabase()
      .from("articles")
      .update({ draft: false, published_at: today })
      .eq("id", id)
      .eq("draft", true)
      .select("slug,title")
      .maybeSingle();
    if (data) {
      refreshSite();
      notice = "Artikel tayang!";
      await edit(`✅ <b>Tayang</b>: ${SITE_URL}${localePath("id", `/blog/${data.slug}`)}`);
    }
  } else if (UUID.test(id) && action === "del") {
    const { data } = await supabase().from("articles").delete().eq("id", id).eq("draft", true).select("id").maybeSingle();
    if (data) {
      notice = "Draft dihapus.";
      await edit("🗑 Draft dihapus.");
    }
  }
  await telegramApi("answerCallbackQuery", { callback_query_id: query.id, text: notice });
}

// Pages the writer may link to: the hire page, services, and the featured projects (Indonesian titles)
async function getInternalLinks() {
  const { data } = await supabase()
    .from("projects")
    .select("slug, content_id")
    .eq("hidden", false)
    .order("sort_order")
    .limit(10);
  return [
    { title: "Jasa freelance web developer & AI automation (halaman kerja sama)", url: localePath("id", "/hire") },
    { title: "Layanan: website, aplikasi bisnis, AI automation, konsultasi", url: `${localePath("id", "/")}#services` },
    { title: "Portofolio proyek", url: localePath("id", "/projects") },
    ...(data ?? []).map((p: { slug: string; content_id: { title?: string } }) => ({
      title: `Studi kasus: ${p.content_id?.title ?? p.slug}`,
      url: localePath("id", `/projects/${p.slug}`),
    })),
  ];
}

// Telegram serves photos as JPEG; files above 20 MB can't be fetched through the Bot API
async function downloadTelegramFile(fileId: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const meta = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${encodeURIComponent(fileId)}`);
  const { result } = (await meta.json()) as { result?: { file_path?: string } };
  if (!result?.file_path) throw new Error("Foto tidak bisa diunduh dari Telegram.");
  const file = await fetch(`https://api.telegram.org/file/bot${token}/${result.file_path}`);
  if (!file.ok) throw new Error("Foto tidak bisa diunduh dari Telegram.");
  return Buffer.from(await file.arrayBuffer());
}

async function uniqueSlug(base: string) {
  const root = base.slice(0, 80) || "artikel";
  const { data } = await supabase().from("articles").select("slug").like("slug", `${root}%`);
  const taken = new Set((data ?? []).map((r: { slug: string }) => r.slug));
  if (!taken.has(root)) return root;
  for (let n = 2; ; n++) if (!taken.has(`${root}-${n}`)) return `${root}-${n}`;
}
