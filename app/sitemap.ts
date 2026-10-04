import type { MetadataRoute } from "next";
import { getArticles, getProjects } from "@/lib/content";

const SITE = "https://dzikri.ziksite.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, projects] = await Promise.all([getArticles(), getProjects()]);

  const work: MetadataRoute.Sitemap = [
    { url: `${SITE}/projects`, changeFrequency: "monthly", priority: 0.9 },
    ...projects.map((p) => ({
      url: `${SITE}/projects/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];

  const blog: MetadataRoute.Sitemap =
    articles.length > 0
      ? [
          { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.8 },
          ...articles.map((a) => ({
            url: `${SITE}/blog/${a.slug}`,
            lastModified: a.publishedAt,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
        ]
      : [];

  return [{ url: SITE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }, ...work, ...blog];
}
