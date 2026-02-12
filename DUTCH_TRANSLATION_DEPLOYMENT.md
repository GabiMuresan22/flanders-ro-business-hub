# Dutch Translation Deployment Guide

## Summary
This PR adds Dutch (NL) translation for the self-employment guide resource and updates the resource slug to match the required URL pattern.

## Changes Made

### 1. Database Migration
- **File**: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`
- **Changes**:
  - Updated Romanian base content (title, excerpt, content) to the comprehensive guide
  - Updated slug from `inregistrare-afacere-belgia` to `cum-devii-independent-belgia-ghid-complet-2026`
  - Added Dutch translations (title_nl, excerpt_nl, content_nl)

### 2. Dependencies
- Added `dotenv` as a dev dependency for sitemap generation during build

### 3. Resource Details

#### Romanian (Base)
- **Title**: "Cum devii independent în Belgia? Ghid complet 2026"
- **URL**: `/resurse/cum-devii-independent-belgia-ghid-complet-2026`

#### English (title_en)
- **Title**: "How to Become Self-Employed in Belgium - Complete Guide 2026"
- **URL**: `/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=en`

#### Dutch (title_nl) - NEW
- **Title**: "Hoe word je zelfstandige in België? Volledige gids 2026"
- **URL**: `/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl`

## Deployment Steps

1. **Apply Database Migration**
   ```bash
   # Using Supabase CLI
   supabase db push
   
   # Or run the migration manually in the Supabase SQL Editor
   ```

2. **Verify Migration**
   - Check that the resource with category 'Legal' has been updated
   - Verify the slug has changed to `cum-devii-independent-belgia-ghid-complet-2026`
   - Confirm Dutch translations are present in `title_nl`, `excerpt_nl`, and `content_nl`

3. **Deploy Application**
   ```bash
   npm install
   npm run build
   # Deploy the built application
   ```

4. **Test URLs**
   After deployment, test the following URLs:
   - Romanian: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026`
   - English: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=en`
   - Dutch: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl`

## Language Switching

The application uses the `?lang=` query parameter for language switching:
- No parameter or `?lang=en` - English (default)
- `?lang=ro` - Romanian
- `?lang=nl` - Dutch (Nederlands)

Users can switch languages using the language selector in the navigation bar, which will automatically update the URL with the appropriate `?lang=` parameter.

## Content Translation

The Dutch translation includes:

1. **Title**: Translated from English version
2. **Excerpt**: Complete Dutch translation of the introduction
3. **Content**: Full comprehensive guide covering:
   - Types of self-employment (Hoofdberoep vs. Bijberoep)
   - Legal forms (Eenmanszaak vs. Vennootschap)
   - Registration steps and required documents
   - Costs and accountant role
   - Payrolling solution via Tentoo
   - Call-to-action for Romanian Business Hub registration

## Notes

- The old slug `inregistrare-afacere-belgia` will no longer work after this migration
- The sitemap will automatically include the new resource URL when connected to Supabase
- All content follows the same structure and formatting as the English version
- Belgian Dutch terminology is used (e.g., "BTW" for VAT, "zelfstandige" for self-employed)

## Verification Checklist

- [ ] Migration applied successfully
- [ ] Resource accessible at new URL
- [ ] Dutch content displays correctly when `?lang=nl` is set
- [ ] Language switcher changes content between RO/EN/NL
- [ ] SEO meta tags show Dutch title and description in NL mode
- [ ] Navigation and routing work correctly
- [ ] Resource appears in the resources list page
- [ ] Sitemap includes the new URL
