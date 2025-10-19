
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CtaSection from '../components/CtaSection';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <>
      <SEO 
        title="About Us - Romanian Business Hub West Flanders"
        description="Learn about Romanian Business Hub, our mission to connect Romanian businesses with the local community in West Flanders, Belgium. Supporting Romanian entrepreneurs since 2025."
        keywords="about Romanian Business Hub, Romanian community Belgium, Romanian entrepreneurs West Flanders, Romanian business directory"
        type="website"
      />
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
                <p className="mb-12">
                  The Romanian Business Hub is dedicated to promoting and supporting Romanian-owned businesses 
                  in West Flanders. Our platform connects these businesses with the local community, 
                  helping them increase their visibility and customer base while preserving and sharing 
                  Romanian culture and expertise.
                </p>
                
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-12">What We're Building</h2>
                <p className="mb-6">
                  Our vision is to create a comprehensive, easy-to-use directory of Romanian businesses across 
                  West Flanders. We want to make it simple for customers to find the authentic Romanian products 
                  and services they're looking for. The platform will feature detailed business profiles, contact 
                  information, and operating hours to connect you with the right businesses for your needs.
                </p>
                <p className="mb-4">Our goals are to:</p>
                <ul className="list-disc pl-6 mb-12">
                  <li className="mb-3">Showcase Romanian businesses to the wider community.</li>
                  <li className="mb-3">Help customers discover authentic Romanian products and services.</li>
                  <li className="mb-3">Support Romanian entrepreneurs in building successful businesses.</li>
                  <li className="mb-3">Foster strong connections within the Romanian-Belgian community.</li>
                  <li className="mb-3">Promote cultural exchange through business and community relationships.</li>
                </ul>
                
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-12">Our Story</h2>
                <p className="mb-6">
                  The idea for the Romanian Business Hub came from seeing the same questions asked over and over 
                  in community Facebook groups: "Can anyone recommend a good Romanian mechanic?" or "Where can I 
                  find the best authentic ingredients for the holidays?"
                </p>
                <p className="mb-6">
                  I saw a clear need. While our community is full of talented entrepreneurs and skilled professionals, 
                  finding them was a challenge. Recommendations were scattered across countless posts and easily lost. 
                  I knew there had to be a better way to bring everyone together.
                </p>
                <p className="mb-12">
                  That's why I decided to build the Romanian Business Hub. My goal is to create a single, central 
                  platform where every Romanian-owned business in West Flanders can be seen and where every customer 
                  can easily find them. It's about taking that powerful community spirit from social media and giving 
                  it a permanent, professional home.
                </p>
                
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-12">Get Ready to Join Our Community</h2>
                <p className="mb-6">
                  We are preparing for our launch! Whether you're a Romanian business owner looking to increase your 
                  visibility or a customer seeking authentic products and services, we invite you to be part of our 
                  journey from the very beginning.
                </p>
                <p className="mb-6">
                  <strong>Business Owners:</strong> Get in touch to be one of the first businesses featured when we go live.
                </p>
                <p>
                  <strong>Customers:</strong> Sign up for our newsletter to be the first to know when the platform 
                  launches, so you can start exploring the best Romanian businesses in West Flanders.
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
