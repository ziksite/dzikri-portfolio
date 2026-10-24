import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { EMAIL, whatsappUrl } from "@/lib/site";

// Top of the /hire page: who I am for people searching "freelance web developer"
export function HireHero({
  t,
  projectCount,
}: {
  t: Dictionary["hire"];
  projectCount: number;
}) {
  return (
    <section id="hire" className="pt-32 md:pt-40 pb-16 md:pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-end mb-12">
          <div>
            <p className="flex items-center gap-2 mb-6 text-[11px] md:text-xs font-black uppercase tracking-widest text-green-700">
              <span
                className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"
                aria-hidden="true"
              />
              {t.eyebrow}
            </p>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-foreground max-w-4xl mb-6">
              {t.heading}
            </h1>
            <p className="text-gray-600 font-medium leading-relaxed md:text-lg max-w-2xl mb-8">
              {t.intro}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-foreground text-white text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                {t.ctaPrimary}
                <ArrowUpRight
                  size={16}
                  strokeWidth={3}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border-[3px] border-foreground text-foreground text-xs font-black uppercase tracking-widest hover:bg-foreground hover:text-white transition-colors"
              >
                <Mail size={16} strokeWidth={2.5} />
                {t.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="hidden lg:block relative aspect-[4/5] rounded-[24px] overflow-hidden border-2 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src="/images/profile.jpeg"
              alt="Dzikri Ramadhan"
              fill
              priority
              className="object-cover"
              sizes="320px"
            />
          </div>
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-4 border-2 border-foreground rounded-2xl bg-white divide-x-2 divide-y-2 md:divide-y-0 divide-foreground overflow-hidden">
          {t.facts.map((fact) => (
            <div key={fact.label} className="p-5 flex flex-col gap-1">
              <dt className="order-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                {fact.label}
              </dt>
              <dd className="order-1 text-lg md:text-2xl font-black tracking-tight text-foreground">
                {fact.value.replace("{count}", String(projectCount))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
