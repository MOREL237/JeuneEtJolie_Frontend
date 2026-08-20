// components/sections/UrgencySection.tsx
'use client';

import React from 'react';
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
  return (
    <section className="bg-sale-red py-16">
      <div className="container mx-auto px-5 md:px-8 lg:px-20 text-center">
        <div className="inline-block border-2 border-white/30 p-8 rounded-xl max-w-4xl w-full">
          <h2 className="text-white font-headline-lg text-2xl md:text-4xl mb-4">
            {title || t('urgency.title')}
          </h2>
          <p className="text-white/90 font-serif-luxury text-lg md:text-xl mb-8">
            {subtitle || t('urgency.subtitle')}
          </p>
          <button
            onClick={onButtonClick}
            className="bg-surface text-sale-red px-8 md:px-12 py-4 font-bold tracking-widest text-sm hover:bg-surface-container-high transition-colors rounded-[10px]"
          >
            {buttonText || t('urgency.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;