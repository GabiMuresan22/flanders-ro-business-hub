# Analytics Setup Guide

## Overview

This project includes GDPR-compliant analytics that only load when users give consent. The analytics are managed through the `Analytics` component which listens to cookie preferences.

## Current Configuration

### Google Analytics 4 (GA4)

- **Measurement ID:** `G-H8JZ4G2QE3`
- **Category:** Analytics Cookies
- **Status:** ✅ Configured

### Facebook Pixel

- **Pixel ID:** Not yet configured
- **Category:** Marketing Cookies
- **Status:** ⚠️ Needs configuration

## Setup Instructions

### 1. Google Analytics (Already Configured)

The Google Analytics ID `G-H8JZ4G2QE3` is already set in `src/components/Analytics.tsx`.

**Features:**

- Only loads when user accepts "Analytics Cookies"
- Automatically removes when user revokes consent
- GDPR compliant with IP anonymization enabled
- Personalized ads disabled by default

### 2. Facebook Pixel (To Be Configured)

To add your Facebook Pixel ID:

**Option 1: Environment Variable (Recommended)**

1. Add to your `.env` file:

   ```env
   VITE_FB_PIXEL_ID=your_facebook_pixel_id_here
   ```

2. The Analytics component will automatically use it.

**Option 2: Direct Configuration**

1. Open `src/components/Analytics.tsx`
2. Find the line: `const FB_PIXEL_ID = process.env.VITE_FB_PIXEL_ID || '';`
3. Replace with: `const FB_PIXEL_ID = 'your_facebook_pixel_id_here';`

