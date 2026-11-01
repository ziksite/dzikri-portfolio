# Design System — Labuh Seafood

File: `public/prototypes/ds/seafood-restaurant-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/pos-23369685-cashier-store-saas-pos-dashboard.jpg` | Shell tiga kolom: rail putih + menu aktif pill biru, area kerja abu netral, panel pesanan putih di kanan dengan foto di atas; breadcrumb alur (New Order > Select Table > Select Menu); chip kategori pill dengan garis biru saat aktif; kartu menu foto penuh di atas, nama, kategori, harga tebal, stepper pill dengan tombol plus bulat biru; kartu gelap di dasar rail |
| `_design-reference/dashboard/pos-27023546-shopify-retail-pos-dashboard.jpg` | Papan operasional: kartu putih radius besar di atas abu, top bar pill, angka kecil tenang, status pill warna lembut, kartu promo gelap di rail |

Tidak diambil: ilustrasi 3D dan tangan yang memegang tablet di referensi Cashier, avatar pelanggan, baris 4 KPI, grafik dekoratif, gradien hijau grafik Shopify, sudut pandang miring.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #101B2D | Teks utama |
| `--ink-2` | #5B6878 | Meta, deskripsi |
| `--line` | #E3E7ED | Garis panel, divider |
| `--bg` | #F1F3F6 | Latar aplikasi (abu netral referensi, bukan krem) |
| `--surface` | #FFFFFF | Kartu, rail, panel |
| `--soft` | #F4F6F9 | Field, baris slot, timbangan |
| `--navy` | #14263D | Biru tua brand asli: tombol utama, hero, kartu Reserve |
| `--blue` | #0A5AD6 | Biru brand asli dijenuhkan: nav aktif, tombol plus, harga etalase |
| `--red` | #D80000 | Merah brand asli: hanya stok "Sisa sedikit" |
| `--ok` / `--warn` | #0C7D55 / #A86400 | Status slot, teras, selisih timbang |
| Font | Be Vietnam Pro 400–700 | Satu keluarga untuk judul, teks, angka (tabular) |
| Radius | 10 (field) · 14 (kartu) · 18 (panel besar) · pill (tombol, chip) | |
| Bayangan | Hover kartu dan sheet mobile saja | |

Skala teks: hero 46 · h1 32 · h2 23 · h3 16 · body 15 · meta 14 · small 13. Timbangan 30.

## Komponen
`rail` (nav + pilih cabang + kartu Reserve) · `tabbar` + `m-top` (mobile) · `crumb` (alur) · `chip` · `btn-primary/blue/white/line/ghost` · `hero` (split navy + foto) · `slots` (meja malam ini) · `tile` (etalase beranda) · `dish` + `dish--sp` (kartu POS) · `stepper` · `panel` (kolom kanan, jadi sheet di mobile) · `scale` + slider (timbangan) · `cook` (cara masak + biaya) · `calc` · `nota` · `sum` · `floor` + `zone` + `tb` (denah) · `board` + `tt` + `lane` + `job` + `stock` + `bar` (papan) · `pill` · `faq`

## Aturan
- Situs ini bekerja seperti POS yang dibuka untuk tamu: rail di kiri, kerja di tengah, nota di kanan. Nota berpindah utuh dari etalase ke reservasi.
- Abu netral sebagai latar, putih sebagai kartu. Tidak ada latar krem atau pastel area besar.
- Navy untuk aksi utama, biru untuk status aktif, merah hanya untuk stok tipis.
- Satu-satunya gradien adalah isi slider berat, bersifat fungsional (tepi tajam).
- Foto gelap dan terang tidak dicampur dalam satu hero. Foto selalu di kartu, tidak ada teks di atas foto.
- Harga per gram selalu memperlihatkan rumusnya: berat × harga per 100 g + biaya masak.
