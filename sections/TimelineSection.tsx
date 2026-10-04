"use client";

import { useRef } from "react";
import { TimelineCard } from "@/components/TimelineCard";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Dictionary } from "@/i18n";

export function TimelineSection({ t }: { t: Dictionary["journey"] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="py-32 px-6 bg-background relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 relative inline-block">
            {t.heading}
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary hidden md:block" />
          </h2>
          <p className="text-gray-600 font-medium max-w-xl mx-auto uppercase tracking-widest text-xs leading-relaxed">
            {t.intro}
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-border/50" />
          <motion.div
            className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-foreground origin-top z-10"
            style={{ scaleY }}
          />

          <div className="flex flex-col">
            {t.items.map((item) => (
              <TimelineCard
                key={`${item.year}-${item.role}`}
                year={item.year}
                stage={item.stage}
                role={item.role}
                company={item.company}
                jobType={item.jobType}
                description={item.description}
                tags={item.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
