import React, { useEffect, useState, useCallback } from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { SiteReviewRow } from '@/types/database';
import SiteReviewForm from './SiteReviewForm';

const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<SiteReviewRow[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    const { data } = await supabase
      .from('site_reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    setReviews((data as SiteReviewRow[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="font-playfair text-3xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="mb-12">
          <SiteReviewForm onSubmitted={fetchReviews} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-20 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-romania-blue/10 flex items-center justify-center mr-4">
                    <span className="text-romania-blue font-semibold text-lg">
                      {review.author_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.author_name}</h3>
                    <span className="text-sm text-gray-500">
                      {format(new Date(review.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">&ldquo;{review.content}&rdquo;</p>
                <div className="flex text-romania-yellow">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= review.rating
                          ? 'fill-current text-romania-yellow'
                          : 'text-gray-200'
                      }`}
                      aria-hidden
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">{t('testimonials.noReviews')}</p>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
