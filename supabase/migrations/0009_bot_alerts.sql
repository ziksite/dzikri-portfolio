-- Throttle for error alerts sent to Telegram: one row per error key, with when it was last sent
create table if not exists public.bot_alerts (
  key text primary key,
  last_sent timestamptz not null default now()
);
alter table public.bot_alerts enable row level security;
