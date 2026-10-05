// Row shapes shared by the site, the admin panel and the server actions

export interface ProjectText {
  title: string;
  type: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  role: string;
  testimonial: string;
  features: string[];
}

export interface ProjectMetric {
  value: string;
  label: string;
  labelId: string;
}

export interface GalleryItem {
  image: string;
  caption: string;
  captionId: string;
}

export interface ProjectRow {
  id: string;
  slug: string;
  sort_order: number;
  hidden: boolean;
  kind: string;
  industry: string;
  status: "LIVE" | "PRIVATE";
  client: string;
  year: string;
  image_url: string;
  image_contain: boolean;
  link: string;
  tags: string[];
  metrics: ProjectMetric[];
  gallery: GalleryItem[];
  content_en: ProjectText;
  content_id: ProjectText;
  updated_at: string;
}

export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  cover_image: string;
  cover_credit: string;
  cover_credit_url: string;
  tags: string[];
  published_at: string;
  draft: boolean;
  updated_at: string;
}

export const PROJECT_KINDS = ["AI Automation", "Web App", "Internal System", "Website"] as const;

// Client industries for the /projects filter. English keys; the site translates them (i18n projects.industries).
export const INDUSTRIES = [
  "Consulting & Research",
  "Construction & Engineering",
  "Consumer Services",
  "Defense & Aerospace",
  "Education & Training",
  "Energy",
  "Financial Services",
  "Food & Beverage",
  "Healthcare",
  "HR & Recruitment",
  "Industrial & Manufacturing",
  "IT & Technology",
  "Legal",
  "Marketing & Agency",
  "Media & Advertising",
  "Property",
  "Telecommunications",
  "Transportation & Travel",
] as const;

export const emptyProjectText = (): ProjectText => ({
  title: "",
  type: "",
  category: "",
  summary: "",
  challenge: "",
  solution: "",
  impact: "",
  role: "",
  testimonial: "",
  features: [],
});
