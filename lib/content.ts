import "server-only";
import { supabase } from "@/lib/supabase";
import type { ArticleRow, ProjectRow, ProjectText } from "@/lib/cms-types";
import { dateLocales, type Locale } from "@/lib/i18n";

// Pages are rendered statically and re-rendered on demand when the CMS saves (revalidatePath),
// so these queries run at build time and after each edit, not on every visit.

export interface Project {
  slug: string;
  title: string;
  type?: string;
  kind: string;
  industry?: string;
  category?: string;
  status?: string;
  client?: string;
  year?: string;
  summary: string;
  challenge: string[];
  solution: string[];
  features: string[];
  gallery: { image: string; caption?: string }[];
  metrics: { value: string; label: string }[];
  tags: string[];
  imageUrl: string;
  imageContain: boolean;
  link: string;
  role?: string;
  testimonial?: string;
}

// Empty strings from the CMS become undefined so components can use simple truthy checks
const opt = (v: string | null | undefined) => v || undefined;
const paras = (v: string | null | undefined) =>
  v ? v.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : [];

function toProject(row: ProjectRow, lang: Locale): Project {
  const en = row.content_en;
  const id = lang === "id" ? row.content_id : undefined;
  // Indonesian falls back to English field by field
  const pick = (key: Exclude<keyof ProjectText, "features">) => {
    const value = id?.[key];
    return value && value.trim() ? value : en[key] ?? "";
  };
  return {
    slug: row.slug,
    title: pick("title"),
    type: opt(pick("type")),
    kind: row.kind,
    industry: opt(row.industry),
    category: opt(pick("category")),
    status: row.status,
    client: opt(row.client),
    year: opt(row.year),
    summary: pick("summary"),
    challenge: paras(pick("challenge")),
    solution: paras(pick("solution")),
    features: id?.features?.length ? id.features : en.features ?? [],
    gallery: (row.gallery ?? [])
      .filter((g) => g.image)
      .map((g) => ({ image: g.image, caption: opt(lang === "id" ? g.captionId || g.caption : g.caption) })),
    metrics: (row.metrics ?? []).map((m) => ({ value: m.value, label: lang === "id" && m.labelId ? m.labelId : m.label })),
    tags: row.tags ?? [],
    imageUrl: row.image_url,
    imageContain: row.image_contain,
    link: row.link || "#",
    role: opt(pick("role")),
    testimonial: opt(pick("testimonial")),
  };
}

export async function getProjects(lang: Locale): Promise<Project[]> {
  const { data, error } = await supabase()
    .from("projects")
    .select("*")
    .eq("hidden", false)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Failed to load projects: ${error.message}`);
  return (data as ProjectRow[]).map((row) => toProject(row, lang));
}

// A project plus its neighbours in carousel order, for prev/next navigation on the detail page
export async function getProjectWithNeighbors(lang: Locale, slug: string) {
  const projects = await getProjects(lang);
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  const at = (n: number) => projects[(n + projects.length) % projects.length];
  return { project: projects[i], prev: at(i - 1), next: at(i + 1) };
}

export interface ArticleSummary {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  coverImage: string | null;
  tags: string[];
}

// Drafts are visible in `next dev` so they can be previewed, never in production builds
const showDrafts = process.env.NODE_ENV === "development";

// Articles are Indonesian only; both language versions of the site list the same entries
export async function getArticles(): Promise<ArticleSummary[]> {
  let query = supabase()
    .from("articles")
    .select("slug, title, published_at, excerpt, cover_image, tags, draft")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });
  if (!showDrafts) query = query.eq("draft", false);
  const { data, error } = await query;
  if (error) throw new Error(`Failed to load articles: ${error.message}`);
  return (data as ArticleRow[]).map((a) => ({
    slug: a.slug,
    title: a.title,
    publishedAt: a.published_at,
    excerpt: a.excerpt,
    coverImage: a.cover_image || null,
    tags: a.tags ?? [],
  }));
}

export async function getArticle(slug: string) {
  const { data, error } = await supabase().from("articles").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`Failed to load article: ${error.message}`);
  const a = data as ArticleRow | null;
  if (!a || (a.draft && !showDrafts)) return null;
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    contentHtml: a.content_html,
    coverImage: a.cover_image || null,
    coverCredit: a.cover_credit,
    coverCreditUrl: a.cover_credit_url,
    tags: a.tags ?? [],
    publishedAt: a.published_at,
    draft: a.draft,
  };
}

export function formatDate(iso: string, lang: Locale) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(dateLocales[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
