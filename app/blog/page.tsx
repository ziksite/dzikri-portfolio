import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { formatDate, getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog - Dzikri Ramadhan",
  description: "Notes on web development, AI automation, and building digital systems for business.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const articles = await getArticles();

  return (
    <>
      <Navbar showBlog />
      <main className="min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4 md:gap-8">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
              Notes & <br className="hidden md:block" /> Articles
            </h1>
            <p className="text-gray-500 font-medium max-w-sm md:text-right uppercase tracking-widest text-xs leading-relaxed">
              Lessons from building websites, internal systems, and AI automation.
            </p>
          </div>

          {articles.length === 0 ? (
            <p className="text-gray-500 font-medium">No articles published yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col bg-white border-[3px] border-black rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  {article.coverImage && (
                    <div className="relative aspect-[16/9] border-b-[3px] border-black bg-[#0f0f0f]">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-6 md:p-7">
                    <span className="text-gray-500 font-bold tracking-widest text-[10px] uppercase mb-3">
                      {formatDate(article.publishedAt)}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black uppercase leading-tight mb-3">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                      Read article
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
          )}
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
