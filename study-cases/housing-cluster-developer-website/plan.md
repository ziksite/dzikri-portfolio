# Redesign — Website Developer Cluster Perumahan (anonim: "Arunika Residence")

Sumber: landing page satu halaman sebuah cluster perumahan kecil di Jawa Barat (WordPress/Elementor, diambil 18 Okt 2026). Nama cluster, nama developer dan grup, lokasi, landmark sekitar, nomor WhatsApp, email, dan alamat kantor dianonimkan. Lokasi dipindah ke **Jatiasih, Bekasi**; landmark sekitar diganti kategori umum (gerbang tol, sekolah, rumah sakit, stasiun KRL). Spesifikasi bangunan dan nama tipe dipakai apa adanya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero hanya slogan lokasi + "690jt-an" + tombol "Dapatkan brosur" ke WhatsApp | Pengunjung tidak bisa melihat apa pun tanpa chat dulu ke marketing |
| Lima tipe rumah di akordeon dengan gambar yang gagal dimuat; tidak ada luas tanah/bangunan, kamar, atau harga per tipe | Pembeli tidak bisa membandingkan tipe atau menyaring sesuai budget |
| Tidak ada siteplan atau status unit; tombol "Cek Unit" ke WhatsApp | Ketersediaan hanya bisa ditanya, tidak bisa dilihat; marketing menjawab pertanyaan yang sama berulang |
| Tidak ada simulasi KPR, info uang muka, BPHTB, atau bank rekanan | Pembeli tidak tahu dana awal yang perlu disiapkan sebelum survei |
| Tidak ada penjadwalan kunjungan atau booking fee online | Lead berhenti di chat; tidak ada komitmen tercatat |
| Grid foto serah terima kunci berisi wajah pembeli + embed video kosong + slider logo merek waralaba | Bukti sosial bercampur dengan konten tak relevan, privasi pembeli tidak dijaga |
| Tidak ada halaman untuk pembeli yang sudah booking | Progres bangunan dan tagihan uang muka ditanyakan lewat WhatsApp |

## Arah redesign
- Landing satu-aksi ala Toast (hero foto, input WhatsApp di hero, pita oranye di footer) dengan warna oranye brand asli.
- Data rumah dijadikan struktur: tipe → kavling → simulasi → kunjungan/booking → progres.
- Layar KPR dan akun pembeli memakai pola dashboard pinjaman Lend Cash (tile angka, batang bertumpuk, kartu proses, daftar catatan).

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Hero + input WhatsApp, fakta proyek, tab 5 tipe (foto, LT/LB/KT/KM, harga, sisa unit dihitung dari data siteplan), teaser siteplan mini, spesifikasi bangunan, fasilitas & jarak, footer pita oranye |
| `#siteplan` | Siteplan 48 kavling (4 blok, 2 jalan, fasilitas, gerbang), filter tipe, klik kavling → kartu detail (status, foto, harga, hook, spesifikasi, cicilan mulai), ringkasan stok per tipe |
| `#kpr` | Simulasi KPR unit terpilih: DP, tenor, 4 bank (fix vs floating, syariah), grafik cicilan per tahun, dana awal (booking fee, sisa DP, BPHTB, biaya bank) + kartu kunjungan: kalender kotak, jam, mode "kunjungan + booking fee" → sukses dengan langkah berikutnya |
| `#progres` | Akun pembeli unit D-08: progres fisik, grafik progres per bulan (realisasi vs rencana), 5 tahapan, jadwal cicilan uang muka, catatan lapangan dengan foto udara, kontak proyek |

## Asumsi (situs asli tidak mencantumkan)
- Jumlah kavling (48), pembagian blok, status unit, luas tanah per tipe, kamar, dan harga per tipe selain "mulai 690 jt-an" adalah **perkiraan untuk prototype**.
- Suku bunga bank, floating 10,5%, biaya bank ±2,5%, NPOPTKP Rp60 jt, kebijakan booking fee (Rp5 jt, ditahan 14 hari, kembali bila KPR ditolak) adalah ilustrasi dan harus dikonfirmasi developer.
- Nama orang di layar pembeli & tim proyek fiktif.

## Tech stack produksi (rencana)
Next.js + Supabase (tipe, kavling, status, booking, pembeli, progres, tagihan), Midtrans/Xendit virtual account untuk booking fee, WhatsApp API untuk konfirmasi kunjungan dan pengingat tagihan, panel admin untuk marketing & pengawas lapangan mengubah status unit dan mengunggah progres mingguan.

## Catatan foto
- Dipakai (dicek per sudut, tanpa watermark/logo/teks): render fasad deret (hero), render tipe 1+2 lantai, render deret 2 lantai siang & sore, render deret dengan sepeda, foto jalan cluster yang sudah dihuni, kolam renang, taman & lapangan, foto udara blok yang sedang dibangun. Tidak ada pengeditan piksel; hanya resize ke webp ≤1600 px.
- Dilewati: logo merek waralaba (minimarket, apotek, kopi, restoran), foto stasiun dan papan nama stasiun (identitas lokasi), render ruang publik kota di dekat lokasi (identitas lokasi), foto sekolah berpapan nama, 9 foto serah terima kunci (wajah pembeli & staf), foto udara kedua yang memperlihatkan taman kota di sebelahnya (identitas lokasi), foto kolam kedua (kualitas rendah), foto masjid (tidak dibutuhkan), foto jalan kedua (pelat nomor kendaraan).
- Foto "Rumah Tumbuh 45" memakai foto jalan unit yang sudah dihuni karena situs tidak punya render khusus tipe itu.
