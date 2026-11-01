# Redesign — Website Sekolah Mengemudi (anonim: "Sein")

Sumber: website sekolah stir mobil multi-cabang di Jakarta (WordPress berformat portal berita, diambil 1 Nov 2026). Halaman yang ditelusuri: beranda, daftar cabang, profil, FAQ, galeri, form dua cabang, artikel paket, dan brosur biaya. Nama, logo, kontak, nama perusahaan, nama orang, dan cabang dianonimkan.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Beranda berformat portal berita: banner, carousel cabang berulang, artikel otomotif, galeri | Calon siswa tidak menemukan harga dan cara daftar di layar pertama |
| Tidak ada halaman harga. Tabel biaya hanya ada di gambar brosur, halaman Brosur Katalog kosong | Harga tidak bisa dicari atau dibandingkan |
| Form daftar terpisah per cabang dan terpisah per transmisi | Siswa harus tahu dulu cabang mana yang punya transmisi yang diinginkan |
| Label harga bertentangan: form menyebut Rp1.675.000 "diskon 20%", brosur menyebut harga itu sebelum diskon (promo Rp1.340.000) | Siswa bisa merasa harga berubah saat tiba di cabang |
| Syarat bertentangan: formulir Rp20.000 vs Rp35.000; "tidak melayani transfer" vs rekening di brosur; diskon "harus lunas" vs DP 50% | Keraguan dan potensi sengketa saat pembayaran |
| Jadwal hanya bisa dipastikan lewat WhatsApp | Siswa tidak tahu tanggal mulai dan selesai saat mendaftar |
| Halaman FAQ tidak berisi pertanyaan | Pertanyaan yang sama masuk ke customer service |
| Tips instruktur hanya disebut di catatan | Biaya sebenarnya baru terasa saat sesi berjalan |
| Ada artikel peringatan "jangan bayar sebelum terdaftar" | Ada masalah kepercayaan saat mendaftar, tetapi tidak ada bukti pendaftaran di sistem |
| Teks spam judi tersembunyi di footer setiap halaman | Tanda situs diretas. Merusak SEO dan kepercayaan, perlu dibersihkan terpisah dari redesign |
| Dua nama merek dipakai bergantian antara situs, form, dan brosur | Identitas brand tidak konsisten, siswa bisa ragu sedang mendaftar ke siapa |

## Arah redesign
- Bahasa portal siswa dipakai sejak beranda: pengunjung menyusun kursus dan langsung melihat materi serta total biaya.
- Pendaftaran bukan form dan ringkasan di kanan: rel langkah di kiri, panel bertumpuk, bilah ringkasan sticky di bawah.
- Progres siswa berupa peta rute 12 sesi yang bisa diklik. Bukti pendaftaran dan laporan instruktur terlihat di satu tempat.
- Layar operasional berupa **papan kunci cabang**: setiap mobil adalah label kunci di gantungan, ditambah HP instruktur. Kalender gantt tidak dipakai karena sudah ada di tiga prototype lain.
- Berbeda dari `tutoring-center-website` (kartu paket + kalkulator + portal bersidebar + tablet) dan `car-rental-company-website` (hero + form jendela + armada + papan pool).

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Penyusun kursus (transmisi, sesi, SIM A) dengan garis materi, tabel biaya, biaya di luar paket, cabang, tanya jawab |
| `#daftar` | Paket, cabang, instruktur, jadwal mingguan → tanggal sesi dihitung otomatis → konfirmasi SEIN-2741 |
| `#progres` | Deret tanggal, peta rute 12 sesi, detail sesi, sesi berikutnya, kehadiran, pembayaran |
| `#papan` | Papan kunci cabang, serah terima kunci, HP instruktur dengan checklist capaian |

## Asal data
| Data | Status |
|------|--------|
| Harga normal dan promo manual/matic 1, 6, 8, 10, 12 sesi | **Situs asli** (brosur + form), dipakai apa adanya |
| Kelas Pemula / Memperlancar / Per sesi | **Situs asli** |
| Formulir Rp35.000 | **Situs asli** (brosur). Artikel lama menyebut Rp20.000; brosur dipilih |
| Tips min. Rp15.000 Sen–Jum, Rp25.000 Sab–Min | **Situs asli** (brosur) |
| DP min. 50%, lunas paling lambat pertemuan ketiga | **Situs asli** (brosur) |
| Jam 08.00–11.00 dan 13.00–16.00, Minggu dengan perjanjian, sesi 1 atau 2 jam | **Situs asli** (brosur) |
| Tambahan Minggu Rp200.000 per paket; teori Sabtu pekan 1 dan 3 pukul 09.00 dan 11.00 | **Situs asli** (artikel 2022, mungkin sudah usang) |
| Mulai H+1 setelah pembayaran | **Situs asli** (form) |
| Daftar materi latihan | **Situs asli** (artikel + brosur) |
| Syarat pendaftaran, rem dan kopling ganda, instruktur berpengalaman | **Situs asli** |
| Promo berlaku bersama DP | **Asumsi**. Artikel lama: diskon hanya jika lunas; brosur: promo dan DP muncul bersama |
| Kota, 6 cabang, jumlah mobil per cabang | **Asumsi / fiktif**. Asli 12 cabang di Jakarta dan sekitarnya |
| Pemetaan materi ke 12 sesi dan cakupan paket 6/8/10 sesi | **Asumsi**, situs asli tidak merinci |
| Sesi 12 "Ulang materi terlemah" | **Asumsi** |
| Opsi persiapan SIM A (harga = 1 sesi per sesi) | **Asumsi**. Situs asli tidak menyebut SIM sama sekali |
| Instruktur, siswa, tipe dan plat mobil, jadwal, catatan instruktur, kode SEIN-2741 | **Fiktif** |
| Cara bayar transfer setelah ada kode | **Asumsi**, untuk menyelesaikan pertentangan di situs asli |
| Prosedur SIM (di Satpas, ujian dilakukan sendiri) | Pengetahuan umum, perlu dicek ulang sebelum dipakai sungguhan |

## Foto
Dipakai 3 dari 39 gambar.
| File | Asal | Catatan |
|------|------|---------|
| `latihan-kabin.webp` | Foto kabin saat latihan | Bagian atas di-crop: stiker, spion dalam, dan pantulan banner. Siswa terlihat dari belakang. Logo pabrikan mobil pada setir masih terlihat |
| `ruang-teori.webp` | Foto layar CCTV | Crop untuk membuang stempel waktu, bingkai layar, dan poster. Kualitas CCTV |
| (dihapus) meja pendaftaran | Foto layar CCTV | Dilepas koordinator: rekaman orang nyata |

Dilewati: foto armada (plat terbaca, logo sekolah), foto tim dan grup (wajah dominan), foto siswa dan pengajar di mobil (wajah), mobil berlogo di lapangan, tampak depan kantor (papan nama), foto kelas ramai (banyak wajah), artikel berwatermark, semua banner dan thumbnail video, foto setir yang pecah piksel, brosur.

## Tech stack produksi (rencana)
Next.js + Supabase (cabang, mobil, instruktur, slot, siswa, capaian per sesi), WhatsApp API untuk konfirmasi dan pengingat.
