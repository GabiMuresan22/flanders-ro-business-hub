-- Add user_id column to businesses table
ALTER TABLE public.businesses 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Anyone can submit a business" ON public.businesses;

-- Create new INSERT policy for authenticated users
CREATE POLICY "Authenticated users can create businesses"
  ON public.businesses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Keep the existing SELECT policy for approved businesses
-- (Already exists: "Anyone can view approved businesses")
