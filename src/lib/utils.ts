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

/**
 * Convert plain text content with newlines to HTML for rendering
 * Handles numbered sections (1., 2., etc.) as h2 headers
 * Handles lettered subsections (A., B., etc.) as h3 headers
 * Converts double newlines to paragraph breaks
 */
export function textToHtml(text: string): string {
  if (!text) return '';
  
  // Split by double newlines to get paragraphs
  const paragraphs = text.split('\n\n');
  
  const htmlParagraphs = paragraphs.map(para => {
    const trimmed = para.trim();
    if (!trimmed) return '';
    
    // Check if it's a numbered section (e.g., "1. Types of..." or "2. Choosing...")
    if (/^\d+\.\s+/.test(trimmed)) {
      const content = trimmed.replace(/^\d+\.\s+/, '');
      return `<h2>${content}</h2>`;
    }
    
    // Check if it's a lettered subsection (e.g., "A. Professional..." or "B. Registration...")
    if (/^[A-Z]\.\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[A-Z]\.\s+/, '');
      return `<h3>${content}</h3>`;
    }
    
    // Check if it looks like a subheading (ends with a colon or is short and has specific keywords)
    if (trimmed.endsWith(':') && trimmed.length < 100) {
      return `<h3>${trimmed.replace(/:$/, '')}</h3>`;
    }
    
    // Regular paragraph
    // Replace single newlines within a paragraph with <br> tags
    const withBreaks = trimmed.replace(/\n/g, '<br>');
    return `<p>${withBreaks}</p>`;
  });
  
  return htmlParagraphs.filter(p => p).join('\n');
}
