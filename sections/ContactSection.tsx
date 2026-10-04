"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import type { Dictionary } from "@/i18n";
import { EMAIL, socialLinks, whatsappUrl } from "@/lib/site";
import { SocialIcon } from "@/components/SocialIcon";

const inputClass =
  "w-full bg-black/50 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white/40 focus:bg-white/5 transition-all duration-300";

export function ContactSection({ t, workHref }: { t: Dictionary["contact"]; workHref: string }) {
  const [form, setForm] = useState({ name: "", company: "", topic: "", message: "" });
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // The form has no backend: it opens WhatsApp with the filled-in fields as the message
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      t.form.whatsappIntro,
      form.name && `${t.form.name}: ${form.name}`,
      form.company && `${t.form.company}: ${form.company}`,
      form.topic && `${t.form.topic}: ${form.topic}`,
      form.message && `\n${form.message}`,
    ].filter(Boolean);
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="bg-dark text-white py-32 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
                {t.headingLine1} <br /> {t.headingLine2}
              </h2>
              <p className="text-gray-400 font-medium max-w-md text-sm md:text-base leading-relaxed mb-8">
                {t.copy}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-white text-dark px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-gray-200 transition-colors"
                >
                  {t.ctaPrimary}
                  <ArrowRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={workHref}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-colors"
                >
                  {t.ctaSecondary}
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 group w-max max-w-full">
                <div className="w-14 h-14 shrink-0 bg-white/5 rounded-full flex items-center justify-center border-2 border-white/20 group-hover:bg-white group-hover:text-dark transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">{t.emailLabel}</p>
                  <p className="text-lg md:text-xl font-bold break-all">{EMAIL}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 shrink-0 bg-white/5 rounded-full flex items-center justify-center border-2 border-white/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">{t.locationLabel}</p>
                  <p className="text-lg md:text-xl font-bold">{t.location}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-12 pt-12 border-t border-white/10">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-14 h-14 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-300"
                >
                  <SocialIcon id={social.id} size={22} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#111] border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full" />

            <form className="relative z-10 flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">{t.form.name}</label>
                  <input type="text" id="name" required value={form.name} onChange={set("name")} placeholder={t.form.namePlaceholder} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">{t.form.company}</label>
                  <input type="text" id="company" value={form.company} onChange={set("company")} placeholder={t.form.companyPlaceholder} className={inputClass} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="topic" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">{t.form.topic}</label>
                <input type="text" id="topic" value={form.topic} onChange={set("topic")} placeholder={t.form.topicPlaceholder} className={inputClass} />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2">{t.form.message}</label>
                <textarea id="message" rows={5} required value={form.message} onChange={set("message")} placeholder={t.form.messagePlaceholder} className={`${inputClass} resize-none`} />
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <button
                  type="submit"
                  className="group w-full md:w-auto self-start bg-white text-dark hover:bg-gray-200 uppercase tracking-widest font-black text-sm px-10 py-5 rounded-2xl border-4 border-transparent hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {t.form.submit}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-gray-500 font-medium ml-2">{t.form.note}</p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
