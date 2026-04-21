/// <reference types="vite/client" />

interface CookiebotConsentState {
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

interface CookiebotApi {
  consent: CookiebotConsentState;
  show: () => void;
  renew: () => void;
  withdraw: () => void;
  hasResponse?: boolean;
}

interface Window {
  Cookiebot?: CookiebotApi;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
