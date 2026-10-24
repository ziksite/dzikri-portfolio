"use client";

import { useState } from "react";
import { Check, Link2, Linkedin } from "lucide-react";
import { SiFacebook, SiWhatsapp, SiX } from "react-icons/si";

// Share links for an article. WhatsApp uses api.whatsapp.com rather than wa.me so SiteTracker
// doesn't count a share as a lead.
export function ArticleShare({
  url,
  title,
  labels,
}: {
  url: string;
  title: string;
  labels: { share: string; copyLink: string; copied: string };
}) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const targets = [
    { name: "WhatsApp", href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`, Icon: SiWhatsapp },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: Linkedin },
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: SiX },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: SiFacebook },
  ];
  const button =
    "w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mr-1">{labels.share}</span>
      {targets.map(({ name, href, Icon }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className={button}>
          <Icon size={16} />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label={labels.copyLink} className={`${button} w-auto px-4 gap-2 text-[10px] font-black uppercase tracking-widest`}>
        {copied ? <Check size={14} strokeWidth={3} /> : <Link2 size={14} strokeWidth={3} />}
        {copied ? labels.copied : labels.copyLink}
      </button>
    </div>
  );
}
