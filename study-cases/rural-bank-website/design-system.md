# Design System — Tunas Arta (koperasi simpan pinjam)

File: `public/prototypes/ds/rural-bank-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/finance-27245254-hiverep-loan-management-dashboard.jpg` (HiveRep) | Merah sebagai warna aksi (cocok dengan merah brand asli), kartu putih radius 16 dengan label abu + angka besar + kotak ikon merah muda di kanan atas, **strip pill** (rel abu berisi pill putih: ikon bulat + angka + keterangan abu di kanan), blok merah solid berisi panel transparan putih ("Segment Insights" → kotak "Yang tidak pernah kami lakukan" dan "Angsuran berikutnya"), shell abu dengan area kerja putih bersudut 24 di atas, nav aktif putih berteks merah, search pill putih, pill status lembut (hijau/kuning/merah) |
| `_design-reference/flow-form/stripe-checkout*.png` (Stripe Checkout) | Navy #0A2540 sebagai warna teks dan tombol final, halaman **terbelah**: kiri abu berisi ringkasan dengan nominal besar (dipakai untuk simulasi + jadwal angsuran), kanan putih berisi form; field **bersambung** (beberapa input dalam satu kotak bergaris, baris 2 kolom), tombol navy penuh lebar, kartu form mengambang berbayangan di hero, garis bantu vertikal tipis di tepi kolom hero |

Tidak diambil: gradien ungu-biru dan ungu Stripe, sidebar dan 4 KPI HiveRep, label kapital berjarak di kepala tabel HiveRep, grafik.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #0A2540 | Teks utama, tombol final (kirim, simulasi), sel terpilih, segmen aktif |
| `--ink-2` | #5B6B7F | Meta, label field |
| `--line` / `--line-2` | #E4E8EE / #CFD6DF | Garis kartu & tabel / garis field |
| `--shell` | #F4F5F7 | Latar shell aplikasi, panel ringkasan Stripe |
| `--track` | #ECEEF2 | Rel strip pill, progres kosong |
| `--red` | #D8302B | Merah brand asli: CTA, link, nav aktif, blok merah |
| `--red-tint` | #FDECEB | Hanya kotak ikon & pill kecil |
| `--green` / `--amber` | #0F7B55 / #A15C07 | Status lunas/sesuai, perlu revisi |
| Font | Geist 400–700, Geist Mono 500 (nomor anggota, NIK, VA, nomor pengajuan) | |
| Radius | 8 (field, tombol kotak) · 12 (panel) · 16 (kartu) · 24 (lembar kerja) · pill (strip, tombol shell) | |
| Bayangan | Garis 1px sebagai bayangan kartu; bayangan nyata hanya kartu form mengambang & toast | |

Skala teks: hero 54 · h1 36 · h2 26 · h3 17 · nominal 40 · body 15 · meta 14 · small 13.

## Komponen
`notice` (pita navy peringatan penipuan) · `btn-primary` (merah) · `btn-dark` (navy, aksi final) · `btn-pill` (di shell aplikasi) · `float-card` · `input-affix` (Rp + angka besar) · `joined` (field bersambung) · `seg` (pilihan tenor, tombol nonaktif bila tenor tidak berlaku) · `strip` + `strip__item` · `card` + `stat` + `ico` · `redblock` · `pill` · `table` + `rates` (sel bunga bisa diklik) · `tabs` · `rows`/`rowi` · `split` (Stripe) + `doc` (checklist unggah) · `segbar` (24 angsuran) · `kvs` · `queue`/`qitem` + `case` + `doctile` + `gauge` + `timeline` + `decision` (meja AO)

## Aturan
- Putih dan abu sangat terang; merah untuk aksi dan satu blok penekanan per layar, navy untuk keputusan final.
- Angka uang selalu tabular, rata kanan di tabel. Bunga ditulis "mulai"/perkiraan; setiap simulasi diberi catatan tidak mengikat.
- Tidak ada foto (semua foto situs asli ber-watermark). Identitas visual dari tipografi, angka, dan warna.
- Tanpa gradien, tanpa label kapital berjarak, tanpa grid ikon fitur.
