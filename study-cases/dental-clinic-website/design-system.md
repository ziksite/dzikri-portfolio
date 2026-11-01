# Design System — Seri Dental

File: `public/prototypes/ds/dental-clinic-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/vagaro-salon*.png` | Foto hero penuh lebar + judul putih besar + search kotak 3 segmen (radius 4) dengan tombol warna rata di ujung + deret chip garis putih; judul section + link "See all ›"; kartu 5 kolom dengan badge harga gelap di pojok media; grid akordeon 4 kolom "Find a Service in a City" (jadi daftar harga); kartu kelas live (tanggal + chip durasi + tombol garis, jadi jadwal kosong); banner bisnis abu dengan foto di kanan; footer gelap dengan panel membulat; font Proxima Nova |
| `_design-reference/dashboard/clinic-27562518-medical-appointments-dashboard-for-clini.jpg` | Dashboard janji temu di tablet: bezel gelap, permukaan abu dengan kartu putih, baris jadwal berupa jam di kiri + garis warna status + nama + dokter + pill status, tab aktif terisi warna brand |

Alasan: Vagaro adalah marketplace layanan yang menempatkan pencarian dan harga di depan, cocok untuk "harga transparan", dan belum dipakai situs lain. MediCore adalah referensi klinik berbentuk tablet yang belum dipakai. `clinic-26677577` (saran awal) dilewati karena sudah dipakai situs dokter hewan.

Tidak diambil: ungu MediCore dan latar mockup, kartu KPI dan sidebar MediCore, foto di kartu Vagaro (diganti peta gigi), merah Vagaro (diganti kuning brand).

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #1F2630 | Teks utama |
| `--ink-2` | #5F6B7A | Meta, deskripsi |
| `--line` / `--line-2` | #E3E6EB / #CDD2DA | Garis panel, kontrol |
| `--soft` | #F4F5F7 | Sel penuh, media kartu, permukaan tablet |
| `--blue` | #224A9C | Biru brand asli: aksi, pilihan, gigi terpilih |
| `--blue-deep` | #16346F | Footer, dock, lapisan hero |
| `--yellow` | #FAD02C | Kuning brand asli: tombol utama di atas biru, bintang |
| Status | ok #18794E · warn #8A6100 · stop #C0362C | Kursi kosong, sterilisasi, garis waktu sekarang |
| Font | Albert Sans 400–700 (terdekat ke Proxima Nova, belum dipakai situs lain) | |
| Radius | 4 (search, field, tombol) · 8 (kartu, foto) · 12 (panel) · pill (chip) | |
| Bayangan | Hanya kartu jadwal dan dock | |

Skala teks: hero 54 · h1 34 · h2 28 · h3 17 · body 15 · meta 14 · small 13.

## Komponen
`hero` + `search` + `chip-o` · `deal` (kartu perawatan + peta gigi mini + badge harga) · `acc` (akordeon harga) · `next` (jadwal kosong) · `doc` · `place` · `quote` · `band` · `chart` + `tooth` (odontogram dua rahang, nomor FDI, SVG) · `opt` (opsi perawatan) · `visit` · `dock` (ringkasan bawah, pengganti panel kanan) · `sch` + `slot` (matriks jam × hari) · `seg` · `doc-pill` · `tablet` · `ch` (kartu kursi: tindakan, sterilisasi, kosong) · `q` (baris antrean) · `gantt`

## Aturan
- Harga selalu terlihat tanpa klik, dan menyebut satuannya (per gigi, satu mulut, plat).
- Peta gigi adalah elemen pembeda dan pengganti foto perawatan. Foto mulut tidak dipakai.
- Ringkasan alur selalu di dock bawah, bukan panel kanan.
- Kuning hanya untuk satu aksi di atas biru dan bintang. Tidak ada blok kuning besar atau gradien.
- Brand hanya wordmark teks.
