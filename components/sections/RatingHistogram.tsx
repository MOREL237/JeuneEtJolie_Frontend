// components/sections/RatingHistogram.tsx
'use client';

import React from 'react';
import { StarRating } from '../shared/StarRating';

interface RatingData {
  stars: number;
  percentage: number;
}

interface RatingHistogramProps {
  average: number;
  totalReviews: number;
  distribution: RatingData[];
}

export const RatingHistogram = ({
  average,
  totalReviews,
  distribution,
}: RatingHistogramProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Average */}
      <div className="flex flex-col gap-1">
        <span className="text-display-xl font-bold text-on-surface">{average.toFixed(1)}</span>
        <StarRating rating={Math.round(average)} size="md" />
        <span className="text-outline mt-2">Basé sur {totalReviews} avis</span>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-3">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-4">
            <span className="text-sm w-4">{item.stars}</span>
            <div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-tertiary-container rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-sm text-outline w-10">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingHistogram;