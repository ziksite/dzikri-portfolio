# Design System — Lestari Catering

File: `public/prototypes/ds/catering-service-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/sweetgreen-restaurant*.png` | Header nav kiri · wordmark tengah · nav kanan + tombol pill; judul grotesk besar dengan tombol lime (hero dibuat split: panel hijau brand kiri + grid 2×2 foto kanan, karena foto asli tidak cukup tajam untuk full-bleed); tab menu besar dengan titik di bawah tab aktif; kartu menu (foto 1:1 radius 12, nama UPPERCASE, daftar isi, baris catatan abu, link "Pesan →"); seksi split judul besar + daftar link bergaris bawah + foto membulat; grid bergaris tipis hitam (menu mingguan + form tasting) |
| `_design-reference/dashboard/pos-27368724-restaurant-pos-dashboard-order-managemen.jpg` | Layar produksi dapur: tab bergaris bawah dengan hitungan, deret tiket pesanan horizontal berwarna per status + pill status, grid kartu item dengan stepper pill, panel kanan detail pesanan (ID besar, tombol cetak/ubah, daftar item, segmented status, tombol blok lebar) |

Tidak diambil: latar krem dan blok pastel sage/pasir Sweetgreen (diganti putih + satu band hijau gelap solid), judul serif Sweetgreen, latar mint & kartu bayangan di POS.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #0F2419 | Teks, chip aktif, paket terpilih, footer |
| `--ink-2` | #5D6B62 | Meta |
| `--line` / `--line-2` | #E1E5E0 / #C9D0CA | Garis, border field & pilihan |
| `--soft` | #F2F4F1 | Stepper, latar layar dapur (area kecil/latar aplikasi) |
| `--brand` | #1F5130 | Hijau brand asli (#325033) dijenuhkan: tombol utama, band, progress |
| `--lime` | #D9EC4A | Tombol di atas foto/band, badge, tanda paket terpilih — hemat |
| Status | ok #1F7A46 · warn #B45309 · info #2457C5 | Pill & tiket dapur |
| Font | Familjen Grotesk 500 (judul, rapat -0.03em), Instrument Sans 400–600 (teks/UI) | |
| Radius | 8 (field, pilihan) · 12 (foto, kartu, panel) · 16 (bingkai tablet) · pill (tombol, chip, stepper) | |
| Bayangan | Hanya bar bawah sticky | |

Skala teks: hero 76 (64 di hero split, 38 mobile) · display 52 · h1 40 · h2 28 · h3/item 18 · body 16 · meta 14 · small 13.

## Komponen
`header` (3 kolom) · `hero` (split: panel hijau + `hero__grid` 2×2 foto + `hero__note` harga mulai) · `menu-tabs` · `dish` (kartu menu) · `split` + `offer-list` · `band` · `rule-grid` + `week` · `pkgs`/`pkg` (kolom pembanding paket) · `stepper` · `cat` + `pick` (pemilih menu berbatas) · `opt` (baris centang/radio) · `bottom-bar` (ringkasan sticky) · `month`/`day` (kalender kapasitas) · `table` (jadwal bayar) · `pill` · `kds` (bingkai tablet) · `uline-tabs` · `ticket` · `prod` (kartu produksi + progress) · `seg` · `check`

## Aturan
- Menu dan foto makanan memimpin; teks besar grotesk, bukan serif.
- Foto tidak pernah ditampilkan lebih dari ~1,3× ukuran aslinya: foto kategori asli 298–300px dibatasi lewat `menu-grid` maks 1180px (kartu ≤377px), 780px di 2 kolom, 380px di 1 kolom; `band-photos` maks 640px. Hero hanya memakai foto ≥960px.
- Putih bersih. Satu-satunya blok warna adalah band hijau gelap solid; lime hanya untuk aksi di atas foto/band dan tanda terpilih.
- Ringkasan harga di bar bawah sticky (bukan kolom kanan) pada alur pelanggan; panel kanan hanya di layar dapur mengikuti pola POS.
