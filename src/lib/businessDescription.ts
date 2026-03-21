import type { Language } from '@/contexts/LanguageContext';

/** Fields available on public business rows for localized descriptions */
export type BusinessDescriptionFields = {
  description?: string | null;
  description_en?: string | null;
  description_nl?: string | null;
};

export type DescriptionFallback =
  | 'none'
  /** NL requested but only English is available */
  | 'nl_shows_en'
  /** NL requested but only Romanian (base) is available */
  | 'nl_shows_ro'
  /** EN requested but only Romanian is available */
  | 'en_shows_ro'
  /** RO requested but only English is available */
  | 'ro_shows_en';

/**
 * Picks the best description for the current UI language.
 * Order matches product rules: prefer dedicated column, then sensible fallbacks.
 */
export function getLocalizedBusinessDescription(
  business: BusinessDescriptionFields,
  language: Language
): { text: string; fallback: DescriptionFallback } {
  const base = (business.description ?? '').trim();
  const en = (business.description_en ?? '').trim();
  const nl = (business.description_nl ?? '').trim();

  if (language === 'nl') {
    if (nl) return { text: business.description_nl ?? '', fallback: 'none' };
    if (en) return { text: business.description_en ?? '', fallback: 'nl_shows_en' };
    if (base) return { text: business.description ?? '', fallback: 'nl_shows_ro' };
    return { text: '', fallback: 'none' };
  }

  if (language === 'en') {
    if (en) return { text: business.description_en ?? '', fallback: 'none' };
    if (base) return { text: business.description ?? '', fallback: 'en_shows_ro' };
    if (nl) return { text: business.description_nl ?? '', fallback: 'none' };
    return { text: '', fallback: 'none' };
  }

  // ro
  if (base) return { text: business.description ?? '', fallback: 'none' };
  if (en) return { text: business.description_en ?? '', fallback: 'ro_shows_en' };
  if (nl) return { text: business.description_nl ?? '', fallback: 'none' };
  return { text: '', fallback: 'none' };
}

/** Translation key under `businessDetails.*` for the fallback banner (or null if none). */
export function getDescriptionFallbackTranslationKey(
  fallback: DescriptionFallback
): string | null {
  switch (fallback) {
    case 'nl_shows_en':
      return 'descriptionFallbackNlShowsEn';
    case 'nl_shows_ro':
      return 'descriptionFallbackNlShowsRo';
    case 'en_shows_ro':
      return 'descriptionFallbackEnShowsRo';
    case 'ro_shows_en':
      return 'descriptionFallbackRoShowsEn';
    default:
      return null;
  }
}
