# Lapak — Design System Prototype Study Case

Versi 1.1 · Oktober 2026 (warna direvisi: mode solid / duo / mono, tanpa pastel)
Showcase hidup: `public/prototypes/_ds/index.html` (buka langsung di browser, ganti tema di bar atas)
File: `public/prototypes/_ds/lapak.css` · `public/prototypes/_ds/lapak.js`

Disusun dari 85 referensi di `study-cases/_design-reference/` (landing 17 situs, flow 6 situs, dashboard 39 shot).

---

## 1. Prinsip

| # | Prinsip | Dari referensi |
|---|---------|----------------|
| 1 | **Tugas dulu, slogan belakangan.** Hero memuat hal yang bisa langsung dikerjakan: pilih jam, cari obat, lacak resi. | Fresha, Airbnb, Bobobox, SiCepat, Anteraja |
| 2 | **Foto yang bekerja.** Gambar menjelaskan produk atau tempat, bukan dekorasi. Layout mengikuti foto. | Buttonscarves, Cottonink, Sweetgreen, Fore |
| 3 | **Harga dan kapasitas terlihat sebelum memilih.** Pilihan berupa kartu atau slot, bukan dropdown tersembunyi. | MOO, Cal.com, Printful |
| 4 | **Dashboard menjawab "apa yang harus dikerjakan hari ini".** Daftar tindakan dan status lebih penting daripada grafik. | Data table SaaS, restaurant POS, reservation calendar |
| 5 | **Satu fondasi, banyak karakter.** Struktur sama, brand cukup mengganti warna, font display, dan radius. | — |

---

## 2. Token

### Warna — tiga mode

Revisi v1.1: palet "muted earthy" (cokelat-krem, teal-mint, bata-pink) dan latar pastel di area besar dihapus. Keduanya pola khas AI. Referensi nyata memakai kanvas putih, teks hitam, dan warna brand yang **jenuh dan dipakai solid**.

| Mode | Cara kerja | Referensi | Dipakai untuk |
|------|-----------|-----------|---------------|
| **Solid** | Putih + hitam + satu warna jenuh untuk tombol, link, dan blok penuh (CTA, section brand) | Airbnb, Majoo, Fore, Halodoc | 01 Kopi, 02 Catering, 04 Klinik gigi, 08 Bimbel, 11 Petshop, 12 Umroh, 13 Camping, 15 Gym, 16 Tani, 17 Servis AC, 18 Apotek, 20 Koperasi |
| **Duo** | Satu warna blok penuh (hero, section) + satu warna aksi untuk tombol | Anteraja, SiCepat, Indomaret | 03 Bengkel, 07 Toko bangunan, 10 Percetakan, 14 Frozen food, 19 Ekspedisi |
| **Mono** | Hitam-putih; warna datang dari foto. Blok besar abu-abu terang atau hitam | Buttonscarves, Cottonink, Fresha | 05 Barbershop, 06 Villa, 09 Fashion |

**Larangan:** latar tint/pastel untuk area besar (hero, section, kartu). `--brand-soft` dihitung otomatis 9% dan hanya untuk elemen kecil (pill, nav aktif, pilihan terpilih). Netral murni, tanpa tint hangat/dingin.

**Variabel per brand:**

| Variabel | Peran | Default |
|----------|-------|---------|
| `--brand` | Warna aksi: tombol utama, state aktif, slot terpilih. **Jenuh** | — wajib |
| `--brand-ink` | Teks di atas `--brand` | `#fff` |
| `--brand-text` | Brand untuk teks di atas putih (kontras ≥ 4.5:1) | `--brand` |
| `--block` / `--block-ink` | Blok besar: section brand, CTA | `--brand` |
| `--hero-bg` / `--hero-ink` | Latar hero. Solid & mono: putih. Duo: `--block` | putih |
| `--accent` | Promo, harga coret. Maks 3 titik per layar | merah |
| `--font-display` | Font judul | — wajib |
| `--r-base` | 0–14px, karakter tajam atau lembut | 10px |

`--brand-hover` dan `--brand-soft` dihitung otomatis. Tombol di atas blok warna pakai `.btn--on-block` (warnanya membalik otomatis).

Contoh tema per mode ada di showcase (bar atas): Kopi Senja & Klinik (solid), TB Sumber Rejeki (duo), Lumira (mono).

**Tetap (jangan di-override):** netral `--n-0` s/d `--n-900` dan status:

| Status | Teks | Latar | Contoh label |
|--------|------|-------|--------------|
| ok | `--ok` | `--ok-bg` | Lunas, Selesai, Tersedia |
| warn | `--warn` | `--warn-bg` | Menunggu bayar, Menipis |
| bad | `--bad` | `--bad-bg` | Terlambat, Habis, No-show |
| info | `--info` | `--info-bg` | Diproses, Dalam perjalanan |
| idle | `--idle` | `--idle-bg` | Draf, Perawatan |

