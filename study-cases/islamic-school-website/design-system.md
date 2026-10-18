# Design System — SIT Annahl

File: `public/prototypes/ds/islamic-school-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/portal-26072541-student-portal-dashboard-web-app-design.jpg` (EduWay) | Kerangka seluruh situs: panel abu radius 24 berisi baris putih radius 16, header berbentuk panel, pill hitam untuk item aktif (nav, langkah, chip), chip filter bergaris, tombol kotak-bulat putih "+" di kepala panel, kartu catatan berwarna penuh (hijau & ungu → hijau & biru brand), baris tugas (judul + pill status kanan + meta abu dua sisi), progress bar dengan sisa berarsir, tabel jadwal sebagai baris putih terpisah dengan header abu kecil |
| `_design-reference/dashboard/portal-27341288-upskilla-student-portal-dashboard-ui.jpg` (Upskila) | Deret tanggal berupa lingkaran dengan titik warna per jenis agenda + legenda, hari ini lingkaran hitam, hari terpilih dibingkai; baris agenda dengan garis warna kiri, tag kecil + jam di atas judul, pill hitung mundur bergaris merah, baris "berikutnya" dibingkai hitam |
| `_design-reference/flow-form/stripe-checkout.png` (Stripe Checkout) | Panel bayar daftar ulang: terbelah kiri (nama tagihan, nominal besar, rincian baris bergaris) dan kanan abu sangat muda (tombol metode bayar berdampingan, pemisah "atau", field berlabel kecil, field bergabung nama/hubungan/WhatsApp, tombol bayar navy radius 10 selebar kolom, catatan gembok kecil) |

Kenapa ini: inti bisnis sekolah adalah **orang tua memantau langkah, jadwal, dan tagihan**, jadi bentuknya portal siswa (EduWay + Upskila), dengan satu titik bayar yang harus terasa aman (Stripe). Sengaja berbeda dari `tutoring-center-website` (Printful + Enlight: kartu harga bergaris, portal bersidebar, merah): di sini tidak ada sidebar, semua dibangun dari panel abu + baris putih + kartu catatan berwarna.

Tidak diambil: latar abu-hijau di luar perangkat EduWay, sidebar navigasi (diganti header panel), latar dan sidebar ungu Upskila, foto avatar (diganti inisial), gradien Stripe.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #161616 | Teks, pill aktif, langkah aktif, tombol aksi kartu kanban |
| `--ink-2` / `--ink-3` | #6B6B6B / #9A9A9A | Meta / garis arsir |
| `--line` / `--line-2` | #E4E4E4 / #D2D2D2 | Garis field, chip |
| `--panel` | #F3F3F2 | Panel luar (abu netral, bukan krem) |
| `--navy` | #0B2A4E | Navy brand asli: tombol aksi utama & tombol bayar |
| `--blue` | #0E78C7 | Biru brand asli: kartu catatan biru, pill observasi/PPDB |
| `--green` | #9FE28A | Kartu diterima/potongan, progress selesai, pill selesai |
| `--amber` / `--red` | #F6C453 / #E5484D | Diproses / tenggat & dokumen kurang (pill bergaris) |
| Font | Onest 400–600 (pengganti sans geometris EduWay) | Judul berbobot 500, bukan bold |
| Radius | 10 (field, tombol bayar) · 14–16 (baris, kartu) · 20–24 (panel, kartu catatan) · pill | |
| Bayangan | Tidak ada; pemisahan dari abu panel vs putih baris | |

Skala teks: hero 52 · h1 36 · h2 28 · h3 18 · body 15 · meta 13 · small 12 · nominal bayar 34.

## Komponen
`topbar` (header panel) + `nav` · `panel` / `panel--white` + `panel__head` · `rows` + `r` + `r-head` (`cols-fee`, label per sel di mobile) · `chips` + `chip` · `pill--blue/amber/green/red/mute/dark` · `note--green/blue` (kartu catatan) · `prog` (arsir) · `level` (kartu jenjang) · `task` · `faq` · `steps` + `step` (langkah PPDB) · `doc` (unggah) · `field` + `input` + `input-group` · `opt` (skema bayar) · `dstrip` + `dday` + `legend` · `agenda` · `checkout` + `lines` + `paybtns` · `board` + `lane` + `card` (kanban staf) · `quota` · `footer` · `done`

## Aturan
- Putih + abu netral sebagai struktur. Warna penuh hanya di kartu catatan (maks. 2 per layar) dan pill status.
- Navy untuk aksi utama, hitam untuk status aktif/terpilih, biru brand untuk informasi jadwal.
- Tanpa foto anak: satu-satunya foto adalah gedung dan pepohonan kampus. Sisanya dibangun dari panel, angka, dan jadwal.
- Tidak ada sidebar + KPI; layar staf berbentuk kanban dengan bar kuota.
