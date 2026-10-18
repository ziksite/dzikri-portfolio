// node patch.mjs <file> l,t,w,h [l,t,w,h ...]  — cover regions with feathered ellipse of nearby brightest color
import fs from "node:fs"; import sharp from "sharp";
const [file, ...rects] = process.argv.slice(2);
const src = fs.readFileSync(file);
const comps = [];
for (const r of rects) {
  const [box, at] = r.split("@");
  const [l, t, w, h] = box.split(",").map(Number);
  const cand = at ? [at.split(",").map(Number)] : [[l + 4, t - 14], [l + w - 14, t - 14], [l + 4, t + h + 4], [l + w - 14, t + h + 4], [l - 14, t + h / 2], [l + w + 4, t + h / 2]];
  let best = null;
  for (const [x, y] of cand) {
    if (x < 0 || y < 0) continue;
    const buf = await sharp(src).extract({ left: Math.round(x), top: Math.round(y), width: 10, height: 8 }).toBuffer();
    const c = (await sharp(buf).stats()).channels.slice(0, 3).map(v => Math.round(v.mean));
    const L = c[0] + c[1] + c[2];
    if (!best || L > best.L) best = { c, L };
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w + 24}" height="${h + 24}"><defs><filter id="f"><feGaussianBlur stdDeviation="4"/></filter></defs><ellipse cx="${(w + 24) / 2}" cy="${(h + 24) / 2}" rx="${w / 2 + 2}" ry="${h / 2 + 2}" fill="rgb(${best.c})" filter="url(#f)"/></svg>`;
  comps.push({ input: Buffer.from(svg), left: l - 12, top: t - 12 });
}
const out = await sharp(src).composite(comps).webp({ quality: 86 }).toBuffer();
fs.writeFileSync(file, out);
console.log("patched", file.split("/").pop(), rects.length);
