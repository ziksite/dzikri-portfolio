# Design System — Klinik Utama Nirmala

File: `public/prototypes/ds/multi-specialty-clinic-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/alodokter-health*.png` | Pita warna berisi nav + hero dengan foto dokter, nav putih bergaris tipis + kotak cari bergaris, ikon layanan bulat putih dengan cincin & label bergaris bawah, judul section + tab kategori bergaris, daftar bergambar dengan pill kategori di foto dan link "Lihat …", font Lato |
| `_design-reference/dashboard/clinic-27355827-glacio-…jpg` | Dashboard janji temu: sidebar navy, area kerja putih membulat, chip filter, grup "Hadir / Perlu ditindaklanjuti" dengan jumlah, kartu janji dengan label status huruf kapital, tombol Hadir (hijau) / Tidak hadir (merah garis) / … |

Tidak diambil: gradien biru Alodokter (pita dibuat rata).

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--brand` | #3C4998 | Indigo brand asli klinik: pita, tombol utama, link |
| `--accent` | #FF9529 | Oranye brand asli (cadangan CTA) |
| `--ink` / `--ink-2` | #2B2B2B / #6B6B6B | Teks / meta |
| `--line` | #E3E3E3 | Garis kartu, tab |
| `--navy` | #0F1C2E | Sidebar dashboard |
| Status | ok #0F9B6E · info #2F7DE1 · warn #B7791F · bad #D64545 | Label & tombol dashboard |
| Font | Lato 400 / 700 / 900 | |
| Radius | 6 (tombol, field, foto) · 10 (kartu) | |

Skala teks: hero 32 · sub 21 · h1 28 · h2 22 · h3 16 · body 15 · meta 14 · small 12.5.

## Komponen
`band` + `nav` + `hero` · `shortcut` (ikon bulat) · `section__title` + `cats` (tab bergaris) · `feature` / `item` + `pill` (daftar bergambar) · `doc` + `slot-mini` (kartu dokter) · `filter` + `check` · `box` (kotak bergaris dengan kepala) · `days` + `time` (jadwal) · `field` / `input` · `note` · `dash` + `appt` + `status` (dashboard)

## Aturan
- Warna utama hanya di pita atas, tombol, dan link. Halaman isi tetap putih.
- Kartu bergaris tipis, tanpa bayangan.
- Dashboard memakai pola kartu janji (bukan tabel KPI): tiap kartu berisi status + tindakan langsung.
