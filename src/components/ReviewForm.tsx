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
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
<<<<<<< HEAD
        title: t('reviewForm.ratingRequired'),
        description: t('reviewForm.selectRating'),
=======
        title: t('businessDetails.ratingRequired'),
        description: t('businessDetails.ratingRequiredMessage'),
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
<<<<<<< HEAD
          title: t('reviewForm.authRequired'),
          description: t('reviewForm.loginToReview'),
=======
          title: t('businessDetails.authRequired'),
          description: t('businessDetails.authRequiredMessage'),
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
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
<<<<<<< HEAD
            title: t('reviewForm.alreadyReviewed'),
            description: t('reviewForm.alreadyReviewedDesc'),
=======
            title: t('businessDetails.alreadyReviewed'),
            description: t('businessDetails.alreadyReviewedMessage'),
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
            variant: 'destructive',
          });
          return;
        }
        throw error;
      }

      toast({
<<<<<<< HEAD
        title: t('reviewForm.reviewSubmitted'),
        description: t('reviewForm.thankYou'),
=======
        title: t('businessDetails.reviewSubmitted'),
        description: t('businessDetails.reviewSubmittedMessage'),
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
      });
      
      setRating(0);
      setComment('');
      onReviewSubmitted();
    } catch (error: unknown) {
<<<<<<< HEAD
      const errorMessage = error instanceof Error ? error.message : t('reviewForm.submitFailedMessage');
      toast({
        title: t('reviewForm.submissionFailed'),
=======
      const errorMessage = error instanceof Error ? error.message : t('businessDetails.submissionFailed');
      toast({
        title: t('businessDetails.submissionFailed'),
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 bg-card" role="form" aria-label={t('reviewForm.leaveReview')}>
      <h3 className="font-semibold text-lg text-foreground">{t('reviewForm.leaveReview')}</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground" id="rating-label">
          {t('reviewForm.ratingLabel')}
=======
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 bg-card" role="form" aria-label={t('businessDetails.leaveReview')}>
      <h3 className="font-semibold text-lg text-foreground">{t('businessDetails.leaveReview')}</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-foreground" id="rating-label">
          {t('businessDetails.rating')} *
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
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
<<<<<<< HEAD
            {rating === 1 ? t('reviewForm.selectedStars').replace('{count}', '1') : t('reviewForm.selectedStarsPlural').replace('{count}', String(rating))}
=======
            {t('businessDetails.youSelected')} {rating} {rating > 1 ? t('businessDetails.stars') : t('businessDetails.star')}
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
          </p>
        )}
      </div>

      <div>
        <label htmlFor="review-comment" className="block text-sm font-medium mb-2 text-foreground">
<<<<<<< HEAD
          {t('reviewForm.commentOptional')}
=======
          {t('businessDetails.comment')}
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
        </label>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
<<<<<<< HEAD
          placeholder={t('reviewForm.commentPlaceholder')}
=======
          placeholder={t('businessDetails.commentPlaceholder')}
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
          rows={4}
          maxLength={500}
          aria-describedby="comment-counter"
        />
        <p id="comment-counter" className="mt-1 text-xs text-gray-500 text-right">
<<<<<<< HEAD
          {t('reviewForm.charactersCount').replace('{count}', String(comment.length))}
=======
          {comment.length}/500 {t('businessDetails.characters')}
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
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
<<<<<<< HEAD
            {t('reviewForm.submitting')}
          </span>
        ) : (
          t('reviewForm.submitReview')
=======
            {t('businessDetails.submitting')}
          </span>
        ) : (
          t('businessDetails.submitReview')
>>>>>>> 5b549f4846667aa8f274f227f4b94e5236737488
        )}
      </Button>
    </form>
  );
};

export default ReviewForm;
