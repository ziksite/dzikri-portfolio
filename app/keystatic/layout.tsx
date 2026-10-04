import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCmsEnabled } from "@/keystatic.config";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Ziksite CMS",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  if (!isCmsEnabled) notFound();
  return <KeystaticApp />;
}
