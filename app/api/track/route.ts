import { createHash } from "node:crypto";
import { after, NextResponse, type NextRequest } from "next/server";
import { SITE_URL } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { escapeHtml, sendTelegram } from "@/lib/telegram";

export const runtime = "nodejs";

const SITE_HOST = new URL(SITE_URL).host;
const BOT_UA = /bot|crawl|spider|slurp|headless|lighthouse|preview|monitor/i;
const LEAD_METHODS = new Set(["whatsapp", "email"]);
const done = () => new NextResponse(null, { status: 204 });

// Records a page view or a lead click sent by components/SiteTracker.tsx. Only real browsers on the
// production domain count; preview deploys, bots, other origins and the admin panel are ignored.
export async function POST(request: NextRequest) {
  if (process.env.VERCEL_ENV !== "production") return done();
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua)) return done();
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== SITE_HOST) return done();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  // English pages are rewritten to /en internally; store the public URL the visitor saw
  const rawPath = typeof body.path === "string" ? body.path.slice(0, 200) : "";
  const path = rawPath === "/en" ? "/" : rawPath.startsWith("/en/") ? rawPath.slice(3) : rawPath;
  if (!path.startsWith("/") || path.startsWith("/admin-cms")) return done();

  if (body.type === "view") {
    // A visitor id that can't be linked across days or back to an IP: hash(salt, day, ip, ua)
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "";
    // WIB day, matching how app/api/cron/report groups visits
    const day = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const visitorHash = createHash("sha256")
      .update(`${process.env.TRACKING_SALT ?? ""}|${day}|${ip}|${ua}`)
      .digest("hex")
      .slice(0, 32);
    let referrerHost = "";
    try {
      const host = new URL(String(body.referrer)).hostname.replace(/^www\./, "");
      if (host !== SITE_HOST) referrerHost = host;
    } catch {}
    await supabase().from("page_views").insert({ path, referrer_host: referrerHost, visitor_hash: visitorHash });
    return done();
  }

  if (body.type === "lead" && LEAD_METHODS.has(String(body.method))) {
    const method = String(body.method);
    const location = typeof body.location === "string" ? body.location.slice(0, 50) : "";
    await supabase().from("leads").insert({ method, location, path });
    const label = method === "whatsapp" ? "WhatsApp" : "Email";
    after(() =>
      sendTelegram(`🔔 <b>Lead baru: ${label}</b>\nTombol: ${escapeHtml(location)}\nHalaman: ${escapeHtml(path)}`)
    );
    return done();
  }

  return NextResponse.json({ error: "Unknown event" }, { status: 400 });
}
