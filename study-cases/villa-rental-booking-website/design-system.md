# Design System — Rumah Kabut

File: `public/prototypes/ds/villa-rental-booking-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/airbnb-stays*.png` | Header dengan tab kategori berikon, search pill besar bersegmen (label kecil + nilai) dengan tombol bulat, baris "judul ›" + panah, kartu listing (foto radius 12, badge putih, hati, judul + rating, meta abu, harga tebal), ubin layanan abu bergambar ikon, footer abu bertiga kolom |
| Pola halaman listing Airbnb | Judul + Bagikan/Simpan, galeri 1+4 dengan "Tampilkan semua foto", blok bergaris (ringkasan, pengelola, sorotan berikon, deskripsi, fasilitas 2 kolom, kalender 2 bulan), kartu pesan sticky berbayang dengan kotak check-in/out/tamu |
| `_design-reference/dashboard/booking-27727857-calendar-uxui-property-management.jpg` | Kalender properti: daftar listing ber-thumbnail di kiri, kalender bulanan dengan harga per hari, bar booking berwarna per status + legenda, sel di luar bulan diarsir |

Diganti: aksen merah muda Airbnb → biru brand asli agen. Font mono Pushost tidak diambil.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` / `--ink-2` | #222 / #6A6A6A | Teks / meta |
| `--line` / `--line-2` | #DDD / #EBEBEB | Garis blok, kartu |
| `--soft` | #F7F7F7 | Ubin, rentang tanggal, footer |
| `--brand` | #0170B9 | Tombol pesan, tombol cari, wordmark |
| Status kalender | hijau lunas · pink menunggu DP · kuning survey · ungu perawatan | |
| Font | Nunito Sans 400–800 | |
| Radius | 8 (tombol) · 12 (foto, kartu) · pill (search, chip) | |
| Bayangan | Search pill & kartu pesan saja | |

## Komponen
`header` + `cats` · `search` (besar & kecil) · `fchip` (filter) · `card` + `photo` + `badge` + `heart` · `tiles` · `listing-gallery` · `block` + `hl` + `amen` · `months` + `mday` · `book` (kartu pesan) + `stepper` · `pm` + `plist` + `mcal` + `bar` (kalender properti)

## Aturan
- Putih, foto sebagai warna utama. Biru hanya untuk aksi utama.
- Teks rincian harga bergaris bawah seperti pola Airbnb, total tebal.
- Kalender admin per villa, bukan tabel KPI.
