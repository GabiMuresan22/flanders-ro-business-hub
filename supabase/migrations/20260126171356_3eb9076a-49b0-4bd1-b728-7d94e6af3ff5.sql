-- Update the public_businesses view to include business contact info (phone, email)
-- but exclude personal owner information (owner_name, address)
-- This allows the business directory to function while protecting personal data

DROP VIEW IF EXISTS public.public_businesses;

CREATE VIEW public.public_businesses WITH (security_invoker=on) AS
SELECT 
  id,
  business_name,
  city,
  postal_code,
  description,
  category,
  website,
  image_url,
  phone,    -- Business contact - acceptable for directory
  email,    -- Business contact - acceptable for directory
  status,
  created_at,
  updated_at
  -- Excluded: owner_name, address (personal information)
FROM public.businesses
WHERE status = 'approved';