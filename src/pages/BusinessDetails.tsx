import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import BusinessDetailsSkeleton from '../components/skeletons/BusinessDetailsSkeleton';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { MapPin, Phone, Mail, Globe, Star, Home } from 'lucide-react';
import { categoryToSlug } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PublicBusiness, ReviewRow } from '@/types/database';

// Extended type for public business with contact info from updated view
type PublicBusinessWithContact = PublicBusiness & {
  phone?: string | null;
  email?: string | null;
};

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [business, setBusiness] = useState<PublicBusinessWithContact | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const fetchBusiness = useCallback(async () => {
    if (!id) return;
    
    const { data } = await supabase
      .from('public_businesses')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    setBusiness(data);
    setLoading(false);
  }, [id]);

  const fetchReviews = useCallback(async () => {
    if (!id) return;
    
    // Fetch reviews
    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', id)
      .order('created_at', { ascending: false });

    if (reviewsData) {
      // Fetch profile names for each reviewer
      const userIds = [...new Set(reviewsData.map(r => r.user_id))];
      const { data: profilesData } = await supabase
        .from('public_profiles')
        .select('user_id, full_name')
        .in('user_id', userIds);
      
      // Map profiles to reviews
      const profileMap = new Map(profilesData?.map(p => [p.user_id, p.full_name]) || []);
      const reviewsWithProfiles = reviewsData.map(review => ({
        ...review,
        profiles: { full_name: profileMap.get(review.user_id) || null }
      }));
      
      setReviews(reviewsWithProfiles);
      if (reviewsData.length > 0) {
        const avg = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchBusiness();
    fetchReviews();
  }, [fetchBusiness, fetchReviews]);

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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('businessDetails.notFoundTitle')}</h2>
            <p className="text-gray-600 mb-6">{t('businessDetails.notFoundMessage')}</p>
            <Link to="/" className="bg-romania-blue text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              {t('businessDetails.returnHome')}
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

  const getCategoryTranslation = () => {
    const key = `businessCategories.${business.category}`;
    const out = t(key);
    return out === key ? business.category : out;
  };

  return (
    <>
      {business && (
        <>
          <SEO 
            title={`${business.business_name} - ${business.category} in ${business.city} | Romanian Business Hub`}
            description={`${business.description?.substring(0, 150)}... Find ${business.business_name} in ${business.city}, West Flanders. Contact: ${business.phone}`}
            keywords={`${business.business_name}, ${business.category}, Romanian business ${business.city}, ${business.category} West Flanders`}
            type="business.business"
          />
          {businessStructuredData && <StructuredData data={businessStructuredData} />}
        </>
      )}
      <div className="min-h-screen flex flex-col bg-muted/30">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Image */}
          <div className="h-64 md:h-80 relative">
            {business.image_url ? (
              <img 
                src={business.image_url} 
                alt={business.business_name || ''} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add('bg-gradient-to-br', 'from-romania-blue', 'to-romania-red');
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-romania-blue to-romania-red"></div>
            )}
          </div>
          
          {/* Breadcrumb & Business Title Section */}
          <div className="bg-card border-b">
            <div className="container mx-auto px-4 py-6">
              {/* Breadcrumb Navigation */}
              <Breadcrumb className="mb-4">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="flex items-center gap-1">
                        <Home className="h-4 w-4" />
                        <span>{t('common.home')}</span>
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={`/category/${categoryToSlug(business.category || '')}`}>
                        {getCategoryTranslation()}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{business.business_name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              {/* Title centered */}
              <div className="text-center">
                <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 uppercase tracking-wide">
                  {business.business_name}
                </h1>
                <span className="inline-block bg-romania-blue text-white text-sm font-medium px-6 py-2 rounded-full">
                  {getCategoryTranslation()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Three-column cards section */}
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* About Us Card */}
              <div className="bg-card rounded-xl shadow-lg p-6 lg:p-8">
                <h2 className="font-playfair text-xl font-bold text-foreground mb-4">
                  {t('businessDetails.about')}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {language === 'en' || language === 'nl'
                    ? ((business as any).description_en || business.description || '')
                    : (business.description || (business as any).description_en || '')}
                </div>
              </div>

              {/* Reviews Card */}
              <div className="bg-card rounded-xl shadow-lg p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-playfair text-xl font-bold text-foreground">
                    {t('businessDetails.reviews')}
                  </h2>
                  <Button 
                    variant="default"
                    size="sm"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-romania-blue hover:bg-romania-blue/90"
                  >
                    {t('businessDetails.leaveReview')}
                  </Button>
                </div>
                
                {/* Rating summary */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span className="font-semibold text-foreground">{averageRating.toFixed(1)}</span>
                    <span>({reviews.length} {reviews.length === 1 ? t('businessDetails.review') : t('businessDetails.reviewsCount')})</span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <= Math.round(averageRating)
                            ? 'fill-romania-yellow text-romania-yellow'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Reviews list or empty state */}
                {reviews.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground font-medium">
                      {t('businessDetails.noReviews')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('businessDetails.beFirstReview')}
                    </p>
                  </div>
                )}

                {/* Review form - toggleable */}
                {showReviewForm && (
                  <div className="mt-4 pt-4 border-t">
                    <ReviewForm 
                      businessId={id!} 
                      onReviewSubmitted={() => {
                        fetchReviews();
                        setShowReviewForm(false);
                      }} 
                    />
                  </div>
                )}
              </div>

              {/* Contact Information Card */}
              <div className="bg-romania-blue rounded-xl shadow-lg p-6 lg:p-8 text-white">
                <h2 className="font-playfair text-xl font-bold mb-6">
                  {t('businessDetails.contactInfo')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white/80 text-sm block mb-0.5">{t('businessDetails.addressLabel')}</span>
                      <span>{business.city}, {business.postal_code}</span>
                    </div>
                  </div>
                  
                  {business.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/80 text-sm block mb-0.5">{t('businessDetails.phoneLabel')}</span>
                        <a 
                          href={`tel:${business.phone}`} 
                          className="hover:underline"
                        >
                          {business.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {business.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/80 text-sm block mb-0.5">{t('businessDetails.emailLabel')}</span>
                        <a 
                          href={`mailto:${business.email}`} 
                          className="hover:underline break-all"
                        >
                          {business.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {business.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-white/80 text-sm block mb-0.5">{t('businessDetails.websiteLabel')}</span>
                        <a 
                          href={business.website} 
                          className="hover:underline" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {t('businessDetails.visitWebsite')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.city}, ${business.postal_code}, Belgium`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-6 block w-full bg-white text-romania-blue text-center font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {t('businessDetails.viewOnMap')}
                </a>
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
