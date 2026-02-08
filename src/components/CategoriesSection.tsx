
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { UtensilsCrossed, Cake, Car, ShoppingBag, Truck, Scissors, HardHat, Briefcase, Gift, Plane, Laptop, Camera, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const CategoriesSection: React.FC = () => {
  const { t } = useLanguage();
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data: businesses } = await supabase
        .from('public_businesses')
        .select('category');

      if (businesses) {
        // Count businesses per category dynamically; include Cosmetician so it always shows
        const allCategories = ['Restaurant & Food', 'Bakery', 'Grocery', 'Beauty & Wellness', 'Car Services', 'Construction', 'Transportation', 'Travel & Tourism', 'Retail', 'Professional Services', 'Photo & Video', 'Gift & Flowers', 'IT & Marketing', 'Cosmetician', 'Other'];
        const counts: Record<string, number> = {};
        allCategories.forEach(cat => { counts[cat] = 0; });
        businesses.forEach(b => {
          if (b.category) {
            counts[b.category] = (counts[b.category] ?? 0) + 1;
          }
        });
        setCategoryCounts(counts);
      }
    };

    fetchBusinesses();
  }, []);

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'Restaurant & Food': <UtensilsCrossed size={32} />,
      'Restaurant': <UtensilsCrossed size={32} />,
      'Bakery': <Cake size={32} />,
      'Car Services': <Car size={32} />,
      'Car Service': <Car size={32} />,
      'Grocery': <ShoppingBag size={32} />,
      'Transport': <Truck size={32} />,
      'Transportation': <Truck size={32} />,
      'Beauty Salon': <Scissors size={32} />,
      'Beauty & Wellness': <Scissors size={32} />,
      'Construction': <HardHat size={32} />,
      'Professional Services': <Briefcase size={32} />,
      'Photo & Video': <Camera size={32} />,
      'Gift & Flowers': <Gift size={32} />,
      'Travel & Tourism': <Plane size={32} />,
      'IT & Marketing': <Laptop size={32} />,
      'Retail': <ShoppingBag size={32} />,
      'Other Services': <Briefcase size={32} />,
      'Other': <Briefcase size={32} />,
      'Cosmetician': <Sparkles size={32} />,
    };
    return iconMap[category] || <Briefcase size={32} />;
  };
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">{t('categoriesSection.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('categoriesSection.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <CategoryCard 
              key={category}
              category={category} 
              count={count} 
              icon={getCategoryIcon(category)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
