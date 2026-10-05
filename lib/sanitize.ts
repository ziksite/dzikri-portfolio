import sanitizeHtml from "sanitize-html";

// Allow-list for article HTML coming from the rich text editor
export function sanitizeArticleHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
      "a", "ul", "ol", "li", "blockquote", "code", "pre", "hr", "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    allowProtocolRelative: false,
    transformTags: {
      // External links open in a new tab without giving the target page access to this one
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const next: sanitizeHtml.Attributes = { href };
        if (/^https?:\/\//.test(href)) {
          next.target = "_blank";
          next.rel = "noopener noreferrer";
        }
        return { tagName, attribs: next };
      },
    },
  });
}
