-- Expose registered user count for public stats (e.g. homepage).
-- SECURITY DEFINER allows the function to read auth.users; anon can call it.
CREATE OR REPLACE FUNCTION public.get_user_count()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT COUNT(*)::bigint FROM auth.users;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_count() TO anon;
GRANT EXECUTE ON FUNCTION public.get_user_count() TO authenticated;

COMMENT ON FUNCTION public.get_user_count() IS 'Returns total number of registered users for public stats display.';
