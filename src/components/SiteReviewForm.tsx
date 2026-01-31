import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface SiteReviewFormProps {
  onSubmitted?: () => void;
}

const SiteReviewForm: React.FC<SiteReviewFormProps> = ({ onSubmitted }) => {
  const { t } = useLanguage();
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = authorName.trim();
    if (!name) {
      toast({
        title: t('testimonials.nameRequired'),
        description: t('testimonials.nameRequiredMessage'),
        variant: 'destructive',
      });
      return;
    }
    if (rating === 0) {
      toast({
        title: t('testimonials.ratingRequired'),
        description: t('testimonials.ratingRequiredMessage'),
        variant: 'destructive',
      });
      return;
    }
    if (!content.trim()) {
      toast({
        title: t('testimonials.contentRequired'),
        description: t('testimonials.contentRequiredMessage'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('site_reviews')
        .insert([
          {
            author_name: name,
            content: content.trim(),
            rating,
            status: 'approved',
            user_id: user?.id ?? null,
          },
        ]);

      if (error) throw error;

      toast({
        title: t('testimonials.submitted'),
        description: t('testimonials.submittedMessage'),
      });

      setAuthorName('');
      setRating(0);
      setContent('');
      onSubmitted?.();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t('testimonials.submitFailed');
      toast({
        title: t('testimonials.submitFailed'),
        description: String(message),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-100 max-w-xl mx-auto"
      aria-label={t('testimonials.leaveReview')}
    >
      <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-4">
        {t('testimonials.leaveReview')}
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="testimonial-name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('testimonials.yourName')} *
          </label>
          <Input
            id="testimonial-name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder={t('testimonials.namePlaceholder')}
            maxLength={100}
            className="bg-gray-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('testimonials.rating')} *
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none focus:ring-2 focus:ring-romania-blue rounded transition-transform hover:scale-110"
                aria-label={`${star} ${t('testimonials.stars')}`}
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? 'fill-romania-yellow text-romania-yellow'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="testimonial-content" className="block text-sm font-medium text-gray-700 mb-1">
            {t('testimonials.yourReview')} *
          </label>
          <Textarea
            id="testimonial-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('testimonials.contentPlaceholder')}
            rows={4}
            maxLength={500}
            className="bg-gray-50 resize-none"
            required
          />
          <p className="mt-1 text-xs text-gray-500 text-right">{content.length}/500</p>
        </div>

        <Button
          type="submit"
          disabled={loading || rating === 0 || !authorName.trim() || !content.trim()}
          className="w-full bg-romania-blue hover:bg-blue-700"
        >
          {loading ? t('testimonials.submitting') : t('testimonials.submit')}
        </Button>
      </div>
    </form>
  );
};

export default SiteReviewForm;
