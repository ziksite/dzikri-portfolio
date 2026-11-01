# Design System — Sein (sekolah mengemudi)

File: `public/prototypes/ds/driving-school-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/portal-26270402-student-portal-dashboard-web-app-design.jpg` (UpGradely) | Panel putih radius besar di atas latar, pill hitam untuk item aktif, chip bergaris, lingkaran centang hijau muda untuk kehadiran, warna oranye untuk status berjalan, batang arsir untuk waktu yang tidak terpakai, angka besar berat sedang |
| `_design-reference/dashboard/portal-27341288-upskilla-student-portal-dashboard-ui.jpg` | Deret tanggal dengan titik agenda dan kotak bergaris pada hari terpilih, tanggal hari ini berwarna oranye, kartu sesi berikutnya, panel kanan bertumpuk |
| `_design-reference/dashboard/dispatch-27440437-field-service-management-erp-solution.jpg` | Checklist capaian, linimasa aktivitas berjam, status kerja dan penugasan. Dipakai di papan kunci dan HP instruktur |

Kenapa ini: bisnis ini soal siswa yang menjalani kursus bertahap, sehingga bahasa portal siswa dipakai sejak beranda. Panel menggantikan foto sebagai isi visual karena foto bersih hanya sedikit.

Tidak diambil: gradien pastel UpGradely, sidebar navy Upskilla, foto avatar, kartu KPI, ikon berwarna dalam lingkaran dari referensi dispatch.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #111311 | Teks, tombol utama, pill aktif, latar papan kunci |
| `--ink-2` / `--ink-3` | #646B66 / #979E99 | Deskripsi / meta lemah |
| `--line` / `--line-2` | #E2E5E3 / #CDD2CF | Garis / batas kontrol |
| `--canvas` | #EDEFEE | Latar halaman, abu netral |
| `--soft` | #F3F4F3 | Field, sel kosong |
| `--green` | #44A801 | Hijau brand asli: CTA daftar, rute yang sudah dilalui |
| `--green-ink` | #2C7300 | Hijau untuk teks |
| `--lime` | #B6F08C | Lingkaran centang, status selesai |
| `--orange` / `--orange-soft` | #FF6B35 / #FFE4D9 | Sedang berjalan, hari ini / servis |
| Font | Lexend 500 (judul, angka), DM Sans 400–600 (teks) | |
| Radius | 10 · 14 · 22 · pill | |
| Bayangan | Tidak ada | Pemisahan memakai panel di atas `--canvas` |

Skala teks: hero 50 · h1 34 · h2 24 · h3 17 · body 15 · meta 14 · small 13.

## Komponen
`nav` (panel) · `card` · `btn` · `seg` · `pill` · `tick` · `builder` + `strip`/`stop` (penyusun kursus dengan garis materi) · `fee` · `ledger` · `branch` · `faq` · `rail` (langkah) · `opt` · `week` + `slot` + `hatch` · `bar` (ringkasan sticky) · `days` · `map` (peta rute SVG, dibuat skrip) · `attend` · `checks` · `keytag` + `pips` (label kunci) · `log` · `phone` + `sw`

## Aturan
- Halaman terdiri dari panel putih di atas abu netral. Tanpa bayangan dan tanpa gradien.
- Hitam untuk aksi dan pilihan aktif. Hijau brand dipakai untuk kemajuan dan CTA daftar saja.
- Foto hemat: tiga foto, dipakai sebagai panel. Peta rute dan papan kunci yang mengisi visual.
- Instruktur memakai avatar inisial, tanpa potret dan tanpa rating.
- Setiap biaya di luar paket ditulis terbuka: formulir, Minggu, tips.
- Tidak ada jaminan lulus. Pernyataan SIM selalu menyebut prosedur resmi.
