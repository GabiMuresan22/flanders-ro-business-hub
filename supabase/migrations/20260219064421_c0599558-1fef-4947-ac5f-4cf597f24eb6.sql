
-- Remove the overly broad public SELECT policy on profiles
DROP POLICY IF EXISTS "Anyone can view profile names for reviews" ON public.profiles;
