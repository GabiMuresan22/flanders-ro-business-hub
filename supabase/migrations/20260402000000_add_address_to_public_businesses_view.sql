-- Expose address in public_businesses view.
-- Business street addresses are appropriate to publish (unlike personal home addresses).
DROP VIEW IF EXISTS public.public_businesses;
CREATE VIEW public.public_businesses WITH (security_invoker=on) AS
SELECT
  id, business_name, category, city, postal_code, address,
  description, description_en, description_nl,
  phone, email, website, image_url, btw_number,
  appointment_only, status, created_at, updated_at
FROM public.businesses
WHERE status = 'approved';
