-- Add user_id column to track business ownership
ALTER TABLE businesses 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for better query performance
CREATE INDEX idx_businesses_user_id ON businesses(user_id);

-- Drop the old permissive policy
DROP POLICY IF EXISTS "Allow anyone to submit businesses" ON businesses;

-- Create new policy: only authenticated users can submit businesses
CREATE POLICY "Authenticated users can submit businesses"
ON businesses
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to view their own submissions (pending or approved)
DROP POLICY IF EXISTS "Anyone can view approved businesses" ON businesses;

CREATE POLICY "Users can view approved businesses"
ON businesses
FOR SELECT
TO authenticated
USING (status = 'approved');

CREATE POLICY "Users can view their own submissions"
ON businesses
FOR SELECT
TO authenticated
USING (user_id = auth.uid());