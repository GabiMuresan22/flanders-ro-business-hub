
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import BusinessCardSkeleton from '../components/skeletons/BusinessCardSkeleton';
import SEO from '../components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { categoryToSlug } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PublicBusiness } from '@/types/database';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filteredBusinesses, setFilteredBusinesses] = useState<PublicBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  
  // Convert slug back to category name (e.g., "restaurant-food" -> "Restaurant & Food")
  const categoryFromSlug = slug?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') || '';

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!slug) return;
      
      const { data } = await supabase
        .from('public_businesses')
        .select('*');

      if (data) {
        // Filter by matching category slug
        const filtered = data.filter(b => 
          categoryToSlug(b.category) === slug.toLowerCase()
        );
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

  return (
    <>
      <SEO 
        title={`${categoryTitle} ${t('categoryPage.businesses')} ${t('categoryPage.inWestFlanders')} | Romanian Business Hub`}
        description={t('categoryPage.seoDescription').replace('{category}', categoryTitle.toLowerCase())}
        keywords={t('categoryPage.seoKeywords').replace(/{category}/g, categoryTitle)}
        type="website"
      />
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
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('categoryPage.noBusinessesTitle')}</h2>
              <p className="text-gray-600 mb-8">
                {t('categoryPage.noBusinessesMessage')}
              </p>
              <Link 
                to="/categories" 
                className="bg-romania-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('categoryPage.viewAllCategories')}
              </Link>
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
