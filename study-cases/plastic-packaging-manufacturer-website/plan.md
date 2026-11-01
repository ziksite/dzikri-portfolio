# Redesign — Website Pabrik Kemasan Plastik (anonim: "Lentur Plastik")

Sumber: website pabrik kantong plastik di Indonesia (WordPress + WooCommerce, diambil 1 Nov 2026). Halaman yang ditelusuri: beranda, shop, 3 kategori, 7 produk, plastik custom, tentang, kontak, blog, form katalog. Tidak ditemukan spam judi. Nama perusahaan, merek kemasan, kota, tahun berdiri, kontak, dan nama pelanggan dianonimkan.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Toko WooCommerce dengan opsi "sort by price", tetapi tidak ada harga | Tampilan belanja tidak bisa dipakai pembeli B2B |
| Ketebalan semua produk tertulis "variatif sesuai kebutuhan" | Pembeli tidak bisa membandingkan spesifikasi sebelum bertanya |
| Tidak ada alat untuk mengubah pcs ke kg, padahal MOQ dalam kg | Pembeli tidak tahu 100 kg setara berapa kantong |
| Setiap produk berakhir di satu tombol "Tanyakan Produk" | Permintaan multi-item harus dijelaskan manual di chat |
| Katalog PDF terkunci di balik formulir | Hambatan di tahap paling awal |
| Kategori PE dan PP hanya berisi 1 produk umum | Rentang ukuran tersembunyi di gambar atau paragraf |
| Spesifikasi ukuran ada di dalam gambar produk | Tidak bisa dicari, tidak terbaca mesin pencari |
| Klaim bertentangan: "lebih dari 40 tahun" tidak cocok dengan tahun berdiri yang tertulis; cetak "hingga 3 warna" vs "hingga 4 warna" | Mengurangi kepercayaan |
| Blog kosong, tautan menuju slug lorem ipsum, kategori F&B tampil dua kali | Kesan kurang terawat |
| Respons kontak tertulis 3 × 24 jam | Tidak ada alur untuk memberi konteks lebih awal |

## Arah redesign
- Situs diperlakukan sebagai alat kerja procurement, memakai kerangka aplikasi Panze: sidebar navy + panel putih. Berbeda dari `electrical-supplies-store-website` (toko dengan ubin kategori) dan `online-printing-service-website` (alur produk + unggah).
- Alur: cari spesifikasi → hitung berat dan MOQ → kirim RFQ multi-item.
- Pembeda: hitung cepat di layar pertama, gambar teknik yang mengikuti input, rumus yang terlihat, papan mesin bentuk Gantt per shift.
- Detail design system di `design-system.md`.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hitung cepat berfungsi, fakta order, pemilih kebutuhan + perbandingan material, proses, industri, testimoni |
| `#katalog` | Pencari spesifikasi (jenis, warna, lebar, ketebalan, bisa dicetak), tabel 25 spesifikasi, panel detail dengan perkiraan berat |
| `#penawaran` | Konfigurator: gambar teknik, rumus, berat per pcs, isi per kg, total kg, meter MOQ, lalu daftar RFQ multi-item dan form → RFQ-2611-0148 |
| `#mesin` | Papan Gantt 9 mesin × 9 shift (Sen–Rab), status job, detail job, antrean yang bisa dijadwalkan ke slot kosong |

## Rumus berat (perkiraan)
`g/pcs = 2 × (lebar + lipatan) × tinggi × tebal(cm) × massa jenis × faktor bentuk`

- Tebal: µm ÷ 10.000 = cm. Rumus menghitung dua lapis film.
- Massa jenis: PP 0,90 · PE 0,92 · HDPE 0,95 g/cm³ (nilai umum bahan).
- Faktor bentuk: kantong datar 1,00 · kresek 0,88 (perkiraan potongan handle).
- Uji: kresek 28 × 48 + 8 cm, 20 µm, HDPE → 5,8 g atau ±173 pcs/kg. Rumus belum divalidasi dengan timbangan pabrik; layar menulis ±5%, angka toleransi ini juga asumsi.

