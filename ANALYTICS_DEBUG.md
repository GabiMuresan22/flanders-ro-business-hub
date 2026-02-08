# Google Analytics – Why It’s Not Working (Debug Guide)

Analytics only runs **after** the user accepts **Analytics cookies** in the cookie banner. If the banner was dismissed with "Reject non-essential", GA never loads.

---

## 1. Check consent (most common)

- Open DevTools → **Console**.
- Run:
  ```js
  JSON.parse(localStorage.getItem("cookieConsent") || "{}");
  ```
- You must see `"analytics": true`. If you see `"analytics": false`, GA will not load.
- **Fix:** Click "Accept all" in the cookie banner, or clear `localStorage` and reload so the banner appears again, then accept analytics.

---

## 2. Development console messages

When running `npm run dev`:

- **"Loading GA4"** and **"GA script loaded OK"** → Script loaded; check Network and GA Realtime next.
- **"Page view skipped: no analytics consent"** → Consent is false; fix consent (step 1).
- **"GA script failed to load (e.g. ad blocker or network)"** → Script was blocked; disable ad blocker or check network (step 3).

---

## 3. Ad blockers and privacy extensions

Extensions like uBlock Origin, AdBlock, Brave Shields, Privacy Badger often block:

- `googletagmanager.com`
- `google-analytics.com`

**Check:** DevTools → **Network** → reload and accept analytics. Filter by "gtag" or "google".

- If there is **no** request to `googletagmanager.com/gtag/js?id=G-...`, the script was blocked.
- **Fix:** Disable the blocker for your site (or use a clean profile) when testing.

---

## 4. Confirm requests are sent

After accepting analytics:

- **Network** tab: filter by `google-analytics.com` or `g/collect`. You should see requests when you change pages.
- **GA Realtime:** [Google Analytics](https://analytics.google.com/) → your property → **Reports → Realtime**. You should see yourself as an active user within a few seconds.

If consent is OK and there are no blocks but you still don’t see requests, check the next steps.

---

## 5. Measurement ID

- Add your Measurement ID to `.env`: `VITE_GA_ID=G-XXXXXXXXXX` (see `.env.example`).
- If unset, code falls back to `G-H8JZ4G2QE3`. Restart the dev server after changing `.env`.
- In GA: **Admin → Data streams** → your web stream → the ID must match.

---

## 6. Quick checklist

| Check          | What to do                                                                    |
| -------------- | ----------------------------------------------------------------------------- |
| Consent        | `localStorage.cookieConsent` has `"analytics": true`                          |
| Banner         | If you rejected before, clear site data or use incognito and accept analytics |
| Ad blocker     | Disable for localhost / your domain when testing                              |
| Network        | See `googletagmanager.com/gtag/js` and `google-analytics.com/g/collect`       |
| GA Realtime    | See yourself in Realtime after accepting and navigating                       |
| Measurement ID | Same in code/env and in GA4 Data streams                                      |

---

## 7. Code reference

- **index.html** – Base gtag library (dataLayer + gtag stub). No config here; tracking only when consent is true.
- **.env** – Set `VITE_GA_ID=G-XXXXXXXXXX` (copy from `.env.example`).
- **Component:** `src/components/Analytics.tsx` – Reads `localStorage.cookieConsent`; if `analytics` is true, loads gtag/js and initializes. Uses `useGaRouteTracking` (useLocation) to report route changes to GA.
- **Consent:** `src/components/CookieConsent.tsx` – Writes `cookieConsent` to `localStorage` and dispatches `cookieConsentUpdated`.
- **App:** `src/App.tsx` – Renders `<Analytics />` inside `BrowserRouter`.
