# Scripts Directory

This directory contains utility scripts for database migrations, verification, and maintenance.

## Migration Scripts

### check-migration.mjs
Quick check to see if the Dutch translation migration has been applied.

```bash
node scripts/check-migration.mjs
```

**Output**: Shows whether the migration is applied and displays basic resource information.

### verify-dutch-content.mjs
Comprehensive verification of Dutch content structure and completeness.

```bash
node scripts/verify-dutch-content.mjs
```

**Output**: 
- Detailed analysis of all language versions (RO/EN/NL)
- Section-by-section verification
- Content length and structure analysis
- Complete assessment with actionable feedback

### apply-migration.mjs
Provides guidance and information about applying migrations.

```bash
node scripts/apply-migration.mjs
```

**Output**: Instructions for applying migrations using different methods.

## Sitemap Generation

### generate-sitemap.mjs
Generates the sitemap.xml file for SEO.

```bash
npm run generate-sitemap
```

This runs automatically during the build process.

## Usage Workflow

### For Checking Migration Status

1. **Quick Check**:
   ```bash
   node scripts/check-migration.mjs
   ```
   
2. **Detailed Verification**:
   ```bash
   node scripts/verify-dutch-content.mjs
   ```

### For Applying Migrations

See `MIGRATION_GUIDE_DUTCH_TRANSLATION.md` for complete instructions.

Recommended approach:
```bash
# Using Supabase CLI
supabase link --project-ref qwwvnxrduakmrgdmiccs
supabase db push

# Then verify
node scripts/verify-dutch-content.mjs
```

## Prerequisites

All scripts require:
- Node.js installed
- Dependencies installed: `npm install --legacy-peer-deps`
- Environment variables configured in `.env` file:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`

## Script Outputs

### Success Output (Migration Applied)
```
✅ SUCCESS - Migration is properly applied!

All checks passed:
  ✅ Correct slug
  ✅ Dutch title present
  ✅ Dutch excerpt present
  ✅ Dutch content present and complete
  ✅ All required sections found
```

### Failure Output (Migration Not Applied)
```
⚠️  ISSUES FOUND - Migration may not be applied correctly

Issues detected:
  1. Dutch content is missing
  2. Slug does not match expected value
  
Action required:
  1. Review MIGRATION_GUIDE_DUTCH_TRANSLATION.md
  2. Apply the migration using one of the recommended methods
  3. Run this script again to verify
```

## Troubleshooting

### "Cannot connect to database"
- Check internet connection
- Verify Supabase credentials in `.env`
- Ensure Supabase project is accessible

### "Module not found"
```bash
npm install --legacy-peer-deps
```

### "Permission denied"
```bash
chmod +x scripts/*.mjs
```

## Adding New Scripts

When adding new scripts to this directory:

1. Use `.mjs` extension for ES modules
2. Add `#!/usr/bin/env node` shebang at the top
3. Make executable: `chmod +x scripts/your-script.mjs`
4. Document in this README
5. Add to package.json scripts if commonly used

## Related Documentation

- `MIGRATION_GUIDE_DUTCH_TRANSLATION.md` - Complete migration guide
- `APPLY_DUTCH_TRANSLATION.md` - Original migration documentation
- `supabase/migrations/` - Migration SQL files

## Support

For issues with scripts:
1. Ensure all prerequisites are met
2. Check script output for specific error messages
3. Review related documentation
4. Verify Supabase connectivity

## Maintenance Notes

- Scripts use `@supabase/supabase-js` client
- Environment variables loaded via `dotenv`
- All scripts are safe to run multiple times
- No destructive operations without explicit confirmation
