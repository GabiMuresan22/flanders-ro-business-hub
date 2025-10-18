
import React, { useEffect, useState } from 'react';
import { BusinessCategory } from '../data/businessData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import { UtensilsCrossed, Cake, Car, ShoppingBag, Truck, Scissors, HardHat, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CategoriesListPage = () => {
  const [categoryCounts, setCategoryCounts] = useState<Record<BusinessCategory, number>>({} as Record<BusinessCategory, number>);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data: businesses } = await supabase
        .from('businesses')
        .select('category')
        .eq('status', 'approved');

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
    [BusinessCategory.RESTAURANT]: <UtensilsCrossed size={48} />,
    [BusinessCategory.BAKERY]: <Cake size={48} />,
    [BusinessCategory.CAR_SERVICE]: <Car size={48} />,
    [BusinessCategory.GROCERY]: <ShoppingBag size={48} />,
    [BusinessCategory.TRANSPORT]: <Truck size={48} />,
    [BusinessCategory.BEAUTY]: <Scissors size={48} />,
    [BusinessCategory.CONSTRUCTION]: <HardHat size={48} />,
    [BusinessCategory.OTHER]: <Briefcase size={48} />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-romania-blue py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white text-center">
              Browse Business Categories
            </h1>
            <p className="text-white/90 text-center mt-4 max-w-xl mx-auto">
              Explore Romanian businesses across West Flanders by category
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <div key={category} className="flex flex-col">
                <CategoryCard 
                  category={category as BusinessCategory} 
                  count={count} 
                  icon={categoryIcons[category as BusinessCategory]} 
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesListPage;
