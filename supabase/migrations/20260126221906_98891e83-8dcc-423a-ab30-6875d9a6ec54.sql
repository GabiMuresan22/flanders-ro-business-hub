-- Add appointment_only column to businesses table
ALTER TABLE public.businesses 
ADD COLUMN appointment_only BOOLEAN NOT NULL DEFAULT false;

-- Update the public_businesses view to include the new column
DROP VIEW IF EXISTS public.public_businesses;

CREATE VIEW public.public_businesses WITH (security_invoker = on) AS
SELECT 
  id,
  created_at,
  updated_at,
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
  appointment_only
FROM public.businesses
WHERE status = 'approved';