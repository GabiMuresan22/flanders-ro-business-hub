# Pre-Launch Checklist
## Romanian Business Hub - Most Important Tasks Before Public Launch

**Last Updated:** January 27, 2025  
**Status:** Pre-Launch — most critical & high-priority items complete  
**Website:** https://www.ro-businesshub.be

### Changes applied (January 2025)
- **SEO:** `src/components/SEO.tsx` — `baseUrl` set to `https://www.ro-businesshub.be`, default `ogImage` to `og-image.png`.
- **Security headers:** Added `vercel.json` (Vercel) and `public/_headers` (Netlify) with CSP, X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy.
- **Console:** All `console.log` removed; all `console.error`/`console.warn` wrapped in `if (import.meta.env.DEV)` in AddBusinessPage, MyBusinessesPage, AdminDashboard, ReportIssueDialog, Analytics, ContactPage, EditBusinessPage, useAntiSpam, ErrorBoundary, NotFound.
- **Auth forms:** `src/pages/AuthPage.tsx` — added `autoComplete="email"`, `autoComplete="current-password"`, `autoComplete="new-password"`.
- **CORS:** `supabase/functions/submit-contact` and `submit-newsletter` — `Access-Control-Allow-Origin` set to `https://www.ro-businesshub.be`.
- **Image:** Replaced missing `/images/romania-pattern.png` with CSS stripe pattern in `HeroSection.tsx` and `CtaSection.tsx`.
- **OG image:** `index.html` and SEO default point to `og-image.png`; add `public/og-image.png` (1200×630px). See `public/OG_IMAGE_README.txt`.

---

## 🚨 CRITICAL - Must Fix Before Launch

These items **MUST** be completed before going live. The website is not ready for public launch without these fixes.

### 1. Fix SEO Component Placeholder URL ⏱️ 2 minutes

**File:** `src/components/SEO.tsx`  
**Line:** 22

**Current (WRONG):**
```typescript
const baseUrl = 'https://yoursite.lovable.app';
```

**Fix (CORRECT):**
```typescript
const baseUrl = 'https://www.ro-businesshub.be';
```

**Impact:** All dynamic pages currently use wrong canonical URLs, which will hurt SEO and cause indexing issues.

**Status:** ✅ Fixed

---

### 2. Configure Security Headers ⏱️ 30 minutes

**Location:** Hosting platform configuration (Vercel/Netlify)

**Required Headers:**
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security
- Referrer-Policy

**See:** `SECURITY_TEST_REPORT_2025.md` section 6.1 for configuration examples

**Impact:** Protects against XSS, clickjacking, and other attacks.

**Status:** ✅ Configured (vercel.json + public/_headers for Netlify)

---

### 3. Remove Console.log Statements ⏱️ 1 hour

**Files Affected:** 10+ files

**Action:**
- Remove all `console.log` statements
- Wrap `console.error` in `if (import.meta.env.DEV)` checks
- Or use proper logging service

**Files to Check:**
- `src/pages/AddBusinessPage.tsx`
- `src/pages/AdminDashboard.tsx`
- `src/pages/ContactPage.tsx`
- `src/components/ReportIssueDialog.tsx`
- And others (see audit report)

**Impact:** Prevents information leakage and improves performance.

**Status:** ✅ Fixed (removed/wrapped in DEV)

---

### 4. Create and Upload Custom OG Image ⏱️ 1-2 hours

**Requirements:**
- Size: 1200x630px
- Format: PNG or JPG
- Content: Branded image with logo and tagline

**Files to Update:**
- `index.html` (line 28)
- `src/components/SEO.tsx` (line 17)

**Current:** References `og-image.png`; add your image to `public/og-image.png` (see `public/OG_IMAGE_README.txt`).

**Impact:** Poor appearance when shared on social media until custom image is added.

**Status:** ⚠️ URLs updated; create and add `public/og-image.png` (1200×630px) before launch

---

## 🔴 HIGH PRIORITY - Should Fix Before Launch

These items should be completed before launch for best results.

### 5. Update Browserslist Data ⏱️ 5 minutes

**Command:**
```bash
npx update-browserslist-db@latest
```

**Impact:** Ensures compatibility with latest browsers.

**Status:** ⚠️ Run manually: `npx update-browserslist-db@latest`

---

### 6. Fix Image Path Issue ⏱️ 15 minutes

**Issue:** Build warning about `/images/romania-pattern.png`

**Action:**
- Verify file exists at correct path
- Fix import/reference if needed

**Impact:** Missing image in production.

**Status:** ✅ Fixed (replaced with CSS pattern; no asset needed)

---

### 7. Add Autocomplete Attributes to Forms ⏱️ 30 minutes

**Files:**
- `src/pages/AuthPage.tsx`

**Add:**
- `autocomplete="email"` to email fields
- `autocomplete="current-password"` to password fields
- `autocomplete="new-password"` to new password fields

**Impact:** Better accessibility and user experience.

**Status:** ✅ Added (email, current-password, new-password)

---

### 8. Restrict CORS to Production Domain ⏱️ 15 minutes

**Files:**
- `supabase/functions/submit-contact/index.ts`
- `supabase/functions/submit-newsletter/index.ts`

**Current:**
```typescript
'Access-Control-Allow-Origin': '*'
```

**Fix:**
```typescript
'Access-Control-Allow-Origin': 'https://www.ro-businesshub.be'
```

**Impact:** Better security by restricting API access.

**Status:** ✅ Restricted to https://www.ro-businesshub.be

---

### 9. Verify Environment Variables ⏱️ 15 minutes

