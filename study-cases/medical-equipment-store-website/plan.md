# Redesign — Website Toko Alat Kesehatan (anonim: "Medira")

Sumber: website toko & distributor alat kesehatan di sebuah kota besar di Jawa (WordPress + WooCommerce, diambil 18 Okt 2026). Menjual produk dari 23 kategori (kursi roda, bed pasien, tabung & regulator oksigen, tensimeter, nebulizer, alat sedot lendir, alat habis pakai, stetoskop, alat laboratorium) ke pembeli rumahan dan ke klinik/rumah sakit. Nama toko, logo, alamat, email, dan kota dianonimkan (kota diganti ke Semarang). Nama produk, merek pabrikan, dan harga dipakai apa adanya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero slider berisi banner promo bergambar keluarga stok + 10 banner merek; layar pertama tidak menyebut apa yang dijual atau untuk siapa | Pembeli harus menggulir jauh sebelum melihat produk |
| Halaman produk hanya berisi judul, harga, stok, dan tombol; tidak ada spesifikasi, deskripsi, atau dokumen | Pembeli tidak bisa membandingkan alat dan bertanya lewat WhatsApp untuk hal dasar |
| Nomor izin edar Kemenkes hanya tercetak kecil di gambar sebagian produk, tidak bisa disalin atau dicek | Pembeli alat kesehatan (dan pengadaan faskes) tidak bisa memverifikasi legalitas |
| Hampir semua foto produk diberi cap logo toko + bar nama produk; banyak bertuliskan watermark besar | Foto tidak bisa dipakai ulang, tampilan katalog ramai dan seragam |
| Banyak produk unggulan berlabel "SOLD OUT" tanpa estimasi restock atau opsi pengingat | Pengunjung berhenti di produk yang tidak bisa dibeli |
| Tidak ada jalur khusus untuk klinik/rumah sakit (penawaran, e-katalog, dokumen tender), padahal halaman "Tentang" menyebut kerja sama dengan rumah sakit | Lead B2B masuk lewat chat biasa tanpa data instansi |
| Garansi hanya disebut "Garansi Toko 14 Hari" dan "Garansi resmi 1 tahun" di ikon; tidak ada alur klaim atau servis | Pembeli barang mahal (kursi roda elektrik Rp4–10 juta) tidak tahu siapa yang memperbaiki |
| Tidak ada informasi cicilan untuk barang besar | Barang bernilai jutaan hanya bisa dibayar penuh di situs |
| Blok "Promo Partner" berisi 4 kotak "AVAILABLE NOW" kosong, video embed kosong, artikel duplikat 3× | Halaman terlihat belum selesai |

## Arah redesign
- Etalase tenang berbasis pola Shopify Dawn; katalog utama berupa **daftar harga per kebutuhan** yang memuat izin edar, garansi, dan stok di setiap baris.
- Izin edar sebagai fitur: kolom AKL di setiap produk + widget **Cek izin edar**.
- Halaman produk dengan spesifikasi lengkap, izin edar, garansi & servis, pengiriman + instalasi, dan simulasi cicilan 0%.
- Jalur faskes terpisah berpola Stripe Checkout: susun daftar alat → pilih cara pengadaan (langsung / e-katalog LKPP / tender) → surat penawaran + dokumen.
- Layar staf: antrean tiket servis & garansi (bengkel, kunjungan, kalibrasi, tukar 14 hari) berpola tabel request.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Pita pengumuman, header, image-with-text kursi roda elektrik, daftar harga 4 tab (pernapasan, tekanan darah & diagnostik, mobilitas, terapi) dengan AKL/garansi/stok/+keranjang, 4 produk unggulan, cek izin edar (berfungsi untuk 3 nomor contoh), blok faskes, footer |
| `#produk` | GEA Kursi Roda Elektrik GO-112: media, paket (unit / + baterai), jumlah, cicilan 3/6/12 bulan (nominal per bulan berubah), stok & instalasi, accordion spesifikasi/izin edar/garansi/pengiriman |
| `#faskes` | Permintaan penawaran klinik: panel kiri 6 produk dengan stepper jumlah, subtotal, PPN 11%, total, daftar dokumen; panel kanan data faskes, cara pengadaan (3 opsi), termin, instalasi, penanggung jawab → sukses PNW-2610-0418 |
| `#servis` | Tiket servis & garansi: 26 — filter, tab jenis tiket (berfungsi), tabel baris kartu: pelanggan, alat + nomor seri, keluhan, masuk, prioritas, status, garansi, teknisi |

## Tech stack produksi (rencana)
Next.js (storefront) + Medusa atau WooCommerce headless untuk katalog & stok, Supabase untuk tiket servis, nomor seri, dan permintaan penawaran; Midtrans untuk kartu kredit cicilan 0% dan paylater; WhatsApp API untuk notifikasi tiket dan penawaran; generator PDF surat penawaran.

## Catatan foto
- Hampir semua foto produk di situs asli membawa cap logo toko di pojok kanan atas dan bar nama bermotif toko, sebagian dengan watermark besar → **dilewati semua** (cap toko = watermark).
- Dipakai 5 foto sekunder marketplace yang bersih (dicek dengan kontras dinaikkan): kursi roda elektrik GEA GO-112, suction pump GEA DYX-1A (kardus "Barcode Printer" di latar, bukan brand toko), stetoskop ABN Majestic, stimulator Hwato SDZ-II, patient mover Easy Move. Logo pabrikan dibiarkan.
- Dilewati juga: banner promo, logo merek, foto toko/etalase (ada papan nama), kolase "Tensi Stand Anzon" (ada teks tempelan), foto model/keluarga.
- Karena foto bersih sedikit, katalog utama dirancang sebagai daftar teks.

## Asumsi yang perlu diketahui
- Nomor AKL di prototype **ilustratif** (format 11 digit benar, nomornya tidak dicocokkan ke basis data Kemenkes).
- Spesifikasi GO-112 (motor, baterai, jarak tempuh, dimensi) disusun dari spesifikasi umum kelasnya; situs asli tidak memuat spesifikasi.
- Harga Hwato SDZ-II, elektroda TENS, dan biaya servis tidak ada di situs asli; angka di prototype adalah perkiraan.
