# Redesign — Website Laundry Express Antar-Jemput (anonim: "Bilas Laundry")

Sumber: website laundry express antar-jemput 20 outlet di Jawa (diambil 1 Nov 2026). Satu halaman, tanpa spam judi. Nama, logo, kota, area, kontak, dan alamat dianonimkan. Harga dipakai apa adanya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Lima kartu harga terpisah, tanpa berat atau jam kembali | Pelanggan menghitung total dan jam kembali sendiri |
| Semua "Pesan Sekarang" membuka chat WhatsApp | Jam jemput dan area baru dibahas manual lewat chat |
| "3 Jam Beres" tanpa syarat, sementara jam buka 08.00–22.00 | Order sore tidak bisa selesai sesuai janji, ekspektasi meleset |
| Menyebut "sistem tracking" tetapi tidak ada halaman lacak | Klaim tidak bisa dibuktikan pelanggan |
| Reguler tertulis "2-3 hari" dan "48 jam" | Informasi bertentangan |
| Layanan satuan disebut, harga hanya ada di spanduk foto outlet | Harga tidak bisa ditemukan di situs |
| Tiga testimoni tanpa bukti, foto tim dan banner penuh teks promo | Kepercayaan bertumpu pada klaim umum |
| Ikon emoji di kartu layanan dan keunggulan | Terlihat seperti template |

## Arah redesign
Inti bisnis adalah jam kembali, jadi hero adalah **papan kecepatan**: lima baris yang sekaligus daftar harga, linimasa, target, dan total. Linimasa yang sama muncul lagi di halaman lacak sebagai rencana vs aktual. Berbeda dari `ac-service-company-website` (hero navy, kalkulator pill, foto + kartu mengambang, lacak bar 5 segmen, HP teknisi) dan `cargo-shipping-company-website` (banner foto + widget tab, pill oranye, stepper + riwayat vertikal, gudang).

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Papan kecepatan interaktif, syarat target, proses, cuci satuan, outlet per kawasan, FAQ |
| `#pesan` | Tiga kolom (paket, jam jemput, alamat) + bar bawah target dan total → sukses BLS-20433 |
| `#lacak` | Gantt rencana vs aktual per nota: BLS-20418 berjalan, BLS-20397 terlambat 25 menit, nomor lain tidak ditemukan |
| `#kasir` | Tablet kasir: antrean timbang, tile paket, papan produksi, timbangan + keypad, cetak nota |

## Data asli vs asumsi
| Data asli dari situs | Asumsi / fiktif |
|----------------------|-----------------|
| Cuci setrika: 3 Jam 25.000, 6 Jam 19.000, 12 Jam 15.000, 24 Jam 9.000, Reguler 7.000 per kg | Nama brand, wordmark, kota dan 8 kawasan, nama orang, kontak, nomor nota |
| Cuci lipat: 3 Jam 20.000, 6 Jam 12.000, 24 Jam 7.000 per kg (12 Jam dan Reguler memang tidak ada) | Pembagian 20 outlet per kawasan, kapasitas, jam jemput terakhir |
| Minimal 3 kg, tidak ada minimal jemput | Target dihitung sejak timbang, jeda 30 menit dari akhir slot jemput ke timbang |
| Gratis antar-jemput ke rumah, kos, apartemen, hotel | Batas timbang 18.30 / 15.30; paket 12 dan 24 Jam yang jatuh di luar jam buka diantar 08.00 |
| 20 outlet, buka setiap hari 08.00–22.00, CS 24 jam | Slot, sisa kurir, durasi tahap, status produksi, alasan keterlambatan |
| Jawaban FAQ (ganti rugi sesuai nota, cek bahan) | Daftar bahan yang masuk satuan (selimut tebal, jas, kain mudah luntur) |
| Harga satuan: boneka 20.000, sepatu 25.000/pasang, bedcover 20.000, bantal/guling 25.000 — dari **spanduk promo di foto outlet**, bukan teks situs, mungkin sudah berubah | Tagihan mengikuti berat aktual sampai 0,1 kg di atas minimal |

Klaim 3 jam ditulis sebagai target layanan. Syaratnya usulan redesign dan perlu dikonfirmasi pemilik bisnis nyata.

## Tech stack produksi (rencana)
Next.js + Supabase (order, slot kurir, tahap nota, outlet), WhatsApp API untuk notifikasi, integrasi timbangan dan printer thermal di tablet kasir.

## Catatan foto
| File | Sumber | Perlakuan |
|------|--------|-----------|
| `mesin-pengering.webp` | Foto ruang mesin | Crop pintu pengering saja; panel berlogo merek dan stiker nota terbuang |
| `paket-siap-antar.webp` | Foto pengemasan | Crop tumpukan paket; papan logo, orang, dan cetakan merek pada kemasan terbuang |
| `tas-jemputan.webp` | Foto antrean cuci | Crop tas polos; spanduk, nomor telepon, label nama tulisan tangan terbuang |

Dilewati: foto hero (orang + nama brand), foto tim outlet dan tim kurir (wajah + logo seragam + spanduk), foto layanan antar (wajah + spanduk), foto outlet (papan nama, telepon), foto tas masuk (tas merek pelanggan), foto testimoni. Tidak ada `patch.mjs` dan tidak ada foto dari sumber lain.
