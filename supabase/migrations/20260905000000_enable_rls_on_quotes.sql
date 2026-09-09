-- Enable row level security on quotes
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Drop commonly-named unsafe policies if they exist (no-op if not)
DROP POLICY IF EXISTS "Allow public select" ON quotes;
DROP POLICY IF EXISTS "Allow public update" ON quotes;
DROP POLICY IF EXISTS "Allow public delete" ON quotes;
DROP POLICY IF EXISTS anon_select ON quotes;
DROP POLICY IF EXISTS anon_update ON quotes;
DROP POLICY IF EXISTS anon_delete ON quotes;

-- Allow public insert only (for anonymous and authenticated visitors to submit quotes)
CREATE POLICY "Allow public insert only" ON quotes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users full access (use auth.role() = 'authenticated' as a guard)
CREATE POLICY "Allow authenticated admins full access" ON quotes
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
