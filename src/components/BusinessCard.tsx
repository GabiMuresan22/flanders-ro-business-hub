
import React from 'react';
import { Business } from '../data/businessData';
import { Link } from 'react-router-dom';
import { Phone, Globe, MapPin } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden bg-gray-200">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-playfair text-xl font-bold text-gray-800 mb-2">{business.name}</h3>
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