### Tipografi

- Body & UI: **Plus Jakarta Sans** (dirancang di Indonesia, terbaca baik di 13–14px).
- Display: dipilih per brand dari daftar di bawah.

| Kelas | Ukuran | Pakai untuk |
|-------|--------|-------------|
| `.display` | 40–76px | Judul hero |
| `.h1` | 32–52px | Judul halaman landing |
| `.h2` | 26–36px | Judul section |
| `.h3` | 20px | Judul kartu/blok |
| `.h4` | 16px | Sub-judul |
| `.lead` | 17–19px | Paragraf pembuka, maks 56 karakter per baris |
| body | 16px (landing) / 14px (aplikasi) | Teks |
| `.caption` | 13px | Keterangan, timestamp |

**Pasangan font display yang disetujui:**

| Karakter | Font | Cocok untuk |
|----------|------|-------------|
| Hangat, artisan | Fraunces | Kopi, catering, bakery |
| Klinis, rapi | Instrument Sans | Klinik, apotek |
| Tegas, industrial | Archivo (condensed, kapital) | Toko bangunan, bengkel, ekspedisi |
| Editorial, mewah | Instrument Serif / Cormorant Garamond | Fashion, villa, barbershop |
| Ramah, membulat | Bricolage Grotesque | Bimbel, petshop, laundry |
| Kokoh, formal | Plus Jakarta Sans 800 | Koperasi, travel umroh |

### Spasi, radius, bayangan

- Spasi: kelipatan 4px (`--s-1` = 4 … `--s-32` = 128). Section landing 80px, mobile 48px.
- Radius: `--r-sm` / `--r-md` / `--r-lg` dihitung dari `--r-base`. Jangan melebihi 20px kecuali pill.
- Bayangan hanya untuk elemen yang mengambang (taskbar, dropdown, WA float). **Panel aplikasi pakai garis 1px, bukan bayangan.**

### Layout

- Container 1200px (`.container`), lebar 1360px (`.container-wide`), gutter 24px / 16px di mobile.
- Aplikasi: sidebar 236px + konten; di bawah 900px sidebar menjadi bar horizontal.

---

## 3. Komponen

### Landing

| Komponen | Kelas | Catatan |
|----------|-------|---------|
| Bar pengumuman | `.topbar` | Info nyata: jam buka, batas pre-order, ongkir |
| Navigasi | `.nav`, `.nav--overlay` | Overlay untuk hero foto penuh |
| Hero foto penuh | `.hero-photo` | Teks kiri-bawah, gradasi gelap hanya di bawah |
| Hero split | `.hero-split` + `.split` | Teks kiri, foto kanan |
| Hero task-first | `.hero-task` + `.taskbar` / `.taskcard` | Widget sebagai pusat |
| Kepala section | `.section-head` | Judul kiri, link "Semua →" kanan |
| Strip kategori | `.cat-strip` + `.cat` | Thumbnail foto persegi + label |
| Kartu listing | `.listing` | Foto, judul, meta, harga, rating |
| Daftar harga | `.pricelist` | Menu, tarif layanan |
| Langkah | `.howto` | Bernomor 01/02/03, garis atas |
| Paket | `.plans` + `.plan--featured` | Maks 3 kolom |
| Testimoni | `.quote` | Nama + konteks nyata, tanpa foto stok |
| FAQ | `.faq` (details/summary) | |
| CTA | `.cta-band` | Satu per halaman |
| Footer | `.footer` | Alamat, jam buka, kontak |
| WhatsApp | `.wa-float` | Link `#`, tanpa nomor asli |

### Form & flow

`.steps` (progres) · `.choices` + `.choice` (kartu pilihan) · `.segmented` · `.tabs` · `.chips` · `.stepper` · `.slots` + `.slot` (`.is-full`, `.is-selected`) · `.cal` (kalender bulan) · `.summary` + `.lineitem` (ringkasan sticky) · `.upload` + `.file` · `.timeline` (lacak) · `.alert` · `.success` + `.ticket` · `.field` / `.input` / `.select` / `.textarea` / `.form-grid`

Pola wajib untuk alur transaksi: **langkah di kiri, ringkasan sticky di kanan** (`.split--form`).

### Aplikasi

`.app` · `.sidebar` (`.sidebar--dark` untuk POS/ERP) · `.side-group` / `.side-label` / `.side-link` · `.appbar` · `.content` · `.page-head` · `.kpis` + `.kpi` (maks 4) · `.panel` · `.toolbar` · `.table` (`.num` kanan, `.sub` baris kedua, `td.wrap` untuk teks panjang) · `.pill` · `.list` · `.bars` · `.meter` · `.board` + `.job` (kanban) · `.rescal` + `.evt` (kalender sumber daya) · `.tiles` + `.tile` (POS) · `.with-aside` · `.dl` · `.empty` · `.avatar` (`data-tone` 1–5, inisial, tanpa foto)

