import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReviewFormProps {
  businessId: string;
  onReviewSubmitted: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ businessId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: t('businessDetails.ratingRequired'),
        description: t('businessDetails.ratingRequiredMessage'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: t('businessDetails.authRequired'),
          description: t('businessDetails.authRequiredMessage'),
          variant: 'destructive',
        });
        return;
      }

      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            business_id: businessId,
            user_id: user.id,
            rating,
            comment: comment.trim() || null,
          },
        ]);

      if (error) {
        // Handle duplicate review
        if (error.code === '23505') {
          toast({
            title: t('businessDetails.alreadyReviewed'),
            description: t('businessDetails.alreadyReviewedMessage'),
            variant: 'destructive',
          });
          return;
        }
        throw error;
      }

      toast({
        title: t('businessDetails.reviewSubmitted'),
        description: t('businessDetails.reviewSubmittedMessage'),
      });
      
      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('businessDetails.submissionFailed');
      toast({
        title: t('businessDetails.submissionFailed'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 bg-card" role="form" aria-label={t('businessDetails.leaveReview')}>
      <h3 className="font-semibold text-lg text-foreground">{t('businessDetails.leaveReview')}</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground" id="rating-label">
          {t('businessDetails.rating')} *
        </label>
        <div className="flex gap-1" role="radiogroup" aria-labelledby="rating-label" aria-required="true">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none focus:ring-2 focus:ring-romania-blue rounded transition-transform hover:scale-110"
              aria-label={`${star} ${star > 1 ? t('businessDetails.stars') : t('businessDetails.star')}`}
              role="radio"
              aria-checked={rating === star}
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? 'fill-romania-yellow text-romania-yellow'
                    : 'text-gray-300'
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="mt-1 text-sm text-gray-600">
            {t('businessDetails.youSelected')} {rating} {rating > 1 ? t('businessDetails.stars') : t('businessDetails.star')}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium mb-2 text-foreground">
          {t('businessDetails.comment')}
        </label>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t('businessDetails.commentPlaceholder')}
          rows={4}
          maxLength={500}
          aria-describedby="comment-counter"
        />
        <p id="comment-counter" className="mt-1 text-xs text-gray-500 text-right">
          {comment.length}/500 {t('businessDetails.characters')}
        </p>
      </div>

      <Button 
        type="submit" 
        disabled={loading || rating === 0}
        className="w-full transition-all"
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2 justify-center">
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" aria-hidden="true"></span>
            {t('businessDetails.submitting')}
          </span>
        ) : (
          t('businessDetails.submitReview')
        )}
      </Button>
    </form>
  );
};

export default ReviewForm;
