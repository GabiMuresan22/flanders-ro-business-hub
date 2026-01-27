import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import BusinessCardSkeleton from '../components/skeletons/BusinessCardSkeleton';
import SEO from '../components/SEO';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PublicBusiness } from '@/types/database';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const query = searchParams.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [businesses, setBusinesses] = useState<PublicBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryLabel = (cat: string) => {
    if (cat === 'all') return t('searchResults.allCategories');
    const key = `businessCategories.${cat}`;
    const out = t(key);
    return out === key ? cat : out;
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data } = await supabase
        .from('public_businesses')
        .select('*');
      
      setBusinesses(data || []);
      setLoading(false);
    };

    fetchBusinesses();
  }, []);
  
  // Get unique categories and cities
  const categories = useMemo(() => {
    const cats = new Set(businesses.map(b => b.category));
    return ['all', ...Array.from(cats)];
  }, [businesses]);

  const cities = useMemo(() => {
    const citySet = new Set(businesses.map(b => b.city));
    return ['all', ...Array.from(citySet)];
  }, [businesses]);
  
  // Filter businesses based on search query and filters
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const searchLower = query.toLowerCase();
      const matchesSearch = 
        (business.business_name && business.business_name.toLowerCase().includes(searchLower)) ||
        (business.description && business.description.toLowerCase().includes(searchLower)) ||
        (business.category && business.category.toLowerCase().includes(searchLower)) ||
        (business.city && business.city.toLowerCase().includes(searchLower)) ||
        (business.postal_code && business.postal_code.toLowerCase().includes(searchLower));
      
      const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
      const matchesCity = selectedCity === 'all' || business.city === selectedCity;
      
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [businesses, query, selectedCategory, selectedCity]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow" aria-busy="true" aria-live="polite">
          <div className="bg-gray-200 py-12 animate-pulse">
            <div className="container mx-auto px-4">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-8 animate-pulse"></div>
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

  const foundCountStr = t('searchResults.foundCount')
    .replace('{count}', String(filteredBusinesses.length))
    .replace('{businessLabel}', filteredBusinesses.length === 1 ? t('searchResults.business') : t('searchResults.businesses'));

  return (
    <>
      <SEO 
        title={query ? t('searchResults.titleWithQuery').replace('{query}', query) : t('searchResults.titleDefault')}
        description={query ? `Find Romanian businesses matching "${query}" in West Flanders. Search results for restaurants, services, and more.` : "Search for Romanian businesses across West Flanders by name, category, or location. Find the best Romanian services in Belgium."}
        keywords={query ? `${query}, Romanian business search, find ${query} Belgium` : "search Romanian businesses, find Romanian services, business directory Belgium"}
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
              <span className="text-white">{t('searchResults.title')}</span>
            </nav>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              {t('searchResults.title')}
            </h1>
            {query && (
              <p className="text-white/90 mt-2">
                {t('searchResults.showingResultsFor').replace('{query}', query)}
              </p>
            )}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4 text-foreground">{t('searchResults.filterResults')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">{t('searchResults.category')}</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('searchResults.allCategories')} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {categoryLabel(cat)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">{t('searchResults.city')}</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('searchResults.allCities')} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city === 'all' ? t('searchResults.allCities') : city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-8">
                {foundCountStr}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('searchResults.noBusinessesFound')}</h2>
              <p className="text-gray-600 mb-8">
                {query 
                  ? t('searchResults.noMatchMessage').replace('{query}', query)
                  : t('searchResults.enterSearchTerm')
                }
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  to="/" 
                  className="bg-romania-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('searchResults.backToHome')}
                </Link>
                <Link 
                  to="/categories" 
                  className="bg-romania-yellow text-gray-900 py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  {t('searchResults.browseCategories')}
                </Link>
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

export default SearchResults;
