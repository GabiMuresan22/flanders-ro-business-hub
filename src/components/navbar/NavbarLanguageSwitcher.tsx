import { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LANG_LABELS: Record<string, string> = {
  en: 'English',
  ro: 'Română',
  nl: 'Nederlands',
};
const LANG_SHORT: Record<string, string> = {
  en: 'EN',
  ro: 'RO',
  nl: 'NL',
};

interface Props {
  variant?: 'desktop' | 'mobile';
  onSelect?: () => void;
}

const NavbarLanguageSwitcher = ({ variant = 'desktop', onSelect }: Props) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-dropdown')) setIsOpen(false);
    };
    const timer = setTimeout(() => document.addEventListener('click', handler), 0);
    return () => { clearTimeout(timer); document.removeEventListener('click', handler); };
  }, [isOpen]);

  if (variant === 'mobile') {
    return (
      <div className="flex gap-2">
        {Object.entries(LANG_LABELS).map(([code, _label]) => (
          <button
            key={code}
            onClick={() => { setLanguage(code as 'en' | 'ro' | 'nl'); onSelect?.(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all text-sm ${language === code ? 'bg-romania-blue text-white' : 'bg-muted hover:bg-muted/80 text-foreground'}`}
          >
            {LANG_SHORT[code]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative lang-dropdown">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setIsOpen((o) => !o); }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-muted transition-colors text-sm font-medium text-muted-foreground"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Languages className="h-4 w-4" />
        {LANG_SHORT[language]}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-popover border border-border rounded-lg shadow-lg z-[100] min-w-[130px]">
          {Object.entries(LANG_LABELS).map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => { setLanguage(code as 'en' | 'ro' | 'nl'); setIsOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${language === code ? 'font-bold text-romania-blue' : 'text-foreground'}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavbarLanguageSwitcher;
