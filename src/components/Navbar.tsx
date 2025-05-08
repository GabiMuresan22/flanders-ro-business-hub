
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-2xl text-romania-blue">Romanian</span>
              <div className="flex space-x-1">
                <span className="h-1 w-6 bg-romania-blue"></span>
                <span className="h-1 w-6 bg-romania-yellow"></span>
                <span className="h-1 w-6 bg-romania-red"></span>
              </div>
              <span className="font-playfair text-lg text-gray-700">Business Hub</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-700 hover:text-romania-blue transition-colors">
              Home
            </Link>
            <Link to="/categories" className="font-medium text-gray-700 hover:text-romania-blue transition-colors">
              Categories
            </Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-romania-blue transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-medium text-gray-700 hover:text-romania-blue transition-colors">
              Contact
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search businesses..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-romania-blue"
              />
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <button className="text-gray-700">
              <Search className="h-6 w-6" />
            </button>
            <button className="text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
