# Apply Dutch Translation Migration

## Issue
When accessing the page at `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl`, the content is displayed in English instead of Dutch.

## Root Cause
The database migration file `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql` exists and contains the complete Dutch translation, but **it has not been applied to the production database yet**.

## Solution
Apply the migration to the production Supabase database.

## Steps to Apply Migration

### Option 1: Using Supabase CLI (Recommended)

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Link to your project**:
   ```bash
   supabase link --project-ref qwwvnxrduakmrgdmiccs
   ```

3. **Apply pending migrations**:
   ```bash
   supabase db push
   ```

4. **Verify the migration**:
   ```bash
   # You can run the check script
   node scripts/check-migration.mjs
   ```

### Option 2: Using Supabase SQL Editor (Manual)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/qwwvnxrduakmrgdmiccs
2. Navigate to **SQL Editor**
3. Open a new query
4. Copy and paste the contents of `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`
5. Click **Run** to execute the migration
6. Verify the changes in the **Table Editor** > **resources** table

### Option 3: Using the Migration Check Script

We've created a helper script to verify if the migration has been applied:

```bash
node scripts/check-migration.mjs
```

This script will:
- Connect to your Supabase database
- Check if the Legal resource exists
- Verify if the slug matches the expected value
- Check if Dutch translations are present
- Report the current state

## What the Migration Does

The migration file performs two UPDATE statements on the `resources` table:

1. **Updates the Romanian base content**:
   - Changes slug to: `cum-devii-independent-belgia-ghid-complet-2026`
   - Updates Romanian title, excerpt, and content

2. **Adds Dutch translations**:
   - `title_nl`: "Hoe word je zelfstandige in België? Volledige gids 2026"
   - `excerpt_nl`: Complete Dutch introduction
   - `content_nl`: Full comprehensive guide in Dutch

## Verification Steps

After applying the migration:

1. **Check Database**:
   - Verify the resource slug is: `cum-devii-independent-belgia-ghid-complet-2026`
   - Confirm `title_nl`, `excerpt_nl`, and `content_nl` columns have Dutch content

2. **Test the Website**:
   - Visit: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026`
   - Switch language to NL using the language selector
   - Verify content displays in Dutch

3. **Test All Language Versions**:
   - Romanian: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026`
   - English: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=en`
   - Dutch: `https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl`

## Expected Behavior After Migration

- ✅ Dutch content displays when `?lang=nl` parameter is used
- ✅ Language switcher properly changes content between RO/EN/NL
- ✅ SEO meta tags show Dutch title and description in NL mode
- ✅ All three language versions display properly

## Important Notes

- The old slug `inregistrare-afacere-belgia` will no longer work after this migration
- The migration updates the existing Legal resource (WHERE category = 'Legal')
- No application code changes are needed - the UI already supports Dutch
- The migration is idempotent - running it multiple times is safe

## Troubleshooting

**If Dutch content still doesn't show after migration:**

1. Clear browser cache and reload the page
2. Verify the migration was applied successfully using the check script
3. Check browser console for any JavaScript errors
4. Verify the URL includes `?lang=nl` parameter

**If you can't connect to the database:**

- Ensure you have the correct Supabase credentials
- Check that your IP is allowed in Supabase dashboard settings
- Verify you have the necessary permissions to modify the database

## Contact

If you encounter issues applying the migration, please:
1. Run `node scripts/check-migration.mjs` and share the output
2. Check the Supabase dashboard for any errors
3. Contact the development team with the error details
