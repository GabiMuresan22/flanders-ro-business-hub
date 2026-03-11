# How to fix website URLs in the database

Use **Option A** to fix all Facebook/Instagram links in one go. Use **Option B** to change only specific businesses by hand.

---

## Option A: Run the migration (fix all at once)

This updates every business that has a Facebook or Instagram URL so links open correctly (no `ERR_BLOCKED_BY_RESPONSE`).

### Steps

1. **Open Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Log in and select your **Flanders Ro Business** project

2. **Open the SQL Editor**
   - In the left sidebar, click **SQL Editor**
   - Click **New query**

3. **Paste the migration**
   - Open this file in your project:  
     `supabase/migrations/20250208140000_normalize_business_website_urls.sql`
   - Select all (Ctrl+A), copy (Ctrl+C)
   - Paste into the SQL Editor (Ctrl+V)

4. **Run it**
   - Click **Run** (or press Ctrl+Enter)
   - Wait until it says the query finished (e.g. “Success. No rows returned” or “Success. X rows affected”)

5. **Check the result**
   - In the left sidebar, go to **Table Editor**
   - Open the **businesses** table
   - Look at the **website** column: Facebook/Instagram URLs should now look like `https://www.facebook.com/...` or `https://www.instagram.com/...`

Done. All existing website URLs in the database are normalized.

---

## Option B: Edit specific businesses in the dashboard

Use this when you only want to change a few businesses (e.g. replace a wrong link with the correct Facebook or Instagram page).

### Steps

1. **Open Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Log in and select your **Flanders Ro Business** project

2. **Open the businesses table**
   - In the left sidebar, click **Table Editor**
   - Click the **businesses** table

3. **Find the business**
   - Use the search/filter at the top if needed
   - Scroll until you see the row you want to change

4. **Edit the website**
   - Click the cell in the **website** column for that row
   - Change the value to the correct URL, for example:
     - Facebook page: `https://www.facebook.com/YourPageName`
     - Instagram: `https://www.instagram.com/yourusername`
   - Press **Enter** or click outside the cell to save

5. **Repeat**
   - Do the same for any other businesses you want to fix

---

## Option C: Edit via your app (admin)

If you use the admin dashboard in your app:

1. Log in as admin and go to the admin dashboard.
2. Find the business you want to change.
3. Open the edit flow for that business (e.g. “Edit”).
4. Update the **Website** field with the correct URL (e.g. `https://www.facebook.com/PageName`).
5. Save.

The app will update the `website` column in the database.

---

## Summary

| Goal | Use |
|------|-----|
| Fix all Facebook/Instagram links in the DB at once | **Option A** (run the migration in SQL Editor) |
| Change only a few businesses by hand | **Option B** (Table Editor) |
| Change a business from the app | **Option C** (admin edit) |

If anything in these steps doesn’t match what you see (e.g. different menu names), tell me what you see and we can adjust the steps.
