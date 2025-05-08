
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CtaSection from '../components/CtaSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-romania-blue py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white text-center">
              About Romanian Business Hub
            </h1>
          </div>
        </div>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="font-playfair text-2xl font-bold text-gray-900">Our Mission</h2>
                <p>
                  The Romanian Business Hub is dedicated to promoting and supporting Romanian-owned businesses 
                  in West Flanders. Our platform connects these businesses with the local community, 
                  helping them increase their visibility and customer base while preserving and sharing 
                  Romanian culture and expertise.
                </p>
                
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-8">What We Do</h2>
                <p>
                  We provide a comprehensive directory of Romanian businesses across West Flanders, making it 
                  easy for customers to find authentic Romanian products and services. Our platform includes 
                  detailed business information, contact details, and operating hours to help connect 
                  customers with the right businesses for their needs.
                </p>
                <ul className="list-disc pl-6">
                  <li>Showcase Romanian businesses to the wider community</li>
                  <li>Help customers discover authentic Romanian products and services</li>
                  <li>Support Romanian entrepreneurs in building successful businesses</li>
                  <li>Foster connections within the Romanian-Belgian community</li>
                  <li>Promote cultural exchange through business relationships</li>
                </ul>
                
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-8">Our Story</h2>
                <p>
                  The Romanian Business Hub was founded in 2025 by a group of Romanian entrepreneurs living in 
                  Belgium who recognized the need for better visibility for Romanian-owned businesses in the region. 
                  What started as a simple spreadsheet of contacts has grown into a comprehensive online platform 
                  that serves both business owners and customers throughout West Flanders.
                </p>
                <p>
                  Today, our directory includes dozens of businesses across multiple categories, from restaurants 
                  and bakeries to service providers and retail shops. We continue to grow our network and improve 
                  our platform to better serve the Romanian business community in Belgium.
                </p>
                
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-8">Join Our Community</h2>
                <p>
                  Whether you're a Romanian business owner looking to increase your visibility or a customer 
                  seeking authentic Romanian products and services, we invite you to join our community. 
                  Business owners can list their businesses for free, and customers can easily search and 
                  discover the best Romanian businesses in West Flanders.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
