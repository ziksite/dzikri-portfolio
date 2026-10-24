-- Alt text for the article cover image (written by the Telegram article bot; falls back to the title)
alter table public.articles add column if not exists cover_alt text not null default '';
