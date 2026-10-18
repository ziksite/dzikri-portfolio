import { chromium } from "playwright-core";
const slug = process.argv[2];
const b = await chromium.launch({ executablePath: "C:/Users/dzikr/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on("requestfailed", r => console.log("FAILED", r.url().slice(-60), r.failure()?.errorText));
await p.goto(`file:///D:/Jack%20x%20claude/jack%20porto/public/prototypes/${slug}.html`, { waitUntil: "networkidle" });
for (const t of [300, 3000]) {
  await p.waitForTimeout(t);
  console.log(t, await p.evaluate(() => { const all = [...document.querySelectorAll(".img[data-img]")]; return all.filter(e => e.classList.contains("is-loaded")).length + "/" + all.length + " | not: " + all.filter(e => !e.classList.contains("is-loaded")).map(e => e.dataset.img.split("/").pop()).join(", "); }));
}
await b.close();
