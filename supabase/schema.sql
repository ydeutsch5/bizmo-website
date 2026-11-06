-- Launch sign-ups for bizmousa.com. Run once in the Supabase SQL editor (any project; the table name is
-- its own). The website inserts through the project's publishable (anon) key; nothing can be read,
-- changed or deleted through the public API, so the key never needs to be the service role.
create table if not exists public.bizmo_launch_signups (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (char_length(email) between 3 and 254),
  city        text not null check (char_length(city) between 1 and 120),
  user_agent  text,
  unique (email)
);

alter table public.bizmo_launch_signups enable row level security;

drop policy if exists "bizmo website can add a sign-up" on public.bizmo_launch_signups;
create policy "bizmo website can add a sign-up"
  on public.bizmo_launch_signups
  for insert
  to anon
  with check (true);

revoke select, update, delete on public.bizmo_launch_signups from anon, authenticated;
grant insert on public.bizmo_launch_signups to anon;