## Data asli vs asumsi
| Data | Status |
|------|--------|
| Jenis PE, PP, HDPE, plastik sampah, rotogravure; tabel transparansi/kekuatan/elastisitas | Asli |
| MOQ mulai 100 kg, custom 21 hari, ganti 2× lipat per pack, respons 3 × 24 jam, jam kerja | Asli |
| Cetak hingga 3 warna | Asli, situs juga menyebut 4 di satu tempat; dipakai yang lebih konservatif |
| Kresek putih susu 15×30, 17×32,5, 24×40, 28×48, 35×55, 40×60 + kapasitas 2–20 kg | Asli |
| Kresek bening lebar 15, 24; merah 28, 35, 40; pink 30 + kapasitas | Asli (hanya lebar) |
| Sampah 40×60, 50×75, 60×100, 80×100, 90×120 | Asli |
| PP rentang 5×8 s/d 60×100 cm | Asli |
| Tinggi kresek bening, merah, pink | Asumsi, mengikuti pasangan ukuran putih susu; pink 30×50 ditaksir |
| Ukuran PP di antara ujung rentang, seluruh ukuran PE | Asumsi |
| Semua rentang ketebalan µm dan lipatan per SKU | Asumsi, situs hanya menulis "variatif" |
| MOQ 100 kg berlaku per spesifikasi dan untuk semua produk | Asumsi, situs menyebutnya untuk pesanan custom |
| Jumlah dan nama mesin, jam shift, kapasitas ±280 kg/shift, job, pemesan, nomor RFQ | Fiktif |
| Nama ukuran plastik sampah (kecil, sedang panjang, dst.) | Asli |
| Klaim sertifikasi halal dan food grade | Sengaja tidak dipakai, tidak bisa diverifikasi |
| "Resin murni tanpa daur ulang" | Klaim situs asli, tidak diverifikasi |
| Harga | Tidak ada di sumber, tidak dikarang |
| Kota Pasuruan, sejak 1994, kontak, nama PT, nama pelanggan | Fiktif (pengganti). Kutipan testimoni dipendekkan dari situs asli |

## Tech stack produksi (rencana)
Next.js + Supabase (katalog spesifikasi, RFQ, job, mesin), WhatsApp API untuk notifikasi sales, kalkulator berat sebagai satu fungsi bersama di katalog dan konfigurator.

## Catatan foto
Dipakai 11 foto, semua dari situs asli dan diperiksa pada kontras tinggi: `gudang-roll-film`, `resin-ke-hopper` (lengan pekerja, tanpa wajah), `roll-film-di-mesin` (crop satu strip kolase), `mesin-potong-kantong` (crop satu strip kolase, wanita di telepon dibuang), `kemasan-snack`, `kresek-bening-makanan`, `kresek-kotak-makanan`, `kantong-warna`, `kemasan-curah`, `kemasan-pasar`, `sayur-dalam-plastik`.

Dilewati:
- Butiran resin: watermark stok terlihat.
- Foto lantai pabrik dari atas (2 versi): sisa teks watermark di kiri bawah.
- Foto hall extruder: pola kotak-kotak tertanam di area terang; ragu asalnya dan pola tidak boleh dihapus.
- Lini hopper: karung resin bertuliskan merek pemasok, resolusi rendah.
- Semua foto kemasan produk dan banner ukuran: memuat merek klien.
- Logo pelanggan, logo perusahaan, foto kantong bercetak merek, kartu kategori dengan teks.
- Plastik sampah hitam: hanya tersedia dalam banner bermerek, jadi detail SKU sampah memakai foto kantong warna.

## Catatan koordinator

Testimoni dihapus: kutipan pelanggan asli tidak dipasangkan dengan nama fiktif.
