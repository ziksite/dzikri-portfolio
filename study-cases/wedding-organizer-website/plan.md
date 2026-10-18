# Redesign — Website Wedding Organizer & Katering (anonim: "Laras Wedding & Catering")

Sumber: website WO + katering (WordPress/Elementor, diambil 18 Okt 2026). Nama brand, logo, nama pemilik & kontak, nomor rekening, alamat kantor, nama gedung rekanan, dan wilayah layanan dianonimkan. Wilayah dipindah ke **Bandung & Cimahi** dengan 6 gedung fiktif. Harga paket per jumlah tamu, isi paket, harga sewa AC/misty cool/janur, dan ketentuan pembayaran dipakai apa adanya. Nama paket asli diganti ("Paket Utama", "Paket Ringkas") karena khas brand.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero hanya slogan + tombol "Hubungi Kami", tanpa harga atau isi paket | Calon pengantin tidak tahu kisaran biaya sebelum chat |
| Harga tersebar di ±120 halaman gedung, masing-masing 7 baris harga per jumlah tamu | Membandingkan gedung harus membuka halaman satu per satu |
| Tidak ada info tanggal kosong per gedung | Semua pertanyaan ketersediaan lewat WhatsApp ke 4 nomor berbeda |
| Isi paket (katering, rias, dokumentasi, dekor) ada di halaman ketiga berupa daftar panjang | Perbedaan dua paket yang mirip tidak terlihat |
| Ketentuan bayar (booking Rp3 juta, DP 50% H-30, lunas H-14) tersembunyi di akordeon, rekening atas nama pribadi | Jadwal bayar tidak dihitung ke tanggal acara; terkesan kurang formal |
| Beranda & galeri memakai feed Instagram berisi nama pasangan dan nomor HP di caption; foto "Tentang Kami" ber-watermark vendor dekor lain | Privasi klien lama terbuka, kesan kurang rapi |
| Tidak ada alat untuk pasangan setelah booking | Checklist, pembayaran, dan koordinasi vendor tetap lewat chat |

## Arah redesign
- Design system sendiri dari referensi Yow Island reservation dashboard + SaaS reservation calendar list view (lihat `design-system.md`). Struktur mengikuti produk reservasi: kartu grup, grid gedung × tanggal, panel gelap untuk ringkasan.
- Harga dihitung dari tiga variabel nyata situs: paket, jumlah tamu, gedung. Jadwal bayar dihitung dari tanggal acara.
- Setelah booking pasangan mendapat planner; di hari H kru memakai rundown per cue.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero teks + 3 foto dekor/buffet, tabel perbandingan 3 paket, gedung per wilayah dengan tanggal kosong, cara bayar 4 tahap, form konsultasi & test food (tanggal + jam → sukses) |
| `#paket` | Susun paket: tab Utama/Ringkas, grid 6 gedung × 12 akhir pekan (kosong/ditahan/terisi/perawatan), jumlah tamu (dibatasi kapasitas gedung), menu A/B/C, tambahan dengan stepper, isi paket (akordeon), jadwal bayar terhitung, bar estimasi sticky → "Tahan tanggal" sukses |
| `#planner` | Planner pasangan (shell sidebar ala Yow): checklist 18 tugas dengan progres & filter, pembayaran booking/DP/pelunasan, kartu jadwal test food + tanya koordinator, tabel vendor hari H |
| `#hari-h` | Rundown kru di hari acara: header gelap dengan jam, filter per PIC, grup Akad/Jeda/Resepsi (grup selesai terlipat), cue berjalan + "Tandai selesai", vendor hadir, buffet & buku tamu, catatan keluarga |

## Asumsi yang perlu dikonfirmasi
- Selisih harga gedung disederhanakan menjadi biaya tambahan tetap per gedung (di situs asli selisih per jumlah tamu sedikit berbeda).
- Biaya menu B (+Rp1,5 jt) dan C (+Rp5 jt) diambil dari selisih harga paket akad di rumah; harga pondokan tambahan (Rp2 jt / 100 porsi) adalah perkiraan.
- Booking Rp3 juta diasumsikan dipotong dari pelunasan. Bila tanggal acara kurang dari H-30, DP jatuh tempo 3 hari setelah booking.

## Tech stack produksi (rencana)
Next.js + Supabase (gedung, slot tanggal, harga paket per jumlah tamu, booking, checklist, rundown), payment gateway virtual account untuk booking/DP/pelunasan, WhatsApp API untuk pengingat jatuh tempo dan konfirmasi.

## Catatan foto
Dipakai (4, dari situs asli, tanpa wajah, tanpa edit piksel): `pelaminan-bunga-blush`, `meja-akad`, `buffet-biru`, `buffet-merah-emas`.
Dilewati: foto pelaminan ber-watermark vendor dekor, foto buffet/dessert dengan watermark atau logo WO, foto dekor berisi nama/monogram pasangan, foto pasangan yang wajahnya jadi subjek, feed Instagram (nama pasangan + nomor HP), banner menu bertulisan, foto stok generik, foto pondokan dengan papan tenant bertulisan kecil.
