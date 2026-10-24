// Google Tag Manager container; GA4 (and later Meta Pixel) are configured inside it
export const GTM_ID = "GTM-WL59895V";

type LeadMethod = "whatsapp" | "email";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// First-party tracking (app/api/track) that feeds the Telegram reports; sendBeacon survives
// the page unloading when a WhatsApp/email link opens
function beacon(data: Record<string, string>) {
  try {
    navigator.sendBeacon("/api/track", new Blob([JSON.stringify(data)], { type: "application/json" }));
  } catch {}
}

export function trackPageView(path: string) {
  beacon({ type: "view", path, referrer: document.referrer });
}

// GTM turns the dataLayer event into a GA4 "generate_lead" (and a Meta "Lead" once the pixel is added)
export function trackLead(method: LeadMethod, location: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", lead_method: method, lead_location: location });
  beacon({ type: "lead", method, location, path: window.location.pathname });
}

export function leadMethod(href: string): LeadMethod | null {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("https://wa.me/")) return "whatsapp";
  return null;
}
