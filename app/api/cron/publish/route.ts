import { NextResponse, type NextRequest } from "next/server";
import { publishNextQueued } from "@/lib/article-queue";

export const runtime = "nodejs";

// Afternoon publish slot (vercel.json, ~16:00 WIB). Stays silent when the queue is empty; the
// morning report already says so.
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { published, remaining } = await publishNextQueued();
  return NextResponse.json({ ok: true, published: published?.slug ?? null, remaining });
}
