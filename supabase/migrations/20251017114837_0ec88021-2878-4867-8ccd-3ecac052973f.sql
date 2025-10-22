-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit a business" ON businesses;

-- Create a new permissive INSERT policy for authenticated and anonymous users
CREATE POLICY "Allow anyone to submit businesses"
ON businesses
FOR INSERT
TO public
WITH CHECK (true);
