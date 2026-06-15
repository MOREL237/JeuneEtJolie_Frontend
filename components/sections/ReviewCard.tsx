// components/sections/ReviewCard.tsx
'use client';

import React from 'react';
import { StarRating } from '../shared/StarRating';

interface ReviewCardProps {
  initials: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  avatarBg?: string;
}

export const ReviewCard = ({
  initials,
  name,
  rating,
  date,
  title,
  content,
  avatarBg = 'bg-secondary-fixed',
}: ReviewCardProps) => {
  return (
    <div className="flex flex-col gap-4 pb-10 border-b border-outline-variant/30">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full ${avatarBg} flex items-center justify-center text-on-secondary-fixed font-bold`}
          >
            {initials}
          </div>
          <div>
            <h4 className="font-bold text-on-surface">{name}</h4>
            <StarRating rating={rating} size="sm" />
          </div>
        </div>
        <span className="text-sm text-outline">{date}</span>
      </div>
      <h5 className="font-semibold text-on-surface">{title}</h5>
      <p className="text-outline">{content}</p>
    </div>
  );
};

export default ReviewCard;