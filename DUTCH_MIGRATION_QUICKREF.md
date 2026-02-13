# Dutch Translation Migration - Quick Reference

## 🎯 Goal
Ensure the Dutch (NL) version of the self-employed guide displays with complete structured content at:
`https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl`

## ✅ Current Status

### What's Already Done
- ✅ Migration file exists: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`
- ✅ Complete Dutch translation with all 6 sections included
- ✅ Frontend code supports Dutch language with proper fallbacks
- ✅ Verification scripts and comprehensive documentation created

### What Needs To Be Done
- ⏳ **Apply migration to production database** (requires database access)
- ⏳ Verify migration was applied successfully
- ⏳ Test Dutch content on live website

## 🚀 Quick Start (3 Steps)

### Step 1: Check Current Status
```bash
npm run migration:check
```

If output shows "⚠️ MIGRATION STATUS: NOT APPLIED", proceed to Step 2.

### Step 2: Apply Migration

**Option A - Supabase CLI** (Recommended, 2 commands):
```bash
supabase link --project-ref qwwvnxrduakmrgdmiccs
supabase db push
```

**Option B - Supabase SQL Editor** (Manual, browser):
1. Go to: https://supabase.com/dashboard/project/qwwvnxrduakmrgdmiccs/sql
2. Copy contents of: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`
3. Paste and click "Run"

### Step 3: Verify Success
```bash
npm run migration:verify
```

Expected output: "✅ SUCCESS - Migration is properly applied!"

## 📚 Documentation

| Document | Purpose | Use When |
|----------|---------|----------|
| `MIGRATION_GUIDE_DUTCH_TRANSLATION.md` | Complete step-by-step guide | You need detailed instructions |
| `APPLY_DUTCH_TRANSLATION.md` | Original migration docs | You want background info |
| `scripts/README.md` | Script documentation | You need to understand the tools |

## 🛠️ Available Commands

```bash
# Quick migration status check
npm run migration:check

# Detailed content verification
npm run migration:verify

# Build project (includes sitemap generation)
npm run build

# Start development server
npm run dev
```

## 🔍 What The Migration Does

The migration updates the `resources` table to:
1. Set correct slug: `cum-devii-independent-belgia-ghid-complet-2026`
2. Add Dutch title: "Hoe word je zelfstandige in België? Volledige gids 2026"
3. Add complete Dutch content with these sections:
   - Section 1: Soorten zelfstandigheid: Hoofdberoep vs. Bijberoep
   - Section 2: De juridische vorm kiezen: Eenmanszaak of vennootschap (BV)?
   - Section 3: Stappen en vereiste documenten voor registratie in 2026
     - A. Professionele bankrekening
     - B. Registratie bij KBO/BCE
     - C. Activering BTW-nummer
     - D. Registratie bij een sociaal verzekeringsfonds
   - Section 4: Maandelijkse kosten en optimalisatie: De rol van de accountant
   - Section 5: De "test"-oplossing: Payrolling via Tentoo
   - Section 6: Conclusie: Je bedrijf verdient gezien te worden!

## 🧪 Testing After Migration

### Test URLs
```
Romanian: https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026
English:  https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=en
Dutch:    https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl
```

### Quick Visual Test
1. Visit the Dutch URL
2. Check you see: "Hoe word je zelfstandige in België?"
3. Scroll down and verify all 6 main sections are visible
4. Click language switcher to test RO ↔ EN ↔ NL switching

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect to database | Check credentials in `.env` file |
| Dutch still shows English | Clear browser cache (Ctrl+Shift+Delete) |
| Migration check fails | Run `npm install --legacy-peer-deps` |
| Migration not appearing in Supabase | Ensure you're linked to correct project |

## 📞 Need Help?

1. Run verification: `npm run migration:verify`
2. Check detailed guide: `MIGRATION_GUIDE_DUTCH_TRANSLATION.md`
3. Review troubleshooting section in the guide
4. Check Supabase Dashboard logs

## 📋 Acceptance Criteria

- [ ] Migration verified as applied via `npm run migration:check`
- [ ] Dutch page displays complete structured content
- [ ] All 6 sections with subsections visible on Dutch page
- [ ] Content formatting matches English version
- [ ] Language switcher correctly shows Dutch content when NL selected

## ⚡ TL;DR

```bash
# Install if needed
npm install --legacy-peer-deps

# Check status
npm run migration:check

# If not applied, use Supabase CLI:
supabase link --project-ref qwwvnxrduakmrgdmiccs
supabase db push

# Verify
npm run migration:verify

# Test
# Visit: https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl
```

---

**Last Updated**: 2026-02-12  
**Status**: Tools and documentation ready, migration pending database access  
**Migration File**: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`
