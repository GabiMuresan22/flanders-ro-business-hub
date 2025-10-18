
import React, { useEffect, useState } from 'react';
import BusinessCard from './BusinessCard';
import { supabase } from '@/integrations/supabase/client';

const FeaturedBusinesses: React.FC = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState<any[]>([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data } = await supabase
        .from('public_businesses')
        .select('*')
        .limit(6);

      setFeaturedBusinesses(data || []);
    };

    fetchBusinesses();
  }, []);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Featured Romanian Businesses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover some of the most popular Romanian businesses across West Flanders, offering authentic products and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
