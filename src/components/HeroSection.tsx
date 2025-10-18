
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative bg-romania-blue" aria-label="Hero section">
      <div className="absolute inset-0 overflow-hidden opacity-10" aria-hidden="true">
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
            <form onSubmit={handleSearch} role="search" aria-label="Search for businesses">
              <div className="flex">
                <div className="relative flex-grow">
                  <label htmlFor="hero-search" className="sr-only">
                    Search for businesses
                  </label>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" aria-hidden="true" />
                  <input
                    id="hero-search"
                    type="search"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-l-lg border-0 focus:ring-2 focus:ring-romania-yellow focus:outline-none"
                    aria-label="Search businesses by name, category, or location"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-romania-yellow hover:bg-yellow-400 text-gray-900 font-semibold py-4 px-8 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-romania-yellow focus:ring-offset-2"
                  aria-label="Search"
                >
                  Search
                </button>
              </div>
            </form>
            
            <div className="flex flex-wrap justify-center gap-3 mt-4" role="list" aria-label="Popular categories">
              <span className="bg-white/20 text-white py-1 px-3 rounded-full text-sm" role="listitem">Restaurants</span>
              <span className="bg-white/20 text-white py-1 px-3 rounded-full text-sm" role="listitem">Bakeries</span>
              <span className="bg-white/20 text-white py-1 px-3 rounded-full text-sm" role="listitem">Car Services</span>
              <span className="bg-white/20 text-white py-1 px-3 rounded-full text-sm" role="listitem">Groceries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
