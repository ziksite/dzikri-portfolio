# Redesign — Website Klinik Hewan (anonim: "Kalis")

Sumber: website kelompok praktik dokter hewan dengan tiga cabang di sebuah kota besar (diambil 18 Okt 2026). Nama, logo, tahun berdiri, nama 13 dokter, alamat, telepon, dan akun media sosial dianonimkan. Tiga kawasan cabang asli diganti dengan **Gajahmungkur, Banyumanik, Pedurungan (Semarang)**. Jam buka (Sen–Sab 09.00–20.00, Minggu/libur 09.00–17.00) dan daftar layanan dipakai apa adanya.

Situs asli **tidak mencantumkan harga**. Harga di prototype adalah asumsi wajar untuk klinik hewan kota besar di Indonesia (konsultasi Rp100.000, vaksin F4 Rp250.000, steril kucing betina Rp850.000, dst.) dan harus dikonfirmasi bila dipakai sungguhan.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero "Provide the best care for your pets" + foto anjing-kucing studio, tombol "Queue Now" | Tidak menjawab layanan apa, di mana, berapa, dan kapan buka |
| Empat kotak fitur generik berwarna (Good Practice, Excellent Knowledge, dst.) | Ruang terbaik dipakai klaim tanpa bukti |
| Tidak ada info UGD / darurat di mana pun | Pemilik hewan yang panik tidak tahu cabang mana yang bisa didatangi malam hari |
| Layanan hanya 6 ikon + "Read More", tanpa harga atau durasi | Pemilik harus menelepon untuk hal dasar; grooming & pet hotel tidak disebut |
| Antrean dan booking dipisah ("Queueing" vs "Login / Booking") tanpa pilihan cabang, dokter, atau hewan | Alur utama terpecah dan tidak jelas bedanya |
| Tidak ada rekam medis / jadwal vaksin untuk pemilik | Pengingat vaksin tahunan bergantung ingatan pemilik |
| 13 dokter dalam carousel foto + riwayat kuliah | Tidak membantu memilih dokter sesuai keluhan |
| Bahasa Inggris dengan salah ketik, alamat & telepon lengkap hanya di footer | Kesan kurang terawat, sulit dipakai pengguna lokal |

## Arah redesign
Design system sendiri dari **Square Appointments** (landing + situs booking) dan **DentaClinic** (rekam pasien), lihat `design-system.md`. Merah brand asli disimpan khusus untuk darurat.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Pita UGD, hero + foto dengan kartu antrean per cabang, layanan & harga per kategori (tab berfungsi), teaser rekam medis, kotak darurat (gejala + telepon), 3 cabang dengan jam & antrean, 8 dokter |
| `#booking` | Pilih hewan (Mochi/Bruno/baru — nama & harga vaksin menyesuaikan jenis hewan), layanan, dokter, tanggal di kalender Oktober, jam Pagi/Siang; bar ringkasan bawah berubah; konfirmasi → KLS-2041 |
| `#rekam` | Rekam medis Mochi: info hewan, catatan dokter, linimasa vaksin + toggle pengingat WhatsApp, grafik berat vs target, riwayat kunjungan |
| `#rawat-inap` | Tablet perawat di ruang rawat inap: lembar terapi per kandang × jam (obat, infus, pakan, cek vital), tugas jam 14.00 & terlambat bisa dicentang, panel pasien (vital, catatan, kirim kabar ke pemilik) |

## Tech stack produksi (rencana)
Next.js + Supabase (hewan, pemilik, rekam medis, booking, rawat inap), WhatsApp Business API untuk konfirmasi, pengingat vaksin, dan kabar harian pasien rawat inap.

## Foto
| Dipakai | Asal | Catatan |
|---------|------|---------|
| `periksa-kucing.webp` | Gambar layanan Medical Check Up | Dicek zoom, tidak ada teks/logo |
| `vaksin-kucing.webp` | Gambar layanan Vaccination | Bersih |
| `rawat-inap-kandang.webp` | Gambar layanan Inpatient | Bersih, tanpa logo di seragam |
| `operasi-anjing.webp` | Gambar layanan Surgery | Bersih |
| `scaling-gigi-anjing.webp` | Gambar layanan Dentistry | Bersih |
| `anjing-kucing.webp`, `kucing-pug.webp` | Banner beranda & halaman About | Foto studio latar putih, dipakai sebagai thumbnail kecil |

Dilewati: logo; 13 foto dokter (orang nyata); foto Laboratory Test (teks merek di mikroskop); foto Queueing (wajah orang di latar); strip hewan di About dan anjing berstetoskop (gaya kliping, tidak perlu). Tidak ada piksel yang diedit, hanya konversi ke webp.
