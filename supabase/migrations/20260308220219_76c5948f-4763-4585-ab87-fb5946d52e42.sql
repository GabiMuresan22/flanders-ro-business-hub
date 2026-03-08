
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(business_id, platform)
);

ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Anyone can view social links for approved businesses
CREATE POLICY "Public can view social links" ON public.social_links
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND status = 'approved')
  );

-- Business owners can manage their social links
CREATE POLICY "Owners can insert social links" ON public.social_links
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND user_id = auth.uid())
  );

CREATE POLICY "Owners can update social links" ON public.social_links
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND user_id = auth.uid())
  );

CREATE POLICY "Owners can delete social links" ON public.social_links
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.businesses WHERE id = business_id AND user_id = auth.uid())
  );

-- Admins can manage all social links
CREATE POLICY "Admins can manage social links" ON public.social_links
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
