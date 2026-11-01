# Design System — Saksama & Rekan

File: `public/prototypes/ds/litigation-law-office-website.css`

Versi ini menggantikan seluruh sistem portal sebelumnya (sidebar, terong, kartu di kanvas abu).

## Temuan dari referensi
Dilihat dari `study-cases/_design-reference/landing/` pada ukuran penuh dan potongan zoom.

| Referensi | Pola yang terlihat | Dipakai untuk | Tidak diambil |
|-----------|--------------------|---------------|---------------|
| `law-lawhive.png`, `-full.png` | Header bar gelap mengapung, inset dari tepi, menu kiri dan wordmark tepat di tengah. Judul raksasa rata tengah tiga baris mengisi separuh layar. Satu kalimat "What can we help with?" lalu satu input lebar dengan tombol hangat di dalamnya. Tiga poin centang di bawah hero. Kartu langkah berisi potongan antarmuka mini | Header pill, hero, input masalah, poin centang, alur satu pertanyaan | Gradien oranye (melanggar §5), foto sepia, latar krem, deret kartu 3 kolom |
| `law-atticus.png`, `-full.png` | Panel hitam dengan serif tebal rapat (tracking negatif, baris pendek, sangat manusiawi). Kalimat empatik, bukan klaim. Pernyataan serif besar di kiri, fakta pendek di kolom kanan. "How it works": baris dibelah dua, kiri nomor serif + judul + teks + dua fakta kecil bergaris, kanan blok warna solid penuh berisi kartu putih mengapung, warna blok berganti tiap baris | Pernyataan hitam, baris cara kerja, nada salinan, avatar inisial pada kartu pesan | Foto orang, bintang, statistik "Trusted by", nominal uang, konfeti |
| `law-cooley.png`, `-full.png` | Merah jenuh + hitam kemerahan sebagai blok penuh. Daftar berirama: nama layanan serif besar, garis tipis, panah panjang di kanan. Kolom kiri sempit hanya judul, daftar di kanan. Pita ajakan warna penuh sebelum footer gelap | Bidang praktik, pita ajakan, footer, pergantian warna antar section | Label kapital berjarak, foto kolase, teks merah di atas hitam (kontras rendah) |

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #12100E | Hitam hangat: teks, header, footer, panel |
| `--bara` | #FF5A1F | Warna utama, blok hero dan ajakan. Teks di atasnya selalu hitam (kontras 7:1) |
| `--kunyit` | #FFB71B | Blok kedua, bidang praktik, tombol di panel gelap |
| `--daun` | #0B5A47 | Blok ketiga, penyeimbang dingin. Teks di atasnya putih |
| `--paper` | #FFFFFF | Latar putih murni |
| `--mute` | #5E5A55 | Teks sekunder di putih |
| `--hair` | #E2E0DC | Garis tipis, kanvas `#F3F2EF` hanya di papan tim |
| Font | Gloock 400 (display), Rethink Sans 400–700 (teks) | Gloock punya satu bobot dan sudah tebal; pengganti gratis terdekat serif Atticus. `font-synthesis: none` |
| Radius | 8 (field, tombol, kartu, header) · 0 (blok section) | Blok warna selalu tepi lurus |
| Bayangan | `0 18px 40px rgba(0,0,0,.22)` hanya kartu mengapung di blok warna dan drawer | |

Skala teks: hero `min(10.4vw, 17vh)` tinggi baris 1 · display 88 · h1 64 · h2 40 · h3 26 · lead 21 · body 17 · small 14. Tracking judul -0,015em.

Gradien tidak dipakai sama sekali. Warna Lawhive diambil sebagai warna rata yang dijenuhkan.

## Komponen
`head` (pill mengapung) · `btn` (`-ink`, `-paper`, `-kunyit`, `-line`) · `ask` + `ask__list` (input masalah + saran) · `checks` · `band` + varian warna · `say` (pernyataan + fakta) · `how` (baris belah dua) + `mini` (kartu mengapung) · `prac` (baris bidang) · `law` (blok inisial) · `city` · `cta` · `foot` · `q` (layar satu pertanyaan, warna berganti) + `opt` · `res` (hasil) · `stage` · `doc` · `book` (kolom jadwal) + `seg`, `days`, `slots`, `check`, `field`, `stickbar` · `ops` (papan tim), `chips`, `rail`, `board`, `col`, `mcard`, `drawer`

## Aturan
- Situs publik memakai satu header pill. Tidak ada sidebar di mana pun. Papan tim memakai bar atasnya sendiri dengan token yang sama.
- Tiap section berupa blok warna penuh, berganti: bara, hitam, putih + blok warna, kunyit, putih, daun, bara, hitam.
- Tanpa foto dan tanpa potret. Karakter datang dari Gloock berukuran besar dan blok warna. Advokat memakai blok inisial.
- Tidak ada timbangan, palu, pilar, atau simbol hukum lain. Brand hanya wordmark teks.
- Label kecil memakai huruf kalimat biasa, bukan kapital berjarak. Tidak ada serif miring.
- Salinan berbicara kepada orang yang sedang cemas: kalimat pendek, tanpa istilah sebelum dijelaskan. Tidak ada peringkat, tingkat kemenangan, jumlah perkara, angka biaya, atau janji hasil.
- Keterangan "informasi umum, bukan nasihat hukum" hadir di hero, hasil panduan, persetujuan jadwal, dan footer.
- Merah bara di papan tim hanya untuk tenggat dekat, supaya tetap berarti.
