import "server-only";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

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
  description: string;
  imageUrl: string;
  imageContain: boolean;
  link: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  testimonial?: string;
  overview?: string;
  features?: string[];
  role?: string;
}

// Empty strings from the CMS become undefined so components can use simple truthy checks
const opt = (v: string | null | undefined) => v || undefined;

export async function getProjects(): Promise<Project[]> {
  const entries = await reader.collections.projects.all();
  return entries
    .filter(({ entry }) => !entry.hidden)
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0))
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      type: opt(entry.type),
      kind: entry.kind,
      category: opt(entry.category),
      status: entry.status,
      client: opt(entry.client),
      year: opt(entry.year),
      description: entry.description,
      imageUrl: entry.image,
      imageContain: entry.imageContain,
      link: entry.link || "#",
      metrics: [...entry.metrics],
      tags: [...entry.tags],
      testimonial: opt(entry.testimonial),
      overview: opt(entry.overview),
      features: entry.features.length > 0 ? [...entry.features] : undefined,
      role: opt(entry.role),
    }));
}

// A project plus its neighbours in carousel order, for prev/next navigation on the detail page
export async function getProjectWithNeighbors(slug: string) {
  const projects = await getProjects();
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

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
