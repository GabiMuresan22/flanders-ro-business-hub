-- Add RLS policy to allow admins to view all businesses
CREATE POLICY "Admins can view all businesses"
ON public.businesses
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));