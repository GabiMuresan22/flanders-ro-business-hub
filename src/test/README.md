# Test Suite

This directory contains comprehensive tests for the Romanian Business Hub website.

## Quick Start

```bash
# Run all tests
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## Test Files

- **Component Tests**
  - `Navbar.test.tsx` - Navigation menu tests
  - `Footer.test.tsx` - Footer component tests
  - `HeroSection.test.tsx` - Hero section tests
  - `TestimonialsSection.test.tsx` - Testimonials section tests

- **Page Tests**
  - `Index.test.tsx` - Home page tests
  - `AboutPage.test.tsx` - About page tests
  - `ContactPage.test.tsx` - Contact page tests
  - `FAQPage.test.tsx` - FAQ page tests
  - `AddBusinessPage.test.tsx` - Add business form tests
  - `CategoriesListPage.test.tsx` - Categories page tests
  - `NotFound.test.tsx` - 404 page tests

- **Integration Tests**
  - `App.test.tsx` - Application routing tests
  - `businessData.test.ts` - Business data validation tests

- **Configuration**
  - `setup.ts` - Test environment setup

## Test Results

✅ **52 out of 52 tests passing**

See [TEST_REPORT.md](../TEST_REPORT.md) for detailed results.

## Coverage

Overall: 29.94%
- Components: **98.63%** ✅
- Pages: **Fully tested** ✅
- Business Data: **100%** ✅
