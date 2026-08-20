// components/sections/ReviewsSection.tsx
'use client';

import React from 'react';
import { RatingHistogram } from './RatingHistogram';
import { ReviewCard } from './ReviewCard';
import { Button } from '../ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

interface Review {
  initials: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  avatarBg?: string;
}

interface ReviewsSectionProps {
  average: number;
  totalReviews: number;
  distribution: { stars: number; percentage: number }[];
  reviews: Review[];
}

export const ReviewsSection = ({
  average,
  totalReviews,
  distribution,
  reviews,
}: ReviewsSectionProps) => {
  const { t } = useTranslation();
  return (
    <section className="mt-section-gap border-t border-outline-variant pt-20">
      <h2 className="font-headline-lg text-headline-lg mb-12">{t('productPage.reviewsTitle')}</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Histogram */}
        <div className="flex flex-col gap-6">
          <RatingHistogram
            average={average}
            totalReviews={totalReviews}
            distribution={distribution}
          />
          <Button variant="outlined" size="md" className="mt-4 w-full">
            {t('productPage.leaveReview')}
          </Button>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              initials={review.initials}
              name={review.name}
              rating={review.rating}
              date={review.date}
              title={review.title}
              content={review.content}
              avatarBg={review.avatarBg}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;