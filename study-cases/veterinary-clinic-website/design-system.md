# Design System — Kalis (klinik hewan)

File: `public/prototypes/ds/veterinary-clinic-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/square-appointments*.png` | Landing: judul besar sans rata kiri + dua tombol pill (isi & garis) + foto lebar radius 16 dengan kartu produk mengambang di atasnya. Situs booking "Iris & Onyx" di dalamnya: tab kategori teks bergaris bawah, daftar layanan (nama, deskripsi 2 baris, harga · durasi, thumbnail kanan), kalender bulan dengan tanggal terpilih kotak hitam, jam dikelompokkan Pagi/Siang dalam chip abu radius 6 |
| `_design-reference/dashboard/clinic-26677577-saas-dashboard-dental-clinic-management.jpg` | Rekam medis: sidebar putih bergaris dengan item aktif terisi warna brand, judul halaman + tombol garis/isi di kanan, kartu "Patient Information" berupa grid label abu / nilai 2 kolom dipisah garis, kartu "Doctor's Note" dengan avatar + nama + catatan, kartu grafik, tabel riwayat dengan kepala abu |

Alasan: Square Appointments adalah produk booking layanan per staf dan per waktu, sama dengan booking dokter hewan per hewan; DentaClinic adalah satu-satunya referensi yang menampilkan **rekam per pasien** (bukan daftar janji), cocok untuk rekam kesehatan hewan. Fresha (barbershop), Alodokter dan Glacio (klinik manusia) sengaja tidak dipakai.

Tidak diambil: serif display Square (diganti sans tegak supaya tidak jatuh ke gaya "serif besar"), label mono kapital Square, warna teal DentaClinic (diganti navy brand asli), bingkai iPad dari referensi lain hanya dipakai sebagai wadah layar operasional.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` / `--ink-2` / `--ink-3` | #111418 / #5D6470 / #9AA1AB | Teks, meta, nonaktif; `--ink` juga tanggal & jam terpilih (pola Square) |
| `--line` / `--line-2` | #E3E5E9 / #CFD3D9 | Garis kartu, tabel, tombol garis |
| `--soft` | #F3F4F6 | Chip jam, kepala tabel, kotak vital |
| `--brand` | #1D3394 | Navy brand asli (#001A6E) dijenuhkan: tombol utama, pilihan aktif, sidebar aktif, garis grafik |
| `--red` | #C42F27 | Merah brand asli, **hanya** untuk darurat, alergi, dan tugas terlambat |
| Status | ok #1F7A4D · warn #A8570A (+ versi soft) | Label sepi/ramai, vaksin selesai/jatuh tempo, tugas selesai |
| Font | Instrument Sans 400–700 (padanan Square Sans) | |
| Radius | 6 (chip jam, hari, kandang) · 8 (foto kecil, pilihan) · 12 (kartu) · 16 (foto hero) · pill (tombol, label) | |
| Bayangan | Hanya kartu mengambang di hero, bar ringkasan booking, dan bingkai tablet | |

Skala teks: hero 64 · h1 40 · h2 28 · h3 18 · lead 18 · body 15 · meta 14 · small 13.

## Komponen
`alert-line` (pita darurat tipis) · `btn-primary / btn-outline / btn-ghost / btn-dark / btn-red` · `hero` + `hero-media` + `float-card` · `tabs` · `svc` + `svc__thumb` (daftar layanan Square) · `svc.is-selectable` + `radio` · `er` (kotak darurat bergaris merah) · `branches` + `hours` · `vets` + `avatar` · `pets` / `pet` · `vet-chip` · `cal` + `day` · `slot-group` + `slot` · `cart-bar` (ringkasan menempel di bawah) · `app` + `side` + `box` + `kv-grid` · `note` · `vax` (linimasa vaksin) · `chart` (SVG berat) · `table` · `toggle` · `tablet` + `sheet` + `task` + `vital` + `seg` (papan rawat inap)

## Aturan
- Putih bersih, navy untuk aksi, merah hanya untuk hal yang mendesak. Tidak ada blok warna besar selain pita darurat setinggi satu baris.
- Booking memakai bar ringkasan di bawah (pola keranjang Square), bukan kolom ringkasan kanan.
- Avatar inisial untuk dokter dan hewan; foto dokter asli tidak dipakai.
- Ikon Lucide garis 1.75, tanpa lingkaran latar.
