# Design System — Laga

File: `public/prototypes/ds/gym-fitness-club-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/gym-24668828-gym-management-dashboard.jpg` | Kanvas hitam, nav pill bersegmen dengan item aktif putih, kolom kiri judul + 2 tombol bertumpuk (solid, outline), kartu "Gym Capacity" berupa matriks titik |
| `_design-reference/dashboard/gym-27670569-rfitness-gym-management-dashboard-design.jpg` | Banner warna solid selebar konten, takik sudut kartu dengan tombol panah persegi, tabel dengan header abu terisi, radius lembut 12–18 |

Tidak diambil: ungu Rfitness, aksen neon dan kartu miring goJim, sidebar + 4 KPI. Warna aksi diganti merah brand asli.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--bg` | #0B0B0C | Kanvas |
| `--surface` / `-2` / `-3` | #151517 / #202023 / #2C2C30 | Kartu, field, hover |
| `--line` | #2E2E33 | Garis |
| `--ink` / `-2` / `-3` | #FFFFFF / #AEAEB5 / #7C7C84 | Teks |
| `--red` | #DC1D24 | Aksi, pilihan aktif, Arena Studio (merah asli situs) |
| `--spin` / `--flow` | #FF8A1F / #E4E4E7 | Penanda studio di jadwal |
| `--ok` / `--warn` | #0E7A47 / #B86A00 | Status kiosk |
| Font | Archivo 400–800, wordmark lebar 75% | |
| Radius | 8 (chip) · 12 (tombol, field) · 18 (kartu) · pill (nav) | |
| Bayangan | Tidak ada | |

Skala teks: hero 54 · h1 38 · h2 26 · h3 17 · body 15 · meta 14 · small 13.

## Komponen
`nav` (pill) · `btn` · `card` + `notch` (takik + tombol panah) · `banner` · `zone-card` · `dots` (peta jam ramai) · `next` · `table` · `class-tile` · `promo` · `seg` · `tt` + `cls` (jadwal mingguan) · `daytabs` + `daylist` (jadwal HP) · `dock` · `mx` + `price` (matriks harga) · `chip` · `stepper` · `picked` · `total` · `success` + `codebox` · `tablet` + `result` + `pin` + `pad` (kiosk)

## Aturan
- Gelap penuh, merah hanya untuk aksi dan blok solid. Tidak ada gradien dekoratif, bayangan, atau banner promo berupa foto.
- Brand hanya wordmark teks LAGA.
- Warna studio hanya muncul sebagai garis tepi di jadwal.
- Layar kiosk memakai warna status penuh satu panel supaya terbaca dari jarak jauh.
