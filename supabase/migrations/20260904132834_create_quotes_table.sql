/*
# Create quotes table for WebForge Studio

1. New Tables
- `quotes`
  - `id` (uuid, primary key)
  - `website_type` (text, not null) — type of website (e.g. cafe, barbershop, restaurant)
  - `num_pages` (int, not null) — number of pages
  - `num_images` (int, not null) — number of images
  - `online_payments` (boolean, default false) — whether online payments are needed
  - `notifications` (boolean, default false) — whether email/SMS notifications are needed
  - `multilingual` (boolean, default false) — whether multilingual support is needed
  - `languages` (text, default '') — which languages (comma-separated)
  - `price` (numeric, not null) — calculated price in EUR
  - `customer_name` (text, not null) — name of the customer
  - `customer_email` (text, not null) — email of the customer
  - `customer_phone` (text, default '') — phone number of the customer
  - `notes` (text, default '') — additional notes
  - `status` (text, default 'new') — status: new, contacted, won, lost
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `quotes`.
- Allow anon + authenticated INSERT (customers submit quotes without login).
- Allow authenticated SELECT/UPDATE/DELETE (admin only, via service role or authenticated).
- Anon cannot SELECT/UPDATE/DELETE (quotes are private to admin).
*/

CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_type text NOT NULL,
  num_pages int NOT NULL,
  num_images int NOT NULL,
  online_payments boolean NOT NULL DEFAULT false,
  notifications boolean NOT NULL DEFAULT false,
  multilingual boolean NOT NULL DEFAULT false,
  languages text NOT NULL DEFAULT '',
  price numeric(10, 2) NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Allow anon + authenticated to INSERT (customers submit quotes)
DROP POLICY IF EXISTS "anon_insert_quotes" ON quotes;
CREATE POLICY "anon_insert_quotes" ON quotes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Allow authenticated to SELECT (admin reads quotes)
DROP POLICY IF EXISTS "auth_select_quotes" ON quotes;
CREATE POLICY "auth_select_quotes" ON quotes FOR SELECT
  TO authenticated USING (true);

-- Allow authenticated to UPDATE (admin updates quote status)
DROP POLICY IF EXISTS "auth_update_quotes" ON quotes;
CREATE POLICY "auth_update_quotes" ON quotes FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated to DELETE (admin deletes quotes)
DROP POLICY IF EXISTS "auth_delete_quotes" ON quotes;
CREATE POLICY "auth_delete_quotes" ON quotes FOR DELETE
  TO authenticated USING (true);
