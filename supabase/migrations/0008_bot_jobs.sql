-- Article jobs started from Telegram, so a running job can be cancelled from its progress message
create table if not exists public.bot_jobs (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'running' check (status in ('running', 'cancelled', 'done')),
  created_at timestamptz not null default now()
);
alter table public.bot_jobs enable row level security;
