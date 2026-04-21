import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics 4 - controlled by Cookiebot CMP via Consent Mode v2.
 *
 * - index.html sets default consent to "denied" before any script.
 * - Cookiebot loads gtag.js only after the user grants statistics consent
 *   (the gtag.js tag is marked data-cookieconsent="statistics" type="text/plain"
 *   and Cookiebot rewrites it to a real script once allowed).
 * - This component only forwards SPA route changes to gtag; whether the
 *   event actually fires is decided by Cookiebot/Consent Mode.
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-H8JZ4G2QE3';
const DEBUG = import.meta.env.DEV;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

export const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
    if (DEBUG) console.log('[Analytics] page_view', location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
};

/** Send a custom event to GA4. Cookiebot/Consent Mode decides whether it actually fires. */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, eventParams);
  if (DEBUG) console.log('[Analytics] event', eventName, eventParams);
};

export const trackContactClick = (method: 'phone' | 'email' | 'website') => {
  trackEvent('contact_click', {
    event_category: 'engagement',
    event_label: `Contact via ${method}`,
    contact_method: method,
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', {
    event_category: 'engagement',
    event_label: `Changed to ${language}`,
    language,
  });
};

export const trackAddBusinessClick = (source: string) => {
  trackEvent('add_business_click', {
    event_category: 'engagement',
    event_label: source,
  });
};
