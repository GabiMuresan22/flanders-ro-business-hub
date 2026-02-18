/**
 * Schema.org structured data helpers for SEO
 * These functions generate JSON-LD structured data for different page types
 */

interface Organization {
  "@context": string;
  "@type": string;
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  address?: {
    "@type": string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint?: {
    "@type": string;
    contactType: string;
    email?: string;
    availableLanguage: string[];
  };
  sameAs?: string[];
}

interface LocalBusiness {
  "@context": string;
  "@type": string;
  name: string;
  description?: string;
  image?: string;
  address?: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    postalCode?: string;
    addressCountry: string;
  };
  geo?: {
    "@type": string;
    latitude: number;
    longitude: number;
  };
  telephone?: string;
  url?: string;
  priceRange?: string;
  openingHours?: string;
  aggregateRating?: {
    "@type": string;
    ratingValue: number;
    reviewCount: number;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbList {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Organization schema for the homepage
 * Describes the Romanian Business Hub organization
 */
export const getOrganizationSchema = (): Organization => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Romanian Business Hub",
    "alternateName": "Flanders-RO Business Hub",
    "url": "https://www.ro-businesshub.be",
    "logo": "https://www.ro-businesshub.be/favicon.svg",
    "description": "Business directory connecting Romanian businesses with the community in West Flanders, Belgium. Find Romanian restaurants, services, shops, and more.",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "West Flanders",
      "addressCountry": "BE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "info@ro-businesshub.be",
      "availableLanguage": ["English", "Romanian", "Dutch"]
    },
    "sameAs": [
      // Add social media links when available
      // "https://www.facebook.com/robusinesshub",
      // "https://www.linkedin.com/company/robusinesshub"
    ]
  };
};

/**
 * LocalBusiness schema for individual business pages
 * @param business - Business object with details
 */
export const getLocalBusinessSchema = (business: {
  name: string;
  description?: string;
  image_url?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  phone?: string;
  website?: string;
  price_range?: string;
  opening_hours?: string;
  rating?: number;
  review_count?: number;
  coordinates?: { lat: number; lng: number };
}): LocalBusiness => {
  const schema: LocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.name,
  };

  if (business.description) {
    schema.description = business.description;
  }

  if (business.image_url) {
    schema.image = business.image_url;
  }

  if (business.address && business.city) {
    schema.address = {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.city,
      "addressCountry": "BE"
    };
    if (business.postal_code) {
      schema.address.postalCode = business.postal_code;
    }
  }

  if (business.coordinates) {
    schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": business.coordinates.lat,
      "longitude": business.coordinates.lng
    };
  }

  if (business.phone) {
    schema.telephone = business.phone;
  }

  if (business.website) {
    schema.url = business.website;
  }

  if (business.price_range) {
    schema.priceRange = business.price_range;
  }

  if (business.opening_hours) {
    schema.openingHours = business.opening_hours;
  }

  if (business.rating && business.review_count) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": business.rating,
      "reviewCount": business.review_count
    };
  }

  return schema;
};

/**
 * BreadcrumbList schema for navigation
 * @param items - Array of breadcrumb items with name and url
 */
export const getBreadcrumbSchema = (items: BreadcrumbItem[]): BreadcrumbList => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * WebSite schema with search action
 */
export const getWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Romanian Business Hub",
    "url": "https://www.ro-businesshub.be",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.ro-businesshub.be/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };
};

/**
 * ItemList schema for category pages
 * @param category - Category name
 * @param businesses - Array of businesses in the category
 */
export const getItemListSchema = (category: string, businesses: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Romanian ${category} in West Flanders, Belgium`,
    "itemListElement": businesses.map((business, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": business.name,
      "url": business.url
    }))
  };
};
