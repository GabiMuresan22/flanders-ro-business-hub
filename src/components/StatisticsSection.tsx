import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const StatisticsSection = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    businesses: 0,
    categories: 0,
    cities: 0,
    registeredUsers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [businessesRes, userCountRes] = await Promise.all([
        supabase.from('public_businesses').select('category, city'),
        supabase.rpc('get_user_count')
      ]);

      const businesses = businessesRes.data ?? [];
      const userCount = userCountRes.data != null ? Number(userCountRes.data) : 0;

      const uniqueCategories = new Set(businesses.map(b => b.category)).size;
      const uniqueCities = new Set(businesses.map(b => b.city)).size;

      setStats({
        businesses: businesses.length,
        categories: uniqueCategories,
        cities: uniqueCities,
        registeredUsers: userCount
      });
    };

    fetchStats();
  }, []);

  const statistics = [
    { labelKey: 'statistics.businesses', value: stats.businesses, suffix: '+' },
    { labelKey: 'statistics.categories', value: stats.categories, suffix: '+' },
    { labelKey: 'statistics.cities', value: stats.cities, suffix: '+' },
    { labelKey: 'statistics.happyCustomers', value: stats.registeredUsers, suffix: '+' }
  ];

  return (
    <section className="py-16 bg-romania-blue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-white/90 text-lg">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
