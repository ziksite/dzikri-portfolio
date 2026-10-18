# Brief Redesign Portfolio — wajib dibaca sebelum mengerjakan satu situs

Tujuan: mengambil website bisnis nyata (link), lalu membuat **redesign anonim** berupa prototype HTML statis yang terlihat seperti produk nyata, untuk dipajang di portfolio. Hasil yang sudah disetujui pemilik: `public/prototypes/multi-branch-barbershop-website.html` (contoh terbaik), `multi-specialty-clinic-website.html`, `villa-rental-booking-website.html`. Baca salah satunya + `ds/<slug>.css` + `study-cases/<slug>/design-system.md` sebagai contoh standar.

Tanggal hari ini: **Minggu, 18 Oktober 2026**. Semua tanggal contoh di prototype mengacu ke sini.

---

## 1. Output (per situs, `<slug>` diberikan)

| File | Isi |
|------|-----|
| `public/prototypes/ds/<slug>.css` | Design system situs ini (token + komponen), mandiri |
| `public/prototypes/<slug>.html` | Prototype 4 layar |
| `public/prototypes/assets/<slug>/*.webp` | Foto dari situs asli (sudah dicek & dianonimkan) |
| `study-cases/<slug>/design-system.md` | Referensi yang dipakai + token + komponen + aturan (format sama dengan contoh) |
| `study-cases/<slug>/plan.md` | Sumber, audit situs asli (tabel temuan → dampak), arah redesign, tabel layar, tech stack rencana, catatan foto |
| `study-cases/<slug>/content.json` | Konten portfolio EN + ID (skema di §7) |
| `public/images/projects/<slug>/image.webp` + `gallery-1..3.webp` | Screenshot portfolio via `capture.mjs` |

**Jangan** menjalankan seed CMS, build, git commit, atau deploy. Itu dikerjakan koordinator.

## 2. Tools (`study-cases/_tools/`, jalankan dengan `node <path>`)

- `scrape.mjs <url> <outPrefix>` → `<outPrefix>.json` (teks, gambar, link, warna, font), `.txt`, `-full.png`. Simpan di `study-cases/_tools/out/<slug>/src/`.
- `proto-shot.mjs <slug> <hash...>` → screenshot ke `_tools/out/<slug>/`. `W=390 FULL=1` untuk mobile full page. Cetak `scrollWidth` (harus 1440 / 390).
- `overflow.mjs <slug> <hash>` → elemen yang melebihi 390px.
- `patch.mjs <file.webp> l,t,w,h[@sx,sy] ...` → tutup logo/bordiran dengan warna sekitar (sample dari titik sx,sy).
- `capture.mjs <slug>` → screenshot portfolio berbingkai dari `content.json.shots`.
- Untuk melihat gambar: perkecil dulu dengan sharp (`node -e` di folder `_tools`), lalu baca file hasilnya.
- Unduh foto dengan `curl -A "Mozilla/5.0 ... Chrome/140 Safari/537.36"`, **maksimal 6 paralel**. Ambil versi ukuran asli (hapus akhiran `-300x300` dsb. pada WordPress).

## 3. Anonimitas (wajib)

- Nama brand → **nama fiktif**, tampil sebagai **wordmark teks saja** (tanpa ikon/kotak inisial/logo).
- Nama orang nyata (pemilik, dokter, staf, pelanggan, pemegang rekening) → fiktif. Waspadai nama yang bocor dari data (rekening bank, testimoni, footer PT).
- Telepon, email, domain, nomor rekening, alamat lengkap → fiktif / disamarkan (cukup kota/kawasan).
- Harga, produk, layanan, spesifikasi dari situs asli **boleh dipakai apa adanya**.
- Kota/kawasan cabang: **ganti** ke kota lain yang masuk akal (kombinasi kota cabang asli bisa mengidentifikasi brand). Hal yang sama untuk nama kampus/sekolah lokal yang khas wilayah asli.
- `content.json`: `client` = "Confidential", judul generik per industri, tanpa nama brand.

## 4. Foto

- Pakai foto asli situs. Periksa **setiap** foto yang dipakai (zoom) untuk logo, papan nama, watermark, bordiran, teks brand.
- **Foto ber-watermark: jangan dipakai dan jangan hapus watermark-nya.** Cap/stempel logo toko yang ditempel di foto produk (termasuk di area kosong) juga dihitung watermark: jangan crop, lewati fotonya.
- Papan nama/logo di bangunan atau kaca: jangan pakai fotonya, atau crop bagian itu.
- Bordiran/logo kecil di seragam, sprei, kemasan: boleh ditutup dengan `patch.mjs`, cek hasilnya.
- Banner promo yang berisi teks/logo, foto testimoni pelanggan, foto selebriti: jangan dipakai.
- Selain crop dan `patch.mjs` untuk logo/bordiran, **jangan mengedit piksel foto** (tidak meratakan latar, tidak menghapus pola/noise). Kalau ragu ada watermark samar, lewati fotonya.
- Konversi ke webp lebar maks 1600 (`sharp`), nama file deskriptif.
- Kalau foto bersih kurang, rancang layout yang butuh lebih sedikit foto. Jangan pakai foto stok dari luar.

