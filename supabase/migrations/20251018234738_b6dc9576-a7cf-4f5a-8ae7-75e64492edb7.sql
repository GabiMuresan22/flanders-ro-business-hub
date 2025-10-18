-- Ensure public_businesses view is accessible to everyone (including non-authenticated users)
-- First, grant SELECT permission to anon role
GRANT SELECT ON public.public_businesses TO anon;
GRANT SELECT ON public.public_businesses TO authenticated;

-- Also ensure the businesses table RLS allows public viewing of approved businesses
-- (This policy already exists but we're making it explicit)
DROP POLICY IF EXISTS "Anyone can view approved businesses" ON public.businesses;
CREATE POLICY "Anyone can view approved businesses"
ON public.businesses
FOR SELECT
USING (status = 'approved');

-- Ensure anon users can read from businesses table
GRANT SELECT ON public.businesses TO anon;
GRANT SELECT ON public.businesses TO authenticated;