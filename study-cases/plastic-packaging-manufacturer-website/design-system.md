# Design System — Lentur Plastik

File: `public/prototypes/ds/plastic-packaging-manufacturer-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/inventory-27017971-pos-billing-inventory-management-dashboa.jpg` (Panze) | Referensi utama: sidebar navy penuh dengan item aktif pill, latar kerja abu, panel putih radius besar, kartu dalam abu muda, angka tebal, ikon di kotak, pola arsir untuk nilai "belum pasti" |
| `_design-reference/dashboard/orders-27472975-logistics-order-management-dashboard-ui.jpg` (Shipora) | Tabel dengan panel detail di kanan, chip status berlatar muda |

Tidak diambil: gradien ikon dan batang Panze, nav atas pill dan aksen kuning Shipora, baris 4 KPI di layar operasional. Shipora juga dipakai `electrical-supplies-store-website`, jadi di sini hanya pola tabel + detail yang diambil; kerangka halaman berasal dari Panze.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--navy` | #12131F | Sidebar, panel gambar teknik, kartu hitung cepat, teks utama |
| `--navy-2` / `--navy-3` | #232536 / #3A3D52 | Item aktif, field di atas navy, garis di atas navy |
| `--bg` | #EFF0F4 | Latar kerja abu netral |
| `--soft` | #F5F6F9 | Kartu dalam panel, segmented control |
| `--line` | #E4E5EC | Garis tabel |
| `--ink-2` / `--ink-3` | #5D6072 / #8B8EA0 | Meta, placeholder |
| `--brand` | #D81920 | Merah brand asli (dijenuhkan untuk kontras teks putih): tombol utama, ukuran di gambar teknik |
| `--ok` / `--warn` / `--info` / `--off` | #0C7C71 / #A35F07 / #3450C4 / #5D6072 | Status job dan MOQ, selalu dengan ikon + label |
| Font | Public Sans 400–800 (semua teks), JetBrains Mono 500–600 (ukuran, rumus, kode job) | |
| Radius | 24 (panel) · 16 (kartu, foto) · 12 (tombol, field) · 8 (chip, job) | |
| Bayangan | Hanya segmented control aktif | |

Skala teks: hero 46 · h1 30 · h2 21 · h3 16 · body 15 · meta 14 · small 13. Nilai hasil hitung 26 tebal.

## Komponen
`side` (sidebar + sub-menu material) · `panel` + `card` · `fact` · `quick` (hitung cepat di beranda) · `use` + `mtable` + `level` (meter tiga tingkat, arsir untuk "sesuai bahan") · `step` · `seg` (segmented control) · `finder` + `swatch` · `sku-table` + `detail` · `config__form` + `blueprint` (gambar teknik SVG mengikuti input) + `formula` + `results` + `meter` · `rfq-form` · `gantt` + `job` (papan mesin) · `q-item` (antrean job)

## Aturan
- Situs terasa seperti alat kerja: pembeli B2B mencari spesifikasi di tabel, bukan melihat brosur.
- Perbandingan material memakai meter ordinal + label teks, bukan grafik batang, karena datanya hanya Rendah/Sedang/Tinggi.
- Warna status tidak pernah berdiri sendiri: selalu ada ikon dan teks.
- Semua berat ditulis sebagai perkiraan (tanda ±) dan rumusnya ditampilkan.
- Tidak ada harga, logo, atau lencana sertifikasi.
- Wordmark teks saja, tanpa ikon.
