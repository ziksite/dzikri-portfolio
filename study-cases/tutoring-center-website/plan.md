# Redesign — Website Bimbel (anonim: "Bimbel Lajur")

Sumber: website lembaga bimbel dengan aplikasi ujian online, beberapa cabang (diambil 18 Okt 2026). Nama, logo, kontak, alamat, dan nama siswa testimoni dianonimkan. Nama paket tryout, jumlah tes, masa berlaku, harga paket online, format subtes UTBK, dan jadwal simulasi dipakai apa adanya. Nama sekolah/PTN tujuan (target ujian) tetap dipakai karena itu isi layanannya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero berupa slider 7 banner promo berteks (SIMAK UI, UTBK, SSU ITB …) | Pengunjung tidak tahu program apa yang cocok untuk jenjang anaknya |
| Bagian "Features" 3 ikon kado oranye dengan teks yang sama dengan banner | Tidak ada informasi baru; ruang besar terbuang |
| Hanya paket tryout online yang punya harga; kelas tatap muka tidak dijelaskan sama sekali | Orang tua yang mencari bimbel reguler harus bertanya lewat WhatsApp |
| Paket siswa cabang (gratis, 59–118 tes) tercampur dengan paket berbayar di tab yang sama, dinamai kode internal ("TARUTUNG \| 9-2 REG") | Membingungkan calon pelanggan, terlihat seperti panel admin |
| Tidak ada jadwal kelas, kuota, atau alur daftar & bayar; tombol "Book Now" ke aplikasi ujian | Tidak bisa mendaftar kelas dari situs |
| Tidak ada tampilan untuk orang tua (kehadiran, nilai tryout, tagihan) | Nilai jual "dipantau" tidak terlihat; admin mengirim rekap manual |
| Bahasa campur (Features, Validity, Book Now / Pesan Sekarang), satu testimoni | Kesan kurang terawat |

## Arah redesign
- Design system sendiri dari referensi **Printful pricing** (perbandingan paket + kalkulator) dan **Enlight student portal** (portal nilai & tagihan). Lihat `design-system.md`.
- Tanpa foto (lihat catatan foto).

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Header bertoggle, judul + pencari program (jenjang SD/SMP/SMA/Alumni → kartu berganti, tujuan, cabang), 3 kartu paket per jenjang, tabel paket tryout online (data asli), kalkulator biaya reguler (program, bulan, jumlah anak, cara bayar → total), daftar cabang |
| `#program` | Intensif UTBK SNBT 2027: fakta program, jadwal mingguan (berganti sesuai kelas yang dipilih), jadwal Simulasi 1–12, format tryout mini 7 subtes, kartu daftar (pilih kelas dengan sisa kursi, data siswa, lunas/cicil) → sukses dengan nomor pendaftaran & virtual account |
| `#portal` | Portal orang tua: pilih anak (2 anak, isi berganti), kehadiran 34/36, skor Simulasi 3, peringkat cabang, grafik skor vs rata-rata cabang vs target prodi, skor per subtes, tagihan cicilan, jadwal minggu ini, grid kehadiran Oktober, catatan tutor |
| `#tutor` | Tablet tutor di kelas: daftar kelas hari ini, absensi 16 siswa dengan tombol Hadir/Izin/Sakit/Alpa, hitungan otomatis, materi, kirim → WhatsApp otomatis ke orang tua yang anaknya tidak hadir |

## Asumsi data
Harga kelas tatap muka (Rp350.000–650.000/bulan, Intensif UTBK Rp7.900.000, kedinasan, gap year), kuota kelas, nama tutor/siswa/orang tua, skor dan peringkat adalah **asumsi** untuk prototype — situs asli tidak mencantumkannya. Harga & isi paket online sesuai situs asli.

## Tech stack produksi (rencana)
Next.js + Supabase (program, kelas, kuota, siswa, absensi, nilai, tagihan), payment gateway untuk virtual account/QRIS, WhatsApp API untuk notifikasi absensi dan tagihan. Nilai tryout ditarik dari aplikasi ujian yang sudah ada lewat ekspor/API.

## Catatan foto
Tidak ada foto yang dipakai. Semua 7 banner hero dan 7 gambar paket berisi teks promo dan logo lembaga/PTN/sekolah; 3 foto testimoni adalah siswa yang dipasangkan dengan nama (dilewati sesuai aturan). Layout dirancang tanpa foto.
