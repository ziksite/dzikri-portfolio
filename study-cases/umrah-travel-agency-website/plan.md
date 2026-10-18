# Redesign — Website Travel Umroh & Haji (anonim: "Safarah")

Sumber: website penyelenggara umroh & haji khusus berizin PPIU/PIHK, kantor pusat di Jawa Tengah dengan beberapa cabang (platform travel umroh SaaS, diambil 18 Okt 2026). Nama perusahaan, logo, nomor izin, telepon, email, nomor rekening, alamat, nama pembimbing, dan nama jamaah diganti fiktif. Nama paket, harga per tipe kamar, durasi, maskapai, nama hotel, dan itinerary dipakai apa adanya. Daftar cabang diubah sebagian (hanya nama kota/kawasan).

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero berupa slider poster promo penuh teks + banner izin bergambar | Info penting (tanggal, harga, izin) tidak bisa dibaca/dicari, berat di HP |
| Kartu paket menampilkan "Kelas Hotel" dan "Maskapai" kosong, jam berangkat aneh ("14:01") | Calon jamaah tidak bisa membandingkan paket tanpa membuka poster |
| Harga per tipe kamar, hotel, dan "harga termasuk" hanya di deskripsi bebas berisi emoji, ada butir duplikat | Sulit dipindai, terkesan kurang rapi untuk transaksi Rp30–65 juta |
| Tidak ada simulasi DP/cicilan; tabungan umroh dijelaskan sebagai daftar langkah teks | Keputusan finansial (pertanyaan utama jamaah) harus lewat chat CS |
| Nomor izin tampil sebagai teks kecil di header; rekening bank berderet di footer | Sinyal kepercayaan ada tapi tidak dipakai di titik keputusan |
| Galeri dan testimoni berupa poster bertulisan dengan foto wajah jamaah | Tidak ada foto tempat/hotel yang bersih; privasi jamaah kurang dijaga |
| Login jamaah/agen/admin ke aplikasi terpisah, tidak terlihat apa isinya | Nilai "aplikasi jamaah" tidak terasa dari website |

## Arah redesign
- Design system sendiri dari **Bobobox** (pencarian & kartu) + **portal pinjaman** (tile cicilan), lihat `design-system.md`.
- Beranda = jadwal keberangkatan yang bisa difilter per musim (Ramadhan, Syawal, libur sekolah), setiap baris menyebut hotel, maskapai, kursi tersisa, dan harga.
- Detail paket menulis ulang konten poster jadi data terstruktur + simulasi cicilan dengan jadwal bayar sampai H-45.
- Portal jamaah menggabungkan progres pembayaran dan checklist dokumen per anggota pendaftaran.
- Layar operasional: rooming list per hotel (bukan dashboard KPI), karena pembagian kamar per gender/mahram adalah pekerjaan nyata menjelang keberangkatan.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Band teal + foto Makkah, pill produk, search (bulan, kota, budget), strip izin, jadwal 7 keberangkatan dengan filter bulan, hotel, tabungan umroh, FAQ, cabang, footer |
| `#paket` | Umroh libur sekolah 1 Jul 2027: galeri 3 foto, fakta, hotel Makkah/Madinah, itinerary 9 hari, termasuk/tidak, kartu harga per tipe kamar + kursi, simulasi cicilan (tipe kamar, dewasa/anak, DP) → jadwal 7 cicilan → kursi ditahan SFR-2707-0193 |
| `#jamaah` | Portal Nur Aisyah (2 jamaah): tile total/terbayar/sisa/progres 66%/dokumen 9/12, daftar cicilan + VA, checklist dokumen (pas foto ditolak → unggah ulang), kartu keberangkatan & manasik |
| `#rooming` | Rooming list Makkah rombongan 11 Feb 2027: daftar 6 jamaah belum dapat kamar, papan kamar per lantai (gender, keluarga/mahram, pendampingan), klik jamaah → klik kasur kosong |

## Tech stack produksi (rencana)
Next.js + Supabase (paket, keberangkatan, kursi, pendaftaran, cicilan, dokumen, kamar), payment gateway virtual account untuk DP/cicilan dengan rekonsiliasi otomatis, penyimpanan dokumen terenkripsi, notifikasi WhatsApp untuk jatuh tempo dan dokumen ditolak.

## Catatan foto
- Dipakai (8): foto eksterior hotel dari data hotel di halaman paket (Makkah: menara jam, Grand Plaza, Maysan Al Maqam, Ajyad; Madinah: pelataran Nabawi, Mirage Salam, Sanabel, Taiba). Papan nama di foto adalah nama hotel pihak ketiga yang memang disebut di paket, bukan nama travel. Tidak ada watermark.
- Tidak dipakai: semua foto galeri/dokumentasi (logo travel, judul, nama ustadz, wajah jamaah di atas foto), poster paket dan slider (teks/logo/harga), banner izin (logo + nomor izin asli), thumbnail artikel (poster bertulisan), thumbnail video YouTube, ikon fitur PNG.
- Karena foto bersih hanya foto hotel, layout memakai foto sebagai identitas hotel per paket, bukan foto suasana/orang.
