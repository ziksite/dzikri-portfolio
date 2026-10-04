import type { MetadataRoute } from "next";
import { getArticles, getProjects } from "@/lib/content";
import { localePath, locales, SITE_URL, type Locale } from "@/lib/i18n";

type Entry = MetadataRoute.Sitemap[number];

// One entry per language version, each listing its siblings as hreflang alternates
function localized(path: string, langs: readonly Locale[], extra: Omit<Entry, "url" | "alternates">): Entry[] {
  const languages = Object.fromEntries(langs.map((l) => [l, `${SITE_URL}${localePath(l, path)}`]));
  return langs.map((lang) => ({
    url: `${SITE_URL}${localePath(lang, path)}`,
    alternates: { languages },
    ...extra,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articlesEn, articlesId] = await Promise.all([
    getProjects("en"),
    getArticles("en"),
    getArticles("id"),
  ]);

  const articleSlugs = new Map<string, Locale[]>();
  for (const [lang, list] of [["en", articlesEn], ["id", articlesId]] as const) {
    for (const a of list) articleSlugs.set(a.slug, [...(articleSlugs.get(a.slug) ?? []), lang]);
  }

  return [
    ...localized("/", locales, { lastModified: new Date(), changeFrequency: "monthly", priority: 1 }),
    ...localized("/projects", locales, { changeFrequency: "monthly", priority: 0.9 }),
    ...projects.flatMap((p) =>
      localized(`/projects/${p.slug}`, locales, { changeFrequency: "yearly", priority: 0.8 })
    ),
    ...localized("/blog", locales, { changeFrequency: "weekly", priority: 0.8 }),
    ...[...articleSlugs].flatMap(([slug, langs]) =>
      localized(`/blog/${slug}`, langs, { changeFrequency: "monthly", priority: 0.7 })
    ),
  ];
}
