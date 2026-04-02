import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import BusinessDetailsSkeleton from '../components/skeletons/BusinessDetailsSkeleton';
import BusinessCard from '../components/BusinessCard';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { MapPin, Phone, Mail, Globe, Star, Home, Edit, Clock, ExternalLink } from 'lucide-react';
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
import type { PublicBusiness, ReviewRow, BusinessCardData } from '@/types/database';
import { getLocalBusinessSchema, getBreadcrumbSchema } from '@/utils/schemas';
import {
  getLocalizedBusinessDescription,
  getDescriptionFallbackTranslationKey,
} from '@/lib/businessDescription';

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
  const [similarBusinesses, setSimilarBusinesses] = useState<PublicBusiness[]>([]);

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
    const { data: reviewsData } = await supabase
      .from('reviews')
      .select('*')
      .eq('business_id', id)
      .order('created_at', { ascending: false });

    if (reviewsData) {
      const userIds = [...new Set(reviewsData.map(r => r.user_id))];
      const { data: profilesData } = await supabase
        .from('public_profiles')
        .select('user_id, full_name')
        .in('user_id', userIds);
      const profileMap = new Map(profilesData?.map(p => [p.user_id, p.full_name]) || []);
      const reviewsWithProfiles = reviewsData.map(review => ({
        ...review,
        profiles: { full_name: profileMap.get(review.user_id) || null },
      }));
      setReviews(reviewsWithProfiles);
      if (reviewsData.length > 0) {
        const avg = reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchBusiness();
    fetchReviews();
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

  useEffect(() => {
    if (!business) return;
    const fetchSimilar = async () => {
      const { data } = await supabase
        .from('public_businesses')
        .select('*')
        .eq('category', business.category)
        .neq('id', business.id)
        .limit(3);
      setSimilarBusinesses(data || []);
    };
    fetchSimilar();
  }, [business]);

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
  const categorySlug = categoryToSlug(business.category || '');

  const getCategoryTranslation = () => {
    const key = `businessCategories.${business.category}`;
    const out = t(key);
    return out === key ? business.category : out;
  };

  const businessStructuredData = getLocalBusinessSchema({
    name: business.business_name,
    description: business.description,
    image_url: business.image_url,
    city: business.city,
    postal_code: business.postal_code,
    phone: business.phone,
    website: business.website,
    rating: averageRating > 0 ? averageRating : undefined,
    review_count: reviews.length > 0 ? reviews.length : undefined,
  });

  const breadcrumbStructuredData = getBreadcrumbSchema([
    { name: t('common.home'), url: `${BASE_URL}/` },
    { name: getCategoryTranslation(), url: `${BASE_URL}/category/${categorySlug}` },
    { name: business.business_name, url: `${BASE_URL}/business/${business.id}` },
  ]);

  const structuredDataPayload = [businessStructuredData, breadcrumbStructuredData];

  const aboutDescription = getLocalizedBusinessDescription(business, language);
  const aboutFallbackKey = getDescriptionFallbackTranslationKey(aboutDescription.fallback);

  const mapsQuery = encodeURIComponent(`${business.city}, ${business.postal_code}, Belgium`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <>
      <SEO
        title={`${business.business_name} – ${getCategoryTranslation()} în ${business.city} | Romanian Business Hub`}
        description={`${business.description?.substring(0, 150) ?? ''}… Contactează ${business.business_name} în ${business.city}, Belgia.`}
        keywords={`${business.business_name}, ${business.category}, afacere românească ${business.city}, ${business.category} West Flanders`}
        type="business.business"
      />
      <StructuredData data={structuredDataPayload} />

      <div className="min-h-screen flex flex-col bg-muted/30">
        <Navbar />
        <main className="flex-grow">

          {/* ── HERO ── */}
          <div className="relative h-72 md:h-[26rem]">
            {business.image_url ? (
              <img
                src={business.image_url}
                alt={business.business_name ?? ''}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                  t.parentElement?.classList.add('bg-gradient-to-br', 'from-romania-blue', 'to-romania-red');
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-romania-blue to-romania-red" />
            )}

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {/* Edit button (owner only) */}
            {isOwner && (
              <Link to={`/business/${id}/edit`} className="absolute top-4 right-4 z-10">
                <Button variant="outline" size="sm" className="gap-2 bg-white/90 hover:bg-white border-0">
                  <Edit className="h-4 w-4" />
                  {t('myBusinesses.edit')}
                </Button>
              </Link>
            )}

            {/* Hero content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <div className="container mx-auto max-w-6xl">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-romania-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {getCategoryTranslation()}
                  </span>
                  <span className="text-white/80 text-sm flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {business.city}
                  </span>
                  {business.appointment_only && (
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t('businessDetails.appointmentOnly')}
                    </span>
                  )}
                </div>

                {/* Business name */}
                <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                  {business.business_name}
                </h1>

                {/* Rating */}
                {averageRating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star
                          key={s}
                          className={`h-4 w-4 ${s <= Math.round(averageRating) ? 'fill-romania-yellow text-romania-yellow' : 'text-white/30'}`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-semibold">{averageRating.toFixed(1)}</span>
                    <span className="text-white/70 text-sm">
                      ({reviews.length} {reviews.length === 1 ? t('businessDetails.review') : t('businessDetails.reviewsCount')})
                    </span>
                  </div>
                )}

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  {business.phone && (
                    <a href={`tel:${business.phone}`}>
                      <Button className="bg-white text-foreground hover:bg-white/90 gap-2 font-semibold shadow-lg">
                        <Phone className="h-4 w-4" />
                        {t('businessDetails.callNow')}
                      </Button>
                    </a>
                  )}
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-white/70 text-white hover:bg-white/15 gap-2 font-semibold">
                      <MapPin className="h-4 w-4" />
                      {t('businessDetails.viewOnMap')}
                    </Button>
                  </a>
                  {business.website && (
                    <a href={normalizeExternalUrl(business.website)} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-white/70 text-white hover:bg-white/15 gap-2 font-semibold">
                        <Globe className="h-4 w-4" />
                        {t('businessDetails.visitWebsite')}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── BREADCRUMB ── */}
          <div className="bg-card border-b">
            <div className="container mx-auto max-w-6xl px-4 py-3">
              <Breadcrumb>
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
                      <Link to={`/category/${categorySlug}`}>{getCategoryTranslation()}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{business.business_name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>

          {/* ── MAIN CONTENT + SIDEBAR ── */}
          <div className="container mx-auto max-w-6xl px-4 py-8 md:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

              {/* ── LEFT: main column ── */}
              <div className="lg:col-span-2 space-y-8">

                {/* About */}
                <section className="bg-card rounded-2xl shadow-sm p-6 md:p-8 animate-fade-in">
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-4 border-b border-border pb-3">
                    {t('businessDetails.about')}
                  </h2>
                  {aboutFallbackKey && (
                    <p
                      className="text-sm text-muted-foreground border border-border/80 bg-muted/50 rounded-lg px-3 py-2.5 mb-4"
                      role="note"
                    >
                      {t(`businessDetails.${aboutFallbackKey}`)}
                    </p>
                  )}
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-[0.95rem]">
                    {aboutDescription.text}
                  </div>
                </section>

                {/* Reviews */}
                <section className="bg-card rounded-2xl shadow-sm p-6 md:p-8 animate-fade-in" style={{ animationDelay: '0.05s' }}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5 border-b border-border pb-4">
                    <div>
                      <h2 className="font-playfair text-2xl font-bold text-foreground">
                        {t('businessDetails.reviews')}
                      </h2>
                      {averageRating > 0 && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star
                                key={s}
                                className={`h-4 w-4 ${s <= Math.round(averageRating) ? 'fill-romania-yellow text-romania-yellow' : 'text-muted-foreground/30'}`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-foreground">{averageRating.toFixed(1)}</span>
                          <span className="text-sm text-muted-foreground">
                            ({reviews.length} {reviews.length === 1 ? t('businessDetails.review') : t('businessDetails.reviewsCount')})
                          </span>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="bg-romania-blue hover:bg-romania-blue/90 shrink-0 transition-all hover:scale-105 active:scale-95"
                    >
                      {t('businessDetails.leaveReview')}
                    </Button>
                  </div>

                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground font-medium">{t('businessDetails.noReviews')}</p>
                      <p className="text-sm text-muted-foreground mt-1">{t('businessDetails.beFirstReview')}</p>
                      <Button
                        onClick={() => setShowReviewForm(true)}
                        className="mt-4 bg-romania-blue hover:bg-romania-blue/90 transition-all hover:scale-105 active:scale-95"
                      >
                        {t('businessDetails.addReview')}
                      </Button>
                    </div>
                  )}

                  {showReviewForm && (
                    <div className="mt-6 pt-6 border-t border-border animate-fade-in">
                      <ReviewForm
                        businessId={id!}
                        onReviewSubmitted={() => {
                          fetchReviews();
                          setShowReviewForm(false);
                        }}
                      />
                    </div>
                  )}
                </section>

                {/* Map */}
                <section className="bg-card rounded-2xl shadow-sm p-6 md:p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-4 border-b border-border pb-3">
                    {t('businessDetails.mapLocation')}
                  </h2>
                  <div className="rounded-xl overflow-hidden border border-border h-64 md:h-80">
                    <iframe
                      title={`Map – ${business.business_name}`}
                      src={mapsEmbedUrl}
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm text-romania-blue hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {t('businessDetails.openInMaps')}
                  </a>
                </section>

                {/* Similar Businesses */}
                {similarBusinesses.length > 0 && (
                  <section className="bg-card rounded-2xl shadow-sm p-6 md:p-8 animate-fade-in" style={{ animationDelay: '0.15s' }}>
                    <h2 className="font-playfair text-2xl font-bold text-foreground mb-6 border-b border-border pb-3">
                      {t('businessDetails.similarBusinesses')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {similarBusinesses.map(b => (
                        <BusinessCard key={b.id} business={b as BusinessCardData} />
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* ── RIGHT: sticky sidebar ── */}
              <aside className="lg:sticky lg:top-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="bg-romania-blue rounded-2xl shadow-md p-6 md:p-7 text-white">
                  <h2 className="font-playfair text-xl font-bold mb-5 border-b border-white/20 pb-3">
                    {t('businessDetails.contactInfo')}
                  </h2>

                  {/* Phone – primary CTA */}
                  {business.phone && (
                    <a
                      href={`tel:${business.phone}`}
                      className="flex items-center justify-center gap-2 w-full bg-white text-romania-blue font-bold text-base py-3 px-4 rounded-xl mb-5 hover:bg-white/90 transition-colors shadow-sm"
                    >
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      {business.phone}
                    </a>
                  )}

                  <div className="space-y-4">
                    {/* Address */}
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group"
                    >
                      <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-white/70 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="text-white/60 text-xs uppercase tracking-wider block mb-0.5">
                          {t('businessDetails.addressLabel')}
                        </span>
                        <span className="font-medium text-sm leading-snug group-hover:underline">
                          {[business.city, business.postal_code].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    </a>

                    {/* Email */}
                    {business.email && (
                      <a href={`mailto:${business.email}`} className="flex items-start gap-3 group">
                        <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 text-white/70 group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-white/60 text-xs uppercase tracking-wider block mb-0.5">
                            {t('businessDetails.emailLabel')}
                          </span>
                          <span className="font-medium text-sm group-hover:underline break-all">{business.email}</span>
                        </div>
                      </a>
                    )}

                    {/* Website */}
                    {business.website && (
                      <a
                        href={normalizeExternalUrl(business.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 group"
                      >
                        <Globe className="h-5 w-5 mt-0.5 flex-shrink-0 text-white/70 group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-white/60 text-xs uppercase tracking-wider block mb-0.5">
                            {t('businessDetails.websiteLabel')}
                          </span>
                          <span className="font-medium text-sm group-hover:underline">
                            {t('businessDetails.visitWebsite')}
                          </span>
                        </div>
                      </a>
                    )}

                    {/* Appointment only badge */}
                    {business.appointment_only && (
                      <div className="flex items-center gap-2 text-sm bg-white/10 rounded-lg px-3 py-2.5">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>{t('businessDetails.appointmentOnly')}</span>
                      </div>
                    )}
                  </div>

                  {/* Social media */}
                  {id && <SocialMediaLinksInline businessId={id} inline />}

                  {/* Open in Maps */}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-colors border border-white/20"
                  >
                    <MapPin className="h-4 w-4" />
                    {t('businessDetails.viewOnMap')}
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BusinessDetails;
