import "server-only";
import { supabase } from "@/lib/supabase";
import { escapeHtml } from "@/lib/telegram";

// Site stats for the Telegram reports and the /stats command, from the first-party tracking
// tables (page_views, leads). Days are WIB (UTC+7).
export const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
export const DAY_MS = 24 * 60 * 60 * 1000;

type View = { path: string; referrer_host: string; visitor_hash: string; created_at: string };
type Lead = { method: string; location: string; path: string; created_at: string };

export function wibDay(date: Date) {
  return new Date(date.getTime() + WIB_OFFSET_MS).toISOString().slice(0, 10);
}

// Start of the WIB day containing `date`, as a UTC instant
export function wibDayStart(date: Date) {
  return new Date(Date.parse(wibDay(date)) - WIB_OFFSET_MS);
}

// Supabase returns at most 1000 rows per request, so page through the range
async function fetchRange<T>(table: string, columns: string, from: Date, to: Date): Promise<T[]> {
  const rows: T[] = [];
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await supabase()
      .from(table)
      .select(columns)
      .gte("created_at", from.toISOString())
      .lt("created_at", to.toISOString())
      .order("created_at")
      .range(offset, offset + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...(data as T[]));
    if (!data || data.length < 1000) return rows;
  }
}

export async function loadActivity(from: Date, to: Date) {
  const [views, leads] = await Promise.all([
    fetchRange<View>("page_views", "path,referrer_host,visitor_hash,created_at", from, to),
    fetchRange<Lead>("leads", "method,location,path,created_at", from, to),
  ]);
  return { views, leads };
}

export function within<T extends { created_at: string }>(rows: T[], from: Date, to: Date) {
  return rows.filter((r) => {
    const t = Date.parse(r.created_at);
    return t >= from.getTime() && t < to.getTime();
  });
}

// Unique visitors per WIB day, summed: the visitor hash rotates daily, so this counts visits
export function visits(views: View[]) {
  return new Set(views.map((v) => `${wibDay(new Date(v.created_at))}|${v.visitor_hash}`)).size;
}

export function topCounts(values: string[], limit: number) {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

export function delta(current: number, previous: number) {
  const diff = current - previous;
  if (diff === 0) return "= sama";
  return `${diff > 0 ? "▲ +" : "▼ "}${diff}`;
}

export function leadSummary(leads: Lead[]) {
  if (!leads.length) return "0";
  const wa = leads.filter((l) => l.method === "whatsapp").length;
  return `${leads.length} (WhatsApp ${wa}, Email ${leads.length - wa})`;
}

export function list(rows: [string, number][]) {
  return rows.length ? rows.map(([k, n], i) => `${i + 1}. ${escapeHtml(k)} — ${n}`).join("\n") : "–";
}

const isArticle = (path: string) => /^\/(id\/)?blog\/[^/]+$/.test(path);

// Views and leads per article page, most-read first
export function articleTable(views: View[], leads: Lead[], limit: number) {
  const rows = topCounts(views.filter((v) => isArticle(v.path)).map((v) => v.path), limit);
  if (!rows.length) return "–";
  return rows
    .map(([path, n], i) => {
      const l = leads.filter((x) => x.path === path).length;
      return `${i + 1}. ${escapeHtml(path.replace(/^\/(id\/)?blog\//, ""))} — ${n} dilihat${l ? `, ${l} lead` : ""}`;
    })
    .join("\n");
}

// Today so far + the last 7 days, for the /stats command
export async function statsMessage(now = new Date()) {
  const today = wibDayStart(now);
  const weekStart = new Date(today.getTime() - 6 * DAY_MS);
  const { views, leads } = await loadActivity(weekStart, now);
  const tViews = within(views, today, now);
  const tLeads = within(leads, today, now);
  return [
    "📈 <b>Statistik dzikriramadhan.com</b>",
    "",
    "<b>Hari ini (sejauh ini)</b>",
    `Pengunjung: <b>${visits(tViews)}</b> · Halaman dilihat: ${tViews.length}`,
    `Lead: <b>${leadSummary(tLeads)}</b>`,
    "",
    "<b>7 hari terakhir</b>",
    `Kunjungan: <b>${visits(views)}</b> · Halaman dilihat: ${views.length}`,
    `Lead: <b>${leadSummary(leads)}</b>`,
    "",
    "<b>Halaman terpopuler</b>",
    list(topCounts(views.map((v) => v.path), 5)),
    "",
    "<b>Artikel terpopuler</b>",
    articleTable(views, leads, 3),
  ].join("\n");
}
