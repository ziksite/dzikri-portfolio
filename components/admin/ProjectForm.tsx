"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Loader2, Save, Trash2 } from "lucide-react";
import { deleteProject, saveProject, type ProjectInput } from "@/app/admin-cms/actions";
import { INDUSTRIES, PROJECT_KINDS, emptyProjectText, type ProjectText } from "@/lib/cms-types";
import { slugify } from "@/lib/slugify";
import { cn } from "@/lib/utils";
import { ImageUpload, ListEditor, Select, TagsInput, TextArea, TextInput, Toggle, inputClass } from "./fields";

const PARAGRAPH_HINT = "Pisahkan paragraf dengan baris kosong.";

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border-[3px] border-black rounded-[20px] p-5 md:p-7">
      <h2 className="text-lg font-black uppercase tracking-tight">{title}</h2>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}

function ContentFields({
  lang,
  value,
  onChange,
}: {
  lang: "en" | "id";
  value: ProjectText;
  onChange: (v: ProjectText) => void;
}) {
  const set = <K extends keyof ProjectText>(key: K) => (v: ProjectText[K]) => onChange({ ...value, [key]: v });
  const req = lang === "en" ? " *" : "";
  return (
    <>
      {lang === "id" && (
        <p className="text-xs font-bold bg-gray-100 rounded-lg px-3 py-2">
          Kolom yang dikosongkan otomatis memakai versi English di website /id.
        </p>
      )}
      <TextInput label={`Judul${req}`} value={value.title} onChange={set("title")} />
      <div className="grid sm:grid-cols-2 gap-5">
        <TextInput label="Label tipe (badge)" hint="mis. AI WEB APP" value={value.type} onChange={set("type")} />
        <TextInput label="Kategori" value={value.category} onChange={set("category")} />
      </div>
      <TextArea label={`Summary${req}`} hint="1 paragraf — tampil di card & sebagai lead halaman case study." value={value.summary} onChange={set("summary")} rows={3} />
      <TextArea label="01 · Challenge" hint={PARAGRAPH_HINT} value={value.challenge} onChange={set("challenge")} rows={5} />
      <TextArea label="02 · Solution" hint={PARAGRAPH_HINT} value={value.solution} onChange={set("solution")} rows={5} />
      <ListEditor
        label="Fitur utama / modul utama"
        hint="Tampil sebagai section 03 di halaman project. Untuk Sistem Internal judulnya “Modul Utama”."
        items={value.features}
        onChange={set("features")}
        create={() => ""}
        addLabel="Tambah fitur"
        render={(item, update) => <input value={item} onChange={(e) => update(e.target.value)} className={inputClass} />}
      />
      <TextArea label="Peran saya" value={value.role} onChange={set("role")} rows={2} />
      <TextArea label="Testimonial" value={value.testimonial} onChange={set("testimonial")} rows={2} />
    </>
  );
}

