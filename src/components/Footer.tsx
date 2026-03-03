
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-100 pt-12 pb-8" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-4 text-romania-blue">Romanian Business Hub</h3>
            <p className="text-gray-600 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              <a 
                href="https://www.facebook.com/profile.php?id=61587106051572" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-romania-blue hover:text-romania-red transition-colors focus:outline-none focus:ring-2 focus:ring-romania-blue focus:ring-offset-2 rounded"
                aria-label="Follow us on Facebook"
                role="listitem"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <nav aria-label="Business categories">
            <h3 className="font-playfair text-xl font-semibold mb-4 text-romania-blue">{t('footer.categories')}</h3>
            <ul className="space-y-2">
              <li><Link to="/category/restaurant-food" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryRestaurants')}</Link></li>
              <li><Link to="/category/bakery" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryBakeries')}</Link></li>
              <li><Link to="/category/grocery" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryGrocery')}</Link></li>
              <li><Link to="/category/car-services" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryCarServices')}</Link></li>
              <li><Link to="/category/beauty-wellness" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryBeauty')}</Link></li>
              <li><Link to="/category/cosmetician" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryCosmetician')}</Link></li>
              <li><Link to="/category/construction" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryConstruction')}</Link></li>
              <li><Link to="/category/photo-video" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryPhotoVideo')}</Link></li>
              <li><Link to="/category/gift-flowers" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryGiftFlowers')}</Link></li>
              <li><Link to="/category/it-marketing" className="text-gray-600 hover:text-romania-blue">{t('footer.categoryITMarketing')}</Link></li>
            </ul>
          </nav>
          
          <nav aria-label="Quick links">
            <h3 className="font-playfair text-xl font-semibold mb-4 text-romania-blue">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-romania-blue">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-romania-blue">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-romania-blue">{t('nav.contact')}</Link></li>
              <li><Link to="/add-business" className="text-gray-600 hover:text-romania-blue">{t('nav.addBusiness')}</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-romania-blue">{t('nav.faq')}</Link></li>
              <li><Link to="/resurse" className="text-gray-600 hover:text-romania-blue">{t('resources.title')}</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-romania-blue">{t('footer.privacyPolicy')}</Link></li>
              <li><Link to="/terms-conditions" className="text-gray-600 hover:text-romania-blue">{t('footer.termsConditions')}</Link></li>
              <li><Link to="/accessibility" className="text-gray-600 hover:text-romania-blue">{t('footer.accessibility')}</Link></li>
            </ul>
          </nav>
          
          <address className="not-italic">
            <h3 className="font-playfair text-xl font-semibold mb-4 text-romania-blue">{t('footer.contact')}</h3>
            <p className="text-gray-600 mb-2">
              <a href="mailto:info@ro-businesshub.be" className="hover:text-romania-blue focus:outline-none focus:underline">
                info@ro-businesshub.be
              </a>
            </p>
            <p className="text-gray-600 mb-2">
              <a href="tel:+32467789259" className="hover:text-romania-blue focus:outline-none focus:underline">
                +32 467 78 92 59
              </a>
            </p>
            <p className="text-gray-600">8800 Roeselare,<br /> West Flanders, Belgium</p>
          </address>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-700 text-center text-sm">
            © {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
