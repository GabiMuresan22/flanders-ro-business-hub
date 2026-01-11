import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CtaSection from '../components/CtaSection';
import SEO from '../components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title={t('about.seoTitle')}
        description={t('about.seoDescription')}
        keywords={t('about.seoKeywords')}
        type="website"
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="bg-romania-blue py-12">
            <div className="container mx-auto px-4">
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white text-center">
                {t('about.title')}
              </h1>
            </div>
          </div>
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-playfair text-2xl font-bold text-gray-900">{t('about.missionTitle')}</h2>
                  <p className="mb-12">
                    {t('about.missionText')}
                  </p>
                  
                  <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-12">{t('about.buildingTitle')}</h2>
                  <p className="mb-6">
                    {t('about.buildingText1')}
                  </p>
                  <p className="mb-4">{t('about.buildingGoals')}</p>
                  <ul className="list-disc pl-6 mb-12">
                    <li className="mb-3">{t('about.goal1')}</li>
                    <li className="mb-3">{t('about.goal2')}</li>
                    <li className="mb-3">{t('about.goal3')}</li>
                    <li className="mb-3">{t('about.goal4')}</li>
                    <li className="mb-3">{t('about.goal5')}</li>
                  </ul>
                  
                  <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-12">{t('about.storyTitle')}</h2>
                  <p className="mb-6">
                    {t('about.storyText1')}
                  </p>
                  <p className="mb-6">
                    {t('about.storyText2')}
                  </p>
                  <p className="mb-12">
                    {t('about.storyText3')}
                  </p>
                  
                  <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-12">{t('about.joinTitle')}</h2>
                  <p className="mb-6">
                    {t('about.joinText1')}
                  </p>
                  <p className="mb-6">
                    <strong>{t('about.joinBusinessOwners')}</strong> {t('about.joinBusinessOwnersText')}
                  </p>
                  <p>
                    <strong>{t('about.joinCustomers')}</strong> {t('about.joinCustomersText')}
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
