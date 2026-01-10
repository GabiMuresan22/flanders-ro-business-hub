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

### Analytics Not Loading

1. **Check cookie consent:**

   ```javascript
   console.log(localStorage.getItem("cookieConsent"));
   ```

2. **Check if scripts are in DOM:**

   - Open DevTools → Elements tab
   - Search for `googletagmanager` or `facebook.net`

3. **Check browser console for errors**

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
