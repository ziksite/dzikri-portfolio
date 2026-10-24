import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { ArticleShare } from "@/components/ArticleShare";
import { formatDate, getArticle, getArticles } from "@/lib/content";
import { sanitizeArticleHtml } from "@/lib/sanitize";
import { getDictionary } from "@/i18n";
import { isLocale, localePath, SITE_URL } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";
import { articleJsonLd, JsonLd, pageOpenGraph } from "@/lib/seo";

type Params = { params: Promise<{ lang: string; slug: string }> };

// Articles are Indonesian only: /id/blog/<slug> is the page; the old English URLs redirect there
export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ lang: "id", slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "id") return {};
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Dzikri Ramadhan`,
    description: article.excerpt,
    alternates: { canonical: localePath("id", `/blog/${slug}`) },
    openGraph: pageOpenGraph("id", `/blog/${slug}`, {
      title: article.title,
      description: article.excerpt,
      image: article.coverImage ?? undefined,
      type: "article",
      publishedTime: article.publishedAt,
    }),
  };
}

export default async function ArticlePage({ params }: Params) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  if (lang !== "id") permanentRedirect(localePath("id", `/blog/${slug}`));
  const article = await getArticle(slug);
  if (!article) notFound();
  const t = getDictionary(lang).blog;

  const bodyHtml = sanitizeArticleHtml(article.contentHtml);
  const articleUrl = `${SITE_URL}${localePath("id", `/blog/${article.slug}`)}`;

  return (
    <SiteShell lang={lang}>
      <main className="min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 px-4 md:px-6">
        <JsonLd data={articleJsonLd(article)} />
        <article className="max-w-3xl mx-auto">
          <Link
            href={localePath(lang, "/blog")}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8 md:mb-10"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            {t.allArticles}
          </Link>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="text-gray-500 font-bold tracking-widest text-xs uppercase">
              {formatDate(article.publishedAt, lang)}
            </span>
            {article.draft && (
              <span className="px-2.5 py-1 border-2 border-black rounded-full text-[9px] font-bold uppercase tracking-widest">
                {t.draft}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.05] mb-6">
            {article.title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed mb-8 md:mb-10">
            {article.excerpt}
          </p>

          {article.coverImage && (
            <figure className="mb-10 md:mb-12">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] border-[3px] border-black bg-[#0f0f0f]">
                <Image
                  src={article.coverImage}
                  alt={article.coverAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              {article.coverCredit && (
                <figcaption className="mt-2 text-right text-xs text-gray-500 font-medium">
                  Foto:{" "}
                  {article.coverCreditUrl ? (
                    <a href={article.coverCreditUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-black">
                      {article.coverCredit}
                    </a>
                  ) : (
                    article.coverCredit
                  )}{" "}
                  / Unsplash
                </figcaption>
              )}
            </figure>
          )}

          {/* Sanitized HTML from the CMS rich text editor; the <article> wrapper matches the .article-body styles */}
          <div className="article-body">
            <article dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          </div>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t-2 border-black/10">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[10px] font-bold bg-white rounded-[6px] border-2 border-black uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10">
            <ArticleShare url={articleUrl} title={article.title} labels={t} />
          </div>

          {/* Closing CTA on every article; WhatsApp clicks count as leads from "article_cta" */}
          <aside data-lead-location="article_cta" className="mt-12 rounded-[24px] bg-dark text-white p-8 md:p-10 border-[3px] border-black">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight mb-3">{t.ctaHeading}</h2>
            <p className="text-gray-300 font-medium leading-relaxed mb-6">{t.ctaText}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl(t.ctaMessage.replace("{title}", article.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                {t.ctaWhatsapp}
                <ArrowUpRight size={16} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <Link
                href={localePath(lang, "/hire")}
                className="inline-flex items-center px-6 py-4 rounded-xl border-[3px] border-white text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                {t.ctaHire}
              </Link>
            </div>
          </aside>
        </article>
      </main>
    </SiteShell>
  );
}
