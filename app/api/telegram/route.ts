import { after, NextResponse, type NextRequest } from "next/server";
import { getQueue, nextSlots, queueMessage } from "@/lib/article-queue";
import { suggestTopics, writeArticle } from "@/lib/article-writer";
import { googleSuggest } from "@/lib/keyword-check";
import { localePath, SITE_URL } from "@/lib/i18n";
import { toVisionJpeg, uploadImageAsWebp } from "@/lib/media";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { refreshSite } from "@/lib/site-cache";
import { statsMessage } from "@/lib/site-stats";
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
  "",
  "/ide — 5 usulan topik artikel, tinggal tekan ✍️ untuk menulis",
  "/stats — pengunjung, lead, dan artikel terpopuler",
  "/antrean — artikel yang menunggu terbit otomatis (±08.00 & 16.00 WIB)",
].join("\n");

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

type TelegramCallback = {
  id: string;
  from: { id: number };
  data?: string;
  message?: { chat: { id: number }; message_id: number; text?: string };
};
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
  if (brief.startsWith("/stats")) {
    after(async () => {
      await sendTelegram(await statsMessage());
    });
    return ok;
  }
  if (brief.startsWith("/antrean")) {
    after(async () => {
      const { text, queue } = await queueMessage();
      await sendTelegram(text, {
        buttons: queue.length ? queue.map((a, i) => [{ text: `↩️ Keluarkan #${i + 1}`, callback_data: `unq:${a.id}` }]) : undefined,
      });
    });
    return ok;
  }
  if (brief.startsWith("/ide")) {
    after(sendIdeas);
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
        category: article.category,
        draft: true,
      })
      .select("id")
      .single();
    if (error) throw new Error(`Gagal menyimpan: ${error.message}`);

    // Preview in chat, then a control message whose buttons publish or delete the draft
    await sendTelegram(
      `🔎 Kata kunci: <b>${escapeHtml(article.focus_keyword)}</b>\n📁 Kategori: ${escapeHtml(article.category)}\nURL: /id/blog/${slug}`
    );
    await sendTelegram(`📝 <b>${escapeHtml(article.title)}</b>

<i>${escapeHtml(article.excerpt)}</i>`);
    for (const chunk of articleToTelegramChunks(sanitizeArticleHtml(article.content_html))) await sendTelegram(chunk);
    await sendTelegram(`Terbitkan artikel ini?\n<i>Biaya AI: ±$${costUsd.toFixed(3)}</i>`, { buttons: draftButtons(data.id) });
  } catch (err) {
    console.error("Article draft failed", err);
    await sendTelegram(`❌ Gagal membuat draft: ${escapeHtml(err instanceof Error ? err.message : String(err))}`);
  }
}

function draftButtons(id: string) {
  return [
    [
      { text: "✅ Publish sekarang", callback_data: `pub:${id}` },
      { text: "📥 Antrean", callback_data: `que:${id}` },
    ],
    [
      { text: "🗑 Hapus", callback_data: `del:${id}` },
      { text: "✏️ Edit di CMS", url: `${SITE_URL}/admin-cms/articles/${id}` },
    ],
  ];
}

