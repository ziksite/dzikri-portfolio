"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  Terminal, Sparkles, Database, Server, GitBranch, Plug, Users, BarChart3,
  PenTool, Boxes, Bot, Workflow,
} from "lucide-react";
import {
  SiNextdotjs, SiReact, SiPhp, SiLaravel, SiWordpress,
  SiDocker, SiLinux, SiGit, SiMysql, SiFigma,
} from "react-icons/si";
import type { Dictionary } from "@/i18n";
import { RichText } from "@/components/RichText";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

// Icon per stack item; items without an entry render without an icon
const stackIcons: Record<string, IconComponent> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  PHP: SiPhp,
  Laravel: SiLaravel,
  WordPress: SiWordpress,
  Docker: SiDocker,
  Linux: SiLinux,
  VPS: Server as IconComponent,
  Git: SiGit,
  "CI/CD": GitBranch as IconComponent,
  MySQL: SiMysql,
  SQL: Database as IconComponent,
  APIs: Plug as IconComponent,
  CRM: Users as IconComponent,
  Analytics: BarChart3 as IconComponent,
  Figma: SiFigma,
  "UI/UX": PenTool as IconComponent,
  "Product Design": Boxes as IconComponent,
  "AI Tools": Bot as IconComponent,
  "Workflow Automation": Workflow as IconComponent,
  "API Integration": Plug as IconComponent,
};

function ProfileCard({ t, whatsappUrl }: { t: Dictionary["about"]; whatsappUrl: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="lg:col-span-4"
      style={{ perspective: 800 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="bg-card rounded-[24px] border border-border shadow-sm hover:shadow-xl hover:border-gray-300 transition-shadow duration-300 overflow-hidden relative group h-full"
      >
        <div className="aspect-square md:aspect-auto md:h-full min-h-[320px] relative">
          <Image
            src="/images/profile.jpeg"
            alt="Dzikri Ramadhan"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10">
            <div>
              <div className="text-white font-bold tracking-wide">@ziksite</div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">{t.status}</span>
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white text-black text-xs font-black tracking-widest uppercase rounded-xl hover:bg-gray-200 transition-colors"
            >
              {t.profileCta}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const card =
  "bg-card rounded-[24px] p-8 md:p-10 border-2 border-foreground shadow-sm hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 group";

export function AboutSection({
  about,
  whatIDo,
  techStack,
  whatsappUrl,
}: {
  about: Dictionary["about"];
  whatIDo: Dictionary["whatIDo"];
  techStack: Dictionary["techStack"];
  whatsappUrl: string;
}) {
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, delay },
  });

  return (
    <section id="about" className="py-24 px-4 bg-background scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex justify-center">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground px-6 py-2 border-[3px] border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white -rotate-1">
            {about.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* About */}
          <motion.div {...reveal()} className={`lg:col-span-8 ${card}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl inline-block" aria-hidden="true">👋</span>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
                {about.greeting}
              </h3>
            </div>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed md:text-lg">
              {about.paragraphs.map((p, i) => (
                <p key={i}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
          </motion.div>

          {/* Profile */}
          <ProfileCard t={about} whatsappUrl={whatsappUrl} />

          {/* What I Do */}
          <motion.div {...reveal(0.2)} className={`lg:col-span-5 ${card} relative overflow-hidden flex flex-col`}>
            <div className="absolute top-6 right-6 px-3 py-1.5 bg-primary text-secondary rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
              {whatIDo.badge}
            </div>
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-8 bg-gray-50 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
              <Sparkles size={22} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">{whatIDo.heading}</h3>
            <ol className="space-y-6">
              {whatIDo.items.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="text-xs font-black text-gray-400 tabular-nums pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col border-l-2 border-foreground/10 hover:border-foreground pl-4 transition-colors">
                    <span className="text-sm font-black uppercase tracking-wide text-foreground mb-1">{item.title}</span>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed">{item.text}</span>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Tech Stack */}
          <motion.div {...reveal(0.3)} className={`lg:col-span-7 ${card} flex flex-col`}>
            <div className="flex items-center gap-3 mb-3">
              <Terminal className="text-foreground" />
              <h3 className="text-2xl font-black uppercase tracking-tight">{techStack.heading}</h3>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">{techStack.intro}</p>

            <div className="space-y-7">
              {techStack.groups.map((group) => (
                <div key={group.name}>
                  <div className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-3">
                    {group.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((name) => {
                      const Icon = stackIcons[name];
                      return (
                        <span
                          key={name}
                          className="px-4 py-2 border-2 border-foreground rounded-xl text-xs font-bold text-foreground bg-white hover:bg-foreground hover:text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-default flex items-center gap-2 group/pill"
                        >
                          {Icon && <Icon size={14} className="text-gray-500 group-hover/pill:text-white" />}
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
