
import React, { useEffect, useState } from 'react';
import BusinessCard from './BusinessCard';
import BusinessCardSkeleton from './skeletons/BusinessCardSkeleton';
import { supabase } from '@/integrations/supabase/client';

const FeaturedBusinesses: React.FC = () => {
  const [featuredBusinesses, setFeaturedBusinesses] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data } = await supabase
          .from('public_businesses')
          .select('*')
          .limit(6);

        setFeaturedBusinesses(data || []);
      } finally {
        setIsLoading(false);
      }
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
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        ) : featuredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No businesses found at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
