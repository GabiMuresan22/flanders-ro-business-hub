
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BusinessCategory } from '../data/businessData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import { supabase } from '@/integrations/supabase/client';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [filteredBusinesses, setFilteredBusinesses] = useState<any[]>([]);
  
  // Convert slug to category enum value
  const categoryKey = slug?.toUpperCase().replace(/-/g, '_');
  const categoryMatch = Object.entries(BusinessCategory).find(
    ([key, value]) => key === categoryKey
  );
  
  const category = categoryMatch ? categoryMatch[1] : undefined;

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (!category) return;
      
      const { data } = await supabase
        .from('businesses')
        .select('*')
        .eq('status', 'approved')
        .eq('category', category);

      setFilteredBusinesses(data || []);
    };

    fetchBusinesses();
  }, [category]);
  
  const getCategoryTitle = () => {
    if (category) {
      return category;
    }
    return slug?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || '';
  };

  return (
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
              {getCategoryTitle()} Businesses
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {filteredBusinesses.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-8">
                Showing {filteredBusinesses.length} {getCategoryTitle()} businesses in West Flanders
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
  );
};

export default CategoryPage;
