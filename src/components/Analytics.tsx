import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

// Google tag (gtag.js) - Official snippet: https://www.googletagmanager.com/gtag/js?id=G-H8JZ4G2QE3
// Loaded only after analytics consent (GDPR). Same ID and config as the standard gtag snippet.
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-H8JZ4G2QE3';

// Facebook Pixel ID
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '';

function getMeasurementId(): string {
  return GA_MEASUREMENT_ID;
}

// Get cookie preferences from localStorage (your site's consent, not vanilla-cookieconsent)
function getCookiePreferences(): CookiePreferences {
  try {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      return JSON.parse(consent) as CookiePreferences;
    }
  } catch (error) {
    if (import.meta.env.DEV) console.error('Error reading cookie preferences:', error);
  }
  return {
    essential: true,
    analytics: false,
    marketing: false,
  };
}

function hasAnalyticsConsent(): boolean {
  return getCookiePreferences().analytics === true;
}

/**
 * GDPR-compliant Analytics component
 * Loads GA script only when user has given consent; tracks page views on route change
 */
export const Analytics = () => {
  const location = useLocation();
  const gaLoadedRef = useRef(false);
  const fbLoadedRef = useRef(false);
  const measurementId = getMeasurementId();

  // Load Google Analytics 4 (GA4)
  const loadGoogleAnalytics = () => {
    const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
    if (existingScript) {
      gaLoadedRef.current = true;
      return;
    }
    if (gaLoadedRef.current) return;

    if (import.meta.env.DEV) {
      console.log('[Analytics] Loading Google Analytics with ID:', measurementId);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    (window as Window & { gtag: typeof gtag }).gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
    });

    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script1.onload = () => {
      if (import.meta.env.DEV) console.log('[Analytics] Google Analytics script loaded successfully');
    };
    script1.onerror = () => {
      console.error('[Analytics] Failed to load Google Analytics - possibly blocked by ad blocker');
    };
    document.head.appendChild(script1);
    gaLoadedRef.current = true;
  };

  const removeGoogleAnalytics = () => {
    document.querySelectorAll(`script[src*="googletagmanager.com/gtag/js"]`).forEach((s) => s.remove());
    if (window.dataLayer) window.dataLayer = [];
    delete (window as Window & { gtag?: unknown }).gtag;
    gaLoadedRef.current = false;
  };

  // Facebook Pixel
  const loadFacebookPixel = () => {
    if (fbLoadedRef.current || !FB_PIXEL_ID) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    type FbqFunction = ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: unknown;
    };
    const fbq: FbqFunction = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as FbqFunction;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    (window as unknown as { fbq: FbqFunction; _fbq: FbqFunction }).fbq = fbq;
    (window as unknown as { fbq: FbqFunction; _fbq: FbqFunction })._fbq = fbq;
    script.onload = () => {
      window.fbq?.('init', FB_PIXEL_ID);
      window.fbq?.('track', 'PageView');
    };
    fbLoadedRef.current = true;
  };

  const removeFacebookPixel = () => {
    document.querySelectorAll('script[src*="connect.facebook.net/en_US/fbevents.js"]').forEach((s) => s.remove());
    delete (window as Window & { fbq?: unknown }).fbq;
    fbLoadedRef.current = false;
  };

  // Handle consent: load/remove scripts
  useEffect(() => {
    const checkAndUpdateAnalytics = () => {
      const prefs = getCookiePreferences();
      if (prefs.analytics) loadGoogleAnalytics();
      else removeGoogleAnalytics();
      if (prefs.marketing && FB_PIXEL_ID) loadFacebookPixel();
      else removeFacebookPixel();
    };

    checkAndUpdateAnalytics();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cookieConsent') checkAndUpdateAnalytics();
    };
    const onConsentUpdated = () => checkAndUpdateAnalytics();

    window.addEventListener('storage', onStorage);
    window.addEventListener('cookieConsentUpdated', onConsentUpdated);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cookieConsentUpdated', onConsentUpdated);
    };
  }, []);

  // Track page views on route change (same pattern as your other site)
  useEffect(() => {
    if (!hasAnalyticsConsent() || typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', measurementId, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search, measurementId]);

  // Facebook Pixel page view on route change
  useEffect(() => {
    if (getCookiePreferences().marketing && FB_PIXEL_ID && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname, location.search]);

  return null;
};

/**
 * Send a custom event to GA4 (only if analytics consent given)
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  const measurementId = getMeasurementId();
  if (!measurementId || typeof window === 'undefined' || !window.gtag) return;
  if (!hasAnalyticsConsent()) return;

  window.gtag('event', eventName, eventParams);
};

// Predefined events for common actions (adapt labels for your site)
export const trackBusinessView = (businessName: string) => {
  trackEvent('view_item', {
    event_category: 'engagement',
    event_label: businessName,
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    event_category: 'engagement',
    event_label: `Changed to ${language}`,
    language,
  });
};

export const trackContactClick = (method: 'phone' | 'email' | 'website') => {
  trackEvent('contact_click', {
    event_category: 'engagement',
    event_label: `Contact via ${method}`,
    contact_method: method,
  });
};

export const trackSearch = (query: string) => {
  trackEvent('search', {
    event_category: 'engagement',
    search_term: query,
  });
};

export const trackAddBusinessClick = () => {
  trackEvent('add_business_click', {
    event_category: 'engagement',
    event_label: 'Add Business CTA',
  });
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}
