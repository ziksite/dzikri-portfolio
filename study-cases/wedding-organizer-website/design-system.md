# Design System — Laras Wedding & Catering

File: `public/prototypes/ds/wedding-organizer-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/booking-27646449-yow-island-reservation-dashboard.jpg` | Kanvas abu dengan panel putih radius besar, sidebar abu muda dengan item aktif slate gelap (#2F4549), tombol pill (slate solid + putih bergaris), judul halaman serif tegak di atas UI sans, chip event pastel (hijau/biru/pink/abu), panel samping gelap untuk asisten → dipakai untuk kartu "Jadwal berikutnya", form konsultasi, bar estimasi, dan header kru |
| `_design-reference/dashboard/table-27727495-saas-reservation-calendar-list-view-ui-u.jpg` | Kartu grup dengan titik warna + judul + chip jumlah abu ("Total rooms: 16" → "2 gedung", "6 cue"), grid sumber daya × tanggal (gedung × akhir pekan), blok warna pucat dengan garis kiri 3 px (hijau kosong, merah terisi), area arsir kuning "Not available" → "Perawatan gedung", tab dengan badge angka |

Tidak diambil: logo ikon dalam kotak dan avatar foto Yow, tombol biru 27727495, latar beige Yow (diganti abu netral supaya tidak terbaca "kertas").

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--canvas` | #EFEFEE | Latar halaman (kanvas Yow) |
| `--surface` / `--side` | #FFFFFF / #F8F8F8 | Panel, sidebar, field |
| `--ink` / `--ink-2` / `--ink-3` | #161B1C / #5D6567 / #9AA1A3 | Teks, meta, label |
| `--line` / `--line-2` | #E6E7E7 / #D6D9DA | Garis panel, border tombol |
| `--slate` / `--slate-2` | #2F4549 / #22353A | Item aktif, segmented terpilih, panel gelap, bar estimasi, header kru |
| `--brand` | #C42D5F | Raspberry brand asli (#CC3366) dijenuhkan: CTA utama, slot terpilih, cue berjalan |
| Chip | hijau #D6F6DE · biru #D4EDF2 · pink #FBD3E5 · amber #FCEFCF · abu #F0F0F0 | Status & PIC |
| Garis status | ok #22A559 · terisi #E5484D · ditahan #E0A106 · arsir #FBF9E4 | Grid ketersediaan |
| Font | DM Serif Display 400 (judul halaman/section saja, tegak) · Manrope 500–800 (UI) | |
| Radius | 6 (chip, slot) · 8 (field) · 14 (panel, foto) · 20 (sheet, shell, panel gelap) · pill (tombol) | |
| Bayangan | Hanya main shell planner & bar estimasi | |

Skala teks: display 60 · h1 40 (serif) · h2 22 · h3 16 · body 15 · meta 14 · small 13.

## Komponen
`btn-primary` (pill raspberry) · `btn-dark` (pill slate) · `btn-secondary` · `sheet` · `panel` + `panel__head` · `group__title` + `dot` + `count` (kartu grup) · `chip` (pastel, status/PIC) · `pill` (filter) · `tabs` + badge angka · `compare` (tabel perbandingan paket) · `avail__grid` + `slot--free/booked/hold/off` (gedung × tanggal) · `seg` (jumlah tamu) · `opt` (radio kartu menu) · `stepper` · `acc` (isi paket) · `paysteps` (jadwal bayar 4 kolom) · `estbar` (bar estimasi gelap sticky) · `dark` + `daypick` + `timepick` (form konsultasi) · `shell` + `side` + `main` (planner) · `check` + `progress` · `cue` (rundown: is-done / is-now / is-next) · `vendor`

## Aturan
- Kanvas abu, konten di panel putih. Slate gelap hanya untuk satu blok per layar: bar estimasi, kartu jadwal, form konsultasi, header kru.
- Raspberry hanya untuk aksi utama dan "yang sedang dipilih/berjalan". Pastel hanya di chip dan slot kecil, tidak untuk area besar.
- Serif hanya untuk judul (tegak, bukan miring). Label kecil memakai sentence case, bukan kapital berjarak.
- Struktur layar mengikuti pola produk reservasi: kartu grup + grid sumber daya × waktu, bukan hero + grid kartu.
