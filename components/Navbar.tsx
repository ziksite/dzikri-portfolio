"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { localeLabels, localePath, locales, stripLocale, type Locale } from "@/lib/i18n";

export function Navbar({ lang, t }: { lang: Locale; t: Dictionary["nav"] }) {
  const pathname = usePathname() ?? "/";
  const currentPath = stripLocale(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Section links point at the home page anchors; PROJECTS and BLOG are their own pages
  const navLinks = [
    { name: t.home, href: localePath(lang, "/") + "#home", page: null },
    { name: t.about, href: localePath(lang, "/") + "#about", page: null },
    { name: t.projects, href: localePath(lang, "/projects"), page: "/projects" },
    { name: t.blog, href: localePath(lang, "/blog"), page: "/blog" },
    { name: t.contact, href: localePath(lang, "/") + "#contact", page: null },
  ];
  const isActive = (page: string | null) => !!page && currentPath.startsWith(page);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languageSwitch = (
    <div
      role="group"
      aria-label={t.switchLanguage}
      className="flex items-center rounded-full border-2 border-foreground bg-white p-0.5"
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={localePath(l, currentPath)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          onClick={() => setMobileMenuOpen(false)}
          className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest transition-colors",
            l === lang ? "bg-foreground text-white" : "text-foreground hover:bg-gray-100"
          )}
        >
          {localeLabels[l]}
        </Link>
      ))}
    </div>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled || mobileMenuOpen ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href={localePath(lang, "/") + "#home"} className="z-10 flex items-center gap-2">
          <Image src="/images/logo.png" alt="Dzikri Logo" width={120} height={38} className="h-10 w-auto object-contain" />
          <span className="text-xl font-black tracking-tighter inline-block">ZIKSITE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 absolute left-1/2 -translate-x-1/2 bg-card/50 backdrop-blur-md px-6 py-2 rounded-full border border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.page) ? "page" : undefined}
              className={cn(
                "text-xs font-semibold tracking-widest hover:text-gray-500 transition-colors uppercase whitespace-nowrap",
                isActive(link.page) && "font-black underline underline-offset-[6px] decoration-2"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block z-10">{languageSwitch}</div>

        {/* Mobile menu button */}
        <div className="lg:hidden z-10 flex items-center gap-3">
          {languageSwitch}
          <button
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-xl">
          <nav className="flex flex-col items-center py-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(link.page) ? "page" : undefined}
                className={cn(
                  "text-lg font-bold tracking-widest hover:text-gray-500 transition-colors uppercase",
                  isActive(link.page) && "font-black underline underline-offset-8 decoration-2"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
