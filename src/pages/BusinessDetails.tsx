
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { businesses } from '../data/businessData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const business = businesses.find(b => b.id === id);

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the business you are looking for does not exist or has been removed.</p>
            <Link to="/" className="bg-romania-blue text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="h-64 md:h-80 bg-gray-200 relative">
          <img 
            src={business.imageUrl} 
            alt={business.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="container mx-auto">
              <span className="inline-block bg-romania-yellow text-gray-900 text-sm font-medium px-3 py-1 rounded-full mb-2">
                {business.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white">{business.name}</h1>
            </div>
          </div>
        </div>
        
        {/* Business Details */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 mb-6">{business.description}</p>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">Opening Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="flex justify-between text-gray-600">
                        <span className="font-medium">Monday:</span>
                        <span>{business.openingHours.monday}</span>
                      </p>
                      <p className="flex justify-between text-gray-600">
                        <span className="font-medium">Tuesday:</span>
                        <span>{business.openingHours.tuesday}</span>
                      </p>
                      <p className="flex justify-between text-gray-600">
                        <span className="font-medium">Wednesday:</span>
                        <span>{business.openingHours.wednesday}</span>
                      </p>
                      <p className="flex justify-between text-gray-600">
                        <span className="font-medium">Thursday:</span>
                        <span>{business.openingHours.thursday}</span>
                      </p>
                    </div>
                    <div>
                      <p className="flex justify-between text-gray-600">
                        <span className="font-medium">Friday:</span>
                        <span>{business.openingHours.friday}</span>
                      </p>
                      <p className="flex justify-between text-gray-600">
                        <span className="font-medium">Saturday:</span>
                        <span>{business.openingHours.saturday}</span>
                      </p>
                      <p className="flex justify-between text-gray-600">
                        <span className="font-medium">Sunday:</span>
                        <span>{business.openingHours.sunday}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-romania-blue mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-600">{business.address}</p>
                      <p className="text-gray-600">{business.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-romania-blue mr-3" />
                    <p className="text-gray-600">{business.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-romania-blue mr-3" />
                    <p className="text-gray-600">{business.email}</p>
                  </div>
                  {business.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-romania-blue mr-3" />
                      <a href={business.website} className="text-romania-blue hover:underline" target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address}, ${business.city}, Belgium`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full bg-romania-blue text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    View on Map
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">Business Hours</h3>
                <div className="space-y-3">
                  {Object.entries(business.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium capitalize text-gray-700">{day}:</span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessDetails;
