# Redesign — Website Catering (anonim: "Lestari Catering")

Sumber: website catering rumahan di kota besar di Jawa (WordPress + WooCommerce, diambil 18 Okt 2026): nasi box, catering harian kantor, prasmanan 4 paket, tumpeng/tampah, stall, coffee break, hampers, kantin sekolah. Nama, logo, pendiri, kontak, alamat, PT, dan daftar klien dianonimkan. Kota diganti ke Bandung (dapur "Buahbatu", antar Bandung/Cimahi/Bandung Barat). Harga dan isi paket dipakai apa adanya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero berupa banner gambar bertulisan "Nasi Box start from Rp35.000" | Harga tidak bisa dibaca mesin/SEO, tidak ada tombol pesan di layar pertama |
| Carousel "Menu" mengulang 3 produk (tumpeng mini, kebuli, chicken steak) 3 kali dengan rating 0 bintang | Terlihat kosong dan tidak terawat |
| 12 kartu kategori (nasi box, besek, buffet, kantin, dll.) tanpa harga atau link | Pengunjung tidak tahu harga dan langkah berikutnya |
| Harga paket nasi box & catering harian hanya ada di artikel blog | Produk utama untuk kantor tersembunyi |
| Paket buffet berupa daftar panjang, syarat (min. 300 pax, pilih 2 menu, service 10%) hanya di paket pertama | Tidak bisa menyusun menu atau menghitung total sendiri |
| Semua pemesanan lewat telepon/WA; tidak ada cek tanggal, tasting, atau skema DP | Admin menjawab pertanyaan yang sama berulang; tanggal ramai tidak terlihat |
| Seksi video testimoni kosong, foto koki hasil AI, logo klien besar | Kepercayaan dibangun dari elemen yang tidak relevan |

## Arah redesign
- Design system sendiri dari **Sweetgreen** (landing makanan menu-led) + **Restaurant POS** (layar dapur). Lihat `design-system.md`.
- Beranda dipimpin menu dengan harga per box/pax yang jelas; alur prasmanan jadi pemilih menu dengan batas per kategori dan total otomatis; tanggal dipilih dari kalender kapasitas dapur dengan DP bertahap.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Header 3 kolom, hero foto nasi box, tab menu (Nasi box / Harian kantor / Prasmanan / Tumpeng) dengan kartu harga, seksi langganan kantor, band acara, menu harian 19–23 Okt + form tasting |
| `#paket` | Susun prasmanan: jenis acara, 4 paket (Ekonomis–Charlie), stepper tamu per 25 pax dengan minimum per paket, pemilih menu per kategori (batas berubah per paket), tambahan stall, bar bawah: menu terpilih, per pax, total + service 10% |
| `#jadwal` | Kalender November dengan sisa kapasitas pax per hari (tanggal penuh terkunci), waktu saji, lokasi, opsi tasting, tabel DP 30% / termin 40% / pelunasan 30% (H-3 mengikuti tanggal), bar bawah → sukses LC-2611-0148 + VA |
| `#dapur` | Tablet dapur pola POS: tab jenis pesanan, deret tiket per status (di jalan/siap/packing/masak), tab stasiun, kartu produksi agregat porsi + batch (+/−), panel pesanan terpilih (isi, driver, cek sebelum berangkat, status, tandai siap kirim) |

## Asumsi (tidak ada di situs asli)
- Min. 20 box untuk nasi box; min. 15 pax/hari untuk catering harian; min. 100 pax untuk paket Alpha–Charlie (situs hanya menyebut 300 pax untuk Ekonomis).
- Jumlah pilihan per paket selain Ekonomis (Alpha 3 utama, Bravo + salad, Charlie 4 utama + pasta + 2 pendamping).
- Harga snack box Rp18.000, stall +Rp20.000/+Rp15.000, dekorasi +Rp8.000, tasting box Rp150.000, kapasitas dapur 1.500 pax/hari, skema DP 30/40/30.
- Isi nasi box per harga dideskripsikan dari foto.

## Tech stack produksi (rencana)
Next.js + Supabase (menu, paket, kapasitas harian, pesanan, produksi), payment gateway dengan virtual account untuk DP/termin, WhatsApp API untuk konfirmasi, menu mingguan, dan status kirim.

## Catatan foto
Dipakai (12): nasi box daun, nasi box spesial, nasi box Bali, snack box, nasi besek, bakul liwetan, prasmanan, stall gubukan, jajanan tampah, chicken steak, nasi kebuli, tumpeng mini. Semua dicek zoom; tidak ada logo/watermark, tidak ada pengeditan piksel.
Dilewati: nasi box dengan stiker logo toko di tutup/botol (Nasi-Box, 08-28 11.45.02), hampers & kemasan (label logo), snack box kertas koran (label logo), kantin (siswa berseragam sekolah yang bisa dikenali), coffee break (kotak bertulisan tidak terbaca), 4 banner slider (teks promo), foto koki (ilustrasi AI), 4 foto "aneka menu" (foto stok), logo klien, foto artikel kecil.
Foto kategori asli kecil (298×404); dipakai hanya di kartu menu/kolom kecil.
