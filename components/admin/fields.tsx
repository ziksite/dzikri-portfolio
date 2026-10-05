"use client";

import { useId, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Plus, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full bg-white border-2 border-black/20 focus:border-black rounded-xl px-3.5 py-2.5 text-sm font-medium outline-none transition-colors";

export function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[11px] font-black uppercase tracking-widest text-gray-600">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500 leading-relaxed">{hint}</p>}
    </div>
  );
}

export function TextInput({
  label,
  hint,
  value,
  onChange,
  ...props
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} {...props} />
    </Field>
  );
}

export function TextArea({
  label,
  hint,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <textarea id={id} value={value} rows={rows} onChange={(e) => onChange(e.target.value)} className={cn(inputClass, "resize-y leading-relaxed")} />
    </Field>
  );
}

export function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span
        aria-hidden="true"
        className="mt-0.5 relative h-6 w-11 shrink-0 rounded-full border-2 border-black bg-white transition-colors peer-checked:bg-black peer-focus-visible:ring-2 peer-focus-visible:ring-black peer-focus-visible:ring-offset-2 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-black after:transition-transform peer-checked:after:translate-x-5 peer-checked:after:bg-white"
      />
      <span className="flex flex-col">
        <span className="text-sm font-bold">{label}</span>
        {hint && <span className="text-xs text-gray-500">{hint}</span>}
      </span>
    </label>
  );
}

export function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

// Chips input: type and press Enter (or comma) to add
export function TagsInput({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const id = useId();
  const [draft, setDraft] = useState("");
  const add = () => {
    const t = draft.trim().replace(/,$/, "");
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <Field label={label} hint={hint ?? "Ketik lalu tekan Enter untuk menambah."} htmlFor={id}>
      <div className={cn(inputClass, "flex flex-wrap gap-1.5 items-center py-2")}>
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 bg-black text-white rounded-md pl-2 pr-1 py-0.5 text-xs font-bold">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} aria-label={`Hapus ${tag}`} className="hover:bg-white/20 rounded">
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={add}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm py-0.5"
        />
      </div>
    </Field>
  );
}

// Ordered list of rows with add / remove / move up / move down
export function ListEditor<T>({
  label,
  hint,
  items,
  onChange,
  create,
  render,
  addLabel = "Tambah",
}: {
  label: string;
  hint?: string;
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  render: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  addLabel?: string;
}) {
  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-black uppercase tracking-widest text-gray-600">{label}</span>
      {hint && <p className="text-xs text-gray-500 -mt-1">{hint}</p>}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start bg-white border-2 border-black/10 rounded-xl p-3">
          <div className="flex-1 min-w-0">{render(item, (next) => onChange(items.map((it, j) => (j === i ? next : it))), i)}</div>
          <div className="flex flex-col gap-1 shrink-0">
            <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} aria-label="Naikkan" className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30">
              <ArrowUp size={14} />
            </button>
            <button type="button" onClick={() => move(i, i + 1)} disabled={i === items.length - 1} aria-label="Turunkan" className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30">
              <ArrowDown size={14} />
            </button>
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label="Hapus" className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, create()])}
        className="self-start inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-dashed border-black/30 hover:border-black text-xs font-bold"
      >
        <Plus size={14} /> {addLabel}
      </button>
    </div>
  );
}

export async function uploadImage(file: File, folder: "projects" | "articles"): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  body.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.url) throw new Error(json.error ?? "Upload gagal.");
  return json.url as string;
}

export function ImageUpload({
  label,
  hint,
  value,
  onChange,
  folder,
  compact = false,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  folder: "projects" | "articles";
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(file, folder));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <Field label={label} hint={hint}>
      <div className={cn("flex gap-3", compact ? "items-center" : "flex-col")}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary uploaded URLs
          <img
            src={value}
            alt=""
            className={cn("rounded-xl border-2 border-black/10 bg-[#0f0f0f] object-contain", compact ? "h-16 w-24" : "w-full max-h-64")}
          />
        ) : (
          <div className={cn("rounded-xl border-2 border-dashed border-black/20 flex items-center justify-center text-gray-400", compact ? "h-16 w-24" : "h-40")}>
            <ImagePlus size={22} />
          </div>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black text-white text-xs font-bold disabled:opacity-60"
          >
            {busy ? <Loader2 size={14} className="animate-spin" /> : <ImagePlus size={14} />}
            {busy ? "Mengupload..." : value ? "Ganti gambar" : "Upload gambar"}
          </button>
          {value && !busy && (
            <button type="button" onClick={() => onChange("")} className="px-3 py-2 rounded-lg text-xs font-bold hover:bg-gray-100">
              Hapus
            </button>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
      {error && <p role="alert" className="text-xs font-bold text-red-600">{error}</p>}
    </Field>
  );
}
