-- Drop the previous view and recreate with security_invoker
DROP VIEW IF EXISTS public.public_profiles;

-- Create a public view for profile names with security_invoker
-- This only exposes user_id and full_name for joining with reviews
CREATE VIEW public.public_profiles
WITH (security_invoker = on) AS
SELECT 
  user_id,
  full_name
FROM public.profiles;

-- Add RLS policy to profiles table to allow public read of names for reviews
CREATE POLICY "Anyone can view profile names for reviews"
ON public.profiles FOR SELECT
USING (true);