# Design System — Kenarilaan Hotel

File: `public/prototypes/ds/boutique-heritage-hotel-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/cottonink-fashion*.png` | Ritme editorial: bar promo berwarna satu baris, wordmark teks di tengah dengan menu di bawahnya, foto lebar penuh, serif tegak huruf besar, empat ubin foto potret dengan label putih persegi, banner foto + bidang warna, sudut persegi, judul seksi kecil rata tengah |
| `_design-reference/dashboard/booking-27727857-calendar-uxui-property-management.jpg` | Kalender properti: batang tamu melintasi kolom hari, kolom hari ini ditandai, arsiran untuk tanggal tidak dijual, legenda warna per jenis pesanan |

Tidak diambil: tanda tangan script dan banner promo Cottonink, sidebar panjang dan warna pastel gradien referensi kalender. Sumbu kalender diganti: baris = nomor kamar (bukan satu properti per bulan), supaya tidak sama dengan kalender bulanan `villa-rental-booking-website`.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ultra` | #1A2FD0 | Ultramarin: warna aksi, blok warna besar, pesanan langsung |
| `--ultra-2` | #1423A8 | Hover |
| `--ultra-3` | #3F53EA | Rentang tanggal & garis di atas blok ultramarin |
| `--ultra-tint` | #E7EAFF | Rentang tanggal di latar putih |
| `--verm` | #E8380D | Vermilion dari kursi lobi: habis, sisa sedikit, kamar kotor, grup |
| `--sun` | #FFC400 | Sedang dikerjakan, pesanan baru di papan |
| `--ink` | #0E0E14 | Teks, bar total, OTA, latar sisi HP |
| `--ink-2` / `--ink-3` | #5A5B68 / #9A9BA8 | Meta |
| `--line` / `--soft` | #E2E3EA / #F2F3F8 | Garis, abu dingin (bukan krem) |
| Font | Bellefair 400 huruf besar (judul, angka), Jost 400–500 (teks) | Pengganti terdekat serif & sans Cottonink |
| Radius | 0 di semua komponen web; satu-satunya lengkung adalah bingkai HP | |
| Bayangan | Tidak ada | |

Skala teks: hero 92 · h1 60 · h2 42 · nama kamar 30 · h3 21 · body 16 · meta 15 · small 14.

## Komponen
`promo` · `head` (wordmark tengah + menu) · `hero` + `hero__text` (bidang ultramarin menyambung ke papan tarif) · `strip` + `day` (papan tarif, pilih check-in dan pulang langsung di deret tanggal; varian `strip--light`) · `tile` (foto potret + label putih) · `split` · `band` · `mosaic` (grid 7/5 + 4/4/4) · `tabs` + `price-row` · `chip` · `rt` + `rate` (matriks tarif per kamar) · `bed` (King/Twin) · `paybar` (bar total sticky) · `folio` + `pay` · `field` (input garis bawah) · `tape` + `stay` + `hk` (papan okupansi) · `phone` + `task` (HP housekeeping) · `tegel` (jalur kotak hitam-putih di atas footer, satu-satunya motif)

## Aturan
- Putih bersih + ultramarin jenuh sebagai blok rata. Nuansa heritage datang dari foto dan serif tegak, bukan dari latar krem atau warna kusam.
- Serif tidak pernah miring. Huruf kapital berjarak hanya di wordmark dan label ubin.
- Teks tidak diletakkan langsung di atas foto ramai; pakai bidang warna atau kartu putih.
- Vermilion hanya untuk kondisi yang butuh perhatian. Warna di papan selalu punya legenda.
- Brand hanya wordmark teks.
