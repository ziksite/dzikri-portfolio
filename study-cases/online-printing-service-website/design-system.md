# Design System — Pelat

File: `public/prototypes/ds/online-printing-service-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/moo-print*.png` | Utility strip abu di atas header, header dengan wordmark kiri + link utilitas teks + kolom cari bergaris bawah, nav kategori teks satu baris, hero terbelah (blok warna solid kiri dengan judul putih + tombol putih persegi, foto kanan sampai tepi), pita abu (#ECEEED) penuh lebar untuk seksi katalog, judul seksi rata tengah + lead abu, ubin produk 4 kolom (area gambar tanpa radius + keterangan putih dengan link hijau "›"; di sini area gambar berisi bentuk produk CSS), tombol hijau tua persegi di bawah grid, panel ajakan abu dengan foto di kanan |
| `_design-reference/flow-form/moo-business-card-config*.png` | Pola halaman kategori kartu nama: breadcrumb kotak abu, deret **ukuran** yang digambar sesuai proporsi (bukan foto) + harga "mulai dari", ubin **kertas** dengan judul, poin spesifikasi, badge pill hitam "BARU", dan link hijau. Pola ini diteruskan ke konfigurator: pilihan ukuran berupa kotak dengan bentuk mini, pilihan kertas berupa kartu bergaris |

Kenapa MOO: bisnisnya adalah toko cetak produk dengan harga tergantung ukuran, kertas, finishing, dan jumlah, persis yang ditampilkan MOO per ukuran dan per kertas. Hijau aksi MOO juga dekat dengan hijau brand asli situs.

Tidak dipakai: `landing/vistaprint-print` (sudah dipakai toko listrik) dan `flow-form/printful-pricing` (kalkulator abu terbelah + Figtree sudah dipakai bimbel). Panel harga di sini dibuat putih bergaris dengan garis atas hijau, mengikuti sudut siku MOO, dan font diganti Outfit. Dari MOO tidak diambil: ilustrasi ikon berwarna di deret jaminan (diganti ikon garis Lucide tanpa lingkaran dalam satu baris bergaris), deret logo klien, latar plum hero kartu nama.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #1A1C1B | Teks utama |
| `--ink-2` | #5B605D | Meta, deskripsi |
| `--line` / `--line-2` | #DCDFDD / #C4C9C6 | Garis panel / garis kontrol |
| `--band` | #ECEEED | Pita abu MOO, latar pratinjau & proof |
| `--panel` | #F5F6F5 | Latar layar produksi, kepala tabel |
| `--act` | #10361D | Tombol utama, pilihan aktif (hijau brand asli #0A5603 digelapkan) |
| `--link` | #19700F | Link "›", persentase hemat, status lolos (hijau brand asli) |
| `--navy` | #0D2F50 | Blok hero |
| `--warn` / `--err` | #A35A00 / #C0392B | Preflight peringatan / gagal, plano melebihi kapasitas |
| Font | Outfit 400–700 (pengganti font geometris MOO) | |
| Radius | 0 (foto, ubin) · 2 (tombol, panel harga) · 4 (field, pilihan) | |
| Bayangan | Hanya pada kartu nama yang digambar dan lembar proof | |

Skala teks: hero 44 · h1 32 · h2 26 · h3 17 · body 16 · meta 14 · small 13.

## Komponen
`topbar` · `header` + `util` + `find` · `catnav` · `crumbs` · `hero` (blok + media) · `assure` (deret jaminan bergaris) · `band` · `tiles`/`tile` (+ `tile--card`: ubin tanpa foto) · `ps-*` bentuk produk datar (kartu nama `bc`, brosur lipat 3 `ps-tri`, paper bag `ps-bag`, kalender `ps-cal`, nota NCR `ps-ncr`, amplop `ps-env`, sticky notes `ps-notes`, book notes `ps-book`, box `ps-box`) · `sizes`/`shape` (bentuk berproporsi) · `papers`/`swatch` · `callout` · `btn-primary` / `btn-white` · `go` (link hijau ›) · konfigurator: `choice`, `seg`, `check`, `tiers`, `calc` · order: `steps`, `file`, `pf` (preflight) + `st` + `lbl`, `proof` + `sheet` (garis potong, area aman, bleed), `approve`, `timeline` · produksi: `ops-bar`, `box`, `jobs`, `plano`, `meter`, `kv-list`, `gantt` + `bar`

## Aturan
- Putih dan abu MOO; warna penuh hanya di blok hero navy dan tombol hijau tua.
- Tombol dan ubin bersudut (radius 0–2), tanpa gradien atau kartu berbayangan.
- Tidak ada foto produk (semua mockup asli dicap logo toko). Produk, ukuran, dan kertas digambar sebagai bentuk datar berproporsi benar di atas abu #DFE2E0 dalam pita #ECEEED: warna rata, tanpa gradien, tanpa 3D, bayangan maksimal 1–3 px.
- Di layar produksi, warna hanya untuk membedakan pesanan di plano dan jadwal mesin.
