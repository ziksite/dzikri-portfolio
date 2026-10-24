"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { leadMethod, trackLead, trackPageView } from "@/lib/analytics";

// Records a page view on every route change, and tracks every WhatsApp/email link with one delegated
// listener. A lead's location comes from the nearest data-lead-location, else the enclosing section id,
// else "footer"/"page".
export function SiteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

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
