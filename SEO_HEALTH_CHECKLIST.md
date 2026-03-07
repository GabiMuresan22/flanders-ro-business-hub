# SEO Health Checklist – Romanian Business Hub

**Target keywords:** business, belgia, start afacere belgia, marketing  
**Website:** https://www.ro-businesshub.be  
**Date:** February 2026

---

## Part 1: Keyword & Page Analysis

### On-Page SEO (target: business, belgia, start afacere belgia, marketing)

| Page | H1 | First paragraph | Meta description | Verdict |
|------|----|-----------------|------------------|---------|
| **Homepage** | "Descoperă Afaceri Românești în Flandra de Vest" (RO) | "Conectează-te cu servicii, restaurante și magazine..." | "Discover trusted Romanian businesses in West Flanders, Belgium..." | ⚠️ **Belgia** missing from H1 and meta; "business" only in meta. Consider adding "Belgia" in RO/NL H1 or meta. |
| **Resources hub** (/resurse) | "Resurse Utile" / "Useful Resources" | "Ghiduri, articole și sfaturi despre antreprenoriat, marketing și legislație în Belgia." | From `resources.seoDescription` | ✅ **marketing** and **Belgia** in subtitle; ensure meta includes "start afacere belgia" or "business Belgia" if targeting that. |
| **Article** (primirii-10-clienti-belgia-ghid-2026) | "Cum îți găsești primii 10 clienți în Belgia – Ghid 2026" | "Ai deschis un business în Belgia..." | "Cum găsești primii clienți în Belgia ca antreprenor român? Strategie practică despre vizibilitate online, Google, SEO și recomandări." | ✅ **Belgia**, **business** in H1 and first paragraph; **marketing** implied (strategie). Consider adding "start afacere" in RO meta or first paragraph for long-tail. |

**Actions:**
- [ ] Add "Belgia" (or "Belgium") in homepage meta description and/or H1 for RO/NL.
- [ ] In resources hub meta, include "start afacere belgia" or "business starten België" for intent.
- [ ] In the "first 10 clients" article (RO), add "cum începi un business" or "start afacere" in the first 100 words or meta if you want to rank for that exact phrase.

---

### Canonical logic & duplicate content risk

| Item | Status | Notes |
|------|--------|------|
| Canonical URL | ✅ | SEO component sets `<link rel="canonical">` to `BASE_URL + pathname` (no query string). |
| Same URL for all languages | ⚠️ | One URL per page (e.g. `/resurse/primirii-10-clienti-belgia-ghid-2026`). Language is via `?lang=ro` / `?lang=nl`; canonical is the same URL. |
| Hreflang | ✅ | `en`, `ro`, `nl`, `x-default` point to same path (EN) or path + `?lang=ro` / `?lang=nl`. |

**Risk:** Google may see one URL with different content by language (client-side). Canonical is the same for all languages, so there is no duplicate *URL* per language. For stronger language targeting you could later consider separate paths (e.g. `/en/resurse/...`, `/ro/resurse/...`) and canonicals per language.

**Actions:**
- [ ] Keep current setup; no urgent duplicate-content fix required.
- [ ] Optional: Document that canonical = default (EN) and hreflang indicates alternates so GSC doesn’t flag duplicates.

---

### Internal linking – topical authority (3–5 links from this page)

Suggested links **from** the article *"Cum îți găsești primii 10 clienți în Belgia"* (and/or from the Resources hub) to build topical authority:

1. **Cum devii independent în Belgia? Ghid complet 2026** (`/resurse/cum-devii-independent-belgia-ghid-complet-2026`) – same theme: start business in Belgium; strong internal link.
2. **Marketing Digital pentru începători** (`/resurse/marketing-digital-incepatori`) – same category (Marketing); supports "marketing" and "start afacere".
3. **Add Business** (`/add-business`) – CTA in conclusion: "listarea afacerii tale pe o platformă optimizată SEO" → link to Add Business.
4. **Categories** (`/categories`) or a specific category (e.g. `/category/construction`) – "exemple: electrician, constructor..." → link to relevant categories.
5. **Contact** (`/contact`) – for "ai întrebări?" or support.

**Actions:**
- [ ] In the article content (DB/migration or CMS), add 2–3 inline links to the self-employment guide and the marketing article.
- [ ] In the article conclusion, add a button or link to `/add-business` (and optionally `/categories` or `/contact`).

---

### User intent – content structure

**Intent for "business belgia", "start afacere belgia", "marketing":**  
User wants: how to start a business in Belgium, how to get clients, and basic marketing.

