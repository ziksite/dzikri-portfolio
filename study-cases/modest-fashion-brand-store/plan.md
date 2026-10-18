# Redesign — Toko Online Brand Batik Modern Wanita (anonim: "Larik")

Sumber: toko online brand batik modern wanita (Shopify, diambil 18 Okt 2026) dengan dua sub-brand wanita dan satu lini pria, toko offline di mal tiga kota. Nama brand, sub-brand, logo, nama koleksi, nama model produk, kota toko, PT pengelola, nomor WhatsApp, dan kode SKU dianonimkan (semua nama model diganti nama fiktif seperti Saga, Kenanga, Laksmi). Harga, ketersediaan ukuran, dan jenis bahan diambil dari katalog asli (`products.json`); teks deskripsi dan perawatan ditulis ulang, bukan disalin. Kota toko diganti ke Semarang, Yogyakarta, Makassar; gudang ke Semarang. Nama koleksi diganti: koleksi motif kopi → "Seduh", koleksi batik cap encim → "Pesisir".

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero berupa slider 6 banner bergambar teks (Hari Batik, Hari Kopi, koleksi baru) tanpa tombol yang jelas selain "Shop now" | Pengunjung tidak tahu koleksi mana yang sedang rilis dan apa bedanya |
| Kartu produk hanya nama + kode SKU + harga; tidak ada info ukuran yang tersisa | Pembeli harus membuka tiap produk untuk tahu ukurannya habis (beberapa model kehabisan ukuran M, L, atau S) |
| Ukuran habis hanya tidak bisa dipilih; tidak ada jalur pre-order atau notifikasi restock | Permintaan untuk ukuran populer hilang, padahal produksi berjalan per batch |
| Panduan ukuran berupa satu kalimat "model 168 cm / 55 kg memakai S" di deskripsi | Pembeli menebak ukuran; risiko tukar/retur tinggi |
| Program poin dan tukar ukuran hanya ada di halaman teks terpisah | Insentif belanja tidak terlihat saat memutuskan |
| Tidak ada jalur reseller/dropship, padahal brand dijual juga lewat marketplace dan stockist | Reseller memesan via WhatsApp dengan daftar harga manual |
| Banyak koleksi di menu (lebih dari 15 nama koleksi) tanpa urutan waktu | Sulit membedakan koleksi terbaru dan yang sedang restock |

## Arah redesign
- Design system sendiri dari Buttonscarves + Cottonink (lihat `design-system.md`): beranda dipimpin koleksi, header wordmark tengah, ubin kategori berlabel, grid produk rapat.
- Status stok per ukuran menjadi informasi utama di semua layar; ukuran habis berubah menjadi pre-order batch dengan tanggal kirim.
- Reseller mendapat layar order grosir berbentuk matriks produk × ukuran (bukan dashboard KPI).

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Utility bar (tutup PO), header, hero koleksi Seduh, ubin 4 kategori, banner Pesisir + tab Atasan/Outer/Bawahan (berfungsi), jadwal drop & kuota pre-order, blok reseller dengan tier diskon, baris layanan, footer |
| `#katalog` | Koleksi baru: filter ketersediaan, ukuran (multi), koleksi, kategori, teknik, warna, harga; chip filter aktif, urutkan; kartu dengan badge dan status tiap ukuran. Filter ketersediaan/ukuran/koleksi/kategori + urutkan benar-benar menyaring 19 produk |
| `#produk` | Saga Encim: galeri dua kolom, warna, ukuran dengan status (Ready / Sisa 2 / Pre-order), notice stok vs pre-order yang berganti, stepper (maks. 2 untuk sisa 2), tombol berubah jadi "Pre-order", drawer panduan ukuran (tabel cm/inci + kalkulator rekomendasi ukuran), drawer keranjang, akordeon, lengkapi tampilan |
| `#reseller` | Portal reseller "Rumah Batik Ayu": tier diskon (10/20/25%), lembar order matriks produk × ukuran dengan stok/PO per sel, total & diskon dihitung langsung, opsi dropship, order bar sticky → sukses; tab "Pesanan & resi" berisi lacak pesanan reguler dan pre-order dropship |

## Tech stack produksi (rencana)
Shopify (tetap, karena katalog dan varian sudah di sana) dengan tema kustom berbasis Dawn: metafield untuk tabel ukuran per model, varian pre-order per batch (app pre-order + kuota per varian), harga reseller lewat B2B/price list per customer tag, halaman lacak pesanan dari data fulfillment, notifikasi WhatsApp lewat integrasi pihak ketiga.

## Catatan data
- Harga, jenis bahan, dan ukuran tersedia/habis dari katalog asli; nama model fiktif, teks deskripsi ditulis ulang. Ukuran yang "Pre-order" adalah ukuran yang habis di situs asli.
- Angka tabel ukuran (cm), kuota batch, jumlah stok per sel, tier diskon reseller, varian warna "Hijau", dan nomor pesanan adalah ilustrasi.

## Catatan foto
- Dipakai (26): foto katalog produk berlatar kain teal dan latar gelap motif kopi, 3 ubin kategori. Semua dicek di resolusi penuh: tanpa watermark, logo, atau teks brand.
- Dilewati: 6 banner hero (berisi teks dan logo koleksi), foto ubin sub-brand (dipakai sebagai identitas sub-brand), foto lini pria, ubin aksesori (dompet dengan potensi logo), foto dengan karung goni bercap (satu rok motif kopi dan satu foto atasan tampak penuh) karena ada cap teks samar, logo Komdigi di footer.
- Tidak ada edit piksel; hanya resize ke webp lebar 900.
