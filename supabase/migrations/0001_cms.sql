-- CMS schema: projects + articles, plus a public "media" storage bucket.
-- Row Level Security is on with no policies: only the server (secret key) can read or write.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  sort_order integer not null default 100,
  hidden boolean not null default false,
  kind text not null default 'Website',
  status text not null default 'LIVE' check (status in ('LIVE', 'PRIVATE')),
  client text not null default '',
  year text not null default '',
  image_url text not null default '',
  image_contain boolean not null default false,
  link text not null default '',
  tags text[] not null default '{}',
  -- [{ "value": "24/7", "label": "ALWAYS-ON RESPONSE", "labelId": "RESPON TANPA HENTI" }]
  metrics jsonb not null default '[]',
  -- [{ "image": "https://...", "caption": "...", "captionId": "..." }]
  gallery jsonb not null default '[]',
  -- Text per language: { title, type, category, summary, challenge, solution, impact, role, testimonial, features[] }
  -- Empty Indonesian fields fall back to English on the site.
  content_en jsonb not null default '{}',
  content_id jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  excerpt text not null default '',
  content_html text not null default '',
  cover_image text not null default '',
  cover_credit text not null default '',
  cover_credit_url text not null default '',
  tags text[] not null default '{}',
  published_at date not null default current_date,
  draft boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_sort_idx on public.projects (sort_order);
create index if not exists articles_published_idx on public.articles (published_at desc);

create or replace function public.set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

drop trigger if exists articles_updated_at on public.articles;
create trigger articles_updated_at before update on public.articles
  for each row execute function public.set_updated_at();

alter table public.projects enable row level security;
alter table public.articles enable row level security;

-- Public bucket: uploaded images are served by URL; uploads go through the server only
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 5242880, array['image/webp', 'image/png', 'image/jpeg', 'image/gif'])
on conflict (id) do update set public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
