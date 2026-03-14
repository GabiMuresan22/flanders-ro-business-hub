import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, FileText, BookOpen, Wrench, HelpCircle, Calculator, TrendingUp, Receipt, PiggyBank } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TOOLS_ITEMS = [
  { labelKey: 'nav.cashFlowCalc', to: '/calculator-cash-flow', icon: Calculator },
  { labelKey: 'nav.roiCalc', to: '/calculator-roi', icon: TrendingUp },
  { labelKey: 'nav.taxCalc', to: '/calculator-taxe-belgia', icon: Receipt },
  { labelKey: 'nav.profitCalc', to: '/calculator-profit', icon: PiggyBank },
] as const;

interface Props {
  onClose: () => void;
}

const MobileResourcesAccordion = ({ onClose }: Props) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center justify-between w-full font-medium text-muted-foreground hover:text-romania-blue hover:bg-muted/50 transition-all py-3 px-4 rounded-lg"
      >
        {t('nav.resources')}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="ml-4 mt-1 space-y-1 animate-fade-in">
          <Link
            to="/resurse"
            onClick={onClose}
            className="flex items-center gap-3 py-2.5 px-4 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <FileText className="h-4 w-4 text-romania-blue" />
            {t('nav.articles')}
          </Link>
          <Link
            to="/resurse?type=ghiduri"
            onClick={onClose}
            className="flex items-center gap-3 py-2.5 px-4 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <BookOpen className="h-4 w-4 text-romania-blue" />
            {t('nav.guides')}
          </Link>

          {/* Tools accordion */}
          <div>
            <button
              type="button"
              onClick={() => setIsToolsOpen((o) => !o)}
              className="flex items-center justify-between w-full py-2.5 px-4 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              <span className="flex items-center gap-3">
                <Wrench className="h-4 w-4 text-romania-blue" />
                {t('nav.tools')}
              </span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {isToolsOpen && (
              <div className="ml-4 mt-1 space-y-1 animate-fade-in">
                {TOOLS_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center gap-3 py-2.5 px-4 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-romania-yellow" />
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/faq"
            onClick={onClose}
            className="flex items-center gap-3 py-2.5 px-4 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <HelpCircle className="h-4 w-4 text-romania-blue" />
            {t('nav.faq')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileResourcesAccordion;
