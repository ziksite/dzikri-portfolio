// Google Tag Manager container; GA4 (and later Meta Pixel) are configured inside it
export const GTM_ID = "GTM-WL59895V";

type LeadMethod = "whatsapp" | "email";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// GTM turns this into a GA4 "generate_lead" event (and a Meta "Lead" event once the pixel is added)
export function trackLead(method: LeadMethod, location: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", lead_method: method, lead_location: location });
}

export function leadMethod(href: string): LeadMethod | null {
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("https://wa.me/")) return "whatsapp";
  return null;
}
