"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown, Lock } from "lucide-react";
import type { Project } from "@/lib/content";

// Pluralize a kind label for the filter tabs ("Website" -> "Websites")
const pluralize = (label: string) => (label.endsWith("s") ? label : `${label}s`);

export function ProjectsSection({ projects: allProjects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const touchStartX = useRef<number | null>(null);

  // Build the tab list dynamically from whatever kinds exist in the data
  const kinds = Array.from(new Set(allProjects.map((p) => p.kind)));
  const filters = ["All", ...kinds];

  const projects =
    activeFilter === "All" ? allProjects : allProjects.filter((p) => p.kind === activeFilter);

  const selectFilter = (filter: string) => {
    setActiveFilter(filter);
    setCurrentIndex(0);
  };

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
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="bg-dark py-16 md:py-24 lg:py-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 lg:mb-20 gap-4 md:gap-8">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white">
            Selected <br className="hidden md:block" /> Works
          </h2>
          <div className="flex flex-col md:items-end gap-4 md:gap-6">
            <p className="text-gray-400 font-medium max-w-sm md:text-right uppercase tracking-widest text-xs leading-relaxed">
              Real projects. Real results. Built with precision and purpose.
            </p>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-white text-[11px] md:text-xs font-black uppercase tracking-widest border-b-2 border-white/30 hover:border-white pb-1 transition-colors w-max"
            >
              View all projects
              <ArrowUpRight size={14} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Filter Dropdown */}
        {filters.length > 1 && (
          <div className="relative inline-block mb-8 md:mb-12">
            <select
              value={activeFilter}
              onChange={(e) => selectFilter(e.target.value)}
              aria-label="Filter projects by type"
              className="appearance-none bg-[#1A1A1A] text-white border-2 border-white/20 hover:border-white/50 focus:border-white rounded-full pl-5 pr-12 py-2.5 md:py-3 text-[11px] md:text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none transition-colors duration-300"
            >
              {filters.map((filter) => (
                <option key={filter} value={filter} className="bg-[#1A1A1A] text-white">
                  {filter === "All" ? "All Projects" : pluralize(filter)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              strokeWidth={3}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none"
            />
          </div>
        )}

        {/* Confidentiality disclaimer */}
        <p className="flex items-start gap-2 text-white/40 text-[11px] md:text-xs font-medium tracking-wide leading-relaxed mb-6 md:mb-8 max-w-2xl">
          <Lock size={13} className="shrink-0 mt-0.5" />
          <span>
            Client names and brand identities are kept confidential. Where shown, logos and
            identifying details in screenshots are intentionally blurred.
          </span>
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
            {projects.map((project, index) => (
              <div key={project.slug} className="w-full shrink-0">
                <ProjectCard
                  index={index}
                  title={project.title}
                  type={project.type}
                  status={project.status}
                  client={project.client}
                  year={project.year}
                  testimonial={project.testimonial}
                  description={project.description}
                  metrics={project.metrics}
                  tags={project.tags}
                  imageUrl={project.imageUrl}
                  href={`/projects/${project.slug}`}
                  imageContain={project.imageContain}
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
                aria-label={`Go to slide ${i + 1}`}
                className={`h-3 rounded-full transition-all duration-300 touch-manipulation ${i === currentIndex ? 'bg-white w-8' : 'bg-white/20 w-3 hover:bg-white/50'}`}
              />
            ))}
          </div>

          <div className="flex gap-3 md:gap-4">
            <button
              type="button"
              onClick={prevSlide}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 touch-manipulation"
              aria-label="Previous project"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 touch-manipulation"
              aria-label="Next project"
            >
              <ChevronRight size={22} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
