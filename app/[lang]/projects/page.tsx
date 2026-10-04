import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getProjects } from "@/lib/content";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).projectsPage;
  return {
    title: t.title,
    description: t.description,
    alternates: languageAlternates(lang, "/projects"),
  };
}

export default async function ProjectsIndex({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const projects = await getProjects(lang);
  const [headingFirst, ...headingRest] = t.projectsPage.heading.split(" ");

  return (
    <SiteShell lang={lang}>
      <main className="min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-8">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
              {headingFirst} <br className="hidden md:block" /> {headingRest.join(" ")}
            </h1>
            <p className="text-gray-500 font-medium max-w-sm md:text-right uppercase tracking-widest text-xs leading-relaxed">
              {t.projects.intro}
            </p>
          </div>

          <p className="flex items-start gap-2 text-gray-500 text-[11px] md:text-xs font-medium tracking-wide leading-relaxed mb-8 max-w-2xl">
            <Lock size={13} className="shrink-0 mt-0.5" />
            <span>{t.projects.disclaimer}</span>
          </p>

          <ProjectGrid projects={projects} lang={lang} t={t.projects} pagination={t.pagination} />
        </div>
      </main>
    </SiteShell>
  );
}
