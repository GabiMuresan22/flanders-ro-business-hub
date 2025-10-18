
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Globe, MapPin } from 'lucide-react';

interface BusinessCardProps {
  business: any;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden bg-gradient-to-br from-romania-blue to-romania-red opacity-80">
        <img 
          src={getDefaultImage(business.category)} 
          alt={`${business.business_name} - ${business.category}`}
          className="w-full h-full object-cover mix-blend-overlay"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">{business.business_name}</h3>
          <span className="bg-romania-blue text-white text-xs px-2 py-1 rounded-full">
            {business.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{business.city}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-2">
          <Phone className="h-4 w-4 mr-2" />
          <span className="text-sm">{business.phone}</span>
        </div>
        {business.website && (
          <div className="flex items-center text-gray-500 mb-4">
            <Globe className="h-4 w-4 mr-2" />
            <a href={business.website} className="text-sm text-romania-blue hover:underline" target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </div>
        )}
        <Link 
          to={`/business/${business.id}`} 
          className="block mt-4 text-center bg-romania-yellow hover:bg-romania-blue text-gray-900 hover:text-white font-medium py-2 px-4 rounded transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BusinessCard;
