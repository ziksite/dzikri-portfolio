# Design System — Larik (batik modern wanita)

File: `public/prototypes/ds/modest-fashion-brand-store.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/landing/buttonscarves-modest-fashion*.png` | Beranda dipimpin koleksi: hero foto penuh dengan nama koleksi huruf kapital serif tegak + deskripsi + tombol pill di tengah, judul seksi sans di tengah, banner koleksi lebar → paragraf deskripsi di tengah → tab teks bergaris bawah (Square Scarves / Tie Back Shawl) → grid 4 produk rapat (gap tipis) dengan tombol hati dan tombol tas bulat putih di sudut foto, nama + harga rata tengah, tombol pill hitam lebar "Discover the Collection". Font body Poppins. |
| `_design-reference/landing/cottonink-fashion*.png` | Utility bar berwarna penuh (sosial kiri, pesan tengah, bantuan kanan), header dengan wordmark huruf kapital berjarak di tengah + ikon akun/cari/tas di kanan + nav kategori baris kedua (Sale berwarna), ubin kategori potret dengan label kotak putih di dalam foto, badge kotak kecil di sudut kiri atas produk ("On Sale", "Back In Stock", "Up To 3XL"), banner gelap foto-kiri teks-kanan. |

Alasan: keduanya brand fashion lokal Indonesia yang berjualan per koleksi/drop, sama seperti situs asli (batik modern untuk perempuan pekerja). Buttonscarves memberi struktur "koleksi → tab → grid", Cottonink memberi header, ubin kategori, dan badge stok yang dibutuhkan untuk pre-order. `shopify-dawn-theme` hanya dipinjam pola halaman produknya (media dua kolom + info sticky); screenshot Dawn di folder referensi sebagian besar halaman theme store sehingga tidak dijadikan referensi utama.

Tidak diambil: utility bar pink dan banner promo bertulisan Cottonink, nama produk huruf kapital berjarak Buttonscarves (diganti sentence case supaya tidak jadi "label kapital di mana-mana").

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #1C1C1C | Teks, tombol utama pill, blok gelap reseller, order bar |
| `--ink-2` | #6B6B6B | Meta, harga di kartu |
| `--line` | #E5E5E5 | Garis tabel, divider |
| `--tile` | #EDEDED | Latar ubin foto sebelum foto termuat |
| `--soft` | #F5F5F5 | Header tabel, chip filter, notice netral |
| `--brand` | #8A2338 | Marun dari tombol mauve situs asli (#645657), dijenuhkan: utility bar, badge & tombol pre-order, Sale, meter kuota |
| `--brand-soft` | #F6E9EC | Hanya elemen kecil: pill PO, tier aktif, notice pre-order |
| Font | Poppins 400–600 (semua teks), Bodoni Moda 400 (hanya nama koleksi di hero & banner) | |
| Radius | 0 (foto, ubin, kartu) · 2 (badge) · 4 (field, tombol ukuran) · pill (tombol, tab segmen) | |
| Bayangan | Hanya drawer dan tombol bulat di foto | |

Skala teks: display 76 (koleksi) · display-md 52 · h1 30 · h2 22 · h3 16 · body 14 · meta 13 · small 12.

## Komponen
`utility` · `header` (wordmark tengah + `nav` baris kedua) · `hero` (3 foto penuh + teks tengah) · `cat` (ubin + label putih) · `banner` + `lede` + `ctabs` · `card` (foto 2:3, `badges`, `card__fav`, `card__add`, baris ukuran dengan status PO) · `drops` + `meter` (jadwal drop & kuota PO) · `dark-band` + `tiers` · `perks` · `filters` + `fgroup` + `size` + `sw` + `fchip` + `toolbar` · `pdp` (`media` + `info` sticky) · `colors` · `vsizes` (status Ready / Sisa / Pre-order) · `notice` · `stepper` · `acc` · `drawer` (panduan ukuran, keranjang) + `stable` + `calc` · `utabs` · `tierbar` · `sheet` (matriks produk × ukuran) + `qty` · `orderbar` (sticky gelap) · `tcard` + `steps` (lacak pesanan)

## Aturan
- Putih bersih, warna datang dari foto batik. Hitam untuk aksi utama, marun hanya untuk hal yang berkaitan dengan pre-order, kuota, dan Sale.
- Foto tanpa radius dan tanpa bingkai; teks di atas foto hanya di hero dan banner koleksi, dengan scrim gelap.
- Serif hanya untuk nama koleksi (tegak, kapital). Semua UI lain Poppins.
- Status stok selalu terlihat sebelum memilih: di kartu (baris ukuran), di halaman produk (tombol ukuran), dan di lembar order reseller (stok / PO per sel).
