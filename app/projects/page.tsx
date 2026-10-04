import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getArticles, getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects - Dzikri Ramadhan",
  description: "Websites, internal systems, and AI automation built for real businesses.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsIndex() {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);

  return (
    <>
      <Navbar showBlog={articles.length > 0} />
      <main className="min-h-screen pt-32 md:pt-40 pb-20 md:pb-32 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-8">
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
              All <br className="hidden md:block" /> Projects
            </h1>
            <p className="text-gray-500 font-medium max-w-sm md:text-right uppercase tracking-widest text-xs leading-relaxed">
              Real projects. Real results. Built with precision and purpose.
            </p>
          </div>

          <p className="flex items-start gap-2 text-gray-500 text-[11px] md:text-xs font-medium tracking-wide leading-relaxed mb-8 max-w-2xl">
            <Lock size={13} className="shrink-0 mt-0.5" />
            <span>
              Client names and brand identities are kept confidential. Where shown, logos and
              identifying details in screenshots are intentionally blurred.
            </span>
          </p>

          <ProjectGrid projects={projects} />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
