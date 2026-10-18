# Design System — Rona Body & Paint

File: `public/prototypes/ds/car-body-paint-workshop-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/jobber-field-service*.png` | Pita navy dengan teks hero kiri + mozaik foto kanan yang terpotong di atas (caption bergaris tegak putih: judul tebal + subjudul), tombol persegi tebal (isi warna aksi + garis 2px), baris bukti rating di bawah CTA, tab pill "Get Noticed / Win Jobs" dengan tab aktif putih bergaris navy, panel terbelah (kiri abu berisi tangkapan layar/foto, kanan judul + teks + tombol navy berteks warna aksi), pita navy berisi stiker fakta miring + form inline (input + tombol), ubin industri abu (ikon kiri atas, label bawah), blok kutipan navy gelap, font display geometris tebal |
| `_design-reference/dashboard/dispatch-27440437-field-service-management-erp-solution.jpg` (CoatOps) | Laporan progres harian: kartu proyek (foto persegi + judul + tag WO + status) dengan cincin progres, deret metrik bergaris pemisah, "Photo Documentation" bernomor dengan centang hijau di pojok foto, "Quality Checklist" dua kolom, "Activity Timeline" dengan ikon bulat berwarna, kotak "Deficiency/Issue" oranye dengan tombol aksi, sidebar putih dengan item aktif biru muda, tombol utama biru |

Kenapa: bisnisnya bengkel jasa (field-service), jadi halaman publik meniru produk software jasa lapangan (Jobber) yang memang menjual "dari estimasi sampai pembayaran"; sisi pelanggan-selama-perbaikan dan papan bengkel meniru CoatOps yang sama-sama tentang pekerjaan coating/cat dengan dokumentasi foto per tahap. Pasangan ini belum dipakai situs lain (Fresha+Cal.com dan Airbnb+Pushost dihindari).

Tidak diambil: latar kertas krem bertekstur dan tepi sobek Jobber (diganti putih + abu dingin `--soft`), hijau lime Jobber (diganti emas brand asli yang dijenuhkan), widget cuaca & tanda tangan CoatOps.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--navy` | #0C2A36 | Pita hero, footer, teks utama, tombol gelap, chip aktif |
| `--amber` | #F2B31D | Aksi utama (emas brand asli dijenuhkan), panel terpilih di SVG mobil, teks di tombol navy |
| `--soft` / `--tile` | #F1F4F5 / #E7ECEE | Section abu dingin, ubin layanan, latar panel foto |
| `--line` / `--line-2` | #DDE3E6 / #C9D2D6 | Garis kartu, field, segmented |
| `--ink-2` | #4A5D66 | Meta |
| `--blue` | #1F5FD6 | Status "sedang dikerjakan", tombol aplikasi (dari CoatOps) |
| `--green` / `--orange` / `--red` | #17824A / #C56A06 / #C8322B | Selesai & asuransi / perlu persetujuan / lewat target |
| Font | Figtree 700–800 (judul, tombol), Inter 400–700 (teks) | Figtree = padanan Google terdekat untuk display geometris Jobber |
| Radius | 4 (tombol, field, opsi), 6 (foto), 10 (kartu aplikasi), pill (tab) | |
| Bayangan | Hanya 1px di kartu aplikasi | |

Skala teks: hero 60 · h1 40 · h2 30 · h3 20 · h4 16 · body 15 · meta 14 · small 13.

## Komponen
Publik: `topbar` · `header` · `btn-primary/outline/dark/line` · `hero` + `mosaic` + `shot` (caption bergaris) · `proof` · `pills` (tab) · `split` + `price-rows` · `sizes` (S/M/L) · `car` (SVG mobil tampak atas, dipakai juga di estimasi) · `facts` + `sticker` · `inline-form` · `tiles` · `quote` · `branches` · `footer`

Estimasi: `steps` · `block` (bernomor 01–04) · `opts` (kartu pilihan, aktif bergaris navy + garis bawah emas) · `seg` (segmented persegi) · `car--pick` · `drop` · `dates` (slot per hari) · `note` · `quote-card` (kepala navy, baris panel S/M/L, kisaran total)

Aplikasi: `app-top` · `card` · `job` + `ring` + `kpis` · `stages` (foto bernomor + centang) · `table` · `checks` · `timeline` + `tl__ic` · `approve` · `kvs` · `shop` + `side` · `booths` · `chip` filter · `board` + `col` + `jc` (kartu kanban: plat, mobil, panel, teknisi, target, foto, tombol pindah)

## Aturan
- Halaman publik: navy + putih + abu dingin, emas hanya untuk aksi dan panel terpilih. Tidak ada krem, gradien dekoratif, atau blob (satu-satunya gradien adalah bayangan bawah foto untuk keterbacaan caption).
- Tombol publik persegi radius 4 dengan font display tebal; tombol aplikasi pakai biru CoatOps radius 8.
- Harga selalu ditulis sebagai kisaran per ukuran panel, dengan catatan bahwa harga final ditetapkan saat inspeksi.
- Warna status hanya di tag, ikon timeline, dan titik kolom kanban.
