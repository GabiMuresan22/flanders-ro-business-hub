# Testing the Add Business Feature

This document describes how to test the Add Business functionality.

## Overview

The Add Business feature allows users to submit their Romanian-owned businesses to the directory. The form includes validation and saves submissions to Supabase with a "pending" status for review.

## Prerequisites

1. Ensure dependencies are installed: `npm install`
2. Ensure Supabase is properly configured (see `src/integrations/supabase/client.ts`)
3. Database migration has been applied (see `supabase/migrations/20250101000000_create_businesses_table.sql`)

## Manual Testing Steps

### Test 1: Form Validation

1. Navigate to `/add-business`
2. Try to submit the form without filling any fields
3. **Expected**: Form should show validation errors for all required fields

### Test 2: Field-Specific Validation

Test each field validation:

- **Business Name**: Should require at least 2 characters
- **Owner Name**: Should require at least 2 characters
- **Email**: Should validate email format (test@example.com)
- **Phone**: Should require at least 9 characters
- **Address**: Should require at least 5 characters
- **City**: Should require at least 2 characters
- **Postal Code**: Should require at least 4 characters
- **Description**: Should require at least 10 characters
- **Category**: Should require selection from dropdown
- **Website**: Optional, but if provided must be valid URL format
- **Terms Checkbox**: Must be checked to submit

### Test 3: Successful Submission

1. Fill out the form with valid data:
   - Business Name: "Test Romanian Restaurant"
   - Owner Name: "Ion Popescu"
   - Email: "test@romanianrestaurant.com"
   - Phone: "+32 470 123 456"
   - Address: "Markt 15"
   - City: "Bruges"
   - Postal Code: "8000"
   - Category: "Restaurant & Food"
   - Website: "https://example.com" (optional)
   - Description: "We are a traditional Romanian restaurant in the heart of Bruges, serving authentic Romanian cuisine with a modern twist. Our specialties include sarmale, mici, and traditional desserts."
   - Check the terms checkbox

2. Click "Submit Business"
3. **Expected**: 
   - A success toast notification appears: "Business submission received!"
   - The form is reset to empty values
   - The data is saved to Supabase with status "pending"

### Test 4: Error Handling

1. Test with Supabase connection issues (disconnect network)
2. Fill out and submit the form
3. **Expected**: Error toast appears: "Submission failed - There was an error submitting your business. Please try again."

### Test 5: Verify Database Entry

After a successful submission, verify in Supabase:

```sql
SELECT * FROM businesses WHERE email = 'test@romanianrestaurant.com';
```

**Expected fields in database:**
- `id`: UUID (auto-generated)
- `business_name`: "Test Romanian Restaurant"
- `owner_name`: "Ion Popescu"
- `email`: "test@romanianrestaurant.com"
- `phone`: "+32 470 123 456"
- `address`: "Markt 15"
- `city`: "Bruges"
- `postal_code`: "8000"
- `description`: Full description text
- `category`: "Restaurant & Food"
- `website`: "https://example.com" or null
- `status`: "pending"
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Test 6: Submit Button State

1. Fill out the form with valid data
2. Click "Submit Business"
3. **Expected**: 
   - Button text changes to "Submitting..." during submission
   - Button is disabled during submission
   - Button returns to "Submit Business" after completion

## Security Testing

### Test 7: Row Level Security

Verify that RLS policies are working:

1. Anonymous users can insert (submit) businesses ✓
2. Anonymous users can only read businesses with status "approved" ✓
3. Submitted businesses default to "pending" status ✓

## Integration Points

The Add Business feature integrates with:

1. **Supabase Database**: Stores business submissions
2. **React Hook Form**: Manages form state and validation
3. **Zod**: Schema validation
4. **Toast Notifications**: User feedback
5. **shadcn/ui Components**: Form UI components

## Test Results

| Test Case | Status | Notes |
|-----------|--------|-------|
| Form Validation | ✓ | All required fields validated |
| Field-Specific Validation | ✓ | Each field validates correctly |
| Successful Submission | ✓ | Data saves to Supabase |
| Error Handling | ✓ | Errors displayed to user |
| Database Entry | ✓ | Data stored correctly |
| Submit Button State | ✓ | Button states work correctly |
| Row Level Security | ✓ | RLS policies enforced |

## Notes

- Form uses controlled components with React Hook Form
- Validation is performed both client-side (Zod) and database-side
- All submissions start with "pending" status for admin review
- Email notifications could be added in future iterations
- Consider adding image upload for business logo
