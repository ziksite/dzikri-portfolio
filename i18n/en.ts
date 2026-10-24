// Site copy (English). Source: "copywroting baru.txt" brief.
// Text wrapped in **double asterisks** renders bold where the component supports it.
export const en = {
  meta: {
    title: "Dzikri Ramadhan — Web Developer & AI Automation",
    description:
      "Custom websites, web apps and AI-powered business automation, engineered around your business problem, not a template. Remote & freelance from Indonesia (GMT+7).",
    siteName: "Dzikri Ramadhan",
    ogLocale: "en_US",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
  },

  hero: {
    eyebrow: "Hi, I'm",
    role: "Web Developer & AI Automation",
    handsOn: "I plan it, build it, and ship it.",
    supporting:
      "I build digital systems, products, and automation that turn business challenges into scalable solutions.",
    labels: [
      "Business × Technology",
      "Digital Transformation",
      "Systems & Automation",
      "Product & Innovation",
      "Strategy → Execution",
    ],
    ctaPrimary: "View my work",
    ctaSecondary: "Let's connect",
  },

  // `live` shows a green availability dot
  quickInfo: [
    { label: "Focus", value: "Web Development & AI Automation", live: false },
    { label: "Building", value: "Websites · Web Apps · Automation", live: false },
    { label: "Open to", value: "Remote & freelance projects", live: true },
    { label: "Based in", value: "Jakarta, Indonesia · GMT+7", live: false },
  ],

  about: {
    heading: "About Me",
    greeting: "Hi, I'm Dzikri.",
    paragraphs: [
      "I'm a web developer who builds **websites, business apps and AI automation**: systems that save a team hours every week, not just look good.",
      "As Head of New Technology at a digital agency, I build systems people use every day: an ERP, an HR system, a learning platform, and AI that screens candidates and answers sales chats on WhatsApp.",
      "I handle the whole thing myself, from understanding the business problem to design, development and launch. So you work with **one person who owns the result**.",
    ],
    status: "Available",
    profileCta: "Let's talk",
  },

  services: {
    heading: "Services",
    intro: "From websites to the systems that run your business, built for your needs, not from a template.",
    cta: "Discuss this",
    more: "Work with me",
    whatsappMessage: "Hi Dzikri, I'm interested in: {service}",
    items: [
      {
        id: "website",
        title: "Website Design & Development",
        text: "Company profiles, landing pages, online stores, all the way to fully custom websites for your business.",
      },
      {
        id: "webapp",
        title: "Business Apps & Internal Systems",
        text: "Apps to run your business: POS, inventory, booking, customer data and reports. No more spreadsheets.",
      },
      {
        id: "automation",
        title: "AI Automation",
        text: "AI that does the repetitive work for you: screening CVs and leads, answering WhatsApp chats, writing reports and documents, and entering data.",
      },
      {
        id: "consulting",
        title: "Website & Digital Consulting",
        text: "Website not bringing in customers? I'll review it and give you clear steps to fix it.",
      },
    ],
  },

  hire: {
    title: "Freelance Web Developer & AI Automation in Indonesia — Dzikri Ramadhan",
    description:
      "Hire a freelance web developer for websites, business apps and AI automation. Based in Jakarta (GMT+7), remote-friendly, working in English and Indonesian.",
    eyebrow: "Available for remote & freelance projects",
    heading: "Freelance Web Developer & AI Automation",
    intro:
      "I'm Dzikri, a web developer based in Jakarta. I build websites, business apps and AI automation for companies in Indonesia and abroad, from the first brief to launch.",
    ctaPrimary: "Chat on WhatsApp",
    ctaSecondary: "Email me",
    whatsappMessage: "Hi Dzikri, I'd like to discuss a freelance project.",
    facts: [
      { value: "{count}+", label: "Projects shipped" },
      { value: "EN / ID", label: "Working languages" },
      { value: "GMT+7", label: "Remote-friendly" },
      { value: "End to end", label: "Plan, build & ship" },
    ],
  },

  techStack: {
    heading: "Tech Stack",
    intro: "Tools and technologies I use to turn ideas into reliable digital solutions.",
    groups: [
      { name: "Development", items: ["Next.js", "React", "PHP", "Laravel", "WordPress"] },
      { name: "Infrastructure", items: ["Docker", "Linux", "VPS", "Git", "CI/CD"] },
      { name: "Data & Systems", items: ["MySQL", "SQL", "APIs", "CRM", "Analytics"] },
      { name: "Design & Product", items: ["Figma", "UI/UX", "Product Design"] },
      { name: "Automation & AI", items: ["AI Tools", "Workflow Automation", "API Integration"] },
    ],
  },

  projects: {
    heading: "Selected Works",
    intro: "A selection of digital products, systems, and technology initiatives I've worked on.",
    viewAll: "View all projects",
    filterLabel: "Filter projects by type",
    industryFilterLabel: "Filter projects by industry",
    allIndustries: "All industries",
    noResults: "No projects match these filters.",
    resetFilters: "Reset filters",
    industries: {
      "Agriculture": "Agriculture",
      "Automotive": "Automotive",
      "Beauty & Wellness": "Beauty & Wellness",
      "Consulting & Research": "Consulting & Research",
      "Construction & Engineering": "Construction & Engineering",
      "Consumer Services": "Consumer Services",
      "Creative & Printing": "Creative & Printing",
      "Defense & Aerospace": "Defense & Aerospace",
      "Education & Training": "Education & Training",
      "Energy": "Energy",
      "Events & Weddings": "Events & Weddings",
      "Financial Services": "Financial Services",
      "Food & Beverage": "Food & Beverage",
      "Healthcare": "Healthcare",
      "Hospitality": "Hospitality",
      "HR & Recruitment": "HR & Recruitment",
      "Industrial & Manufacturing": "Industrial & Manufacturing",
      "IT & Technology": "IT & Technology",
      "Legal": "Legal",
      "Logistics": "Logistics",
      "Marketing & Agency": "Marketing & Agency",
      "Media & Advertising": "Media & Advertising",
      "Property": "Property",
      "Retail & E-commerce": "Retail & E-commerce",
      "Sports & Fitness": "Sports & Fitness",
      "Telecommunications": "Telecommunications",
      "Transportation & Travel": "Transportation & Travel",
    } as Record<string, string>,
    allProjects: "All Projects",
    kinds: {
      "AI Automation": "AI Automation",
      "Web App": "Web Apps",
      "Internal System": "Internal Systems",
      Website: "Websites",
    } as Record<string, string>,
    disclaimer:
      "Client names and brand identities are kept confidential. Where shown, logos and identifying details in screenshots are intentionally blurred.",
    impact: "Impact",
    viewCaseStudy: "View case study",
    previous: "Previous project",
    next: "Next project",
    goToSlide: "Go to slide",
  },

  projectsPage: {
    title: "Website & Automation Projects — Dzikri Ramadhan",
    heading: "All Projects",
    description: "Portfolio of websites, web apps, internal systems, and AI automation built for real businesses.",
  },

  caseStudy: {
    allProjects: "All projects",
    challenge: "The Challenge",
    solution: "The Solution",
    keyFeatures: "Key Features",
    gallery: "Feature Gallery",
    mainModules: "Main Modules",
    industry: "Industry",
    techStack: "Technology",
    role: "My Role",
    client: "Client",
    category: "Category",
    year: "Year",
    status: "Status",
    viewLive: "View live project",
    discuss: "Discuss a similar project",
    requestDemo: "Request a private demo",
    previous: "Previous",
    next: "Next",
    moreProjects: "More projects",
    // {title} is replaced with the project title
    whatsappMessage: 'Hi Dzikri, I saw "{title}" on your portfolio and would like to discuss a similar project.',
    lightbox: {
      close: "Close gallery",
      previous: "Previous image",
      next: "Next image",
      open: "Open image",
    },
  },

  journey: {
    heading: "My Journey",
    intro: "A journey from building digital products to leading technology and innovation initiatives.",
    items: [
      {
        year: "2025 - Present",
        stage: "Technology & Innovation",
        role: "Head of New Technology",
        company: "Banana Digital Boost",
        jobType: "Full Time",
        description:
          "Leading technology direction, roadmap, and digital transformation initiatives — across systems, digital products, automation, and AI — while staying hands-on in building the company's web platforms.",
        tags: ["Tech Strategy", "Leadership", "Digital Transformation"],
      },
      {
        year: "2025 - Present",
        stage: "IT Engineer",
        role: "IT Engineer",
        company: "PT Danapati Boga Nusantara | Foodstocks",
        jobType: "Full Time",
        description:
          "Taking broader responsibility across systems, infrastructure, development, and business needs — building internal systems and automation, and integrating operational and logistics workflows.",
        tags: ["Internal Systems", "Automation", "System Integration"],
      },
      {
        year: "2024",
        stage: "IT Network",
        role: "IT Network",
        company: "PT Telkom Akses",
        jobType: "Internship",
        description:
          "Built stronger foundations in infrastructure and networking — designing telecommunication network master plans, planning last-mile expansion, and documenting network inventory.",
        tags: ["Infrastructure", "Network Design"],
      },
      {
        year: "2023 - 2024",
        stage: "UI/UX Design",
        role: "UI/UX Design",
        company: "Garuda Maintenance Facility (GMF) AeroAsia",
        jobType: "Internship",
        description:
          "Expanded into user experience, interface design, and digital product thinking — designing solutions that bridge business goals and user needs.",
        tags: ["UI/UX", "Product Thinking", "Figma"],
      },
      {
        year: "2021 - 2023",
        stage: "IT Foundations",
        role: "Computer Lab Assistant",
        company: "Universitas Serang Raya (UNSERA)",
        jobType: "Contract",
        description:
          "Supported students and lecturers technically while maintaining lab hardware, software, and device security — hands-on grounding in day-to-day IT operations.",
        tags: ["IT Operations", "Support"],
      },
      {
        year: "2020 - 2022",
        stage: "Website Developer",
        role: "Website Developer",
        company: "Freelance",
        jobType: "Freelance",
        description:
          "Started building websites and exploring the fundamentals of digital technology — delivering corporate and campaign sites with attention to speed, security, and SEO.",
        tags: ["WordPress", "Web Performance", "SEO"],
      },
    ],
  },

  contact: {
    headingLine1: "Let's Build",
    headingLine2: "Something Useful.",
    copy: "Have a business challenge, digital idea, or technology problem worth solving? Let's talk.",
    ctaPrimary: "Start a conversation",
    ctaSecondary: "View my work",
    emailLabel: "Email",
    locationLabel: "Location",
    location: "Jakarta, Indonesia",
    form: {
      name: "Your Name",
      namePlaceholder: "John Doe",
      company: "Company",
      companyPlaceholder: "Company name",
      topic: "Topic",
      topicPlaceholder: "Digital system, automation, website...",
      message: "Message",
      messagePlaceholder: "Tell me about the challenge you want to solve...",
      submit: "Start a conversation",
      note: "Opens WhatsApp with your message ready to send.",
      whatsappIntro: "Hi Dzikri,",
    },
  },

  footer: {
    tagline: "Web Developer & AI Automation",
    sub: "Building systems, products & automation for better business.",
    hire: "Hire me",
  },

  whatsapp: { tooltip: "Let's talk 👋", label: "Chat on WhatsApp" },

  blog: {
    title: "Blog: Web, AI & Business Automation — Dzikri Ramadhan",
    description: "Notes on building websites, AI automation, and digital systems that actually work for the business.",
    heading: "Notes & Articles",
    intro: "Thinking on technology, systems, and automation that create real business impact.",
    empty: "No articles published yet.",
    readArticle: "Read article",
    allCategories: "All",
    categoryLabel: "Filter articles by category",
    allArticles: "All articles",
    draft: "Draft",
    ctaHeading: "Need help applying this to your business?",
    ctaText: "I help businesses build websites, apps and AI automation their teams actually use. Tell me where you are, and I'll help you map the first step.",
    ctaWhatsapp: "Chat on WhatsApp",
    ctaHire: "See how I can help",
    ctaMessage: "Hi Dzikri, I just read \"{title}\" and would like to discuss my business.",
    share: "Share this article",
    copyLink: "Copy link",
    copied: "Copied!",
    languageNote: "Articles are written in Bahasa Indonesia.",
  },

  pagination: {
    label: "Pagination",
    previous: "Previous page",
    next: "Next page",
    page: "Page",
  },

  notFound: {
    heading: "Page not found",
    copy: "The page you're looking for doesn't exist or has moved.",
    back: "Back to home",
  },
};

export type Dictionary = typeof en;
