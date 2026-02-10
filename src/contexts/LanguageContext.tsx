import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import roTranslations from '../translations/ro.json';
import nlTranslations from '../translations/nl.json';

export type Language = 'en' | 'ro' | 'nl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, unknown>> = {
  en: enTranslations,
  ro: roTranslations,
  nl: nlTranslations,
};

const LANGUAGE_ORDER: Language[] = ['en', 'ro', 'nl'];

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

function getStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem('language');
    return saved === 'ro' || saved === 'en' || saved === 'nl' ? saved : 'en';
  } catch {
    return 'en';
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch {
      // localStorage may be blocked
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => {
      const idx = LANGUAGE_ORDER.indexOf(prev);
      return LANGUAGE_ORDER[(idx + 1) % LANGUAGE_ORDER.length];
    });
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
