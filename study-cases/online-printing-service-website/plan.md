# Redesign — Website Percetakan Online (anonim: "Pelat")

Sumber: website percetakan offset & digital dengan satu workshop di kota besar di Jawa (WordPress, diambil 18 Okt 2026). Nama, logo, alamat workshop, telepon, WhatsApp, email, nama klien, dan testimoni dianonimkan. Lokasi workshop dipindah ke Gayamsari, Semarang. Daftar produk, jenis kertas, finishing, MOQ, waktu produksi 3–7 hari kerja, DP 50%, dan daftar pemeriksaan file (CMYK, resolusi, bleed, safe area, outline font, ukuran) diambil dari situs asli. Situs asli tidak mencantumkan harga; semua harga di prototype adalah **asumsi** wajar untuk percetakan skala UMKM dan perlu divalidasi.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Tidak ada harga sama sekali; "harga transparan" hanya form nama + produk + qty + nomor WA | Pengunjung tidak bisa memperkirakan biaya; setiap pertanyaan harga jadi chat manual |
| Seluruh alur pesan lewat WhatsApp (konsultasi, kirim desain, proofing, produksi, kirim) | Spesifikasi, file, dan persetujuan proof tercecer di chat; sulit dilacak saat repeat order |
| Pemeriksaan file (preflight) dijelaskan panjang di artikel SEO, tapi tidak ada tempat unggah file | Kesalahan RGB/bleed baru ketahuan setelah admin membuka file |
| Kertas dan finishing hanya daftar teks, tidak terhubung ke produk | Pembeli awam tidak tahu kombinasi yang cocok dan selisih harganya |
| Beranda sangat panjang: logo klien, testimoni, artikel SEO ribuan kata, daftar 15 kawasan | Jalur ke produk tenggelam; kesan brosur, bukan toko |
| Semua foto produk berisi logo toko; sebagian foto portfolio memuat merek klien | Foto tidak bisa dipakai apa adanya |

## Arah redesign
- Toko cetak dengan pola MOO: katalog dengan harga awal, deret ukuran berproporsi, ubin kertas berpoin.
- Konfigurator kartu nama: ukuran, kertas, sisi cetak, finishing, jumlah (tabel jenjang harga yang ikut berubah), waktu produksi → harga dan tanggal siap kirim langsung.
- Setelah konfigurasi, pelanggan mengunggah PDF dan melihat hasil preflight per poin; masalah area aman diselesaikan oleh tim pracetak atau unggah ulang, lalu proof digital disetujui dengan 3 pernyataan.
- Operasional: rencana **plano gabungan** (gang run) — pesanan dengan kertas & finishing sama digabung ke satu lembar cetak, sisa posisi terlihat, plus jadwal mesin per jam. Bentuk ini berbeda dari kalender, kanban, dan tabel staf di studi kasus lain.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Utility strip, header + nav kategori, hero terbelah (blok navy + foto ruang produksi), deret 4 jaminan, pita abu 8 produk terlaris (bentuk produk digambar CSS) + harga awal, deret 5 ukuran berproporsi, 6 ubin kertas, panel penawaran partai besar, footer |
| `#produk` | Konfigurator kartu nama: pratinjau (ukuran, sudut bulat, 1/2 sisi, warna kertas ikut berubah), 6 grup pilihan, tabel jenjang 100–2.000 lembar dengan harga per lembar & hemat %, panel harga sticky dengan tanggal siap kirim |
| `#upload` | Pesanan PLT-10418: langkah order, file PDF, preflight 6 poin (4 lolos, 1 dikonversi, 1 gagal area aman) dengan 2 opsi perbaikan, proof depan/belakang dengan garis potong/area aman/bleed yang bisa disembunyikan, persetujuan 3 centang → konfirmasi + timeline |
| `#produksi` | Rencana plano #P-1019-03 untuk Senin: 8 pesanan siap cetak (centang untuk masuk plano), plano 5 × 13 posisi terisi sesuai pesanan, meteran kapasitas (peringatan dan tombol CTP nonaktif saat melebihi), lembar kerja, jadwal 5 mesin 08.00–17.00 |

## Logika harga (prototype, asumsi)
Kartu nama, harga dasar Art Carton 260 1 sisi: 100 lbr Rp35.000 · 200 Rp60.000 · 500 Rp125.000 · 1.000 Rp220.000 · 2.000 Rp400.000. Pengali ukuran (persegi ×1,1, mini ×0,9), kertas (AC310 ×1,15, Ivory ×1,2, linen ×1,7), 2 sisi ×1,4. Finishing per 100 lbr: laminasi Rp9.000, spot UV Rp30.000, poly Rp40.000, sudut bulat Rp5.000. Kilat ×1,4. Dibulatkan ke Rp500. Default (standar, AC310, 2 sisi, doff, 500 lbr, reguler) = Rp246.500.

## Tech stack produksi (rencana)
Next.js + Supabase (produk, matriks harga, pesanan, file di storage), layanan preflight PDF di server (mis. Ghostscript/pdfcpu untuk ukuran, bleed, ruang warna, resolusi gambar, font), WhatsApp API untuk notifikasi proof dan status, Midtrans untuk pembayaran.

## Catatan foto
Dipakai (`public/prototypes/assets/online-printing-service-website/`):
- `workshop-printer` — crop dari foto ruang produksi (printer, plotter); tidak ada papan nama, logo, atau watermark.

Dilewati:
- Semua 7 mockup produk (amplop, book notes, brosur lipat 3, nota NCR, paper bag, sticky notes, kalender dinding): setiap gambar memuat logo toko yang dicap di atas produk. Dianggap watermark/tanda kepemilikan, jadi tidak dipakai dan tidak di-crop. Ubin produk diganti bentuk produk datar yang digambar dengan CSS (komponen `ps-*`).
- Logo, `bg-hero` (tekstur), semua logo klien, `pembayaran.png`, foto portfolio yang memuat merek klien nyata (wobbler & gondola ritel, kalender meja BUMN, memo pad merek obat, paper bag merek roti, hard box, buku direktori), sticky notes kucing (teks produk), undangan pernikahan (nama mempelai + logo toko), wobbler pelembut (teks promo).
