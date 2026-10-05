"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { supabase } from "@/lib/supabase";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { PROJECT_KINDS, type GalleryItem, type ProjectMetric, type ProjectText } from "@/lib/cms-types";

export type ActionResult = { ok: true; id: string } | { ok: false; error: string };

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Re-render every site page (both languages) and the sitemap after content changes
function refreshSite() {
  revalidatePath("/[lang]", "layout");
  revalidatePath("/sitemap.xml");
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const list = (v: unknown) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);

function cleanText(t: Partial<ProjectText> | undefined): ProjectText {
  return {
    title: str(t?.title),
    type: str(t?.type),
    category: str(t?.category),
    summary: str(t?.summary),
    challenge: str(t?.challenge),
    solution: str(t?.solution),
    impact: str(t?.impact),
    role: str(t?.role),
    testimonial: str(t?.testimonial),
    features: list(t?.features),
  };
}

export interface ProjectInput {
  id?: string;
  slug: string;
  sort_order: number;
  hidden: boolean;
  kind: string;
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
}

export async function saveProject(input: ProjectInput): Promise<ActionResult> {
  await requireAdmin();

  const row = {
    slug: str(input.slug).toLowerCase(),
    sort_order: Number.isFinite(input.sort_order) ? Math.round(input.sort_order) : 100,
    hidden: !!input.hidden,
    kind: (PROJECT_KINDS as readonly string[]).includes(input.kind) ? input.kind : "Website",
    status: input.status === "PRIVATE" ? "PRIVATE" : "LIVE",
    client: str(input.client),
    year: str(input.year),
    image_url: str(input.image_url),
    image_contain: !!input.image_contain,
    link: str(input.link) === "#" ? "" : str(input.link),
    tags: list(input.tags),
    metrics: (input.metrics ?? [])
      .map((m) => ({ value: str(m.value), label: str(m.label), labelId: str(m.labelId) }))
      .filter((m) => m.value || m.label),
    gallery: (input.gallery ?? [])
      .map((g) => ({ image: str(g.image), caption: str(g.caption), captionId: str(g.captionId) }))
      .filter((g) => g.image),
    content_en: cleanText(input.content_en),
    content_id: cleanText(input.content_id),
  };

  if (!SLUG.test(row.slug)) return { ok: false, error: "Slug hanya boleh huruf kecil, angka, dan tanda hubung (mis. website-firma-hukum)." };
  if (!row.content_en.title) return { ok: false, error: "Judul (EN) wajib diisi." };
  if (!row.content_en.summary) return { ok: false, error: "Summary (EN) wajib diisi." };
  if (!row.image_url) return { ok: false, error: "Cover image wajib diupload." };
  if (row.link && !/^https?:\/\//.test(row.link)) return { ok: false, error: "Live URL harus diawali http:// atau https://." };

  const db = supabase().from("projects");
  const { data, error } = input.id
    ? await db.update(row).eq("id", input.id).select("id").single()
    : await db.insert(row).select("id").single();
  if (error) {
    return { ok: false, error: error.code === "23505" ? "Slug sudah dipakai project lain." : `Gagal menyimpan: ${error.message}` };
  }
  refreshSite();
  return { ok: true, id: data.id };
}

export async function setProjectHidden(id: string, hidden: boolean): Promise<ActionResult> {
  await requireAdmin();
  const { error } = await supabase().from("projects").update({ hidden }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  refreshSite();
  return { ok: true, id };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  await requireAdmin();
  const { error } = await supabase().from("projects").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  refreshSite();
  return { ok: true, id };
}

export interface ArticleInput {
  id?: string;
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
}

export async function saveArticle(input: ArticleInput): Promise<ActionResult> {
  await requireAdmin();

  const row = {
    slug: str(input.slug).toLowerCase(),
    title: str(input.title),
    excerpt: str(input.excerpt),
    content_html: sanitizeArticleHtml(input.content_html ?? ""),
    cover_image: str(input.cover_image),
    cover_credit: str(input.cover_credit),
    cover_credit_url: str(input.cover_credit_url),
    tags: list(input.tags),
    published_at: /^\d{4}-\d{2}-\d{2}$/.test(str(input.published_at)) ? str(input.published_at) : new Date().toISOString().slice(0, 10),
    draft: !!input.draft,
  };

  if (!row.title) return { ok: false, error: "Judul wajib diisi." };
  if (!SLUG.test(row.slug)) return { ok: false, error: "Slug hanya boleh huruf kecil, angka, dan tanda hubung." };
  if (!row.excerpt) return { ok: false, error: "Ringkasan (excerpt) wajib diisi." };
  if (row.excerpt.length > 300) return { ok: false, error: "Ringkasan maksimal 300 karakter." };
  if (row.cover_credit_url && !/^https?:\/\//.test(row.cover_credit_url)) {
    return { ok: false, error: "Link sumber foto harus diawali http:// atau https://." };
  }

  const db = supabase().from("articles");
  const { data, error } = input.id
    ? await db.update(row).eq("id", input.id).select("id").single()
    : await db.insert(row).select("id").single();
  if (error) {
    return { ok: false, error: error.code === "23505" ? "Slug sudah dipakai artikel lain." : `Gagal menyimpan: ${error.message}` };
  }
  refreshSite();
  return { ok: true, id: data.id };
}

export async function deleteArticle(id: string): Promise<ActionResult> {
  await requireAdmin();
  const { error } = await supabase().from("articles").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  refreshSite();
  return { ok: true, id };
}
