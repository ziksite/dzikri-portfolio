# Redesign — Website Barbershop Multi-Cabang (anonim: "Teduh Barbershop")

Sumber: website barbershop premium 5 cabang di Surabaya & Pasuruan (Zyro, diambil 18 Okt 2026). Nama, logo, nama area cabang, dan kontak dianonimkan. Harga dan daftar layanan dipakai apa adanya. Foto dengan papan nama, logo di kaca, kaos bersablon logo tidak dipakai; foto dengan maskot logo di kain potong di-crop.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero hanya slogan "BEST BARBER IN TOWN", paragraf terpotong, area kosong besar | Layar pertama tidak memberi alasan atau jalan untuk booking |
| Semua tombol "Reservasi" ke satu nomor WhatsApp | Tidak bisa pilih cabang, kapster, atau jam |
| Harga di halaman terpisah | Pelanggan baru harus mencari harga |
| 5 cabang tanpa jam buka, Maps, atau info antrean | Pelanggan datang ke cabang yang sedang penuh |
| Promo member hanya di top bar; embed Instagram gagal; bahasa campur | Program retensi tidak terjelaskan, kesan kurang terawat |

## Arah redesign (v3, 18 Okt 2026)
- v1 terlalu mirip template klinik & villa; v2 (papan harga krem + serif) dinilai AI slop.
- v3: **design system sendiri** diturunkan dari referensi Fresha + Cal.com (lihat `design-system.md`). Struktur mengikuti produk booking nyata.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero + search pill, kartu 5 cabang, panel layanan & harga, member, kapster |
| `#cabang` | Halaman cabang Gubeng: galeri, tab, layanan (+/✓), kapster, ulasan, tentang, kartu booking sticky |
| `#booking` | Pilih waktu: kapster, deret tanggal, daftar jam, ringkasan → konfirmasi TDH-0927 |
| `#member` | Booking mendatang, catatan potongan, keuntungan member |
| `#admin` | Kalender partner: kolom per kapster, booking/walk-in/istirahat, garis waktu sekarang |

## Tech stack produksi (rencana)
Next.js + Supabase (cabang, kursi, booking, member), WhatsApp API untuk konfirmasi dan pengingat.
