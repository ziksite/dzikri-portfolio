# Redesign — Website Kantor Advokat Litigasi (anonim: "Saksama & Rekan")

Sumber: website kantor hukum di dua kota (WordPress, Bahasa Inggris dan Indonesia), ditelusuri 1 Nov 2026: beranda EN/ID, profil kantor, bidang praktik, satu profil advokat. Nama, kota, kontak, foto, dan statistik tidak dibawa.

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Judul hero berupa klaim peringkat | Berisiko dengan larangan iklan diri dalam Kode Etik Advokat |
| Deretan statistik klien, nilai, dan persentase kasus berhasil | Terbaca sebagai janji hasil, dan tidak dapat diverifikasi pengunjung |
| Layanan dibagi menurut istilah hukum | Orang yang sedang panik tidak tahu masalahnya masuk bidang apa |
| Isi bidang praktik memuat istilah asing yang tidak berlaku di Indonesia (federal and state courts, DUI) | Kesan salinan generik, mengurangi kepercayaan |
| Bahasa campur: versi EN berisi paragraf Indonesia, dan sebaliknya | Halaman terasa belum selesai |
| Bagian ulasan kosong, biaya hanya satu paragraf | Tidak ada yang menjelaskan langkah setelah menghubungi kantor |
| Satu form umum dan satu nomor WhatsApp | Klien tidak tahu dokumen yang perlu dibawa; kantor menerima cerita tanpa konteks |
| Bahan visual berupa foto stok timbangan dan patung keadilan dengan palet navy-emas | Sama dengan kebanyakan kantor hukum |

## Arah redesign
- Situs diubah menjadi pintu masuk berbasis masalah, dalam kerangka portal: indeks "apa yang sedang Anda hadapi" → pertanyaan bertahap → tahapan umum dan dokumen → jadwal.
- Referensi: Enlight + LendFlow (lihat `design-system.md`). Palet terong tua menggantikan navy-emas.
- Layar tim berupa papan perkara per tahap dengan agenda dua minggu hari kerja.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Sidebar perkara, indeks 8 masalah, cara kerja, tabel bidang praktik, advokat, nilai, kantor |
| `#panduan` | 4 langkah per jenis perkara, jejak jawaban di sidebar, hasil: peringatan waktu bila relevan, tahapan umum, dokumen. Tampilan awal lewat hash langsung adalah contoh selesai (ketenagakerjaan); masuk dari beranda atau "Mulai ulang" memulai dari awal |
| `#jadwal` | Ceklis dokumen (mengikuti perkara), kalender November 2026, jam, cara bertemu, data diri, persetujuan, bilah permintaan → SR-K-1127 |
| `#perkara` | Agenda 2 minggu, 5 kolom tahap, filter advokat, drawer detail, pindah tahap |

## Data asli vs asumsi
| Asli dari situs | Asumsi atau rekaan |
|-----------------|--------------------|
| Daftar bidang praktik, termasuk kurator dan perpajakan | Nama kantor, 4 nama advokat, pembagian bidang per advokat |
| Dua kantor (kota diganti) | Semarang, Makassar, kawasan, telepon, email |
| Struktur 1 direktur, 1 managing partner, 2 advokat | Jam layanan Senin–Jumat dan slot konsultasi |
| Alur: dengar masalah → sepakat → Surat Kuasa, dengan pilihan paket biaya | Seluruh daftar dokumen dan tahapan panduan, ditulis dari pengetahuan umum |
| Nilai: kerahasiaan, etika, alternatif penyelesaian sengketa, tim yang sesuai | 15 perkara, klien berinisial, tanggal, nomor SR- semuanya fiktif |

## Aturan etik yang diterapkan
- Klaim peringkat, statistik situs asli, tingkat kemenangan, dan janji hasil dihapus.
- Tidak ada angka biaya atau honor. Klaim konsultasi tanpa biaya dari situs asli sengaja tidak dibawa; salinan hanya menyebut biaya dibahas sebelum Surat Kuasa.
- Panduan diberi keterangan informasi umum, bukan nasihat hukum, dan tidak menimbulkan hubungan advokat-klien.
- Perkara memakai inisial dan forum generik tanpa nama kota atau nomor register. Jenis lembaga (Pengadilan Agama, PHI, dinas ketenagakerjaan) disebut sebagai informasi umum.

**Perlu ditinjau advokat sebelum dipakai nyata:** tahapan, daftar dokumen, peringatan waktu (termasuk "pada umumnya 90 hari" untuk gugatan TUN). Isinya sengaja tanpa nomor pasal, tetapi belum diperiksa praktisi hukum. Kesesuaian alat seperti ini dengan Kode Etik juga perlu pendapat kantor.

## Foto
Tidak ada foto yang dipakai, sehingga folder `assets/` tidak dibuat. Foto stok dan ikon bidang praktik dilewati sesuai arahan; foto tim dan foto advokat adalah wajah nyata.

## Tech stack produksi (rencana)
Next.js + Supabase (permintaan, perkara, agenda, berkas dengan akses per peran), WhatsApp API untuk konfirmasi dan pengingat.
