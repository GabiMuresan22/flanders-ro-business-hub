# Dutch Translation Migration Guide - Step by Step

## Overview
This guide provides comprehensive instructions for applying the Dutch translation migration to ensure the self-employed guide displays properly in Dutch at:
`https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl`

## ⚠️ Important
This migration **MUST** be applied to the production Supabase database for the Dutch content to appear on the website.

## Quick Status Check

Before applying the migration, verify the current status:

```bash
npm install --legacy-peer-deps  # If dependencies not installed
node scripts/check-migration.mjs
```

This will tell you if the migration has already been applied or if action is needed.

## Method 1: Supabase CLI (Recommended)

### Prerequisites
- Supabase CLI installed
- Access to Supabase project credentials
- Terminal/command line access

### Steps

1. **Install Supabase CLI** (if not installed):
   ```bash
   npm install -g supabase
   # or
   brew install supabase/tap/supabase  # macOS
   # or
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase  # Windows
   ```

2. **Link to the project**:
   ```bash
   supabase link --project-ref qwwvnxrduakmrgdmiccs
   ```
   
   You'll be prompted for your database password. This can be found in:
   - Supabase Dashboard → Settings → Database → Database password

3. **Verify migrations**:
   ```bash
   supabase db remote commit
   ```
   
   This shows which migrations have been applied.

4. **Apply pending migrations**:
   ```bash
   supabase db push
   ```
   
   This will apply all pending migrations, including the Dutch translation.

5. **Verify the migration was applied**:
   ```bash
   node scripts/check-migration.mjs
   ```
   
   You should see "✅ MIGRATION STATUS: APPLIED"

## Method 2: Supabase SQL Editor (Manual)

### Steps

1. **Access the SQL Editor**:
   - Go to: https://supabase.com/dashboard/project/qwwvnxrduakmrgdmiccs/sql
   - Log in with your Supabase credentials

2. **Create a new query**:
   - Click "New query" button

3. **Copy the migration SQL**:
   - Open the file: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`
   - Copy the entire contents

4. **Paste and execute**:
   - Paste the SQL into the Supabase SQL Editor
   - Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac)
   - Wait for confirmation that the query executed successfully

5. **Verify the changes**:
   - Go to Table Editor → resources
   - Find the Legal category resource
   - Check that:
     - `slug` = `cum-devii-independent-belgia-ghid-complet-2026`
     - `title_nl` contains Dutch text
     - `excerpt_nl` contains Dutch text
     - `content_nl` contains Dutch text

6. **Run the verification script**:
   ```bash
   node scripts/check-migration.mjs
   ```

## Method 3: Using pgAdmin or psql

If you have direct database access through pgAdmin or psql:

### Using psql:

```bash
# Get connection string from Supabase Dashboard → Settings → Database → Connection string
psql "postgresql://postgres:[YOUR-PASSWORD]@db.qwwvnxrduakmrgdmiccs.supabase.co:5432/postgres"

# Once connected, run:
\i supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql

# Exit:
\q
```

### Using pgAdmin:
1. Connect to the database using credentials from Supabase Dashboard
2. Open Query Tool
3. Load and execute the migration file

## Verification Checklist

After applying the migration, verify everything works:

### Database Verification
- [ ] Resource slug updated to `cum-devii-independent-belgia-ghid-complet-2026`
- [ ] `title_nl` column populated with Dutch title
- [ ] `excerpt_nl` column populated with Dutch excerpt  
- [ ] `content_nl` column populated with full Dutch content
- [ ] Run `node scripts/check-migration.mjs` shows ✅ APPLIED

### Website Verification

Test all three language versions:

#### Romanian (Default)
- [ ] Visit: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026`
- [ ] Page loads successfully
- [ ] Content displays in Romanian
- [ ] All 6 sections are visible

