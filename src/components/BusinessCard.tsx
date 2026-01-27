import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Globe, MapPin } from 'lucide-react';
import type { BusinessCardData } from '@/types/database';
import { useLanguage } from '@/contexts/LanguageContext';

interface BusinessCardProps {
  business: BusinessCardData;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const { t } = useLanguage();
  
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
      'Retail': 'Retail',
      'Other': 'Other',
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
    };
    return categoryImageMap[category] || '/placeholder.svg';
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden bg-gradient-to-br from-romania-blue to-romania-red opacity-80" aria-hidden="true">
        <img 
          src={getDefaultImage(business.category)} 
          alt=""
          className="w-full h-full object-cover mix-blend-overlay"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">{business.business_name}</h3>
          <span className="bg-romania-blue text-white text-xs px-2 py-1 rounded-full">
            {t(`businessCategories.${getCategoryTranslationKey(business.category)}`)}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-2" aria-hidden="true" />
          <span className="text-sm">
            <span className="sr-only">{t('businessCard.locatedIn')} </span>
            {business.city}
          </span>
        </div>
        <div className="flex items-center text-gray-500 mb-2">
          <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
          <a href={`tel:${business.phone}`} className="text-sm hover:text-romania-blue focus:outline-none focus:underline">
            <span className="sr-only">{t('businessCard.phoneNumber')}: </span>
            {business.phone}
          </a>
        </div>
        {business.website && (
          <div className="flex items-center text-gray-500 mb-4">
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
          className="block mt-4 text-center bg-romania-yellow hover:bg-romania-blue text-gray-900 hover:text-white font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-romania-blue focus:ring-offset-2"
          aria-label={`${t('businessCard.viewDetails')} ${business.business_name}`}
        >
          {t('businessCard.viewDetails')}
        </Link>
      </div>
    </article>
  );
};

export default BusinessCard;
