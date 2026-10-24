import "server-only";
import { localePath, SITE_URL } from "@/lib/i18n";
import { refreshSite } from "@/lib/site-cache";
import { supabase } from "@/lib/supabase";
import { escapeHtml, sendTelegram } from "@/lib/telegram";

// Articles queued from the Telegram bot are published one per cron slot, oldest first.
// The two Vercel crons fire at about 08:00 and 16:00 WIB (vercel.json).
export const SLOT_HOURS_WIB = [8, 16];
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;

type Queued = { id: string; slug: string; title: string };

export async function getQueue(): Promise<Queued[]> {
  const { data, error } = await supabase()
    .from("articles")
    .select("id,slug,title")
    .eq("draft", true)
    .not("queued_at", "is", null)
    .order("queued_at");
  if (error) throw new Error(`Gagal membaca antrean: ${error.message}`);
  return data ?? [];
}

// The next `count` publish slots after `from`, as WIB labels like "Sen 27 Okt, 08.00"
export function nextSlots(count: number, from = new Date()) {
  const slots: string[] = [];
  const wibNow = new Date(from.getTime() + WIB_OFFSET_MS);
  for (let day = 0; slots.length < count; day++) {
    for (const hour of SLOT_HOURS_WIB) {
      const slot = new Date(Date.UTC(wibNow.getUTCFullYear(), wibNow.getUTCMonth(), wibNow.getUTCDate() + day, hour));
      if (slot.getTime() <= wibNow.getTime() || slots.length >= count) continue;
      const date = slot.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
      slots.push(`${date}, ${String(hour).padStart(2, "0")}.00`);
    }
  }
  return slots;
}

// Publishes the oldest queued draft, if any, and announces it. Returns what is left in the queue.
export async function publishNextQueued() {
  const [next] = await getQueue();
  if (!next) return { published: null, remaining: 0 };

  const today = new Date(Date.now() + WIB_OFFSET_MS).toISOString().slice(0, 10);
  const { error } = await supabase()
    .from("articles")
    .update({ draft: false, queued_at: null, published_at: today })
    .eq("id", next.id)
    .eq("draft", true);
  if (error) {
    await sendTelegram(`❌ Gagal menerbitkan dari antrean: ${escapeHtml(error.message)}`);
    return { published: null, remaining: -1 };
  }
  refreshSite();

  const remaining = (await getQueue()).length;
  await sendTelegram(
    [
      "✅ <b>Terbit otomatis dari antrean</b>",
      escapeHtml(next.title),
      `${SITE_URL}${localePath("id", `/blog/${next.slug}`)}`,
      "",
      remaining
        ? `Sisa antrean: ${remaining} artikel.`
        : "📭 Antrean sekarang kosong. Kirim topik atau /ide untuk mengisinya lagi.",
    ].join("\n")
  );
  return { published: next, remaining };
}

export async function queueMessage() {
  const queue = await getQueue();
  if (!queue.length) {
    return { text: "📭 <b>Antrean kosong</b>\nBelum ada artikel yang siap terbit. Tekan 📥 Antrean di pratinjau artikel untuk menambahkannya.", queue };
  }
  const slots = nextSlots(queue.length);
  const lines = queue.map((a, i) => `${i + 1}. ${escapeHtml(a.title)}\n    🕗 ${slots[i]} WIB`);
  return { text: [`📥 <b>Antrean terbit (${queue.length})</b>`, "", ...lines].join("\n"), queue };
}
