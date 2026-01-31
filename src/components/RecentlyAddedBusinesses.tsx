import React, { useEffect, useState } from 'react';
import BusinessCard from './BusinessCard';
import BusinessCardSkeleton from './skeletons/BusinessCardSkeleton';
import { supabase } from '@/integrations/supabase/client';
import type { PublicBusiness } from '@/types/database';
import { useLanguage } from '@/contexts/LanguageContext';

const RecentlyAddedBusinesses: React.FC = () => {
  const { t } = useLanguage();
  const [businesses, setBusinesses] = useState<PublicBusiness[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyAdded = async () => {
      try {
        const { data } = await supabase
          .from('public_businesses')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        setBusinesses(data || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentlyAdded();
  }, []);

  if (businesses.length === 0 && !isLoading) {
    return null;
  }

  return (
    <section className="py-16 bg-white" aria-labelledby="recently-added-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="recently-added-heading" className="font-playfair text-3xl font-bold text-gray-900 mb-4">
            {t('recentlyAdded.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('recentlyAdded.subtitle')}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <BusinessCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAddedBusinesses;
