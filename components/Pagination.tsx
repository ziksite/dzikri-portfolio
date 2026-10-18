"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

// Page numbers with prev/next. Renders nothing when everything fits on one page.
// On mobile only the first, last and current ±1 pages are shown, with gaps collapsed into an ellipsis.
function visiblePages(page: number, pageCount: number): (number | "gap")[] {
  const keep = new Set([1, pageCount, page - 1, page, page + 1]);
  const out: (number | "gap")[] = [];
  for (let n = 1; n <= pageCount; n++) {
    if (keep.has(n)) out.push(n);
    else if (out[out.length - 1] !== "gap") out.push("gap");
  }
  return out;
}

export function Pagination({
  page,
  pageCount,
  onChange,
  t,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  t: Dictionary["pagination"];
}) {
  if (pageCount <= 1) return null;

  const button =
    "flex h-11 min-w-11 items-center justify-center rounded-full border-[3px] border-black px-3 text-xs font-black transition-all";

  return (
    <nav aria-label={t.label} className="flex items-center justify-center gap-2 mt-12 md:mt-16">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label={t.previous}
        className={cn(button, "bg-white hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none")}
      >
        <ChevronLeft size={18} strokeWidth={3} />
      </button>

      {/* Mobile: compact list with ellipses */}
      {visiblePages(page, pageCount).map((n, i) =>
        n === "gap" ? (
          <span key={`gap-${i}`} className="md:hidden px-1 text-xs font-black text-gray-400" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={`m-${n}`}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${t.page} ${n}`}
            aria-current={n === page ? "page" : undefined}
            className={cn(
              button,
              "md:hidden",
              n === page ? "bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]" : "bg-white hover:bg-gray-100"
            )}
          >
            {n}
          </button>
        )
      )}

      {/* Desktop: every page */}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${t.page} ${n}`}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            button,
            "hidden md:flex",
            n === page ? "bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]" : "bg-white hover:bg-gray-100"
          )}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pageCount}
        aria-label={t.next}
        className={cn(button, "bg-white hover:bg-black hover:text-white disabled:opacity-30 disabled:pointer-events-none")}
      >
        <ChevronRight size={18} strokeWidth={3} />
      </button>
    </nav>
  );
}
