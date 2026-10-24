import type { Dictionary } from "./en";

// Site copy (Bahasa Indonesia)
export const id: Dictionary = {
  meta: {
    title: "Dzikri Ramadhan — Jasa Website & Otomasi Bisnis AI",
    description:
      "Website, aplikasi web, dan otomasi bisnis berbasis AI yang dirancang dari masalah bisnis Anda, bukan dari template. Freelance & remote dari Indonesia.",
    siteName: "Dzikri Ramadhan",
    ogLocale: "id_ID",
  },

  nav: {
    home: "Beranda",
    about: "Tentang",
    services: "Layanan",
    projects: "Proyek",
    blog: "Blog",
    contact: "Kontak",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    switchLanguage: "Ganti bahasa",
  },

  hero: {
    eyebrow: "Halo, saya",
    role: "Web Developer & AI Automation",
    handsOn: "Saya merancang, membangun, dan merilisnya.",
    supporting:
      "Saya membangun sistem digital, produk, dan otomasi yang mengubah tantangan bisnis menjadi solusi yang scalable.",
    labels: [
      "Bisnis × Teknologi",
      "Transformasi Digital",
      "Sistem & Otomasi",
      "Produk & Inovasi",
      "Strategi → Eksekusi",
    ],
    ctaPrimary: "Lihat karya saya",
    ctaSecondary: "Mari terhubung",
  },

  quickInfo: [
    { label: "Fokus", value: "Web Development & Otomasi AI", live: false },
    { label: "Membangun", value: "Website · Aplikasi Web · Otomasi", live: false },
    { label: "Terbuka untuk", value: "Proyek remote & freelance", live: true },
    { label: "Berbasis di", value: "Jakarta, Indonesia · GMT+7", live: false },
  ],

  about: {
    heading: "Tentang Saya",
    greeting: "Halo, saya Dzikri.",
    paragraphs: [
      "Saya bergerak di bidang teknologi dan inovasi, membangun sistem digital, produk, dan otomasi untuk menyelesaikan masalah bisnis nyata.",
      "Pekerjaan saya berada di persimpangan **teknologi, produk, bisnis, dan operasional** — mengubah ide dan tantangan operasional menjadi solusi yang praktis dan scalable.",
      "Dari platform digital dan sistem internal hingga CRM, analitik, AI, dan otomasi, saya memastikan teknologi bekerja sebagai **penggerak bisnis**, bukan sekadar alat tambahan.",
    ],
    status: "Tersedia",
    profileCta: "Ayo ngobrol",
  },

  services: {
    heading: "Layanan",
    intro: "Dari website sampai sistem untuk mengelola bisnis Anda, dibuat sesuai kebutuhan, bukan dari template.",
    cta: "Diskusikan",
    whatsappMessage: "Halo Dzikri, saya tertarik dengan: {service}",
    items: [
      {
        id: "website",
        title: "Jasa Pembuatan Website",
        text: "Website company profile, landing page, toko online, sampai website custom sesuai kebutuhan bisnis Anda.",
      },
      {
        id: "webapp",
        title: "Aplikasi & Sistem Bisnis",
        text: "Aplikasi untuk mengelola bisnis: kasir, stok, booking, data pelanggan, dan laporan. Tidak perlu Excel lagi.",
      },
      {
        id: "automation",
        title: "Chatbot WhatsApp & AI",
        text: "Balas chat pelanggan otomatis 24 jam, follow-up, dan rekap pesanan langsung dari WhatsApp.",
      },
      {
        id: "consulting",
        title: "Konsultasi Website & Digital",
        text: "Website sepi atau tidak menghasilkan? Saya cek dan beri langkah perbaikan yang jelas.",
      },
    ],
  },

  techStack: {
    heading: "Tech Stack",
    intro: "Tools dan teknologi yang saya gunakan untuk mewujudkan ide menjadi solusi digital yang andal.",
    groups: [
      { name: "Development", items: ["Next.js", "React", "PHP", "Laravel", "WordPress"] },
      { name: "Infrastruktur", items: ["Docker", "Linux", "VPS", "Git", "CI/CD"] },
      { name: "Data & Sistem", items: ["MySQL", "SQL", "APIs", "CRM", "Analytics"] },
      { name: "Desain & Produk", items: ["Figma", "UI/UX", "Product Design"] },
      { name: "Otomasi & AI", items: ["AI Tools", "Workflow Automation", "API Integration"] },
    ],
  },

  projects: {
    heading: "Karya Pilihan",
    intro: "Pilihan produk digital, sistem, dan inisiatif teknologi yang pernah saya kerjakan.",
    viewAll: "Lihat semua proyek",
    filterLabel: "Filter proyek berdasarkan jenis",
    industryFilterLabel: "Filter proyek berdasarkan industri",
    allIndustries: "Semua industri",
    noResults: "Tidak ada proyek yang cocok dengan filter ini.",
    resetFilters: "Reset filter",
    industries: {
      "Agriculture": "Pertanian",
      "Automotive": "Otomotif",
      "Beauty & Wellness": "Kecantikan & Wellness",
      "Consulting & Research": "Konsultan & Riset",
      "Construction & Engineering": "Konstruksi & Teknik",
      "Consumer Services": "Jasa Konsumen",
      "Creative & Printing": "Kreatif & Percetakan",
      "Defense & Aerospace": "Pertahanan & Dirgantara",
      "Education & Training": "Pendidikan & Pelatihan",
      "Energy": "Energi",
      "Events & Weddings": "Acara & Pernikahan",
      "Financial Services": "Jasa Keuangan",
      "Food & Beverage": "Makanan & Minuman",
      "Healthcare": "Kesehatan",
      "Hospitality": "Perhotelan & Penginapan",
      "HR & Recruitment": "SDM & Rekrutmen",
      "Industrial & Manufacturing": "Industri & Manufaktur",
      "IT & Technology": "IT & Teknologi",
      "Legal": "Hukum",
      "Logistics": "Logistik",
      "Marketing & Agency": "Marketing & Agency",
      "Media & Advertising": "Media & Periklanan",
      "Property": "Properti",
      "Retail & E-commerce": "Retail & E-commerce",
      "Sports & Fitness": "Olahraga & Kebugaran",
      "Telecommunications": "Telekomunikasi",
      "Transportation & Travel": "Transportasi & Travel",
    } as Record<string, string>,
    allProjects: "Semua Proyek",
    kinds: {
      "AI Automation": "Otomasi AI",
      "Web App": "Aplikasi Web",
      "Internal System": "Sistem Internal",
      Website: "Website",
    },
    disclaimer:
      "Nama klien dan identitas brand dijaga kerahasiaannya. Logo dan detail identitas pada screenshot sengaja diburamkan.",
    impact: "Dampak",
    viewCaseStudy: "Lihat studi kasus",
    previous: "Proyek sebelumnya",
    next: "Proyek berikutnya",
    goToSlide: "Ke slide",
  },

  projectsPage: {
    title: "Portofolio Website & Otomasi Bisnis — Dzikri Ramadhan",
    heading: "Semua Proyek",
    description: "Portofolio website, aplikasi web, sistem internal, dan otomasi AI yang dibangun untuk bisnis nyata.",
  },

  caseStudy: {
    allProjects: "Semua proyek",
    challenge: "Tantangan",
    solution: "Solusi",
    keyFeatures: "Fitur Utama",
    gallery: "Galeri Fitur",
    mainModules: "Modul Utama",
    industry: "Industri",
    techStack: "Teknologi",
    role: "Peran Saya",
    client: "Klien",
    category: "Kategori",
    year: "Tahun",
    status: "Status",
    viewLive: "Lihat proyek live",
    discuss: "Diskusikan proyek serupa",
    requestDemo: "Minta demo privat",
    previous: "Sebelumnya",
    next: "Berikutnya",
    moreProjects: "Proyek lainnya",
    whatsappMessage: 'Halo Dzikri, saya melihat "{title}" di portofolio Anda dan ingin mendiskusikan proyek serupa.',
    lightbox: {
      close: "Tutup galeri",
      previous: "Gambar sebelumnya",
      next: "Gambar berikutnya",
      open: "Buka gambar",
    },
  },

  journey: {
    heading: "Perjalanan Saya",
    intro: "Perjalanan dari membangun produk digital hingga memimpin inisiatif teknologi dan inovasi.",
    items: [
      {
        year: "2025 - Sekarang",
        stage: "Teknologi & Inovasi",
        role: "Head of New Technology",
        company: "Banana Digital Boost",
        jobType: "Full Time",
        description:
          "Memimpin arah teknologi, roadmap, dan inisiatif transformasi digital — mencakup sistem, produk digital, otomasi, dan AI — sambil tetap terlibat langsung membangun platform web perusahaan.",
        tags: ["Strategi Teknologi", "Leadership", "Transformasi Digital"],
      },
      {
        year: "2025 - Sekarang",
        stage: "IT Engineer",
        role: "IT Engineer",
        company: "PT Danapati Boga Nusantara | Foodstocks",
        jobType: "Full Time",
        description:
          "Mengambil tanggung jawab yang lebih luas di sistem, infrastruktur, development, dan kebutuhan bisnis — membangun sistem internal dan otomasi, serta mengintegrasikan alur operasional dan logistik.",
        tags: ["Sistem Internal", "Otomasi", "Integrasi Sistem"],
      },
      {
        year: "2024",
        stage: "IT Network",
        role: "IT Network",
        company: "PT Telkom Akses",
        jobType: "Magang",
        description:
          "Membangun fondasi yang lebih kuat di infrastruktur dan jaringan — merancang master plan jaringan telekomunikasi, merencanakan ekspansi last-mile, dan mendokumentasikan inventaris jaringan.",
        tags: ["Infrastruktur", "Desain Jaringan"],
      },
      {
        year: "2023 - 2024",
        stage: "UI/UX Design",
        role: "UI/UX Design",
        company: "Garuda Maintenance Facility (GMF) AeroAsia",
        jobType: "Magang",
        description:
          "Memperluas keahlian ke user experience, desain antarmuka, dan cara berpikir produk digital — merancang solusi yang menjembatani tujuan bisnis dan kebutuhan pengguna.",
        tags: ["UI/UX", "Product Thinking", "Figma"],
      },
      {
        year: "2021 - 2023",
        stage: "Fondasi IT",
        role: "Asisten Lab Komputer",
        company: "Universitas Serang Raya (UNSERA)",
        jobType: "Kontrak",
        description:
          "Memberikan dukungan teknis untuk mahasiswa dan dosen sambil merawat perangkat keras, perangkat lunak, dan keamanan perangkat lab — fondasi praktis di operasional IT sehari-hari.",
        tags: ["Operasional IT", "Support"],
      },
      {
        year: "2020 - 2022",
        stage: "Website Developer",
        role: "Website Developer",
        company: "Freelance",
        jobType: "Freelance",
        description:
          "Mulai membangun website dan mempelajari fondasi teknologi digital — mengerjakan website korporat dan kampanye dengan perhatian pada kecepatan, keamanan, dan SEO.",
        tags: ["WordPress", "Web Performance", "SEO"],
      },
    ],
  },

  contact: {
    headingLine1: "Mari Bangun",
    headingLine2: "Sesuatu yang Berguna.",
    copy: "Punya tantangan bisnis, ide digital, atau masalah teknologi yang layak dipecahkan? Mari ngobrol.",
    ctaPrimary: "Mulai percakapan",
    ctaSecondary: "Lihat karya saya",
    emailLabel: "Email",
    locationLabel: "Lokasi",
    location: "Jakarta, Indonesia",
    form: {
      name: "Nama Anda",
      namePlaceholder: "Budi Santoso",
      company: "Perusahaan",
      companyPlaceholder: "Nama perusahaan",
      topic: "Topik",
      topicPlaceholder: "Sistem digital, otomasi, website...",
      message: "Pesan",
      messagePlaceholder: "Ceritakan tantangan yang ingin Anda selesaikan...",
      submit: "Mulai percakapan",
      note: "Membuka WhatsApp dengan pesan Anda yang siap dikirim.",
      whatsappIntro: "Halo Dzikri,",
    },
  },

  footer: {
    tagline: "Web Developer & AI Automation",
    sub: "Membangun sistem, produk & otomasi untuk bisnis yang lebih baik.",
  },

  whatsapp: { tooltip: "Hubungi saya 👋", label: "Chat via WhatsApp" },

  blog: {
    title: "Blog Website, AI & Otomasi Bisnis — Dzikri Ramadhan",
    description: "Catatan tentang membangun website, otomasi AI, dan sistem digital yang benar-benar bekerja untuk bisnis.",
    heading: "Catatan & Artikel",
    intro: "Pemikiran tentang teknologi, sistem, dan otomasi yang memberi dampak bisnis nyata.",
    empty: "Belum ada artikel yang dipublikasikan.",
    readArticle: "Baca artikel",
    allArticles: "Semua artikel",
    draft: "Draft",
    languageNote: "",
  },

  pagination: {
    label: "Navigasi halaman",
    previous: "Halaman sebelumnya",
    next: "Halaman berikutnya",
    page: "Halaman",
  },

  notFound: {
    heading: "Halaman tidak ditemukan",
    copy: "Halaman yang Anda cari tidak ada atau sudah dipindahkan.",
    back: "Kembali ke beranda",
  },
};
