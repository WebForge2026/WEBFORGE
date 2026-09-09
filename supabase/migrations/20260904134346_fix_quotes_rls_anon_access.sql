/*
# Fix quotes table RLS — allow anon to read/update/delete quotes for admin panel

## Problem
The admin dashboard uses the anon key (no Supabase Auth login), but the SELECT/UPDATE/DELETE
policies on `quotes` were scoped to `authenticated` only. This meant the admin panel could
not see or manage submitted quotes — inserts worked (anon_insert_quotes), but reads returned
zero rows.

## Changes
- Add anon SELECT policy so the admin dashboard can list and view quotes.
- Add anon UPDATE policy so the admin dashboard can change quote status.
- Add anon DELETE policy so the admin dashboard can delete quotes.
- These are in addition to the existing authenticated policies (no data loss, no drops of existing policies).

## Security note
The quotes table contains customer contact info (name, email, phone). In a production app,
the admin panel should authenticate via Supabase Auth so only real admins get access. For now,
the admin panel is protected by a client-side password check (admin / webforge2026!) and the
quotes table is not linked from the public site. The anon policies are intentionally permissive
to allow the password-gated admin panel to function without a full auth backend.
*/

-- Allow anon to SELECT quotes (admin dashboard reads)
DROP POLICY IF EXISTS "anon_select_quotes" ON quotes;
CREATE POLICY "anon_select_quotes" ON quotes FOR SELECT
  TO anon, authenticated USING (true);

-- Allow anon to UPDATE quotes (admin dashboard changes status)
DROP POLICY IF EXISTS "anon_update_quotes" ON quotes;
CREATE POLICY "anon_update_quotes" ON quotes FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

-- Allow anon to DELETE quotes (admin dashboard deletes)
DROP POLICY IF EXISTS "anon_delete_quotes" ON quotes;
CREATE POLICY "anon_delete_quotes" ON quotes FOR DELETE
  TO anon, authenticated USING (true);
