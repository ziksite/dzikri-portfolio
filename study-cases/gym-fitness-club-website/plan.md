# Plan — Gym & Fitness Club Website

## Sumber
Website gym lokal dengan 3 studio, ditelusuri: beranda, membership, classes, schedule, facilities, gallery, contact, promo ajak teman. Warna asli merah dan hitam. Situs asli punya beberapa lokasi; prototype dibuat sebagai satu klub sesuai arahan.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Jadwal hanya tabel baca, tanpa sisa kuota atau booking | Member tidak tahu kelas penuh sebelum datang, staf menjawab pertanyaan yang sama di chat |
| Harga hanya "mulai 150K", detail lewat kontak | Calon member berhenti sebelum tahu angka, atau menambah beban chat admin |
| CTA "Learn more" berulang tanpa langkah lanjut | Tidak ada jalur dari melihat kelas ke mendaftar |
| Coba gratis 1 hari tidak terhubung ke jadwal | Pengunjung coba tidak diarahkan ke kelas yang cocok |
| Tidak ada info jam ramai | Member baru bisa datang di jam penuh tanpa tahu sebelumnya |
| Halaman fasilitas hanya foto + paragraf | Sulit memindai apa saja yang didapat |
| Tidak ada jejak check-in digital di situs | Asumsi: status membership dan booking dicek manual di resepsionis |

## Arah redesign
Situs terasa seperti aplikasi klub: gelap, padat informasi, dengan jadwal sebagai pusat. Alur: tandai kelas di jadwal mingguan → pilih paket × durasi di matriks harga → konfirmasi → kode check-in dipakai di tablet pintu masuk.

## Layar
| Hash | Layar | Isi |
|------|-------|-----|
| `home` | Beranda bento | Judul, peta jam ramai, promo solid, 3 studio, kelas berikutnya, tabel area, kelas grup |
| `jadwal` | Jadwal mingguan | Grid hari × jam dari jadwal asli, filter studio, sisa kuota, dock kelas terpilih. HP: tab hari + daftar |
| `gabung` | Membership & konfirmasi | Matriks 3 paket × 4 durasi, tanggal mulai, cara bayar, PT, total, kode check-in |
| `pintu` | Kiosk tablet pintu masuk | Keypad 4 digit, panel status penuh warna (aktif, hampir habis, ditolak), loker, kelas. Kode member baru dari alur ikut berfungsi |

## Tech stack rencana
Next.js + Supabase (jadwal, kuota, member), Midtrans untuk pembayaran, WhatsApp Business API untuk notifikasi, PWA mode kiosk di tablet.

## Data
- Dari situs asli: nama kelas, jam, hari, fasilitas, luas, jumlah kelas, promo, merek alat, harga mulai Rp150.000.
- Fiktif: nama brand, pelatih, studio, kota/kawasan, member.
- Ilustrasi (situs asli tidak mempublikasikan): matriks harga selain Rp150.000, harga PT, kuota, jam buka, peta jam ramai.

## Catatan foto
| File | Penanganan |
|------|-----------|
| `kelas-barbel-arena` | Tanpa logo gym, merek step tetap terlihat kecil |
| `kelas-sepeda-spin` | Crop atas |
| `kelas-suspensi-flow` | Tanpa logo gym |
| `area-beban-bebas` | Crop bagian bawah, buang logo besar di dinding |
| `pelatih-muaythai` | Logo di kaos ditutup `patch.mjs` (dada, lengan) |
| `kelas-pound`, `kelas-hiphop`, `kelas-zumba` | Crop samping. Poster dinding yang tersisa sudah dizoom, hanya siluet orang tanpa logo |
| `kelas-yoga` | Resolusi 600 px, hanya untuk tile kecil |

Dilewati: foto personal training (akun di dinding + logo kaos, crop memotong orang), foto grup staf (logo dinding), area selectorized (buram), bodypump (kaos brand program), contemporary & exotic (tidak cocok), transformasi (foto pelanggan), feed Instagram (banner teks/logo, resolusi rendah), banner promo, header.