---

## 4. Perilaku (`lapak.js`)

| Fitur | Cara pakai |
|-------|-----------|
| Router layar | `<section data-screen="booking">` + link `href="#booking"`; layar pertama default. Link nav pakai `data-nav="booking"` untuk state aktif |
| Pilihan tunggal | `<div data-select>` → anak yang diklik dapat `.is-active`. `data-select="is-selected"` untuk kelas lain. `data-multi` untuk banyak pilihan. Event `lapak:select` |
| Panel tab | `data-tabs="x"` pada grup + `data-panel="x:nilai"` pada panel |
| Stepper | `<div class="stepper" data-stepper data-min data-max>`; tombol tambah diberi `data-inc`. Event `lapak:change` |
| Form demo | `<form data-demo-form>` + elemen `[data-success] hidden` di dalam parent yang sama |
| Gambar | `<div class="img" data-img="assets/<slug>/hero.jpg" style="--ar:16/10">`. Placeholder bergaris dengan nama file, otomatis jadi foto begitu file ada |
| Rupiah | `rupiah(24000)` → `Rp24.000` |
| Ikon | Lucide 0.469.0 via unpkg, `<i data-lucide="search"></i>` |

---

## 5. Aturan anti "AI slop"

**Lakukan**
- Konten spesifik bisnis di hero: alamat, jam buka, harga, slot. Bukan slogan.
- Foto (dari prompt) sebagai elemen utama; layout mengikuti fotonya.
- Rata kiri. Judul section kiri, link "Semua →" di kanan.
- Satu warna brand + netral. Accent hanya untuk promo/harga.
- Angka realistis untuk skala UMKM (63 transaksi/hari, 850 anggota, 6 teknisi).
- Panel dashboard pakai garis 1px; status pakai pill dengan teks jelas.
- Satu set ikon (Lucide, garis 1.75, 18px).

**Hindari**
- Gradien ungu-biru, blob, glassmorphism, glow.
- Palet "muted earthy" (cokelat-krem, sage, terracotta, teal-mint) dan latar pastel untuk area besar.
- Grid 3 fitur "ikon dalam lingkaran + judul + satu kalimat".
- Emoji sebagai ikon, ilustrasi 3D, foto stok generik.
- Hero rata tengah dengan dua tombol dan statistik palsu ("10K+ pelanggan puas").
- Copy umum: "Solusi terbaik", "Tingkatkan bisnis Anda", "Revolusioner", "Seamless".
- Kartu KPI warna-warni dengan grafik dekoratif yang tidak memicu keputusan.
- Semua sudut sangat bulat (24px+) dan bayangan tebal di setiap kartu.
- Logo berupa kotak inisial (`.mark`). Brand cukup ditulis sebagai nama (wordmark) dengan font display.

---

## 6. Aset gambar via prompt AI

Setiap prototype punya `study-cases/<slug>/assets.md` berisi tabel:

| File | Ukuran | Posisi | Prompt |
|------|--------|--------|--------|

Simpan hasil generate di `public/prototypes/assets/<slug>/<file>`; placeholder otomatis berganti.

**Aturan prompt**
1. Satu **style line** per brand, ditempel di akhir setiap prompt supaya satu set gambar konsisten (cahaya, palet, lensa, mood).
2. Selalu: `no text, no logos, no watermark`. Untuk orang: `Indonesian`, pakaian dan latar yang masuk akal secara lokal.
3. Gaya foto editorial atau dokumenter, bukan render 3D atau ilustrasi.
4. Rasio sesuai `--ar` di HTML: hero 16:10 atau 3:2, kartu 4:5 atau 1:1, thumbnail kategori 1:1.
5. Produk (makanan, botol, baju): latar polos atau permukaan nyata, cahaya samping lembut.

Contoh style line Kopi Senja:
> `warm natural morning light, muted earthy palette of cream, espresso brown and terracotta, 35mm lens, shallow depth of field, editorial food photography, Bandung cafe interior, no text, no logos, no watermark`

---

## 7. Checklist per prototype

- [ ] Mode warna sesuai tabel (solid / duo / mono), warna brand jenuh, tanpa latar pastel
- [ ] Tema brand: variabel brand + font display dari daftar pasangan
- [ ] Hero lengkap terlihat di 1440×900, rata kiri, ada informasi nyata
- [ ] 3–4 layar via `data-screen`; satu alur transaksi dengan pola kiri-kanan
- [ ] Dashboard/admin (bila ada) memakai `.app`, bukan layout landing
- [ ] Semua gambar lewat `.img[data-img]` + `assets.md` berisi prompt
- [ ] Copy Bahasa Indonesia, angka dan nama realistis, tanpa frasa di daftar "Hindari"
- [ ] Tidak ada error JS selain 404 gambar yang belum di-generate
- [ ] Cek lebar 390px: tanpa scroll horizontal
