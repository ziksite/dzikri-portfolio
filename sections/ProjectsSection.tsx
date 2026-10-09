"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowUpRight, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import type { Project } from "@/lib/content";
import type { Dictionary } from "@/i18n";
import { localePath, type Locale } from "@/lib/i18n";

export function ProjectsSection({
  projects,
  lang,
  t,
}: {
  projects: Project[];
  lang: Locale;
  t: Dictionary["projects"];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const [headingFirst, ...headingRest] = t.heading.split(" ");

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="bg-dark py-16 md:py-24 lg:py-32 px-4 md:px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 lg:mb-20 gap-4 md:gap-8">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white">
            {headingFirst} <br className="hidden md:block" /> {headingRest.join(" ")}
          </h2>
          <div className="flex flex-col md:items-end gap-4 md:gap-6">
            <p className="text-gray-400 font-medium max-w-sm md:text-right uppercase tracking-widest text-xs leading-relaxed">
              {t.intro}
            </p>
            <Link
              href={localePath(lang, "/projects")}
              className="group inline-flex items-center gap-2 text-white text-[11px] md:text-xs font-black uppercase tracking-widest border-b-2 border-white/30 hover:border-white pb-1 transition-colors w-max"
            >
              {t.viewAll}
              <ArrowUpRight size={14} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Confidentiality disclaimer */}
        <p className="flex items-start gap-2 text-white/40 text-[11px] md:text-xs font-medium tracking-wide leading-relaxed mb-6 md:mb-8 max-w-2xl">
          <Lock size={13} className="shrink-0 mt-0.5" />
          <span>{t.disclaimer}</span>
        </p>

        <div
          className="relative w-full overflow-hidden pt-2 rounded-[24px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.87,_0,_0.13,_1)] w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.slug} className="w-full shrink-0">
                <ProjectCard
                  project={project}
                  href={localePath(lang, `/projects/${project.slug}`)}
                  labels={{ impact: t.impact, viewCaseStudy: t.viewCaseStudy }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between md:justify-end items-center gap-4 mt-8 md:mt-12 w-full relative">
          {/* Mobile counter (dots are too many on small screens) */}
          <p className="md:hidden text-white/60 text-xs font-bold tracking-widest">
            {currentIndex + 1} / {projects.length}
          </p>
          {/* Dots (desktop only) */}
          <div className="hidden md:flex items-center gap-2 md:absolute md:left-1/2 md:-translate-x-1/2">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`${t.goToSlide} ${i + 1}`}
                className={`h-3 rounded-full transition-all duration-300 touch-manipulation ${i === currentIndex ? "bg-white w-8" : "bg-white/20 w-3 hover:bg-white/50"}`}
              />
            ))}
          </div>

          <div className="flex gap-3 md:gap-4">
            <button
              type="button"
              onClick={prevSlide}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 touch-manipulation"
              aria-label={t.previous}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 touch-manipulation"
              aria-label={t.next}
            >
              <ChevronRight size={22} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
