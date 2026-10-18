# Redesign — Website Sekolah Islam Terpadu (anonim: "SIT Annahl")

Sumber: website yayasan sekolah Islam terpadu dengan unit KB/TK, SD, SMP, dan SMA di satu kampus (diambil 18 Okt 2026: beranda, profil 4 jenjang, tentang). Nama, logo, alamat, kontak, nama kawasan (diganti ke Sentul, Kabupaten Bogor), dan nama siswa/guru dianonimkan. Program per jenjang, jam belajar, potongan gelombang 1 Rp2.500.000 (Sep–Nov 2026), potongan saudara, SPP flat, dan opsi bayar sekali hingga lulus diambil dari situs asli.

**Asumsi:** situs asli tidak mencantumkan nominal uang pangkal, SPP, seragam, atau biaya formulir. Angka biaya di prototype adalah perkiraan wajar untuk SIT kelas menengah di pinggiran Jabodetabek dan harus diganti dengan angka klien. Kuota per jenjang dan jumlah pendaftar juga ilustrasi.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Beranda dibuka dengan popup berisi poster PMB dan teks panjang | Orang tua harus menutup popup sebelum melihat apa pun |
| Pendaftaran lewat formulir online umum / link-in-bio, tanpa status | Orang tua tidak tahu dokumen apa yang kurang, kapan tes, kapan pengumuman |
| Tidak ada informasi biaya sama sekali | Pertanyaan biaya pindah ke WhatsApp; calon pendaftar tidak tersaring |
| Program per jenjang tersebar di 4 halaman profil, visi-misi mendominasi | Perbedaan TK/SD/SMP/SMA tidak bisa dibandingkan |
| Galeri didominasi banner berteks dan foto kelompok anak | Tidak terbaca di HP dan menyimpan risiko privasi anak |
| Statistik umum (total siswa, kelas) tanpa konteks; jawaban FAQ terpotong | Informasi yang dibutuhkan orang tua (kuota, jadwal, syarat) tidak ada |

## Arah redesign
- Design system diturunkan dari portal siswa EduWay + Upskila dan Stripe Checkout (lihat `design-system.md`), berbeda dari `tutoring-center-website`.
- Beranda menjawab jenjang, kegiatan harian, biaya, dan alur PPDB tanpa popup.
- PPDB menjadi alur bertahap dengan nomor pendaftaran, unggah dokumen dari HP, dan portal orang tua berisi jadwal observasi, pengumuman, dan pembayaran daftar ulang.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero + foto kampus + kartu potongan gelombang 1 & open day, 4 kartu jenjang, kegiatan harian, fasilitas, tabel biaya (toggle gelombang 1/normal), alur PPDB 5 langkah, agenda berfilter, FAQ |
| `#daftar` | Langkah PPDB (4 dari 5), unggah 6 dokumen TK B dengan progress arsir (bisa diklik), catatan untuk guru observasi, ringkasan biaya dengan potongan gelombang & saudara → sukses |
| `#status` | Portal orang tua 2 anak: kakak diterima (SK, perjalanan pendaftaran, deret tanggal & agenda), checkout daftar ulang (lunas / cicil 3× / sekali hingga lulus; VA/QRIS) → nomor VA; tab adik berisi jadwal observasi & persiapan |
| `#admin` | Meja PPDB: bar kuota per jenjang (SMP putra/putri terpisah), filter jenjang, kanban 5 kolom (dokumen kurang → verifikasi → observasi/tes → diterima → lunas); tombol aksi memindahkan kartu |

## Tech stack produksi (rencana)
Laravel + MySQL (pendaftar, dokumen, jadwal observasi, kuota, tagihan), penyimpanan dokumen di object storage, payment gateway VA/QRIS dengan callback ke status daftar ulang, notifikasi WhatsApp API.

## Catatan foto
- Dipakai: `campus-courtyard.webp` — crop bagian atas foto kegiatan shalat istisqa (gedung, pohon, puncak tenda). Bagian bawah (jamaah, tenda dengan banner berlogo) dan papan nama sekolah di kanan dibuang lewat crop. Tidak ada wajah, tidak ada edit piksel.
- Dilewati: semua banner/poster (teks & logo), semua foto kelompok siswa (wajah anak terlihat), foto shalat berjamaah siswa (wajah dari samping), foto workshop guru (wajah jelas), foto pentas TK.
