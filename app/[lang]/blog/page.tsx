import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { BlogGrid } from "@/components/BlogGrid";
import { formatDate, getArticles } from "@/lib/content";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).blog;
  return {
    title: t.title,
    description: t.description,
    alternates: languageAlternates(lang, "/blog"),
  };
}

export default async function BlogIndex({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.blog;
  const articles = (await getArticles()).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    coverImage: a.coverImage,
    tags: a.tags,
    date: formatDate(a.publishedAt, lang),
  }));
  const [headingFirst, ...headingRest] = t.heading.split(" ");

  return (
    <SiteShell lang={lang}>
      <main className="min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-8">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
              {headingFirst} <br className="hidden md:block" /> {headingRest.join(" ")}
            </h1>
            <div className="flex flex-col md:items-end gap-3 max-w-sm">
              <p className="text-gray-500 font-medium md:text-right uppercase tracking-widest text-xs leading-relaxed">
                {t.intro}
              </p>
              {t.languageNote && (
                <p className="inline-flex items-center gap-2 text-xs font-bold md:text-right">
                  <span className="px-2 py-0.5 rounded-md bg-black text-white text-[10px] font-black tracking-widest">ID</span>
                  {t.languageNote}
                </p>
              )}
            </div>
          </div>

          {articles.length === 0 ? (
            <p className="text-gray-500 font-medium">{t.empty}</p>
          ) : (
            <BlogGrid articles={articles} t={t} pagination={dict.pagination} />
          )}
        </div>
      </main>
    </SiteShell>
  );
}
