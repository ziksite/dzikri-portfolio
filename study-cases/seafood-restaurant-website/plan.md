# Redesign — Website Restoran Seafood (anonim: "Labuh Seafood")

Sumber: website restoran seafood keluarga dengan 5 cabang di 5 kota dan satu tier fine dining yang akan dibuka (WordPress + Elementor, ditelusuri 1 Nov 2026: beranda, menu, halaman tier premium, data cabang, sampel 8 artikel). Nama, logo, kota, nama ruang, kontak, dan alamat dianonimkan. Tidak ditemukan spam judi di halaman yang dicek. Halaman internal situs yang muncul di API publik tidak dibuka.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Tidak ada harga sama sekali di situs, padahal bisnisnya menjual seafood per berat | Tamu tidak bisa memperkirakan tagihan, keberatan utama untuk seafood timbang |
| Keunggulan "pilih sendiri seafood segar" hanya disebut di teks | Pembeda utama tidak bisa dicoba sebelum datang |
| Reservasi berakhir di WhatsApp per cabang tanpa pilihan meja, jam, atau pesanan | Tim cabang mencatat manual, tamu tidak tahu ketersediaan |
| Pop-up pilihan restoran keluarga vs tier premium muncul sebelum konten | Layar pertama terhalang untuk semua pengunjung |
| Halaman menu lama terpisah dari beranda baru, navigasi dan isinya berbeda | Daftar menu tidak konsisten |
| Bagian ulasan berisi teks contoh berlabel "bukan ulasan asli" | Menurunkan kepercayaan, belum siap tayang |
| Data foto di tema masih bertanda placeholder dan TODO | Indikasi konten belum selesai dimigrasi |

## Data asli vs asumsi
| Data | Status |
|------|--------|
| Lima cabang, jam buka, kapasitas, jumlah ruang privat, fasilitas | **Asli**, nama kota dan nama ruang diganti. Kota asli diganti Malang, Solo, Bogor, Mataram, Balikpapan |
| Tier fine dining, tiga babak pengalaman, dua lokasi akan datang | **Asli secara konsep**, kota dan bulan diganti (Medan, Tangerang) |
| Jenis masakan: saus Padang, lada hitam, tim Hongkong, asam, karamel bawang, saus Singapura, bakar, rahang tuna, nampan seafood, es serut, mangga sagu, pisang ijo | **Asli**, nama yang khas diganti: platter menu bulanan menjadi Nampan Laut, saus bernama brand menjadi Saus Labuh, saus bernama selat menjadi Saus Selat |
| Metode bayar, halal, FAQ reservasi | **Asli**, ditulis ulang |
| Harga Gurame Rp19.000/100 g | **Terbaca dari kartu harga di foto etalase** (foto unggahan 2024, buram, bisa sudah berubah) |
| Kisaran Rp19.000–30.000/100 g untuk ikan | **Terbaca dari kartu lain di foto yang sama**, nama jenis sebagian tidak terbaca. Dipakai sebagai patokan skala |
| Harga semua jenis lain per 100 g | **Asumsi** |
| Harga menu dapur, penutup, biaya masak Rp15.000–40.000, pajak 10%, DP ruang privat Rp500.000 | **Asumsi** |
| Daftar berat per ekor, stok kg, status meja, antrean, jam pesanan | **Asumsi** untuk demo |
| Denah meja | **Asumsi**, tidak ada denah di situs asli |
| Timbang ulang saat tiba dan seafood disisihkan 30 menit | **Asumsi aturan**, perlu dicocokkan dengan SOP restoran. Hanya alur timbang di depan tamu yang disebut di situs asli |

## Arah redesign
- Konsep: **POS yang dibuka untuk tamu**. Rail kiri, kerja di tengah, nota di kanan, dan nota yang sama berpindah dari etalase ke denah meja lalu masuk papan cabang.
- Berbeda dari `catering-service-website` (landing menu-led dengan katalog paket) dan dari redesign lain: tidak ada hero rata tengah, top nav, atau search bar pill.
- Pembeda: etalase per gram. Ekor utuh dipilih dari stok nyata lewat slider, hasil laut curah per kelipatan gram. Harga dan rumus berubah saat digeser.
- Pola denah dan papan meja diadaptasi secara fungsi dari prototype restoran yang tidak dipublikasikan. Aset, nama, dan CSS tidak disalin.
- Papan operasional dibuat berbasis antrean timbang, bukan denah gelap, dengan input berat aktual dan selisih harga.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero split + meja malam ini, 5 tile etalase, 6 kartu andalan dapur, tab 5 cabang, ruang privat, Labuh Reserve + daftar lebih dulu, FAQ |
| `#etalase` | Kartu etalase per 100 g + menu dapur, filter, pencarian, panel timbang (foto, slider, cara masak, rumus harga), nota, total |
| `#reservasi` | Tanggal, jam, tamu, denah (aula, teras, ruang privat), nota terbawa, form, sukses |
| `#papan` | Tablet kapten: tile meja, tiga lajur (perlu ditimbang, dimasak, siap antar), input berat aktual, stok etalase berkurang saat dikonfirmasi |

Alur tersambung: nota → reservasi → antrean papan (hanya untuk tanggal hari ini).

## Tech stack rencana
Next.js + Supabase (menu, harga harian, stok, meja, reservasi), panel admin harga harian per cabang, notifikasi WhatsApp lewat penyedia resmi, QRIS lewat payment gateway untuk DP.

## Catatan foto
**Dipakai (25, crop saja, tanpa edit piksel, tanpa `patch.mjs`):** foto hidangan seri 2026 dan dua foto kepiting 2023 yang bersih, foto interior dan bangunan tanpa logo, crop bahan mentah (kepiting, udang, kerang), crop gurame di atas es.

**Crop untuk membuang merek:**
- `ruang-aula`: logo emas di dinding belakang dibuang, foto dipotong ke bagian bawah.
- `ikan-es`: dari foto etalase. Dinding berlogo dan kartu harga berlogo dibuang.
- `platter-lobster`, `platter-kepiting`, `lobster-closeup`: tumpukan piring bertuliskan merek dibuang.
- `ruang-makan`, `bangunan`: dirapikan.

**Dilewati:**
- 13 foto menu 2024 bercap logo (watermark, tidak di-crop sesuai aturan), termasuk kerapu, kakap kukus, dan kelapa berukir nama brand. Karena itu kerapu dan kelapa utuh tidak ditampilkan.
- Semua foto cabang 2024 dan beberapa foto cabang 2026 yang memiliki papan nama, neon, logo dinding, atau keterangan nama ruang.
- Foto staf, tamu, dan acara (wajah dapat dikenali).
- `kerang-hijau-es` dan `etalase-baki` setelah dicoba: terlalu buram atau masih menyentuh kartu harga.

**Catatan:** komentar kode di tema situs asli menandai foto menu sebagai placeholder pihak ketiga, tetapi berkasnya berada di folder unggahan situs dan terlihat sebagai pemotretan seragam. Komentar itu tampak usang. Tidak bisa dipastikan penuh; jika koordinator ragu, status lisensi foto hidangan perlu dicek.

Foto kakap, cumi, dan lobster di etalase adalah foto masakan, bukan bahan mentah, karena foto mentah bersih tidak tersedia.
