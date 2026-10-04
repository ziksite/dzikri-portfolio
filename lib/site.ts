// Contact details and social links shared by the contact section, footer and CTAs
export const WHATSAPP_NUMBER = "6289630557191";
export const EMAIL = "dzikri1990@gmail.com";

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const socialLinks = [
  { id: "linkedin", label: "LinkedIn", url: "https://id.linkedin.com/in/dzikrii" },
  { id: "github", label: "GitHub", url: "https://github.com/ziksite" },
  { id: "email", label: "Email", url: `mailto:${EMAIL}` },
  { id: "instagram", label: "Instagram", url: "https://instagram.com/dzikriramadhann" },
  { id: "tiktok", label: "TikTok", url: "https://tiktok.com/@ziksite" },
] as const;
