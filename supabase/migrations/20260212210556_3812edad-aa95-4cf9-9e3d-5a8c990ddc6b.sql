-- Add Dutch translation columns to resources table
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS title_nl text;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS excerpt_nl text;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS content_nl text;