import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Globe, Lock, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { getProjects, getProjectWithNeighbors } from "@/lib/content";
import { getDictionary } from "@/i18n";
import { isLocale, languageAlternates, localePath, locales } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

type Params = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects("en");
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const data = await getProjectWithNeighbors(lang, slug);
  if (!data) return {};
  const { project } = data;
  return {
    title: `${project.title} - Dzikri Ramadhan`,
    description: project.summary,
    alternates: languageAlternates(lang, `/projects/${project.slug}`),
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.imageUrl }],
    },
  };
}

function SectionHeading({ number, children }: { number: number; children: React.ReactNode }) {
  return (
    <h2 className="flex items-baseline gap-3 mb-5 md:mb-6">
      <span className="text-xs font-black text-gray-400 tabular-nums">{String(number).padStart(2, "0")}</span>
      <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter">{children}</span>
    </h2>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 text-gray-800 text-base md:text-lg leading-relaxed font-medium max-w-3xl">
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const data = await getProjectWithNeighbors(lang, slug);
  if (!data) notFound();
  const { project, prev, next } = data;
  const t = getDictionary(lang).caseStudy;

  const liveUrl = project.link && project.link !== "#" ? project.link : null;
  const waLink = whatsappUrl(t.whatsappMessage.replace("{title}", project.title));
  const hasImpact = project.impact.length > 0 || project.metrics.length > 0 || !!project.testimonial;

  // Number only the sections that have content, so the sequence never skips
  let n = 0;
  const num = () => ++n;

  const facts = [
    { label: t.client, value: project.client },
    { label: t.category, value: project.category },
    { label: t.year, value: project.year },
    { label: t.status, value: project.status },
  ].filter((f) => f.value);

  return (
    <SiteShell lang={lang}>
      <main className="min-h-screen pt-28 md:pt-36 pb-20 md:pb-28 px-4 md:px-6">
        <article className="max-w-7xl mx-auto">
          <Link
            href={localePath(lang, "/projects")}
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8 md:mb-10"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            {t.allProjects}
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
            {project.summary}
          </p>

          {/* Cover */}
          <div className="w-full overflow-hidden rounded-[24px] border-[3px] border-black bg-[#0f0f0f] mb-12 md:mb-20">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1600}
              height={1000}
              priority
              className={cn("w-full h-auto", project.imageContain && "max-h-[75vh] object-contain p-4 md:p-8")}
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-12 lg:gap-16">
            {/* Story */}
            <div className="min-w-0 flex flex-col gap-14 md:gap-20">
              {project.challenge.length > 0 && (
                <section>
                  <SectionHeading number={num()}>{t.challenge}</SectionHeading>
                  <Paragraphs items={project.challenge} />
                </section>
              )}

              {(project.solution.length > 0 || project.features.length > 0) && (
                <section>
                  <SectionHeading number={num()}>{t.solution}</SectionHeading>
                  <Paragraphs items={project.solution} />
                  {project.features.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                        {t.keyFeatures}
                      </h3>
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
                    </div>
                  )}
                </section>
              )}

              {project.gallery.length > 0 && (
                <section>
                  <SectionHeading number={num()}>{t.gallery}</SectionHeading>
                  <GalleryLightbox items={project.gallery} title={project.title} t={t.lightbox} />
                </section>
              )}

              {hasImpact && (
                <section>
                  <SectionHeading number={num()}>{t.impact}</SectionHeading>
                  {project.impact.length > 0 && <Paragraphs items={project.impact} />}
                  {project.metrics.length > 0 && (
                    <div className={cn("bg-[#0A0A0A] text-white rounded-[24px] p-6 md:p-8", project.impact.length > 0 && "mt-8")}>
                      <div className="flex items-center gap-2 mb-5 md:mb-6">
                        <BadgeCheck size={14} className="text-blue-400" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-blue-400">{t.impact}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
                        {project.metrics.map((m, i) => (
                          <div key={i} className="flex flex-col border-l-[3px] border-white/15 pl-4 min-w-0">
                            <span className="text-2xl md:text-[1.75rem] xl:text-3xl font-black leading-tight">{m.value}</span>
                            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.testimonial && (
                    <blockquote className="relative bg-white border-[3px] border-black rounded-[24px] p-6 md:p-8 mt-8">
                      <span className="absolute top-3 left-5 text-5xl leading-none font-serif text-black/15" aria-hidden="true">
                        &ldquo;
                      </span>
                      <p className="relative italic text-base md:text-lg font-medium leading-relaxed pl-6">
                        {project.testimonial}
                      </p>
                    </blockquote>
                  )}
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <div className="bg-white border-[3px] border-black rounded-[24px] p-6 md:p-7">
                {facts.length > 0 && (
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {facts.map((f) => (
                      <div key={f.label}>
                        <dt className="text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-1">{f.label}</dt>
                        <dd className="text-sm font-bold">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {project.tags.length > 0 && (
                  <div className={cn(facts.length > 0 && "mt-6 pt-5 border-t-2 border-black/10")}>
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                      {t.techStack}
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

                {project.role && (
                  <div className="mt-6 pt-5 border-t-2 border-black/10">
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-500 mb-2">{t.role}</span>
                    <p className="text-sm font-medium leading-relaxed">{project.role}</p>
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
                    {t.viewLive}
                    <ArrowUpRight size={16} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-colors",
                    liveUrl ? "border-[3px] border-black hover:bg-black hover:text-white" : "bg-black text-white hover:bg-gray-800"
                  )}
                >
                  <MessageCircle size={16} strokeWidth={2.5} />
                  {project.status === "PRIVATE" ? t.requestDemo : t.discuss}
                </a>
              </div>
            </aside>
          </div>

          {/* Prev / next */}
          <nav
            aria-label={t.moreProjects}
            className="grid grid-cols-2 gap-3 md:gap-6 mt-16 md:mt-24 pt-8 md:pt-10 border-t-[3px] border-black"
          >
            <Link href={localePath(lang, `/projects/${prev.slug}`)} className="group flex flex-col gap-2 min-w-0">
              <span className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">
                <ArrowLeft size={14} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                {t.previous}
              </span>
              <span className="text-sm md:text-2xl font-black uppercase leading-tight line-clamp-2">{prev.title}</span>
            </Link>
            <Link href={localePath(lang, `/projects/${next.slug}`)} className="group flex flex-col items-end text-right gap-2 min-w-0">
              <span className="inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500">
                {t.next}
                <ArrowRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-sm md:text-2xl font-black uppercase leading-tight line-clamp-2">{next.title}</span>
            </Link>
          </nav>
        </article>
      </main>
    </SiteShell>
  );
}
