import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Globe, MapPin } from 'lucide-react';
import type { BusinessCardData } from '@/types/database';
import { useLanguage } from '@/contexts/LanguageContext';

interface BusinessCardProps {
  business: BusinessCardData;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const { t, language } = useLanguage();
  
  // Map category keys for translation
  const getCategoryTranslationKey = (category: string): string => {
    const categoryKeyMap: { [key: string]: string } = {
      'Restaurant': 'Restaurant & Food',
      'Restaurant & Food': 'Restaurant & Food',
      'Bakery': 'Bakery',
      'Car Service': 'Car Services',
      'Car Services': 'Car Services',
      'Grocery': 'Grocery',
      'Beauty Salon': 'Beauty & Wellness',
      'Beauty & Wellness': 'Beauty & Wellness',
      'Construction': 'Construction',
      'Transport': 'Transportation',
      'Transportation': 'Transportation',
      'Travel Agency': 'Travel & Tourism',
      'Travel & Tourism': 'Travel & Tourism',
      'Professional Services': 'Professional Services',
      'Photo & Video': 'Photo & Video',
      'Retail': 'Retail',
      'Other': 'Other',
      'Cosmetician': 'Cosmetician',
    };
    return categoryKeyMap[category] || category;
  };

  // Map categories to default images
  const getDefaultImage = (category: string) => {
    const categoryImageMap: { [key: string]: string } = {
      'Restaurant': '/images/restaurant.jpg',
      'Bakery': '/images/bakery.jpg',
      'Car Service': '/images/car-service.jpg',
      'Grocery': '/images/grocery.jpg',
      'Beauty Salon': '/images/beauty-salon.jpg',
      'Construction': '/images/construction.jpg',
      'Transport': '/images/transport.jpg',
      'Travel Agency': '/images/travel-agency.jpg',
      'Cosmetician': '/images/beauty-salon.jpg',
    };
    return categoryImageMap[category] || '/placeholder.svg';
  };

  // Use uploaded image if available, otherwise fall back to category default
  const displayImage = business.image_url || getDefaultImage(business.category);
  const hasCustomImage = !!business.image_url;

  return (
    <article className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]">
      <div className={`h-48 overflow-hidden ${hasCustomImage ? '' : 'bg-gradient-to-br from-romania-blue to-romania-red opacity-80'}`} aria-hidden="true">
        <img 
          src={displayImage} 
          alt={hasCustomImage ? business.business_name : ''}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${hasCustomImage ? '' : 'mix-blend-overlay'}`}
          loading="lazy"
          onError={(e) => {
            // Fall back to default image on error
            const target = e.target as HTMLImageElement;
            target.src = getDefaultImage(business.category);
          }}
        />
      </div>
      <div className="p-5 text-center">
        <div className="flex flex-col items-center mb-2">
          <span className="bg-romania-blue text-white text-xs px-2 py-1 rounded-full mb-2 transition-colors duration-300 group-hover:bg-romania-red">
            {t(`businessCategories.${getCategoryTranslationKey(business.category)}`)}
          </span>
          <h3 className="font-playfair text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-romania-blue">{business.business_name}</h3>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {language === 'en'
            ? (business.description_en || business.description || '')
            : (business.description || business.description_en || '')}
        </p>
        <div className="flex items-center justify-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
          <span className="text-sm">
            <span className="sr-only">{t('businessCard.locatedIn')} </span>
            {business.city}
          </span>
        </div>
        <div className="flex items-center justify-center text-gray-500 mb-2">
          <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
          <a href={`tel:${business.phone}`} className="text-sm hover:text-romania-blue focus:outline-none focus:underline">
            <span className="sr-only">{t('businessCard.phoneNumber')}: </span>
            {business.phone}
          </a>
        </div>
        {business.website && (
          <div className="flex items-center justify-center text-gray-500 mb-4">
            <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
            <a 
              href={business.website} 
              className="text-sm text-romania-blue hover:underline focus:outline-none focus:ring-2 focus:ring-romania-blue rounded" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={`${t('businessCard.visitWebsite')} ${business.business_name}`}
            >
              {t('businessCard.visitWebsite')}
            </a>
          </div>
        )}
        <Link 
          to={`/business/${business.id}`} 
          className="block mt-4 text-center bg-romania-yellow text-gray-900 font-medium py-2 px-4 rounded transition-all duration-300 hover:bg-romania-blue hover:text-white hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-romania-blue focus:ring-offset-2 group-hover:bg-romania-blue group-hover:text-white"
          aria-label={`${t('businessCard.viewDetails')} ${business.business_name}`}
        >
          {t('businessCard.viewDetails')}
        </Link>
      </div>
    </article>
  );
};

export default BusinessCard;
