# Design System — Adem Teknik

File: `public/prototypes/ds/ac-service-company-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/housecallpro-field-service*.png` | Top bar abu + header putih, CTA pill oranye di sebelah field pill (di sini jadi kalkulator layanan × PK × jumlah), kartu notifikasi bertumpuk di hero (dibuat solid, bukan kaca), deret tile industri berfoto dengan label putih tebal + panah lingkaran di pita navy, judul dua warna (baris kedua biru), bento kartu gelap berfoto dengan potongan UI putih, pita biru "Get in touch", mockup ponsel aplikasi teknisi (kotak statistik 4 kolom, progress bar dengan legenda, tab bar bawah dengan tombol + biru di tengah) |
| `_design-reference/dashboard/booking-24489412-appointy-calender-booking-web-app.jpg` | Kartu event (judul, meta ikon tanggal/jam, pill aksi, footer bergaris), kalender bulan dengan sel kotak abu untuk tanggal tersedia dan sel biru terpilih, slot jam 2 kolom bergaris, toggle kecil 12h/24h (di sini "2 jam / Pagi saja") |

Tidak diambil: blur foto latar Housecall (tidak mengedit piksel), efek kaca pada notifikasi, angka statistik raksasa Housecall, warna ungu Appointy (diganti biru brand asli), sidebar Appointy.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #121A21 | Teks utama, segmen aktif |
| `--ink-2` / `--ink-3` | #4D5965 / #8A96A2 | Teks sekunder / meta |
| `--line` | #DBE1E6 | Garis kartu, tabel |
| `--sky` | #E7ECF0 | Latar section abu dingin, top bar |
| `--cell` | #E9EDF1 | Sel tanggal tersedia |
| `--navy` | #0D1B2B | Hero, pita tile, bento, header lacak, footer |
| `--blue` | #0A66C2 | Biru brand asli: tombol alur, link, baris kedua judul, tanggal/slot terpilih |
| `--orange` | #FF9F1C | CTA "Pesan teknisi" & progress lacak (dari Housecall) |
| `--ok` | #0F9D58 | Hijau brand asli: selesai, angka membaik |
| `--warn` | #C76A00 | Sedang dikerjakan, pekerjaan tambahan |
| Font | Manrope 500–800 (satu keluarga untuk judul dan teks) | |
| Radius | 6 (tile foto, pill status) · 10 (field, slot, sel) · 16 (kartu) · 28 (bingkai ponsel) · pill (tombol) | |
| Bayangan | Kartu notifikasi, potongan UI, tabel harga, ponsel | |

Skala teks: hero 60 · h1 44 · h2 28 · h3 18 · lead 19 · body 16 · meta 14 · small 13.

## Komponen
`btn-orange` · `btn-blue` · `btn-line` · `topbar` + `header` · `hero` + `quote` (kalkulator pill) + `note` (notifikasi) · `tile` (layanan berfoto) · `seg` (tab pill) · `price` (tabel per PK) · `bento` + `bcard` + `mini` · `areas` · `callbar` · `faq` · `card` + `pill` · `unit` + `svc-pick` (unit per alamat) · `stepper` + `newrow` · `cal` + `slots` (Appointy) · `totalbar` · `trackhead` + `prog` + `techcard` · `report` + `reading` + `ba` (laporan sebelum/sesudah) · `phone` + `stats` + `job` + `tick` + `readin` + `hist` (aplikasi teknisi)

## Aturan
- Putih dan abu dingin untuk konten, navy untuk pita dengan foto. Oranye hanya untuk CTA utama dan progress; biru untuk aksi di dalam alur.
- Harga selalu ditulis per unit dan per PK; angka pakai `tabular-nums`.
- Foto selalu dalam kotak (tile, kartu, laporan), tidak di-upscale menjadi latar penuh lebar karena resolusi asli 600×800.
- Tidak ada gradien dekoratif, kaca, atau ikon dalam lingkaran berderet.
