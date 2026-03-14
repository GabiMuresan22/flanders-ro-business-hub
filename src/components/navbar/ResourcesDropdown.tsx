import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, FileText, BookOpen, Wrench, HelpCircle, Calculator, TrendingUp, Receipt, PiggyBank } from 'lucide-react';
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
    }, 250);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

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

  const closeAll = () => { setIsOpen(false); setIsToolsOpen(false); };

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
        className="flex items-center gap-1 font-medium text-muted-foreground hover:text-romania-blue transition-colors whitespace-nowrap text-sm py-2 px-3 rounded-md hover:bg-muted"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {t('nav.resources')}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 bg-popover border border-border rounded-xl shadow-xl z-[100] min-w-[280px] animate-fade-in">
          <div className="py-2">
            <Link to="/resurse" onClick={closeAll} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors rounded-lg mx-1">
              <FileText className="h-4 w-4 text-romania-blue" />
              {t('nav.articles')}
            </Link>
            <Link to="/resurse?type=ghiduri" onClick={closeAll} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors rounded-lg mx-1">
              <BookOpen className="h-4 w-4 text-romania-blue" />
              {t('nav.guides')}
            </Link>

            {/* Tools - inline expand */}
            <button
              type="button"
              onClick={() => setIsToolsOpen((o) => !o)}
              className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors rounded-lg mx-1"
              style={{ width: 'calc(100% - 0.5rem)' }}
            >
              <span className="flex items-center gap-3">
                <Wrench className="h-4 w-4 text-romania-blue" />
                {t('nav.tools')}
              </span>
              <ChevronRight className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${isToolsOpen ? 'rotate-90' : ''}`} />
            </button>

            {isToolsOpen && (
              <div className="ml-4 mr-1 mb-1 border-l-2 border-romania-blue/20 animate-fade-in">
                {TOOLS_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeAll}
                    className="flex items-center gap-3 pl-4 pr-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors rounded-lg"
                  >
                    <item.icon className="h-4 w-4 text-romania-yellow" />
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>
            )}

            <div className="mx-3 my-1 border-t border-border" />

            <Link to="/faq" onClick={closeAll} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors rounded-lg mx-1">
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
