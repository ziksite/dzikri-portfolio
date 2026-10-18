# Design System — Teduh Barbershop

File: `public/prototypes/ds/multi-branch-barbershop-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/fresha-salon-booking*.png` | Hero tengah + search pill dengan tombol hitam, deret kartu venue (foto 4:3 radius 8, badge pill putih, tombol hati, rating bintang kuning di kanan, meta abu 2 baris), pola halaman venue (galeri 1+2, rating + status + alamat, tab, kartu booking sticky), alur booking (tanggal lingkaran + jam berbaris), kalender partner per staf |
| `_design-reference/flow-form/cal-booking-page.png` | Daftar layanan dalam panel bergaris: judul, deskripsi, chip durasi |

Tidak diambil: latar gradien pastel Fresha.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #0D1619 | Teks utama, tombol utama, chip aktif |
| `--ink-2` | #737373 | Meta, deskripsi |
| `--line` | #E5E5E5 | Garis panel, divider |
| `--soft` | #F5F5F5 | Chip, avatar, field |
| `--brand` | #2F6B45 | Hijau brand asli: link, status "buka/sepi" |
| `--star` | #F5B500 | Bintang rating |
| Font | Inter Tight 600–700 (judul), Inter 400–600 (teks) | |
| Radius | 8 (foto, field) · 12 (panel, kartu) · pill (tombol, chip) | |
| Bayangan | Hanya search pill & kartu mengambang | |

Skala teks: hero 56 · h1 40 · h2 24 · h3 17 · body 15 · meta 14 · small 13.

## Komponen
`btn-primary` (pill hitam) · `btn-secondary` (pill putih bergaris) · `search` (pill bersegmen) · `venue` (kartu cabang) · `panel` + `svc` (daftar layanan) · `tag` (durasi) · `chip` · `tabs` · `person` (avatar inisial) · `review` · `side-card` (sticky) · `gallery` · `dates` + `time` (alur booking) · `cal-grid` + `appt` (kalender partner)

## Aturan
- Putih bersih, hitam untuk aksi. Warna hanya untuk status (hijau sepi, oranye ramai) dan bintang.
- Tidak ada blok warna penuh, gradien, atau kartu berbayangan.
- Struktur halaman mengikuti pola produk booking nyata, bukan komposisi bebas.
