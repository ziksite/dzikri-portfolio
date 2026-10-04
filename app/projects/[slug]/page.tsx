import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Globe,
  Lock,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getArticles, getProjects, getProjectWithNeighbors } from "@/lib/content";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

const WHATSAPP = "https://wa.me/6289630557191";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const data = await getProjectWithNeighbors((await params).slug);
  if (!data) return {};
  const { project } = data;
  const description = project.description.split("\n\n")[0];
  return {
    title: `${project.title} - Dzikri Ramadhan`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      images: [{ url: project.imageUrl }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const [data, articles] = await Promise.all([
    getProjectWithNeighbors((await params).slug),
    getArticles(),
  ]);
  if (!data) notFound();
  const { project, prev, next } = data;

  // Same template for every project: the first description paragraph is the lead,
  // the overview (or the rest of the description) is the body.
  const [lead, ...rest] = project.description.split("\n\n");
  const body = project.overview ? project.overview.split("\n\n") : rest;
  const liveUrl = project.link && project.link !== "#" ? project.link : null;
  const waText = encodeURIComponent(`Hi Dzikri, I saw "${project.title}" on your portfolio and would like to discuss a similar project.`);

  const facts = [
    { label: "Client", value: project.client },
    { label: "Category", value: project.category },
    { label: "Year", value: project.year },
    { label: "Status", value: project.status },
  ].filter((f) => f.value);

  return (
    <>
      <Navbar showBlog={articles.length > 0} />
      <main className="min-h-screen pt-28 md:pt-36 pb-20 md:pb-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8 md:mb-10"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            All projects
          </Link>

          {/* Header */}
          <div className="flex items-center gap-2 md:gap-3 flex-wrap mb-4 md:mb-5">
            {project.type && (
              <span className="px-3 py-1.5 border-2 border-black rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                {project.type}
              </span>
            )}
            {project.status && (
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                  project.status === "LIVE" ? "text-green-600" : "text-gray-500"
                )}
              >
                {project.status === "LIVE" ? <Globe size={12} /> : <Lock size={12} />}
                {project.status}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.02] max-w-5xl mb-5 md:mb-7">
            {project.title}
          </h1>
          <p className="text-gray-600 text-base md:text-xl font-medium leading-relaxed max-w-3xl mb-8 md:mb-12">
            {lead}
          </p>

          {/* Image */}
          <div className="w-full overflow-hidden rounded-[24px] border-[3px] border-black bg-[#0f0f0f] mb-10 md:mb-16">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1600}
              height={1000}
              priority
              className={cn(
                "w-full h-auto",
                project.imageContain && "max-h-[75vh] object-contain p-4 md:p-8"
              )}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16">
            {/* Main column */}
            <div className="min-w-0">
              {body.length > 0 && (
                <section className="mb-10 md:mb-12">
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                    Overview
                  </h2>
                  <div className="space-y-4 text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                    {body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              )}

              {project.features && (
                <section className="mb-10 md:mb-12">
                  <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                    <Sparkles size={14} />
                    Key Features
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="bg-white border-2 border-black/10 rounded-xl p-4 text-sm md:text-[15px] font-medium leading-relaxed"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {project.testimonial && (
                <blockquote className="relative bg-white border-[3px] border-black rounded-[24px] p-6 md:p-8 mb-10 md:mb-12">
                  <span className="absolute top-3 left-5 text-5xl leading-none font-serif text-black/15">&ldquo;</span>
                  <p className="relative italic text-base md:text-lg font-medium leading-relaxed pl-6">
                    {project.testimonial}
                  </p>
                </blockquote>
              )}

              {project.role && (
                <section>
                  <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">
                    My Role
                  </h2>
                  <p className="text-gray-800 text-base leading-relaxed font-medium">{project.role}</p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              {project.metrics.length > 0 && (
                <div className="bg-[#0A0A0A] text-white rounded-[24px] p-6 md:p-7">
                  <div className="flex items-center gap-2 mb-5">
                    <BadgeCheck size={14} className="text-blue-400" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">
                      Verified Impact
                    </span>
                  </div>
                  <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-5">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col border-l-[3px] border-white/15 pl-3">
                        <span className="text-lg md:text-3xl font-black leading-tight break-words">{m.value}</span>
                        <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white border-[3px] border-black rounded-[24px] p-6 md:p-7">
                {facts.length > 0 && (
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
                    {facts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">{f.label}</dt>
                        <dd className="text-sm font-bold">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {project.tags.length > 0 && (
                  <div className="pt-5 border-t-2 border-black/10">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1.5 text-[9px] font-bold bg-[#f5f5f5] rounded-[6px] border-2 border-black/10 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-colors"
                  >
                    View live project
                    <ArrowUpRight size={16} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                <a
                  href={`${WHATSAPP}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors",
                    liveUrl
                      ? "border-[3px] border-black hover:bg-black hover:text-white"
                      : "bg-black text-white hover:bg-gray-800"
                  )}
                >
                  <MessageCircle size={16} strokeWidth={2.5} />
                  {project.status === "PRIVATE" ? "Request a private demo" : "Discuss a similar project"}
                </a>
              </div>
            </aside>
          </div>

          {/* Prev / next */}
          <nav
            aria-label="More projects"
            className="grid grid-cols-2 gap-3 md:gap-6 mt-16 md:mt-24 pt-8 md:pt-10 border-t-[3px] border-black"
          >
            <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-2 min-w-0">
              <span className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">
                <ArrowLeft size={14} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                Previous
              </span>
              <span className="text-sm md:text-2xl font-black uppercase leading-tight line-clamp-2">{prev.title}</span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end text-right gap-2 min-w-0">
              <span className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">
                Next
                <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-sm md:text-2xl font-black uppercase leading-tight line-clamp-2">{next.title}</span>
            </Link>
          </nav>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
