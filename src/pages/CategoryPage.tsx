import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import BusinessCardSkeleton from '../components/skeletons/BusinessCardSkeleton';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { supabase } from '@/integrations/supabase/client';
import { slugToCategory, categoryMatchesSlug } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PublicBusiness } from '@/types/database';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [filteredBusinesses, setFilteredBusinesses] = useState<PublicBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  // Always derive display name from slug (handles car-service / car-services etc.)
  const categoryFromSlug = slug ? slugToCategory(slug) : '';

  useEffect(() => {
    if (slug === undefined || slug === '') {
      navigate('/categories', { replace: true });
    }
  }, [slug, navigate]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!slug || slug === '') {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('public_businesses')
        .select('*');

      if (data) {
        const filtered = data.filter(b => categoryMatchesSlug(b.category, slug));
        setFilteredBusinesses(filtered);
      }
      setLoading(false);
    };

    fetchBusinesses();
  }, [slug]);

  const getCategoryTitle = () => {
    if (filteredBusinesses.length > 0) {
      return filteredBusinesses[0].category;
    }
    return categoryFromSlug;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow" aria-busy="true" aria-live="polite">
          <div className="bg-gray-200 py-12 animate-pulse">
            <div className="container mx-auto px-4">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-12">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BusinessCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryTitle = getCategoryTitle();
  const categoryDisplay = (() => {
    const key = `businessCategories.${categoryTitle}`;
    const out = t(key);
    return out === key ? categoryTitle : out;
  })();

  const BASE_URL = 'https://www.ro-businesshub.be';
  const categorySlug = slug || '';
  const categoryUrl = `${BASE_URL}/category/${categorySlug}`;
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t('common.home'), "item": `${BASE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": t('common.categories'), "item": `${BASE_URL}/categories` },
      { "@type": "ListItem", "position": 3, "name": categoryDisplay, "item": categoryUrl }
    ]
  };
  const webPageSchema = {
    "@type": "CollectionPage",
    "@id": `${categoryUrl}#webpage`,
    "url": categoryUrl,
    "name": `${categoryDisplay} ${t('categoryPage.businesses')} | Romanian Business Hub`,
    "description": t('categoryPage.seoDescription').replace('{category}', categoryTitle.toLowerCase())
  };
  const itemListSchema = {
    "@type": "ItemList",
    "itemListElement": filteredBusinesses.map((b, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "url": `${BASE_URL}/business/${b.id}`,
      "name": b.business_name
    })),
    "numberOfItems": filteredBusinesses.length
  };

  return (
    <>
      <SEO 
        title={`${categoryTitle} ${t('categoryPage.businesses')} ${t('categoryPage.inWestFlanders')} | Romanian Business Hub`}
        description={t('categoryPage.seoDescription').replace('{category}', categoryTitle.toLowerCase())}
        keywords={t('categoryPage.seoKeywords').replace(/{category}/g, categoryTitle)}
        type="website"
      />
      <StructuredData data={[breadcrumbStructuredData, webPageSchema, itemListSchema]} />
      <div className="min-h-screen flex flex-col">
        <Navbar />
      <main className="flex-grow">
        <div className="bg-romania-blue py-12">
          <div className="container mx-auto px-4">
            <nav className="flex mb-4 text-white/75">
              <Link to="/" className="hover:text-white">{t('common.home')}</Link>
              <span className="mx-2">/</span>
              <Link to="/categories" className="hover:text-white">{t('common.categories')}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{categoryDisplay}</span>
            </nav>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              {categoryDisplay} {t('categoryPage.businesses')}
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {filteredBusinesses.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t('categoryPage.intro').replace(/{category}/g, categoryDisplay.toLowerCase())}
              </p>
              <p className="text-gray-600 mb-8">
                {t('categoryPage.showingCount')
                  .replace('{count}', filteredBusinesses.length.toString())
                  .replace('{category}', categoryDisplay)}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('categoryPage.noBusinessesTitle')}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {t('categoryPage.emptyIntro').replace(/{category}/g, categoryDisplay.toLowerCase())}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('categoryPage.emptyGrowing').replace(/{category}/g, categoryDisplay.toLowerCase())}
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-10">
                <Link 
                  to="/categories" 
                  className="bg-romania-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {t('categoryPage.viewAllCategories')}
                </Link>
                <Link 
                  to="/add-business" 
                  className="border-2 border-romania-blue text-romania-blue py-3 px-6 rounded-lg hover:bg-romania-blue/5 transition-colors font-medium"
                >
                  {t('nav.addBusiness')}
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('categoryPage.exploreRelated')}</h3>
                <div className="flex flex-wrap gap-3">
                  {['restaurant', 'bakery', 'grocery', 'car-service', 'beauty-wellness', 'cosmetician', 'construction', 'transportation'].filter(s => s !== categorySlug).slice(0, 6).map((s) => {
                    const cat = slugToCategory(s);
                    const label = t(`businessCategories.${cat}`) !== `businessCategories.${cat}` ? t(`businessCategories.${cat}`) : cat;
                    return (
                      <Link key={s} to={`/category/${s}`} className="px-4 py-2 bg-gray-100 hover:bg-romania-blue/10 text-gray-700 hover:text-romania-blue rounded-lg transition-colors">
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
