# Redesign — Website Klinik Kecantikan & Wellness (anonim: "Rona Clinic")

Sumber: website satu klinik estetika dan wellness di kota besar Jawa Timur (dibuat di Wix, diambil 1 Nov 2026). Halaman yang ditelusuri: beranda, profil, services, tiga halaman treatment (wajah, tubuh, lainnya), blog, kontak. Nama, logo, alamat, kontak, dan kota dianonimkan. Lokasi diganti ke Semarang Selatan.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Tidak ada satu pun harga di seluruh situs | Calon pasien harus chat dulu hanya untuk tahu kisaran biaya |
| Treatment hanya berupa judul + gambar, tanpa penjelasan, durasi, atau jumlah sesi | Pengunjung tidak tahu perawatan mana yang cocok untuk keluhannya |
| Kategori memakai istilah alat dan kata Inggris ("Flex", "Dull", "Lifting") | Pengunjung berpikir dalam keluhan, situs bicara dalam nama layanan |
| Semua tombol "Booking Sekarang" dan kontak berujung ke WhatsApp | Tidak ada jadwal yang bisa dipilih, staf menjawab pertanyaan yang sama berulang |
| Perawatan laser perlu beberapa sesi, tetapi tidak ada konsep program | Pasien membeli per kunjungan, klinik tidak punya alat untuk mempertahankan keberlanjutan |
| Hero berupa video + logo, disusul banner promo alat analisis kulit di domain lain | Layar pertama tidak memberi jalan menuju perawatan |
| Foto before-after menjadi bagian utama beranda; artikel blog campur topik umum | Kepercayaan bertumpu pada foto hasil; perlu dicek terhadap aturan iklan fasilitas kesehatan |

## Arah redesign
Situs dibalik dari katalog layanan menjadi alur keluhan → program → jadwal. Layar pertama adalah indeks keluhan, bukan hero foto. Unit jualannya program beberapa sesi dengan harga total. Semua sesi dijadwalkan sekaligus lewat kalender tiga bulan. Terapis mencatat setiap sesi di kartu program.

Beda dari situs lain: `dental-clinic-website` memakai hero foto + search + tablet kursi, `multi-specialty-clinic-website` memakai pita indigo + direktori dokter, `pilates-studio-website` memakai hero mosaik + kartu paket + check-in. Di sini tidak ada foto hero, tidak ada kartu paket berjajar, dan jadwal direncanakan untuk seluruh program, bukan satu kunjungan.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Blok lime + indeks keluhan bertab (wajah, tubuh, lainnya) dengan rentang sesi dan harga mulai; pita cara kerja program; harga per sesi 4 kolom; info klinik; bacaan |
| `#program` | Chip 13 keluhan, segmen jumlah sesi, jalur sesi horizontal, isi program, catatan klinis, bilah total sticky yang berubah sesuai pilihan |
| `#jadwal` | Kalender 3 bulan (bisa digeser), jarak antar sesi, jam, daftar semua sesi dengan geser ±1 hari, hari libur otomatis dilewati, DP 20% atau lunas → semua sesi terkunci |
| `#terapis` | Tablet terapis: antrean hari ini dengan progres, kartu program klien berlingkaran sesi, catatan sesi (area, energi, reaksi, ampul), riwayat kulit. "Selesaikan sesi" memperbarui lingkaran, antrean, dan riwayat |

## Asal data
| Data | Status |
|------|--------|
| Nama treatment dan pembagian wajah / tubuh / lainnya | **Situs asli** |
| Daftar Botox, filler (bibir, dagu, kantong mata, temporal & pipi), threadlift hidung, peeling kaki, infuse putih, rambut rontok | **Situs asli** (label galeri beranda) |
| Jam buka setiap hari 09.00–17.00 | **Situs asli** |
| Empat poin alasan (alat, produk bersertifikat, pelatihan, prosedur) | **Situs asli**, ditulis ulang tanpa klaim superlatif |
| Topik artikel bacaan | **Situs asli**, judul diringkas |
| Satu lokasi, ada dokter dan staf | **Situs asli** |
| **Semua harga per sesi dan harga "dari"** | **Asumsi.** Situs asli tidak mencantumkan harga. Angka dikira-kira, belum dibandingkan dengan klinik sejenis |
| Nama program (Acne Clear, dst.) dan pengelompokan keluhan | Asumsi |
| Jumlah sesi, jarak antar sesi, durasi, urutan tindakan | Asumsi, belum ditinjau dokter |
| Diskon program 5 / 10 / 15%, DP 20%, kebijakan DP kembali, geser sesi 24 jam, kontrol tanpa biaya | Asumsi |
| Klinik libur 25 Desember dan 1 Januari | Asumsi (situs hanya menyebut Senin–Minggu) |
| Nama klien, terapis, nilai energi alat, ampul, riwayat sesi | Fiktif, sebagai contoh |
| Nama Rona, Semarang Selatan, kawasan Candisari, nomor WhatsApp | Fiktif untuk anonimitas |

Bagian medis (uraian program, energi 12 J/cm²) adalah contoh tampilan, bukan protokol klinis. Sebelum dipakai nyata harus ditinjau dokter, dan klaim serta harga perlu dicek terhadap aturan iklan fasilitas kesehatan. Situs asli memuat ulasan dengan nama pelanggan: tidak dipakai, dan tidak ada testimoni di prototype.

## Catatan foto
| Dipakai | Keterangan |
|---------|------------|
| `ruang-lounge.webp` | Crop sisi kanan banner profil (520×500, render interior). Logo di dinding resepsionis berada di luar crop |
| `terapis-laser.webp` | Crop banner services. Pasien di luar crop. Logo kecil di jas ditutup `patch.mjs`. Terapis memakai kacamata dan masker. Merek pembuat alat masih terbaca kecil pada handpiece |
| (dihapus) konsultasi dokter | Dilepas koordinator: wajah dokter masih bisa dikenali |

Dilewati: foto alat RF pada paha (tubuh pasien, meski tanpa wajah), semua foto before-after (galeri beranda dan artikel), foto ulasan, semua foto dengan wajah pasien (facial, laser, infus), foto klinik dengan logo (poster hero, teks di foto), banner berteks, potret model pada banner treatment, foto yang tampak stok di artikel blog, dan foto tindakan jarum yang terlalu dekat.

Karena foto bersih sedikit, layout dibuat berbasis tipografi dan blok warna. Hanya tiga foto yang dipakai, dan yang tampil di `#program` berganti mengikuti jenis program.

## Tech stack produksi (rencana)
Next.js + Supabase (program, sesi, klien, catatan sesi dengan akses per peran), payment gateway untuk DP, WhatsApp API untuk pengingat sesi. Catatan kulit termasuk data kesehatan, jadi perlu kontrol akses dan kepatuhan UU PDP.
