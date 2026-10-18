import { chromium } from "playwright-core";
import sharp from "sharp";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const [slug, ...hashes] = process.argv.slice(2);
const W = Number(process.env.W || 1440);
const b = await chromium.launch({ executablePath: "C:/Users/dzikr/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe" });
const p = await b.newPage({ viewport: { width: W, height: 900 } });
p.on("pageerror", e => console.log("PAGEERROR", e.message));
p.on("console", m => { if (m.type() === "error" && !m.text().includes("ERR_FILE_NOT_FOUND")) console.log("CONSOLE", m.text()); });
p.on("requestfailed", r => { if (r.url().startsWith("file:")) console.log("MISSING", r.url().split("/prototypes/")[1]); });
await p.goto(`file:///D:/Jack%20x%20claude/jack%20porto/public/prototypes/${slug}.html`, { waitUntil: "networkidle" });
for (const h of hashes) {
  await p.evaluate(h => { location.hash = h; }, h);
  await p.waitForTimeout(1500); await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); }); await p.waitForTimeout(600);
  await p.evaluate(() => document.fonts.ready);
  const buf = await p.screenshot({ fullPage: process.env.FULL === "1" });
  const m = await sharp(buf).metadata();
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "out", slug); fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `pv-${h}${process.env.W ? "-" + W : ""}${process.env.FULL === "1" ? "-full" : ""}.jpg`);
  await sharp(buf).resize({ width: Math.min(m.width, 1100) }).jpeg({ quality: 80 }).toFile(out);
  console.log(out, m.width + "x" + m.height, "scrollWidth", await p.evaluate(() => document.documentElement.scrollWidth));
}
await b.close();
