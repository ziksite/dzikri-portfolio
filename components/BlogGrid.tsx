"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { localePath } from "@/lib/i18n";
import { Pagination } from "@/components/Pagination";
import { ARTICLE_CATEGORIES } from "@/lib/cms-types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

export type BlogCard = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  date: string; // already formatted for the page language
};

// Articles are Indonesian only, so cards always link to /id/blog/<slug>
export function BlogGrid({
  articles,
  t,
  pagination,
}: {
  articles: BlogCard[];
  t: Dictionary["blog"];
  pagination: Dictionary["pagination"];
}) {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const topRef = useRef<HTMLDivElement>(null);
  const filtered = category ? articles.filter((a) => a.category === category) : articles;
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  // Only categories that have articles get a chip
  const categories = ARTICLE_CATEGORIES.filter((c) => articles.some((a) => a.category === c));

  const pickCategory = (c: string) => {
    setCategory(c);
    setPage(1);
  };

  const goToPage = (n: number) => {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chip = (active: boolean) =>
    cn(
      "px-4 py-2 rounded-full border-[3px] border-black text-[11px] font-black uppercase tracking-widest transition-colors",
      active ? "bg-black text-white" : "bg-white hover:bg-gray-100"
    );

  return (
    <>
      {categories.length > 1 && (
        <div role="group" aria-label={t.categoryLabel} className="flex flex-wrap gap-2 mb-8 md:mb-10">
          <button type="button" aria-pressed={!category} onClick={() => pickCategory("")} className={chip(!category)}>
            {t.allCategories} ({articles.length})
          </button>
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={category === c} onClick={() => pickCategory(c)} className={chip(category === c)}>
              {c} ({articles.filter((a) => a.category === c).length})
            </button>
          ))}
        </div>
      )}
      <div ref={topRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 scroll-mt-28">
        {visible.map((article) => (
          <Link
            key={article.slug}
            href={localePath("id", `/blog/${article.slug}`)}
            hrefLang="id"
            className="group flex flex-col bg-white border-[3px] border-black rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            {article.coverImage && (
              <div className="relative aspect-[16/9] border-b-[3px] border-black bg-[#0f0f0f] overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt=""
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="flex flex-col flex-1 p-6 md:p-7">
              <span className="text-gray-500 font-bold tracking-widest text-[10px] uppercase mb-3">
                {article.category ? `${article.category} · ` : ""}
                {article.date}
              </span>
              <h2 lang="id" className="text-xl md:text-2xl font-black uppercase leading-tight mb-3">
                {article.title}
              </h2>
              <p lang="id" className="text-gray-600 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                {article.excerpt}
              </p>
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-[9px] font-bold bg-[#f5f5f5] rounded-[6px] border-2 border-black/10 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                {t.readArticle}
                <ArrowUpRight
                  size={14}
                  strokeWidth={3}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Pagination page={page} pageCount={pageCount} onChange={goToPage} t={pagination} />
    </>
  );
}
