-- Fix Critical Security Issue #1: Protect business owner contact information
-- Create a view for public business listings that excludes sensitive contact info
CREATE OR REPLACE VIEW public.public_businesses AS
SELECT 
  id,
  business_name,
  city,
  postal_code,
  description,
  category,
  website,
  status,
  created_at,
  updated_at
FROM public.businesses
WHERE status = 'approved';

-- Grant access to the view
GRANT SELECT ON public.public_businesses TO anon, authenticated;

-- Fix Critical Security Issue #2: Protect customer support messages
-- Add SELECT policy for contact_messages (admin-only)
CREATE POLICY "Admins can read contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
);

-- Fix Critical Security Issue #3: Protect newsletter subscriber emails
-- Add SELECT policy for newsletter_subscribers (admin-only)
CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
);

-- Add policy to allow admins to manage newsletter subscribers
CREATE POLICY "Admins can delete newsletter subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
);

-- Comment explaining the security model
COMMENT ON VIEW public.public_businesses IS 'Public view of approved businesses with sensitive contact information excluded. For full business details, users must authenticate and use the businesses table directly.';
COMMENT ON POLICY "Admins can read contact messages" ON public.contact_messages IS 'Only admins can view customer support messages to protect user privacy.';
COMMENT ON POLICY "Admins can view newsletter subscribers" ON public.newsletter_subscribers IS 'Only admins can view newsletter subscriber list to prevent email harvesting.';