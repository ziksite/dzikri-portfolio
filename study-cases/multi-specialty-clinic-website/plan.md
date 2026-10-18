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

## Arah redesign (v2, 18 Okt 2026)
- v1 memakai kerangka yang sama dengan barbershop & villa.
- v2: **design system sendiri** dari referensi Alodokter + Glacio (lihat `design-system.md`). Indigo brand asli dipakai rata.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Pita indigo: nav, judul, 6 ikon spesialisasi, foto tim dokter; jadwal dokter hari ini (tab); layanan & fasilitas bergaya daftar artikel; jam buka, lokasi, catatan privasi |
| `#dokter` | Filter samping + kartu 7 dokter dengan slot |
| `#reservasi` | Kotak dokter, jadwal (hari + jam), data pasien, ringkasan sticky → RSV-1019-014 |
| `#admin` | Dashboard janji: chip filter, kartu "Hadir hari ini" & "Perlu ditindaklanjuti" |

## Tech stack produksi (rencana)
Next.js + Supabase (jadwal, slot, reservasi), WhatsApp API untuk konfirmasi dan pengingat H-1.

## Aset
`public/prototypes/assets/multi-specialty-clinic-website/` — foto asli situs (webp), bordiran/logo klinik disamarkan.
