import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-H8JZ4G2QE3';

// Facebook Pixel ID - Replace with your actual Pixel ID when available
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '';

/**
 * GDPR-compliant Analytics component
 * Only loads analytics scripts when user has given consent
 */
export const Analytics = () => {
  const location = useLocation();
  const gaLoadedRef = useRef(false);
  const fbLoadedRef = useRef(false);

  // Get cookie preferences from localStorage
  const getCookiePreferences = (): CookiePreferences => {
    try {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        return JSON.parse(consent) as CookiePreferences;
      }
    } catch (error) {
      if (import.meta.env.DEV) console.error('Error reading cookie preferences:', error);
    }
    // Default: only essential cookies
    return {
      essential: true,
      analytics: false,
      marketing: false,
    };
  };

  // Load Google Analytics 4 (GA4)
  const loadGoogleAnalytics = () => {
    if (gaLoadedRef.current) return;

    // Load gtag.js script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    (window as { gtag?: typeof gtag }).gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // GDPR compliance
      allow_google_signals: false, // Disable personalized ads by default
    });

    gaLoadedRef.current = true;
  };

  // Remove Google Analytics
  const removeGoogleAnalytics = () => {
    // Remove gtag script
    const scripts = document.querySelectorAll(
      `script[src*="googletagmanager.com/gtag/js"]`
    );
    scripts.forEach((script) => script.remove());

    // Clear dataLayer
    if (window.dataLayer) {
      window.dataLayer = [];
    }

    // Remove gtag function
    delete (window as { gtag?: unknown }).gtag;

    gaLoadedRef.current = false;
  };

  // Load Facebook Pixel
  const loadFacebookPixel = () => {
    if (fbLoadedRef.current || !FB_PIXEL_ID) return;

    // Load Facebook Pixel script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    // Initialize fbq function
    interface FbqFunction {
      (...args: unknown[]): void;
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      loaded: boolean;
      version: string;
      push: (...args: unknown[]) => void;
    }

    const fbq: FbqFunction = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as FbqFunction;

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];

    window.fbq = fbq;
    window._fbq = fbq;

    // Initialize Facebook Pixel after script loads
    script.onload = () => {
      window.fbq?.('init', FB_PIXEL_ID);
      window.fbq?.('track', 'PageView');
    };

    fbLoadedRef.current = true;
  };

  // Remove Facebook Pixel
  const removeFacebookPixel = () => {
    // Remove Facebook Pixel script
    const scripts = document.querySelectorAll(
      'script[src*="connect.facebook.net/en_US/fbevents.js"]'
    );
    scripts.forEach((script) => script.remove());

    // Clear fbq function
    delete (window as { fbq?: unknown }).fbq;

    fbLoadedRef.current = false;
  };

  // Handle cookie preference changes
  useEffect(() => {
    const checkAndUpdateAnalytics = () => {
      const preferences = getCookiePreferences();

      // Google Analytics (Analytics cookies)
      if (preferences.analytics) {
        loadGoogleAnalytics();
      } else {
        removeGoogleAnalytics();
      }

      // Facebook Pixel (Marketing cookies)
      if (preferences.marketing && FB_PIXEL_ID) {
        loadFacebookPixel();
      } else {
        removeFacebookPixel();
      }
    };

    // Check on mount
    checkAndUpdateAnalytics();

    // Listen for storage changes (when user updates preferences)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookieConsent') {
        checkAndUpdateAnalytics();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom event (for same-tab updates)
    const handleCustomStorageChange = () => {
      checkAndUpdateAnalytics();
    };

    // Custom event listener for same-tab updates
    window.addEventListener('cookieConsentUpdated', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cookieConsentUpdated', handleCustomStorageChange);
    };
  }, []);

  // Track page views on route changes
  useEffect(() => {
    const preferences = getCookiePreferences();

    // Track page view in Google Analytics
    if (preferences.analytics && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }

    // Track page view in Facebook Pixel
    if (preferences.marketing && FB_PIXEL_ID && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname, location.search]);

  // This component doesn't render anything
  return null;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}
