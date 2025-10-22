-- Add length constraints to businesses table
ALTER TABLE public.businesses
  ADD CONSTRAINT business_name_length CHECK (length(business_name) <= 100),
  ADD CONSTRAINT owner_name_length CHECK (length(owner_name) <= 100),
  ADD CONSTRAINT email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT phone_length CHECK (length(phone) <= 25),
  ADD CONSTRAINT description_length CHECK (length(description) <= 2000),
  ADD CONSTRAINT postal_code_length CHECK (length(postal_code) <= 10),
  ADD CONSTRAINT city_length CHECK (length(city) <= 100),
  ADD CONSTRAINT address_length CHECK (length(address) <= 200),
  ADD CONSTRAINT category_length CHECK (length(category) <= 50);

-- Add format validation for email
ALTER TABLE public.businesses
  ADD CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add flexible phone validation (accepts international formats with +, spaces, dashes, parentheses)
ALTER TABLE public.businesses
  ADD CONSTRAINT phone_format CHECK (phone ~* '^[\+]?[0-9\s\-\(\)]{8,25}$');

-- Add validation for website URL to only allow http/https protocols
ALTER TABLE public.businesses
  ADD CONSTRAINT website_protocol CHECK (
    website IS NULL OR 
    website = '' OR 
    website ~* '^https?://'
  );

-- Add minimum length constraints for critical fields
ALTER TABLE public.businesses
  ADD CONSTRAINT business_name_min_length CHECK (length(trim(business_name)) >= 2),
  ADD CONSTRAINT owner_name_min_length CHECK (length(trim(owner_name)) >= 2),
  ADD CONSTRAINT description_min_length CHECK (length(trim(description)) >= 10);