"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Dictionary } from "@/i18n";

type GalleryItem = { image: string; caption?: string };

export function GalleryLightbox({
  items,
  title,
  t,
}: {
  items: GalleryItem[];
  title: string;
  t: Dictionary["caseStudy"]["lightbox"];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = items.length;

  const close = useCallback(() => {
    setOpen((current) => {
      // Return focus to the thumbnail that opened the lightbox
      if (current !== null) requestAnimationFrame(() => triggerRefs.current[current]?.focus());
      return null;
    });
  }, []);
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + count) % count)),
    [count]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {items.map((item, i) => (
          <li key={item.image}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${t.open}: ${item.caption ?? `${title} ${i + 1}`}`}
              className="group block w-full text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] border-[3px] border-black bg-[#0f0f0f] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <Image
                  src={item.image}
                  alt={item.caption ?? `${title} ${i + 1}`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                  <Maximize2 size={14} strokeWidth={2.5} />
                </span>
              </div>
              {item.caption && (
                <p className="mt-2.5 text-xs md:text-sm font-bold leading-snug">{item.caption}</p>
              )}
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white"
            role="dialog"
            aria-modal="true"
            aria-label={current.caption ?? title}
            onClick={close}
          >
            <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 tabular-nums">
                {(open ?? 0) + 1} / {count}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label={t.close}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/20 hover:bg-white hover:text-black transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div
              className="relative flex-1 min-h-0 mx-4 md:mx-20"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return;
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) step(diff > 0 ? 1 : -1);
                touchStartX.current = null;
              }}
            >
              <Image
                key={current.image}
                src={current.image}
                alt={current.caption ?? title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="px-4 md:px-6 py-5 min-h-[72px] flex items-center justify-center text-center" onClick={(e) => e.stopPropagation()}>
              {current.caption && <p className="text-sm md:text-base font-bold max-w-2xl">{current.caption}</p>}
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label={t.previous}
                  className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-white/20 bg-black/60 hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label={t.next}
                  className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border-2 border-white/20 bg-black/60 hover:bg-white hover:text-black transition-colors"
                >
                  <ChevronRight size={22} strokeWidth={2.5} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
