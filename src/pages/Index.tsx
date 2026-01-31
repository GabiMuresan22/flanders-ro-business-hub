
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import FeaturedBusinesses from '../components/FeaturedBusinesses';
import RecentlyAddedBusinesses from '../components/RecentlyAddedBusinesses';
import CategoriesSection from '../components/CategoriesSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import StatisticsSection from '../components/StatisticsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import CtaSection from '../components/CtaSection';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import SkipToContent from '../components/SkipToContent';

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Romanian Business Hub",
    "description": "Directory of Romanian businesses in West Flanders, Belgium",
    "url": "https://yoursite.lovable.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://yoursite.lovable.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "about": {
      "@type": "Organization",
      "name": "Romanian Business Hub",
      "description": "Connecting Romanian businesses and community in West Flanders, Belgium"
    }
  };

  return (
    <>
      <SEO 
        title="Romanian Business Hub - Find Romanian Businesses in West Flanders, Belgium"
        description="Discover trusted Romanian businesses in West Flanders, Belgium. Find restaurants, bakeries, construction services, beauty salons, and more from the vibrant Romanian community."
        keywords="Romanian businesses Belgium, Romanian services West Flanders, Romanian restaurants Belgium, Romanian bakery, Romanian construction, Romanian community Belgium"
      />
      <StructuredData data={structuredData} />
      
      <div className="min-h-screen flex flex-col">
        <SkipToContent />
        <Navbar />
        <main id="main-content" className="flex-grow" tabIndex={-1}>
          <HeroSection />
          <RecentlyAddedBusinesses />
          <FeaturedBusinesses />
          <CategoriesSection />
          <WhyChooseUsSection />
          <StatisticsSection />
          <TestimonialsSection />
          <NewsletterSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
