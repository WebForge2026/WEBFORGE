/*
# Lock direct quote table writes behind validated submission

1. Purpose
- Preserve all existing quote rows and application behavior.
- Ensure public quote submissions use the server-validated `submit_quote` function.

2. Security changes
- Convert `public.submit_quote` to SECURITY DEFINER with a fixed search path so it can insert validated rows without granting direct table INSERT to browser roles.
- Remove direct SELECT privilege from `anon` because anonymous visitors must not read customer contact data.
- Remove direct INSERT privilege from `anon` and `authenticated`; both roles can continue submitting through the validated function.
- Keep authenticated admin read/update access controlled by the existing `private.is_admin()` policies.

3. Data safety
- No rows are deleted.
- No columns, types, or table names are changed.
- Existing quote data remains available to authorized administrators.
*/

ALTER FUNCTION public.submit_quote(
  text,
  integer,
  integer,
  boolean,
  boolean,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text
) SECURITY DEFINER SET search_path = pg_catalog, public;

REVOKE SELECT, INSERT ON public.quotes FROM anon;
REVOKE INSERT ON public.quotes FROM authenticated;

GRANT EXECUTE ON FUNCTION public.submit_quote(
  text,
  integer,
  integer,
  boolean,
  boolean,
  boolean,
  text,
  text,
  text,
  text,
  text,
  text
) TO anon, authenticated;