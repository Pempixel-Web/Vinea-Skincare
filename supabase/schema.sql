-- ============================================================================
-- Vinea waitlist — Supabase schema + Row Level Security policy
-- Run this in the Supabase SQL editor before going live.
-- ============================================================================

create extension if not exists "pgcrypto";

create table if not exists public.vinea_waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  instagram_joined boolean not null default false,
  created_at timestamptz not null default now(),
  source text not null default 'instagram_ugc'
);

-- Required for duplicate-email detection to work WITHOUT granting the
-- public client SELECT access (see src/lib/waitlist.js — it relies on
-- Postgres error code 23505 from this constraint).
create unique index if not exists vinea_waitlist_email_key
  on public.vinea_waitlist (lower(email));

alter table public.vinea_waitlist enable row level security;

-- Anyone (the anon/publishable key) may INSERT a waitlist row...
create policy "Allow public insert to waitlist"
  on public.vinea_waitlist
  for insert
  to anon
  with check (true);

-- ...but nobody using the public key may SELECT, UPDATE, or DELETE.
-- No select/update/delete policies are created for the anon role, which
-- means those operations are denied by default under RLS.
