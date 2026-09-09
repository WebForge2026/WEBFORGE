/*
# Fix quote submission after column privilege hardening

1. Problem
- The previous security migration correctly removed browser INSERT permission for the `price` column.
- The existing `submit_quote` function still included `price` in its INSERT statement.
- Because the function is SECURITY INVOKER, Supabase rejected valid public submissions with a permission error.

2. Fix
- Keep `submit_quote` SECURITY INVOKER.
- Remove `price` from the INSERT column list.
- The existing private `set_quote_price` trigger calculates and assigns the authoritative price before the row is stored.

3. Data safety
- No existing rows are deleted, updated, or migrated.
- The existing Supabase project, tables, Auth users, and quote data remain unchanged.
*/

CREATE OR REPLACE FUNCTION public.submit_quote(
  p_website_type text,
  p_num_pages integer,
  p_num_images integer,
  p_online_payments boolean,
  p_notifications boolean,
  p_multilingual boolean,
  p_languages text,
  p_customer_name text,
  p_customer_email text,
  p_customer_phone text,
  p_notes text,
  p_honeypot text DEFAULT ''
)
RETURNS numeric
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_base_price numeric;
  v_price numeric;
BEGIN
  IF coalesce(p_honeypot, '') <> '' THEN
    RAISE EXCEPTION 'Invalid submission';
  END IF;

  IF p_website_type NOT IN ('cafe','barbershop','restaurant','carwash','shop','business','portfolio','other') THEN
    RAISE EXCEPTION 'Invalid website type';
  END IF;

  IF p_num_pages NOT BETWEEN 1 AND 20 OR p_num_images NOT BETWEEN 0 AND 100 THEN
    RAISE EXCEPTION 'Invalid quantity';
  END IF;

  IF p_customer_name IS NULL OR char_length(btrim(p_customer_name)) NOT BETWEEN 1 AND 120 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;

  IF p_customer_email IS NULL OR char_length(btrim(p_customer_email)) NOT BETWEEN 3 AND 254 OR btrim(p_customer_email) !~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;

  IF char_length(coalesce(p_customer_phone,'')) > 40 OR (char_length(btrim(coalesce(p_customer_phone,''))) > 0 AND btrim(p_customer_phone) !~ '^[0-9+() .\-]{5,40}$') THEN
    RAISE EXCEPTION 'Invalid phone';
  END IF;

  IF char_length(coalesce(p_languages,'')) > 200 OR char_length(coalesce(p_notes,'')) > 2000 THEN
    RAISE EXCEPTION 'Text too long';
  END IF;

  v_base_price := CASE p_website_type
    WHEN 'cafe' THEN 400
    WHEN 'barbershop' THEN 450
    WHEN 'restaurant' THEN 500
    WHEN 'carwash' THEN 450
    WHEN 'shop' THEN 700
    WHEN 'business' THEN 600
    WHEN 'portfolio' THEN 350
    ELSE 500
  END;

  v_price := v_base_price
    + p_num_pages * 50
    + p_num_images * 5
    + CASE WHEN p_online_payments THEN 200 ELSE 0 END
    + CASE WHEN p_notifications THEN 100 ELSE 0 END
    + CASE WHEN p_multilingual THEN 150 ELSE 0 END;

  INSERT INTO public.quotes (
    website_type,
    num_pages,
    num_images,
    online_payments,
    notifications,
    multilingual,
    languages,
    customer_name,
    customer_email,
    customer_phone,
    notes
  ) VALUES (
    p_website_type,
    p_num_pages,
    p_num_images,
    p_online_payments,
    p_notifications,
    p_multilingual,
    coalesce(p_languages,''),
    btrim(p_customer_name),
    lower(btrim(p_customer_email)),
    btrim(coalesce(p_customer_phone,'')),
    coalesce(p_notes,'')
  );

  RETURN v_price;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_quote(
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
) FROM PUBLIC;

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