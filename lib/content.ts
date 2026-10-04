import "server-only";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { dateLocales, type Locale } from "@/lib/i18n";

const reader = createReader(process.cwd(), keystaticConfig);

export interface Project {
  slug: string;
  title: string;
  type?: string;
  kind: string;
  category?: string;
  status?: string;
  client?: string;
  year?: string;
  summary: string;
  challenge: string[];
  solution: string[];
  features: string[];
  gallery: { image: string; caption?: string }[];
  impact: string[];
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
const paras = (v: string | null | undefined) => (v ? v.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);

export async function getProjects(lang: Locale): Promise<Project[]> {
  const entries = await reader.collections.projects.all();
  return entries
    .filter(({ entry }) => !entry.hidden)
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map(({ slug, entry }) => {
      // Indonesian falls back to English field by field
      const tr = lang === "id" ? entry.translation : undefined;
      const pick = (en: string, id?: string) => (id && id.trim() ? id : en);
      return {
        slug,
        title: pick(entry.title, tr?.title),
        type: opt(pick(entry.type, tr?.type)),
        kind: entry.kind,
        category: opt(pick(entry.category, tr?.category)),
        status: entry.status,
        client: opt(entry.client),
        year: opt(entry.year),
        summary: pick(entry.summary, tr?.summary),
        challenge: paras(pick(entry.challenge, tr?.challenge)),
        solution: paras(pick(entry.solution, tr?.solution)),
        features: [...(tr && tr.features.length > 0 ? tr.features : entry.features)],
        gallery: entry.gallery
          .filter((g) => g.image)
          .map((g) => ({
            image: g.image as string,
            caption: opt(lang === "id" ? g.captionId || g.caption : g.caption),
          })),
        impact: paras(pick(entry.impact, tr?.impact)),
        metrics: entry.metrics.map((m) => ({
          value: m.value,
          label: lang === "id" && m.labelId ? m.labelId : m.label,
        })),
        tags: [...entry.tags],
        imageUrl: entry.image,
        imageContain: entry.imageContain,
        link: entry.link || "#",
        role: opt(pick(entry.role, tr?.role)),
        testimonial: opt(pick(entry.testimonial, tr?.testimonial)),
      };
    });
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
  const entries = await reader.collections.articles.all();
  return entries
    .filter(({ entry }) => showDrafts || !entry.draft)
    .sort((a, b) => b.entry.publishedAt.localeCompare(a.entry.publishedAt))
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      publishedAt: entry.publishedAt,
      excerpt: entry.excerpt,
      coverImage: entry.coverImage,
      tags: [...entry.tags],
    }));
}

export async function getArticle(slug: string) {
  const entry = await reader.collections.articles.read(slug);
  if (!entry || (entry.draft && !showDrafts)) return null;
  const { node } = await entry.content();
  return { ...entry, slug, node };
}

export function formatDate(iso: string, lang: Locale) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(dateLocales[lang], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
