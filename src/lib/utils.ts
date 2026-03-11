import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalize external website/social URL for reliable opening in new tab.
 * Ensures https, and converts Facebook/Instagram share or mobile URLs to canonical form
 * to avoid ERR_BLOCKED_BY_RESPONSE when opening from our site.
 */
export function normalizeExternalUrl(url: string | null | undefined): string {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()
  if (!trimmed) return ''
  let href = trimmed
  if (!/^https?:\/\//i.test(href)) href = `https://${href}`

  try {
    const parsed = new URL(href)
    const host = parsed.hostname.toLowerCase()
    // Facebook: use www so it's a clean top-level nav (share links often get blocked)
    if (host === 'facebook.com' || host === 'www.facebook.com' || host === 'm.facebook.com' || host === 'fb.com') {
      const path = parsed.pathname === '/' ? '' : parsed.pathname
      const search = parsed.search || ''
      return `https://www.facebook.com${path}${search}`
    }
    if (host === 'instagram.com' || host === 'www.instagram.com') {
      const path = parsed.pathname === '/' ? '' : parsed.pathname
      return `https://www.instagram.com${path}`
    }
    return href
  } catch {
    return href
  }
}

/**
 * Convert a category name to a URL-friendly slug
 * @param category - The category name to convert
 * @returns The slugified category name
 * @example categoryToSlug("Beauty Salon") => "beauty-salon"
 */
export function categoryToSlug(category: string): string {
  return category.toLowerCase()
    .replace(/&/g, '')  // Remove ampersands
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '');  // Remove other special characters
}

/** Known slug -> canonical category name (for display and URL aliases like car-service / car-services). */
const SLUG_TO_CATEGORY: Record<string, string> = {
  'car-service': 'Car Services',
  'car-services': 'Car Services',
  'restaurant': 'Restaurant & Food',
  'restaurant-food': 'Restaurant & Food',
  'bakery': 'Bakery',
  'grocery': 'Grocery',
  'beauty-salon': 'Beauty & Wellness',
  'beauty-wellness': 'Beauty & Wellness',
  'construction': 'Construction',
  'transport': 'Transportation',
  'transportation': 'Transportation',
  'travel-tourism': 'Travel & Tourism',
  'retail': 'Retail',
  'professional-services': 'Professional Services',
  'photo-video': 'Photo & Video',
  'other': 'Other',
  'other-services': 'Professional Services',
  'it-marketing': 'IT & Marketing',
  'cosmetician': 'Cosmetician',
};

/**
 * Get canonical category name from a URL slug (handles aliases like car-service -> Car Services).
 */
export function slugToCategory(slug: string): string {
  const normalized = slug?.toLowerCase().trim() ?? '';
  return SLUG_TO_CATEGORY[normalized] ?? normalized.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

/**
 * Whether a business category matches the given slug (handles aliases, e.g. car-service and car-services).
 */
export function categoryMatchesSlug(category: string, slug: string): boolean {
  const s = slug?.toLowerCase() ?? '';
  if (categoryToSlug(category) === s) return true;
  const canonical = SLUG_TO_CATEGORY[s];
  if (!canonical) return false;
  return category === canonical || category === canonical.replace(/s$/, '').trim();
}
