"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Globe, Lock } from "lucide-react";
import type { Project } from "@/lib/content";
import type { Dictionary } from "@/i18n";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/Pagination";

const PAGE_SIZE = 9;

export function ProjectGrid({
  projects,
  lang,
  t,
  pagination,
}: {
  projects: Project[];
  lang: Locale;
  t: Dictionary["projects"];
  pagination: Dictionary["pagination"];
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const filters = ["All", ...Array.from(new Set(projects.map((p) => p.kind)))];
  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.kind === activeFilter);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (n: number) => {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div ref={topRef} className="flex items-center gap-4 mb-8 md:mb-10 scroll-mt-28">
        <div className="relative inline-block">
          <select
            value={activeFilter}
            onChange={(e) => {
              setActiveFilter(e.target.value);
              setPage(1);
            }}
            aria-label={t.filterLabel}
            className="appearance-none bg-white border-[3px] border-black rounded-full pl-5 pr-12 py-2.5 md:py-3 text-[11px] md:text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter === "All" ? t.allProjects : t.kinds[filter] ?? filter}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={3}
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {visible.map((project) => (
          <Link
            key={project.slug}
            href={localePath(lang, `/projects/${project.slug}`)}
            className="group flex flex-col bg-white border-[3px] border-black rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="relative aspect-[16/10] border-b-[3px] border-black bg-[#0f0f0f] overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className={cn(
                  "transition-transform duration-700 group-hover:scale-105",
                  project.imageContain ? "object-contain p-3" : "object-cover object-top"
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                    project.status === "LIVE" ? "text-green-600" : "text-gray-500"
                  )}
                >
                  {project.status === "LIVE" ? <Globe size={11} /> : <Lock size={11} />}
                  {project.type ?? project.status}
                </span>
                {project.year && (
                  <span className="text-gray-500 font-bold tracking-widest text-[10px]">{project.year}</span>
                )}
              </div>
              <h2 className="text-lg md:text-xl font-black uppercase leading-tight mb-3">{project.title}</h2>
              <p className="text-gray-600 text-sm font-medium leading-relaxed line-clamp-3 mb-5">
                {project.summary}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                {t.viewCaseStudy}
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
