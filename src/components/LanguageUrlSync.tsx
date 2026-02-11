import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const SUPPORTED_LANGS = ['en', 'ro', 'nl'] as const;

/**
 * Syncs language from URL (?lang=) to context and vice versa.
 * Enables hreflang with distinct URLs per language.
 */
export const LanguageUrlSync = () => {
  const { language, setLanguage } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const justSyncedFromUrl = useRef(false);

  // URL -> Context: read ?lang= on mount and when URL changes
  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam && SUPPORTED_LANGS.includes(langParam as typeof SUPPORTED_LANGS[number])) {
      justSyncedFromUrl.current = true;
      setLanguage(langParam as typeof SUPPORTED_LANGS[number]);
    }
  }, [searchParams, setLanguage]);

  // Context -> URL: when user changes language (not from URL sync), update URL
  useEffect(() => {
    if (justSyncedFromUrl.current) {
      justSyncedFromUrl.current = false;
      return;
    }

    const currentLang = searchParams.get('lang');
    const targetLang = language === 'en' ? null : language;

    if (currentLang === targetLang) return;

    const params = new URLSearchParams(searchParams);
    if (targetLang) {
      params.set('lang', targetLang);
    } else {
      params.delete('lang');
    }
    const search = params.toString();
    const newPath = search ? `${location.pathname}?${search}` : location.pathname;
    navigate(newPath, { replace: true });
  }, [language, location.pathname, navigate, searchParams]);

  return null;
};
