UPDATE resources SET 
content = REPLACE(
  REPLACE(
    REPLACE(
      REPLACE(
        content,
        '<p>In acest ghid ai un checklist simplu si practic, pas cu pas, ca sa incepi corect.</p>',
        '<p>Daca esti la inceput, citeste mai intai <a href="/resurse/business-canvas-ghid-plan-afacere" style="color: #002B7F; text-decoration: underline; font-weight: 600;">Cum sa-ti construiesti un Business Plan intr-o singura pagina</a> pentru a-ti clarifica directia.</p>
<p>In acest ghid ai un checklist simplu si practic, pas cu pas, ca sa incepi corect.</p>'
      ),
      '<h3>b) Clarifica situatia TVA</h3>
<p>Este esential sa stii daca trebuie sa aplici TVA sau nu.',
      '<h3>b) Clarifica situatia TVA</h3>
<p>Pentru a intelege cat platesti efectiv, citeste ghidul <a href="/resurse/taxe-independent-belgia-2026" style="color: #002B7F; text-decoration: underline; font-weight: 600;">Taxe independent Belgia 2026 – cat platesti si cum le calculezi corect</a>.</p>
<p>Este esential sa stii daca trebuie sa aplici TVA sau nu.'
    ),
    '<h2>Zilele 14–21: Incepe sa atragi clienti</h2>
<p>Aici apare diferenta intre cei care reusesc si cei care raman blocati.</p>
<p>Marketingul nu inseamna reclame. Inseamna sa ajuti oamenii sa rezolve o problema.</p>',
    '<h2>Zilele 14–21: Incepe sa atragi clienti</h2>
<p>Aici apare diferenta intre cei care reusesc si cei care raman blocati.</p>
<p>Marketingul nu inseamna reclame. Inseamna sa ajuti oamenii sa rezolve o problema. Citeste ghidul complet: <a href="/resurse/marketing-afacere-belgia-ghid-pas-cu-pas" style="color: #002B7F; text-decoration: underline; font-weight: 600;">Cum sa-ti faci singur marketingul pentru afacerea ta in Belgia</a>.</p>'
  ),
  '<h2>Resurse utile</h2>',
  '<h2>Resurse utile</h2>
<ul><li><a href="/resurse/primirii-10-clienti-belgia-ghid-2026" style="color: #002B7F; text-decoration: underline;">Cum iti gasesti primii 10 clienti in Belgia – Ghid 2026</a></li></ul>'
),
content_en = REPLACE(
  REPLACE(
    REPLACE(
      REPLACE(
        content_en,
        '<p>In this guide you have a simple and practical checklist, step by step, to start correctly.</p>',
        '<p>If you are just starting out, first read <a href="/resurse/business-canvas-ghid-plan-afacere" style="color: #002B7F; text-decoration: underline; font-weight: 600;">How to Build a Business Plan on a Single Page</a> to clarify your direction.</p>
<p>In this guide you have a simple and practical checklist, step by step, to start correctly.</p>'
      ),
      '<h3>b) Clarify your VAT situation</h3>
<p>It is essential to know whether you need to charge VAT or not.',
      '<h3>b) Clarify your VAT situation</h3>
<p>To understand how much you actually pay, read the guide <a href="/resurse/taxe-independent-belgia-2026" style="color: #002B7F; text-decoration: underline; font-weight: 600;">Self-Employed Taxes in Belgium 2026 – How Much You Pay and How to Calculate Correctly</a>.</p>
<p>It is essential to know whether you need to charge VAT or not.'
    ),
    '<h2>Days 14–21: Start Attracting Clients</h2>
<p>This is where the difference appears between those who succeed and those who get stuck.</p>
<p>Marketing does not mean advertising. It means helping people solve a problem.</p>',
    '<h2>Days 14–21: Start Attracting Clients</h2>
<p>This is where the difference appears between those who succeed and those who get stuck.</p>
<p>Marketing does not mean advertising. It means helping people solve a problem. Read the complete guide: <a href="/resurse/marketing-afacere-belgia-ghid-pas-cu-pas" style="color: #002B7F; text-decoration: underline; font-weight: 600;">How to Do Your Own Marketing for Your Business in Belgium</a>.</p>'
  ),
  '<h2>Useful Resources</h2>',
  '<h2>Useful Resources</h2>
<ul><li><a href="/resurse/primirii-10-clienti-belgia-ghid-2026" style="color: #002B7F; text-decoration: underline;">How to Find Your First 10 Clients in Belgium – 2026 Guide</a></li></ul>'
),
content_nl = REPLACE(
  REPLACE(
    REPLACE(
      REPLACE(
        content_nl,
        '<p>In deze gids vind je een eenvoudige en praktische checklist, stap voor stap, om correct te beginnen.</p>',
        '<p>Als je net begint, lees dan eerst <a href="/resurse/business-canvas-ghid-plan-afacere" style="color: #002B7F; text-decoration: underline; font-weight: 600;">Hoe je een Business Plan bouwt op een enkele pagina</a> om je richting te verduidelijken.</p>
<p>In deze gids vind je een eenvoudige en praktische checklist, stap voor stap, om correct te beginnen.</p>'
      ),
      '<h3>b) Verduidelijk je btw-situatie</h3>
<p>Het is essentieel om te weten of je btw moet aanrekenen of niet.',
      '<h3>b) Verduidelijk je btw-situatie</h3>
<p>Om te begrijpen hoeveel je daadwerkelijk betaalt, lees de gids <a href="/resurse/taxe-independent-belgia-2026" style="color: #002B7F; text-decoration: underline; font-weight: 600;">Belastingen als zelfstandige in Belgie 2026 – hoeveel je betaalt en hoe correct te berekenen</a>.</p>
<p>Het is essentieel om te weten of je btw moet aanrekenen of niet.'
    ),
    '<h2>Dagen 14–21: Begin klanten aan te trekken</h2>
<p>Hier verschijnt het verschil tussen degenen die slagen en degenen die vastlopen.</p>
<p>Marketing betekent geen reclame. Het betekent mensen helpen een probleem op te lossen.</p>',
    '<h2>Dagen 14–21: Begin klanten aan te trekken</h2>
<p>Hier verschijnt het verschil tussen degenen die slagen en degenen die vastlopen.</p>
<p>Marketing betekent geen reclame. Het betekent mensen helpen een probleem op te lossen. Lees de volledige gids: <a href="/resurse/marketing-afacere-belgia-ghid-pas-cu-pas" style="color: #002B7F; text-decoration: underline; font-weight: 600;">Hoe je zelf de marketing doet voor je bedrijf in Belgie</a>.</p>'
  ),
  '<h2>Nuttige bronnen</h2>',
  '<h2>Nuttige bronnen</h2>
<ul><li><a href="/resurse/primirii-10-clienti-belgia-ghid-2026" style="color: #002B7F; text-decoration: underline;">Hoe je je eerste 10 klanten vindt in Belgie – Gids 2026</a></li></ul>'
)
WHERE slug = 'checklist-primele-30-zile-independent-belgia';