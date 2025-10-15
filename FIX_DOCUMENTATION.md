# Business Submission Error - Fix Documentation

## Issue
Users were experiencing an error when trying to add a new business through the Add Business page.

## Root Cause
The error was caused by a mismatch between the Row Level Security (RLS) policy and the application code:

1. **RLS Policy Requirement**: The `businesses` table has an INSERT policy with `WITH CHECK (status = 'pending')`
2. **Original Code Behavior**: The insert statement did not explicitly set the `status` field, relying on the database default value
3. **Why This Caused Failure**: RLS policies evaluate the data **before** database defaults are applied. Without an explicit `status` value in the INSERT, the policy saw `status = NULL`, which failed the `WITH CHECK (status = 'pending')` condition.

## The Fix
Modified `src/pages/AddBusinessPage.tsx` to explicitly include `status: 'pending'` in the insert payload:

```typescript
const { data, error } = await supabase
  .from('businesses')
  .insert({
    business_name: values.businessName,
    owner_name: values.ownerName,
    email: values.email,
    phone: values.phone,
    address: values.address,
    city: values.city,
    postal_code: values.postalCode,
    description: values.description,
    category: values.category,
    website: values.website || null,
    status: 'pending'  // ← This is the critical fix
  })
  .select()
  .single();
```

## Why This Works
By explicitly setting `status: 'pending'` in the INSERT statement:
- The RLS policy `WITH CHECK (status = 'pending')` is now satisfied
- The check happens **before** the data is inserted
- The business submission now succeeds

## Testing
Created `test-business-insert.mjs` to verify the fix:
- ✅ Confirms the insert payload includes `status: 'pending'`
- ✅ Verifies all required fields are present
- ✅ Ensures the RLS policy requirements are met

Run the test with:
```bash
node test-business-insert.mjs
```

## Migration Files Reference
The RLS policy is defined in:
- `supabase/migrations/20251015115355_8927a07f-0a61-4628-8831-1fda9dd1dbde.sql`

```sql
CREATE POLICY "Anyone can submit a business"
ON public.businesses
FOR INSERT
WITH CHECK (status = 'pending');
```

## Impact
- ✅ Business submissions now work correctly
- ✅ No changes to validation logic required
- ✅ Minimal code change (one line added)
- ✅ All existing tests continue to pass
- ✅ Application builds successfully

## Related Files
- `src/pages/AddBusinessPage.tsx` - Fixed the insert statement
- `test-business-insert.mjs` - New test to verify the fix
- `supabase/migrations/20251015115355_8927a07f-0a61-4628-8831-1fda9dd1dbde.sql` - RLS policy definition
