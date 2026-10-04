import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { HeroSection } from "@/sections/HeroSection";
import { InfoBar } from "@/sections/InfoBar";
import { AboutSection } from "@/sections/AboutSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TimelineSection } from "@/sections/TimelineSection";
import { ContactSection } from "@/sections/ContactSection";
import { getArticles, getProjects } from "@/lib/content";

export default async function Home() {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);

  return (
    <>
      <Navbar showBlog={articles.length > 0} />
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        <InfoBar />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollIndicator />
    </>
  );
}
