import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";
import { escapeHtml, sendTelegram } from "@/lib/telegram";

export const runtime = "nodejs";

// Times are reported in WIB (UTC+7); the Vercel cron in vercel.json fires around 07:00 WIB
const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

type View = { path: string; referrer_host: string; visitor_hash: string; created_at: string };
type Lead = { method: string; location: string; created_at: string };

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

// Unique visitors per WIB day, summed: the visitor hash rotates daily, so this counts visits
function visits(views: View[]) {
  const seen = new Set(views.map((v) => `${wibDay(new Date(v.created_at))}|${v.visitor_hash}`));
  return seen.size;
}

function wibDay(date: Date) {
  return new Date(date.getTime() + WIB_OFFSET_MS).toISOString().slice(0, 10);
}

function topCounts(values: string[], limit: number) {
  const counts = new Map<string, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function delta(current: number, previous: number) {
  const diff = current - previous;
  if (diff === 0) return "= sama";
  return `${diff > 0 ? "▲ +" : "▼ "}${diff}`;
}

function leadSummary(leads: Lead[]) {
  if (!leads.length) return "0";
  const wa = leads.filter((l) => l.method === "whatsapp").length;
  return `${leads.length} (WhatsApp ${wa}, Email ${leads.length - wa})`;
}

function list(rows: [string, number][]) {
  return rows.length ? rows.map(([k, n], i) => `${i + 1}. ${escapeHtml(k)} — ${n}`).join("\n") : "–";
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Start of today in WIB, as a UTC instant
  const now = new Date();
  const today = new Date(Date.parse(wibDay(now)) - WIB_OFFSET_MS);
  const yesterday = new Date(today.getTime() - DAY_MS);
  const dayBefore = new Date(today.getTime() - 2 * DAY_MS);
  const isMonday = new Date(now.getTime() + WIB_OFFSET_MS).getUTCDay() === 1;
  const rangeStart = isMonday ? new Date(today.getTime() - 14 * DAY_MS) : dayBefore;

  const [views, leads] = await Promise.all([
    fetchRange<View>("page_views", "path,referrer_host,visitor_hash,created_at", rangeStart, today),
    fetchRange<Lead>("leads", "method,location,created_at", rangeStart, today),
  ]);
  const within = <T extends { created_at: string }>(rows: T[], from: Date, to: Date) =>
    rows.filter((r) => {
      const t = Date.parse(r.created_at);
      return t >= from.getTime() && t < to.getTime();
    });

  const yViews = within(views, yesterday, today);
  const pViews = within(views, dayBefore, yesterday);
  const yLeads = within(leads, yesterday, today);
  const dateLabel = yesterday.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "short", timeZone: "Asia/Jakarta" });
  const [topPage] = topCounts(yViews.map((v) => v.path), 1);

  const lines = [
    `📊 <b>dzikriramadhan.com — ${dateLabel}</b>`,
    `Pengunjung: <b>${visits(yViews)}</b> (${delta(visits(yViews), visits(pViews))} vs hari sebelumnya)`,
    `Halaman dilihat: ${yViews.length}`,
    `Lead: <b>${leadSummary(yLeads)}</b>`,
    `Terpopuler: ${topPage ? `${escapeHtml(topPage[0])} (${topPage[1]})` : "–"}`,
  ];

  if (isMonday) {
    const weekStart = new Date(today.getTime() - 7 * DAY_MS);
    const wViews = within(views, weekStart, today);
    const pwViews = within(views, rangeStart, weekStart);
    const wLeads = within(leads, weekStart, today);
    const pwLeads = within(leads, rangeStart, weekStart);
    lines.push(
      "",
      "🗓 <b>Rekap 7 hari</b>",
      `Kunjungan: <b>${visits(wViews)}</b> (${delta(visits(wViews), visits(pwViews))})`,
      `Halaman dilihat: ${wViews.length} (${delta(wViews.length, pwViews.length)})`,
      `Lead: <b>${leadSummary(wLeads)}</b> (${delta(wLeads.length, pwLeads.length)})`,
      "",
      "<b>Lead per tombol</b>",
      list(topCounts(wLeads.map((l) => l.location || "–"), 6)),
      "",
      "<b>Halaman terpopuler</b>",
      list(topCounts(wViews.map((v) => v.path), 5)),
      "",
      "<b>Sumber trafik</b>",
      list(topCounts(wViews.map((v) => v.referrer_host || "langsung / tidak diketahui"), 5))
    );
  }

  await sendTelegram(lines.join("\n"));
  return NextResponse.json({ ok: true });
}
