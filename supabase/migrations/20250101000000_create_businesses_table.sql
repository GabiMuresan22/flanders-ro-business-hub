-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  website TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_businesses_status ON businesses(status);

-- Create index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_businesses_category ON businesses(category);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (submit) a business
CREATE POLICY "Anyone can submit a business"
  ON businesses
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow anyone to read approved businesses
CREATE POLICY "Anyone can view approved businesses"
  ON businesses
  FOR SELECT
  TO public
  USING (status = 'approved');
