ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS btw_number TEXT NOT NULL DEFAULT '';

-- Update the public_businesses view to include btw_number
DROP VIEW IF EXISTS public_businesses;
CREATE VIEW public_businesses WITH (security_invoker = on) AS
SELECT 
  id,
  created_at,
  updated_at,
  appointment_only,
  business_name,
  city,
  postal_code,
  description,
  category,
  website,
  image_url,
  phone,
  email,
  status,
  btw_number
FROM businesses
WHERE status = 'approved';