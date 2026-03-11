-- Normalize Facebook and Instagram website URLs in businesses table
-- Fixes links that may cause ERR_BLOCKED_BY_RESPONSE (e.g. share links, mobile URLs)

-- Facebook: ensure https://www.facebook.com, strip share paths, preserve page paths
UPDATE public.businesses
SET website = CASE
  WHEN trim(both from coalesce(website, '')) ~* '^https?://(www\.)?(m\.)?(fb\.com|facebook\.com)/share/' THEN 'https://www.facebook.com'
  ELSE regexp_replace(
    regexp_replace(
      trim(both from coalesce(website, '')),
      '^https?://(www\.)?(m\.)?(fb\.com|facebook\.com)(.*)$',
      'https://www.facebook.com\4',
      'i'
    ),
    '^([^h])',
    'https://\1'
  )
END
WHERE website IS NOT NULL
  AND website != ''
  AND (
    website ILIKE '%facebook.com%'
    OR website ILIKE '%fb.com%'
  )
  AND trim(both from website) != '';

-- Instagram: ensure https://www.instagram.com
UPDATE public.businesses
SET website = regexp_replace(
  regexp_replace(
    trim(both from coalesce(website, '')),
    '^https?://(www\.)?instagram\.com',
    'https://www.instagram.com',
    'i'
  ),
  '^([^h])',
  'https://\1'
)
WHERE website IS NOT NULL
  AND website != ''
  AND website ILIKE '%instagram.com%'
  AND trim(both from website) != '';

-- Ensure any remaining website without protocol gets https://
UPDATE public.businesses
SET website = 'https://' || ltrim(website, '/')
WHERE website IS NOT NULL
  AND website != ''
  AND website !~ '^https?://'
  AND trim(both from website) != '';
