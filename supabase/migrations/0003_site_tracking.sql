-- First-party tracking for the Telegram reports: page views and lead clicks.
-- No cookies or IPs are stored; visitor_hash is a daily-rotating hash (see app/api/track).
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  referrer_host text not null default '',
  visitor_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_idx on public.page_views (created_at);

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  method text not null check (method in ('whatsapp', 'email')),
  location text not null default '',
  path text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists leads_created_idx on public.leads (created_at);

alter table public.page_views enable row level security;
alter table public.leads enable row level security;
