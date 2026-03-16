import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User as UserIcon, X, Menu, Bell } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { User } from '@supabase/supabase-js';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarLanguageSwitcher from './navbar/NavbarLanguageSwitcher';
import ResourcesDropdown from './navbar/ResourcesDropdown';
import MobileResourcesAccordion from './navbar/MobileResourcesAccordion';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const fetchPendingCount = useCallback(async () => {
    const { count } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
    setPendingCount(count ?? 0);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) checkAdminStatus(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
        setPendingCount(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sticky header scroll detection
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Fetch pending count when admin
  useEffect(() => {
    if (isAdmin) {
      fetchPendingCount();
      const channel = supabase
        .channel('pending-businesses')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'businesses', filter: 'status=eq.pending' }, () => fetchPendingCount())
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [isAdmin, fetchPendingCount]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
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
    <header className={`sticky top-0 z-[60] bg-background/95 backdrop-blur-md border-b transition-shadow duration-300 overflow-x-clip ${isScrolled ? 'shadow-md border-border' : 'border-transparent'}`}>
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center justify-between min-w-0">
          <NavbarLogo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ml-6 xl:ml-10 min-w-0 flex-shrink">
            <Link to="/" className="font-medium text-muted-foreground hover:text-romania-blue transition-colors whitespace-nowrap text-sm px-3 py-2 rounded-md hover:bg-muted">
              {t('nav.home')}
            </Link>
            <Link to="/categories" className="font-medium text-muted-foreground hover:text-romania-blue transition-colors whitespace-nowrap text-sm px-3 py-2 rounded-md hover:bg-muted">
              {t('nav.business')}
            </Link>
            <ResourcesDropdown />
            <Link to="/about" className="font-medium text-muted-foreground hover:text-romania-blue transition-colors whitespace-nowrap text-sm px-3 py-2 rounded-md hover:bg-muted">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="font-medium text-muted-foreground hover:text-romania-blue transition-colors whitespace-nowrap text-sm px-3 py-2 rounded-md hover:bg-muted">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 ml-auto pl-4 flex-shrink-0">
            {user && (
              <div className="hidden 2xl:flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Logged in as</span>
                <span className="text-xs font-semibold text-romania-blue truncate max-w-[120px]">{user.email}</span>
              </div>
            )}
            <NavbarLanguageSwitcher />
            {user ? (
              <>
                <Link to="/account" className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1 text-sm">
                  <UserIcon className="h-4 w-4" />
                  {t('nav.account')}
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="relative bg-romania-red hover:bg-red-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-colors text-sm whitespace-nowrap flex items-center gap-1">
                    {t('nav.adminDashboard')}
                    {pendingCount > 0 && (
                      <span className="bg-white text-romania-red text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {pendingCount > 9 ? '9+' : pendingCount}
                      </span>
                    )}
                  </Link>
                )}
              </>
            ) : (
              <Link to="/auth" className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded-lg transition-colors text-sm">
                {t('nav.login')}
              </Link>
            )}
            <Link to="/add-business" className="bg-romania-yellow hover:bg-yellow-400 text-foreground font-semibold py-1.5 px-4 rounded-lg transition-colors whitespace-nowrap text-sm shadow-sm">
              {t('nav.addBusiness')}
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              className="text-muted-foreground cursor-pointer p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              aria-label="Toggle search"
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              className="text-muted-foreground p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search input */}
        {isMobileSearchOpen && (
          <div className="lg:hidden mt-3 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder={t('nav.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-border focus:outline-none focus:border-romania-blue transition-colors bg-background"
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
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-2xl z-50 lg:hidden animate-slide-in-right overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-muted-foreground" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1">
                <Link to="/" className="font-medium text-muted-foreground hover:text-romania-blue hover:bg-muted/50 transition-all py-3 px-4 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.home')}
                </Link>
                <Link to="/categories" className="font-medium text-muted-foreground hover:text-romania-blue hover:bg-muted/50 transition-all py-3 px-4 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.business')}
                </Link>
                <MobileResourcesAccordion onClose={() => setIsMobileMenuOpen(false)} />
                <Link to="/about" className="font-medium text-muted-foreground hover:text-romania-blue hover:bg-muted/50 transition-all py-3 px-4 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.about')}
                </Link>
                <Link to="/contact" className="font-medium text-muted-foreground hover:text-romania-blue hover:bg-muted/50 transition-all py-3 px-4 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.contact')}
                </Link>

                <div className="my-4 border-t border-border" />

                <NavbarLanguageSwitcher variant="mobile" onSelect={() => setIsMobileMenuOpen(false)} />

                <div className="mt-4" />

                {user ? (
                  <div className="flex flex-col gap-2 w-full">
                    <div className="bg-romania-blue/10 p-4 rounded-lg mb-2">
                      <p className="text-xs text-muted-foreground mb-1">Logged in as</p>
                      <p className="text-sm font-semibold text-romania-blue truncate">{user.email}</p>
                    </div>
                    <Link to="/my-businesses" className="bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 px-6 rounded-lg transition-all text-left w-full active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('nav.myBusinesses')}
                    </Link>
                    <Link to="/account" className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-left flex items-center gap-2 w-full active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
                      <UserIcon className="h-5 w-5" />
                      {t('nav.account')}
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="bg-romania-red hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-left w-full active:scale-95 flex items-center justify-between" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="flex items-center gap-2">
                          <Bell className="h-5 w-5" />
                          {t('nav.adminDashboard')}
                        </span>
                        {pendingCount > 0 && (
                          <span className="bg-white text-romania-red text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                            {pendingCount > 9 ? '9+' : pendingCount}
                          </span>
                        )}
                      </Link>
                    )}
                    <Link to="/add-business" className="bg-romania-yellow hover:bg-yellow-400 text-foreground font-semibold py-3 px-6 rounded-lg transition-all text-left w-full active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('nav.addBusiness')}
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/auth" className="bg-romania-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-center w-full active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('nav.login')}
                    </Link>
                    <Link to="/add-business" className="bg-romania-yellow hover:bg-yellow-400 text-foreground font-semibold py-3 px-6 rounded-lg transition-all text-center w-full active:scale-95 mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('nav.addBusiness')}
                    </Link>
                  </>
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
