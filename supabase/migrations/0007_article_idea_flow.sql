-- /ide flow: ideas belong to a batch (one /ide reply) and move new -> awaiting_cover -> used.
-- At most one idea waits for a cover photo at a time; the next photo sent to the bot is its cover.
alter table public.article_ideas add column if not exists batch_id uuid;
alter table public.article_ideas add column if not exists position int not null default 0;
alter table public.article_ideas add column if not exists angle text not null default '';
alter table public.article_ideas add column if not exists status text not null default 'new'
  check (status in ('new', 'awaiting_cover', 'used'));
create index if not exists article_ideas_batch_idx on public.article_ideas (batch_id, position);
