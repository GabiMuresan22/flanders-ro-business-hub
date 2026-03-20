

# Plan: Add New Marketing DIY Article to Resources

## Overview
Insert a new resource article "Cum sa-ti faci singur marketingul pentru afacerea ta in Belgia" into the `resources` database table with full RO/EN/NL translations, following the exact same HTML structure, CTA styling, and SEO patterns as the existing articles.

## Steps

### 1. Insert the new article into the `resources` table
Use the database insert tool to add a single row with:
- **slug**: `marketing-afacere-belgia-ghid-pas-cu-pas`
- **category**: `Marketing`
- **is_published**: `true`
- **image_url**: Will use a relevant stock/Unsplash image uploaded to the `business-images` bucket, or reference a local image in `public/images/`
- **title** (RO): "Cum sa-ti faci singur marketingul pentru afacerea ta in Belgia (fara agentie) – Ghid pas cu pas"
- **title_en**: "How to Do Your Own Marketing for Your Business in Belgium (Without an Agency) – Step by Step Guide"
- **title_nl**: "Hoe je zelf de marketing doet voor je bedrijf in Belgie (zonder bureau) – Stap-voor-stap gids"
- **excerpt** / **excerpt_en** / **excerpt_nl**: Short 1-2 sentence summaries in each language
- **content** (RO): Full article HTML with semantic H2/H3 headings, lists, tables, no emojis, CTA buttons using inline CSS (blue gradient `#002B7F` background, golden yellow `#EAB308` buttons with `onmouseover/out` handlers)
- **content_en**: Full English translation, same HTML structure
- **content_nl**: Full Dutch translation, same HTML structure

### 2. Article HTML structure (all 3 languages)
Following the established pattern:
- Intro paragraphs (no H2 — good for SEO)
- H2 sections for each major topic
- H3 sub-sections where appropriate
- Bulleted lists for actionable items
- Two CTA blocks (mid-article + final) with inline-styled gradient boxes and yellow buttons linking to `/add-business`
- "Resurse utile" section at the bottom linking to other articles
- No emojis anywhere in the HTML

### 3. Update sitemap
Add the new article URL to `public/sitemap.xml`.

### 4. Add FAQ structured data (optional)
If the article contains FAQ-like content, add FAQ schema handling in `ResourceDetailPage.tsx` for this slug.

## Technical Details
- The article content uses inline CSS for CTA styling (required because Tailwind Typography's `prose` class overrides utility classes in injected HTML)
- CTA button colors: background `#EAB308` (golden yellow), text `#000000`, hover `#d4a006`
- CTA container: gradient from `#002B7F` to `#001a4d`, white text
- Links to other resources use `color: #002B7F; text-decoration: underline`
- No code changes needed in React components — the article renders through existing `ResourceDetailPage`

