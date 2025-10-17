import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-2xl text-romania-blue">Romanian</span>
              <div className="flex w-full">
                <span className="h-1 flex-1 bg-romania-blue"></span>
                <span className="h-1 flex-1 bg-romania-yellow"></span>
                <span className="h-1 flex-1 bg-romania-red"></span>
              </div>
              <span className="font-playfair text-lg text-gray-700">Business Hub</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
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
            <Link to="/faq" className="font-medium text-gray-700 hover:text-romania-blue transition-colors">
              FAQ
            </Link>
            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-sm text-gray-600">Logged in as</span>
                  <span className="text-sm font-semibold text-romania-blue">{user.email}</span>
                </div>
                <Link to="/account" className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-md transition-colors flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden lg:inline">Account</span>
                  <span className="lg:hidden">Profile</span>
                </Link>
                <Link to="/add-business" className="bg-romania-yellow hover:bg-yellow-400 text-gray-900 font-semibold py-1.5 px-4 rounded-md transition-colors">
                  Add Business
                </Link>
              </div>
            ) : (
              <Link to="/auth" className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                Login
              </Link>
            )}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-romania-blue w-40 lg:hidden"
              />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hidden lg:block pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-romania-blue w-auto"
              />
            </form>
          </div>
          
          <div className="md:hidden flex items-center space-x-4">
            <button 
              className="text-gray-700 cursor-pointer"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="h-6 w-6" />
            </button>
            <button 
              className="text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile search input */}
        {isMobileSearchOpen && (
          <div className="md:hidden mt-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-romania-blue"
                autoFocus
              />
            </form>
          </div>
        )}
        
        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 pb-2">
            <nav className="flex flex-col items-center space-y-3">
              <Link 
                to="/" 
                className="font-medium text-gray-700 hover:text-romania-blue transition-colors py-2 px-4 rounded hover:bg-gray-50 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className="font-medium text-gray-700 hover:text-romania-blue transition-colors py-2 px-4 rounded hover:bg-gray-50 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="font-medium text-gray-700 hover:text-romania-blue transition-colors py-2 px-4 rounded hover:bg-gray-50 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="font-medium text-gray-700 hover:text-romania-blue transition-colors py-2 px-4 rounded hover:bg-gray-50 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className="font-medium text-gray-700 hover:text-romania-blue transition-colors py-2 px-4 rounded hover:bg-gray-50 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/add-business" 
                className="bg-romania-yellow hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Add Business
              </Link>
              {user ? (
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Logged in as</p>
                    <p className="text-sm font-semibold text-romania-blue">{user.email}</p>
                  </div>
                  <Link 
                    to="/account" 
                    className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-center flex items-center gap-2 justify-center w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Account
                  </Link>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
