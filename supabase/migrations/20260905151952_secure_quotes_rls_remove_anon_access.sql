/*
# Secure quotes table — remove anon read/update/delete access

## Changes
- Drop anon SELECT, UPDATE, DELETE policies on `quotes`.
- Keep anon INSERT policy (customers submit quotes without login).
- Keep authenticated SELECT/UPDATE/DELETE policies.
*/

DROP POLICY IF EXISTS "anon_select_quotes" ON quotes;
DROP POLICY IF EXISTS "anon_update_quotes" ON quotes;
DROP POLICY IF EXISTS "anon_delete_quotes" ON quotes;
