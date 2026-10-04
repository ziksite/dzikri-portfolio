"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

// Absolute "/#..." hrefs so the links also work from /blog pages
const sectionLinks = [
  { name: "HOME", href: "/#home" },
  { name: "ABOUT", href: "/#about" },
  { name: "PROJECTS", href: "/#projects" },
  { name: "JOURNEY", href: "/#journey" },
  { name: "CONTACT", href: "/#contact" },
];

export function Navbar({ showBlog = false }: { showBlog?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // The blog link only appears once at least one article is published
  const navLinks = showBlog
    ? [...sectionLinks.slice(0, 4), { name: "BLOG", href: "/blog" }, sectionLinks[4]]
    : sectionLinks;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        scrolled || mobileMenuOpen ? "bg-background/80 backdrop-blur-md border-border py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/#home" className="z-10 flex items-center gap-2">
          <Image src="/images/logo.png" alt="Dzikri Logo" width={120} height={38} className="h-10 w-auto object-contain" />
          <span className="text-xl font-black tracking-tighter inline-block">ZIKSITE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2 bg-card/50 backdrop-blur-md px-6 py-2 rounded-full border border-border">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-semibold tracking-widest hover:text-gray-500 transition-colors uppercase"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block w-[100px]"></div>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-10 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-xl">
          <nav className="flex flex-col items-center py-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold tracking-widest hover:text-gray-500 transition-colors uppercase"
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
