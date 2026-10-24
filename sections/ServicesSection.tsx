"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Check, Compass, Globe, LayoutDashboard } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { whatsappUrl } from "@/lib/site";

const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  website: Globe,
  webapp: LayoutDashboard,
  automation: Bot,
  consulting: Compass,
};

export function ServicesSection({ t }: { t: Dictionary["services"] }) {
  return (
    <section id="services" className="py-24 px-4 bg-white border-y-2 border-foreground scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex justify-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground px-6 py-2 border-[3px] border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white rotate-1">
            {t.heading}
          </h2>
        </div>
        <p className="text-center text-gray-500 font-medium max-w-2xl mx-auto mb-12 md:text-lg">{t.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.items.map((item, i) => {
            const Icon = icons[item.id];
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-card rounded-[24px] p-8 md:p-10 border-2 border-foreground shadow-sm hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center bg-foreground text-white">
                    {Icon && <Icon size={22} />}
                  </div>
                  <span className="text-xs font-black text-gray-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground mb-3">{item.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">{item.text}</p>
                <ul className="space-y-2 mb-8">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm font-bold text-foreground">
                      <Check size={16} className="mt-0.5 shrink-0" strokeWidth={3} />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(t.whatsappMessage.replace("{service}", item.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto group inline-flex items-center gap-2 w-max px-5 py-3 rounded-xl bg-foreground text-white text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  {t.cta}
                  <ArrowUpRight size={14} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
