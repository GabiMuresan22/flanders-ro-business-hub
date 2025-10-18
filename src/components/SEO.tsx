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

const SEO = ({
  title = 'Romanian Business Hub - Find Romanian Businesses in West Flanders, Belgium',
  description = 'Discover trusted Romanian businesses in West Flanders, Belgium. Find restaurants, services, shops, and more from the Romanian community.',
  keywords = 'Romanian businesses Belgium, Romanian services West Flanders, Romanian restaurants Belgium, Romanian community Belgium',
  ogImage = 'https://lovable.dev/opengraph-image-p98pqg.png',
  type = 'website',
  canonicalUrl,
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = 'https://yoursite.lovable.app';
  const currentUrl = canonicalUrl || `${baseUrl}${location.pathname}`;

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
  }, [title, description, keywords, ogImage, type, currentUrl]);

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
