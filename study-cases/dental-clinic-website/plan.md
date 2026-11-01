# Redesign — Website Klinik Gigi (anonim: "Seri Dental")

Sumber: situs satu halaman klinik gigi kecil + halaman tautan reservasinya (diambil 1 Nov 2026), plus daftar paket klinik di marketplace voucher kesehatan. Situs hanya punya satu URL (sitemap satu entri); layanan, dokter, dan lokasi adalah section di halaman itu. Nama, logo, dokter, kontak, dan kota dianonimkan. Kota diganti ke Malang dan Batu.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Tombol "Reservasi" dan "Download Pricelist" sama-sama ke halaman kumpulan tautan, dan di sana tidak ada pricelist | Pasien yang mencari harga berakhir di daftar nomor WhatsApp |
| Hanya 4 perawatan berharga di situs; perawatan lain disebut dalam paragraf tanpa harga | Kekhawatiran utama pasien, biaya, tidak terjawab |
| Reservasi lewat WhatsApp per cabang, tanpa jadwal dokter | Pasien tidak bisa melihat jam kosong atau memilih dokter |
| Paragraf panjang "kenapa harus kami" di layar kedua | Tidak menjawab "gigi saya sakit, perlu apa dan berapa" |
| Galeri foto mulut before-after besar di tengah halaman | Mengganggu sebagian pengunjung dan rawan soal izin pasien |
| Situs menampilkan 2 cabang, halaman tautan 3 cabang | Informasi lokasi tidak konsisten |
| Dokter hanya nama dan riwayat pendidikan | Tidak terhubung ke jadwal |

## Arah redesign
- Mulai dari keluhan, bukan nama perawatan: keluhan → perawatan + harga → jadwal → konfirmasi.
- Peta gigi dua rahang menghitung biaya per gigi; dock bawah membawa perkiraan sampai konfirmasi.
- Tidak memakai kerangka form kiri ringkasan kanan. Jadwal berupa matriks minggu, ringkasan di dock.
- Operasional klinik kecil berpusat pada kursi, jadi layar resepsionis adalah papan kursi dengan sterilisasi sebagai status, bukan daftar janji.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero + search keluhan, 5 perawatan populer dengan peta gigi mini, daftar harga akordeon, jadwal kosong, dokter, klinik, ulasan, konsultasi gratis |
| `#perawatan` | Chip keluhan, peta gigi 32 nomor FDI, opsi perawatan + harga, alur kunjungan, dock perkiraan |
| `#jadwal` | Filter klinik dan dokter, matriks jam × hari 2–8 Nov, data pasien, dock → sukses kode SRD-2418 |
| `#kursi` | Tablet resepsionis: 3 kartu kursi (selesai → sterilisasi + checklist → kosong → panggil pasien), garis waktu per kursi, antrean, tagihan kasir |

## Sumber harga
- Dari situs asli: scaling Rp299.000, tambal komposit Rp329.000, whitening Rp1.299.000 (40 menit), gigi anak Rp149.000–249.000.
- Dari harga paket di marketplace, dibulatkan ke ribuan: perawatan lain. Veneer per gigi dihitung dari paket 2 dan 6 gigi.
- Harga marketplace adalah harga voucher, jadi harga klinik langsung bisa berbeda.
- Durasi selain whitening adalah asumsi.

## Catatan foto
- Dipakai: 2 crop ruang tindakan tanpa orang. Dokter memakai avatar inisial: wajah orang nyata tidak dipasangkan dengan nama dan rating fiktif.
- Dilewati: semua foto mulut before-after dan foto pasien (aturan pemilik); foto tindakan dengan pasien di kursi (hanya bagian ruangan yang di-crop); 2 foto stok close-up mulut; semua potret dokter (keputusan koordinator); foto resepsionis dan ruang dengan logo atau tulisan brand; potret dengan bordir nama di jas atau logo; foto logo.

## Tech stack produksi (rencana)
Next.js + Supabase (perawatan, harga, jadwal dokter, kursi, janji), WhatsApp API untuk konfirmasi dan pengingat.
