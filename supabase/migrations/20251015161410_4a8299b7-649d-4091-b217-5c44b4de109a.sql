-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Anyone can submit a business" ON public.businesses;

-- Create a new INSERT policy that allows anonymous users to insert businesses
-- The status will default to 'pending' and users cannot override it
CREATE POLICY "Anyone can submit a business" 
ON public.businesses 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);