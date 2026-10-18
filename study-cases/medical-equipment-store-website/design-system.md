# Design System — Medira (toko & distributor alat kesehatan)

File: `public/prototypes/ds/medical-equipment-store-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/shopify-dawn-theme*.png` (Shopify Dawn) | Etalase: pita pengumuman tipis bergaris bawah, header wordmark kiri + menu teks abu dengan chevron + ikon cari/akun/tas di kanan, section "image with text" (foto 50% di kotak abu #F3F3F3 + teks rata kiri), kartu produk tanpa bingkai (media persegi, vendor kecil, judul, harga, badge pill gelap di pojok bawah foto), tombol bersudut 0 (utama berisi, sekunder garis 1px hitam), halaman produk media kiri lebar + info kanan, pill varian radius 40, kotak jumlah −/+, accordion bergaris (Spesifikasi, Izin edar, Garansi, Pengiriman), footer kolom tautan. Font Assistant = font bawaan Dawn. |
| `_design-reference/flow-form/stripe-checkout*.png` (Stripe Checkout) | Penawaran faskes: layar dibelah dua, panel kiri abu #F6F9FC (kembali + wordmark, label kecil, total besar, daftar item + subtotal) dan panel kanan putih berisi form; field dalam grup bergaris yang saling menempel (radius 6, baris dibagi garis), label abu di atas grup, tombol penuh radius 6, teks kecil di bawah tombol. Warna teks navy #0A2540. |
| `_design-reference/dashboard/table-25773171-data-table-saas.jpg` ("Received data requests") | Antrean servis staf: rail ikon gelap 70 px dengan item aktif berblok, top bar terang dengan "Kembali" + ikon kanan + avatar, judul tebal + angka reguler ("Tiket servis & garansi: 26"), tombol filter persegi bergaris gelap (radius 3, tinggi 46), tabel dalam wadah abu radius 16 dengan baris berupa kartu putih terpisah, ikon sortir di header, prioritas teks + chevron berwarna, chip status lembut radius 4, ID bergaris bawah, menu titik tiga. Font Poppins (juga font situs asli). |

Alasan: model bisnisnya toko katalog (23 kategori, B2C perawatan rumah) sekaligus pemasok faskes (B2B). Dawn memberi pola toko yang tenang dan mengutamakan produk, cocok untuk alat kesehatan; foto bersih sedikit, jadi katalog utama dibuat sebagai daftar harga berbasis teks (izin edar, garansi, stok) dan foto hanya dipakai di kartu unggulan. Stripe Checkout memberi pola "ringkasan di kiri, data di kanan" yang berbeda dari lembar RFQ toko listrik (tabel BOQ + tier harga) dan dari form-kiri-ringkasan-kanan. Antrean servis memakai pola tabel request, bukan sidebar + KPI atau kalender. Ketiga referensi belum dipakai situs lain.

Tidak diambil: hero foto penuh dengan teks tengah dari Dawn (tidak ada foto yang cukup bersih), gradien ungu dan kartu chat mengambang Stripe, latar biru muda referensi tabel di luar bingkai.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #121212 | Teks utama etalase, tombol sekunder bergaris |
| `--ink-2` | #5A5A5A | Meta, menu tidak aktif |
| `--line` / `--line-2` | #E6E6E6 / #CFCFCF | Garis tabel & accordion / garis field, pill, tombol + |
| `--media` | #F3F3F3 | Latar foto produk |
| `--brand` | #103178 | Navy brand asli (rata, tanpa gradien): tombol utama, pill aktif, badge keranjang, tautan |
| `--sale` | #C4320A | Badge diskon |
| Status | hijau #1B7A43 (izin edar valid, garansi aktif) · oranye #A35A00 (stok tipis) · merah #B42318 (prioritas tinggi) | |
| `--co-pane` / `--co-ink` | #F6F9FC / #0A2540 | Panel ringkasan & teks penawaran (Stripe) |
| `--ops-rail` / `--ops-bar` / `--ops-table` | #0E2A5C / #E3ECF8 / #F5F6F7 | Rail, top bar, wadah tabel servis |
| Font | Assistant 400/600/700 (etalase & penawaran) · Poppins 400/600/700 (layar staf) | |
| Radius | 0 (tombol, field etalase) · 40 (pill varian, badge) · 6 (field Stripe, kartu baris) · 3 (tombol filter staf) · 16 (wadah tabel) | |
| Bayangan | Hanya grup field Stripe (sangat tipis) | |

Skala teks etalase: h0 48 · h1 38 · h2 28 · h3 20 · body 16 · meta 15 · caption 14 · small 13 (letter-spacing body .02em seperti Dawn).

## Komponen
`announce` · `header` + `menu` + `hicons`/`count` · `photo` (contain di kotak abu) · `iwt` (image with text, `--rev`) · `ctabs` (tab koleksi bergaris) · `plist` (daftar harga: produk, `akl`, garansi, `stock`, harga, `addbtn`) · `grid4` + `card` + `card__badge` · `checker` (cek izin edar: form + `result`) · `pdp` (media + info) · `pills`/`pill` · `qty` · `instal` + `tenor` (cicilan) · `avail` · `acc` (details) + `spec` · `co` (split Stripe) + `co-item`/`co-qty` + `co-sum` + `docs` + `group`/`row2`/`fld` + `methods`/`method` (radio) + `submit` · `ops` + `ops-rail` + `ops-bar` + `obtn` + `ops-tabs` + `qtable` (baris kartu) + `prio` + `chip` + `war` + `tech` + `kebab`

## Aturan
- Setiap produk menampilkan nomor izin edar (titik hijau = terdaftar), garansi, dan stok di samping harga.
- Foto produk selalu `contain` di kotak abu, tidak dipotong. Hanya foto tanpa cap toko yang dipakai.
- Putih, garis tipis, teks hitam. Navy hanya untuk aksi dan pilihan aktif; warna lain hanya untuk status.
- Tidak ada gradien, blob, ikon dalam lingkaran, kartu KPI, atau label kapital berjarak.
