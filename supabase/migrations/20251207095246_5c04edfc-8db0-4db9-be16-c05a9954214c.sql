-- Recreate the view with SECURITY INVOKER (default, but explicit is better)
DROP VIEW IF EXISTS public.public_businesses;

CREATE VIEW public.public_businesses 
WITH (security_invoker = true) AS
SELECT 
  id,
  business_name,
  city,
  postal_code,
  description,
  category,
  website,
  image_url,
  status,
  created_at,
  updated_at
FROM public.businesses
WHERE status = 'approved';

-- Grant access to the view for all users (including anonymous)
GRANT SELECT ON public.public_businesses TO anon;
GRANT SELECT ON public.public_businesses TO authenticated;