import { config, collection, fields } from "@keystatic/core";

// GitHub mode (edits become commits → Vercel redeploys) switches on once the GitHub App
// env vars exist; otherwise local mode, where edits write straight to files in this repo.
// NEXT_PUBLIC_KEYSTATIC_SETUP=github forces GitHub mode locally to run Keystatic's
// one-time "create GitHub App" wizard, which then writes the real env vars to .env.
export const isGithubMode =
  !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG || process.env.NEXT_PUBLIC_KEYSTATIC_SETUP === "github";

// Local mode can only write to disk on a dev machine, so the CMS is disabled in production without GitHub mode
export const isCmsEnabled = isGithubMode || process.env.NODE_ENV === "development";

const storage = isGithubMode
  ? ({ kind: "github", repo: { owner: "ziksite", name: "dzikri-portfolio" } } as const)
  : ({ kind: "local" } as const);

const paragraphs = "Pisahkan paragraf dengan baris kosong.";

// Articles are written in Indonesian only; the English site lists them and links to /id/blog
const articles = collection({
  label: "Articles",
  slugField: "title",
  path: "content/articles/*",
  format: { contentField: "content" },
  entryLayout: "content",
  columns: ["title", "publishedAt", "draft"],
  schema: {
    title: fields.slug({
      name: { label: "Judul" },
      slug: { label: "Slug (URL)", description: "Alamat artikel: /id/blog/<slug>" },
    }),
    publishedAt: fields.date({
      label: "Published date",
      defaultValue: { kind: "today" },
      validation: { isRequired: true },
    }),
    draft: fields.checkbox({
      label: "Draft",
      description: "Draft tidak tampil di website",
      defaultValue: true,
    }),
    excerpt: fields.text({
      label: "Excerpt",
      description: "Ringkasan 1–2 kalimat untuk list artikel & meta description",
      multiline: true,
      validation: { length: { min: 1, max: 300 } },
    }),
    coverImage: fields.image({
      label: "Cover image",
      directory: "public/images/articles",
      publicPath: "/images/articles/",
    }),
    tags: fields.array(fields.text({ label: "Tag" }), {
      label: "Tags",
      itemLabel: (props) => props.value,
    }),
    content: fields.markdoc({
      label: "Content",
      options: {
        image: { directory: "public/images/articles", publicPath: "/images/articles/" },
      },
    }),
  },
});

export default config({
  storage,
  ui: {
    brand: { name: "Ziksite CMS" },
    navigation: {
      Portfolio: ["projects"],
      Blog: ["articles"],
    },
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: "yaml",
      columns: ["title", "kind", "status", "year", "order"],
      schema: {
        title: fields.slug({ name: { label: "Title (EN)" } }),
        order: fields.integer({
          label: "Order",
          description: "Posisi di carousel — angka kecil tampil lebih dulu",
          defaultValue: 100,
          validation: { isRequired: true },
        }),
        hidden: fields.checkbox({
          label: "Hidden",
          description: "Sembunyikan project ini dari website tanpa menghapusnya",
          defaultValue: false,
        }),
        type: fields.text({ label: "Type label (EN)", description: "Badge kecil, mis. AI WEB APP" }),
        kind: fields.select({
          label: "Kind (filter)",
          options: [
            { label: "AI Automation", value: "AI Automation" },
            { label: "Web App", value: "Web App" },
            { label: "Internal System", value: "Internal System" },
            { label: "Website", value: "Website" },
          ],
          defaultValue: "Website",
        }),
        category: fields.text({ label: "Category (EN)" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "LIVE", value: "LIVE" },
            { label: "PRIVATE", value: "PRIVATE" },
          ],
          defaultValue: "LIVE",
        }),
        client: fields.text({ label: "Client", defaultValue: "Confidential" }),
        year: fields.text({ label: "Year" }),
        image: fields.image({
          label: "Cover image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
          validation: { isRequired: true },
        }),
        imageContain: fields.checkbox({
          label: "Show cover uncropped",
          description: "Pakai object-contain (untuk gambar yang tidak boleh terpotong)",
          defaultValue: false,
        }),
        link: fields.text({
          label: "Live URL",
          description: "Kosongkan atau isi # bila tidak ada",
          defaultValue: "#",
        }),

        // Case study (EN)
        summary: fields.text({
          label: "Summary (EN)",
          description: "1 paragraf: tampil di card & sebagai lead halaman case study.",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        challenge: fields.text({
          label: "01 · Challenge (EN)",
          description: `Masalah bisnis yang diselesaikan. ${paragraphs}`,
          multiline: true,
        }),
        solution: fields.text({
          label: "02 · Solution (EN)",
          description: `Apa yang dibangun & pendekatannya. ${paragraphs}`,
          multiline: true,
        }),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Key features (EN)",
          itemLabel: (props) => props.value,
        }),
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: "Image",
              directory: "public/images/projects",
              publicPath: "/images/projects/",
              validation: { isRequired: true },
            }),
            caption: fields.text({ label: "Caption (EN)" }),
            captionId: fields.text({ label: "Caption (ID)" }),
          }),
          {
            label: "03 · Feature gallery",
            description: "Screenshot fitur. Tampil sebagai grid, klik untuk lightbox.",
            itemLabel: (props) => props.fields.caption.value || "Image",
          }
        ),
        impact: fields.text({
          label: "04 · Impact (EN)",
          description: `Opsional — dampak dalam kalimat, tampil di atas metrics. ${paragraphs}`,
          multiline: true,
        }),
        metrics: fields.array(
          fields.object({
            value: fields.text({ label: "Value" }),
            label: fields.text({ label: "Label (EN)" }),
            labelId: fields.text({ label: "Label (ID)" }),
          }),
          {
            label: "Impact metrics",
            itemLabel: (props) => `${props.fields.value.value} — ${props.fields.label.value}`,
          }
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Technology",
          itemLabel: (props) => props.value,
        }),
        role: fields.text({ label: "My role (EN)", multiline: true }),
        testimonial: fields.text({ label: "Testimonial (EN)", multiline: true }),

        // Indonesian translation — empty fields fall back to English
        translation: fields.object(
          {
            title: fields.text({ label: "Title (ID)" }),
            type: fields.text({ label: "Type label (ID)" }),
            category: fields.text({ label: "Category (ID)" }),
            summary: fields.text({ label: "Summary (ID)", multiline: true }),
            challenge: fields.text({ label: "Challenge (ID)", multiline: true }),
            solution: fields.text({ label: "Solution (ID)", multiline: true }),
            features: fields.array(fields.text({ label: "Feature" }), {
              label: "Key features (ID)",
              itemLabel: (props) => props.value,
            }),
            impact: fields.text({ label: "Impact (ID)", multiline: true }),
            role: fields.text({ label: "My role (ID)", multiline: true }),
            testimonial: fields.text({ label: "Testimonial (ID)", multiline: true }),
          },
          {
            label: "Bahasa Indonesia",
            description: "Terjemahan untuk /id. Field yang kosong otomatis memakai versi English.",
          }
        ),
      },
    }),

    articles,
  },
});