export function ProjectForm({ initial, id }: { initial?: ProjectInput; id?: string }) {
  const router = useRouter();
  const [p, setP] = useState<ProjectInput>(
    initial ?? {
      slug: "",
      sort_order: 100,
      hidden: false,
      kind: "Website",
      industry: "",
      status: "LIVE",
      client: "Confidential",
      year: String(new Date().getFullYear()),
      image_url: "",
      image_contain: false,
      link: "",
      tags: [],
      metrics: [],
      gallery: [],
      content_en: emptyProjectText(),
      content_id: emptyProjectText(),
    }
  );
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [tab, setTab] = useState<"en" | "id">("en");
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof ProjectInput>(key: K) => (v: ProjectInput[K]) => setP((prev) => ({ ...prev, [key]: v }));

  const save = () =>
    startTransition(async () => {
      setMessage(null);
      const result = await saveProject({ ...p, id });
      if (!result.ok) return setMessage({ type: "error", text: result.error });
      setMessage({ type: "ok", text: "Tersimpan. Website sudah diperbarui." });
      if (!id) router.replace(`/admin-cms/projects/${result.id}`);
      else router.refresh();
    });

  const remove = () => {
    if (!id || !confirm(`Hapus project "${p.content_en.title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    startTransition(async () => {
      const result = await deleteProject(id);
      if (!result.ok) return setMessage({ type: "error", text: result.error });
      router.replace("/admin-cms/projects");
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-28">
      <Card title="Umum">
        <TextInput
          label="Slug (URL) *"
          hint={`Alamat halaman: /projects/${p.slug || "<slug>"}. Mengubah slug membuat link lama tidak berlaku.`}
          value={p.slug}
          onChange={(v) => {
            setSlugTouched(true);
            set("slug")(slugify(v));
          }}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Select label="Jenis (filter)" value={p.kind} options={PROJECT_KINDS} onChange={set("kind")} />
          <Select label="Industri (filter)" value={p.industry} options={["", ...INDUSTRIES]} emptyLabel="— Pilih industri —" onChange={set("industry")} />
          <Select label="Status" value={p.status} options={["LIVE", "PRIVATE"]} onChange={(v) => set("status")(v as "LIVE" | "PRIVATE")} />
          <TextInput label="Urutan" hint="Angka kecil tampil lebih dulu" type="number" value={String(p.sort_order)} onChange={(v) => set("sort_order")(Number(v))} />
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          <TextInput label="Klien" value={p.client} onChange={set("client")} />
          <TextInput label="Tahun" value={p.year} onChange={set("year")} />
          <TextInput label="Live URL" hint="Kosongkan bila tidak ada" placeholder="https://" value={p.link} onChange={set("link")} />
        </div>
        <ImageUpload label="Cover image *" folder="projects" value={p.image_url} onChange={set("image_url")} />
        <Toggle label="Tampilkan cover utuh (tidak dipotong)" checked={p.image_contain} onChange={set("image_contain")} />
        <TagsInput label="Teknologi" value={p.tags} onChange={set("tags")} />
        <Toggle label="Sembunyikan dari website" hint="Project tetap tersimpan, hanya tidak tampil." checked={p.hidden} onChange={set("hidden")} />
      </Card>

      <Card title="Konten case study">
        <div role="tablist" aria-label="Bahasa" className="inline-flex self-start rounded-full border-2 border-black p-0.5">
          {(["en", "id"] as const).map((l) => (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={tab === l}
              onClick={() => setTab(l)}
              className={cn("px-4 py-1.5 rounded-full text-xs font-black tracking-widest", tab === l ? "bg-black text-white" : "hover:bg-gray-100")}
            >
              {l === "en" ? "ENGLISH" : "INDONESIA"}
            </button>
          ))}
        </div>
        {tab === "en" ? (
          <ContentFields
            lang="en"
            value={p.content_en}
            onChange={(v) => {
              setP((prev) => ({ ...prev, content_en: v, slug: slugTouched ? prev.slug : slugify(v.title) }));
            }}
          />
        ) : (
          <ContentFields lang="id" value={p.content_id} onChange={set("content_id")} />
        )}
      </Card>

      <Card title="Metrics" hint="Tampil di card project (homepage & carousel). Maksimal 3 yang ideal.">
        <ListEditor
          label="Metrics"
          items={p.metrics}
          onChange={set("metrics")}
          create={() => ({ value: "", label: "", labelId: "" })}
          addLabel="Tambah metric"
          render={(m, update) => (
            <div className="grid sm:grid-cols-3 gap-2">
              <input aria-label="Nilai" placeholder="Nilai, mis. 24/7" value={m.value} onChange={(e) => update({ ...m, value: e.target.value })} className={inputClass} />
              <input aria-label="Label EN" placeholder="Label (EN)" value={m.label} onChange={(e) => update({ ...m, label: e.target.value })} className={inputClass} />
              <input aria-label="Label ID" placeholder="Label (ID)" value={m.labelId} onChange={(e) => update({ ...m, labelId: e.target.value })} className={inputClass} />
            </div>
          )}
        />
      </Card>

      <Card title="04 · Galeri fitur" hint="Screenshot fitur — tampil sebagai grid di halaman case study, klik untuk memperbesar.">
        <ListEditor
          label="Gambar"
          items={p.gallery}
          onChange={set("gallery")}
          create={() => ({ image: "", caption: "", captionId: "" })}
          addLabel="Tambah gambar"
          render={(g, update) => (
            <div className="flex flex-col gap-2">
              <ImageUpload compact label="Gambar" folder="projects" value={g.image} onChange={(url) => update({ ...g, image: url })} />
              <div className="grid sm:grid-cols-2 gap-2">
                <input aria-label="Caption EN" placeholder="Caption (EN)" value={g.caption} onChange={(e) => update({ ...g, caption: e.target.value })} className={inputClass} />
                <input aria-label="Caption ID" placeholder="Caption (ID)" value={g.captionId} onChange={(e) => update({ ...g, captionId: e.target.value })} className={inputClass} />
              </div>
            </div>
          )}
        />
      </Card>

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
          {id && p.slug && !p.hidden && (
            <a href={`/projects/${p.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-3 rounded-xl hover:bg-gray-100">
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
              <Trash2 size={14} /> Hapus project
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
