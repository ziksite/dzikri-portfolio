"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Compass, Globe, LayoutDashboard } from "lucide-react";
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
    <section id="services" className="py-16 md:py-20 px-4 bg-white border-y-2 border-foreground scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5 flex justify-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground px-6 py-2 border-[3px] border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white rotate-1">
            {t.heading}
          </h2>
        </div>
        <p className="text-center text-gray-500 font-medium max-w-2xl mx-auto mb-10 text-sm md:text-base">{t.intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.items.map((item, i) => {
            const Icon = icons[item.id];
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card rounded-2xl p-5 md:p-6 border-2 border-foreground hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-foreground text-white flex items-center justify-center">
                    {Icon && <Icon size={17} />}
                  </div>
                  <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-foreground leading-tight">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">{item.text}</p>
                <a
                  href={whatsappUrl(t.whatsappMessage.replace("{service}", item.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto group inline-flex items-center gap-1.5 w-max text-[11px] font-black uppercase tracking-widest text-foreground border-b-2 border-foreground/30 hover:border-foreground pb-0.5 transition-colors"
                >
                  {t.cta}
                  <ArrowUpRight size={13} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
