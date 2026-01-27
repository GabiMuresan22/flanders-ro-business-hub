import React from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { t } = useLanguage();
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'fill-romania-yellow text-romania-yellow'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-foreground">
            {review.profiles?.full_name || t('businessDetails.anonymous')}
          </span>
        </div>
        <span className="text-sm text-muted-foreground">
          {format(new Date(review.created_at), 'MMM d, yyyy')}
        </span>
      </div>
      {review.comment && (
        <p className="text-muted-foreground">{review.comment}</p>
      )}
    </div>
  );
};

export default ReviewCard;
