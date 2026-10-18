# Design System — Lentur Pilates

File: `public/prototypes/ds/pilates-studio-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/classpass-fitness*.png` | Hero mosaik: kolom foto bersudut bulat (radius 16) yang naik-turun, kartu putih mengambang di tengah (radius 22, bayangan lembut); judul sans geometris tebal & rapat; tombol pill (isi + outline); wordmark huruf kecil berjarak; bar promo kuning di atas; footer hitam 4 kolom. Dipilih karena ClassPass adalah produk penemuan kelas studio, sama dengan kebutuhan "lihat kelas hari ini lalu booking". |
| `_design-reference/dashboard/gym-26712097-gym-management-dashboard.jpg` (GymForce) | Daftar "Today's Upcoming Classes" (nama kelas, jam · instruktur, ikon orang + kapasitas "10/12") dipakai untuk baris kelas di beranda, jadwal, dan tab kelas meja depan; daftar "Recently Active Members — checked in" dipakai untuk roster check-in; aksen oranye untuk aksi. Layout sidebar + 4 KPI-nya **tidak** diambil. |

Kenapa bukan referensi lain: Fresha, Airbnb, Alodokter, Jobber, Vistaprint, Printful sudah dipakai situs lain. Cal.com dan Stripe tidak dipakai supaya alur jadwal & checkout tidak seragam dengan situs booking lain.

Tidak diambil dari ClassPass: warna biru aksi (diganti oranye brand asli), stiker "limited time offer", foto berwarna jenuh (foto situs asli memang hitam-putih, dibiarkan apa adanya).

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #111111 | Teks utama, chip/hari aktif, tombol gelap |
| `--ink-2` | #5E5E5E | Meta, deskripsi |
| `--line` | #E6E6E6 | Garis panel, pemisah baris kelas |
| `--soft` | #F3F3F3 | Slot terisi, chip, latar tablet meja depan |
| `--action` | #E0570F | Oranye brand asli (#FF8B38) dijenuhkan agar teks putih terbaca: tombol booking/bayar, reformer pilihan, sisa kursi sedikit |
| `--action-tint` | #FDEEE4 | Tag "paling sering dibeli", hover outline |
| `--promo` | #FCE07A | Bar promo (hanya satu baris di beranda) |
| `--ok` / `--ok-tint` | #1D7A4C / #E5F3EB | Status hadir di meja depan, ikon sukses |
| `--night` | #000000 | Footer |
| Font | Figtree 400–800 (judul 800, tracking −0.03em) | Pengganti Google terdekat untuk sans geometris ClassPass |
| Radius | 10 (field, slot) · 16 (foto, panel, kartu paket) · 22 (kartu hero) · pill (tombol, chip) | |
| Bayangan | Hanya kartu hero mengambang dan paybar sticky | |

Skala teks: hero 50 · h1 36 · h2 26 · h3 18 · body 16 · meta 14 · small 13.

## Komponen
`promo` · `header` + `wordmark` + `credit-pill` (saldo kredit selalu terlihat) · `mosaic` (kolom foto + kartu hero) · `class-row` (jam, kelas, instruktur, `spots`, aksi) · `pick-list` (baris kelas yang bisa dipilih) · `days` (deret 7 hari) · `chip` · `seg` (segmented) · `panel` + `row` · `tag` · `person` (avatar inisial, tanpa foto) · `room` + `spotmap` + `spot` (peta reformer/matras menghadap instruktur & cermin) · `legend` · `note` · `plan` (kartu paket dengan radio) · `meter` (sisa kredit) · `timeline` (masa berlaku) · `pay__opt` · `paybar` (sticky bawah) · `desk` (tablet meja depan: `dclass`, `seat`, `count`, `member`) · `footer` hitam

## Aturan
- Latar putih, foto hitam-putih asli, oranye hanya untuk aksi dan pilihan pengguna. Hijau hanya untuk status hadir.
- Kartu hero mengambang di atas mosaik berisi jadwal hari ini, bukan slogan atau statistik.
- Peta reformer selalu diberi orientasi (instruktur & cermin di depan) dan nomor alat yang sama dengan yang dilihat staf di meja depan.
- Tidak ada gradien warna, blob, glassmorphism, atau ikon dalam lingkaran.