// Publish / queue / delete buttons under a draft preview, and the remove buttons under /antrean.
// Every action only touches drafts, so a stale button can't change a live article.
async function handleButton(query: TelegramCallback) {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (String(query.from.id) !== chatId || !query.message) return;
  const [action, id] = (query.data ?? "").split(":");

  // "Tulis" under an idea list: the idea's text is read back from the message itself
  if (action === "idea") {
    const line = (query.message.text ?? "").split("\n").find((l) => l.startsWith(`${id}. `));
    await telegramApi("answerCallbackQuery", { callback_query_id: query.id, text: line ? "Menulis…" : "Ide tidak ditemukan." });
    if (line) after(() => createDraft(line.slice(id.length + 2), undefined));
    return;
  }

  const edit = (text: string, buttons?: ReturnType<typeof draftButtons>) =>
    telegramApi("editMessageText", {
      chat_id: chatId,
      message_id: query.message!.message_id,
      text,
      parse_mode: "HTML",
      ...(buttons ? { reply_markup: { inline_keyboard: buttons } } : {}),
    });
  let notice = "Sudah diproses.";

  if (UUID.test(id) && action === "que") {
    const { data } = await supabase()
      .from("articles")
      .update({ queued_at: new Date().toISOString() })
      .eq("id", id)
      .eq("draft", true)
      .select("title")
      .maybeSingle();
    if (data) {
      const queue = await getQueue();
      const position = queue.findIndex((a) => a.id === id) + 1;
      notice = `Masuk antrean #${position}`;
      await edit(
        `📥 <b>Masuk antrean #${position}</b>\n${escapeHtml(data.title)}\nPerkiraan terbit: ${nextSlots(position).at(-1)} WIB\n\nLihat semua: /antrean`,
        [[{ text: "↩️ Keluarkan dari antrean", callback_data: `unq:${id}` }]]
      );
    }
  } else if (UUID.test(id) && action === "unq") {
    const { data } = await supabase()
      .from("articles")
      .update({ queued_at: null })
      .eq("id", id)
      .eq("draft", true)
      .select("title")
      .maybeSingle();
    if (data) {
      notice = "Dikeluarkan dari antrean.";
      await edit(`↩️ <b>Dikeluarkan dari antrean</b> (tetap draft)\n${escapeHtml(data.title)}`, draftButtons(id));
    }
  } else if (UUID.test(id) && action === "pub") {
    const today = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10); // WIB date
    const { data } = await supabase()
      .from("articles")
      .update({ draft: false, queued_at: null, published_at: today })
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

async function sendIdeas() {
  await sendTelegram("💡 Mencari ide topik…");
  try {
    const [{ data: articles }, { data: past }] = await Promise.all([
      supabase().from("articles").select("title"),
      // The most recent suggestions are enough to keep new ideas fresh without an ever-growing prompt
      supabase().from("article_ideas").select("topic,keyword").order("created_at", { ascending: false }).limit(60),
    ]);
    const candidates = await suggestTopics(
      (articles ?? []).map((a: { title: string }) => a.title),
      (past ?? []).map((p: { topic: string; keyword: string }) => `${p.topic} (kata kunci: ${p.keyword})`)
    );

    // Keep the five with the clearest search demand (Google Autocomplete), unverified ones last
    const checked = await Promise.all(candidates.map(async (idea) => ({ ...idea, demand: await googleSuggest(idea.keyword) })));
    const ideas = checked.sort((a, b) => (b.demand?.variations ?? -1) - (a.demand?.variations ?? -1)).slice(0, 5);
    await supabase()
      .from("article_ideas")
      .insert(ideas.map((idea) => ({ topic: idea.topic, keyword: idea.keyword })));

    // Each numbered line is self-contained so the ✍️ button can turn it straight into a brief;
    // the demand note sits on its own line underneath
    const lines = ideas.flatMap((idea, i) => [
      escapeHtml(`${i + 1}. ${idea.topic} (kata kunci: ${idea.keyword}) — ${idea.angle}`),
      idea.demand?.searched
        ? `    ✅ Dicari di Google (${idea.demand.variations} variasi pencarian)`
        : idea.demand
          ? "    ⚪ Belum terdeteksi di saran Google — mungkin sangat jarang dicari"
          : "    ❔ Tidak bisa dicek",
      "",
    ]);
    await sendTelegram(["💡 <b>Ide artikel (kata kunci long-tail)</b>", "", ...lines].join("\n"), {
      buttons: [ideas.map((_, i) => ({ text: `✍️ ${i + 1}`, callback_data: `idea:${i + 1}` }))],
    });
  } catch (err) {
    await sendTelegram(`❌ Gagal membuat ide: ${escapeHtml(err instanceof Error ? err.message : String(err))}`);
  }
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
