-- Fix the SECURITY DEFINER view issue by recreating with security_invoker=on
DROP VIEW IF EXISTS public.public_businesses;

CREATE VIEW public.public_businesses 
WITH (security_invoker=on) 
AS
SELECT 
  id,
  business_name,
  city,
  postal_code,
  description,
  category,
  website,
  status,
  created_at,
  updated_at
FROM public.businesses
WHERE status = 'approved';

-- Grant access to the view
GRANT SELECT ON public.public_businesses TO anon, authenticated;

COMMENT ON VIEW public.public_businesses IS 'Public view of approved businesses with sensitive contact information excluded. Uses security_invoker to respect RLS policies.';