-- Drop the policy that allows anyone to view all business data including sensitive info
DROP POLICY IF EXISTS "Anyone can view approved businesses" ON public.businesses;

-- Drop the existing public_businesses view and recreate it properly
DROP VIEW IF EXISTS public.public_businesses;

-- Create a secure view that only exposes non-sensitive business data
CREATE VIEW public.public_businesses AS
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

-- Add comment explaining the view's purpose
COMMENT ON VIEW public.public_businesses IS 'Public view of approved businesses without sensitive owner information (email, phone, address, owner_name)';