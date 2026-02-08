import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

// Set VITE_GA_ID in .env (e.g. VITE_GA_ID=G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-H8JZ4G2QE3';

const DEBUG = import.meta.env.DEV;

function getCookiePreferences(): CookiePreferences {
  try {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      return JSON.parse(consent) as CookiePreferences;
    }
  } catch (error) {
    if (DEBUG) console.error('[Analytics] Error reading cookie preferences:', error);
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

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

/**
 * Global hook: report route changes to Google Analytics when path changes.
 * Call only when GA is initialized (consent given) and gtag is available.
 */
function useGaRouteTracking(measurementId: string) {
  const location = useLocation();

  useEffect(() => {
    if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') return;

    window.gtag('config', measurementId, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
    if (DEBUG) console.log('[Analytics] page_view', { path: location.pathname + location.search });
  }, [measurementId, location.pathname, location.search]);
}

/**
 * GDPR-compliant Google Analytics 4.
 * - index.html provides the base gtag stub (dataLayer + gtag).
 * - When cookieConsent.analytics is true, we load the gtag/js script and initialize tracking.
 * - useGaRouteTracking reports each route change to GA.
 */
export const Analytics = () => {
  const loadedRef = useRef(false);
  const measurementId = GA_MEASUREMENT_ID;

  // Initialize GA when consent is given: load script and first config
  const initTracking = () => {
    const existing = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
    if (existing) {
      loadedRef.current = true;
      if (DEBUG) console.log('[Analytics] GA script already present');
      return;
    }
    if (loadedRef.current) return;

    if (DEBUG) {
      console.log('[Analytics] Initializing GA4', { measurementId, consent: getCookiePreferences() });
    }

    // gtag stub already exists from index.html
    if (typeof window.gtag !== 'function') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      };
    }

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.onload = () => {
      if (DEBUG) console.log('[Analytics] GA script loaded OK');
      loadedRef.current = true;
    };
    script.onerror = () => {
      console.error('[Analytics] GA script failed to load (e.g. ad blocker or network)');
      loadedRef.current = false;
    };
    document.head.appendChild(script);
  };

  const removeTracking = () => {
    document.querySelectorAll(`script[src*="googletagmanager.com/gtag/js"]`).forEach((s) => s.remove());
    if (window.dataLayer) window.dataLayer = [];
    delete window.gtag;
    loadedRef.current = false;
    if (DEBUG) console.log('[Analytics] GA removed (consent revoked)');
  };

  // Check localStorage cookieConsent and init or remove GA
  useEffect(() => {
    const sync = () => {
      const prefs = getCookiePreferences();
      if (prefs.analytics) initTracking();
      else removeTracking();
    };

    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cookieConsent') sync();
    };
    const onConsent = () => sync();

    window.addEventListener('storage', onStorage);
    window.addEventListener('cookieConsentUpdated', onConsent);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cookieConsentUpdated', onConsent);
    };
  }, []);

  // Report route changes to GA whenever path changes
  useGaRouteTracking(measurementId);

  return null;
};
