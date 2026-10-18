# Design System — Laju Rental

File: `public/prototypes/ds/car-rental-company-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/flow-form/stripe-checkout.png` (+ `-full`) | Halaman produk Stripe: latar `#F6F9FC` dengan garis bantu vertikal tipis, judul navy rata kiri, kicker biru (huruf biasa), CTA pill + link panah, daftar centang kecil, kartu "jendela" berbayangan besar. Checkout terbelah: panel kiri abu muda berisi wordmark + panah kembali, harga besar, foto produk, rincian; panel kanan putih berisi field bertumpuk yang berbagi garis (Stripe Elements), tombol metode bayar, tombol bayar navy lebar penuh, tautan kecil di bawah |
| `_design-reference/dashboard/dispatch-27732810-fleetyu-react-logistics-admin-dashboard.jpg` | Hanya komponen armada: "Vehicle Types & Utilization" (nama tipe + jumlah unit + bar utilisasi hijau/kuning), baris "Active Routes" (petak angka di kiri, nama, chip info bergaris, badge status di kanan), badge bergaris + tint (On Time / Delayed / High), plat nomor sebagai teks utama baris |

Kenapa: model bisnisnya = memilih unit dengan tarif per durasi lalu membayar DP dengan dokumen (perilaku checkout), dan di sisi pool = mengelola unit per plat (perilaku dashboard armada). Tidak diambil dari FleetYu: sidebar gradien, 4 kartu KPI berwarna, donut & bar chart. Tidak diambil dari Stripe: gradien ungu-biru dan warna ungu (diganti biru brand asli).

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #0A2540 | Judul, tombol bayar, filter aktif |
| `--ink-2` | #425466 | Paragraf |
| `--ink-3` | #697386 | Label field, meta |
| `--line` / `--line-2` | #E3E8EE / #D5DBE1 | Garis panel / garis field |
| `--soft` | #F6F9FC | Hero, panel kiri checkout, latar pool |
| `--brand` | #0759C9 | Biru brand asli (dijenuhkan): link, tombol aksi, bar lepas kunci |
| `--sun` | #EFB92D | Kuning brand asli: hanya bar servis & utilisasi rendah |
| Status | ok #0E7C4A · warn #A15C00 · bad #C0123C (+ tint & garis) | Badge stok, dokumen, DP |
| Font | Hanken Grotesk 400–700 (pengganti Söhne), IBM Plex Mono 500 untuk plat & kode | |
| Radius | 4 (badge, chip, bar) · 6 (field, tombol) · 8 (kartu, panel) · pill (CTA marketing, filter) | |
| Bayangan | `--sh-window` hanya kartu pencarian hero; field memakai bayangan 1px gaya Stripe | |

Skala teks: hero 54 · h1 36 · h2 26 · harga checkout 36 · h3 17 · body 15 · meta 14 · small 13.

## Komponen
`guides` (hero bergaris bantu) · `window` (kartu pencarian) · `seg` (segmented) · `stack` + `stack__cell` (field bertumpuk) · `btn-brand` / `btn-ink` / `btn-line` / `btn-link` · `rates` (tabel tarif per paket) · `docs` + `doc` (syarat & deposit) · `searchbar` · `filter` · `car` (baris hasil: foto, chip spesifikasi, badge stok, harga + total) · `aside` + `kv` · `checkout` (terbelah) · `upl` (unggah dokumen dalam stack) · `pay` (metode bayar) · `note` · `pool-bar` + `pool-tabs` · `trip` (baris serah terima gaya Active Routes) · `gantt` + `g-group` (utilisasi) + `bar` (lepas kunci / sopir / servis / menunggu DP) · `fuel` · `shots` · `badge` · `chip`

## Aturan
- Putih dan abu `#F6F9FC` saja; biru hanya untuk aksi dan link, navy untuk keputusan bayar.
- Foto mobil selalu rasio 274:132 hasil crop asli (latar biru-kuning bawaan foto tidak diedit).
- Plat nomor dan kode pesanan selalu mono.
- Status hanya lewat badge bergaris + tint, tidak ada titik berdenyut.
- Tidak ada gradien, blob, kartu KPI, atau grid ikon 3 kolom.
