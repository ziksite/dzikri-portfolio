// Builds the default social share image (1200x630) from the profile photo: node scripts/generate-og-image.mjs
import sharp from "sharp";

const W = 1200, H = 630, PHOTO = 630 - 2 * 60;

const photo = await sharp("public/images/profile.jpeg")
  .resize(PHOTO, PHOTO, { fit: "cover", position: "top" })
  .composite([{ input: Buffer.from(`<svg width="${PHOTO}" height="${PHOTO}"><rect width="${PHOTO}" height="${PHOTO}" rx="28" fill="#fff"/></svg>`), blend: "dest-in" }])
  .png()
  .toBuffer();

const text = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .t { font-family: Inter, 'Segoe UI', Arial, sans-serif; fill: #fff; }
  </style>
  <text x="70" y="140" class="t" font-size="22" font-weight="700" letter-spacing="5" fill-opacity="0.55">HI, I'M</text>
  <text x="66" y="240" class="t" font-size="92" font-weight="900" letter-spacing="-3">DZIKRI</text>
  <text x="66" y="332" class="t" font-size="92" font-weight="900" letter-spacing="-3">RAMADHAN</text>
  <rect x="70" y="372" width="80" height="6" fill="#fff"/>
  <text x="70" y="430" class="t" font-size="30" font-weight="800" letter-spacing="2">TECHNOLOGY &amp; INNOVATION</text>
  <text x="70" y="478" class="t" font-size="22" font-weight="500" fill-opacity="0.65">Systems · Products · Automation · AI</text>
  <text x="70" y="568" class="t" font-size="20" font-weight="600" fill-opacity="0.45">dzikri.ziksite.my.id</text>
</svg>`;

await sharp({ create: { width: W, height: H, channels: 3, background: "#0f0f0f" } })
  .composite([
    { input: Buffer.from(text), top: 0, left: 0 },
    { input: photo, top: 60, left: W - PHOTO - 60 },
  ])
  .jpeg({ quality: 88 })
  .toFile("public/images/og-image.jpg");

console.log("Wrote public/images/og-image.jpg");
