
import React from 'react';
import { Search } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-romania-blue">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-[url('/images/romania-pattern.png')] bg-repeat opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Discover Romanian Businesses in West Flanders
          </h1>
          <p className="text-white/90 text-xl mb-10">
            Find the best Romanian restaurants, shops, services and more in your area
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <div className="flex">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-12 pr-4 py-4 rounded-l-lg border-0 focus:ring-2 focus:ring-romania-yellow"
                />
              </div>
              <button className="bg-romania-yellow hover:bg-yellow-400 text-gray-900 font-semibold py-4 px-8 rounded-r-lg transition-colors">
                Search
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className="bg-white/20 text-white py-1 px-3 rounded-full text-sm">Restaurants</span>
              <span className="bg-white/20 text-white py-1 px-3 rounded-full text-sm">Bakeries</span>
              <span className="bg-white/20 text-white py-1 px-3 rounded-full text-sm">Car Services</span>
              <span className="bg-white/20 text-white py-1 px-3 rounded-full text-sm">Groceries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
