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

## Arah redesign
- Lapak, mode **mono**: hitam-putih, warna dari foto interior; display Instrument Serif; brand sebagai wordmark tanpa ikon.
- Hero foto penuh + bar booking (cabang, layanan, jam).
- Antrean per cabang sebagai fitur utama untuk bisnis multi-cabang.
- Member: catatan gaya dari kapster agar hasil konsisten lintas cabang.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero foto + booking bar, harga & durasi 6 layanan, 5 cabang dengan antrean, karier, blok member, footer |
| `#booking` | Cabang → layanan (multi) → kapster/siapa saja → hari → jam; ringkasan total & durasi → sukses TDH-0927 + catatan gaya terakhir |
| `#member` | Kartu member, booking berikutnya dengan diskon ulang tahun, riwayat & catatan gaya, pengingat 5 minggu |
| `#admin` | Dashboard pemilik: KPI, tabel 5 cabang, papan antrean cabang, pendapatan kapster |

## Tech stack produksi (rencana)
Next.js + Supabase (cabang, kursi, booking, member), WhatsApp API untuk konfirmasi dan pengingat.
