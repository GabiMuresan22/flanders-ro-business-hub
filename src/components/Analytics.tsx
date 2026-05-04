import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Google Analytics 4 - controlled by Cookiebot CMP via Consent Mode v2.
 *
 * - index.html sets default consent to "denied" before any script.
 * - tracking.js provides the gtag/dataLayer stub without needing inline JS.
 * - Cookiebot releases gtag.js only after statistics consent is granted.
 * - This component initializes GA once and only emits SPA tracking after
 *   Cookiebot reports statistics consent.
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || "G-H8JZ4G2QE3";
const DEBUG = import.meta.env.DEV;

function hasStatisticsConsent(): boolean {
  return window.Cookiebot?.consent?.statistics === true;
}

function canTrack(): boolean {
  return typeof window.gtag === "function" && hasStatisticsConsent();
}

function sendPageView(measurementId: string, path: string) {
  if (!canTrack()) return;

  window.gtag?.("event", "page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
    send_to: measurementId,
  });

  if (DEBUG) {
    console.log("[Analytics] page_view", {
      path,
      statisticsConsent: hasStatisticsConsent(),
    });
  }
}

export const Analytics = () => {
  const location = useLocation();
  const initializedRef = useRef(false);
  const lastTrackedPathRef = useRef<string | null>(null);
  const measurementId = GA_MEASUREMENT_ID;

  useEffect(() => {
    if (initializedRef.current || typeof window.gtag !== "function") return;

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_google_signals: false,
      anonymize_ip: true,
      send_page_view: false,
    });

    initializedRef.current = true;

    if (DEBUG) {
      console.log("[Analytics] GA4 ready for Cookiebot consent mode", {
        measurementId,
      });
    }
  }, [measurementId]);

  useEffect(() => {
    const path = location.pathname + location.search;
    if (lastTrackedPathRef.current === path) return;

    sendPageView(measurementId, path);
    if (hasStatisticsConsent()) {
      lastTrackedPathRef.current = path;
    }
  }, [location.pathname, location.search, measurementId]);

  useEffect(() => {
    const syncConsent = () => {
      const path = window.location.pathname + window.location.search;

      if (!hasStatisticsConsent()) {
        lastTrackedPathRef.current = null;
        if (DEBUG) {
          console.log("[Analytics] statistics consent not granted");
        }
        return;
      }

      if (lastTrackedPathRef.current !== path) {
        sendPageView(measurementId, path);
        lastTrackedPathRef.current = path;
      }
    };

    window.addEventListener("CookiebotOnConsentReady", syncConsent);
    window.addEventListener("CookiebotOnAccept", syncConsent);
    window.addEventListener("CookiebotOnDecline", syncConsent);

    return () => {
      window.removeEventListener("CookiebotOnConsentReady", syncConsent);
      window.removeEventListener("CookiebotOnAccept", syncConsent);
      window.removeEventListener("CookiebotOnDecline", syncConsent);
    };
  }, [measurementId]);

  return null;
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>,
) => {
  if (!canTrack()) return;

  window.gtag?.("event", eventName, eventParams);

  if (DEBUG) {
    console.log("[Analytics] event", eventName, eventParams);
  }
};

export const trackContactClick = (method: "phone" | "email" | "website") => {
  trackEvent("contact_click", {
    contact_method: method,
    event_category: "engagement",
    event_label: `Contact via ${method}`,
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent("language_change", {
    event_category: "engagement",
    event_label: `Changed to ${language}`,
    language,
  });
};

export const trackAddBusinessClick = (source: string) => {
  trackEvent("add_business_click", {
    event_category: "engagement",
    event_label: source,
  });
};
