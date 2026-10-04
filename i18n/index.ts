import type { Locale } from "@/lib/i18n";
import { en, type Dictionary } from "./en";
import { id } from "./id";

const dictionaries: Record<Locale, Dictionary> = { en, id };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
