# Redesign — Website Bengkel Body Repair & Cat Mobil (anonim: "Rona Body & Paint")

Sumber: website jaringan bengkel cat & body repair di Indonesia (WordPress/Elementor, diambil 18 Okt 2026: beranda + halaman body repair, full body repaint, spot repair, ketok tanpa cat, poles, anti karat). Nama brand, grup induk, logo, alamat kantor pusat, nomor WhatsApp, nama selebriti di portfolio, dan daftar outlet dianonimkan. Harga dan deskripsi layanan dipakai apa adanya.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Hero "Paint your Pride." di atas foto gelap, tanpa harga atau langkah berikutnya selain "Lihat Layanan" dan "Jadi Mitra" | Pengunjung yang mobilnya penyok tidak langsung tahu harus apa; ajakan kemitraan bersaing dengan ajakan servis |
| Harga per ukuran panel (S/M/L) ada, tapi tersembunyi di halaman Body Repair; beranda hanya "mulai dari Rp975.000" | Pelanggan tidak bisa menghitung sendiri kerusakan di beberapa panel |
| "Anatomi body" berupa gambar statis dengan label kecil | Peluang untuk pemilih panel interaktif terbuang |
| Semua CTA berakhir di satu nomor WhatsApp | Tidak ada pilihan cabang, tanggal, penjemputan, atau jalur klaim asuransi |
| "Track Status" dan "Garansi" hanya disebut di kartu promosi tanpa halaman nyata | Klaim transparansi tidak terlihat; pelanggan tetap menelepon menanyakan progres |
| Hampir semua foto memuat logo brand (papan dinding, pelat nomor, kaleng cat, seragam) dan sebagian gambar hasil generator AI | Kesan iklan, bukan bukti hasil kerja |
| Section portfolio berisi nama selebriti dan supercar, plus section kemitraan grup di tengah beranda | Fokus bergeser dari pelanggan biasa yang butuh perbaikan |

## Arah redesign
- Halaman publik meniru pola landing produk field-service (Jobber): hero kiri + mozaik foto kerja nyata dengan caption harga/durasi, tab jenis kerusakan, panel harga per ukuran.
- Estimasi menjadi konfigurator: tandai panel di gambar mobil tampak atas → kisaran harga langsung, lalu jadwal, penjemputan, dan jalur asuransi dalam satu alur.
- Selama mobil di bengkel, pelanggan membuka laporan progres ala CoatOps: foto per tahap, checklist kualitas, timeline, dan persetujuan tambahan biaya.
- Bengkel memakai papan kanban per tahap dengan status booth.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Pita navy: hero + mozaik 6 foto berkaption, tab 5 jenis layanan (panel terbelah sebelum/sesudah + tabel harga), 3 ukuran panel dengan diagram mobil, pita lacak (stiker fakta + form plat/WO), ubin 8 layanan, kutipan pelanggan, 4 cabang, footer |
| `#estimasi` | Pilih panel di SVG mobil (15 panel), mobil & kelas, jenis pekerjaan (cat / spot / ketok), jenis cat, foto, cabang, tanggal dengan slot, antar/jemput, asuransi/pribadi → ringkasan sticky dengan kisaran total → sukses EST-2610-087 |
| `#lacak` | Laporan WO-2610-118 (Honda City B 1846 KJR): cincin 67%, metrik, 4 foto tahap, rincian panel, checklist QC, persetujuan ganti braket Rp450.000 (bisa disetujui → tag & timeline berubah), timeline, pengambilan |
| `#bengkel` | Papan kerja cabang: sidebar, status booth, filter Asuransi/Pribadi/Lewat target, 6 kolom kanban (Inspeksi → Siap diambil), tombol pindah tahap & serahkan |

## Logika harga (prototype)
- Body repair & cat: S Rp150rb–550rb, M Rp975rb–1,2jt, L Rp1,5jt–2,5jt (dari situs asli).
- Pengali kelas mobil (1 / 1,1 / 1,35) dan jenis cat (1 / 1,1 / 1,25) adalah **asumsi** untuk demo, perlu dikonfirmasi bengkel.
- Spot repair Rp500rb–750rb per titik (situs: mulai Rp500.000; batas atas asumsi). Ketok tanpa cat Rp100rb–300rb per panel (tiga tier situs asli).
- Own risk asuransi Rp300.000 per kejadian = angka umum polis di Indonesia, bukan data bengkel.

## Tech stack produksi (rencana)
Next.js + Supabase (panel & tarif, estimasi, work order, foto tahap di storage, persetujuan), WhatsApp API untuk link lacak dan notifikasi tahap, PWA sederhana untuk teknisi mengunggah foto.

## Catatan foto
Dipakai (`public/prototypes/assets/car-body-paint-workshop-website/`):
- `booth-spray.webp`, `booth-spray-dark.webp` — teknisi di booth cat; logo kecil di lengan seragam ditutup `patch.mjs`.
- `front-damage-before/after.webp` — sedan putih sebelum/sesudah; di-crop di bawah papan nama dinding, pelat nomor berlogo ditimpa pelat polos gelap.
- `hood-scratch-before/after.webp` — kap mesin baret; hanya emblem pabrikan mobil, tanpa logo bengkel.
- `mirror-before.webp` (spion retak), `spot-touchup.webp` (crop bingkai hitam), `underbody-coating.webp` (crop strip oranye di tepi kanan), `dent-door-before/after.webp` (crop dari kolase sebelum/sesudah tanpa teks BEFORE/AFTER; resolusi rendah, dipakai kecil).

Dilewati: semua foto mobil di depan dinding bermerek yang tidak bisa di-crop bersih (BMW biru/putih), foto pintu dengan watermark logo di pojok, banner kaleng cat/produk berlogo, foto poles dengan logo di dinding & seragam, foto selebriti dan supercar berpelat logo, foto grand opening kemitraan, infografis anatomi body (teks + logo), mockup aplikasi track status (logo).
