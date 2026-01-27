-- Allow users to delete their own business submissions
CREATE POLICY "Users can delete their own businesses"
ON public.businesses
FOR DELETE
USING (auth.uid() = user_id);