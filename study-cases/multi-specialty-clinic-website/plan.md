# Redesign — Website Klinik Multi-Spesialis (anonim: "Klinik Utama Nirmala")

Sumber: website klinik utama di Jakarta Pusat (WordPress, diambil 18 Okt 2026). Nama, logo, nama dokter, nomor telepon, dan alamat dianonimkan. Foto asli dipakai setelah bordiran/logo klinik di jas, scrub, seragam, dan sprei disamarkan.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| 13 CTA "Buat janji temu" semuanya ke chat WhatsApp yang sama | Reservasi butuh beberapa kali berbalas pesan; admin mencatat manual |
| Jadwal & profil dokter tidak ada di beranda | Pasien tidak tahu dokter mana praktik hari apa |
| Hero dibuka dengan satu spesialisasi sensitif + slogan | Informasi praktis (jam, lokasi, cara reservasi) tidak terlihat |
| Enam layanan diulang 3× (hero, grid, footer); 50+ tindakan hanya di dropdown | Halaman panjang tanpa jalur yang jelas |
| Statistik tidak konsisten (96/98% vs 95/95/98%), 4 font berbeda, teks promo di dalam gambar | Kesan kurang kredibel dan tidak terawat |

## Arah redesign
- Design system Lapak, mode **solid**: indigo brand asli (#3C4998) dibuat lebih jenuh (#2F3FB0), aksen oranye dari situs asli, display Instrument Sans.
- Hero task-first: cari layanan + tanggal. Diikuti dokter praktik hari ini.
- Reservasi mandiri tiga langkah menggantikan alur chat lima langkah.
- Privasi sebagai nilai jual untuk layanan sensitif: keluhan hanya dibaca dokter, pemanggilan dengan nomor.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Topbar jam buka, hero + pencarian, dokter praktik hari ini, 6 layanan, galeri fasilitas, cara reservasi, testimoni, blok privasi, lokasi |
| `#reservasi` | Pilih layanan → dokter → hari (hari libur dokter nonaktif) → jam (slot penuh dicoret) → data pasien → sukses RSV-1019-014 |
| `#dokter` | Kartu dokter dengan hari praktik, filter spesialisasi, tabel jadwal mingguan |
| `#admin` | Dashboard resepsionis: KPI, kalender dokter per jam, chat konsultasi → reservasi, pasien 1 jam ke depan |

## Tech stack produksi (rencana)
Next.js + Supabase (jadwal, slot, reservasi), WhatsApp API untuk konfirmasi dan pengingat H-1.

## Aset
`public/prototypes/assets/multi-specialty-clinic-website/` — 13 foto dari situs asli (webp). Tidak dipakai: foto dengan papan nama klinik, banner promo bertulisan, foto before/after berbingkai merek, foto pasien testimoni.
