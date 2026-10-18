# Redesign — Website Koperasi Simpan Pinjam (anonim: "Tunas Arta")

Sumber: website koperasi simpan pinjam (KSP, **bukan bank/BPR**) dengan kantor pusat dan dua cabang di satu wilayah metropolitan, diambil 18 Okt 2026. Nama koperasi, wordmark, telepon, WhatsApp, email, alamat, nama anggota di testimoni diganti/dihapus. Kota kantor diganti ke Bandung Raya (Antapani, Cimahi, Soreang). Produk, suku bunga, tabel angsuran, syarat dokumen, dan aturan tabungan arisan dipakai apa adanya.

Catatan regulasi: karena ini koperasi, tidak ada klaim penjaminan LPS. Footer menyebut "diawasi Kementerian Koperasi" dan bahwa simpanan koperasi tidak termasuk program penjaminan LPS untuk bank. Slug tetap `rural-bank-website` sesuai penugasan.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero slider berisi slogan "Bersama menjadi sukses" + tombol "Learn more" | Tidak menjelaskan produk, bunga, atau siapa yang bisa jadi anggota |
| Bunga tabungan tertulis 5% di beranda tetapi 3,5% di halaman tabungan | Informasi bunga tidak konsisten, menurunkan kepercayaan |
| Tabel angsuran pinjaman berupa 5 tabel panjang (± 70 baris) per rentang plafon | Calon peminjam harus mencari baris sendiri; kalkulator terpisah dan hanya bisa memilih tenor |
| Form pengajuan online hanya satu dropdown jaminan lalu "Tahap selanjutnya", dokumen tidak terlihat di depan | Pemohon tidak tahu dokumen apa yang perlu disiapkan sebelum mulai |
| Peringatan penipuan penting (tidak ada KTA, tidak ada biaya di muka) berada di blok teks panjang dengan emoji | Pesan keamanan yang paling penting mudah terlewat |
| Seluruh foto bertuliskan watermark domain + akun media sosial | Tidak ada foto yang bisa dipakai ulang; tampilan terasa seperti brosur |
| Testimoni berupa 30-an masukan anggota (banyak berisi keluhan/saran, tanpa foto) dan ada permintaan aplikasi untuk cek saldo/angsuran | Kebutuhan portal anggota nyata tetapi belum ada |
| Alamat lengkap 3 kantor hanya di footer satu paragraf huruf kapital | Sulit dibaca, tidak ada jam layanan atau link peta |

## Arah redesign
- Design system dari **HiveRep** (kartu, strip pill, blok merah) + **Stripe Checkout** (halaman terbelah, field bersambung); lihat `design-system.md`.
- Beranda menjawab tiga pertanyaan: berapa bunganya, berapa angsurannya, dan apakah ini resmi. Kalkulator cepat di hero, tabel bunga berjangka yang bisa diklik dengan perkiraan bunga bersih pajak, tabel plafon pinjaman diringkas jadi 4 baris.
- Peringatan penipuan jadi pita navy di atas header + blok merah "Yang tidak pernah kami lakukan".
- Simulasi dan pengajuan di satu layar terbelah: angka berubah langsung, dokumen menyesuaikan jenis jaminan.
- Portal anggota menggabungkan tabungan, berjangka, arisan, dan pinjaman (keluhan utama di testimoni asli).
- Layar operasional: meja account officer untuk meninjau satu pengajuan (dokumen, kemampuan bayar, jaminan, survei), bukan dashboard KPI.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Pita waspada penipuan, hero + kartu perkiraan angsuran (tenor menyesuaikan plafon), strip 4 produk, tabel bunga berjangka interaktif + estimasi bunga bersih pajak, kartu tabungan & tabungan arisan, tabel plafon pinjaman, 3 jenis jaminan, blok keamanan + 4 langkah pengajuan, 3 kantor + saluran resmi, footer dengan catatan LPS |
| `#simulasi` | Kiri: nominal + slider Rp1–500 juta, tenor (48/60 nonaktif ≤ Rp50 juta), rincian bunga flat, jadwal angsuran (6 baris / semua). Kanan: form pengajuan dengan field bersambung, pilihan jaminan → checklist dokumen yang bisa diunggah, persetujuan, sukses TA-2610-0151 + tahapan |
| `#portal` | Portal Ratna: strip saldo 4 rekening, kartu pinjaman (24 segmen, 8 dibayar), tab jadwal angsuran / mutasi tabungan, blok merah angsuran ke-9 + virtual account, kartu berjangka (bunga, pajak 10%, jatuh tempo), progres tabungan arisan |
| `#ao` | Meja AO: antrean 6 pengajuan, kasus TA-2610-0143 (Rp75 jt, 36 bln), strip ringkasan, 7 ubin dokumen (Sesuai/Revisi), rasio angsuran 25,3% vs batas 35%, nilai jaminan & plafon/likuidasi, catatan survei, riwayat, bar keputusan (minta dokumen / teruskan ke komite) |

Rumus angsuran mengikuti tabel asli: (pokok/tenor + pokok × bunga flat) dibulatkan ke atas per Rp500; diuji cocok dengan beberapa baris tabel asli (mis. Rp10 jt/24 bln = Rp542.000, Rp51 jt/24 bln = Rp2.635.000).

## Tech stack produksi (rencana)
Laravel + MySQL (anggota, rekening, pinjaman, jadwal angsuran, pengajuan, dokumen), integrasi dengan core system koperasi lewat API/ekspor harian untuk saldo, virtual account bank mitra untuk angsuran, penyimpanan dokumen privat, notifikasi WhatsApp untuk jatuh tempo dan status pengajuan, peran AO/komite dengan log audit.

## Catatan foto
- Tidak ada foto yang dipakai. Keempat foto situs (teller, petugas memegang bilyet, petugas melayani anggota, anggota mengisi form) berisi watermark domain dan akun media sosial di tengah foto; satu juga menampilkan prasasti peresmian bernama koperasi. Banner promo berisi teks/logo. Avatar testimoni adalah gambar default.
- Layout dirancang tanpa foto: hero memakai kartu kalkulator, identitas dari angka, tabel, dan blok warna.
