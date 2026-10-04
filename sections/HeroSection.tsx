"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowRight, Cpu, Lightbulb, Workflow, Rocket } from "lucide-react";
import type { Dictionary } from "@/i18n";

// Positions for the five floating labels (desktop) and the first three (mobile)
const labelPositions = [
  { top: "15%", left: "8%", delay: 0, rotate: -4 },
  { top: "22%", left: "72%", delay: 1, rotate: 6 },
  { top: "72%", left: "6%", delay: 2, rotate: 3 },
  { top: "76%", left: "74%", delay: 0.5, rotate: -5 },
  { top: "34%", left: "78%", delay: 1.5, rotate: 4 },
];

const mobileLabelPositions = [
  { top: "13%", left: "5%" },
  { top: "82%", right: "5%" },
  { top: "88%", left: "8%" },
];

const iconLabels = [
  { icon: Cpu, top: "20%", left: "58%", delay: 0.2, rotate: 10 },
  { icon: Lightbulb, top: "58%", left: "14%", delay: 1.2, rotate: -15 },
  { icon: Workflow, top: "86%", left: "62%", delay: 2.2, rotate: 12 },
  { icon: Rocket, top: "34%", left: "20%", delay: 0.7, rotate: -8 },
];

const mobileIconLabels = [
  { icon: Cpu, top: "24%", right: "10%", delay: 0.2, rotate: 10 },
  { icon: Workflow, top: "25%", left: "8%", delay: 1.2, rotate: -15 },
];

export function HeroSection({ t, name }: { t: Dictionary["hero"]; name: string }) {
  const containerRef = useRef(null);
  const [firstName, ...lastName] = name.split(" ");

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Floating Labels Desktop */}
      {t.labels.map((text, idx) => {
        const pos = labelPositions[idx % labelPositions.length];
        return (
          <motion.div
            key={text}
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            animate={{ y: [0, -15, 0], rotate: [pos.rotate, pos.rotate + 3, pos.rotate] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: pos.delay }}
            className="absolute hidden xl:block z-20 cursor-grab"
            style={{ top: pos.top, left: pos.left }}
          >
            <span className="px-5 py-2.5 border-[3px] border-foreground rounded-[2rem] text-xs font-black uppercase tracking-widest bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
              {text}
            </span>
          </motion.div>
        );
      })}

      {/* Floating Icon Labels Desktop */}
      {iconLabels.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={`icon-${idx}`}
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            animate={{ y: [0, -15, 0], rotate: [item.rotate, item.rotate + 5, item.rotate] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            className="absolute hidden xl:flex z-20 cursor-grab items-center justify-center w-12 h-12 border-[3px] border-foreground rounded-full bg-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            style={{ top: item.top, left: item.left }}
          >
            <Icon size={20} strokeWidth={2.5} />
          </motion.div>
        );
      })}

      {/* Floating Labels Mobile/Tablet */}
      {t.labels.slice(0, mobileLabelPositions.length).map((text, idx) => {
        const pos = mobileLabelPositions[idx];
        return (
          <motion.div
            key={`mobile-${text}`}
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            animate={{ y: [0, -10, 0], rotate: [idx % 2 === 0 ? -2 : 2, 0, idx % 2 === 0 ? -2 : 2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
            className="absolute xl:hidden z-20 cursor-grab"
            style={pos}
          >
            <span className="px-4 py-2 border-[2px] border-foreground rounded-[2rem] text-[10px] font-black uppercase tracking-widest bg-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
              {text}
            </span>
          </motion.div>
        );
      })}

      {/* Floating Icon Labels Mobile */}
      {mobileIconLabels.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={`mobile-icon-${idx}`}
            drag
            dragConstraints={containerRef}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            animate={{ y: [0, -10, 0], rotate: [item.rotate, item.rotate + 5, item.rotate] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            className="absolute xl:hidden z-20 cursor-grab flex items-center justify-center w-10 h-10 border-[2px] border-foreground rounded-full bg-background shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            style={{ top: item.top, left: item.left, right: item.right }}
          >
            <Icon size={16} strokeWidth={2.5} />
          </motion.div>
        );
      })}

      <div className="text-center z-10 w-full max-w-[90vw] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 md:mb-8 flex flex-col items-center"
        >
          <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">
            {t.eyebrow}
          </span>
          <h1 className="text-[14vw] md:text-[8vw] xl:text-[9rem] font-black tracking-tighter leading-[0.9] text-foreground uppercase w-full flex flex-col md:block items-center justify-center">
            <span>{firstName}</span> <span className="md:ml-4">{lastName.join(" ")}</span>
          </h1>
          <p className="mt-5 md:mt-7 inline-block px-4 py-2 bg-foreground text-white text-[11px] md:text-sm font-black uppercase tracking-[0.2em] -rotate-1">
            {t.role}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl mx-auto flex flex-col items-center gap-7 md:gap-8 pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-2 px-2">
            <p className="text-base md:text-xl text-gray-600 font-medium leading-relaxed">{t.supporting}</p>
            <p className="text-sm md:text-base font-black uppercase tracking-widest text-foreground">{t.handsOn}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-foreground text-white px-7 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-transform"
            >
              {t.ctaPrimary}
              <ArrowDown size={16} strokeWidth={3} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-white text-foreground px-7 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] border-[3px] border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform"
            >
              {t.ctaSecondary}
              <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-br from-gray-100 to-transparent rounded-full blur-3xl -z-10 opacity-60 pointer-events-none" />
    </section>
  );
}
