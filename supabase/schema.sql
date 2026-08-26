-- PathYatra Partner — Pre-Apply table
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query).

create table if not exists public.pre_applications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  full_name   text not null,
  mobile      text not null,
  city        text not null,
  total_buses text not null,
  bus_types   text[] default '{}',
  routes      text,
  ticketing   text,
  timeline    text,
  language    text default 'en'
);

-- Enable Row Level Security
alter table public.pre_applications enable row level security;

-- Allow anonymous (public) inserts from the landing page, but NOT reads.
-- The anon key can only add new applications; it cannot list existing ones.
create policy "Allow anonymous inserts"
  on public.pre_applications
  for insert
  to anon
  with check (true);

-- (Owners/admins read data via the Supabase dashboard or a service-role key,
--  which is never exposed to the browser.)
