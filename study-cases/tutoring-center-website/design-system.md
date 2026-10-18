# Design System — Bimbel Lajur

File: `public/prototypes/ds/tutoring-center-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/flow-form/printful-pricing*.png` | Halaman publik: header dengan toggle bersegmen abu ("Sell/Shop" → "Kelas tatap muka/Tryout online") + subnav teks, judul besar rata tengah + lead abu, 3 kartu paket bergaris tipis (nama + badge kecil, "untuk siapa", harga besar + satuan kecil, catatan tebal, tombol merah persegi radius 4, "Sudah termasuk:" + daftar centang), pita abu penuh lebar untuk section kedua, kalkulator terbelah (kiri putih berisi pilihan, kanan abu berisi input + total besar di tengah + tombol merah penuh). Dipakai juga sebagai bentuk kartu pendaftaran di halaman program. |
| `_design-reference/dashboard/portal-26258738-enlight-student-portal-dashboard.jpg` | Portal orang tua: sidebar putih dengan grup bisa dilipat (Akademik / Keuangan / Akun), item aktif berlatar abu, kartu angka "34/36" (angka besar berwarna + pembagi abu) dengan delta pill hijau/merah, grafik garis "skor vs rata-rata" dengan garis putus-putus dan tooltip gelap, tabel tagihan dengan pill status, kolom kanan jadwal berupa kartu bergaris. |

Kenapa dua ini: bisnisnya adalah **membandingkan program/paket dengan harga** (pola pricing Printful) dan **orang tua memantau nilai dan kehadiran** (pola portal Enlight). ClassPass tidak dipakai karena polanya bergantung pada kolase foto, sedangkan situs asli tidak punya satu pun foto bersih.

Tidak diambil: latar ungu pastel kartu "Growth" Printful (diganti garis navy 2px), latar abu-ungu dan ikon berwarna Enlight, foto avatar.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #222222 | Teks utama, tombol outline |
| `--ink-2` / `--ink-3` | #5C5C5C / #8C8C8C | Deskripsi / meta |
| `--line` / `--line-2` | #DDDDDD / #C2C2C2 | Garis kartu & tabel / field |
| `--band` | #F3F3F3 | Pita section, panel kanan kalkulator |
| `--red` | #D3261C | Merah brand asli (dijenuhkan): semua tombol aksi |
| `--navy` | #2E5373 | Navy brand asli: link, badge, angka portal, garis grafik, kartu terpilih |
| `--ok` / `--warn` / `--bad` | #1E7B3C / #9A5B00 / #C42B2B | Status hadir/lunas, izin/jatuh tempo, alpa |
| Font | Figtree 400–800 (pengganti Proxima Nova Printful) | |
| Radius | 4 (tombol, field, opsi) · 8 (kartu, tabel) · 12 (kartu portal) | |
| Bayangan | Hanya kalkulator/kartu daftar (`0 6px 24px rgba(0,0,0,.1)`) | |

Skala teks: hero 56 · h1 40 · h2 30 · h3 20 · lead 19 · body 16 · meta 14 · small 12,5.

## Komponen
`topbar` + `seg` (toggle) + `subnav` · `finder` (jenjang bersegmen → panel kartu) · `plan` / `plan--pick` + `badge` + `checks` · `band` + `section__head` · `table-box` + `tbl` · `calc` (`calc__l` / `calc__r`, `calc__total`) · `opt` (baris radio, `is-off` untuk penuh) · `stepper` · `week` + `slot` / `slot--to` (jadwal mingguan) · `list-rows` · `pill--ok/warn/bad/mute/navy` · `portal` + `side` + `pcard` + `stat` + `delta` + `chart` (SVG) + `att` (grid kehadiran) · `tablet` + `cls` + `roster` + `mark` (Hadir/Izin/Sakit/Alpa) + `tally`

## Aturan
- Putih dan abu netral. Merah hanya untuk tombol aksi, navy untuk informasi (link, angka, garis grafik). Warna status hanya di pill.
- Tidak ada foto: semua gambar situs asli adalah banner berteks dan berlogo. Hierarki dibangun dari harga, tabel, dan angka.
- Halaman publik mengikuti pola halaman pricing (kartu → pita abu → kalkulator), portal mengikuti pola dashboard akademik, bukan komposisi bebas.
