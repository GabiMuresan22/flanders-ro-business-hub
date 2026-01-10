# Development Tasks & Issues

**Generated:** January 10, 2025  
**Status:** Based on Development Test Results

---

## 📊 Summary

- **Total Issues:** 36 (23 errors, 13 warnings)
- **Tests:** ✅ Passing (1/1)
- **Build:** ✅ Successful
- **Code Quality:** ⚠️ Needs Improvement

---

## 🔴 High Priority - TypeScript Errors (23 issues)

### Replace `any` Types with Proper TypeScript Types

These errors need to be fixed to improve type safety and code maintainability.

#### 1. **BusinessCard.tsx** (Line 7)
- **Issue:** `business: any` in BusinessCardProps interface
- **Fix:** Replace with proper Business type from database schema
- **File:** `src/components/BusinessCard.tsx`

#### 2. **FeaturedBusinesses.tsx** (Line 8)
- **Issue:** `useState<any[]>([])` for featuredBusinesses
- **Fix:** Use proper Business type from Supabase types
- **File:** `src/components/FeaturedBusinesses.tsx`

#### 3. **Navbar.tsx** (Line 11)
- **Issue:** `useState<any>(null)` for user state
- **Fix:** Use `User | null` from `@supabase/supabase-js`
- **File:** `src/components/Navbar.tsx`

#### 4. **NewsletterSection.tsx** (Line 71)
- **Issue:** `any` type in error handling
- **Fix:** Use proper error type (Error or specific error type)
- **File:** `src/components/NewsletterSection.tsx`

#### 5. **ReviewForm.tsx** (Line 78)
- **Issue:** `any` type in error handling
- **Fix:** Use proper error type
- **File:** `src/components/ReviewForm.tsx`

#### 6. **LanguageContext.tsx** (Line 44)
- **Issue:** `any` type in translation function
- **Fix:** Use proper type for translation keys
- **File:** `src/contexts/LanguageContext.tsx`

#### 7. **AccountPage.tsx** (Lines 22, 93, 125)
- **Issue:** Multiple `any` types
- **Fix:** Replace with proper types for user data and error handling
- **File:** `src/pages/AccountPage.tsx`

#### 8. **AddBusinessPage.tsx** (Lines 24, 217, 489)
- **Issue:** Multiple `any` types
- **Fix:** Replace with proper types for form data and error handling
- **File:** `src/pages/AddBusinessPage.tsx`

#### 9. **BusinessDetails.tsx** (Lines 16, 18)
- **Issue:** `any` types for business and reviews
- **Fix:** Use proper Business and Review types from Supabase
- **File:** `src/pages/BusinessDetails.tsx`

#### 10. **CategoryPage.tsx** (Line 15)
- **Issue:** `any[]` for businesses array
- **Fix:** Use proper Business type array
- **File:** `src/pages/CategoryPage.tsx`

#### 11. **EditBusinessPage.tsx** (Line 388)
- **Issue:** `any` type in error handling
- **Fix:** Use proper error type
- **File:** `src/pages/EditBusinessPage.tsx`

#### 12. **MyBusinessesPage.tsx** (Line 34)
- **Issue:** `any[]` for businesses array
- **Fix:** Use proper Business type array
- **File:** `src/pages/MyBusinessesPage.tsx`

#### 13. **SearchResults.tsx** (Line 17)
- **Issue:** `any[]` for search results
- **Fix:** Use proper Business type array
- **File:** `src/pages/SearchResults.tsx`

#### 14. **notify-new-business/index.ts** (Line 61)
- **Issue:** `any` type in Supabase function
- **Fix:** Use proper type for function parameters
- **File:** `supabase/functions/notify-new-business/index.ts`

#### 15. **notify-new-contact/index.ts** (Line 59)
- **Issue:** `any` type in Supabase function
- **Fix:** Use proper type for function parameters
- **File:** `supabase/functions/notify-new-contact/index.ts`

### Empty Interface Types (2 issues)

#### 16. **ui/command.tsx** (Line 24)
- **Issue:** Empty interface equivalent to supertype
- **Fix:** Remove empty interface or add properties
- **File:** `src/components/ui/command.tsx`

#### 17. **ui/textarea.tsx** (Line 5)
- **Issue:** Empty interface equivalent to supertype
- **Fix:** Remove empty interface or add properties
- **File:** `src/components/ui/textarea.tsx`

### Import Style Issues (1 issue)

#### 18. **tailwind.config.ts** (Line 125)
- **Issue:** `require()` style import is forbidden
- **Fix:** Convert to ES6 import statement
- **File:** `tailwind.config.ts`

