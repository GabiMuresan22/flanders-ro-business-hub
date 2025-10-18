
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import CategoryCardSkeleton from '../components/skeletons/CategoryCardSkeleton';
import SEO from '../components/SEO';
import { UtensilsCrossed, Cake, Car, ShoppingBag, Truck, Scissors, HardHat, Briefcase } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CategoriesListPage = () => {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data: businesses } = await supabase
        .from('public_businesses')
        .select('category');

      if (businesses) {
        // Count businesses per category dynamically
        const counts: Record<string, number> = {};
        businesses.forEach(b => {
          counts[b.category] = (counts[b.category] || 0) + 1;
        });
        setCategoryCounts(counts);
      }
      setLoading(false);
    };

    fetchBusinesses();
  }, []);

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'Restaurant & Food': <UtensilsCrossed size={48} />,
      'Restaurant': <UtensilsCrossed size={48} />,
      'Bakery': <Cake size={48} />,
      'Car Services': <Car size={48} />,
      'Car Service': <Car size={48} />,
      'Grocery': <ShoppingBag size={48} />,
      'Transport': <Truck size={48} />,
      'Beauty Salon': <Scissors size={48} />,
      'Construction': <HardHat size={48} />,
      'Professional Services': <Briefcase size={48} />,
      'Other Services': <Briefcase size={48} />,
    };
    return iconMap[category] || <Briefcase size={48} />;
  };

  return (
    <>
      <SEO 
        title="Browse Romanian Business Categories - West Flanders | Romanian Business Hub"
        description="Explore Romanian businesses by category in West Flanders: restaurants, bakeries, car services, construction, beauty salons, transportation, and professional services."
        keywords="Romanian business categories Belgium, Romanian services types, Romanian restaurants West Flanders, Romanian bakery, Romanian construction services"
        type="website"
      />
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </div>
          ) : Object.entries(categoryCounts).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className="flex flex-col">
                  <CategoryCard 
                    category={category} 
                    count={count} 
                    icon={getCategoryIcon(category)} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No categories available at the moment.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default CategoriesListPage;
