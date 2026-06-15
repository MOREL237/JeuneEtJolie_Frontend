// components/shared/StarRating.tsx
'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  reviews?: number;
  size?: 'sm' | 'md';
}

export const StarRating = ({
  rating,
  maxRating = 5,
  reviews,
  size = 'sm',
}: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1">
      <div className="flex text-tertiary-container">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${starSize} fill-tertiary-container text-tertiary-container`}
          />
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={`${starSize} text-outline-variant`} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={`${starSize} fill-tertiary-container text-tertiary-container`} />
            </div>
          </div>
        )}
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${starSize} text-outline-variant`}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-xs text-on-surface-variant ml-1">({reviews})</span>
      )}
    </div>
  );
};

export default StarRating;