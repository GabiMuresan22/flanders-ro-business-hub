-- Add Dutch content columns to resources table for NL translation
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS title_nl TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS excerpt_nl TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS content_nl TEXT;
