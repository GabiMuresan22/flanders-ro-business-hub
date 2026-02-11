import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'business.business';
  canonicalUrl?: string;
}

const BASE_URL = 'https://www.ro-businesshub.be';

const SEO = ({
  title = 'Romanian Business Hub - Find Romanian Businesses in West Flanders, Belgium',
  description = 'Discover trusted Romanian businesses in West Flanders, Belgium. Find restaurants, services, shops, and more from the Romanian community.',
  keywords = 'Romanian businesses Belgium, Romanian services West Flanders, Romanian restaurants Belgium, Romanian community Belgium',
  ogImage = 'https://www.ro-businesshub.be/og-image.png',
  type = 'website',
  canonicalUrl,
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = canonicalUrl || `${BASE_URL}${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Hreflang: alternate language URLs for EN, RO, NL (prevents duplicate content penalties)
    const pathname = location.pathname;
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    const addHreflang = (lang: string, href: string) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    };
    addHreflang('en', `${BASE_URL}${pathname}`);
    addHreflang('ro', `${BASE_URL}${pathname}?lang=ro`);
    addHreflang('nl', `${BASE_URL}${pathname}?lang=nl`);
    addHreflang('x-default', `${BASE_URL}${pathname}`);
  }, [title, description, keywords, ogImage, type, currentUrl, location.pathname]);

  return null;
};

const updateMetaTag = (attribute: string, key: string, value: string) => {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

export default SEO;
