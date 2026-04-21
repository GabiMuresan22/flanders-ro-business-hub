export const openCookiePreferences = () => {
  window.Cookiebot?.show();
};

// Cookiebot renders the banner from index.html, so the legacy React banner is now a no-op.
export const CookieConsent = () => null;
