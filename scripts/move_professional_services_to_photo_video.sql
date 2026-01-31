-- Run this in Supabase Dashboard → SQL Editor to move business(es) from Professional Services to Photo & Video

-- Option A: Move only the most recently added Professional Services business (same as the migration)
UPDATE public.businesses
SET category = 'Photo & Video'
WHERE id = (
  SELECT id FROM public.businesses
  WHERE category = 'Professional Services'
  ORDER BY created_at DESC
  LIMIT 1
);

-- Option B: Move ALL businesses from Professional Services to Photo & Video (uncomment to use)
-- UPDATE public.businesses
-- SET category = 'Photo & Video'
-- WHERE category = 'Professional Services';
