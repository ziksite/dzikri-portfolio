# Design System — Bahtera Kargo

File: `public/prototypes/ds/cargo-shipping-company-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/flow-form/sicepat-tracking*.png` | Banner foto lebar dengan widget putih yang menumpuk di bawahnya; tab bersegmen di bar abu (tab aktif putih + bayangan tipis, teks warna brand); field resi + tombol pill warna brand + link "+Tambah" untuk banyak resi; kartu abu bergaris radius 12; tombol pill; font Poppins |
| `_design-reference/flow-form/anteraja-tracking*.png` | Lacak dan tarif sebagai dua jalan masuk setara di layar pertama (di sini jadi tab "Lacak resi / Cek tarif / Minta jemput") |
| `_design-reference/dashboard/dispatch-27732810-fleetyu-react-logistics-admin-dashboard.jpg` | Baris rute: chip ID abu + "Asal → Tujuan" + chip meta bergaris kecil dengan ikon (ETA, armada) + pill status bergaris di kanan; bar utilisasi tipis per armada (label kiri, nilai kanan) |

Tidak diambil: banner promo dan maskot SiCepat, latar kuning Anteraja, sidebar gradien + 4 kartu KPI berwarna FleetYu (layar operasional dibuat sebagai papan muat, bukan dasbor KPI).

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #141B2D | Teks utama |
| `--ink-2` | #5E6675 | Meta, label field |
| `--line` / `--line-2` | #E4E7EC / #D0D5DD | Garis kartu / garis field & tombol sekunder |
| `--soft` / `--soft-2` | #F6F7F9 / #EEF0F4 | Bar tab, kartu abu, chip ID, rel bar |
| `--brand` | #F25C05 | Oranye brand asli (rata): tombol aksi, tab aktif, pilihan terpilih |
| `--navy` | #0B2A7A | Navy brand asli: wordmark, link, progres milestone, bar volume, filter aktif |
| `--ok` / `--warn` / `--bad` | #12805C / #B54708 / #C4320A | Pill status (diterima, terlambat/hampir penuh, penuh) |
| Font | Poppins 400–700 | Satu keluarga, seperti SiCepat dan situs asli |
| Radius | 8 (field, slot) · 12 (kartu, daftar) · 16 (banner, widget) · pill (tombol, status, filter) | |
| Bayangan | Hanya widget di atas banner, tab aktif, dan bar aksi bawah | |

Skala teks: hero 44 · h1 30 · h2 24 · h3 17 · body 15 · meta 14 · small 13.

## Komponen
`nav` (wordmark teks + link bergaris bawah oranye) · `banner` + `widget` (kartu menumpuk) · `seg` (tab bersegmen) · `field` + `input` + `dims` (P × L × T) · `list` + `list__row` (tabel moda, rute, kiriman) · `id-chip` · `meta-chip` · `pill` (ok/warn/bad/navy/mute) · `fchip` (filter) · `meter` (bar utilisasi) · `opt` (radio baris layanan + harga) · `stepper` · `slot` (tanggal/jam jemput) · `addon` (asuransi, packing) · `actionbar` (total sticky bawah) · `route` (asal → tujuan) · `miles` (milestone horizontal, vertikal di HP) · `log` (riwayat bertanggal) · `kv` · `doc` · `panel` + `wait` + `lane` + `load` (papan muat gudang) · `inv` (baris tagihan)

## Aturan
- Putih dengan abu sangat muda untuk bar dan kartu sekunder. Oranye hanya untuk aksi dan pilihan aktif, navy untuk informasi dan progres.
- Angka (tarif, berat, volume, resi) selalu tabular.
- Status selalu pill bergaris dengan teks; warna tidak pernah jadi satu-satunya penanda.
- Tidak ada gradien dekoratif, blok warna penuh, ikon dalam lingkaran, atau metafora tiket/papan keberangkatan.
- Tabel lebar di HP digulir horizontal di dalam kontainernya, bukan memperlebar halaman.
