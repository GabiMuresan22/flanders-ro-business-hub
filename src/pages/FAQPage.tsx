import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';

const FAQ_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const FAQPage = () => {
  const { t } = useLanguage();

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((i) => ({
      "@type": "Question",
      "name": t(`faq.q${i}`),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t(`faq.a${i}`)
      }
    }))
  };

  return (
    <>
      <SEO 
        title={t('faq.seoTitle')}
        description={t('faq.seoDescription')}
        keywords={t('faq.seoKeywords')}
        type="website"
      />
      <StructuredData data={faqStructuredData} />
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl font-bold mb-2 text-romania-blue">{t('faq.title')}</h1>
          <div className="h-1 w-20 bg-romania-yellow mb-8"></div>
          
          <p className="text-gray-700 mb-10">
            {t('faq.intro')}
          </p>

          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">
                {t('faq.q1')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('faq.a1')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">
                {t('faq.q2')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('faq.a2')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                {t('faq.q3')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('faq.a3')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">
                {t('faq.q4')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('faq.a4')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">
                {t('faq.q5')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('faq.a5')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium">
                {t('faq.q6')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('faq.a6')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-medium">
                {t('faq.q7')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('faq.a7')}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-medium">
                {t('faq.q8')}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {t('faq.a8')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h2 className="font-playfair text-2xl font-semibold mb-4 text-romania-blue">{t('faq.stillHaveQuestions')}</h2>
            <p className="text-gray-600 mb-4">
              {t('faq.stillHaveQuestionsText')}
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-romania-blue text-white px-6 py-2 rounded hover:bg-blue-800 transition-colors"
            >
              {t('faq.contactUs')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
