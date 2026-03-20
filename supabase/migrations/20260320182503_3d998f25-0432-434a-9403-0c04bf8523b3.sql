UPDATE resources SET
  content = REPLACE(
    REPLACE(content,
      'display: inline-block; background-color: #EAB308; color: #000000; padding: 0.75rem 1.5rem; font-weight: 700; border-radius: 0.375rem; text-decoration: none; margin-right: 0.5rem;',
      'display: inline-block; background-color: #EAB308; color: #000000; padding: 0.75rem 1.5rem; font-weight: 700; border-radius: 0.375rem; text-decoration: none; margin-right: 0.75rem; margin-bottom: 0.75rem;'
    ),
    'display: inline-block; background-color: transparent; color: #ffffff; padding: 0.75rem 1.5rem; font-weight: 600; border-radius: 0.375rem; text-decoration: none; border: 2px solid #ffffff;',
    'display: inline-block; background-color: transparent; color: #ffffff; padding: 0.75rem 1.5rem; font-weight: 600; border-radius: 0.375rem; text-decoration: none; border: 2px solid #ffffff; margin-bottom: 0.75rem;'
  ),
  content_en = REPLACE(
    REPLACE(content_en,
      'display: inline-block; background-color: #EAB308; color: #000000; padding: 0.75rem 1.5rem; font-weight: 700; border-radius: 0.375rem; text-decoration: none; margin-right: 0.5rem;',
      'display: inline-block; background-color: #EAB308; color: #000000; padding: 0.75rem 1.5rem; font-weight: 700; border-radius: 0.375rem; text-decoration: none; margin-right: 0.75rem; margin-bottom: 0.75rem;'
    ),
    'display: inline-block; background-color: transparent; color: #ffffff; padding: 0.75rem 1.5rem; font-weight: 600; border-radius: 0.375rem; text-decoration: none; border: 2px solid #ffffff;',
    'display: inline-block; background-color: transparent; color: #ffffff; padding: 0.75rem 1.5rem; font-weight: 600; border-radius: 0.375rem; text-decoration: none; border: 2px solid #ffffff; margin-bottom: 0.75rem;'
  ),
  content_nl = REPLACE(
    REPLACE(content_nl,
      'display: inline-block; background-color: #EAB308; color: #000000; padding: 0.75rem 1.5rem; font-weight: 700; border-radius: 0.375rem; text-decoration: none; margin-right: 0.5rem;',
      'display: inline-block; background-color: #EAB308; color: #000000; padding: 0.75rem 1.5rem; font-weight: 700; border-radius: 0.375rem; text-decoration: none; margin-right: 0.75rem; margin-bottom: 0.75rem;'
    ),
    'display: inline-block; background-color: transparent; color: #ffffff; padding: 0.75rem 1.5rem; font-weight: 600; border-radius: 0.375rem; text-decoration: none; border: 2px solid #ffffff;',
    'display: inline-block; background-color: transparent; color: #ffffff; padding: 0.75rem 1.5rem; font-weight: 600; border-radius: 0.375rem; text-decoration: none; border: 2px solid #ffffff; margin-bottom: 0.75rem;'
  )
WHERE slug = 'marketing-afacere-belgia-ghid-pas-cu-pas';