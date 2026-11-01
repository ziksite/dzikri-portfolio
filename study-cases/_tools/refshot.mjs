// Screenshot a live site as a design reference: node refshot.mjs <name> <url> <outDir>  → <name>.png (first screen) + <name>-full.png
import { chromium } from "playwright-core";
const [name, url, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36" })).newPage();
await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
await p.waitForTimeout(4500);
await p.screenshot({ path: `${out}/${name}.png` });
await p.evaluate(async () => { for (let y = 0; y < Math.min(document.body.scrollHeight, 9000); y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 180)); } window.scrollTo(0, 0); });
await p.waitForTimeout(800);
await p.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
await b.close();
