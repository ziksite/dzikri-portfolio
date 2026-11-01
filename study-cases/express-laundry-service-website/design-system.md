# Design System — Bilas Laundry

File: `public/prototypes/ds/express-laundry-service-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/dispatch-27732810-fleetyu-react-logistics-admin-dashboard.jpg` | Kartu putih bergaris tipis di atas abu dingin, chip ID abu + pill status kecil berwarna lembut, baris rute padat (di sini papan kecepatan dan "Sedang berjalan di outlet"), bar utilisasi tipis (kapasitas kawasan, progres nota) |
| `_design-reference/dashboard/pos-20714302-kasa-pos-dashboard-interaction.jpg` | Tablet kasir berbingkai gelap: panel utama + panel order kanan, kategori di atas, tile pilihan, total di bawah, tombol biru selebar panel; bar bawah pemesanan meniru area "Charge" |

Tidak diambil: gradien sidebar dan kartu KPI FleetYu, grid foto Kasa.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #10162B | Teks, footer |
| `--ink-2` / `--ink-3` | #56607A / #8E97AD | Meta / nonaktif |
| `--line` / `--line-2` | #E2E7F0 / #CBD3E2 | Garis / garis field |
| `--soft` | #F2F5FA | Latar aplikasi, field (abu dingin, bukan krem) |
| `--blue` / `--blue-2` / `--blue-tint` | #1B3FD1 / #132FA3 / #E6ECFC | Biru brand asli dijenuhkan: hero, aksi; hover; chip kecil |
| `--sun` | #FF9800 | Oranye brand asli: satu pilihan aktif, teks selalu gelap |
| `--ok` `--warn` `--late` | #0E7C5A · #9A5600 · #C8153D + tint | Status nota |
| Font | Be Vietnam Pro 400–700 | Satu keluarga, angka tabular |
| Radius | 6 (tombol, field) · 10 (foto, tile) · 14 (kartu) | Tombol persegi, bukan pill |
| Bayangan | Hanya papan kecepatan | |

Skala teks: hero 46 · h1 34 · h2 26 · h3 17 · body 15 · meta 14 · small 13.

## Komponen
`board` (papan kecepatan: `bd-row`, `track`, `bar`) · `seg` · `stepper` · `terms` · `steps` · `satuan` · `tbl` + `util` · `pill` · `col` + `pk` + `slot` (pesan tiga kolom) · `dock` (bar bawah) · `gantt` + `lane` + `seg-b` + `now-line` (rencana vs aktual) · `stage` + `tablet` + `pos` (`queue`, `tile`, `run`, `scale`, `key`, `receipt`)

## Aturan
- Jam kembali selalu terlihat di samping harga. Linimasa adalah motif utama, bukan dekorasi.
- Oranye hanya untuk satu hal yang sedang dipilih atau berjalan.
- Klaim kecepatan selalu memakai kata "target" dengan syarat tertulis.
- Pilihan yang tidak tersedia tetap tampil dan dinonaktifkan.
- Merek hanya wordmark teks. Tanpa ikon emoji, kartun, latar krem, atau gradien.
