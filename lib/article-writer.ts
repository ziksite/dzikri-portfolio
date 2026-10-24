import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { ARTICLE_CATEGORIES } from "@/lib/cms-types";

// Haiku for now (the user's choice, to try the cheapest model first); switch to "claude-opus-5-5"
// ($4 / $20 per MTok) if the drafts need better writing
const MODEL = "claude-haiku-5-5";
// Claude Haiku 5.5 list prices per million tokens (prompts under 100K), for the cost line in the Telegram reply
const PRICE_INPUT = 0.1;
const PRICE_OUTPUT = 0.5;

const ArticleSchema = z.object({
  focus_keyword: z.string().describe("Frasa kata kunci utama dalam bahasa Indonesia yang benar-benar diketik orang di Google, 2–5 kata"),
  title: z.string().describe("Judul bahasa Indonesia, 40–60 karakter, kata kunci utama di awal"),
  slug: z.string().describe("Slug bahasa Indonesia dari kata kunci utama, 3–6 kata, huruf kecil, dipisah tanda hubung, tanpa kata sambung"),
  excerpt: z.string().describe("Meta description 140–155 karakter, mengandung kata kunci utama, menjelaskan manfaat membaca"),
  category: z
    .enum(ARTICLE_CATEGORIES)
    .describe("Kategori blog: Website, Aplikasi Bisnis (kasir, stok, booking, sistem internal), AI Automation, atau Strategi Digital"),
  tags: z.array(z.string()).describe("1–2 tag; pakai tag yang sudah ada bila cocok"),
  content_html: z.string().describe("Isi artikel dalam HTML"),
  cover_alt: z.string().describe("Alt text singkat untuk foto sampul; string kosong jika tidak ada foto"),
});

export type GeneratedArticle = z.infer<typeof ArticleSchema>;

const SYSTEM = `Kamu menulis artikel blog untuk dzikriramadhan.com, website pribadi Dzikri Ramadhan — web developer di Jakarta yang membuat website, aplikasi bisnis, dan otomasi AI untuk perusahaan.

Pembaca: pemilik bisnis, founder, dan kepala divisi (usia ~35–44) yang bisnisnya sudah berjalan tetapi proses atau penjualan digitalnya mandek. Mereka sibuk, membaca dari HP, dan skeptis terhadap hype.

Suara:
- Bahasa Indonesia yang natural seperti praktisi yang bercerita ke klien, sudut pandang "saya", menyapa pembaca "Anda".
- Tenang, lugas, berbasis pengalaman. Tanpa hype atau klaim berlebihan.
- 500–750 kata. Variasikan panjang kalimat dan paragraf; paragraf maksimal 3 kalimat.

Struktur — pilih SATU format yang paling cocok dengan brief (jangan gabungkan semuanya):
1. Panduan langkah: urutan langkah bernomor (<ol>), tiap langkah singkat dan bisa langsung dikerjakan.
2. Checklist / kesalahan umum: tiap poin jadi <h2> pendek, isinya 1 paragraf + list tanda-tanda atau cara cek.
3. Perbandingan dua pilihan: satu <h2> per pilihan, masing-masing dengan list "Cocok jika" dan "Kurang cocok jika", lalu bagian cara memilih.
4. Cerita kasus: situasi awal → apa yang dicoba → apa yang berubah → pelajaran, dengan contoh umum tanpa nama klien.
5. Tanya-jawab: 4–6 pertanyaan yang benar-benar ditanyakan pemilik bisnis sebagai <h2>, jawaban singkat.

Elemen yang wajib ada agar enak dibaca:
- Pembuka 2–3 paragraf pendek yang langsung masuk ke situasi nyata pembaca (bukan definisi atau latar umum).
- Tepat setelah pembuka: <p><strong>Ringkasnya:</strong></p> diikuti <ul> berisi 3 poin inti.
- Minimal 2 list (<ul>/<ol>) di badan artikel.
- Satu <blockquote> berisi satu kalimat kunci yang layak dikutip.
- 1–2 link internal (<a href="...">) di tengah kalimat yang relevan, memakai URL persis dari daftar halaman internal. Anchor text deskriptif, bukan "klik di sini".
- Pakai <strong> untuk kata pembuka di awal poin atau paragraf penting, secukupnya.
- Penutup dengan subjudul yang spesifik (bukan "Kesimpulan" atau "Penutup"), berisi 1 langkah pertama yang bisa dilakukan minggu ini.

Larangan:
- Jangan pakai frasa template: "Trade-off-nya", "Langkah praktisnya adalah", "Berikut adalah", "Di era digital", "Kesimpulannya", "Dengan demikian", "Tidak dapat dipungkiri", "Mari kita bahas".
- Jangan mengulang pola yang sama di setiap bagian.
- JANGAN mengarang angka, statistik, persentase, nama klien, nama perusahaan, atau hasil proyek. Contoh dibuat umum ("sebuah bisnis distribusi") tanpa angka yang terdengar seperti data nyata.

SEO (tulis untuk manusia dulu, baru mesin pencari):
- Tentukan focus_keyword: frasa yang benar-benar diketik pemilik bisnis Indonesia di Google untuk topik ini (mis. "chatbot whatsapp untuk bisnis", "biaya bikin website company profile").
- focus_keyword muncul di judul (sebaiknya di awal), di kalimat pertama atau kedua artikel, dan di minimal satu <h2> (boleh variasi alami). Jangan dijejalkan.
- slug diturunkan dari focus_keyword dalam bahasa Indonesia, pendek, tanpa tahun dan tanpa kata seperti "dan", "yang", "untuk", "di".
- Link internal hanya ke URL dari daftar yang diberikan; jangan membuat URL sendiri.
- Jangan menulis ajakan menghubungi penulis atau tombol share; keduanya ditambahkan otomatis di bawah artikel.

Format content_html:
- Hanya tag: <p>, <h2>, <h3>, <strong>, <em>, <ul>, <ol>, <li>, <blockquote>, <hr>, <a href>. Tidak ada tabel.
- Jangan sertakan judul (<h1>) maupun foto sampul; keduanya ditampilkan terpisah.`;

