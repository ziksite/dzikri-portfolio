# Design System — Arunika Residence

File: `public/prototypes/ds/housing-cluster-developer-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/toast-restaurant*.png` | Header putih (wordmark oranye kiri, nav teks + chevron, link berikon pin lokasi, tombol pill bergaris oranye "Login" + pill isi oranye "Get a Demo"), hero foto gelap penuh lebar dengan **sudut bawah membulat besar** (radius 40) dan teks putih rata kiri, **input pill putih dengan tombol oranye di dalamnya** + catatan kecil + link berpanah di bawahnya, deret di bawah hero (di Toast: logo pelanggan → di sini: fakta proyek bergaris pemisah), **pita oranye penuh berisi kartu putih besar membulat** untuk footer (kolom link + "How can we help? Contact us." + tombol pill bergaris oranye) |
| `_design-reference/dashboard/finance-24595979-lend-cash-loan-management-dashboard-desi.jpg` (Lend Cash) | Kanvas abu terang dengan kartu putih bergaris tipis; judul halaman + **pill nama peach** berchevron; tag hijau muda di kanan kartu ("Last Year", "All ↗"); deret **tile angka** (label abu, delta hijau/merah di kanan, angka tebal) dengan **satu tile sorotan bergaris hijau + bayangan**; **grafik batang bertumpuk abu dengan satu batang hijau** + label nilai hijau di atasnya; kartu "In-Process Applications" (garis warna kecil di kiri atas, pill status abu/merah di kanan, nama tebal, meta, nilai besar); grid kotak "Daily Activity" (kotak abu radius 6, satu hijau, sisanya putih bergaris); daftar catatan dengan **ikon bulat warna lembut** (biru, peach, kuning, hijau, merah); kartu avatar inisial berwarna |

Alasan: situs asli adalah landing developer dengan satu tujuan (lead WhatsApp). Toast memberi struktur landing satu-aksi dengan input di hero dan warna oranye yang sama dengan brand asli. Proses rumah sesudah lead (simulasi KPR, booking fee, cicilan uang muka, progres) adalah urusan pinjaman dan tahapan, sehingga dashboard pinjaman Lend Cash dipakai untuk layar KPR dan akun pembeli; grid "Daily Activity"-nya diturunkan menjadi kotak kavling di siteplan dan kalender kunjungan. Housecall Pro, HiveRep, Stripe, Yow Island tidak dipakai (sudah dipakai situs lain atau tidak cocok: Yow Island berupa kalender reservasi, bukan peta unit).

Tidak diambil: coretan lingkaran oranye di judul Toast, foto koki, latar hijau mint di sekitar mockup Lend Cash, sidebar + bingkai tablet Lend Cash (layar dibuat sebagai halaman penuh dengan top bar).

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #1D1D1F | Teks, tab aktif, tombol gelap |
| `--ink-2` | #6B7280 | Meta, label tile |
| `--line` / `--line-2` | #E6E8EC / #D3D7DE | Garis kartu, kotak kavling tersedia |
| `--canvas` | #F6F7F9 | Kanvas abu aplikasi & seksi selang-seling |
| `--tile` | #E3E6EB | Kavling terjual, tanggal tutup |
| `--brand` | #E2701B | Oranye brand asli (#E09B5A) dijenuhkan: tombol, wordmark, pita footer |
| `--brand-tint` | #FDE8D5 | Pill nama, kavling dibooking, pill "Proses" |
| `--ok` / `--ok-tint` | #2F9A4B / #E3F3E6 | Tile sorotan, batang bulan ini, kavling dipilih, "Tersedia", "Lunas" |
| `--info-tint`, `--warn-tint`, `--bad-tint` | #DCEAF7, #FBF1B8, #FDE6E6 | Ikon bulat catatan, kolam di siteplan |
| Font | Figtree 400–800 (paling dekat dengan Toast Sans) | |
| Radius | 6 (kotak, pill status) · 10 (tile) · 14 (kartu, foto) · 24/40 (hero & kartu footer) · pill (tombol, input, tab) | |
| Bayangan | Hanya tile sorotan dan kartu bank terpilih | |

Skala teks: hero 60 · h1 34 · h2 26 · h3 19 · angka besar 30 · body 16 · meta 14,5 · small 13.

## Komponen
`header` + `nav` · `hero` (foto + scrim kiri, radius bawah) · `pill-form` (input + tombol di dalam) · `facts` · `seg` (tab pill) · `type-view` + `type-dims` · `speclist` · `dist` · `band` + `band__card` + `foot-grid` · `app-top` + `who-pill` + `menu-btn` · `card` + `card__head` + `count` + `mini-link` · `stats` + `stat` / `stat--focus` · `bars` (batang bertumpuk, `is-hot`, `is-plan`) · `proc-row` + `proc` + `dashes` + `pill` · `notes` + `ic--*` · `team` + `av` · `plan` + `lots` + `lot` (`is-booked`, `is-sold`, `is-selected`, `is-dim`) + `road` + `fac` · `spec-grid` + `kv` · `dgrid` + `dcell` + `slots` · `table` · `pbar`

## Aturan
- Halaman publik putih dengan seksi abu selang-seling; oranye hanya untuk aksi, wordmark, dan pita footer.
- Hijau hanya berarti "tersedia / selesai / dipilih / bulan ini"; peach berarti "dibooking / proses / tagihan dekat".
- Layar pembeli & simulasi memakai kanvas abu + kartu putih, tanpa sidebar dan tanpa deret 4 KPI di atas sidebar.
- Tidak ada gradien dekoratif; satu-satunya gradien adalah scrim gelap di hero agar teks terbaca.
