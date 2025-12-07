-- Re-add policy to allow viewing approved businesses with full details (for detail pages)
-- This is acceptable for business directories as users need contact info
CREATE POLICY "Anyone can view approved business details" 
ON public.businesses 
FOR SELECT 
USING (status = 'approved');

-- Add a comment explaining the data exposure model
COMMENT ON TABLE public.businesses IS 'Business listings. Public can view approved businesses. Use public_businesses view for listings without sensitive owner data.';