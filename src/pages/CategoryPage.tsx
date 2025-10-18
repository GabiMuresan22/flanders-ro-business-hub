
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import BusinessCardSkeleton from '../components/skeletons/BusinessCardSkeleton';
import SEO from '../components/SEO';
import { supabase } from '@/integrations/supabase/client';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
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
        // Filter by matching category (case insensitive, flexible matching)
        const filtered = data.filter(b => 
          b.category.toLowerCase().replace(/[^a-z0-9]/g, '') === 
          slug.toLowerCase().replace(/[^a-z0-9]/g, '')
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

  return (
    <>
      <SEO 
        title={`${categoryTitle} Businesses in West Flanders | Romanian Business Hub`}
        description={`Find trusted Romanian ${categoryTitle.toLowerCase()} businesses in West Flanders, Belgium. Browse verified listings with contact information, reviews, and more.`}
        keywords={`Romanian ${categoryTitle} West Flanders, ${categoryTitle} Belgium, Romanian ${categoryTitle} businesses, ${categoryTitle} services Belgium`}
        type="website"
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
      <main className="flex-grow">
        <div className="bg-romania-blue py-12">
          <div className="container mx-auto px-4">
            <nav className="flex mb-4 text-white/75">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/categories" className="hover:text-white">Categories</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{getCategoryTitle()}</span>
            </nav>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              {categoryTitle} Businesses
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {filteredBusinesses.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-8">
                Showing {filteredBusinesses.length} {categoryTitle} businesses in West Flanders
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No businesses found</h2>
              <p className="text-gray-600 mb-8">
                Sorry, we couldn't find any businesses in this category. Try exploring other categories.
              </p>
              <Link 
                to="/categories" 
                className="bg-romania-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Categories
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
