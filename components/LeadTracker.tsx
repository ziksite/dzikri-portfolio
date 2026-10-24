"use client";

import { useEffect } from "react";
import { leadMethod, trackLead } from "@/lib/analytics";

// One delegated listener tracks every WhatsApp/email link on the site. The location comes from the
// nearest data-lead-location, else the enclosing section id, else "footer"/"page".
export function LeadTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const method = leadMethod(link.href);
      if (!method) return;
      const location =
        link.closest<HTMLElement>("[data-lead-location]")?.dataset.leadLocation ??
        link.closest("section[id]")?.id ??
        (link.closest("footer") ? "footer" : "page");
      trackLead(method, location);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
