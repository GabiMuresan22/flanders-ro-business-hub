-- Add Dutch description column to businesses table
ALTER TABLE public.businesses ADD COLUMN IF NOT EXISTS description_nl text;

-- Recreate the public_businesses view to include description_nl
-- Keeping GDPR compliance: excluding owner_name and address
DROP VIEW IF EXISTS public.public_businesses;
CREATE VIEW public.public_businesses WITH (security_invoker=on) AS
SELECT 
  id, business_name, category, city, postal_code,
  description, description_en, description_nl,
  phone, email, website, image_url, btw_number,
  appointment_only, status, created_at, updated_at
FROM public.businesses
WHERE status = 'approved';