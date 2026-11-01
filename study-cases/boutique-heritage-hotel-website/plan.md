# Redesign — Website Hotel Butik Heritage (anonim: "Kenarilaan Hotel")

Sumber: website resmi sebuah hotel butik di gedung era kolonial di Jawa (WordPress, ditelusuri 1 Nov 2026: beranda, kamar + 6 detail tipe kamar, restoran, rapat, pernikahan, fasilitas, penawaran, pengalaman, lokasi). Nama hotel, nama outlet, kota, alamat, kontak, dan objek wisata sekitar dianonimkan; kota diganti Salatiga dan daftar objek wisata ditulis ulang untuk kota itu. Tipe kamar, luas, tarif, jam buka, paket rapat, dan paket pernikahan dipakai apa adanya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Tarif di beranda hanya "tonight's rate"; satu tipe tertulis "Fully Booked" tanpa saran tanggal lain | Tamu tidak bisa membandingkan harga antar tanggal tanpa pindah ke mesin booking |
| Booking terjadi di subdomain terpisah, form tanggal tersembunyi di panel | Alur putus; tamu yang mulai dari halaman kamar kehilangan konteks |
| Pilihan sarapan dan rincian total tidak terlihat sebelum masuk mesin booking | Tamu tidak tahu total yang dibayar saat membandingkan kamar, pemicu lari ke OTA |
| Kode shortcode mentah tampil di halaman rapat, pernikahan, dan lokasi; peta lokasi tidak muncul | Paket harga berantakan, kesan kurang terawat untuk pembeli korporat |
| Halaman penawaran kosong ("Nothing found"); tombol fasilitas di beranda mengarah ke pos bawaan WordPress | Jalan buntu pada halaman yang dekat dengan keputusan |
| Harga pernikahan tertulis per orang padahal isinya paket 50 tamu; restoran disebut buka 24 jam sekaligus 06.00–22.00 | Informasi harga dan jam saling bertentangan, tim sales harus meluruskan |
| Salah ketik dan teks yang tampak sisipan spam di deskripsi fasilitas | Merusak kepercayaan; perlu dicek pihak hotel sebagai kemungkinan website disusupi (belum diverifikasi) |
| Info akses (lift, setengah lantai tangga, balkon) terkubur di paragraf | Tamu lansia dan pengguna kursi roda sulit menyaring kamar |

## Arah redesign
- Referensi: Cottonink + kalender properti booking-27727857 (lihat `design-system.md`). Heritage dibawa foto; warna ultramarin rata + vermilion dari kursi lobi, tanpa krem.
- Konsep utama: **papan tarif**. Tanggal bukan form di hero, melainkan deret 14 hari selebar layar dengan tarif tiap malam; tamu mengklik tanggal datang lalu pulang langsung di papan.
- Berbeda dari `villa-rental-booking-website`: tidak ada search bar, kartu properti, atau kalender bulanan. Pilihan kamar berupa matriks tarif (baris tipe kamar × tanpa/dengan sarapan) dengan total yang berubah.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Bar promo, wordmark tengah, hero lobi + papan tarif interaktif, 4 ubin kamar, banner gedung, restoran, mosaik fasilitas, tab paket rapat/pernikahan, sekitar kota, footer + jalur tegel |
| `#kamar` | Papan tarif + stepper tamu, filter (balkon, tanpa tangga, kursi roda, suite), matriks 6 tipe kamar dengan total tanpa/dengan sarapan, King/Twin, kamar habis/melebihi kapasitas, bar total sticky |
| `#pesan` | Panel folio ultramarin (foto kamar, rincian per malam, sarapan, total) + data tamu, permintaan kamar, metode bayar → konfirmasi KNL-xxxxx |
| `#okupansi` | Papan okupansi: baris nomor kamar × 14 hari, batang tamu per sumber pesanan, status kebersihan per kamar; HP petugas housekeeping di sisi kanan. Tombol Mulai/Selesai mengubah status di papan, pesanan dari `#pesan` muncul sebagai batang kuning |

## Asumsi prototype (bukan data situs asli)
- Tarif Jumat dan Sabtu +10%, sarapan Rp165.000/orang/malam, tarif dianggap sudah termasuk pajak, kebijakan batal H-2, aturan penahanan kamar, dan metode bayar.
- Tarif Executive Balcony tidak tampil di situs (saat itu habis); memakai tarif Executive akses kursi roda. Luas tipe kursi roda diasumsikan 36 m².
- Kapasitas per tipe, ketersediaan, data okupansi, dan perkiraan waktu tempuh hanya contoh.

## Tech stack produksi (rencana)
Next.js + Supabase (kamar, tarif harian, inventori, reservasi), payment gateway lokal untuk virtual account dan kartu, WhatsApp API untuk konfirmasi, PWA ringan untuk HP housekeeping.

## Catatan foto
- Dipakai (19): lobi, fasad, restoran, kolam (2), perpustakaan, spa, toko, 2 Deluxe, 2 Premium, 2 Executive, Royal, Presidential, suite kanopi, aula gala, aula pernikahan.
- Di-patch: `aula-pernikahan.webp` (monogram inisial pasangan di dekorasi).
- Di-crop: `toko.webp` (bagian kanan berisi kartu merek produk dibuang).
- Dilewati: 2 foto papan nama/gerbang hotel, aula rapat dengan nama hotel di dinding, aula dengan backdrop acara bertulisan, halaman depan dengan mobil antik dan monumen khas (mudah dikenali), foto pasangan pengantin (orang nyata), foto gym (merek alat), semua foto objek wisata (menunjuk kota asli), logo.
