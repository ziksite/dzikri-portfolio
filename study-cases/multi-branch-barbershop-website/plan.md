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

## Arah redesign (v2, 18 Okt 2026)
Versi pertama ditolak karena kerangkanya sama dengan klinik & villa (hero kiri + search bar, grid kartu, form kiri + ringkasan kanan, admin sidebar + 4 KPI). Versi 2 memakai Lapak hanya untuk komponen kecil; layout dirancang dari konsep bisnisnya:
- **Konsep: papan harga barbershop / majalah cetak.** Kertas krem + hitam, serif Instrument Serif besar, tanpa kartu & bayangan.
- Beranda = papan harga (kiri) + foto interior setinggi layar dengan widget antrean live (kanan); cabang sebagai papan keberangkatan; member sebagai tiket sobek; strip foto; footer wordmark besar.
- Booking = satu kolom langkah bernomor, ringkasan di bar bawah.
- Member = kartu pass + catatan potongan seperti buku catatan.
- Admin diganti **layar TV antrean di cabang** (gelap, huruf besar, saran cabang kosong).

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Papan harga 6 layanan, antrean 5 cabang, papan cabang, tiket member, strip foto |
| `#booking` | Cabang → layanan → kapster → jam → data; bar total di bawah → tiket TDH-0927 + catatan gaya terakhir |
| `#member` | Pass member, catatan potongan |
| `#tv` | Layar antrean cabang: 6 kursi, berikutnya, saran cabang kosong |

## Tech stack produksi (rencana)
Next.js + Supabase (cabang, kursi, booking, member), WhatsApp API untuk konfirmasi dan pengingat.
