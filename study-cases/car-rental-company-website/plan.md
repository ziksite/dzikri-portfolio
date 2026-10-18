# Redesign — Website Rental Mobil (anonim: "Laju Rental")

Sumber: website perusahaan rental mobil + bus + truk + paket wisata dengan kantor pusat di Jawa dan puluhan cabang (WordPress, diambil 18 Okt 2026): beranda, tarif, keterangan durasi, syarat sewa, cara order, form order. Model bisnis: **sewa mobil dengan sopir dan lepas kunci (self drive)** dengan paket 4/6/12 jam, per day (06.00–24.00), 24 jam, + sopir, + sopir + BBM, All in; ditambah bus pariwisata, truk, alat berat, ekspedisi, hotel, dan tiket wisata. Tidak ada leasing korporat formal; sewa bulanan ditambahkan sesuai brief. Redesign difokuskan ke rental mobil (inti situs). Nama, logo, kota cabang, alamat, telepon, dan email dianonimkan; kota diganti ke Makassar, Manado, Kendari, Ambon.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Beranda dibuka dengan banner bergambar + daftar 40+ kota cabang dalam satu paragraf | Pengunjung tidak bisa langsung memilih kota, tanggal, atau jenis sewa |
| 12 layanan (mobil, bus, truk, alat berat, ekspedisi, hotel, tiket) setara di beranda; deskripsi Booking Hotel/Tiket tertukar dengan teks bus/truk | Layanan inti tenggelam; kesan kurang terawat |
| Kartu mobil hanya menampilkan satu harga "per 12 jam" tanpa jenis paket | Beda harga lepas kunci, dengan sopir, dan termasuk BBM baru terlihat di halaman lain |
| Tarif lengkap berupa teks panjang per mobil (5 paket × 5 durasi) tanpa tabel | Sulit membandingkan mobil |
| Aturan lepas kunci (hanya Small MPV, hatchback, box, pick up), durasi, overtime, BBM tersebar di 3 halaman | Penyewa baru tahu syarat setelah chat CS |
| Syarat dokumen berupa gambar; deposit disebut tanpa nominal | Tidak bisa disiapkan sebelum memesan |
| Pemesanan: form tanpa harga → tunggu CS → transfer DP 50% ke rekening yang dikirim manual → konfirmasi maks. 10 menit | Banyak langkah manual, tidak ada total atau status pesanan |
| Alamat ±50 cabang diulang di footer setiap halaman | Halaman sangat panjang, info penting tertutup |

## Arah redesign
- Design system sendiri dari Stripe Checkout (halaman produk + checkout terbelah) dan komponen armada FleetYu; lihat `design-system.md`.
- Beranda = pencarian + tabel tarif per paket + syarat/deposit + sewa bulanan, bukan katalog layanan.
- Aturan lepas kunci diterapkan di data: mobil yang hanya boleh dengan sopir tampil redup dengan tombol "Lihat dengan sopir".
- DP 50% tetap (sesuai situs asli) tapi lewat QRIS/VA dengan total yang terhitung, dokumen diunggah di checkout.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero bergaris bantu + kartu pencarian (lepas kunci / dengan sopir / bulanan, kota, titik ambil, jadwal, estimasi), tabel tarif 17 mobil × 4 paket, syarat & deposit (tab lepas kunci / sopir), tabel sewa bulanan korporat, footer |
| `#armada` | Bar ringkasan pencarian + toggle lepas kunci/sopir, filter kategori, daftar mobil (foto, spesifikasi, stok, tarif + total 2 hari), panel syarat |
| `#pesan` | Checkout terbelah: ringkasan (harga, foto, jadwal, rincian, DP, sisa, deposit) / form (data penyewa, lokasi serah terima mengubah total, unggah KTP-SIM-pendukung, DP vs lunas, QRIS/VA) → sukses LJR-24183 |
| `#serah-terima` | Tablet petugas pool: keluar & kembali hari ini, gantt ketersediaan per plat 18–24 Okt (lepas kunci, sopir, servis, menunggu DP) dengan utilisasi per tipe, checklist serah terima (dokumen asli, deposit, BBM, km, 4 foto) yang membuka tombol "Serahkan kunci" |

## Data & asumsi
- Dipakai apa adanya dari situs: tarif 12 jam / per day / 24 jam per paket (Xenia, Avanza, Innova), harga "mulai per 12 jam" mobil lain, aturan lepas kunci per kategori, definisi paket & per day 06.00–24.00, overtime 1 jam gratis lalu 10%, BBM dikembalikan seperti semula, sopir menginap Rp150.000/malam, tol & penyeberangan ditanggung penumpang, DP 50%, jam operasional 06.00–24.00 termasuk Minggu.
- **Asumsi (perlu data klien):** deposit Rp1.000.000; dokumen KTP + SIM A + 1 pendukung (situs asli menampilkan syarat sebagai gambar); biaya antar bandara Rp100.000 / hotel Rp75.000; seluruh tarif bulanan korporat; jumlah unit & stok; Jazz, pick up, dan box hanya punya tarif 12 jam.

## Tech stack produksi (rencana)
Next.js + Supabase (unit per plat, jadwal, pesanan, dokumen di storage), Midtrans/Xendit untuk QRIS & VA, WhatsApp API untuk konfirmasi, pengingat kembali, dan kontak petugas H-1.

## Foto
- Dipakai 17 foto mobil dari kartu armada beranda (290×170, latar biru-kuning bawaan situs). Di-crop 274×132 untuk membuang ikon panah ganda (elemen grafis brand) di kanan atas dan tab kuning di tepi kiri. Tidak ada logo/nama rental di bodi; plat hanya bertuliskan nama model pabrikan. Tidak ada edit piksel lain.
- Dilewati: seluruh foto halaman "Jenis Mobil" lama (640×374) karena logo + nama brand dicap di pojok kiri atas (watermark); banner beranda (teks promo, logo, URL); foto paket wisata; foto staf/CS.
- Resolusi foto asli kecil, jadi foto hanya dipakai di ukuran thumbnail/kartu (maks. ±360px di checkout).
