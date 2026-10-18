// Upserts every study case (study-cases/<slug>/content.json) into the `projects` table.
// Usage: node scripts/seed-study-cases.mjs [--dry] [slug ...]
// Images are expected at /images/projects/<slug>/image.webp + gallery-N.webp (one per `shots` entry).
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { loadEnv, requireEnv } from "./env.mjs";

loadEnv();

// Valid kinds/industries come from lib/cms-types.ts (read as text so this stays a plain Node script)
const constList = (name) => {
  const src = fs.readFileSync(path.join(process.cwd(), "lib/cms-types.ts"), "utf8");
  const m = src.match(new RegExp(`export const ${name} = \\[([^\\]]*)\\]`));
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
};
const PROJECT_KINDS = constList("PROJECT_KINDS");
const INDUSTRIES = constList("INDUSTRIES");
const dry = process.argv.includes("--dry");
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

// Spread the study cases between the existing client projects (homepage keeps sort_order 10–20)
const ORDER = {
  "multi-branch-barbershop-website": 169,
  "multi-specialty-clinic-website": 168,
  "coffee-shop-digital-menu-preorder": 31,
  "daily-catering-subscription-app": 45,
  "motorcycle-workshop-service-booking": 55,
  "dental-clinic-appointment-system": 86,
  "barbershop-booking-membership-website": 95,
  "villa-direct-booking-website": 105,
  "building-material-store-pos-inventory": 115,
  "tutoring-center-class-portal": 125,
  "local-fashion-brand-preorder-store": 135,
  "print-shop-instant-quote-website": 145,
  "petshop-grooming-booking-app": 155,
  "umrah-travel-package-website": 167,
  "camping-gear-rental-availability-app": 175,
  "frozen-food-wholesale-ordering-app": 185,
  "gym-class-schedule-membership-app": 195,
  "farm-produce-b2b-preorder-website": 205,
  "ac-service-technician-booking-app": 215,
  "pharmacy-stock-check-prescription-website": 225,
  "local-courier-tracking-pickup-app": 235,
  "cooperative-member-portal-system": 240,
};

const root = path.join(process.cwd(), "study-cases");
const slugs = fs
  .readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(root, d.name, "content.json")))
  .map((d) => d.name)
  .filter((s) => only.length === 0 || only.includes(s));

const rows = [];
for (const slug of slugs) {
  const c = JSON.parse(fs.readFileSync(path.join(root, slug, "content.json"), "utf8"));
  const problems = [];
  if (c.slug !== slug) problems.push(`slug mismatch (${c.slug})`);
  if (!PROJECT_KINDS.includes(c.kind)) problems.push(`bad kind ${c.kind}`);
  if (!INDUSTRIES.includes(c.industry)) problems.push(`bad industry ${c.industry}`);
  if (!(slug in ORDER)) problems.push("no sort_order");
  if (!c.shots?.length || c.shots[0].hash !== "home") problems.push("shots must start with home");
  for (const lang of ["content_en", "content_id"]) {
    const t = c[lang] ?? {};
    for (const k of ["title", "type", "category", "summary", "challenge", "solution"]) if (!t[k]) problems.push(`${lang}.${k} empty`);
    if (!t.features?.length) problems.push(`${lang}.features empty`);
  }
  const imgDir = path.join(process.cwd(), "public/images/projects", slug);
  const gallery = c.shots.slice(1).map((s, i) => ({ image: `/images/projects/${slug}/gallery-${i + 1}.webp`, caption: s.caption, captionId: s.captionId }));
  for (const f of ["image.webp", ...gallery.map((_, i) => `gallery-${i + 1}.webp`)]) if (!fs.existsSync(path.join(imgDir, f))) problems.push(`missing ${f}`);
  if (problems.length) {
    console.error(`${slug}: ${problems.join("; ")}`);
    process.exitCode = 1;
    continue;
  }
  const text = (t) => ({ role: "", impact: "", testimonial: "", ...t });
  rows.push({
    slug,
    sort_order: ORDER[slug],
    hidden: false,
    kind: c.kind,
    industry: c.industry,
    status: "LIVE",
    client: c.client,
    year: "2026",
    image_url: `/images/projects/${slug}/image.webp`,
    image_contain: false,
    link: `/prototypes/${slug}.html`,
    tags: c.tags,
    metrics: c.metrics ?? [],
    gallery,
    content_en: text(c.content_en),
    content_id: text(c.content_id),
    updated_at: new Date().toISOString(),
  });
}

if (process.exitCode) process.exit();
console.log(`${rows.length} rows ready${dry ? " (dry run)" : ""}`);
if (dry) {
  for (const r of rows) console.log(`${String(r.sort_order).padStart(3)}  ${r.kind.padEnd(15)} ${r.industry.padEnd(24)} ${r.slug}`);
  process.exit();
}

const sb = createClient(requireEnv("SUPABASE_URL"), requireEnv("SUPABASE_SECRET_KEY"));
const { error } = await sb.from("projects").upsert(rows, { onConflict: "slug" });
if (error) {
  console.error(error);
  process.exit(1);
}
console.log("upserted:", rows.map((r) => r.slug).join(", "));
