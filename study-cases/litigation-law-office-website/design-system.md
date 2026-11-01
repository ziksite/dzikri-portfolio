# Design System — Saksama & Rekan

File: `public/prototypes/ds/litigation-law-office-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/portal-26258738-enlight-student-portal-dashboard.jpg` | Sidebar putih dengan grup navigasi, kartu putih radius besar di kanvas abu netral, angka besar dengan pecahan abu (`120/144` menjadi `2/4`, `2/5`), warna aksi terong tua, pill status pastel kecil |
| `_design-reference/dashboard/finance-27736497-lendflow-loan-management-dashboard-finte.jpg` | Sidebar warna solid untuk layar tim, tabel bergaris tipis, pill hijau/kuning, daftar agenda |

Tidak diambil: grafik, deretan KPI, foto avatar, header tabel huruf kapital LendFlow, latar mint promosi LendFlow.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #1F1D26 | Teks utama |
| `--ink-2` | #6F6C78 | Meta, deskripsi |
| `--line` / `--line-2` | #E7E6EA / #D6D4DB | Garis kartu / garis field |
| `--bg` / `--soft` | #F5F5F6 / #F1F0F3 | Kanvas abu / item aktif |
| `--plum` / `--plum-2` | #3D3160 / #2F2550 | Aksi / sidebar tim |
| `--plum-3` | #ECEAF3 | Avatar inisial, agenda sidang |
| `--ok`, `--warn`, `--risk` | #1F7A4D, #8F6200, #A3334F (dengan latar pastel) | Status dan tenggat |
| Font | Wix Madefor Display 500–600 (judul), Wix Madefor Text 400–600 (teks) | |
| Radius | 8 (tombol, field) · 12 · 16 (kartu) | |
| Bayangan | Sangat tipis di kartu, tegas hanya di drawer | |

Skala teks: hero 58 · h1 34 · h2 23 · h3 16 · body 15 · meta 14 · small 13.

## Komponen
`shell` + `side` + `topbar` · `nav-item`, `nav-group` (pohon perkara) · `trail` (jejak jawaban) · `sit` (indeks masalah 2 kolom) · `process` · `table` · `person` (avatar inisial) · `fraction` + `bar` · `opt` (jawaban satu baris) · `notice` · `stage` · `docs` · `check` · `cal`, `day`, `slot`, `seg` · `field` · `sticky-bar` · `ops`, `rail`, `board`, `col`, `mcard`, `drawer`, `track`

## Aturan
- Situs publik memakai kerangka portal: navigasi berdasarkan masalah di kiri, bukan menu atas plus hero foto.
- Tanpa foto. Isi dibawa tipografi, garis, dan angka pecahan.
- Tidak ada timbangan, palu, pilar, atau simbol hukum lain. Brand hanya wordmark teks.
- Terong adalah satu-satunya warna aksi. Merah muda dipakai hanya untuk tenggat dekat dan peringatan waktu.
- Salinan tidak boleh memuat peringkat, tingkat kemenangan, jumlah perkara, atau janji hasil.
