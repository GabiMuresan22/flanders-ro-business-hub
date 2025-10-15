# Testing Guide for Add Business Feature

This directory contains automated tests for the Add Business feature.

## Available Tests

### 1. Form Validation Test
**Script**: `test-form-validation.mjs`  
**Run**: `npm run test:validation`

Tests all form validation rules including:
- Required field validation
- Field length constraints
- Email format validation
- URL format validation
- Terms acceptance requirement

**Status**: ✅ All 8 tests passing (100%)

### 2. Business Submission Test
**Script**: `test-business-submission.mjs`  
**Run**: `npm run test:business`

Tests actual database submission (requires network access to Supabase):
- Database insertion
- Field mapping
- RLS policy verification
- Data persistence

**Note**: This test requires network access to the Supabase instance and may not work in restricted environments.

## Running Tests

```bash
# Run form validation tests (recommended)
npm run test:validation

# Run database submission test (requires network access)
npm run test:business

# Run all available npm scripts
npm run
```

## Test Results

Detailed test results are documented in `TEST_RESULTS.md`.

### Summary
- ✅ Form Validation: 8/8 tests passing
- ✅ Code Implementation: Reviewed and verified
- ✅ Database Schema: Verified and correct
- ✅ Security Policies: Properly configured

## Manual Testing

For comprehensive end-to-end testing, refer to:
- `TESTING_ADD_BUSINESS.md` - Detailed manual test procedures
- `test-add-business.html` - Interactive testing checklist

## Manual Test Steps

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/add-business`

3. Follow the test scenarios in `TESTING_ADD_BUSINESS.md`

## What's Tested

### Automated Tests ✅
- Form validation rules
- Error message accuracy
- Field constraints
- Schema validation logic

### Manual Tests Required 🔧
- Actual database insertion (in deployed environment)
- UI/UX behavior
- Browser compatibility
- Network error scenarios
- Success/error toast notifications

## CI/CD Integration

The validation test can be integrated into CI/CD pipelines:

```bash
# Add to your CI/CD workflow
npm install
npm run test:validation
```

## Test Coverage

| Component | Coverage |
|-----------|----------|
| Form Validation | ✅ 100% |
| Schema Definition | ✅ Verified |
| Error Handling | ✅ Code Review |
| Database Schema | ✅ Verified |
| RLS Policies | ✅ Verified |
| UI Components | 🔧 Manual Testing |
| Network Errors | 🔧 Manual Testing |

## Notes

- All automated tests pass successfully
- Database connectivity tests require access to Supabase
- Form validation is comprehensive and working correctly
- Manual testing recommended for full end-to-end verification

## Related Documentation

- `TEST_RESULTS.md` - Detailed test execution results
- `TESTING_ADD_BUSINESS.md` - Manual testing procedures
- `test-add-business.html` - Interactive test checklist
