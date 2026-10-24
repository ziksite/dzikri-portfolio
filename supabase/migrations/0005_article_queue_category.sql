-- Publish queue for the Telegram bot: a draft with queued_at set is published by the twice-daily cron,
-- oldest first. Category is one of ARTICLE_CATEGORIES in lib/cms-types.ts ('' = none).
alter table public.articles add column if not exists queued_at timestamptz;
alter table public.articles add column if not exists category text not null default '';
create index if not exists articles_queue_idx on public.articles (queued_at) where queued_at is not null;

update public.articles set category = 'AI Automation' where slug = 'where-ai-automation-pays-off' and category = '';
update public.articles set category = 'Strategi Digital' where slug = 'technology-as-a-business-enabler' and category = '';
update public.articles set category = 'Aplikasi Bisnis' where slug = 'from-fragmented-processes-to-integrated-systems' and category = '';
