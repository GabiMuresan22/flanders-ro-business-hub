-- Update email for "Gabi Muresan Web Development" business to contact@gabimuresan.com
-- Run this in Supabase Dashboard → SQL Editor if the business exists in the database

UPDATE public.businesses
SET email = 'contact@gabimuresan.com'
WHERE business_name ILIKE '%Gabi Muresan%'
  AND business_name ILIKE '%Web Development%';

-- Optional: if the business name is slightly different, run a broader update:
-- UPDATE public.businesses
-- SET email = 'contact@gabimuresan.com'
-- WHERE business_name ILIKE '%Gabi Muresan%';
