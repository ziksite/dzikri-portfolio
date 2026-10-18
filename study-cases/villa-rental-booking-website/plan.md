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

## Arah redesign
- Lapak mode **solid**, biru brand asli dijenuhkan (#0A62C2), display Fraunces, wordmark tanpa ikon.
- Hero task-first: lokasi, tanggal, tamu.
- Kalender ketersediaan + rincian DP di halaman villa; pembayaran lewat virtual account di invoice.
- Dashboard agen untuk okupansi dan DP yang kedaluwarsa otomatis.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Pencarian, chip lokasi + jumlah villa, villa kosong akhir pekan, pintasan rombongan, cara booking, peringatan rekening resmi, FAQ |
| `#cari` | Filter kamar/harga/fasilitas/lokasi, hasil dengan status ketersediaan dan DP |
| `#villa` | Galeri, spesifikasi, fasilitas, tambahan, aturan, kalender harga, tamu + catering → total & DP → sukses + timeline check-in |
| `#admin` | KPI, kalender okupansi per villa, DP menunggu, jadwal survey |

## Tech stack produksi (rencana)
Next.js + Supabase (villa, kalender, booking), payment gateway virtual account, WhatsApp API untuk invoice dan pengingat.
