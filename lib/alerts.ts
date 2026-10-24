import "server-only";
import { supabase } from "@/lib/supabase";
import { escapeHtml, sendTelegram } from "@/lib/telegram";

const THROTTLE_MS = 30 * 60 * 1000;

// Sends an error alert to Telegram at most once per THROTTLE_MS for the same key, so a page that
// keeps failing produces one message instead of one per visitor
export async function alertOnce(key: string, lines: string[]) {
  const since = new Date(Date.now() - THROTTLE_MS).toISOString();
  const { data: recent } = await supabase().from("bot_alerts").select("key").eq("key", key).gte("last_sent", since).maybeSingle();
  if (recent) return;
  await supabase().from("bot_alerts").upsert({ key, last_sent: new Date().toISOString() });
  await sendTelegram(lines.map((l, i) => (i === 0 ? l : escapeHtml(l))).join("\n"));
}
