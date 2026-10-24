import "server-only";

// Search-demand check from Google Autocomplete (Indonesia, Indonesian). A keyword that Google
// suggests back, or that heads longer suggestions, is something people actually type. It says
// nothing about competition; the long-tail, niche keywords the writer is steered to supply that.
export async function googleSuggest(keyword: string) {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=id&gl=id&q=${encodeURIComponent(keyword)}`;
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    const [, suggestions] = (await res.json()) as [string, string[]];
    const kw = keyword.trim().toLowerCase();
    const related = suggestions.filter((s) => s.toLowerCase().startsWith(kw));
    return { searched: related.length > 0, variations: related.length };
  } catch {
    // Autocomplete is best-effort; ideas still go out unverified if Google doesn't answer
    return null;
  }
}
