"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Loader2, Save, Trash2 } from "lucide-react";
import { deleteArticle, saveArticle, type ArticleInput } from "@/app/admin-cms/actions";
import { slugify } from "@/lib/slugify";
import { cn } from "@/lib/utils";
import { ImageUpload, TagsInput, TextArea, TextInput, Toggle } from "./fields";
import { RichTextEditor } from "./RichTextEditor";

export function ArticleForm({ initial, id }: { initial?: ArticleInput; id?: string }) {
  const router = useRouter();
  const [a, setA] = useState<ArticleInput>(
    initial ?? {
      slug: "",
      title: "",
      excerpt: "",
      content_html: "",
      cover_image: "",
      cover_credit: "",
      cover_credit_url: "",
      tags: [],
      published_at: new Date().toISOString().slice(0, 10),
      draft: true,
    }
  );
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const set = <K extends keyof ArticleInput>(key: K) => (v: ArticleInput[K]) => setA((prev) => ({ ...prev, [key]: v }));

  const save = () =>
    startTransition(async () => {
      setMessage(null);
      const result = await saveArticle({ ...a, id });
      if (!result.ok) return setMessage({ type: "error", text: result.error });
      setMessage({ type: "ok", text: a.draft ? "Tersimpan sebagai draft (belum tampil di website)." : "Tersimpan & tampil di website." });
      if (!id) router.replace(`/admin-cms/articles/${result.id}`);
      else router.refresh();
    });

  const remove = () => {
    if (!id || !confirm(`Hapus artikel "${a.title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    startTransition(async () => {
      const result = await deleteArticle(id);
      if (!result.ok) return setMessage({ type: "error", text: result.error });
      router.replace("/admin-cms/articles");
    });
  };

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6 pb-28">
      <div className="flex flex-col gap-5 min-w-0">
        <input
          aria-label="Judul artikel"
          placeholder="Judul artikel"
          value={a.title}
          onChange={(e) => {
            const title = e.target.value;
            setA((prev) => ({ ...prev, title, slug: slugTouched ? prev.slug : slugify(title) }));
          }}
          className="w-full bg-transparent text-3xl md:text-4xl font-black uppercase tracking-tighter outline-none placeholder:text-gray-300"
        />
        <RichTextEditor value={a.content_html} onChange={set("content_html")} />
      </div>

      <aside className="flex flex-col gap-5 bg-white border-[3px] border-black rounded-[20px] p-5 lg:sticky lg:top-24 lg:self-start">
        <Toggle label="Draft" hint="Draft tidak tampil di website." checked={a.draft} onChange={set("draft")} />
        <TextInput label="Tanggal terbit" type="date" value={a.published_at} onChange={set("published_at")} />
        <TextInput
          label="Slug (URL)"
          hint={`/id/blog/${a.slug || "<slug>"}`}
          value={a.slug}
          onChange={(v) => {
            setSlugTouched(true);
            set("slug")(slugify(v));
          }}
        />
        <TextArea label="Ringkasan" hint={`Untuk daftar artikel & meta description. ${a.excerpt.length}/300`} value={a.excerpt} onChange={set("excerpt")} rows={4} />
        <TagsInput label="Tag" value={a.tags} onChange={set("tags")} />
        <ImageUpload label="Cover image" folder="articles" value={a.cover_image} onChange={set("cover_image")} />
        <TextInput label="Kredit foto cover" hint='Tampil sebagai "Foto: <nama> / Unsplash"' value={a.cover_credit} onChange={set("cover_credit")} />
        <TextInput label="Link sumber foto" placeholder="https://unsplash.com/photos/..." value={a.cover_credit_url} onChange={set("cover_credit_url")} />
      </aside>

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t-[3px] border-black">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-60"
          >
            {pending ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {pending ? "Menyimpan..." : "Simpan"}
          </button>
          {id && a.slug && !a.draft && (
            <a href={`/id/blog/${a.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-3 rounded-xl hover:bg-gray-100">
              <ExternalLink size={14} /> Lihat di website
            </a>
          )}
          {message && (
            <p role={message.type === "error" ? "alert" : "status"} className={cn("text-sm font-bold", message.type === "error" ? "text-red-600" : "text-green-700")}>
              {message.text}
            </p>
          )}
          {id && (
            <button type="button" onClick={remove} disabled={pending} className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-red-600 px-3 py-3 rounded-xl hover:bg-red-50">
              <Trash2 size={14} /> Hapus artikel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
