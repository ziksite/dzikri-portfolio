# Redesign — Website Booking Sewa Villa (anonim: "Rumah Kabut")

Sumber: website agen sewa villa Puncak & Cipanas (WordPress + WooCommerce, diambil 18 Okt 2026). Nama agen, nama villa, nama pemilik, nomor telepon, dan rekening dianonimkan. Jumlah villa per lokasi, harga, fasilitas, biaya tambahan, aturan DP, dan survey dipakai sesuai data situs.

**Foto:** sebagian besar foto di situs asli diberi watermark agen. Foto ber-watermark **tidak dipakai dan watermark tidak dihapus**. Prototype hanya memakai 15 foto tanpa watermark (4 villa).

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Beranda = daftar produk WooCommerce default ("Menampilkan 1–12 dari 143 hasil") | Tidak ada pencarian tanggal/tamu; pengunjung menelusuri 12 halaman |
| Kartu villa tanpa kamar, kapasitas, atau harga per malam | Tidak bisa membandingkan villa dari daftar |
| Cek ketersediaan hanya via WhatsApp per villa | Beban admin tinggi, tamu menunggu balasan |
| DP 30/50%, extra bed, catering, survey tersebar di halaman berbeda | Total biaya tidak jelas sebelum chat |
| Enam rekening bank dicantumkan untuk transfer | Rawan penipuan atas nama agen, tamu ragu membayar |

## Arah redesign (v2, 18 Okt 2026)
- v1 memakai kerangka yang sama dengan klinik & barbershop.
- v2: **design system sendiri** dari referensi Airbnb + Pushost (lihat `design-system.md`). Biru brand asli menggantikan aksen Airbnb.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Header tab kategori, search pill, filter fasilitas, villa kosong akhir pekan, ubin rombongan & tambahan, chip lokasi + jumlah villa |
| `#cari` | Search kecil, chip filter aktif, hasil 3 villa + 1 villa kurang kapasitas |
| `#villa` | Galeri 1+4, sorotan, fasilitas, kalender 2 bulan, ketentuan, kartu pesan (tamu, catering, total, DP) → sukses + VA |
| `#admin` | Kalender properti: daftar villa, kalender Oktober dengan harga per malam dan bar status |

## Tech stack produksi (rencana)
Next.js + Supabase (villa, kalender, booking), payment gateway virtual account, WhatsApp API untuk invoice dan pengingat.
