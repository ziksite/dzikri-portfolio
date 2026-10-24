import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";

// Haiku for now (the user's choice, to try the cheapest model first); switch to "claude-opus-5-5"
// ($4 / $20 per MTok) if the drafts need better writing
const MODEL = "claude-haiku-5-5";
// Claude Haiku 5.5 list prices per million tokens (prompts under 100K), for the cost line in the Telegram reply
const PRICE_INPUT = 0.1;
const PRICE_OUTPUT = 0.5;

const ArticleSchema = z.object({
  title: z.string().describe("Judul artikel dalam bahasa Indonesia, maksimal ~90 karakter"),
  slug: z.string().describe("Slug URL dalam bahasa Inggris, huruf kecil, kata dipisah tanda hubung"),
  excerpt: z.string().describe("Ringkasan 1–2 kalimat (maks ~220 karakter) untuk kartu blog dan meta description"),
  tags: z.array(z.string()).describe("1–2 tag; pakai tag yang sudah ada bila cocok"),
  content_html: z.string().describe("Isi artikel dalam HTML"),
  cover_alt: z.string().describe("Alt text singkat untuk foto sampul; string kosong jika tidak ada foto"),
});

export type GeneratedArticle = z.infer<typeof ArticleSchema>;

const SYSTEM = `Kamu menulis artikel blog untuk dzikriramadhan.com, website pribadi Dzikri Ramadhan — web developer di Jakarta yang membuat website, aplikasi bisnis, dan otomasi AI untuk perusahaan.

Pembaca: pemilik bisnis, founder, dan kepala divisi (usia ~35–44) yang bisnisnya sudah berjalan tetapi proses atau penjualan digitalnya mandek. Mereka sibuk dan skeptis terhadap hype.

Gaya:
- Bahasa Indonesia yang rapi dan natural, sudut pandang orang pertama ("saya"), menyapa pembaca dengan "Anda" bila perlu.
- Tenang dan analitis: sebut masalah yang spesifik, dampaknya jika dibiarkan, lalu langkah praktisnya beserta trade-off.
- Tanpa bahasa hype, clickbait, atau klaim berlebihan. Hindari kata seperti "revolusioner", "luar biasa", "game-changer".
- Panjang 500–800 kata.

Aturan isi:
- JANGAN mengarang angka, statistik, persentase, nama klien, nama perusahaan, atau hasil proyek. Jika butuh contoh, buat umum ("sebuah bisnis distribusi") tanpa angka yang terdengar seperti data nyata.
- Gunakan hanya fakta yang diberikan pengguna atau pengetahuan umum yang aman.
- Akhiri dengan bagian penutup berisi langkah konkret yang bisa langsung dilakukan pembaca.

Format content_html:
- Hanya tag: <p>, <h2>, <h3>, <strong>, <em>, <ul>, <ol>, <li>, <blockquote>, <a href>.
- Jangan sertakan judul (<h1>) maupun foto sampul; keduanya ditampilkan terpisah.
- 3–5 bagian <h2>. Paragraf pendek (2–4 kalimat).`;

export async function writeArticle({
  brief,
  existingTags,
  photo,
}: {
  brief: string;
  existingTags: string[];
  photo?: { base64: string; mediaType: "image/jpeg" | "image/png" | "image/webp" };
}) {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY belum dipasang di Vercel.");
  const client = new Anthropic();
  const content: Anthropic.ContentBlockParam[] = [];
  if (photo) {
    content.push({ type: "image", source: { type: "base64", media_type: photo.mediaType, data: photo.base64 } });
  }
  content.push({
    type: "text",
    text: [
      "Tulis artikel blog dari brief berikut. Brief bisa berupa topik singkat atau catatan kasar — rapikan menjadi artikel utuh.",
      photo ? "Foto terlampir akan menjadi sampul artikel; tulis cover_alt yang mendeskripsikannya." : "Tidak ada foto sampul; isi cover_alt dengan string kosong.",
      `Tag yang sudah ada di blog: ${existingTags.length ? existingTags.join(", ") : "(belum ada)"}`,
      "",
      "<brief>",
      brief,
      "</brief>",
    ].join("\n"),
  });

  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high", format: zodOutputFormat(ArticleSchema) },
    system: SYSTEM,
    messages: [{ role: "user", content }],
  });

  if (response.stop_reason === "refusal") throw new Error("Permintaan ditolak oleh model.");
  if (response.stop_reason === "max_tokens") throw new Error("Artikel terpotong (batas token tercapai).");
  if (!response.parsed_output) throw new Error("Output AI tidak bisa dibaca.");

  const { input_tokens, output_tokens } = response.usage;
  const costUsd = (input_tokens * PRICE_INPUT + output_tokens * PRICE_OUTPUT) / 1_000_000;
  return { article: response.parsed_output, costUsd };
}
