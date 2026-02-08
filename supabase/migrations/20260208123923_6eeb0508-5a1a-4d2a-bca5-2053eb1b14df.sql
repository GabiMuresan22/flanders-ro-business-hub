-- Add English description column to businesses table
ALTER TABLE public.businesses ADD COLUMN description_en TEXT;

-- Recreate the public_businesses view to include description_en
DROP VIEW IF EXISTS public.public_businesses;
CREATE VIEW public.public_businesses WITH (security_invoker = on) AS
SELECT 
  id,
  business_name,
  category,
  city,
  postal_code,
  description,
  description_en,
  phone,
  email,
  website,
  image_url,
  btw_number,
  appointment_only,
  status,
  created_at,
  updated_at
FROM public.businesses
WHERE status = 'approved';
