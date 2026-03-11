import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import BusinessDetailsSkeleton from '../components/skeletons/BusinessDetailsSkeleton';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { MapPin, Phone, Mail, Globe, Star, Home, Edit } from 'lucide-react';
import SocialMediaLinksInline from '../components/SocialMediaLinks';
import { categoryToSlug, normalizeExternalUrl } from '@/lib/utils';
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
import { getLocalBusinessSchema, getBreadcrumbSchema } from '@/utils/schemas';

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
  const [isOwner, setIsOwner] = useState(false);

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
    // Check ownership
    const checkOwnership = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !id) return;
      const { data } = await supabase
        .from('businesses')
        .select('id')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .maybeSingle();
      setIsOwner(!!data);
    };
    checkOwnership();
  }, [fetchBusiness, fetchReviews, id]);

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
      <>
        <SEO
          title={t('businessDetails.notFoundTitle')}
          description={t('businessDetails.notFoundMessage')}
          noindex
        />
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
      </>
    );
  }

  const BASE_URL = 'https://www.ro-businesshub.be';
  const categorySlug = business ? categoryToSlug(business.category || '') : '';

  const getCategoryTranslation = () => {
    const key = `businessCategories.${business.category}`;
    const out = t(key);
    return out === key ? business.category : out;
  };

  // Use schema helpers for consistent structured data
  const businessStructuredData = business ? getLocalBusinessSchema({
    name: business.business_name,
    description: business.description,
    image_url: business.image_url,
    city: business.city,
    postal_code: business.postal_code,
    phone: business.phone,
    website: business.website,
    rating: averageRating > 0 ? averageRating : undefined,
    review_count: reviews.length > 0 ? reviews.length : undefined
  }) : null;

  const breadcrumbStructuredData = business ? getBreadcrumbSchema([
    { name: t('common.home'), url: `${BASE_URL}/` },
    { name: getCategoryTranslation(), url: `${BASE_URL}/category/${categorySlug}` },
    { name: business.business_name, url: `${BASE_URL}/business/${business.id}` }
  ]) : null;

  const structuredDataPayload = businessStructuredData && breadcrumbStructuredData
    ? [businessStructuredData, breadcrumbStructuredData]
    : businessStructuredData;

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
          {structuredDataPayload && <StructuredData data={structuredDataPayload} />}
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
              <div className="text-center relative">
                <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 uppercase tracking-wide">
                  {business.business_name}
                </h1>
                <span className="inline-block bg-romania-blue text-white text-sm font-medium px-6 py-2 rounded-full">
                  {getCategoryTranslation()}
                </span>
                {isOwner && (
                  <Link
                    to={`/edit-business/${id}`}
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:scale-105 transition-transform duration-200"
                    >
                      <Edit className="h-4 w-4" />
                      {t('myBusinesses.edit')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Three-column cards section */}
          <div className="container mx-auto px-4 py-10 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* About Us Card */}
              <div className="bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7 lg:p-9 animate-fade-in">
                <h2 className="font-playfair text-2xl font-bold text-foreground mb-5 border-b border-border pb-3">
                  {t('businessDetails.about')}
                </h2>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-[0.95rem]">
                  {language === 'nl'
                    ? ((business as any).description_nl || (business as any).description_en || business.description || '')
                    : language === 'en'
                      ? ((business as any).description_en || business.description || '')
                      : (business.description || (business as any).description_en || '')}
                </div>
              </div>

              {/* Reviews Card */}
              <div className="bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7 lg:p-9 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-5 border-b border-border pb-3">
                  <h2 className="font-playfair text-2xl font-bold text-foreground">
                    {t('businessDetails.reviews')}
                  </h2>
                  <Button 
                    variant="default"
                    size="sm"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-romania-blue hover:bg-romania-blue/90 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    {t('businessDetails.leaveReview')}
                  </Button>
                </div>
                
                {/* Rating summary */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span className="font-bold text-foreground text-2xl">{averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({reviews.length} {reviews.length === 1 ? t('businessDetails.review') : t('businessDetails.reviewsCount')})</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-7 w-7 transition-colors duration-200 ${
                          star <= Math.round(averageRating)
                            ? 'fill-romania-yellow text-romania-yellow'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Reviews list or empty state */}
                {reviews.length > 0 ? (
                  <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground font-medium text-base">
                      {t('businessDetails.noReviews')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 mb-5">
                      {t('businessDetails.beFirstReview')}
                    </p>
                    <Button
                      variant="default"
                      size="default"
                      onClick={() => setShowReviewForm(true)}
                      className="bg-romania-blue hover:bg-romania-blue/90 transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      {t('businessDetails.addReview')}
                    </Button>
                  </div>
                )}

                {/* Review form - toggleable with animation */}
                {showReviewForm && (
                  <div className="mt-5 pt-5 border-t border-border animate-fade-in">
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
              <div className="bg-romania-blue rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-7 lg:p-9 text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="font-playfair text-2xl font-bold mb-6 border-b border-white/20 pb-3">
                  {t('businessDetails.contactInfo')}
                </h2>
                <div className="space-y-5">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.city}, ${business.postal_code}, Belgium`)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <span className="text-white/70 text-xs uppercase tracking-wider block mb-1">{t('businessDetails.addressLabel')}</span>
                      <span className="font-medium group-hover:underline">{business.city}, {business.postal_code}</span>
                    </div>
                  </a>
                  
                  {business.phone && (
                    <a href={`tel:${business.phone}`} className="flex items-start gap-3 group">
                      <Phone className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <span className="text-white/70 text-xs uppercase tracking-wider block mb-1">{t('businessDetails.phoneLabel')}</span>
                        <span className="font-medium group-hover:underline">{business.phone}</span>
                      </div>
                    </a>
                  )}
                  
                  {business.email && (
                    <a href={`mailto:${business.email}`} className="flex items-start gap-3 group">
                      <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <span className="text-white/70 text-xs uppercase tracking-wider block mb-1">{t('businessDetails.emailLabel')}</span>
                        <span className="font-medium group-hover:underline break-all">{business.email}</span>
                      </div>
                    </a>
                  )}
                  
                  {business.website && (
                    <a href={normalizeExternalUrl(business.website)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                      <Globe className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      <div>
                        <span className="text-white/70 text-xs uppercase tracking-wider block mb-1">{t('businessDetails.websiteLabel')}</span>
                        <span className="font-medium group-hover:underline">{t('businessDetails.visitWebsite')}</span>
                      </div>
                    </a>
                  )}
                </div>

                {/* Social Media Links - integrated in contact card */}
                {id && <SocialMediaLinksInline businessId={id} inline />}
                
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.city}, ${business.postal_code}, Belgium`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-7 block w-full bg-white text-romania-blue text-center font-semibold py-3 px-4 rounded-lg hover:bg-white/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
