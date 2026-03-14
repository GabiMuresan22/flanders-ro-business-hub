import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, FileText, BookOpen, Wrench, HelpCircle, Calculator, TrendingUp, Receipt, PiggyBank } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TOOLS_ITEMS = [
  { labelKey: 'nav.cashFlowCalc', to: '/calculator-cash-flow', icon: Calculator },
  { labelKey: 'nav.roiCalc', to: '/calculator-roi', icon: TrendingUp },
  { labelKey: 'nav.taxCalc', to: '/calculator-taxe-belgia', icon: Receipt },
  { labelKey: 'nav.profitCalc', to: '/calculator-profit', icon: PiggyBank },
] as const;

const ResourcesDropdown = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsToolsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-1 font-medium text-muted-foreground hover:text-romania-blue transition-colors whitespace-nowrap text-sm py-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {t('nav.resources')}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 bg-popover border border-border rounded-xl shadow-xl z-[100] min-w-[240px] animate-fade-in overflow-hidden">
          <div className="py-2">
            <Link
              to="/resurse"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <FileText className="h-4 w-4 text-romania-blue" />
              {t('nav.articles')}
            </Link>
            <Link
              to="/resurse?type=ghiduri"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <BookOpen className="h-4 w-4 text-romania-blue" />
              {t('nav.guides')}
            </Link>

            {/* Tools with nested submenu */}
            <div
              className="relative"
              onMouseEnter={() => setIsToolsOpen(true)}
              onMouseLeave={() => setIsToolsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsToolsOpen((o) => !o)}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors w-full"
              >
                <span className="flex items-center gap-3">
                  <Wrench className="h-4 w-4 text-romania-blue" />
                  {t('nav.tools')}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isToolsOpen ? '-rotate-90' : '-rotate-90'} hidden lg:block`} />
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''} lg:hidden`} />
              </button>

              {isToolsOpen && (
                <div className="lg:absolute lg:left-full lg:top-0 lg:ml-1 lg:bg-popover lg:border lg:border-border lg:rounded-xl lg:shadow-xl lg:min-w-[220px] lg:animate-fade-in bg-muted/50 lg:bg-popover">
                  <div className="py-2">
                    {TOOLS_ITEMS.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => { setIsOpen(false); setIsToolsOpen(false); }}
                        className="flex items-center gap-3 px-4 lg:px-4 pl-12 lg:pl-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-romania-yellow" />
                        {t(item.labelKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mx-3 my-1 border-t border-border" />

            <Link
              to="/faq"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
            >
              <HelpCircle className="h-4 w-4 text-romania-blue" />
              {t('nav.faq')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesDropdown;
