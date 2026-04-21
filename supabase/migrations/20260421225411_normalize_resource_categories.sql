-- Normalize resource categories to the canonical taxonomy used by the app.
-- This keeps the database aligned with the UI filters and badge labels.

UPDATE public.resources
SET category = 'TAXE_BELGIA'
WHERE slug IN (
  'tva-btw-belgia-ghid-complet-2026',
  'taxe-zelfstandig-belgia-ghid-complet-2026',
  'cat-ramane-in-mana-venituri-belgia-2026',
  'taxe-independent-belgia-2026',
  'impozitul-pe-dividende-belgia-2026',
  'dividende-belgia-2026-ghid-complet'
);

UPDATE public.resources
SET category = 'INFIINTARE_FIRMA_BELGIA'
WHERE slug IN (
  'cum-devii-independent-belgia-ghid-complet-2026',
  'srl-vs-nv-belgia-diferente-avantaje',
  'checklist-primele-30-zile-independent-belgia',
  'peppol-belgia-2026-facturare-electronica-obligatorie',
  'inregistrare-afacere-belgia',
  'cum-devii-independent-belgia-2025'
);

UPDATE public.resources
SET category = 'GHIDURI_PRACTICE'
WHERE slug IN (
  'cash-flow-antreprenori-belgia-ghid-practic',
  'business-canvas-ghid-plan-afacere',
  'marketing-digital-incepatori',
  'afaceri-romanesti-belgia-vizibilitate-online',
  'ghid-google-business-belgia-2026',
  'primirii-10-clienti-belgia-ghid-2026',
  'marketing-afacere-belgia-ghid-pas-cu-pas',
  'plan-marketing-12-luni-belgia-ghid-complet'
);

DO $$
DECLARE
  unmapped_resources text;
BEGIN
  SELECT string_agg(slug || ' => ' || category, ', ' ORDER BY slug)
  INTO unmapped_resources
  FROM public.resources
  WHERE category NOT IN (
    'TAXE_BELGIA',
    'INFIINTARE_FIRMA_BELGIA',
    'GHIDURI_PRACTICE'
  );

  IF unmapped_resources IS NOT NULL THEN
    RAISE EXCEPTION
      'Resource category normalization failed. Unmapped rows remain: %',
      unmapped_resources;
  END IF;
END $$;

ALTER TABLE public.resources
DROP CONSTRAINT IF EXISTS resources_category_check;

ALTER TABLE public.resources
ADD CONSTRAINT resources_category_check
CHECK (
  category IN (
    'TAXE_BELGIA',
    'INFIINTARE_FIRMA_BELGIA',
    'GHIDURI_PRACTICE'
  )
);
