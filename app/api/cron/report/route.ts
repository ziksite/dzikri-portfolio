import { NextResponse, type NextRequest } from "next/server";
import {
  DAY_MS,
  WIB_OFFSET_MS,
  articleTable,
  delta,
  leadSummary,
  list,
  loadActivity,
  topCounts,
  visits,
  wibDayStart,
  within,
} from "@/lib/site-stats";
import { escapeHtml, sendTelegram } from "@/lib/telegram";

export const runtime = "nodejs";

// Daily job (vercel.json, ~07:00 WIB): yesterday's summary to Telegram, plus a 7-day recap on Mondays
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const today = wibDayStart(now);
  const yesterday = new Date(today.getTime() - DAY_MS);
  const dayBefore = new Date(today.getTime() - 2 * DAY_MS);
  const isMonday = new Date(now.getTime() + WIB_OFFSET_MS).getUTCDay() === 1;
  const rangeStart = isMonday ? new Date(today.getTime() - 14 * DAY_MS) : dayBefore;
  const { views, leads } = await loadActivity(rangeStart, today);

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
      "<b>Performa artikel</b>",
      articleTable(wViews, wLeads, 5),
      "",
      "<b>Sumber trafik</b>",
      list(topCounts(wViews.map((v) => v.referrer_host || "langsung / tidak diketahui"), 5))
    );
  }

  await sendTelegram(lines.join("\n"));
  return NextResponse.json({ ok: true });
}
