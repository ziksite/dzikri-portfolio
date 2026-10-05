import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import sharp from "sharp";
import { isAdmin } from "@/lib/admin-auth";
import { MEDIA_BUCKET, supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const MAX_BYTES = 4 * 1024 * 1024; // Vercel caps request bodies at 4.5 MB
const FOLDERS = new Set(["projects", "articles"]);

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

  let webp: Buffer;
  try {
    webp = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate() // respect EXIF orientation from phone photos
      .resize({ width: 2000, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: "Gambar tidak bisa diproses." }, { status: 400 });
  }

  const objectPath = `${folder}/${new Date().toISOString().slice(0, 7)}/${randomUUID()}.webp`;
  const storage = supabase().storage.from(MEDIA_BUCKET);
  const { error } = await storage.upload(objectPath, webp, { contentType: "image/webp", cacheControl: "31536000" });
  if (error) return NextResponse.json({ error: `Upload gagal: ${error.message}` }, { status: 500 });

  return NextResponse.json({ url: storage.getPublicUrl(objectPath).data.publicUrl });
}
