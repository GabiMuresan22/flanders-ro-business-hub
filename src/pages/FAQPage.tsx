
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const FAQPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl font-bold mb-2 text-romania-blue">Frequently Asked Questions</h1>
          <div className="h-1 w-20 bg-romania-yellow mb-8"></div>
          
          <p className="text-gray-700 mb-10">
            Find answers to the most common questions about the Romanian Business Hub and how it can help you.
          </p>

          <Accordion type="single" collapsible className="mb-12">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">
                What is the Romanian Business Hub?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Romanian Business Hub is an online directory connecting Romanian-owned businesses in West Flanders with local customers. 
                We aim to help people easily find Romanian services, products, and expertise in the region.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">
                How can I add my business to the directory?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can add your business by clicking on the "Add Your Business" link in the footer or navigation menu. 
                You'll need to provide basic information about your business including name, address, contact details, 
                category, and a brief description. Once submitted, we'll review your listing and publish it on approval.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">
                Is this service only for Romanian-owned businesses?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, our platform specifically focuses on businesses owned or operated by Romanians in West Flanders. 
                This helps create a specialized community and resource for Romanian entrepreneurs and those seeking 
                Romanian products or services.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">
                Is listing my business free?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Basic listings are completely free of charge. We also offer premium listing options with additional 
                features such as highlighted placement, more photos, and extended business descriptions for a small fee.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">
                How can I update my business information?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Once you've registered and created your business profile, you can log in at any time to update your 
                information. If you encounter any difficulties, please contact our support team.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium">
                Can users leave reviews for businesses?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, registered users can leave reviews and ratings for businesses they've used. This helps build 
                trust within the community and provides valuable feedback to business owners.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-medium">
                How do I search for specific businesses?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can search for businesses using the search bar at the top of the page. You can search by business name, 
                category, or location. You can also browse businesses by category from our categories page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-medium">
                I found incorrect information about a business. What should I do?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                If you notice incorrect information about a business, please use our "Report an Issue" feature located 
                on each business listing page. Our team will investigate and make necessary corrections.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
            <h2 className="font-playfair text-2xl font-semibold mb-4 text-romania-blue">Still have questions?</h2>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer to your question, please don't hesitate to contact us directly.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-romania-blue text-white px-6 py-2 rounded hover:bg-blue-800 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
