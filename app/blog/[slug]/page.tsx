import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Markdoc from "@markdoc/markdoc";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { formatDate, getArticle, getArticles } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return {};
  const images = article.coverImage ? [{ url: article.coverImage }] : undefined;
  return {
    title: `${article.title} - Dzikri Ramadhan`,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images,
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();

  const body = Markdoc.renderers.react(Markdoc.transform(article.node), React);

  return (
    <>
      <Navbar showBlog />
      <main className="min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 px-4 md:px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8 md:mb-10"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            All articles
          </Link>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className="text-gray-500 font-bold tracking-widest text-xs uppercase">
              {formatDate(article.publishedAt)}
            </span>
            {article.draft && (
              <span className="px-2.5 py-1 border-2 border-black rounded-full text-[9px] font-bold uppercase tracking-widest">
                Draft
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
            <div className="relative aspect-[16/9] mb-10 md:mb-12 overflow-hidden rounded-[24px] border-[3px] border-black bg-[#0f0f0f]">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <div className="article-body">{body}</div>

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
        </article>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
