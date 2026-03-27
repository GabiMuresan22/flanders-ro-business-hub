UPDATE resources SET 
  content = REPLACE(content, '/adauga-afacere', '/add-business'),
  content_en = REPLACE(content_en, '/adauga-afacere', '/add-business'),
  content_nl = REPLACE(content_nl, '/adauga-afacere', '/add-business')
WHERE content LIKE '%/adauga-afacere%' OR content_en LIKE '%/adauga-afacere%' OR content_nl LIKE '%/adauga-afacere%';