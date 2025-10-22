-- Add opening_hours column to businesses table
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS opening_hours JSONB DEFAULT '{
  "monday": "",
  "tuesday": "",
  "wednesday": "",
  "thursday": "",
  "friday": "",
  "saturday": "",
  "sunday": ""
}'::jsonb;

COMMENT ON COLUMN businesses.opening_hours IS 'Opening hours for each day of the week in JSONB format';
