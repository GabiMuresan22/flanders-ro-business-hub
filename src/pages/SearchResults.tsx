
import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { businesses } from '../data/businessData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  
  // Get unique categories and cities
  const categories = useMemo(() => {
    const cats = new Set(businesses.map(b => b.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const cities = useMemo(() => {
    const citySet = new Set(businesses.map(b => b.city));
    return ['all', ...Array.from(citySet)];
  }, []);
  
  // Filter businesses based on search query and filters
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const searchLower = query.toLowerCase();
      const matchesSearch = 
        business.name.toLowerCase().includes(searchLower) ||
        business.description.toLowerCase().includes(searchLower) ||
        business.category.toLowerCase().includes(searchLower) ||
        business.city.toLowerCase().includes(searchLower) ||
        business.address.toLowerCase().includes(searchLower);
      
      const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
      const matchesCity = selectedCity === 'all' || business.city === selectedCity;
      
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [query, selectedCategory, selectedCity]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-romania-blue py-12">
          <div className="container mx-auto px-4">
            <nav className="flex mb-4 text-white/75">
              <Link to="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Search Results</span>
            </nav>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              Search Results
            </h1>
            {query && (
              <p className="text-white/90 mt-2">
                Showing results for "{query}"
              </p>
            )}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Filter Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city === 'all' ? 'All Cities' : city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {filteredBusinesses.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-8">
                Found {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'business' : 'businesses'} matching your search
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">No businesses found</h2>
              <p className="text-gray-600 mb-8">
                {query 
                  ? `Sorry, we couldn't find any businesses matching "${query}". Try a different search term or explore our categories.`
                  : "Please enter a search term to find businesses."
                }
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  to="/" 
                  className="bg-romania-blue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Home
                </Link>
                <Link 
                  to="/categories" 
                  className="bg-romania-yellow text-gray-900 py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
