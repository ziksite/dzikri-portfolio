"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary } from "@/i18n";
import { localePath, type Locale } from "@/lib/i18n";

// 404 pages don't receive params, so the locale is read from the URL
export function NotFoundContent() {
  const pathname = usePathname() ?? "/";
  const lang: Locale = pathname === "/id" || pathname.startsWith("/id/") ? "id" : "en";
  const t = getDictionary(lang).notFound;

  return (
    <main lang={lang} className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">404</p>
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">{t.heading}</h1>
      <p className="text-gray-600 font-medium mb-8 max-w-md">{t.copy}</p>
      <Link
        href={localePath(lang, "/")}
        className="inline-flex items-center gap-2 bg-black text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={3} />
        {t.back}
      </Link>
    </main>
  );
}
