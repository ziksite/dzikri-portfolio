import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { HeroSection } from "@/sections/HeroSection";
import { InfoBar } from "@/sections/InfoBar";
import { AboutSection } from "@/sections/AboutSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { ContactSection } from "@/sections/ContactSection";
import { getProjects } from "@/lib/content";
import { getDictionary } from "@/i18n";
import { isLocale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  const projects = await getProjects(lang);

  return (
    <SiteShell lang={lang}>
      <main className="flex flex-col min-h-screen">
        <HeroSection t={t.hero} name="Dzikri Ramadhan" />
        <InfoBar items={t.quickInfo} />
        <AboutSection about={t.about} whatIDo={t.whatIDo} techStack={t.techStack} whatsappUrl={whatsappUrl()} />
        <ProjectsSection projects={projects} lang={lang} t={t.projects} />
        <TimelineSection t={t.journey} />
        <ContactSection t={t.contact} workHref="#projects" />
      </main>
      <ScrollIndicator />
    </SiteShell>
  );
}