| Element | Your article | Match? |
|---------|--------------|--------|
| Headings (H2/H3) | Clarifică oferta, Prezență online, Google Business, Facebook, Listare platforme, Poze, Google esențial, Comunitate română, 10 contacte, Încredere, Greșeli, Concluzie | ✅ Step-by-step and mistakes; matches "how to" intent. |
| Bullets / lists | Da – liste clare (ce îți trebuie, greșeli, exemple căutări) | ✅ Easy to scan. |
| Actionability | Concret: site, GBP, Facebook, platforme, review-uri | ✅ Matches "start afacere" + "marketing". |
| CTA | Text despre listare pe platformă; fără link explicit | ⚠️ Add visible CTA link to Add Business. |

**Verdict:** Structure matches user intent. Add one clear CTA link (e.g. to Add Business) in the conclusion.

---

## Part 2: Action checklist (steps to do after)

### 1. Indexing & crawlability

- [ ] **GSC – Indexing report**  
  In Google Search Console → Indexing → Pages: check for a sudden spike in "Excluded" pages. If yes, review "Why pages are not indexed" and fix (e.g. noindex, redirects, canonical).

- [ ] **Sitemap**  
  - Ensure `https://www.ro-businesshub.be/sitemap.xml` is submitted in GSC (Sitemaps).  
  - Confirm zero errors in GSC for the sitemap.  
  - Sitemap is generated at build time (`npm run generate-sitemap`); after adding new resources, rebuild and re-submit if needed.

- [ ] **robots.txt**  
  - Open `https://www.ro-businesshub.be/robots.txt`.  
  - Confirm there are no `Disallow` rules that block important paths (e.g. `/resurse/`, `/images/`, `/category/`).  
  - Current setup allows all; keep it that way unless you intentionally want to block something.

---

### 2. Content & structure

- [ ] **Broken links (404s)**  
  Use Screaming Frog (desktop) or a free broken-link checker (e.g. Broken Link Checker, Dead Link Checker) on `https://www.ro-businesshub.be`. Fix or remove any 404s, especially in header, footer, and resource pages.

- [ ] **Meta titles & descriptions**  
  - Ensure no two pages share the same `<title>`.  
  - Check key pages: Home, /resurse, /resurse/[slug], /category/[slug], /business/[id], /about, /contact, /faq.  
  - Keep titles unique and under ~60 characters; descriptions under ~160 characters.

- [ ] **Image alt text**  
  - Verify all images have descriptive `alt` (e.g. resource cards use `displayTitle`; business cards use `business_name`).  
  - Check hero, resource covers, business logos, and any new images.  
  - Aim for alt text that is useful for accessibility and SEO (e.g. "Business name – Category, City").

---

### 3. Performance & experience

- [ ] **Core Web Vitals (GSC)**  
  In GSC → Experience → Core Web Vitals:  
  - If **Largest Contentful Paint (LCP)** is above 2.5s, optimize images (format, size, lazy load), hosting, and render-blocking resources.  
  - Check **Cumulative Layout Shift (CLS)** and **Interaction to Next Paint (INP)** and fix any poor URLs.

- [ ] **Mobile usability**  
  In GSC → Experience → Mobile Usability:  
  - Resolve any "Clickable elements too close together" (or similar) errors by increasing tap target size or spacing on mobile.

---

## Part 3: Quick reference

| Task | Where / How |
|------|---------------------|
| GSC Indexing | Search Console → Indexing → Pages |
| Sitemap | GSC → Sitemaps; URL: https://www.ro-businesshub.be/sitemap.xml |
| robots.txt | https://www.ro-businesshub.be/robots.txt |
| Broken links | Screaming Frog or free online checker on full site |
| Meta titles | Per page in code: Index, ResourcesPage, ResourceDetailPage, CategoryPage, etc. |
| Alt text | `ResourcesPage.tsx`, `ResourceDetailPage.tsx`, `BusinessCard.tsx`, `BusinessDetails.tsx` |
| Core Web Vitals | GSC → Experience → Core Web Vitals |
| Mobile usability | GSC → Experience → Mobile Usability |

---

## Summary of recommended code/content changes

1. **Homepage (RO/NL):** Consider adding "Belgia" (or equivalent) in H1 or meta for the target keyword.  
2. **Resources hub:** Ensure meta includes "start afacere belgia" / "business België" if targeting that.  
3. **Article "Primii 10 clienți":** Add 2–3 internal links (self-employment guide, marketing article) and one CTA link to `/add-business` (and optionally `/categories` or `/contact`).  
4. **Routine:** Run the checklist above (GSC indexing, sitemap, robots, broken links, meta, alt, Core Web Vitals, mobile) periodically (e.g. monthly or after big content changes).

---

**File:** `SEO_HEALTH_CHECKLIST.md`  
**Next review:** After next content or structure change, or quarterly.