export async function writeArticle({
  brief,
  existingTags,
  internalLinks,
  photo,
}: {
  brief: string;
  existingTags: string[];
  internalLinks: { title: string; url: string }[];
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
      "Halaman internal yang boleh ditautkan:",
      ...internalLinks.map((l) => `- ${l.title}: ${l.url}`),
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

const IdeasSchema = z.object({
  ideas: z
    .array(
      z.object({
        topic: z.string().describe("Topik artikel singkat dalam bahasa Indonesia, bisa langsung dipakai sebagai brief"),
        keyword: z.string().describe("Kata kunci yang diketik orang di Google, 2–5 kata"),
        angle: z.string().describe("Satu kalimat: sudut pandang atau manfaat bagi pembaca"),
      })
    )
    .describe("Tepat 5 ide"),
});

// Five article ideas tied to the services, avoiding topics the blog already covers
export async function suggestTopics(existingTitles: string[]) {
  if (!process.env.ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY belum dipasang di Vercel.");
  const client = new Anthropic();
  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 4000,
    thinking: { type: "adaptive" },
    output_config: { effort: "medium", format: zodOutputFormat(IdeasSchema) },
    system: `${SYSTEM.split("\n\n")[0]}

Layanan Dzikri: pembuatan website (company profile, landing page, toko online, custom), aplikasi & sistem bisnis (kasir, stok, booking, CRM, laporan), AI automation (chatbot WhatsApp, screening CV & leads, laporan otomatis), dan konsultasi website & digital.`,
    messages: [
      {
        role: "user",
        content: [
          "Usulkan 5 ide artikel blog yang akan dicari calon klien Dzikri di Google sebelum memutuskan memakai jasa seperti layanannya.",
          "Campur jenisnya: biaya/perbandingan, cara memilih, tanda butuh, kesalahan umum, dan panduan langkah. Sebar ke beberapa layanan.",
          "Jangan mengulang topik dari artikel yang sudah ada:",
          ...existingTitles.map((t) => `- ${t}`),
        ].join("\n"),
      },
    ],
  });
  if (!response.parsed_output) throw new Error("Output AI tidak bisa dibaca.");
  return response.parsed_output.ideas.slice(0, 5);
}