#### English
- [ ] Visit: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=en`
- [ ] Page loads successfully
- [ ] Content displays in English
- [ ] All 6 sections are visible with subsections

#### Dutch
- [ ] Visit: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl`
- [ ] Page loads successfully
- [ ] Content displays in Dutch
- [ ] Section 1: Soorten zelfstandigheid: Hoofdberoep vs. Bijberoep
- [ ] Section 2: De juridische vorm kiezen: Eenmanszaak of vennootschap (BV)?
- [ ] Section 3: Stappen en vereiste documenten voor registratie in 2026
  - [ ] A. Professionele bankrekening
  - [ ] B. Registratie bij KBO/BCE
  - [ ] C. Activering BTW-nummer
  - [ ] D. Registratie bij een sociaal verzekeringsfonds
- [ ] Section 4: Maandelijkse kosten en optimalisatie: De rol van de accountant
- [ ] Section 5: De "test"-oplossing: Payrolling via Tentoo
- [ ] Section 6: Conclusie: Je bedrijf verdient gezien te worden!

### Language Switcher
- [ ] Language switcher shows EN/RO/NL options
- [ ] Clicking NL switches to Dutch content
- [ ] Clicking EN switches to English content
- [ ] Clicking RO switches to Romanian content
- [ ] URL updates with `?lang=` parameter correctly

### SEO & Meta Tags
- [ ] Page title in Dutch when viewing NL version
- [ ] Meta description in Dutch when viewing NL version
- [ ] Open Graph tags reflect Dutch content

## What the Migration Does

The migration performs two UPDATE operations on the `resources` table:

### Update 1: Romanian Content & Slug
Updates the base Romanian content and changes the slug to the new format:
- **Old slug**: `inregistrare-afacere-belgia` (if any)
- **New slug**: `cum-devii-independent-belgia-ghid-complet-2026`

### Update 2: Dutch Translation
Adds complete Dutch translations to the Legal resource:
- `title_nl`: "Hoe word je zelfstandige in België? Volledige gids 2026"
- `excerpt_nl`: Complete introduction in Dutch
- `content_nl`: Full guide with all 6 sections in Dutch

## Troubleshooting

### Migration Check Script Fails
```
Error: Cannot connect to database
```
**Solution**: Verify your internet connection and Supabase credentials in `.env` file.

### Dutch Content Not Showing After Migration
1. **Clear browser cache**: Ctrl+Shift+Delete (Chrome) or Cmd+Shift+Delete (Mac)
2. **Hard refresh**: Ctrl+F5 or Cmd+Shift+R
3. **Check URL**: Ensure it includes `?lang=nl`
4. **Verify in database**: Use Supabase Table Editor to check `content_nl` is populated
5. **Check browser console**: Look for JavaScript errors

### Old Slug Still Works
This is expected behavior if there are cached URLs or bookmarks. The migration only updates the canonical slug.

### Migration Runs But No Changes Visible
1. Verify you're connected to the production database (not local/development)
2. Check the migration executed without errors
3. Run `node scripts/check-migration.mjs` to verify database state
4. Check Supabase logs for any errors

## Important Notes

- ✅ Migration is **idempotent** - safe to run multiple times
- ✅ No application code changes needed - UI already supports Dutch
- ✅ Existing Romanian and English content is preserved
- ⚠️ Old slug will not work if it was different
- ⚠️ Changes are immediate in production

## Support

If you encounter issues:

1. **Run diagnostic script**:
   ```bash
   node scripts/check-migration.mjs
   ```

2. **Check Supabase logs**:
   - Dashboard → Logs → Database logs

3. **Verify migration file**:
   ```bash
   cat supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql
   ```

4. **Contact support** with:
   - Output from check-migration script
   - Screenshot of any errors
   - Current slug of Legal resource (from database)

## Post-Migration Steps

After successful migration:

1. ✅ Test all three language versions
2. ✅ Update any hardcoded links to use new slug
3. ✅ Test language switcher functionality
4. ✅ Verify SEO meta tags
5. ✅ Monitor for any user-reported issues
6. ✅ Update sitemap if needed (runs automatically on build)

## Next Steps

Once migration is applied and verified:

1. Consider adding automated tests for multi-language content
2. Document the language switching behavior
3. Create similar migrations for other resources if needed
4. Monitor analytics for Dutch language usage

---

**Last Updated**: 2026-02-12  
**Migration File**: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`  
**Project**: Romanian Business Hub - Flanders
