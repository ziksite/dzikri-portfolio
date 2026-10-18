# Redesign — Website Jasa Servis AC (anonim: "Adem Teknik")

Sumber: website jasa servis AC panggilan satu halaman (Bootstrap, diambil 18 Okt 2026). Layanan: cuci AC, tambah/isi freon, bongkar/pasang, pengecekan dan perbaikan untuk split, inverter, cassette, floor standing, split duct, central. Nama brand, nama pemilik/CS, testimoni, telepon, email, alamat, dan area layanan dianonimkan; area diganti Medan Raya. Daftar harga dipakai apa adanya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Harga ada di dua tempat dengan format berbeda ("Rp, 75K / Unit" di kartu, tabel bernomor panjang di bawah dengan nomor dobel) | Pelanggan sulit menghitung total untuk beberapa unit dengan PK berbeda |
| Paragraf panjang huruf kapital, klaim "garansi UNLIMITED", "respon < 1 menit", "nego sampai dingin" | Nada terasa seperti iklan, bertentangan dengan garansi 30 hari di footer |
| Form pesan hanya jenis jasa + jumlah 1–5, lalu ke WhatsApp | Tidak ada PK, alamat, atau jam; semua dinegosiasikan manual di chat |
| Tidak ada informasi kapan teknisi datang dan siapa | Pelanggan menunggu tanpa kepastian, sering batal (ada biaya batal Rp50.000) |
| Tidak ada catatan hasil kerja per unit | Klaim garansi dan kunjungan ulang bergantung pada ingatan teknisi |
| Kantor/ruko hanya disebut sebagai biaya tambahan Rp25.000 | Tidak ada jalur untuk kontrak perawatan rutin |
| Banner promo bertuliskan nomor dan domain, ikon 3D, foto stok | Kesan tidak konsisten, foto kerja asli tenggelam |

## Arah redesign
- Design system sendiri dari Housecall Pro (landing field service + aplikasi teknisi) dan Appointy (kalender booking). Lihat `design-system.md`.
- Unit AC menjadi objek utama: harga per unit/PK, booking memilih unit yang terdaftar di alamat, laporan dan riwayat per unit.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero dengan kalkulator layanan × PK × jumlah, notifikasi alur, tile layanan, tabel harga per PK (4 tab), bento cara kerja, area layanan, pita kontrak kantor, FAQ |
| `#booking` | Alamat + jenis bangunan, unit terdaftar (pilih + layanan per unit), unit baru (stepper), kalender + jendela 2 jam, kontak, bar total bawah → sukses ADM-2436 |
| `#lacak` | Status kunjungan ADM-2417 (progress, teknisi, log waktu), laporan per unit: checklist, pengukuran sebelum/sesudah, foto, persetujuan pekerjaan tambahan, total sementara |
| `#teknisi` | Tiga layar HP teknisi: job hari ini, checklist + input pengukuran + foto per unit, riwayat unit per alamat |

## Tech stack produksi (rencana)
Next.js + Supabase (alamat, unit, job, laporan, foto di storage), WhatsApp Business API untuk konfirmasi, link lacak, dan persetujuan pekerjaan tambahan; aplikasi teknisi sebagai PWA.

## Catatan foto
Dipakai (8, crop/konversi saja): teknisi-ac2, 3, 5, 9, 12, galeri a, d, e — foto kerja di lokasi; merek pabrikan AC (Gree, Daikin, Sharp, Panasonic) bukan identitas usaha.
Dilewati: teknisi-ac1 (papan nama toko pelanggan), teknisi-ac4 (emblem di dada seragam), teknisi-ac8 (cap tanggal/jam di foto), teknisi-ac6/7/10/11 (tidak dibutuhkan/gelap/buram), galeri b (tulisan di punggung jaket), galeri c (duplikat), banner promo (berisi nomor dan domain), gambar produk potong, foto stok, ikon 3D, logo merek.
Semua foto asli 600×800 atau lebih kecil, jadi layout memakai foto di kotak, bukan latar lebar penuh.
