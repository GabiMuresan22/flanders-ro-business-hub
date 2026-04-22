-- ============================================================================
-- SEO Optimisation: Internal linking + Articole relevante sections
-- 
-- This migration adds:
--  1. Natural inline internal links to articles with known HTML content
--  2. "Articole relevante" section appended to each key article
--  3. "Resurse utile" updates to include pillar article links
-- ============================================================================


-- ─────────────────────────────────────────────────────────────────────────────
-- 1. taxe-independent-belgia-2026
--    Add inline contextual links to TVA, cat-ramane-in-mana, and cum-devii
-- ─────────────────────────────────────────────────────────────────────────────
UPDATE resources
SET content = REPLACE(
  REPLACE(
    content,
    -- Add contextual links after the intro paragraph
    '<p>În acest ghid vei afla cum funcționează taxele în Belgia, cum se calculează și cum poți face rapid o estimare orientativă.</p>',
    '<p>În acest ghid vei afla cum funcționează taxele în Belgia, cum se calculează și cum poți face rapid o estimare orientativă. Dacă te interesează și <a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600;">TVA în Belgia (BTW)</a> sau vrei să știi exact <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600;">cât rămâne în mână după toate taxele</a>, am ghiduri dedicate pentru fiecare subiect.</p>'
  ),
  -- Update Resurse utile to include pillar articles
  '<h2>Resurse utile</h2>
<ul>
  <li><a href="/resurse/cash-flow-antreprenori-belgia-ghid-practic">Cash Flow pentru Antreprenori – Ghid Practic</a></li>
  <li><a href="/resurse/dividende-belgia-2026-ghid-complet">Dividende în Belgia 2026 – Ghid Complet</a></li>
  <li><a href="/resurse/cum-devii-independent-belgia-2025">Cum devii independent în Belgia</a></li>
  <li><a href="/resurse/business-canvas-ghid-plan-afacere">Business Canvas – Ghid Plan de Afacere</a></li>
</ul>',
  '<h2>Resurse utile</h2>
<ul>
  <li><a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
  <li><a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600;">TVA în Belgia (BTW) – ghid complet 2026</a></li>
  <li><a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600;">Cât rămâne în mână din veniturile tale în Belgia (2026)</a></li>
  <li><a href="/resurse/cum-devii-independent-belgia-ghid-complet-2026">Cum devii independent în Belgia – ghid complet 2026</a></li>
  <li><a href="/resurse/cash-flow-antreprenori-belgia-ghid-practic">Cash Flow pentru Antreprenori – Ghid Practic</a></li>
  <li><a href="/resurse/dividende-belgia-2026-ghid-complet">Dividende în Belgia 2026 – Ghid Complet</a></li>
</ul>'
)
WHERE slug = 'taxe-independent-belgia-2026'
  AND content NOT LIKE '%taxe-zelfstandig-belgia-ghid-complet-2026%';


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Append "Articole relevante" section to each article
--    Guard: skip if already added (idempotent)
-- ─────────────────────────────────────────────────────────────────────────────

-- taxe-zelfstandig-belgia-ghid-complet-2026 (PILLAR 1)
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Continuă cu ghidurile complementare pentru o imagine completă:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">TVA în Belgia (BTW) explicat simplu – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cât rămâne în mână din veniturile tale în Belgia (2026) – exemple reale</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cum-devii-independent-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cum devii independent în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/checklist-primele-30-zile-independent-belgia" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Checklist primele 30 zile ca independent în Belgia</a></li>
  </ul>
</div>'
WHERE slug = 'taxe-zelfstandig-belgia-ghid-complet-2026'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- tva-btw-belgia-ghid-complet-2026 (PILLAR 2)
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Completează imaginea cu aceste ghiduri:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cât rămâne în mână din veniturile tale în Belgia (2026)</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/srl-vs-nv-belgia-diferente-avantaje" style="color: #002B7F; font-weight: 600; text-decoration: underline;">SRL vs NV în Belgia – diferențe și avantaje</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cum-devii-independent-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cum devii independent în Belgia – ghid complet 2026</a></li>
  </ul>
</div>'
WHERE slug = 'tva-btw-belgia-ghid-complet-2026'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- cat-ramane-in-mana-venituri-belgia-2026 (PILLAR 3)
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Aprofundează subiectul cu aceste ghiduri conexe:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">TVA în Belgia (BTW) explicat simplu – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/srl-vs-nv-belgia-diferente-avantaje" style="color: #002B7F; font-weight: 600; text-decoration: underline;">SRL vs NV în Belgia – diferențe și avantaje</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/dividende-belgia-2026-ghid-complet" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Dividende în Belgia 2026 – ghid complet</a></li>
  </ul>
</div>'
WHERE slug = 'cat-ramane-in-mana-venituri-belgia-2026'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- srl-vs-nv-belgia-diferente-avantaje
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Informații esențiale despre taxe și structura afacerii tale:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">TVA în Belgia (BTW) – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/dividende-belgia-2026-ghid-complet" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Dividende în Belgia 2026 – ghid complet</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cum-devii-independent-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cum devii independent în Belgia – ghid complet 2026</a></li>
  </ul>
</div>'
WHERE slug = 'srl-vs-nv-belgia-diferente-avantaje'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- cum-devii-independent-belgia-ghid-complet-2026
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Pașii următori după ce devii independent – ce trebuie să știi:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">TVA în Belgia (BTW) – când trebuie să te înregistrezi și cât plătești</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/checklist-primele-30-zile-independent-belgia" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Checklist primele 30 zile ca independent în Belgia</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cât rămâne în mână din veniturile tale în Belgia (2026)</a></li>
  </ul>
