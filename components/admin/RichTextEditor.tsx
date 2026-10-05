"use client";

import { useRef, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Loader2, Minus, Quote, Redo2,
  Underline, Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImage } from "./fields";

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()} // keep the editor selection
      onClick={onClick}
      className={cn(
        "h-9 w-9 inline-flex items-center justify-center rounded-lg transition-colors disabled:opacity-30",
        active ? "bg-black text-white" : "hover:bg-gray-100"
      )}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Alamat link (kosongkan untuk menghapus link):", previous ?? "https://");
    if (url === null) return;
    if (!url.trim() || url.trim() === "https://") editor.chain().focus().extendMarkRange("link").unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const insertImage = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    try {
      const src = await uploadImage(file, "articles");
      const alt = window.prompt("Deskripsi gambar (untuk pembaca layar & SEO):", "") ?? "";
      editor.chain().focus().setImage({ src, alt }).run();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Upload gagal.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const c = () => editor.chain().focus();
  return (
    <div className="sticky top-16 z-10 flex flex-wrap items-center gap-0.5 border-b-2 border-black/10 bg-white px-2 py-1.5 rounded-t-[17px]">
      <ToolbarButton label="Judul bagian (H2)" active={editor.isActive("heading", { level: 2 })} onClick={() => c().toggleHeading({ level: 2 }).run()}>
        <Heading2 size={17} />
      </ToolbarButton>
      <ToolbarButton label="Sub-judul (H3)" active={editor.isActive("heading", { level: 3 })} onClick={() => c().toggleHeading({ level: 3 }).run()}>
        <Heading3 size={17} />
      </ToolbarButton>
      <span className="mx-1 h-6 w-px bg-black/10" />
      <ToolbarButton label="Tebal" active={editor.isActive("bold")} onClick={() => c().toggleBold().run()}>
        <Bold size={16} />
      </ToolbarButton>
      <ToolbarButton label="Miring" active={editor.isActive("italic")} onClick={() => c().toggleItalic().run()}>
        <Italic size={16} />
      </ToolbarButton>
      <ToolbarButton label="Garis bawah" active={editor.isActive("underline")} onClick={() => c().toggleUnderline().run()}>
        <Underline size={16} />
      </ToolbarButton>
      <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
        <Link2 size={16} />
      </ToolbarButton>
      <span className="mx-1 h-6 w-px bg-black/10" />
      <ToolbarButton label="Daftar poin" active={editor.isActive("bulletList")} onClick={() => c().toggleBulletList().run()}>
        <List size={17} />
      </ToolbarButton>
      <ToolbarButton label="Daftar bernomor" active={editor.isActive("orderedList")} onClick={() => c().toggleOrderedList().run()}>
        <ListOrdered size={17} />
      </ToolbarButton>
      <ToolbarButton label="Kutipan" active={editor.isActive("blockquote")} onClick={() => c().toggleBlockquote().run()}>
        <Quote size={16} />
      </ToolbarButton>
      <ToolbarButton label="Garis pemisah" onClick={() => c().setHorizontalRule().run()}>
        <Minus size={17} />
      </ToolbarButton>
      <ToolbarButton label="Sisipkan gambar" disabled={uploading} onClick={() => fileRef.current?.click()}>
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
      </ToolbarButton>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => insertImage(e.target.files?.[0])} />
      <span className="mx-1 h-6 w-px bg-black/10" />
      <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={() => c().undo().run()}>
        <Undo2 size={16} />
      </ToolbarButton>
      <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={() => c().redo().run()}>
        <Redo2 size={16} />
      </ToolbarButton>
    </div>
  );
}

export function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image,
    ],
    content: value,
    immediatelyRender: false, // avoid SSR hydration mismatch
    shouldRerenderOnTransaction: true, // keep toolbar active states in sync
    editorProps: {
      attributes: { class: "min-h-[420px] px-5 md:px-8 py-6 outline-none", "aria-label": "Isi artikel" },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <div className="bg-white border-[3px] border-black rounded-[20px]">
      {editor ? <Toolbar editor={editor} /> : <div className="h-[50px] border-b-2 border-black/10" />}
      <div className="article-body">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
