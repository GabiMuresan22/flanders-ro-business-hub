
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import BusinessDetailsSkeleton from '../components/skeletons/BusinessDetailsSkeleton';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  const fetchBusiness = async () => {
    if (!id) return;
    
    const { data } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .eq('status', 'approved')
      .single();

    setBusiness(data);
    setLoading(false);
  };

  const fetchReviews = async () => {
    if (!id) return;
    
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', id)
      .order('created_at', { ascending: false });

    if (data) {
      setReviews(data);
      if (data.length > 0) {
        const avg = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    }
  };

  useEffect(() => {
    fetchBusiness();
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BusinessDetailsSkeleton />
        <Footer />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the business you are looking for does not exist or has been removed.</p>
            <Link to="/" className="bg-romania-blue text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const businessStructuredData = business ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": business.business_name,
    "description": business.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address,
      "addressLocality": business.city,
      "postalCode": business.postal_code,
      "addressCountry": "BE"
    },
    "telephone": business.phone,
    "email": business.email,
    ...(business.website && { "url": business.website }),
    ...(averageRating > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating,
        "reviewCount": reviews.length,
        "bestRating": "5",
        "worstRating": "1"
      }
    })
  } : null;

  return (
    <>
      {business && (
        <>
          <SEO 
            title={`${business.business_name} - ${business.category} in ${business.city} | Romanian Business Hub`}
            description={`${business.description.substring(0, 150)}... Find ${business.business_name} in ${business.city}, West Flanders. Contact: ${business.phone}`}
            keywords={`${business.business_name}, ${business.category}, Romanian business ${business.city}, ${business.category} West Flanders`}
            type="business.business"
          />
          {businessStructuredData && <StructuredData data={businessStructuredData} />}
        </>
      )}
      <div className="min-h-screen flex flex-col">
        <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="h-64 md:h-80 bg-gray-200 relative">
          <div className="w-full h-full bg-gradient-to-br from-romania-blue to-romania-red opacity-80"></div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="container mx-auto">
              <span className="inline-block bg-romania-yellow text-gray-900 text-sm font-medium px-3 py-1 rounded-full mb-2">
                {business.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-white">{business.business_name}</h1>
            </div>
          </div>
        </div>
        
        {/* Business Details */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 mb-6">{business.description}</p>
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">
                  Reviews {averageRating > 0 && `(${averageRating} ⭐)`}
                </h2>
                
                <ReviewForm businessId={id!} onReviewSubmitted={fetchReviews} />
                
                <div className="mt-6 space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No reviews yet. Be the first to leave a review!
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-playfair text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-romania-blue mr-3 mt-0.5" />
                    <div>
                      <p className="text-gray-600">{business.address}</p>
                      <p className="text-gray-600">{business.city}, {business.postal_code}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-romania-blue mr-3" />
                    <a href={`tel:${business.phone}`} className="text-gray-600 hover:text-romania-blue">
                      {business.phone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-romania-blue mr-3" />
                    <a href={`mailto:${business.email}`} className="text-gray-600 hover:text-romania-blue">
                      {business.email}
                    </a>
                  </div>
                  {business.website && (
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-romania-blue mr-3" />
                      <a href={business.website} className="text-romania-blue hover:underline" target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address}, ${business.city}, Belgium`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full bg-romania-blue text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default BusinessDetails;
