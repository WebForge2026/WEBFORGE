/*
# Remove public elevated execution from quote submission

1. Purpose
- Preserve all existing quote rows and the current public quote form.
- Remove the public SECURITY DEFINER execution path introduced only to protect the calculated price.

2. Database behavior
- Add a private trigger function that calculates the authoritative quote price before every insert.
- Make the public `submit_quote` function SECURITY INVOKER again.
- Allow browser roles to insert only customer selections and contact fields, never `price`, `status`, `archived_at`, `id`, or timestamps.
- The existing validated function continues to validate inputs and return the calculated price.

3. Security
- No public SECURITY DEFINER function remains for quote submission.
- Direct browser inserts cannot choose or alter the stored price.
- Existing admin read/update access remains controlled by `private.is_admin()` and RLS.

4. Data safety
- No rows are deleted or updated by this migration.
- No columns, types, or tables are removed or renamed.
*/

CREATE OR REPLACE FUNCTION private.set_quote_price()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF NEW.website_type NOT IN ('cafe', 'barbershop', 'restaurant', 'carwash', 'shop', 'business', 'portfolio', 'other') THEN
    RAISE EXCEPTION 'Invalid website type';
  END IF;

  NEW.price :=
    CASE NEW.website_type
      WHEN 'cafe' THEN 400
      WHEN 'barbershop' THEN 450
      WHEN 'restaurant' THEN 500
      WHEN 'carwash' THEN 450
      WHEN 'shop' THEN 700
      WHEN 'business' THEN 600
      WHEN 'portfolio' THEN 350
      ELSE 500
    END
    + NEW.num_pages * 50
    + NEW.num_images * 5
    + CASE WHEN NEW.online_payments THEN 200 ELSE 0 END
    + CASE WHEN NEW.notifications THEN 100 ELSE 0 END
    + CASE WHEN NEW.multilingual THEN 150 ELSE 0 END;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION private.set_quote_price() FROM PUBLIC;

DROP TRIGGER IF EXISTS set_quote_price_before_insert ON public.quotes;
CREATE TRIGGER set_quote_price_before_insert
BEFORE INSERT ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION private.set_quote_price();

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
) SECURITY INVOKER SET search_path = pg_catalog, public;

REVOKE INSERT ON public.quotes FROM anon, authenticated;
GRANT INSERT (
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
) ON public.quotes TO anon, authenticated;

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