## 5. Design system per situs (inti pekerjaan)

1. Pilih **1–2 referensi produk nyata** dari `study-cases/_design-reference/{landing,flow-form,dashboard}` yang paling cocok dengan model bisnisnya. Lihat referensinya di resolusi cukup besar (crop + zoom) sebelum menulis CSS.
2. Turunkan token (warna, font Google yang paling mirip, skala teks, radius, bayangan) dan pola komponen **dari referensi itu**. Warna aksi boleh diganti warna brand asli situs (dijenuhkan, rata, tanpa gradien).
3. Struktur halaman mengikuti pola produk referensi, bukan komposisi bebas.
4. CSS mandiri di `ds/<slug>.css`. **Jangan** memuat `_ds/lapak.css`. Hindari referensi yang sudah dipakai berpasangan di situs lain kalau ada alternatif yang cocok, supaya portfolio tidak seragam.

**Dilarang (dinilai "AI slop" oleh pemilik):** latar krem/kertas, serif miring besar sebagai gaya utama, label kecil huruf kapital berjarak lebar di mana-mana, titik hijau "live" berdenyut, angka raksasa miring, metafora tiket/boarding pass/papan keberangkatan, gradien ungu-biru, blob, glassmorphism, latar pastel area besar, palet "earthy" kusam, emoji sebagai ikon, ilustrasi 3D, grid 3 fitur "ikon dalam lingkaran + judul + 1 kalimat", hero rata tengah dengan statistik palsu, copy "solusi terbaik/revolusioner/seamless", kerangka yang sama untuk semua situs (hero kiri + search bar + grid kartu + form kiri ringkasan kanan + sidebar 4 KPI).

## 6. Prototype

- `<html lang="id">`, Google Fonts sesuai DS, `ds/<slug>.css`, Lucide `https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js`, lalu `_ds/lapak.js`.
- CSS wajib berisi: `[data-screen]{display:none} [data-screen].is-active{display:block}` dan `[hidden]{display:none!important}`.
- `lapak.js` menyediakan: router `data-screen` + link `#hash` (layar pertama default, `data-nav` untuk menu aktif), `data-select` (pilih satu; `data-select="is-selected"` untuk nama kelas lain; event `lapak:select`), `data-stepper` + `data-inc` (event `lapak:change`), `form[data-demo-form="#idSukses"]` (submit → form disembunyikan, elemen sukses ditampilkan), `window.rupiah()`. Pemuat foto **tidak** dipakai; tulis sendiri: `document.querySelectorAll(".photo[data-img]").forEach(...)` yang menambahkan `<img>` ke box.
- **4 layar**: beranda + 2 layar alur utama pelanggan (mis. katalog/detail/booking/checkout/lacak/simulasi) + 1 layar operasional/admin **yang bentuknya berbeda dari situs lain** (tablet kasir, tampilan HP petugas, papan TV, kalender, kanban, dsb.) atau layar pelanggan ke-3 kalau admin tidak masuk akal.
- Konten Bahasa Indonesia, angka & nama realistis untuk skala bisnisnya. CTA WhatsApp ke `#`.
- Interaksi secukupnya dan benar-benar berfungsi (pilihan, stepper, total berubah, sukses).

## 7. `content.json`

```json
{
  "slug": "<slug>", "kind": "Website", "industry": "<salah satu INDUSTRIES di lib/cms-types.ts>",
  "client": "Confidential", "tags": ["Next.js|Laravel|WordPress", "...", "...", "..."],
  "metrics": [{ "value": "", "label": "UPPERCASE EN", "labelId": "UPPERCASE ID" }],
  "shots": [{ "hash": "home", "caption": "EN", "captionId": "ID" }, "... 4 total, home pertama"],
  "content_en": { "title": "", "type": "UPPERCASE SHORT", "category": "", "summary": "", "challenge": "2 paragraf dipisah \n\n", "solution": "2 paragraf, sebut stack rencana di akhir", "features": ["7 item"], "role": "", "impact": "", "testimonial": "" },
  "content_id": { "...sama, Bahasa Indonesia..." }
}
```
Nada tenang dan faktual, tanpa angka hasil yang dikarang. `kind` biasanya "Website" (atau "Web App" kalau intinya aplikasi).

## 8. Verifikasi sebelum lapor

1. `proto-shot.mjs <slug> <4 hash>` → lihat keempat screenshot 1440×900. Layar pertama tiap hash harus tampak "jadi".
2. `W=390 FULL=1 proto-shot.mjs ...` → `scrollWidth` 390 untuk semua layar (overflow di dalam container yang memang bisa di-scroll tidak apa-apa). Perbaiki dengan `overflow.mjs`.
3. Tidak ada `PAGEERROR`.
4. Cek ulang anonimitas: `grep -i` nama brand asli, nama orang, nomor telepon di html/json/md → harus kosong.
5. `capture.mjs <slug>` lalu lihat `image.webp`.

## 9. Laporan akhir (singkat)

slug · nama fiktif · industri · referensi yang dipakai dan alasannya · ringkasan 4 layar · foto yang dipakai/dilewati dan kenapa · hal yang perlu diperhatikan koordinator.
