# Design System — Lajur Motor

File: `public/prototypes/ds/used-car-showroom-website.css`

## Referensi
| Dari | Yang diambil |
|------|--------------|
| `_design-reference/dashboard/inventory-27670596-electronics-inventory-management-dashboa.jpg` | Inventaris sebagai kartu foto di atas bidang abu: foto besar + nama + harga + status bercentang hijau/oranye, sudut kartu lembut, deret filter pill, permukaan putih dengan garis tipis |
| `_design-reference/dashboard/pos-26099355-outvetch-retail-pos-dashboard.jpg` | Tab stok hitam yang menempel di sudut foto, kartu berbingkai ganda, pill filter dengan badge hitungan, panel kanan "Detail Transaction" berisi kartu-kartu kecil untuk rincian, rail hitam dengan satu item aktif berwarna |

`flow-form/moo-business-card-config` dan `anteraja-tracking` tidak dipakai: isi gambarnya hanya halaman pemasaran, tanpa konfigurator yang bisa ditiru, dan keduanya sudah dipakai situs lain. Pola konfigurator kredit diturunkan dari panel Detail Transaction POS.

Tidak diambil: aksen hijau Mora dan lime Outvetch (diganti merah brand), kartu ringkasan KPI berderet, bagan tren.

## Token
| Token | Nilai | Pakai untuk |
|-------|-------|-------------|
| `--ink` | #111315 | Teks utama, tab stok, rail |
| `--ink-2` | #5F6468 | Meta |
| `--line` | #E6E8E7 | Garis kartu dan panel |
| `--well` | #EEF0EF | Bidang foto, badge hitungan, segmen |
| `--soft` | #F6F7F6 | Wadah panel kanan dan bar filter |
| `--brand` | #DD0302 | Merah brand asli: aksi, angka di kalimat cicilan, slider |
| `--ok` / `--warn` | #0F7A43 / #B45F06 | Lolos atau masuk budget / catatan atau lewat budget |
| `--lot` / `--lot-line` | #17191B / #4A4E52 | Aspal dan garis petak di papan lot |
| Font | Urbanist 500–800 | Satu keluarga; belum dipakai situs lain |
| Radius | 10 (field) · 14 (kartu dalam, foto) · 20 (kartu luar) · pill (tombol, filter) | |
| Bayangan | Tidak ada | Pemisahan memakai garis dan bingkai ganda |

Skala teks: kalimat beranda 46 · h1 40 · h2 28 · h3 19 · body 16 · meta 15 · small 14.

## Komponen
`budget__line` + `dial` (kalimat cicilan dengan tiga slider) · `range` · `car` (kartu unit bingkai ganda) · `stocktab` · `pill` (filter berhitungan) · `filters` + `seg` · `stage` + `thumb` · `specs` · `check` (hasil inspeksi) · `hist` · `cfg` + `cfg__card` (panel simulasi) · `pay` + `bill` · `pkg` (paket TDP asli) · `days` + `slot` (test drive) · `lane` + `bay` (papan lot) · `legend` · `stcard` + `stbtn` (kartu stok) · `todo`

## Aturan
- Semua foto kartu adalah sisi samping, mobil menghadap kiri bila tersedia, sehingga deretan terbaca seperti lajur parkir. Sisi samping juga satu-satunya sudut tanpa pelat.
- Warna hijau dan oranye hanya membawa arti status, merah hanya untuk aksi.
- Setiap unit menampilkan harga kredit; harga tunai selalu tersedia di panel simulasi.
- Angsuran tepat di dua titik paket asli, di antaranya perkiraan garis lurus dan diberi label perkiraan.
- Brand hanya wordmark teks.