**Check:**
- [ ] `.env` file exists (not committed to git)
- [ ] `VITE_SUPABASE_URL` is set
- [ ] `VITE_SUPABASE_PUBLISHABLE_KEY` is set
- [ ] Supabase Edge Functions have `RESEND_API_KEY` set
- [ ] All variables use production values (not development)

**Impact:** Website won't work without proper configuration.

**Status:** ⚠️ Verify

---

### 10. Test Production Build ⏱️ 30 minutes

**Commands:**
```bash
npm run build
npm run preview
```

**Check:**
- [ ] Build completes without errors
- [ ] All pages load correctly
- [ ] Images load
- [ ] Forms work
- [ ] Authentication works
- [ ] No console errors

**Impact:** Ensures production build works correctly.

**Status:** ⚠️ Test Required

---

## 🟡 MEDIUM PRIORITY - Can Fix After Launch

These items improve the website but aren't blocking for launch.

### 11. Add Structured Data ⏱️ 3-4 hours

**Add:**
- Organization schema (homepage)
- LocalBusiness schema (business pages)
- BreadcrumbList schema (navigation)

**Impact:** Rich snippets in search results.

**Status:** ⚠️ Optional

---

### 12. Set Up Error Monitoring ⏱️ 2 hours

**Options:**
- Sentry
- LogRocket
- Rollbar

**Impact:** Better error tracking and debugging.

**Status:** ⚠️ Recommended

---

### 13. Run Lighthouse Audit ⏱️ 1 hour

**Tool:** Google Lighthouse

**Check:**
- Performance score
- Accessibility score
- Best Practices score
- SEO score

**Impact:** Identifies optimization opportunities.

**Status:** ⚠️ Recommended

---

### 14. Verify All Images Have Alt Text ⏱️ 1 hour

**Action:**
- Check all images
- Add descriptive alt text where missing

**Impact:** Better accessibility and SEO.

**Status:** ⚠️ Recommended

---

### 15. Set Up Google Search Console ⏱️ 30 minutes

**Actions:**
- Verify domain ownership
- Submit sitemap
- Monitor indexing

**Impact:** Better SEO monitoring and insights.

**Status:** ⚠️ Recommended

---

## 📋 COMPLETE PRE-LAUNCH CHECKLIST

### Critical (Must Do)
- [x] Fix SEO component placeholder URL
- [x] Configure security headers
- [x] Remove console.log statements
- [ ] Create custom OG image (add public/og-image.png 1200×630px)

### High Priority (Should Do)
- [ ] Update browserslist data (run: npx update-browserslist-db@latest)
- [x] Fix image path issue
- [x] Add autocomplete attributes
- [x] Restrict CORS to production
- [ ] Verify environment variables
- [ ] Test production build

### Medium Priority (Nice to Have)
- [ ] Add structured data
- [ ] Set up error monitoring
- [ ] Run Lighthouse audit
- [ ] Verify image alt text
- [ ] Set up Google Search Console

### Testing
- [ ] Test all pages load correctly
- [ ] Test forms submit successfully
- [ ] Test authentication (login/signup/logout)
- [ ] Test search functionality
- [ ] Test on mobile devices
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test error handling
- [ ] Test rate limiting
- [ ] Test email notifications
- [ ] Test language toggle

### Database
- [ ] Verify all migrations applied
- [ ] Test database connection
- [ ] Verify RLS policies work
- [ ] Test with sample data

### Deployment
- [ ] Deploy to production
- [ ] Verify HTTPS is enabled
- [ ] Test production URL
- [ ] Verify all assets load
- [ ] Test from different locations

---

## ⏱️ TIME ESTIMATE

**Critical Items:** 2-4 hours  
**High Priority Items:** 2-3 hours  
**Total Minimum:** 4-7 hours

**Recommendation:** Set aside 1 full day to complete all critical and high-priority items, plus testing.

---

## 🎯 PRIORITY ORDER

1. **Day 1 Morning (2-3 hours):**
   - Fix SEO component URL (2 min)
   - Remove console.log statements (1 hour)
   - Update browserslist (5 min)
   - Fix image path (15 min)
   - Add autocomplete attributes (30 min)
   - Restrict CORS (15 min)

2. **Day 1 Afternoon (2-3 hours):**
   - Configure security headers (30 min)
   - Create OG image (1-2 hours)
   - Verify environment variables (15 min)
   - Test production build (30 min)

3. **Day 2 (Testing):**
   - Comprehensive testing
   - Fix any issues found
   - Final verification

---

## ✅ READY FOR LAUNCH?

**You're ready to launch when:**
- ✅ All critical items are completed
- ✅ All high-priority items are completed
- ✅ Production build tested successfully
- ✅ All functionality tested
- ✅ Security headers configured
- ✅ Environment variables verified

**Current Status:** ⚠️ **ALMOST READY** — 3/4 critical and 4/6 high-priority done. Remaining: create custom OG image (`public/og-image.png`), verify env vars, run production build test (and optionally update browserslist).

---

## 📞 QUICK REFERENCE

**Done:**
- ✅ SEO component URL
- ✅ Security headers (vercel.json + _headers)
- ✅ Console.log removal / DEV-wrapped errors
- ✅ Image path (CSS pattern)
- ✅ Autocomplete on auth forms
- ✅ CORS restricted to production

**Remaining before launch:**
- [ ] Create and add `public/og-image.png` (1200×630px)
- [ ] Verify environment variables
- [ ] Run `npm run build` and `npm run preview`; test key flows
- [ ] (Optional) Run `npx update-browserslist-db@latest`

---

**Last Updated:** January 27, 2025  
**Next Review:** After OG image is added and production build is verified
