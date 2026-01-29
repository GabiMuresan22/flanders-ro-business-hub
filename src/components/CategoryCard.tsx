
import React from 'react';
import { Link } from 'react-router-dom';
import { categoryToSlug } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCardProps {
  category: string;
  count: number;
  icon: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, count, icon }) => {
  const { t } = useLanguage();
  
  // Convert category to slug (e.g., "Restaurant & Food" -> "restaurant-food")
  const categorySlug = categoryToSlug(category);
  
  // Get translated category name
  const translatedCategory = t(`businessCategories.${category}`) !== `businessCategories.${category}` 
    ? t(`businessCategories.${category}`) 
    : category;
  
  // Get translated "businesses" text
  const businessesLabel = count === 1 ? t('common.business') : t('common.businesses');
  
  return (
    <Link 
      to={`/category/${categorySlug}`} 
      className="block h-full focus:outline-none focus:ring-2 focus:ring-romania-blue focus:ring-offset-2 rounded-lg"
      aria-label={`${t('common.view')} ${count} ${translatedCategory} ${businessesLabel}`}
    >
      <article className="bg-white p-8 rounded-lg shadow-md transition-all hover:shadow-lg hover:border-romania-blue border-2 border-transparent h-full flex flex-col items-center justify-center min-h-[200px]">
        <div className="flex justify-center mb-6 text-romania-blue" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-2xl font-playfair font-semibold text-center text-gray-800 mb-3">{translatedCategory}</h3>
        <p className="text-center text-gray-500">
          <span className="sr-only">{t('common.view')} </span>
          {count} {businessesLabel}
        </p>
      </article>
    </Link>
  );
};

export default CategoryCard;
