/*
# Move admin authorization helper out of the public API schema

1. Modified Security
- Creates a private schema for the SECURITY DEFINER admin membership helper.
- Revokes public RPC execution of the old helper.
- Allows an authenticated user to read only their own admin membership row.
- Updates lead and portfolio policies to use the private helper.

2. Access Rules
- Anonymous users cannot read or modify `admin_users`.
- Authenticated users can read only their own `admin_users` row.
- Only an active allowlisted user can access admin data or perform admin mutations.

3. Important Notes
- No application data is deleted or changed.
- The private helper is not exposed through the public Supabase REST RPC surface.
*/

CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.is_admin()
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

REVOKE ALL ON FUNCTION private.is_admin() FROM PUBLIC;
REVOKE ALL ON FUNCTION private.is_admin() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon, authenticated;

REVOKE ALL ON TABLE public.admin_users FROM anon, authenticated;
GRANT SELECT ON TABLE public.admin_users TO authenticated;

DROP POLICY IF EXISTS "authenticated_select_own_admin_user" ON public.admin_users;
CREATE POLICY "authenticated_select_own_admin_user"
ON public.admin_users FOR SELECT
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "admin_select_leads" ON public.leads;
CREATE POLICY "admin_select_leads"
ON public.leads FOR SELECT
TO authenticated
USING (private.is_admin());

DROP POLICY IF EXISTS "admin_update_leads" ON public.leads;
CREATE POLICY "admin_update_leads"
ON public.leads FOR UPDATE
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "admin_delete_leads" ON public.leads;
CREATE POLICY "admin_delete_leads"
ON public.leads FOR DELETE
TO authenticated
USING (private.is_admin());

DROP POLICY IF EXISTS "admin_insert_portfolio" ON public.portfolio_items;
CREATE POLICY "admin_insert_portfolio"
ON public.portfolio_items FOR INSERT
TO authenticated
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "admin_update_portfolio" ON public.portfolio_items;
CREATE POLICY "admin_update_portfolio"
ON public.portfolio_items FOR UPDATE
TO authenticated
USING (private.is_admin())
WITH CHECK (private.is_admin());

DROP POLICY IF EXISTS "admin_delete_portfolio" ON public.portfolio_items;
CREATE POLICY "admin_delete_portfolio"
ON public.portfolio_items FOR DELETE
TO authenticated
USING (private.is_admin());