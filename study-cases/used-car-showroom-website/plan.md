# Redesign — Website Showroom Mobil Bekas (anonim: "Lajur Motor")

Sumber: website showroom mobil bekas dengan stok sekitar 100 unit dan beberapa cabang di Jawa (WordPress + WooCommerce, diambil 1 Nov 2026): beranda, daftar stok, 79 halaman detail unit, kontak, tentang, jual mobil. URL ada di brief koordinator, sengaja tidak ditulis di sini.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Kartu stok hanya menampilkan harga kredit; harga tunai tertulis lebih tinggi di teks bebas halaman detail (contoh Rp295 jt vs Rp320 jt) | Pembeli tunai salah menghitung, baru tahu saat membaca teks atau chat |
| Paket kredit berupa teks mentah "Tdp 25jt angsuran 7.789.000 X 35" | Tidak bisa mencoba TDP lain atau membandingkan tenor |
| Pencarian dimulai dari merek dan harga, padahal pembeli kredit berpikir dalam cicilan bulanan | Pengunjung harus membuka unit satu per satu untuk tahu sanggup atau tidak |
| Filter hanya merek, harga, dan lokasi; transmisi dan tahun tidak ada | Stok 105 unit dalam 6 halaman harus dibaca manual |
| Data unit tidak konsisten: satu Yaris Cross tayang Rp30 jt (nilai TDP masuk kolom harga), unit S-Cross tertulis 20.000 km padahal odometer di fotonya 87.959 km, Avanza 2024 berkolom tahun 2023, tipo angka paket | Merusak klaim kilometer asli dan membuat filter menipu |
| Klaim bebas banjir, bebas tabrak, kilometer asli berbentuk daftar umum, sama untuk semua unit | Tidak ada bukti per unit yang bisa dibaca |
| Tidak ada jadwal test drive; semua CTA ke pilihan 8 sales di WhatsApp | Pembeli memilih sales acak, showroom tidak tahu unit mana sedang dipakai |
| Status booked/sold ditandai manual; unit sold tetap tayang 7 hari | Sales dan website bisa berbeda status |
| Statistik pengunjung dan 800+ ulasan memenuhi halaman | Mengalihkan dari stok |

## Arah redesign
Beranda menjawab pertanyaan pembeli kredit lebih dulu: cicilan, TDP, dan tenor membentuk satu kalimat, dan deret unit berubah saat slider digeser. Katalog memakai filter nyata, detail unit menampilkan dua harga, inspeksi per unit, dan simulasi dari paket leasing asli, lalu berlanjut ke jadwal test drive tanpa pindah halaman. Papan lot memberi showroom satu sumber status unit.

Berbeda dari `car-rental-company-website` (pencarian jadwal + armada) dan `car-body-paint-workshop-website` (pemilih panel dan estimasi): konsep di sini adalah belanja dari cicilan dan papan petak parkir.

## Layar
| Hash | Layar | Isi | Interaksi |
|------|-------|-----|-----------|
| `#home` | Beranda | Kalimat cicilan, tiga slider, jumlah unit masuk budget, deret unit, dua harga, pemeriksaan, cabang, tukar tambah | Slider mengurutkan ulang unit dan mengubah angsuran serta jumlah |
| `#katalog` | Stok | Pill merek berhitungan, harga maksimal, transmisi, tahun, cabang, bentuk, urutan | Semua filter berfungsi, hitungan merek ikut berubah, status kosong + reset |
| `#unit` | Detail, simulasi, test drive | Foto, spesifikasi, inspeksi, riwayat; panel kredit/tunai; jadwal | TDP dan tenor mengubah angsuran; tanggal, jam, kunci jadwal; status lot ikut berubah |
| `#lot` | Papan lot tablet showroom | Tiga lajur petak per cabang, legenda status, perlu ditindak, kartu stok, test drive hari ini | Ketuk petak, ubah status, hitungan legenda berubah |

## Tech stack rencana
Next.js + Supabase (unit, paket kredit, jadwal, status lot), Cloudinary untuk foto, integrasi WhatsApp Business untuk konfirmasi. Status lot jadi sumber yang sama untuk katalog dan papan.

## Catatan data
- Harga kredit dan tunai, km, pajak, warna, dan paket TDP-angsuran mengikuti unit asli. Pengecualian: km S-Cross disesuaikan ke odometer foto (87.000), tahun Avanza mengikuti judul (2024).
- Dalam 79 unit yang dirayapi hanya ada satu unit manual dan fotonya tidak lolos, sehingga filter transmisi berisi AT, CVT, IVT.
- Isi inspeksi, riwayat, kode stok, jadwal, tanggal masuk stok, dan papan lot adalah contoh rekaan. Situs asli tidak punya data itu.
- Angsuran di antara dua paket dihitung garis lurus dan berlabel perkiraan.
- Cabang asli diganti: Banyumanik, Majapahit, Ungaran, Kudus. Jumlah stok per cabang mengikuti sebaran asli.

## Catatan foto
- Semua foto depan dan belakang di situs asli memakai plakat bernama showroom di tempat pelat, dan foto studio punya logo di dinding. Semua foto itu dilewati, tanpa patch.
- Dipakai: 15 foto samping luar ruang (dicrop, tidak ada pelat di sudut ini), 12 foto odometer, 14 foto kabin, 2 foto kursi HR-V. Tidak ada piksel diedit.
- Pelat mobil lain: tidak ada yang terbaca setelah zoom. Satu mobil putih jauh di foto Agya sebagian tertutup tiang; pelatnya sekitar 20 px dan tidak terbaca.
- Dilewati setelah zoom: Stargazer sisi kiri (poster "DIJUAL" berkontak di pintu ruko, diganti sisi kanan sehingga menghadap kanan), kabin Xpander (kartu berkontak di kunci), odometer Veloz dan Avanza (label QR di panel), odometer Sienta (mobil di depan), Granmax dan semua unit studio, banner promo galeri, foto buku servis.
- Spanduk kuning ruko sewa samar di foto Sienta dan Ertiga hitam: teks tidak terbaca, dibiarkan.
