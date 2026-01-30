-- Create a public view for profile names that can be joined with reviews
-- This only exposes user_id and full_name, keeping other profile data private
CREATE VIEW public.public_profiles
WITH (security_invoker = off) AS
SELECT 
  user_id,
  full_name
FROM public.profiles;

-- Grant SELECT access to authenticated and anonymous users
GRANT SELECT ON public.public_profiles TO anon, authenticated;