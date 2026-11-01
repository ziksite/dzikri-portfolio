# Design System — Rona Clinic

File: `public/prototypes/ds/aesthetic-skin-clinic-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/portal-26270402-student-portal-dashboard-web-app-design.jpg` (UpGradely) | Lingkaran kehadiran (centang lime, silang oranye, abu kosong) menjadi bahasa utama "sesi": `dot` di beranda, jalur program, kalender, dan kartu klien. Item menu aktif berupa pill hitam, filter pill hitam + garis, status pill berwarna rata (lime, oranye, biru langit), angka besar berbobot sedang ("4.7"), bilah progres, kartu putih radius besar di permukaan abu |
| `_design-reference/landing/fore-coffee*.png` | Judul sans geometris tebal dan sangat rapat (Plus Jakarta Sans), blok judul kiri, tombol pill, foto dengan satu sudut melengkung besar (`photo--corner`) |

Alasan: bisnis klinik ini menjual program beberapa sesi, jadi masalah tampilannya adalah progres, bukan katalog. UpGradely adalah produk yang memang menampilkan kehadiran dan progres, dan keduanya belum dipakai situs lain. Saran awal `booking-24489412` (Appointy) dilewati karena sudah dipakai situs servis AC; `clinic-27355827` (Glacio) sudah dipakai situs klinik multi-spesialis. `gym-23629160`, `gym-18018179`, dan `booking-13237626` dilihat lalu dilewati karena kerangkanya sidebar + kartu KPI.

Tidak diambil: gradien pastel dan mockup laptop UpGradely, kartu KPI, foto avatar. Dari Fore: latar krem, teks outline raksasa, warna hijau tua, grid promo.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--lime` | #B4F04A | Blok utama (hero, kepala program, kartu klien), sesi selesai, tombol di atas hitam |
| `--ink` | #0B0B0C | Teks, tombol utama, blok gelap, sesi terjadwal |
| `--orange` | #FF6A2B | Sesi digeser, peringatan klinis, blok "tentang klinik" |
| `--sky` | #5FC6F5 | Status menunggu |
| `--ink-2` / `--ink-3` | #63666C / #9A9DA3 | Meta di atas putih / di atas hitam |
| `--line` / `--soft` | #E2E4E8 / #EFF0F3 | Garis, field, permukaan kerja tablet, kartu kalender |
| Font | Plus Jakarta Sans 400–800 | Satu keluarga, judul 700 dengan tracking rapat |
| Radius | 12 (field) · 20 (kartu) · 32 (blok besar) · pill (tombol, chip) | |
| Bayangan | Tidak ada | Pemisahan lewat blok warna rata |

Skala teks: hero 76 · h1 48 · h2 34 · big 40 (angka, bobot 500) · h3 18 · body 15 · meta 14 · small 13.

Warna brand asli (emas kecokelatan) sengaja tidak dipakai: palet itu lemah sebagai blok besar dan akan mudah mengarah ke identitas aslinya. Lime diturunkan dari referensi.

## Komponen
`btn` (primary, lime, line) · `pill` + `pills` · `status` · `nav` · `hero` + `index` (indeks keluhan: baris besar di blok hitam) · `dot` (lingkaran sesi: done, miss, now, ghost) · `how__step` · `price-row` · `clinic__card` · `read` · `tier` (segmen jumlah sesi) · `track` (jalur sesi horizontal) · `check` · `paybar` (bilah total sticky) · `month` + `day` (kalender 3 bulan) · `sess__row` (baris sesi) · `confirm` · `field` · tablet: `rail`, `q` + `bar` (antrean), `card--lime` (kartu program), `stepper`, `hist`

## Aturan
- Satu blok warna penuh per layar, sisanya putih dan hitam. Tidak ada gradien, bayangan, atau warna pastel.
- Lingkaran hanya berarti satu sesi. Jangan dipakai sebagai dekorasi atau wadah ikon fitur.
- Lime = sudah atau sesi pertama, hitam = terjadwal, oranye = ada yang perlu diperhatikan.
- Tidak ada foto pasien, foto hasil, atau potret dokter dengan nama.
- Tidak ada klaim hasil. Setiap rekomendasi menyebut bahwa dokter menilai dulu di sesi 1.
