/*
# Secure WebForge admin access and public lead intake

1. New Tables
- `admin_users`
- `user_id` (uuid, primary key, references the Supabase auth user)
- `is_active` (boolean, defaults to true)
- `created_at` (timestamp, defaults to now())

2. Modified Security
- Adds a database-backed admin allowlist checked by `public.is_admin()`.
- Replaces authenticated-only admin policies with policies requiring an active allowlisted admin.
- Removes public read, update, and delete access to `leads`.
- Restricts public lead inserts to new leads and prevents public callers from supplying `id`, `status`, or `created_at`.
- Keeps public portfolio reads and admin-only portfolio mutations.
- Removes direct client privileges on the admin allowlist.

3. Important Notes
- Existing auth users are not automatically made admins.
- An operator must add the intended admin user's UUID to `public.admin_users` after deployment.
- No existing lead or portfolio data is deleted or changed.
*/

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.admin_users FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
      AND is_active = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

REVOKE SELECT, UPDATE, DELETE ON TABLE public.leads FROM anon;
REVOKE INSERT (id, status, created_at) ON TABLE public.leads FROM anon;
GRANT INSERT (name, email, phone, project_type, features_selected, estimated_budget, message, language) ON TABLE public.leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.leads TO authenticated;

REVOKE INSERT, UPDATE, DELETE ON TABLE public.portfolio_items FROM anon;
GRANT SELECT ON TABLE public.portfolio_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.portfolio_items TO authenticated;

DROP POLICY IF EXISTS "public_insert_leads" ON public.leads;
CREATE POLICY "public_insert_leads"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new');

DROP POLICY IF EXISTS "admin_select_leads" ON public.leads;
CREATE POLICY "admin_select_leads"
ON public.leads FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "admin_update_leads" ON public.leads;
CREATE POLICY "admin_update_leads"
ON public.leads FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_leads" ON public.leads;
CREATE POLICY "admin_delete_leads"
ON public.leads FOR DELETE
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "public_select_portfolio" ON public.portfolio_items;
CREATE POLICY "public_select_portfolio"
ON public.portfolio_items FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "admin_insert_portfolio" ON public.portfolio_items;
CREATE POLICY "admin_insert_portfolio"
ON public.portfolio_items FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_update_portfolio" ON public.portfolio_items;
CREATE POLICY "admin_update_portfolio"
ON public.portfolio_items FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "admin_delete_portfolio" ON public.portfolio_items;
CREATE POLICY "admin_delete_portfolio"
ON public.portfolio_items FOR DELETE
TO authenticated
USING (public.is_admin());