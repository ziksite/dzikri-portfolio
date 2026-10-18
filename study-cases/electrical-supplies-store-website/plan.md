# Redesign — Website Toko Material Listrik (anonim: "Simpul Listrik")

Sumber: website toko & distributor material listrik dengan 4 cabang (Depok, Bogor, Medan, Surabaya) plus jasa engineering (WordPress/Elementor, diambil 18 Okt 2026). Nama, logo, nama PT, nomor WhatsApp, dan alamat dianonimkan. Nama merek produk (Schneider, Siemens, Eterna, dll.) dipakai apa adanya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Beranda berupa company profile: banner slider penuh teks, logo partner, paragraf "solusi terbaik" | Pembeli yang datang untuk mencari barang tidak bisa mencari atau membeli apa pun |
| Halaman "Product" hanya galeri foto per kategori tanpa nama, kode, spesifikasi, harga, atau stok | Kontraktor tetap harus chat untuk setiap item; MCB tidak bisa dibandingkan per ampere/kutub |
| Semua CTA ke satu nomor WhatsApp | Permintaan ritel, grosir, dan proyek bercampur di satu antrean tanpa nomor atau SLA |
| Tidak ada harga bertingkat atau jalur penawaran proyek | Pembeli grosir dan kontraktor (segmen paling bernilai) tidak punya alasan memesan lewat web |
| Cabang ditampilkan sebagai foto ruko dengan papan nama, tanpa jam buka atau stok | Pelanggan tidak tahu cabang mana yang punya barangnya |
| Foto produk ukuran tidak seragam, sebagian dengan sisa latar | Katalog terlihat kurang rapi |

## Arah redesign
- Katalog dengan pencarian di depan (pola Vistaprint): nav kategori, ubin kategori, produk yang sering dipesan kontraktor.
- Dua jalur beli dari daftar yang sama: beli langsung (eceran) atau minta penawaran proyek (RFQ), dengan harga bertingkat yang terlihat sejak kartu produk.
- Layar sales untuk RFQ masuk dengan SLA 2 jam kerja, stok per cabang, diskon per baris, dan batas margin untuk persetujuan.
- Design system sendiri dari Vistaprint + Shipora (lihat `design-system.md`).

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Utility strip, header cari, nav kategori 2 baris, pita ongkir, hero + kotak "tempel daftar material", ubin 10 kategori, 9 produk sering dipesan (harga eceran, harga tier, stok), info akun proyek + contoh tabel harga bertingkat, 4 cabang dengan jam buka |
| `#katalog` | MCB & Proteksi: filter spesifikasi (kutub & merek berfungsi), daftar baris dengan spec chip, stok, harga tier; panel detail sticky dengan spesifikasi, tabel harga bertingkat yang menyorot tier sesuai jumlah, stok 4 cabang, stepper, ke keranjang / ke RFQ |
| `#rfq` | Toggle beli langsung / minta penawaran, data proyek sebaris, lembar 9 baris (stepper mengubah tier & subtotal, hapus baris, harga target), catatan & lampiran, bar total menempel (estimasi, hemat dari eceran) → sukses RFQ-2610-0148 |
| `#sales` | Nav atas staf, tab status dengan jumlah, daftar RFQ (status, SLA, total) + detail: PIC/termin/tanggal, tabel dengan stok Bogor & saran transfer, diskon per baris → total & margin kotor dihitung ulang, tombol berubah jadi "Minta persetujuan" bila margin < 10% |

## Asumsi data (perlu dikonfirmasi klien)
- Situs asli tidak mencantumkan harga. Harga di prototype adalah perkiraan harga pasar untuk ilustrasi; ambang tier (10/50 unit) dan potongannya juga asumsi.
- Harga pokok di layar sales diasumsikan 82% dari harga eceran; batas margin 10% adalah contoh kebijakan.
- SLA penawaran 2 jam kerja dan jam buka hari Minggu adalah usulan.

## Tech stack produksi (rencana)
Next.js (halaman katalog per SKU untuk SEO) + Supabase/Postgres (produk, spesifikasi, tier harga, stok per cabang, RFQ), sinkron stok dari POS/ERP cabang tiap 15 menit, PDF penawaran + WhatsApp Business API, Midtrans untuk checkout ritel.

## Catatan foto
- Dipakai (25): foto produk berlatar putih dari halaman Product — kabel NYM/NYA/kontrol/Profibus/Profinet/fiber, MCB 1P–4P, GV2ME16, kontaktor 3RT2015, lampu Philips, floodlight Inlite, downlight, LED strip, stop kontak 4 lubang, steker, box panel indoor/outdoor, PLC S7-1200, PSU Weidmüller, 2 tang ampere Kyoritsu, tang kombinasi. Semua dicek dengan kontras dinaikkan: tidak ada watermark toko. Foto dikonversi ke webp tanpa diedit.
- Dilewati: logo toko, semua banner (berisi teks/logo toko), foto ruko cabang (papan nama), foto interior toko dan teknisi berseragam berlogo, minibanner kategori, logo merek; saklar, stop kontak dinding, dan tespen (pola samar di latar).