---

## ⚠️ Medium Priority - React Hooks Warnings (5 issues)

### Missing Dependencies in useEffect

#### 19. **AdminDashboard.tsx** (Line 52)
- **Issue:** Missing dependency `checkAdminStatus` in useEffect
- **Fix:** Add `checkAdminStatus` to dependency array or wrap in useCallback
- **File:** `src/pages/AdminDashboard.tsx`

#### 20. **AdminDashboard.tsx** (Line 96)
- **Issue:** Missing dependencies `fetchBusinesses` and `fetchMessages`
- **Fix:** Add dependencies or wrap functions in useCallback
- **File:** `src/pages/AdminDashboard.tsx`

#### 21. **BusinessDetails.tsx** (Line 56)
- **Issue:** Missing dependencies `fetchBusiness` and `fetchReviews`
- **Fix:** Add dependencies or wrap functions in useCallback
- **File:** `src/pages/BusinessDetails.tsx`

#### 22. **MyBusinessesPage.tsx** (Line 52)
- **Issue:** Missing dependency `fetchBusinesses`
- **Fix:** Add dependency or wrap function in useCallback
- **File:** `src/pages/MyBusinessesPage.tsx`

---

## 💡 Low Priority - Code Quality Warnings (13 issues)

### Fast Refresh Warnings

These are warnings about files that export both components and non-components, which can affect React Fast Refresh.

#### 23-33. **Multiple Files**
- **Files affected:**
  - `src/components/SEO.tsx` (Line 65)
  - `src/components/ui/badge.tsx` (Line 36)
  - `src/components/ui/button.tsx` (Line 56)
  - `src/components/ui/form.tsx` (Line 168)
  - `src/components/ui/navigation-menu.tsx` (Line 119)
  - `src/components/ui/sidebar.tsx` (Line 760)
  - `src/components/ui/sonner.tsx` (Line 29)
  - `src/components/ui/toggle.tsx` (Line 43)
  - `src/contexts/LanguageContext.tsx` (Line 20)

- **Fix:** Move constants/functions to separate files if they need to be shared, or accept the warning if it's intentional

---

## 🚀 Performance & Optimization

### Build Optimization

#### 34. **Large Bundle Size**
- **Issue:** Main bundle is 513KB (larger than 500KB recommended)
- **Recommendation:** 
  - Implement code-splitting with dynamic imports
  - Use `build.rollupOptions.output.manualChunks` in `vite.config.ts`
  - Consider lazy loading for routes
  - **File:** `vite.config.ts`

#### 35. **Browserslist Update**
- **Issue:** Browserslist data is 15 months old
- **Fix:** Run `npx update-browserslist-db@latest`
- **Command:** `npm run update-browserslist` (add to package.json scripts)

---

## 📝 Additional Recommendations

### Testing

#### 36. **Expand Test Coverage**
- **Current:** 1 test (BusinessCard component)
- **Recommendation:** Add tests for:
  - Form validation
  - API integration
  - User authentication flows
  - Business CRUD operations
  - Search functionality

### Code Organization

#### 37. **Type Definitions**
- **Recommendation:** Create a centralized types file for database entities
- **Location:** `src/types/` or update `src/integrations/supabase/types.ts`
- **Include:** Business, Review, User, Contact, etc.

#### 38. **Error Handling**
- **Recommendation:** Create a consistent error handling utility
- **Location:** `src/lib/errors.ts`
- **Purpose:** Standardize error types and handling across the application

---

## ✅ Completed Tasks

- [x] Fixed Jest test configuration (React production build issue)
- [x] Tests are now passing

---

## 📋 Task Priority

### 🔴 Critical (Do First)
- Replace all `any` types with proper TypeScript types (Issues 1-15)
- Fix empty interface types (Issues 16-17)
- Fix import style in tailwind.config.ts (Issue 18)

### ⚠️ Important (Do Soon)
- Fix React Hooks dependency warnings (Issues 19-22)
- Implement code-splitting for bundle optimization (Issue 34)

### 💡 Nice to Have (Do When Time Permits)
- Address Fast Refresh warnings (Issues 23-33)
- Update browserslist (Issue 35)
- Expand test coverage (Issue 36)
- Improve code organization (Issues 37-38)

---

## 📌 Notes

- All linting errors are non-blocking - the application builds and runs successfully
- TypeScript `any` types reduce type safety and should be prioritized
- React Hooks warnings can lead to bugs if dependencies change
- Performance optimizations will improve user experience, especially on slower connections

---

**Last Updated:** January 10, 2025
