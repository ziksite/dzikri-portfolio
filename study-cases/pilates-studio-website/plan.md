# Redesign — Website Studio Pilates (anonim: "Lentur Pilates")

Sumber: website studio kebugaran butik satu lokasi (Squarespace, diambil 18 Okt 2026), dengan kelas barre, yoga, dan program studio. Model bisnis untuk redesign difokuskan ke studio reformer & mat pilates sesuai arahan. Nama brand, logo, alamat, nomor telepon, nama pelatih, dan nama sub-brand kelas dianonimkan. Lokasi diganti ke Dago, Bandung. Harga paket diambil dari price list asli (drop-in Rp250.000, 10 sesi Rp2.000.000/45 hari, 20 sesi Rp3.800.000/75 hari, private 1:1 Rp500.000 / 8 sesi Rp3.800.000, duo Rp900.000 / 8 sesi Rp6.800.000). Jam buka mengikuti situs asli (Sen–Jum 06.00–22.00, Sab–Min 06.00–14.00).

## Audit situs asli
| Temuan | Dampak |
|--------|--------|
| Halaman jadwal dan price list hanya berupa gambar JPEG poster | Tidak terbaca di HP, tidak bisa dicari, dan tidak bisa dibooking dari halaman itu |
| Tidak ada booking kelas; tombol "Join class" dan "Login" mengarah ke halaman yang sama | Calon member harus chat WhatsApp untuk tahu sisa tempat |
| Halaman pelatih berisi poster portrait dengan teks di dalam gambar | Profil sulit dibaca dan tidak terhubung ke kelas yang diajar |
| Sistem kredit, masa berlaku paket, dan aturan pembatalan tidak dijelaskan | Member tidak tahu kapan kredit hangus atau kapan boleh batal |
| Form registrasi minta minat 16 kelas berbeda + embed peta + teks "revolutionary" | Halaman panjang tanpa jalur aksi yang jelas; nada promosi berlebihan |

## Arah redesign
- Design system sendiri dari ClassPass (landing penemuan kelas) + GymForce gym dashboard (daftar kelas dengan kapasitas, roster check-in). Lihat `design-system.md`.
- Beranda langsung menjawab "kelas apa hari ini dan masih ada tempat?" di kartu hero.
- Satu kredit = satu kelas grup. Saldo kredit selalu terlihat di header.
- Nomor reformer dipilih saat booking dan nomor yang sama muncul di tablet meja depan.

## Layar
| Hash | Isi |
|------|-----|
| `#home` | Bar promo, mosaik foto + kartu "Hari ini, Minggu 18 Oktober" (5 kelas, sisa tempat, booking/waitlist), daftar jenis kelas, jam & lokasi, 4 paket, 6 instruktur (inisial), aturan booking, footer hitam |
| `#jadwal` | Filter jenis kelas, deret 7 hari, daftar kelas per hari, peta 12 reformer / 16 matras, ringkasan kredit (7 → 6), aturan batal yang dihitung dari jam kelas, waitlist untuk kelas penuh → konfirmasi LTR-4418 |
| `#paket` | Tab kelas grup / private, saldo kredit sekarang, 4 kartu paket, masa berlaku dihitung dari tanggal beli, metode bayar (QRIS, VA, kartu), paybar sticky → pembayaran diterima |
| `#checkin` | Tablet meja depan: tab kelas hari ini, peta reformer dengan nama & status hadir, hitungan hadir/belum/kosong, roster dengan tombol check-in dan pencarian, catatan kredit habis/kelas pertama, waitlist kelas berikutnya |

## Tech stack produksi (rencana)
Next.js + Supabase (kelas, alat reformer, booking, kredit & masa berlaku, waitlist), Midtrans untuk QRIS/VA/kartu, WhatsApp API untuk konfirmasi, promosi waitlist, dan pengingat kredit hampir hangus.

## Catatan foto
- Dipakai (6): foto kelas mat & stretch hitam-putih dari halaman utama situs asli, dicek per foto. `kelas-mat-ekstensi` di-crop bagian bawah karena ada teks merek di matras.
- Dilewati: semua foto boxing (merek sarung tinju), foto bola dengan tulisan nama kelas, foto penari barre (kaos bertulisan nama kelas), potret dengan logo di lengan (patch tidak bersih, jadi tidak dipakai), foto meja depan (bola bertulisan merek), mesin EMS (stiker label), semua poster pelatih, jadwal, dan price list (teks/logo di gambar).
- Tidak ada foto reformer di situs asli, jadi peta reformer digambar sebagai UI dan tidak ada foto yang dilabeli "reformer".
- Instruktur ditampilkan dengan inisial, tanpa foto.
