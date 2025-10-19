-- Add policy for users to update their own businesses
CREATE POLICY "Users can update their own businesses"
ON public.businesses
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);