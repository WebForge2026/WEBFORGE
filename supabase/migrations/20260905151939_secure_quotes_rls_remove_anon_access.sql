/*
# Secure quotes table — remove anon read/update/delete access

## Problem
The previous migration (fix_quotes_rls_anon_access) added anon SELECT/UPDATE/DELETE
policies so the password-gated admin panel could function without Supabase Auth.
This is a security hole: the anon key is public (embedded in the frontend), so anyone
can read all customer contact data (names, emails, phones) and delete quotes at will.

## Changes
- Drop the anon SELECT, UPDATE, and DELETE policies on `quotes`.
- Keep the anon INSERT policy (customers submit quotes without login — this is intended).
- Keep authenticated SELECT/UPDATE/DELETE policies (admin signs in via Supabase Auth).
- After this migration, only authenticated users can read, update, or delete quotes.
  Anonymous visitors can still submit new quotes but cannot view or modify existing ones.

## Security
- The admin panel now uses Supabase Auth (email/password) instead of a hardcoded password.
- Public signups should be disabled in Supabase Dashboard → Authentication → Settings
  after the admin account is created, to prevent unauthorized users from signing up.
*/
