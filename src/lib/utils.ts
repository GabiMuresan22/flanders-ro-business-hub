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
