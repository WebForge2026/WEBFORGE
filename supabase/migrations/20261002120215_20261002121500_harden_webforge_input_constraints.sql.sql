/*
# Harden WebForge input constraints

1. Modified Tables
- `leads.name`, `email`, `phone`, `project_type`, and `message` receive safe length limits.
- `leads.language` is limited to DE, EN, or BG.
- `leads.status` is limited to the supported workflow statuses.
- `leads.features_selected` is limited to four entries.

2. Security and Integrity
- Direct anonymous API callers cannot insert oversized or invalid workflow values.
- Existing valid rows are preserved.
- No columns, rows, or tables are deleted.

3. Important Notes
- These constraints complement the frontend validation and public INSERT RLS policy.
- They are not a replacement for production rate limiting or CAPTCHA if public abuse becomes significant.
*/

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_name_length') THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_name_length CHECK (char_length(name) BETWEEN 2 AND 100);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_email_length') THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_email_length CHECK (char_length(email) BETWEEN 3 AND 200);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_phone_length') THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_phone_length CHECK (phone IS NULL OR char_length(phone) <= 30);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_project_type_length') THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_project_type_length CHECK (char_length(project_type) BETWEEN 1 AND 100);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_message_length') THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_message_length CHECK (message IS NULL OR char_length(message) <= 2000);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_language_allowed') THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_language_allowed CHECK (language IN ('DE', 'EN', 'BG'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_status_allowed') THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_status_allowed CHECK (status IN ('new', 'contacted', 'meeting_scheduled', 'closed'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'leads_features_limit') THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_features_limit CHECK (features_selected IS NULL OR cardinality(features_selected) <= 4);
  END IF;
END $$;