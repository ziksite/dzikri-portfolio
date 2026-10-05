-- Industry of the client, used by the industry filter on /projects.
-- Values come from INDUSTRIES in lib/cms-types.ts (English keys; the site translates them).
alter table public.projects add column if not exists industry text not null default '';
create index if not exists projects_industry_idx on public.projects (industry);
