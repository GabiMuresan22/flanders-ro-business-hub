
import React from 'react';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-romania-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/romania-pattern.png')] bg-repeat opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            Own a Romanian Business in West Flanders?
          </h2>
          <p className="text-white/90 text-xl mb-8">
            Join our directory to increase your visibility and connect with the local community. 
            Listing your business is quick, easy, and helps customers find you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/add-business" 
              className="bg-romania-yellow hover:bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Add Your Business
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
