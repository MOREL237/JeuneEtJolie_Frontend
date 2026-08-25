// components/sections/UrgencySection.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

interface UrgencySectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const UrgencySection = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}: UrgencySectionProps) => {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';

  const displayTitle = title || (isEnglish ? '⏰ These prices won\'t last long' : t('urgency.title'));
  const displaySubtitle = subtitle || (isEnglish 
    ? 'Don\'t miss the opportunity to own an exceptional piece. Order before stock runs out.'
    : t('urgency.subtitle'));
  const displayButtonText = buttonText || (isEnglish ? 'SHOP DEALS NOW' : t('urgency.cta'));

  return (
    <section className="bg-surface border-b border-outline-variant py-16">
      <div className="container mx-auto px-5 md:px-8 lg:px-20 text-center">
        <div className="inline-block border-2 border-primary p-8 rounded-xl max-w-4xl w-full">
          <h2 className="text-on-surface font-headline-lg text-2xl md:text-4xl mb-4 font-bold">
            {displayTitle}
          </h2>
          <p className="text-on-surface-variant font-serif-luxury text-lg md:text-xl mb-8 font-semibold">
            {displaySubtitle}
          </p>
          <button
            onClick={onButtonClick}
            className="bg-sale-red dark:bg-yellow-400 text-black dark:text-black px-8 md:px-12 py-4 font-bold tracking-widest text-base md:text-lg hover:shadow-xl dark:hover:shadow-xl active:opacity-90 dark:active:opacity-90 transition-all rounded-lg shadow-lg dark:shadow-lg border-2 border-sale-red dark:border-yellow-400"
          >
            {displayButtonText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;