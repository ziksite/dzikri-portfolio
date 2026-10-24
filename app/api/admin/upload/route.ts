import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { uploadImageAsWebp, type MediaFolder } from "@/lib/media";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024; // Vercel caps request bodies at 4.5 MB
const FOLDERS = new Set<string>(["projects", "articles"]);

// Uploads one image to Supabase Storage as WebP and returns its public URL
export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("file");
  const folder = String(form.get("folder") ?? "");
  if (!(file instanceof File)) return NextResponse.json({ error: "Tidak ada file." }, { status: 400 });
  if (!FOLDERS.has(folder)) return NextResponse.json({ error: "Folder tidak valid." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "File harus berupa gambar." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "Ukuran gambar maksimal 4 MB." }, { status: 413 });

  try {
    const url = await uploadImageAsWebp(Buffer.from(await file.arrayBuffer()), folder as MediaFolder);
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error && err.message.startsWith("Upload gagal") ? err.message : "Gambar tidak bisa diproses.";
    return NextResponse.json({ error: message }, { status: message.startsWith("Upload gagal") ? 500 : 400 });
  }
}
