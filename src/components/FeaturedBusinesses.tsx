
import React, { useEffect, useState, useMemo } from 'react';
import BusinessCard from './BusinessCard';
import BusinessCardSkeleton from './skeletons/BusinessCardSkeleton';
import { supabase } from '@/integrations/supabase/client';
import type { PublicBusiness } from '@/types/database';
import { useLanguage } from '@/contexts/LanguageContext';

/** Return a rotation index that changes every `days` days */
const getRotationIndex = (totalItems: number, batchSize: number, days: number): number => {
  const epoch = new Date('2026-01-01').getTime();
  const now = Date.now();
  const cyclePeriod = days * 24 * 60 * 60 * 1000;
  const cycleNumber = Math.floor((now - epoch) / cyclePeriod);
  const totalBatches = Math.max(1, Math.ceil(totalItems / batchSize));
  return cycleNumber % totalBatches;
};

const FeaturedBusinesses: React.FC = () => {
  const { t } = useLanguage();
  const [allBusinesses, setAllBusinesses] = useState<PublicBusiness[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const { data } = await supabase
          .from('public_businesses')
          .select('*')
          .order('business_name', { ascending: true });

        setAllBusinesses(data || []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const featuredBusinesses = useMemo(() => {
    if (allBusinesses.length === 0) return [];
    const batchSize = 3;
    const rotationIndex = getRotationIndex(allBusinesses.length, batchSize, 3);
    const start = (rotationIndex * batchSize) % allBusinesses.length;
    const selected: PublicBusiness[] = [];
    for (let i = 0; i < batchSize && i < allBusinesses.length; i++) {
      selected.push(allBusinesses[(start + i) % allBusinesses.length]);
    }
    return selected;
  }, [allBusinesses]);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">{t('featured.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
            <p className="text-gray-600">{t('featured.noBusinesses')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBusinesses;
