# Design System — Safarah Umrah & Haji

File: `public/prototypes/ds/umrah-travel-agency-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/bobobox-hotel*.png` | Band hero teal penuh dengan judul serif tegak, deret pill produk (aktif = cincin teal muda), kartu search putih berisi segmen field abu + tombol aksi di kanan, chip filter pill bergaris (aktif teal), kartu foto radius 12 dengan label putih di atas foto, FAQ satu kolom di tengah bergaris bawah, tombol persegi radius 8 ("Log in" bergaris, "Register" teal muda). Dipakai untuk beranda dan detail paket. |
| `_design-reference/dashboard/finance-24164381-loan-management-dashboard-3-credit-score.jpg` | Portal tanpa sidebar: top bar dengan search abu + "Notifications" berangka merah, nama besar + breadcrumb, tombol pill abu di kanan, tab bergaris bawah, **tile abu bersambung (gap 4px, sudut luar radius 16)** dengan angka besar hijau tua, tile profil berwarna di kiri, kartu "Active Loans" foto kiri + judul bergaris bawah. Dipakai untuk portal jamaah (cicilan & dokumen) dan dipinjam bentuk tile-nya untuk kamar di rooming list. |

Alasan: model bisnisnya = katalog keberangkatan (perilaku pencarian seperti booking hotel) + kewajiban bayar bertahap (perilaku seperti portal pinjaman: total, terbayar, sisa, jatuh tempo). Pasangan Airbnb+Pushost dan Fresha+Cal.com tidak dipakai. Stripe Checkout dipertimbangkan untuk simulasi cicilan, tapi tidak diambil supaya alur bayar tidak jadi pola "form kiri ringkasan kanan"; simulasi dibuat sebagai panel input + tabel jadwal bayar.

Tidak diambil: ilustrasi kota & pesawat Bobobox, gradien band Bobobox, banner promo bertulisan, dekorasi "Elite Member" huruf kapital berjarak, speedometer skor kredit.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--brand` | #00534D | Teal asli situs: band hero, tombol utama, segmen aktif |
| `--brand-ink` | #003F3A | Hover, angka besar di tile |
| `--brand-2` | #0D8C80 | Link, chip aktif, bar kursi & progres |
| `--brand-soft` | #E5F1EF | Tombol sekunder, tile profil, pill info |
| `--ink` / `--ink-2` / `--ink-3` | #1D2322 / #5B6463 / #8A9291 | Teks utama / isi / meta |
| `--line` / `--line-2` | #E3E7E6 / #CFD6D5 | Garis panel / garis field & chip |
| `--field` | #F2F4F4 | Segmen search |
| `--tile` | #F4F5F5 | Tile portal, kamar, tombol pill abu |
| Status | ok #1E7F4F · warn #A8660B · bad #B93A1F (+ versi soft) | Terverifikasi, jatuh tempo/kursi menipis, ditolak |
| `--star` | #E8A400 | Bintang hotel |
| Font | Source Serif 4 700 (judul, tegak, tidak pernah miring) · Work Sans 400–700 (UI, angka) | Pasangan serif+Work Sans mengikuti Bobobox |
| Radius | 6 (label foto, kasur) · 8 (tombol, field, foto kecil) · 12 (kartu, panel) · 16 (tile, box portal) · pill (chip, produk) | |
| Bayangan | Hanya kartu search di atas band | |

Skala teks: hero 46 · h1 34 · h2 26 · h3 17 · body 15 · meta 14 · small 13. Angka tile 30 Work Sans 600.

## Komponen
`band` + `products` + `search` (hero) · `license` (strip izin PPIU/PIHK) · `chips` · `deps`/`dep` (baris keberangkatan: blok tanggal, foto hotel, meta, bar kursi, harga) · `seat` · `hotel` + `photo__tag` · `saving` + `steps` · `faq` · `branches` · `crumbs` · `facts` · `pics` (galeri 3) · `tabs` · `price-card` + `rooms` (harga per tipe kamar) · `stay` (hotel baris) · `days`/`day` (itinerary bernomor) · `incl` · `sim` + `seg` + `stepper` + `table` (simulasi cicilan) · `topbar` · `who` · `tiles`/`tile` (+ `tile--me`, `tile--wide`, `progress`) · `box` + `row` (cicilan & dokumen) · `va` · `trip` · `pill` · `ops-bar` + `pool` + `pax` + `room` + `bed` (rooming list)

## Aturan
- Satu warna aksi: teal brand. Warna lain hanya untuk status (hijau terverifikasi, amber jatuh tempo/perlu tindakan, merah ditolak) dan bintang.
- Serif hanya di judul halaman/section dan wordmark; semua angka uang memakai Work Sans tabular.
- Izin PPIU/PIHK selalu tampil dekat harga (strip beranda, kartu harga, footer), karena itu sinyal kepercayaan utama di kategori ini.
- Tidak ada gradien, blok pastel besar, ikon dalam lingkaran berjejer, atau statistik pemasaran.
