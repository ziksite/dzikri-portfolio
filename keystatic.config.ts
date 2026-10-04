import { config, collection, fields } from "@keystatic/core";

// GitHub mode (edits become commits → Vercel redeploys) switches on once the GitHub App
// env vars exist; otherwise local mode, where edits write straight to files in this repo.
export const isGithubMode = !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;

// Local mode can only write to disk on a dev machine, so the CMS is disabled in production without GitHub mode
export const isCmsEnabled = isGithubMode || process.env.NODE_ENV === "development";

const storage = isGithubMode
  ? ({ kind: "github", repo: { owner: "ziksite", name: "dzikri-portfolio" } } as const)
  : ({ kind: "local" } as const);

export default config({
  storage,
  ui: {
    brand: { name: "Ziksite CMS" },
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: "yaml",
      columns: ["title", "kind", "status", "year", "order"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
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
        type: fields.text({ label: "Type label", description: "Badge kecil, mis. AI WEB APP" }),
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
        category: fields.text({ label: "Category" }),
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
        description: fields.text({
          label: "Description",
          description: "Paragraf pertama = ringkasan di card & lead di halaman project. Pisahkan paragraf dengan baris kosong.",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        image: fields.image({
          label: "Image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
          validation: { isRequired: true },
        }),
        imageContain: fields.checkbox({
          label: "Show image uncropped",
          description: "Pakai object-contain (untuk gambar yang tidak boleh terpotong)",
          defaultValue: false,
        }),
        link: fields.text({
          label: "Live URL",
          description: "Kosongkan atau isi # bila tidak ada — tombol akan diarahkan ke WhatsApp",
          defaultValue: "#",
        }),
        metrics: fields.array(
          fields.object({
            value: fields.text({ label: "Value" }),
            label: fields.text({ label: "Label" }),
          }),
          {
            label: "Metrics (Verified Impact)",
            itemLabel: (props) =>
              `${props.fields.value.value} — ${props.fields.label.value}`,
          }
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tech stack",
          itemLabel: (props) => props.value,
        }),
        testimonial: fields.text({ label: "Testimonial", multiline: true }),
        overview: fields.text({
          label: "Overview",
          description: "Isi utama halaman project. Kosongkan untuk memakai sisa paragraf Description.",
          multiline: true,
        }),
        features: fields.array(fields.text({ label: "Feature" }), {
          label: "Key features",
          itemLabel: (props) => props.value,
        }),
        role: fields.text({ label: "My role", multiline: true }),
      },
    }),

    articles: collection({
      label: "Articles",
      slugField: "title",
      path: "content/articles/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "publishedAt", "draft"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
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
            image: {
              directory: "public/images/articles",
              publicPath: "/images/articles/",
            },
          },
        }),
      },
    }),
  },
});
