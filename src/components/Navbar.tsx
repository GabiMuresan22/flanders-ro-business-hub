import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, X, Menu } from 'lucide-react';
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
              className="text-gray-700 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="h-6 w-6" />
            </button>
            <button 
              className="text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile search input */}
        {isMobileSearchOpen && (
          <div className="lg:hidden mt-3 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-romania-blue transition-colors"
                autoFocus
              />
            </form>
          </div>
        )}
        
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 lg:hidden animate-slide-in-right overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>
              
              <nav className="flex flex-col space-y-1">
                <Link 
                  to="/" 
                  className="font-medium text-gray-700 hover:text-romania-blue hover:bg-romania-blue/5 transition-all py-3 px-4 rounded-lg text-left w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/categories" 
                  className="font-medium text-gray-700 hover:text-romania-blue hover:bg-romania-blue/5 transition-all py-3 px-4 rounded-lg text-left w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  to="/about" 
                  className="font-medium text-gray-700 hover:text-romania-blue hover:bg-romania-blue/5 transition-all py-3 px-4 rounded-lg text-left w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="font-medium text-gray-700 hover:text-romania-blue hover:bg-romania-blue/5 transition-all py-3 px-4 rounded-lg text-left w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to="/faq" 
                  className="font-medium text-gray-700 hover:text-romania-blue hover:bg-romania-blue/5 transition-all py-3 px-4 rounded-lg text-left w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                
                <div className="my-4 border-t border-gray-200" />
                
                {user ? (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="bg-romania-blue/10 p-4 rounded-lg mb-2">
                      <p className="text-xs text-gray-600 mb-1">Logged in as</p>
                      <p className="text-sm font-semibold text-romania-blue truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/my-businesses" 
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all text-left w-full active:scale-95"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Businesses
                    </Link>
                    <Link 
                      to="/account" 
                      className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-left flex items-center gap-2 w-full active:scale-95"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      Account
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="bg-romania-red hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-left w-full active:scale-95"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link 
                      to="/add-business" 
                      className="bg-romania-yellow hover:bg-yellow-400 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all text-left w-full active:scale-95"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Add Business
                    </Link>
                  </div>
                ) : (
                  <Link 
                    to="/auth" 
                    className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-center w-full active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
