# Redesign — Website Studio Desain Interior (anonim: "Sekat Interior")

Sumber: website studio desain interior dan produksi furnitur dengan dua showroom di Indonesia, diambil 1 Nov 2026 (beranda, 12 proyek, tentang, sistem kerja). Nama studio, nama sistem kerjanya, kota, alamat, kontak, serta nama klien dan proyek dianonimkan.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Visual sudah rapi dan premium, foto kuat | Restyle saja tidak menambah nilai, jadi redesign difokuskan ke fungsi baru |
| Filter portofolio hanya per tipe bangunan, proyek terbagi 2 halaman | Pengunjung yang ingin melihat dapur atau kamar harus membuka proyek satu per satu |
| Tidak ada indikasi biaya sama sekali | Calon klien tidak tahu apakah anggarannya masuk sebelum menghubungi |
| Semua CTA menuju WhatsApp dengan template teks | Studio menerima pesan tanpa luas, ruang, atau kelas material, lalu mengulang pertanyaan yang sama |
| Luas hanya tercantum di sebagian proyek | Sulit membandingkan proyek dengan properti sendiri |
| Klaim "empat proyek setahun" dan "1K+ hunian" berada di situs yang sama | Dua angka yang bertentangan mengurangi kepercayaan; keduanya tidak dipakai |
| Bahasa Inggris dan Indonesia bercampur, nama sistem kerja bermerek | Proses terasa seperti slogan, bukan penjelasan yang bisa dipakai klien |
| Tidak ada visibilitas progres untuk klien yang sudah berjalan | Proyek berdurasi 1–14 bulan, pembaruan bergantung pada pesan manual |

## Arah redesign
- Beranda adalah portofolio per ruangan, bukan hero + kartu. Daftar ruang di kiri, foto besar di tengah, thumbnail di kanan, dan **title block** seperti gambar kerja di bawah foto.
- Pembeda dari `housing-cluster-developer-website` (hero foto + form + siteplan) dan `boutique-heritage-hotel-website` (hero foto + kalender tarif + wordmark tengah).
- Alur: pilih ruang → lihat proyek dengan hotspot material → kalkulator estimasi → permintaan konsultasi yang membawa rincian ruang.
- Layar operasional: matriks proyek × tahap (bentuk baru di portfolio ini) yang tersambung dengan tampilan HP mandor.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Viewer per ruangan (8 tipe ruang, 28 foto), daftar 11 proyek dengan filter tipe, 6 tahap kerja, render vs terpasang, studio |
| `#proyek` | Panel navy data proyek, foto dengan hotspot tertaut ke daftar elemen, data proyek, ruang lain. Terisi dari data untuk ke-11 proyek |
| `#estimasi` | Panel navy dengan total, pembagian biaya, dan waktu yang berubah langsung; baris per ruang (luas, kelas material, hapus, tambah); dasar hitung; form konsultasi → SKT-K-0412 |
| `#produksi` | Matriks 7 proyek × 8 tahap (desain, produksi, instalasi), filter tertahan/di lokasi; HP penanggung jawab: checklist yang memperbarui sel papan, foto laporan, kendala, kirim laporan |

## Asal data
| Data | Status |
|------|--------|
| Tipe proyek, tahun, durasi, lingkup kerja, daftar material tiap proyek | **Situs asli** |
| Luas 49, 175, 60, 60 m² (Apartemen 49, Apartemen Japandi, Kantor Direksi, Toko Perhiasan) | **Situs asli** |
| Deskripsi singkat proyek | Situs asli, diterjemahkan dan diringkas |
| Isi 6 tahap kerja, layanan desain + produksi, kabinet custom, jam buka studio | Situs asli, nama sistem diganti generik |
| Pasangan render + terpasang pada foyer | Situs asli |
| Luas proyek lainnya (320, 280, 260, 240, 86, 68, 58 m²) | **Asumsi**, situs tidak mencantumkannya |
| Nama proyek, kota (Semarang, Surabaya), kawasan, kontak, nama klien dan staf | **Fiktif** |
| Elemen pada hotspot | **Asumsi** dari pengamatan foto, dicocokkan dengan daftar material proyek |
| Tarif per m², pengali kelas, biaya desain Rp250.000/m², rentang ±15%, pembagian 78/22 produksi-instalasi | **Asumsi**. Situs tidak memuat harga sama sekali. Wajib diganti data studio sebelum produksi |
| Rumus waktu (desain 4 + luas/25, produksi 6 + luas/12, instalasi 2 + luas/25 minggu) | **Asumsi**, dicek kasar terhadap durasi 49 m² (7 bulan dengan sipil) dan 175 m² (12 bulan) |
| Seluruh isi papan produksi dan checklist | **Fiktif**, tidak ada padanan di situs asli |

## Rumus estimasi
Subtotal ruang = luas × tarif ruang × pengali kelas (Standar 1, Menengah 1,4, Premium 1,9). Total = jumlah subtotal + desain (Rp250.000/m²), ditampilkan ±15%. Tarif dasar (juta/m²): ruang keluarga 3,2 · dapur 6,5 · kamar 3,8 · walk-in closet 7 · kamar mandi 5,5 · ruang kerja 3,6 · foyer 4 · kantor 3 · toko 5.

## Tech stack produksi (rencana)
Next.js + Supabase (proyek, foto per ruang, tarif, permintaan, tahap), panel admin tarif, WhatsApp API untuk meneruskan permintaan dan laporan harian ke klien.

## Catatan foto
Diambil 130 foto. Dipakai 31 file: 28 di viewer, 2 banding render/terpasang, 1 workshop.
- Banyak foto proyek apartemen tampak seperti render. Yang dipakai bersih dari watermark pada pemeriksaan zoom.
- Dilewati, watermark atau teks nama studio: satu foto render dengan nama studio di pojok, foto tampak depan showroom.
- Dilewati, papan nama atau logo klien: toko perhiasan (kecuali satu sudut interior tanpa nama), seluruh restoran Jepang (logo, poster anime), kantor (logo di dinding, deretan kemasan produk di rak, foto kepala negara).
- Dilewati, lainnya: foto eksterior rumah (mudah dikenali), TV yang menampilkan logo layanan streaming, kotak kemasan merek di rak apartemen, gambar buatan AI di halaman tentang.
- `workshop-panel`: di-crop 20% kanan untuk membuang kaus staf bertulisan logo. Sumbernya resolusi rendah, hanya dipakai sebagai thumbnail.
- Tidak ada foto yang diedit selain crop dan resize. `patch.mjs` tidak dipakai.
