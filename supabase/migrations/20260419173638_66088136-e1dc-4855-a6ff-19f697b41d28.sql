ALTER TABLE public.business_reports
  ADD COLUMN IF NOT EXISTS reporter_name TEXT,
  ADD COLUMN IF NOT EXISTS acknowledged_good_faith BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS content_url TEXT;