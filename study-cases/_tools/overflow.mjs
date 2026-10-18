import { chromium } from "playwright-core";
const [slug, hash] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: "C:/Users/dzikr/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe" });
const p = await b.newPage({ viewport: { width: 390, height: 800 } });
await p.goto(`file:///D:/Jack%20x%20claude/jack%20porto/public/prototypes/${slug}.html#${hash}`, { waitUntil: "networkidle" });
await p.waitForTimeout(400);
console.log(await p.evaluate(() => [...document.querySelectorAll("[data-screen].is-active *")].filter(e => e.getBoundingClientRect().right > 391 && e.offsetParent).slice(0, 12).map(e => e.tagName + "." + [...e.classList].join(".") + " r=" + Math.round(e.getBoundingClientRect().right) + " w=" + Math.round(e.getBoundingClientRect().width)).join("\n")));
await b.close();
