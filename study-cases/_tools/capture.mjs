// node capture.mjs <slug> — screenshots each `shots` hash at 1440x900, adds the dark browser bar (→1440x944 webp)
import fs from "node:fs"; import path from "node:path";
import { chromium } from "playwright-core"; import sharp from "sharp";
const REPO = "D:/Jack x claude/jack porto";
const slug = process.argv[2];
const W = 1440, H = 900, BAR = 44;
const content = JSON.parse(fs.readFileSync(`${REPO}/study-cases/${slug}/content.json`, "utf8"));
const frame = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${BAR}"><rect width="${W}" height="${BAR}" fill="#141414"/><circle cx="22" cy="22" r="6" fill="#ff5f57"/><circle cx="42" cy="22" r="6" fill="#febc2e"/><circle cx="62" cy="22" r="6" fill="#28c840"/><rect x="96" y="12" width="1248" height="20" rx="10" fill="#2a2a2a"/></svg>`);
const outDir = `${REPO}/public/images/projects/${slug}`; fs.mkdirSync(outDir, { recursive: true });
const b = await chromium.launch({ executablePath: "C:/Users/dzikr/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe" });
const p = await b.newPage({ viewport: { width: W, height: H } });
p.on("pageerror", e => console.log("PAGEERROR", e.message));
await p.goto(`file:///${encodeURI(REPO)}/public/prototypes/${slug}.html`, { waitUntil: "networkidle" });
let i = 0;
for (const s of content.shots) {
  await p.evaluate(h => { location.hash = h; }, s.hash);
  await p.waitForTimeout(1200);
  await p.evaluate(() => document.fonts.ready);
  const missing = await p.evaluate(() => [...document.querySelectorAll("[data-screen].is-active .img[data-img]")].filter(e => !e.classList.contains("is-loaded")).length);
  if (missing) console.log(`  ! ${missing} images not loaded on #${s.hash}`);
  const png = await p.screenshot();
  const file = i === 0 ? "image.webp" : `gallery-${i}.webp`;
  await sharp({ create: { width: W, height: H + BAR, channels: 3, background: "#141414" } }).composite([{ input: frame, top: 0, left: 0 }, { input: png, top: BAR, left: 0 }]).webp({ quality: 84 }).toFile(path.join(outDir, file));
  console.log(file, "<- #" + s.hash); i++;
}
await b.close();
