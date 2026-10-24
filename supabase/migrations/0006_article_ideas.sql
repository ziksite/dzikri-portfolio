-- Topic ideas suggested by the Telegram bot's /ide command, kept so later requests don't repeat them
create table if not exists public.article_ideas (
  id bigint generated always as identity primary key,
  topic text not null,
  keyword text not null default '',
  created_at timestamptz not null default now()
);
alter table public.article_ideas enable row level security;
