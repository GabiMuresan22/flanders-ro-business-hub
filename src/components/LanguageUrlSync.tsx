import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const SUPPORTED_LANGS = ['en', 'ro', 'nl'] as const;

/**
 * Syncs language from URL (?lang=) to context and vice versa.
 * Enables hreflang with distinct URLs per language.
 * Uses location.search (stable string) instead of searchParams in deps to avoid
 * spurious effect runs when searchParams gets a new reference on re-render.
 */
export const LanguageUrlSync = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const justSyncedFromUrl = useRef(false);
  const searchString = location.search;

  // URL -> Context: read ?lang= only when the actual URL search string changes
  // (searchParams reference changes on every render; location.search is stable)
  useEffect(() => {
    const langParam = new URLSearchParams(searchString).get('lang');
    if (langParam && SUPPORTED_LANGS.includes(langParam as typeof SUPPORTED_LANGS[number])) {
      justSyncedFromUrl.current = true;
      setLanguage(langParam as typeof SUPPORTED_LANGS[number]);
    }
  }, [searchString, setLanguage]);

  // Context -> URL: when user changes language (not from URL sync), update URL
  useEffect(() => {
    if (justSyncedFromUrl.current) {
      justSyncedFromUrl.current = false;
      return;
    }

    const params = new URLSearchParams(searchString);
    const currentLang = params.get('lang');
    const targetLang = language === 'en' ? null : language;

    if (currentLang === targetLang) return;

    if (targetLang) {
      params.set('lang', targetLang);
    } else {
      params.delete('lang');
    }
    const search = params.toString();
    const newPath = search ? `${location.pathname}?${search}` : location.pathname;
    navigate(newPath, { replace: true });
  }, [language, location.pathname, navigate, searchString]);

  return null;
};
