"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Lock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  type?: string;
  status?: string;
  client?: string;
  year?: string;
  testimonial?: string;
  description: string;
  metrics?: { value: string; label: string }[];
  tags: string[];
  imageUrl: string;
  href: string;
  index: number;
  imageContain?: boolean;
}

export function ProjectCard({ title, type, status, client, year, testimonial, description, metrics, tags, imageUrl, href, index, imageContain }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
    <Link href={href} className="group block drop-shadow-sm w-full text-left">
      <div className="flex flex-col lg:flex-row bg-[#0A0A0A] border-[3px] border-white/20 group-hover:border-white shadow-sm hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-2 rounded-[24px] transition-all duration-300 relative overflow-hidden group/card text-white w-full">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Image Block */}
        <div className="w-full lg:w-2/5 relative aspect-square lg:aspect-auto lg:self-stretch overflow-hidden lg:border-r-[3px] lg:border-b-0 border-b-[3px] border-white/10 shrink-0 rounded-t-[21px] lg:rounded-t-none lg:rounded-l-[21px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={cn(
              "bg-[#0f0f0f] group-hover/card:scale-105 transition-transform duration-700 ease-out",
              imageContain ? "object-contain object-center p-3 md:p-4" : "object-contain lg:object-cover object-top"
            )}
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>

        {/* Content Block */}
        <div className="flex flex-col flex-1 relative z-10 p-5 md:p-8 lg:p-10 lg:w-3/5">
          {/* Badges & Year Row */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              {type && (
                <span className="px-2.5 py-1 md:px-3 md:py-1.5 border-[2px] border-white/20 rounded-full text-[9px] font-bold uppercase tracking-widest text-gray-300">
                  {type}
                </span>
              )}
              {status && (
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                  status === "LIVE" ? "text-green-400" : "text-gray-500"
                )}>
                  {status === "LIVE" ? <Globe size={12} /> : <Lock size={12} />}
                  {status}
                </span>
              )}
            </div>
            {year && <span className="text-gray-500 font-bold tracking-widest text-xs shrink-0 ml-2">{year}</span>}
          </div>


          <h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase mb-3 md:mb-4 leading-tight">
            {title}
          </h3>

          {/* Description: truncated on mobile/tablet, full on desktop */}
          <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm font-medium line-clamp-3 md:line-clamp-4 lg:line-clamp-none">
            {description.split("\n\n")[0]}
          </p>

          {/* Testimonial */}
          {testimonial && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 md:mb-6 italic text-xs text-gray-300 relative group/testim hidden md:block">
              <div className="absolute top-2 left-3 text-white/20 text-3xl leading-none font-serif group-hover/testim:text-primary transition-colors duration-300">"</div>
              <p className="relative z-10 pl-5 text-gray-200">{testimonial}</p>
            </div>
          )}

          {/* Trust Metrics */}
          {metrics && metrics.length > 0 && (
            <div className="mb-4 md:mb-6">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <BadgeCheck size={14} className="text-blue-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">Verified Impact</span>
              </div>
              <div className="flex items-center gap-3 md:gap-6 lg:gap-8 border-l-[3px] border-white/10 pl-3 md:pl-4">
                {metrics.map((m, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-lg md:text-2xl font-black mb-0.5">{m.value}</span>
                    <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack & CTA */}
          <div className="flex flex-col gap-4 pt-4 md:pt-6 border-t border-white/10 mt-auto">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 md:px-3 md:py-1.5 text-[9px] font-bold bg-[#1A1A1A] text-gray-300 rounded-[6px] border border-white/10 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3.5 rounded-lg font-black uppercase tracking-widest text-[9px] group-hover/card:bg-gray-200 transition-colors w-full lg:w-auto shrink-0 group/btn">
              View Project
              <ArrowUpRight size={16} strokeWidth={3} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}
