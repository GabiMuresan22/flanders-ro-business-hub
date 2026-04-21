import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { openCookiePreferences } from '@/components/CookieConsent';

const Footer = () => {
  const { language, t } = useLanguage();
  const cookieSettingsLabel = {
    en: 'Cookie settings',
    ro: 'Setari cookie',
    nl: 'Cookie-instellingen',
  }[language];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8" role="contentinfo">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* ── Column 1: Legal Identity ── */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-5 text-white">
              {t('footer.legalIdentity')}
            </h3>
            <address className="not-italic space-y-3 text-sm">
              <p className="font-medium text-white">Gabriel Muresan</p>
              <p className="text-gray-400 text-xs">Romanian Business Hub</p>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-romania-blue" />
                <span>Lucien Boekstalestraat 6<br />8800 Roeselare, Belgium</span>
              </div>

              <p>
                <span className="text-gray-400 text-xs uppercase tracking-wider block mb-0.5">KBO / BTW</span>
                BE 1030.197.309
              </p>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-romania-blue" />
                <a
                  href="mailto:info@ro-businesshub.be"
                  className="hover:text-white transition-colors"
                >
                  info@ro-businesshub.be
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-romania-blue" />
                <a
                  href="tel:+32467789259"
                  className="hover:text-white transition-colors"
                >
                  +32 467 789 259
                </a>
              </div>
            </address>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <nav aria-label="Footer navigation">
            <h3 className="font-playfair text-lg font-semibold mb-5 text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/legal-notice" className="hover:text-white transition-colors">
                  {t('footer.legalNotice')}
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-white transition-colors">
                  {t('footer.termsConditions')}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="hover:text-white transition-colors"
                >
                  {cookieSettingsLabel}
                </button>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/add-business" className="hover:text-white transition-colors">
                  {t('nav.addBusiness')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* ── Column 3: Mission ── */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-5 text-white">
              {t('footer.mission')}
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              {t('footer.missionText')}
            </p>

            {/* Social links */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">{t('footer.followUs')}</p>
              <a
                href="https://www.facebook.com/profile.php?id=61587106051572"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Facebook
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
