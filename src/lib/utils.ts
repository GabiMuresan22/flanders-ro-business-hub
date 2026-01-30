import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  'other': 'Other',
  'other-services': 'Professional Services',
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
