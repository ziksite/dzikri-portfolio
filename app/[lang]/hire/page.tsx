import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { HireHero } from "@/sections/HireHero";
import { ServicesSection } from "@/sections/ServicesSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ContactSection } from "@/sections/ContactSection";
import { getProjects } from "@/lib/content";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, localePath } from "@/lib/i18n";
import { pageOpenGraph } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

// Same featured set as the homepage's Selected Works
const FEATURED_COUNT = 6;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang).hire;
  return {
    title: t.title,
    description: t.description,
    alternates: languageAlternates(lang, "/hire"),
    openGraph: pageOpenGraph(lang, "/hire", { title: t.title, description: t.description }),
  };
}

export default async function HirePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const projects = await getProjects(lang);
  // Rounded down to the nearest ten so the "{count}+" claim stays true as projects are hidden
  const projectCount = Math.floor(projects.length / 10) * 10;

  return (
    <SiteShell lang={lang}>
      <main className="flex flex-col min-h-screen">
        <HireHero t={t.hire} projectCount={projectCount} />
        <ServicesSection t={t.services} />
        <ProjectsSection projects={projects.slice(0, FEATURED_COUNT)} lang={lang} t={t.projects} />
        <ContactSection t={t.contact} workHref={localePath(lang, "/projects")} />
      </main>
    </SiteShell>
  );
}
