import "server-only";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { MEDIA_BUCKET, supabase } from "@/lib/supabase";

export type MediaFolder = "projects" | "articles";

// Converts an image to WebP (max 2000px wide, EXIF rotation applied) and stores it in the public
// media bucket. Throws if the image can't be decoded or the upload fails; returns the public URL.
export async function uploadImageAsWebp(input: Buffer, folder: MediaFolder) {
  const webp = await sharp(input)
    .rotate() // respect EXIF orientation from phone photos
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toBuffer();

  const objectPath = `${folder}/${new Date().toISOString().slice(0, 7)}/${randomUUID()}.webp`;
  const storage = supabase().storage.from(MEDIA_BUCKET);
  const { error } = await storage.upload(objectPath, webp, { contentType: "image/webp", cacheControl: "31536000" });
  if (error) throw new Error(`Upload gagal: ${error.message}`);
  return storage.getPublicUrl(objectPath).data.publicUrl;
}

// A downscaled JPEG copy for Claude's vision input, whatever format the original came in
export async function toVisionJpeg(input: Buffer) {
  return sharp(input).rotate().resize({ width: 1568, height: 1568, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer();
}
