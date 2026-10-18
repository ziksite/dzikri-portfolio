# Redesign — Website Ekspedisi Kargo (anonim: "Bahtera Kargo")

Sumber: website perusahaan ekspedisi kargo antarpulau (WordPress/Divi, diambil 18 Okt 2026): beranda + halaman jasa ekspedisi, kirim mobil, alat berat, sewa truk, cek ongkir, tentang kami. Nama, logo, nama PT, nama staf marketing, kontak, dan alamat dianonimkan. Kota kantor asli diganti (gudang utama jadi Surabaya, cabang jadi Semarang), sehingga semua rute ditulis dari Surabaya. Tarif dan estimasi dari situs asli dipakai apa adanya (Rp3.900/kg ≥1.000 kg ke Pontianak, Rp5.000/kg min. 100 kg ke Balikpapan, mobil mulai Rp5 juta, alat berat RORO mulai Rp19 juta 3–5 hari, material proyek Rp1.900/kg, asuransi gratis sampai Rp50 juta); tarif lain (Makassar, Kendari, Ambon, Jayapura, Medan, FCL, udara, sewa truk) dibuat realistis.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero oranye penuh dengan judul kapital panjang; gambar hero gagal dimuat, sisanya lingkaran dekoratif kosong | Layar pertama tidak menampilkan apa pun yang bisa dipakai: tidak ada cek tarif atau lacak |
| "Cek Ongkir" hanya tombol ke halaman lain; tarif tersebar di paragraf artikel SEO | Calon pengirim tidak bisa menghitung biaya dari berat dan ukuran barang |
| Tidak ada pelacakan resi; update posisi barang lewat CS | Setiap pertanyaan status menjadi beban CS dan WhatsApp |
| Layanan ditampilkan sebagai 6 ilustrasi peta pulau, bukan moda (LCL/FCL/darat/udara/kendaraan/alat berat) | Pengunjung tidak tahu moda mana yang cocok, estimasi, dan minimal kirim |
| Jemput gratis disebut di 3 tempat tapi hanya bisa lewat WhatsApp; 3 nomor marketing berbeda per jenis barang | Permintaan jemput tidak punya jadwal, slot, atau konfirmasi |
| Tidak ada akun pelanggan bisnis, tagihan, atau dokumen kiriman | Klien korporat tetap minta invoice dan surat jalan manual |
| Banyak foto bercap logo, ber-watermark, atau ilustrasi AI | Kesan kurang kredibel untuk klien proyek bernilai besar |

## Arah redesign
- Design system sendiri diturunkan dari SiCepat (widget bertab di atas banner), Anteraja (lacak & tarif setara), FleetYu (baris rute, chip, bar utilisasi). Lihat `design-system.md`.
- Layar pertama langsung bisa dipakai: lacak resi, cek tarif dari berat + P × L × T, atau minta jemput.
- Moda dan rute disajikan sebagai daftar yang bisa dibandingkan (estimasi, jadwal kapal, tarif, minimal kirim).
- Alur pesan tidak memakai pola "form kiri ringkasan kanan": satu kolom bertahap dengan bar total sticky di bawah.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Judul + 2 janji layanan, banner pelabuhan dengan widget Lacak resi / Cek tarif / Minta jemput (tab berfungsi, tambah resi), daftar 6 moda, jadwal & tarif rute dari Surabaya dengan filter pulau, akun bisnis + contoh tagihan, gudang & kantor |
| `#tarif` | Rute Surabaya → Makassar, muatan (stepper koli, berat, P × L × T → berat aktual, volume, berat tertagih), 4 layanan dengan harga yang dihitung ulang, asuransi & packing kayu, slot tanggal & jam jemput, bar total sticky → sukses dengan nomor resi |
| `#lacak` | Pencarian resi, ringkasan kiriman + milestone 5 tahap (sedang di kapal), riwayat bertanggal, foto muat, detail kiriman (kapal, kontainer, segel), dokumen, kiriman lain di akun bisnis |
| `#gudang` | Papan rencana muat gudang: kiriman menunggu (filter tujuan), dua kontainer 20' dan satu truk CDD dengan bar volume & berat; tombol "Muat" memindahkan kiriman dan memperbarui kapasitas; jemputan menuju gudang dengan ETA |

## Tech stack produksi (rencana)
Next.js + Supabase (rute, tarif, pesanan, resi, event pelacakan, akun bisnis & tagihan), WhatsApp API untuk konfirmasi jemput dan notifikasi status, PDF untuk surat jalan, packing list, dan invoice.

## Catatan foto
| Foto | Keputusan |
|------|-----------|
| Kapal penumpang di pelabuhan → `pelabuhan-kontainer.webp` | Dipakai. Di-crop bagian atas (crane, kontainer, bangunan kapal) untuk membuang nama kapal di lambung dan anjungan |
| Alat berat & truk di dermaga (3) | Dilewati: cap kamera GPS (tanggal, koordinat, peta) tertempel di foto |
| Mobil dengan pemiliknya | Dilewati: watermark domain di tengah foto |
| Truk boks bertulisan "cargo udara" | Dilewati: logo perusahaan di seragam dan bak truk |
| Mobil di truk towing, SUV hitam | Dilewati: plat nomor terbaca, nama mitra towing di bak |
| Gerbong kereta di trailer dan truk (2) | Dilewati: cap tanggal kamera; proyeknya mudah dikenali dan mengarah ke wilayah asli |
| Car carrier bertuliskan nama brand, 3 banner layanan, 2 foto staf berseragam | Dilewati: logo/nama brand |
| Ilustrasi peta pulau, ilustrasi AI, foto model CS | Dilewati: ilustrasi/AI dan foto model, bukan foto operasional |
