-- Move the most recently added business in "Professional Services" to the new category "Photo & Video"
UPDATE public.businesses
SET category = 'Photo & Video'
WHERE id = (
  SELECT id FROM public.businesses
  WHERE category = 'Professional Services'
  ORDER BY created_at DESC
  LIMIT 1
);
