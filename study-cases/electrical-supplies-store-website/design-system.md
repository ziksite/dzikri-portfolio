# Design System — Simpul Listrik

File: `public/prototypes/ds/electrical-supplies-store-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/vistaprint-print*.png` | Katalog besar dengan banyak kategori, cocok untuk toko material listrik. Diambil: utility strip abu di atas header, header dengan kotak cari besar bergaris gelap (radius 6) di tengah dan aksi berikon + teks di kanan, nav kategori dua baris rata tengah (kategori promo berwarna), pita pengumuman hitam, judul seksi 28px + panah kiri/kanan, ubin kategori (foto produk dalam kotak bergaris radius 12 + label di bawah), kartu produk bergaris, tombol kotak radius 6 (utama berisi, sekunder bergaris hitam) |
| `_design-reference/dashboard/orders-27472975-logistics-order-management-dashboard-ui.jpg` (Shipora) | Layar staf tanpa sidebar: nav atas dengan item aktif berbentuk pill abu + ikon, area kerja putih membulat di atas latar abu, judul halaman + subjudul, tabel dengan header kecil abu dan baris bergaris tipis, chip status berwarna lembut (radius 4), pola daftar + panel detail pesanan |

Alasan: toko ini punya 5.000+ SKU dengan pembeli eceran dan kontraktor, jadi butuh pola katalog yang mengutamakan pencarian dan kategori (Vistaprint), bukan landing berfoto besar. Layar sales butuh tabel harga yang padat; Shipora memberi pola master-detail tanpa sidebar + KPI. Pasangan ini belum dipakai situs lain (Airbnb+Pushost, Fresha+Cal.com, Alodokter+Glacio).

Tidak diambil: latar krem dan banner hijau bergradien Vistaprint, kartu KPI dan grafik Shipora.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #151515 | Teks utama, tombol sekunder bergaris, chip aktif |
| `--ink-2` | #5C5F62 | Meta, label tabel |
| `--line` / `--line-2` | #DCDCDC / #EBEBEB | Garis ubin & panel / garis baris tabel |
| `--strip` | #F2F2F2 | Utility strip, header tabel, latar layar staf |
| `--tile` | #F3F4F4 | Latar foto di panel detail, blok BOQ |
| `--bar` | #1C1C1C | Pita pengumuman |
| `--brand` | #C42350 | Merah-magenta brand asli (#CC3366, sedikit dijenuhkan): tombol utama, harga tier, baris terpilih |
| Status | hijau #1F7A3F · oranye #A85B00 · biru #2457C5 · merah #B42318 (latar tint) | Stok, SLA, chip status RFQ |
| Font | Figtree 400–700 (pengganti Graphik milik Vistaprint) | Semua teks |
| Radius | 4 (chip status, spec) · 6 (tombol, field, search) · 12 (ubin, panel) · 16–20 (hero, bingkai staf) | |
| Bayangan | Hanya bar total RFQ yang menempel di bawah | |

Skala teks: h1 40 (34 di halaman dalam) · h2 28 · h3 18 · body 15 · meta 14 · small 13.

## Komponen
`utility` · `header` + `search` + `hact` (aksi berikon, `count`) · `catnav` (2 baris) · `announce` · `hero` + `boq` (tempel daftar material) · `tiles`/`tile` · `cards`/`pcard` · `stock` · `panel` + `row` · `tier` (tabel harga bertingkat, baris aktif) · `filters`/`fgroup`/`chip`/`check` · `results`/`prow` + `spec` · `detail` + `kv` + `branches` · `stepper` · `fields`/`field` · `sheet` (lembar RFQ) + `target` · `totalbar` · `topnav` (pill) · `qtabs` · `inbox` = `qlist`/`qitem` + `qd` · `st` (status) · `sla` · `qtable` + `disc` · `margin` + `meter` · `sumlines`

## Aturan
- Putih, garis abu tipis, teks hitam. Warna brand hanya untuk aksi utama, harga tier, dan seleksi.
- Foto produk selalu `object-fit: contain` di kotak putih bergaris, tidak dipotong.
- Harga eceran selalu tampil bersama harga tier terendah ("mulai 50 pcs").
- Tidak ada gradien, blob, ikon dalam lingkaran, atau kartu KPI.
