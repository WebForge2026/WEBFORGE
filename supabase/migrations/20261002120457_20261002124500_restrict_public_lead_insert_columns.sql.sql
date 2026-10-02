/*
# Restrict public lead insert columns

1. Modified Permissions
- Removes table-level INSERT from the anonymous role on `leads`.
- Grants anonymous INSERT only on the public form fields.

2. Security
- Anonymous callers cannot supply `id`, `status`, or `created_at`.
- The database default supplies the lead id, workflow status, and timestamp.
- Existing rows and authenticated admin permissions are preserved.
*/

REVOKE INSERT ON TABLE public.leads FROM anon;
GRANT INSERT (name, email, phone, project_type, features_selected, estimated_budget, message, language)
ON TABLE public.leads TO anon;