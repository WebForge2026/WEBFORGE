/*
# WebForge Database Schema — Leads & Portfolio

1. New Tables
- `leads`: Stores project inquiries from the price estimator and contact form.
  - id (uuid, PK)
  - name (text, not null)
  - email (text, not null)
  - phone (text, nullable)
  - project_type (text, not null) — Brand Site, E-Commerce, Web App, Automation Portal
  - features_selected (text[], nullable) — selected add-ons
  - estimated_budget (text, nullable) — budget range string
  - message (text, nullable)
  - language (text, not null) — DE, EN, BG
  - status (text, not null, default 'new') — new, contacted, meeting_scheduled, closed
  - created_at (timestamptz, default now())

- `portfolio_items`: Stores showcase portfolio entries managed from admin.
  - id (uuid, PK)
  - title (text, not null)
  - description (text, nullable)
  - image_url (text, nullable)
  - live_url (text, nullable)
  - category (text, not null) — website, ecommerce, webapp, enterprise
  - metrics (text, nullable) — e.g. "+310% Conversion Increase"
  - tech_tags (text[], nullable)
  - created_at (timestamptz, default now())

2. Security
- RLS enabled on both tables.
- `leads`: public can INSERT (contact form / estimator), but only authenticated (admin) can SELECT/UPDATE/DELETE.
- `portfolio_items`: public can SELECT (showcase display), only authenticated (admin) can INSERT/UPDATE/DELETE.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL,
  features_selected text[],
  estimated_budget text,
  message text,
  language text NOT NULL DEFAULT 'DE',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- leads: public INSERT (contact form + estimator submissions)
DROP POLICY IF EXISTS "public_insert_leads" ON leads;
CREATE POLICY "public_insert_leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- leads: authenticated-only SELECT/UPDATE/DELETE (admin dashboard)
DROP POLICY IF EXISTS "admin_select_leads" ON leads;
CREATE POLICY "admin_select_leads"
ON leads FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "admin_update_leads" ON leads;
CREATE POLICY "admin_update_leads"
ON leads FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_leads" ON leads;
CREATE POLICY "admin_delete_leads"
ON leads FOR DELETE
TO authenticated
USING (true);

CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  live_url text,
  category text NOT NULL DEFAULT 'website',
  metrics text,
  tech_tags text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;

-- portfolio_items: public SELECT (showcase display on landing page)
DROP POLICY IF EXISTS "public_select_portfolio" ON portfolio_items;
CREATE POLICY "public_select_portfolio"
ON portfolio_items FOR SELECT
TO anon, authenticated
USING (true);

-- portfolio_items: authenticated-only INSERT/UPDATE/DELETE (admin dashboard)
DROP POLICY IF EXISTS "admin_insert_portfolio" ON portfolio_items;
CREATE POLICY "admin_insert_portfolio"
ON portfolio_items FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_portfolio" ON portfolio_items;
CREATE POLICY "admin_update_portfolio"
ON portfolio_items FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_portfolio" ON portfolio_items;
CREATE POLICY "admin_delete_portfolio"
ON portfolio_items FOR DELETE
TO authenticated
USING (true);

-- Index for common query patterns
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_items (category);
