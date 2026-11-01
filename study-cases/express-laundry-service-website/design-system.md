# Design System — Bilas Laundry (versi 2)

File: `public/prototypes/ds/express-laundry-service-website.css`

Versi 1 (biru korporat, Be Vietnam Pro, papan baris data, gantt) dibuang seluruhnya. Tidak ada kelas atau token lama yang dipakai ulang.

## Temuan dari referensi

Dilihat dari screenshot asli di `study-cases/_design-reference/landing/`, termasuk potongan zoom 1:1.

### Utama: `laundry-poplin.png` + `-full.png`
| Pola yang terlihat | Detail terukur | Dipakai di Bilas |
|--------------------|----------------|------------------|
| Hero dan blok warna sebagai kartu inset | Margin halaman sekitar 14 px, sudut membulat, warna rata penuh | Hero, cara kerja, satuan, area: kartu inset radius besar |
| Selang-seling blok inset dan blok penuh | Pink penuh, kuning inset, hijau tua inset, putih di antaranya | Paket dan syarat full-bleed, sisanya inset |
| Teks mono berlatar putih per baris | Kotak putih menempel per baris, padding kira-kira 0,1 em, sudut kecil, tanpa outline | `.lb`, dengan `box-decoration-break: clone` |
| Teks mono besar tanpa kotak di atas warna | "1 hamper ≈ 10 pounds", angka dan kata sama ukuran | Harga per kg dan hitungan total pakai mono besar |
| Tombol pill putih + lingkaran warna berpanah | Label mono, cincin abu tipis, lingkaran aksi di kanan | `.btn` dengan `.btn__dot` |
| Bar sticky putih setelah hero | Tombol pesan selalu tampak | `.nav` sticky di semua layar pelanggan |
| Blok penutup warna penuh, kalimat pendek kiri bawah, tombol kanan bawah | "Your laundry, finished." | Penutup beranda |
| FAQ baris dengan garis tipis dan tanda plus | Lebar sedang, sangat lapang | `.faq` |

Tidak diambil: palet pink-kuning, logo geometris, kartu orang dengan rating, tiga ikon dalam lingkaran (terlarang di brief), label kapital berjarak lebar (terlarang di brief; label Bilas ditulis huruf biasa).

### Utama: `laundry-rinse.png` + `-full.png`
| Pola yang terlihat | Detail terukur | Dipakai di Bilas |
|--------------------|----------------|------------------|
| Judul condensed sangat tebal, dua baris, dua warna | Kapital, baris kedua warna berbeda, sangat rapat | Anton, baris kedua di kotak putih |
| Widget jemput pill di hero | Dua segmen dipisah garis (Pickup, Where), tombol bulat di kanan | `.pick`: kawasan, jam jemput, tombol bulat |
| Strip bukti di tepi bawah hero | Sembilan logo media, satu baris selebar layar | `.strip`, berisi fakta layanan asli. Logo media dan rating tidak dipakai karena Bilas fiktif; memasangnya berarti mengarang bukti |
| Kartu harga item dengan harga rata kanan | Kartu kecil di dalam alur cara kerja | Diperbesar jadi kartu cuci satuan |
| Blok promosi kuning dengan judul besar sebelum footer | Satu kalimat, satu tombol | Digabung ke penutup beranda |

Tidak diambil: video dan foto tas sebagai hero, popup diskon, galeri foto gelap.

### Pendukung: `laundry-laundryheap.png`
Warna tunggal rata memenuhi layar pertama, dengan janji waktu dinyatakan jelas ("Delivered in 24h"). Dipakai sebagai pembenaran hero tanpa foto. Birunya tidak dipakai. Blob di balik QR juga tidak dipakai (terlarang di brief).

### Pendukung: `laundry-washmen.png`
Kartu layanan besar radius besar dengan nama, cara hitung harga, dan tautan; blok warna asam di bawah hero. Dipakai sebagai bentuk kartu kecepatan dan keberanian warna asam di palet. Foto model dan bentuk melengkung tidak dipakai.

## Arah
Kemasan deterjen: warna rata, huruf tebal, harga terbaca dari jauh. Satu kalimat di hero, "KOTOR KAMI JEMPUT. BERSIH KAMI ANTAR.", menjelaskan layanan tanpa menjanjikan jam. Janji waktu dinyatakan sebagai target dan syaratnya punya section sendiri.

## Token warna
Semua rata, tanpa gradien. Teks di atas air, tomat, dan lemon selalu `--ink`, sebab putih tidak cukup kontras di ketiganya.

| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--air` | #00D6C6 | Warna utama brand ("bilas" = air): hero, satuan, lacak normal, latar kasir |
| `--air-2` | #00B8AA | Hover dan batas di atas air |
| `--tomat` | #FF4A21 | Aksi: lingkaran tombol, paket, area, lacak terlambat |
| `--tomat-2` | #E63A12 | Hover aksi |
| `--lemon` | #EEFF41 | Sorotan: tahap aktif, pilihan terpilih, syarat, penutup |
| `--anggur` | #2B0B57 | Blok gelap: cara kerja, footer, panel kasir |
| `--anggur-2` | #3E1B74 | Permukaan di atas anggur |
| `--ink` | #150A26 | Teks utama |
| `--muted` | #5B5468 | Teks sekunder di atas putih |
| `--mist` | #EFEDF4 | Field dan tombol netral di atas putih (area kecil) |
| `--line` | #DAD6E2 | Garis di atas putih |
| `--white` | #FFFFFF | Kartu, label, teks di atas anggur |

Kombinasi air, tomat, lemon, anggur tidak dipakai situs portfolio lain.

## Tipografi
| Peran | Font | Aturan |
|-------|------|--------|
| Display | Anton 400 | Selalu kapital, tidak dimiringkan, line-height 1 sampai 1,08 |
| Label dan angka | Courier Prime 400, 700 | Harga, jam, nomor nota, label. Huruf biasa, tanpa letter-spacing lebar |
| Teks | Red Hat Text 400 sampai 700 | Paragraf, field, jawaban FAQ |

Skala: `--d1` clamp(62px, 11.4vw, 172px); `--d2` clamp(52px, 7.4vw, 112px); `--d3` clamp(36px, 3.9vw, 58px); `--d4` 30px. Mono besar 34 sampai 44 px, label 15 sampai 17 px, teks 17 px.

## Bentuk
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--r-xl` | 40px | Blok inset, hero, tablet |
| `--r-lg` | 28px | Kartu besar |
| `--r-md` | 18px | Slot, field, tombol keypad |
| `--r-sm` | 7px | Label putih `.lb` |
| pill | 999px | Tombol, nav, widget, dock |

Tidak ada bayangan kecuali bar sticky dan dock, yang melayang di atas warna. Pemisah antarbagian adalah perubahan warna, bukan garis.

## Komponen
| Komponen | Kelas | Catatan |
|----------|-------|---------|
| Bar navigasi | `.nav` | Pill putih sticky; di HP menu dibuka lewat tombol |
| Label putih | `.lb`, `.lb--lg` | Mono, per baris, hanya di atas warna |
| Tombol | `.btn`, `.btn--ink`, `.btn--plain` | Pill mono + lingkaran panah |
| Widget jemput | `.pick` | Dua segmen select + tombol bulat |
| Strip fakta | `.strip` | Fakta layanan asli, bukan logo atau rating |
| Kartu kecepatan | `.speed` | Nama Anton, harga mono, target, total; versi kecil `.speed--sm` |
| Syarat | `.terms` | Pasangan pertanyaan dan jawaban besar |
| Kartu satuan | `.item` | Nama, harga, satuan |
| Kawasan | `.area-pills`, `.area-card` | Pill besar + kartu detail |
| Langkah pesan | `.flow`, `.choice`, `.slot`, `.dock` | Satu pertanyaan per layar; warna latar berganti per langkah |
| Tahap lacak | `.stages`, `.stage` | Enam kartu besar berurutan; tahap aktif melebar dan lemon |
| Tablet kasir | `.tablet`, `.pos`, `.tile`, `.key` | Satu-satunya tempat pola POS |

## Aturan
- Satu section satu warna penuh. Tidak ada dua section berurutan dengan warna sama.
- Kata "target" selalu menyertai 3 Jam. Tidak boleh ada "pasti", "dijamin", atau "selesai 3 jam" tanpa syarat.
- Label mono ditulis huruf biasa dan dipakai seperlunya.
- Foto hanya tiga aset yang ada, dan lebar tampil tidak melebihi lebar file: `mesin-pengering` (1497 px) sebagai pita, `tas-jemputan` (1000 px) dan `paket-siap-antar` (732 px) sebagai kartu.
- Tidak ada tabel di beranda, pesan, dan lacak.
- Tanpa gradien, blob, glassmorphism, emoji, ilustrasi, foto stok, atau foto orang.
