import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .single();
    
    setIsAdmin(!!data);
  };

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
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="flex flex-col">
              <span className="font-playfair font-bold text-xl sm:text-2xl text-romania-blue">Romanian</span>
              <div className="flex w-full">
                <span className="h-0.5 sm:h-1 flex-1 bg-romania-blue"></span>
                <span className="h-0.5 sm:h-1 flex-1 bg-romania-yellow"></span>
                <span className="h-0.5 sm:h-1 flex-1 bg-romania-red"></span>
              </div>
              <span className="font-playfair text-sm sm:text-lg text-gray-700">Business Hub</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-8 xl:ml-12">
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
              <div className="flex items-center gap-2 xl:gap-3 ml-2">
                <div className="hidden xl:flex flex-col items-end">
                  <span className="text-xs text-gray-600">Logged in as</span>
                  <span className="text-xs font-semibold text-romania-blue truncate max-w-[150px]">{user.email}</span>
                </div>
                <Link to="/my-businesses" className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-1.5 px-3 rounded-md transition-colors text-sm whitespace-nowrap">
                  My Businesses
                </Link>
                <Link to="/account" className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-md transition-colors flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Account</span>
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="bg-romania-red hover:bg-red-700 text-white font-semibold py-1.5 px-3 rounded-md transition-colors text-sm">
                    Admin
                  </Link>
                )}
                <Link to="/add-business" className="bg-romania-yellow hover:bg-yellow-400 text-gray-900 font-semibold py-1.5 px-3 rounded-md transition-colors whitespace-nowrap text-sm">
                  Add Business
                </Link>
              </div>
            ) : (
              <Link to="/auth" className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-md transition-colors text-sm">
                Login
              </Link>
            )}
            <form onSubmit={handleSearch} className="relative hidden xl:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-sm rounded-full border border-gray-200 focus:outline-none focus:border-romania-blue w-48"
              />
            </form>
          </div>
          
          <div className="lg:hidden flex items-center space-x-3">
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
          <div className="lg:hidden mt-2">
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
          <div className="lg:hidden mt-2 pb-2">
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
                    to="/my-businesses" 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors text-center w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Businesses
                  </Link>
                  <Link 
                    to="/account" 
                    className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-center flex items-center gap-2 justify-center w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Account
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="bg-romania-red hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-center w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/add-business" 
                    className="bg-romania-yellow hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors text-center w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Add Business
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
