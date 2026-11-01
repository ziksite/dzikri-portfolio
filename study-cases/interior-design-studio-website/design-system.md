# Design System — Sekat Interior

File: `public/prototypes/ds/interior-design-studio-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/orders-25822814-furniture-factory-admin-order-management.jpg` | Panel navy di atas halaman dengan 4 kartu data, status pill di kanan judul, satu kartu aksi terang, baris daftar bergaris radius 14, foto produk dengan nomor yang tertaut ke daftar komponen, kolom spesifikasi berbaris putih di atas kotak abu |
| `_design-reference/dashboard/orders-26895886-alignify-order-management-dashboard.jpg` | Tracker vertikal dengan kotak centang terhubung garis (dipakai untuk checklist HP), aksen merah-jingga, panel putih bergaris di atas abu dingin, tabel kepala abu kecil |

Tidak diambil: bayangan lembut dan kartu ikon sidebar Alignify, grafik garis, peta pengiriman.

Pola tambahan khas industri: **title block** gambar kerja, yaitu strip data bergaris di bawah foto (proyek, ruang, kota, luas, durasi), bukan caption biasa.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--navy` | #13233A | Panel atas, tombol gelap, sel selesai, pilihan aktif |
| `--navy-2` / `--navy-3` | #1E3250 / #2C4265 | Kartu di atas navy, garis di atas navy |
| `--on-navy` / `--on-navy-2` | #F4F6F9 / #A9B6C8 | Teks di atas navy |
| `--ink` / `--ink-2` | #14202F / #5A6778 | Teks utama, meta |
| `--line` | #DDE2E9 | Garis panel |
| `--soft` | #F0F2F5 | Abu dingin: latar seksi, kotak spesifikasi, sel belum mulai |
| `--act` / `--act-hover` | #D73C20 / #B93016 | Aksi utama, sel berjalan, tertahan, hotspot aktif |
| `--act-tint` | #FCE9E5 | Latar kendala |
| `--ok` / `--ok-tint` | #17795A / #E2F3EC | Status berhasil |
| Font | Schibsted Grotesk 400–700 (semua teks), DM Mono 400–500 (angka, ukuran, durasi) | |
| Radius | 8 (foto, field) · 14 (panel, baris) · 24 (bawah panel navy) · pill (tombol, chip) | Viewer dan title block bersudut siku |
| Bayangan | Tidak ada, kecuali cincin hotspot pada foto | |

Skala teks: h1 40 · h2 30 · h3 17 · body 15 · meta 13.

## Komponen
`hdr` · `btn` (primary, dark, line, ghost-navy) · `chip` · `pill` · `tblock` (title block) · `viewer` + `room` + `thumb` · `prow` (baris proyek, baris ruang) · `topnavy` + `ncards` · `pbox` + `comp` + `spec` · `hs` (hotspot bernomor) · `seg` · `stp` · `ebox` · `date` · `mx` + `cell` (matriks tahap) · `phone` + `track` + `shots`

## Aturan
- Latar putih dan abu dingin. Foto interior yang hangat menjadi satu-satunya warna hangat besar di halaman.
- Merah-jingga hanya untuk aksi dan hal yang perlu perhatian.
- Situs asli gelap dan mewah; di sini navy dipakai sebagai panel data, bukan suasana seluruh halaman.
- Angka dan ukuran selalu DM Mono. Label memakai huruf biasa, tanpa kapital berjarak.
- Tidak ada gradien, glassmorphism, serif besar, atau latar krem.
