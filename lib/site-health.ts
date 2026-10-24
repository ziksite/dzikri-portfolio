import "server-only";
import { SITE_URL } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { escapeHtml } from "@/lib/telegram";

// Pages that must answer 200 for the site to count as healthy
const PAGES = ["/", "/id", "/hire", "/projects", "/id/blog", "/sitemap.xml"];
const DOMAIN_WARN_DAYS = 45;

async function checkPage(path: string) {
  try {
    const res = await fetch(`${SITE_URL}${path}`, { cache: "no-store", redirect: "manual", signal: AbortSignal.timeout(10000) });
    return res.status === 200 ? null : `${path} → HTTP ${res.status}`;
  } catch (err) {
    return `${path} → ${err instanceof Error ? err.message : "tidak bisa diakses"}`;
  }
}

// Registration expiry from the .com registry (RDAP); null if the lookup fails
async function domainExpiry() {
  try {
    const host = new URL(SITE_URL).hostname;
    const res = await fetch(`https://rdap.verisign.com/com/v1/domain/${host}`, { signal: AbortSignal.timeout(10000) });
    const json = (await res.json()) as { events?: { eventAction: string; eventDate: string }[] };
    const date = json.events?.find((e) => e.eventAction === "expiration")?.eventDate;
    return date ? new Date(date) : null;
  } catch {
    return null;
  }
}

// One line for the morning report when all is well; one line per problem otherwise
export async function healthLines() {
  const [pages, db, expiry] = await Promise.all([
    Promise.all(PAGES.map(checkPage)),
    supabase().from("projects").select("id").limit(1),
    domainExpiry(),
  ]);
  const problems = pages.filter((p): p is string => !!p);
  if (db.error) problems.push(`Database: ${db.error.message}`);

  const daysLeft = expiry ? Math.floor((expiry.getTime() - Date.now()) / 86_400_000) : null;
  const expiryLabel = expiry?.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  if (daysLeft !== null && daysLeft <= DOMAIN_WARN_DAYS) {
    problems.push(`Domain habis dalam ${daysLeft} hari (${expiryLabel}) — perpanjang di Hostinger`);
  }

  if (!problems.length) {
    return [`✅ Website sehat: ${PAGES.length} halaman & database OK${expiryLabel ? `, domain s/d ${expiryLabel}` : ""}`];
  }
  return ["⚠️ <b>Perlu dicek:</b>", ...problems.map((p) => `• ${escapeHtml(p)}`)];
}
