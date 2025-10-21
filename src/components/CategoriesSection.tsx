
import React, { useEffect, useState } from 'react';
import { BusinessCategory } from '../data/businessData';
import CategoryCard from './CategoryCard';
import { UtensilsCrossed, Cake, Car, ShoppingBag, Truck, Scissors, HardHat, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CategoriesSection: React.FC = () => {
  const [categoryCounts, setCategoryCounts] = useState<Record<BusinessCategory, number>>({} as Record<BusinessCategory, number>);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data: businesses } = await supabase
        .from('public_businesses')
        .select('category');

      if (businesses) {
        const counts = Object.values(BusinessCategory).reduce((acc, category) => {
          acc[category] = businesses.filter(b => b.category === category).length;
          return acc;
        }, {} as Record<BusinessCategory, number>);
        setCategoryCounts(counts);
      }
    };

    fetchBusinesses();
  }, []);

  const categoryIcons = {
    [BusinessCategory.RESTAURANT]: <UtensilsCrossed size={32} />,
    [BusinessCategory.BAKERY]: <Cake size={32} />,
    [BusinessCategory.CAR_SERVICE]: <Car size={32} />,
    [BusinessCategory.GROCERY]: <ShoppingBag size={32} />,
    [BusinessCategory.TRANSPORT]: <Truck size={32} />,
    [BusinessCategory.BEAUTY]: <Scissors size={32} />,
    [BusinessCategory.CONSTRUCTION]: <HardHat size={32} />,
    [BusinessCategory.OTHER]: <Briefcase size={32} />,
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Browse Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find Romanian businesses by category across West Flanders
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div key={category} className="flex">
              <CategoryCard 
                category={category as BusinessCategory} 
                count={count} 
                icon={categoryIcons[category as BusinessCategory]} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
