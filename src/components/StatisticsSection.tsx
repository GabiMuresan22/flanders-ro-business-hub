import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const StatisticsSection = () => {
  const [stats, setStats] = useState({
    businesses: 0,
    categories: 0,
    cities: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data: businesses } = await supabase
        .from('public_businesses')
        .select('category, city');

      if (businesses) {
        const uniqueCategories = new Set(businesses.map(b => b.category)).size;
        const uniqueCities = new Set(businesses.map(b => b.city)).size;
        
        setStats({
          businesses: businesses.length,
          categories: uniqueCategories,
          cities: uniqueCities
        });
      }
    };

    fetchStats();
  }, []);

  const statistics = [
    { label: 'Businesses', value: stats.businesses, suffix: '+' },
    { label: 'Categories', value: stats.categories, suffix: '+' },
    { label: 'Cities', value: stats.cities, suffix: '+' },
    { label: 'Happy Customers', value: '1000', suffix: '+' }
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
              <div className="text-white/90 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
