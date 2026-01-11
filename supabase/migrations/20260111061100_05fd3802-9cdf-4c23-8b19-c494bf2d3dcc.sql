-- Fix 1: Update rate_limits policy to be service-role only
-- Drop the existing permissive policy
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.rate_limits;

-- Create a new policy that only allows service role access
-- The service role bypasses RLS anyway, but we make the policy explicit
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Fix 2: Update has_role function to only check the current user's roles
-- This prevents users from discovering other users' roles
CREATE OR REPLACE FUNCTION public.has_role(_role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = _role
  )
$$;

-- Keep the two-parameter version for backwards compatibility but restrict it
-- to only work when checking the current user's own role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE 
    WHEN _user_id = auth.uid() THEN
      EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
      )
    ELSE false
  END
$$;