**To get your Facebook Pixel ID:**

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Select your Pixel or create a new one
3. Copy the Pixel ID (it's a long number, e.g., `123456789012345`)

## How It Works

### Cookie Consent Flow

1. **User visits site** → Cookie consent banner appears
2. **User makes choice:**

   - **Accept All** → Analytics + Marketing cookies enabled
   - **Reject Non-Essential** → Only essential cookies
   - **Customize** → User chooses specific categories

3. **Analytics component:**
   - Monitors cookie preferences in localStorage
   - Loads scripts only when consent is given
   - Removes scripts when consent is revoked

### Cookie Categories

- **Essential Cookies** (Always enabled)

  - Required for website functionality
  - Authentication, security, etc.

- **Analytics Cookies** (User consent required)

  - Google Analytics 4
  - Helps understand visitor behavior

- **Marketing Cookies** (User consent required)
  - Facebook Pixel
  - Used for advertising and retargeting

## Testing

### Test Analytics Loading

1. **Open browser DevTools** → Network tab
2. **Clear localStorage:** `localStorage.removeItem('cookieConsent')`
3. **Refresh page** → Cookie banner should appear
4. **Accept Analytics cookies** → Check Network tab for:
   - `googletagmanager.com/gtag/js` request
   - Google Analytics should be loaded

### Test Facebook Pixel Loading

1. **Set Facebook Pixel ID** (see setup above)
2. **Clear localStorage:** `localStorage.removeItem('cookieConsent')`
3. **Refresh page** → Cookie banner appears
4. **Accept Marketing cookies** → Check Network tab for:
   - `connect.facebook.net/en_US/fbevents.js` request
   - Facebook Pixel should be loaded

### Test Consent Revocation

1. **Open browser console**
2. **Revoke consent:**
   ```javascript
   localStorage.setItem(
     "cookieConsent",
     JSON.stringify({
       essential: true,
       analytics: false,
       marketing: false,
     })
   );
   window.dispatchEvent(new Event("cookieConsentUpdated"));
   ```
3. **Check Network tab** → Analytics scripts should be removed

## Verification

### Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to your property (G-H8JZ4G2QE3)
3. Go to **Realtime** reports
4. Visit your website and accept analytics cookies
5. You should see your visit appear in real-time

### Facebook Pixel

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Select your Pixel
3. Go to **Test Events** tab
4. Visit your website and accept marketing cookies
5. You should see events appear in the test events feed

## Privacy Compliance

✅ **GDPR Compliant:**

- Scripts only load with explicit consent
- Users can revoke consent at any time
- IP anonymization enabled for GA4
- No tracking without consent

✅ **Cookie Consent Banner:**

- Clear explanation of cookie types
- Granular control (accept/reject by category)
- Link to Privacy Policy
- Persistent preference storage

## Troubleshooting

### Why Google Analytics Might Not Load

#### 1. Strict Cookie Consent (Most Likely)

Your app is GDPR-compliant: **GA does not load by default**. It only loads after the user accepts analytics.

- **Code:** In `src/components/Analytics.tsx`, `getCookiePreferences()` defaults to `analytics: false`.
- **Effect:** If the user ignores the banner, closes it without accepting, or clicks **Reject**, the GA script is never injected.

**How to test:**

1. Open the site in a **new Incognito/Private window** (to reset previous choices).
2. When the banner appears, click **Accept All** or **Customize** and enable **Analytics Cookies**.
3. Only then will the script load.

#### 2. Ad Blockers (Developer Pitfall)

If you test on a machine with an ad blocker (uBlock Origin, AdBlock Plus, Brave, etc.), requests to `googletagmanager.com` and `google-analytics.com` are often blocked.

- **Your code:** Logs this with: `console.error('[Analytics] Failed to load Google Analytics - possibly blocked by ad blocker')`.
- **Fix:** Disable the ad blocker for your localhost or test domain, or use a clean browser profile.

#### 3. Realtime vs Standard Reports

- **Standard reports:** Can take **24–48 hours** to process. A new property will look empty at first.
- **Realtime report:** Use this to verify right after setup.
  - In Google Analytics: **Reports → Realtime**.
  - Visit your site (after accepting cookies). You should see activity within ~30 seconds.

#### 4. Verify the Script Is Loading

**Cookie consent in Console:**

```javascript
localStorage.getItem('cookieConsent')
```

- `null` → No choice yet. GA won’t load.
- `{"analytics":false,...}` → Analytics rejected. GA won’t load.
- `{"analytics":true,...}` → Analytics accepted. GA should load.

**Network tab:**

1. DevTools → **Network**.
2. Filter by **Fetch/XHR** or **JS**.
3. Search for **collect**.
4. If you see requests to `google-analytics.com/g/collect`, data is being sent.

#### 5. Content Security Policy (CSP)

If the Console shows: *Content Security Policy: The page’s settings blocked the loading of a resource...*, the CSP is blocking Google.

- **Check:** `vercel.json` (and `public/_headers` if used) must allow:
  - **script-src:** `https://www.googletagmanager.com`
  - **connect-src:** `https://www.google-analytics.com`, `https://*.google-analytics.com`, `https://*.analytics.google.com`, `https://*.googletagmanager.com`
- **Status:** These are already set in this project’s `vercel.json`. Redeploy after any header changes.

---

### No data in Google Analytics

1. **Cookie consent not given** – See “Strict Cookie Consent” above. Test: clear `localStorage` → refresh → **Accept All** → check **Realtime**.
2. **CSP blocking Google** – See “Content Security Policy” above. Headers are configured in `vercel.json`.
3. **Wrong GA4 property** – Measurement ID in code is `G-H8JZ4G2QE3`. In GA, confirm you’re in the property that uses this ID (Admin → Data Streams → your web stream).
4. **Reporting delay** – Use **Realtime** for immediate checks; standard reports can take 24–48 hours.

### Analytics Not Loading – Quick Checks

1. **Cookie consent:** `console.log(localStorage.getItem("cookieConsent"))` – need `analytics: true`.
2. **Scripts in DOM:** DevTools → Elements → search for `googletagmanager` or `facebook.net`.
3. **Console:** Look for CSP or other red errors.
4. **Network:** After accepting analytics, look for `googletagmanager.com/gtag/js` and `google-analytics.com/g/collect`.

### Facebook Pixel Not Working

1. **Verify Pixel ID is set:**

   - Check `.env` file has `VITE_FB_PIXEL_ID`
   - Or check `Analytics.tsx` has the ID directly

2. **Check if marketing cookies are accepted:**

   ```javascript
   const consent = JSON.parse(localStorage.getItem("cookieConsent") || "{}");
   console.log("Marketing:", consent.marketing);
   ```

3. **Use Facebook Pixel Helper browser extension** to debug

## Files

- `src/components/Analytics.tsx` - Main analytics component
- `src/components/CookieConsent.tsx` - Cookie consent banner
- `src/App.tsx` - App root (includes Analytics component)

## Support

For issues or questions:

- Check browser console for errors
- Verify environment variables are set correctly
- Ensure cookie consent is working properly
- Test in incognito mode to simulate new users
