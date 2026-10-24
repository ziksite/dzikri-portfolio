import "server-only";
import { revalidatePath } from "next/cache";

// Re-render every site page (both languages) and the sitemap after content changes
export function refreshSite() {
  revalidatePath("/[lang]", "layout");
  revalidatePath("/sitemap.xml");
}
