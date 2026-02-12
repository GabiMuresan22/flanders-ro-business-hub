# Quick Start - Deploy Dutch Translation

⏱️ **Total Time: 5 minutes**

## Step 1: Apply Migration (2 minutes)

Choose ONE method:

### Method A: Supabase CLI
```bash
supabase link --project-ref qwwvnxrduakmrgdmiccs
supabase db push
```

### Method B: Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/qwwvnxrduakmrgdmiccs/sql
2. Click "New query"
3. Copy: `supabase/migrations/20260212055600_add_dutch_translation_self_employed_guide.sql`
4. Paste and click "Run"

## Step 2: Verify (1 minute)

```bash
node scripts/check-migration.mjs
```

Expected: ✅ MIGRATION STATUS: APPLIED

## Step 3: Test (2 minutes)

Visit these URLs:
- https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026
- https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=en
- https://www.ro-businesshub.be/resurse/cum-devii-independent-belgia-ghid-complet-2026?lang=nl ← Should show Dutch!

## Success ✅

Dutch content should now display with:
- Title: "Hoe word je zelfstandige in België? Volledige gids 2026"
- All content in Dutch
- Language switcher working

## Need Help?

See detailed guides:
- **DEPLOYMENT_INSTRUCTIONS.md** - Complete deployment guide
- **COMPLETE_SOLUTION.md** - Full solution overview
- **APPLY_DUTCH_TRANSLATION.md** - Technical details

## Troubleshooting

If Dutch still shows in English:
1. Clear browser cache (Ctrl+Shift+R)
2. Try incognito mode
3. Run: `node scripts/check-migration.mjs`
4. Check URL includes `?lang=nl`

---

**That's it!** 🎉