</div>'
WHERE slug = 'cum-devii-independent-belgia-ghid-complet-2026'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- checklist-primele-30-zile-independent-belgia
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Ghiduri esențiale pentru începutul ca independent:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cum-devii-independent-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cum devii independent în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">TVA în Belgia (BTW) – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cât rămâne în mână din veniturile tale în Belgia (2026)</a></li>
  </ul>
</div>'
WHERE slug = 'checklist-primele-30-zile-independent-belgia'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- peppol-belgia-2026-facturare-electronica-obligatorie
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Informații utile despre obligațiile fiscale și structura afacerii:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">TVA în Belgia (BTW) – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/srl-vs-nv-belgia-diferente-avantaje" style="color: #002B7F; font-weight: 600; text-decoration: underline;">SRL vs NV în Belgia – diferențe și avantaje</a></li>
  </ul>
</div>'
WHERE slug = 'peppol-belgia-2026-facturare-electronica-obligatorie'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- dividende-belgia-2026-ghid-complet
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Aprofundează strategia fiscală a afacerii tale:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/srl-vs-nv-belgia-diferente-avantaje" style="color: #002B7F; font-weight: 600; text-decoration: underline;">SRL vs NV în Belgia – diferențe și avantaje</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cât rămâne în mână din veniturile tale în Belgia (2026)</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
  </ul>
</div>'
WHERE slug = 'dividende-belgia-2026-ghid-complet'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- impozitul-pe-dividende-belgia-2026
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Ghiduri conexe despre taxe și structura afacerii:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/dividende-belgia-2026-ghid-complet" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Dividende în Belgia 2026 – ghid complet</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/srl-vs-nv-belgia-diferente-avantaje" style="color: #002B7F; font-weight: 600; text-decoration: underline;">SRL vs NV în Belgia – diferențe și avantaje</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cât rămâne în mână din veniturile tale în Belgia (2026)</a></li>
  </ul>
</div>'
WHERE slug = 'impozitul-pe-dividende-belgia-2026'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- taxe-independent-belgia-2026 (append "Articole relevante" section)
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Completează-ți cunoștințele cu aceste ghiduri:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/tva-btw-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">TVA în Belgia (BTW) – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cât rămâne în mână din veniturile tale în Belgia (2026)</a></li>
  </ul>
</div>'
WHERE slug = 'taxe-independent-belgia-2026'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

-- marketing articles
UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Ghiduri de marketing pentru afacerea ta în Belgia:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/primirii-10-clienti-belgia-ghid-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cum îți găsești primii 10 clienți în Belgia – ghid 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/plan-marketing-12-luni-belgia-ghid-complet" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Plan de marketing 12 luni Belgia – ghid complet</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/ghid-google-business-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ghid Google Business Belgia 2026</a></li>
  </ul>
</div>'
WHERE slug = 'marketing-afacere-belgia-ghid-pas-cu-pas'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Completează strategia ta de marketing:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/marketing-afacere-belgia-ghid-pas-cu-pas" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Marketing pentru afacerea ta în Belgia – ghid pas cu pas</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/ghid-google-business-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ghid Google Business Belgia 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/primirii-10-clienti-belgia-ghid-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cum îți găsești primii 10 clienți în Belgia – ghid 2026</a></li>
  </ul>
</div>'
WHERE slug = 'plan-marketing-12-luni-belgia-ghid-complet'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Extinde-ți strategia de marketing online:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/marketing-afacere-belgia-ghid-pas-cu-pas" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Marketing pentru afacerea ta în Belgia – ghid pas cu pas</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/primirii-10-clienti-belgia-ghid-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cum îți găsești primii 10 clienți în Belgia – ghid 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/plan-marketing-12-luni-belgia-ghid-complet" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Plan de marketing 12 luni Belgia – ghid complet</a></li>
  </ul>
</div>'
WHERE slug = 'ghid-google-business-belgia-2026'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Crește și atrage mai mulți clienți:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/marketing-afacere-belgia-ghid-pas-cu-pas" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Marketing pentru afacerea ta în Belgia – ghid pas cu pas</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/ghid-google-business-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ghid Google Business Belgia 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/checklist-primele-30-zile-independent-belgia" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Checklist primele 30 zile ca independent în Belgia</a></li>
  </ul>
</div>'
WHERE slug = 'primirii-10-clienti-belgia-ghid-2026'
  AND content NOT LIKE '%articole-relevante-seo-2026%';

UPDATE resources
SET content = content || '
<div class="articole-relevante-seo-2026" style="margin-top: 48px; padding: 28px; background-color: #f0f4ff; border-radius: 12px; border: 1px solid #c7d2fe;">
  <h2 style="font-size: 1.4rem; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; border: none; padding: 0;">Articole relevante</h2>
  <p style="color: #374151; margin-bottom: 16px;">Ghiduri conexe pentru afacerea ta:</p>
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/taxe-zelfstandig-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Ce taxe plătești ca zelfstandig în Belgia – ghid complet 2026</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cat-ramane-in-mana-venituri-belgia-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cât rămâne în mână din veniturile tale în Belgia (2026)</a></li>
    <li style="margin-bottom: 10px;">📌 <a href="/resurse/cum-devii-independent-belgia-ghid-complet-2026" style="color: #002B7F; font-weight: 600; text-decoration: underline;">Cum devii independent în Belgia – ghid complet 2026</a></li>
  </ul>
</div>'
WHERE slug = 'cash-flow-antreprenori-belgia-ghid-practic'
  AND content NOT LIKE '%articole-relevante-seo-2026%';
