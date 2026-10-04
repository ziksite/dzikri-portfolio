"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineCardProps {
  stage?: string;
  role: string;
  company: string;
  jobType?: string;
  description: string;
  tags: string[];
  year: string;
}

export function TimelineCard({ stage, role, company, jobType, description, tags, year }: TimelineCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group w-full mb-16 last:mb-0"
    >
      {/* Center line marker */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-background border-4 border-primary rounded-full z-10 hover:scale-150 transition-transform duration-300" />

      {/* Content */}
      <div className="w-full pl-16 md:pl-0 md:w-[calc(50%-4rem)] md:text-right md:group-even:text-left">
        <div className={cn(
          "bg-card border-[3px] border-foreground rounded-[24px] p-6 md:p-8 shadow-sm hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 relative overflow-hidden group-hover:-translate-y-1",
          "text-left"
        )}>
          {/* Faded background year */}
          <span className="text-foreground/[0.03] absolute -top-4 -right-2 md:group-odd:-left-4 md:group-odd:-right-auto font-black text-6xl md:text-8xl pointer-events-none select-none whitespace-nowrap">
            {year.split(" ")[0]}
          </span>
          
          {/* Header block */}
          <div className="relative z-10">
             <div className={cn(
               "flex items-center gap-4 mb-4",
               "md:group-odd:flex-row-reverse md:group-even:flex-row"
             )}>
               <div className="p-3 bg-white rounded-xl text-foreground md:group-hover:bg-foreground md:group-hover:text-white transition-colors duration-300 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Briefcase size={24} />
               </div>
               <div className={cn(
                 "flex flex-col",
                 "md:group-odd:items-end md:group-even:items-start"
               )}>
                  <span className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">
                    {year}{stage && stage !== role ? ` · ${stage}` : ""}
                  </span>
                  <h4 className="text-xl md:text-2xl font-black tracking-tight text-foreground uppercase">{role}</h4>
                  <p className="text-sm font-bold tracking-widest text-[#666666] uppercase mb-2">{company}</p>
                  {jobType && (
                    <span className="inline-block px-2.5 py-1 text-[9px] font-black uppercase tracking-widest bg-foreground text-card border-2 border-foreground rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {jobType}
                    </span>
                  )}
               </div>
            </div>
            
            <p className={cn(
              "text-gray-600 mt-4 mb-6 leading-relaxed text-sm md:text-base",
              "md:group-odd:text-right md:group-even:text-left"
            )}>
              {description}
            </p>
            
            <div className={cn(
              "flex flex-wrap gap-2",
               "md:group-odd:justify-end md:group-even:justify-start"
            )}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-white border-2 border-foreground text-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Empty space for the other side on desktop */}
      <div className="hidden md:block w-[calc(50%-4rem)]"></div>
    </motion.div>
  );
}
