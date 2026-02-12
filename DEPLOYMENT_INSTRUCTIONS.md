# DEPLOYMENT INSTRUCTIONS - Dutch Translation

## Quick Start

**Problem**: Dutch content not displaying at https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl

**Solution**: Apply database migration

**Estimated Time**: 5 minutes

---

## Step-by-Step Instructions

### Step 1: Verify Current State (Optional)

Before applying the migration, you can check the current database state:

```bash
node scripts/check-migration.mjs
```

Expected output if migration NOT applied:
```
⚠️  MIGRATION STATUS: NOT APPLIED
```

### Step 2: Apply Migration

Choose **ONE** of the following methods:

#### Method A: Supabase CLI (Recommended)

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref qwwvnxrduakmrgdmiccs

# Apply all pending migrations
supabase db push
```

#### Method B: Supabase Dashboard (Manual)

1. Log in to Supabase: https://supabase.com/dashboard/project/qwwvnxrduakmrgdmiccs
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New query**
4. Open file: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`
5. Copy the entire contents
6. Paste into the SQL Editor
7. Click **Run** (or press Ctrl+Enter)
8. Wait for "Success" message

### Step 3: Verify Migration Was Applied

```bash
node scripts/check-migration.mjs
```

Expected output if migration APPLIED successfully:
```
✅ Slug is correct: cum-devii-independent-belgia-ghid-complet-2026
✅ All Dutch translation fields are present
✅ MIGRATION STATUS: APPLIED
```

### Step 4: Test on Production Website

Test all three language versions:

1. **Romanian** (default):
   ```
   https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026
   ```

2. **English**:
   ```
   https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=en
   ```

3. **Dutch** (should now work):
   ```
   https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl
   ```

### Step 5: Verify Language Switching

1. Go to the page in Romanian
2. Click the language selector (NL)
3. Verify content changes to Dutch
4. Check that title, excerpt, and full content are in Dutch

---

## What This Migration Does

The migration file (`supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`) performs two UPDATE queries:

1. **Updates the Legal resource**:
   - Changes slug to: `cum-devii-independent-belgia-ghid-complet-2026`
   - Updates Romanian content (title, excerpt, content)

2. **Adds Dutch translations**:
   - Sets `title_nl` to Dutch title
   - Sets `excerpt_nl` to Dutch excerpt
   - Sets `content_nl` to full Dutch guide (~9KB of content)

**Important**: This is an UPDATE operation, not an INSERT. It modifies the existing Legal resource.

---

## Success Criteria

After deployment, verify:

- ✅ Page loads at the URL with `?lang=nl` parameter
- ✅ Content is displayed in Dutch (not English or Romanian)
- ✅ Title shows: "Hoe word je zelfstandige in België? Volledige gids 2026"
- ✅ Language switcher works (RO ↔ EN ↔ NL)
- ✅ All sections are in Dutch
- ✅ No broken formatting or missing content

---

## Troubleshooting

### Problem: "Migration already applied" error

**Solution**: This is safe to ignore. The migration uses UPDATE, so running it multiple times will just update the same record.

### Problem: Dutch content still shows in English

**Solutions**:
1. Clear browser cache (Ctrl+Shift+R)
2. Try incognito/private browsing mode
3. Check the URL includes `?lang=nl`
4. Run `node scripts/check-migration.mjs` to verify migration was applied

### Problem: Cannot connect to Supabase

**Solutions**:
1. Check internet connection
2. Verify Supabase credentials in `.env` file
3. Ensure your IP is allowed in Supabase dashboard settings
4. Check database permissions

### Problem: SQL execution fails

**Solutions**:
1. Check you have write permissions on the database
2. Verify the resources table exists
3. Look for detailed error message in Supabase dashboard
4. Ensure there is a Legal category resource in the database

---

## Rollback (If Needed)

If you need to rollback, you can:

1. Restore the old slug and content manually via SQL Editor
2. Or use a database backup

**Note**: There's no automatic rollback script because:
- The old slug was different
- We don't have a backup of the old Dutch translations (they didn't exist)

It's recommended to take a database backup before applying the migration.

---

## Technical Notes

- **No code deployment needed**: The application already supports Dutch
- **Migration is idempotent**: Safe to run multiple times
- **Database changes only**: Only the `resources` table is modified
- **One resource affected**: Only the Legal category resource

---

## Additional Resources

- **Detailed Guide**: See `APPLY_DUTCH_TRANSLATION.md`
- **Resolution Summary**: See `RESOLUTION_SUMMARY.md`
- **Deployment Guide**: See `DUTCH_TRANSLATION_DEPLOYMENT.md`
- **Implementation Summary**: See `IMPLEMENTATION_SUMMARY.md`

---

## Questions or Issues?

If you encounter problems:

1. Run the diagnostic script and share the output:
   ```bash
   node scripts/check-migration.mjs
   ```

2. Check Supabase dashboard logs for errors

3. Contact the development team with:
   - Output from the diagnostic script
   - Screenshots of any errors
   - URL you're testing

---

## Completion Checklist

Once deployed, mark these as complete:

- [ ] Migration applied successfully
- [ ] Verification script shows ✅ APPLIED status
- [ ] Tested Romanian version - works
- [ ] Tested English version - works
- [ ] Tested Dutch version - works
- [ ] Language switcher works correctly
- [ ] SEO meta tags show correct language
- [ ] No console errors in browser
- [ ] Issue closed in GitHub

---

**Last Updated**: 2026-02-12  
**Migration File**: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`  
**Related Issue**: Dutch content not displaying when NL language selected
