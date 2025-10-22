-- Add image_url column to businesses table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'businesses' 
    AND column_name = 'image_url'
  ) THEN
    ALTER TABLE public.businesses ADD COLUMN image_url text;
  END IF;
END $$;

-- Create storage bucket for business images
INSERT INTO storage.buckets (id, name, public)
VALUES ('business-images', 'business-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for business-images bucket
-- Allow authenticated users to upload their own business images
CREATE POLICY "Users can upload business images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow everyone to view business images (public bucket)
CREATE POLICY "Anyone can view business images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'business-images');

-- Allow users to update their own business images
CREATE POLICY "Users can update their business images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'business-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own business images
CREATE POLICY "Users can delete their business images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'business-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);