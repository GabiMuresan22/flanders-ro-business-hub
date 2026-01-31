-- Site reviews (testimonials) for the homepage - users can leave a review for the platform
CREATE TABLE public.site_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for listing approved reviews by date
CREATE INDEX idx_site_reviews_status_created ON public.site_reviews (status, created_at DESC);

ALTER TABLE public.site_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can view approved site reviews
CREATE POLICY "Anyone can view approved site reviews"
ON public.site_reviews
FOR SELECT
USING (status = 'approved');

-- Anyone can insert (submit a review); optional user_id if logged in
CREATE POLICY "Anyone can submit a site review"
ON public.site_reviews
FOR INSERT
WITH CHECK (true);

-- Optional: admins can update/delete for moderation (if you add admin check later)
-- For now we only need SELECT and INSERT.

COMMENT ON TABLE public.site_reviews IS 'User reviews/testimonials for the Romanian Business Hub homepage.';
