'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function LoyaltyPromoCard() {
  const { t } = useTranslation();
  return (
    <div className="bg-primary text-on-primary p-6 rounded-2xl relative overflow-hidden shadow-lg">
      <div className="relative z-10">
        <p className="text-[10px] uppercase tracking-widest font-bold opacity-80 mb-2">
          {t('loyalty.exclusiveOffer')}
        </p>
        <h3 className="font-headline-md text-xl mb-4 leading-tight">
          {t('loyalty.pointsTitle')}
        </h3>
        <button className="bg-surface text-primary px-6 py-2 rounded-xl text-sm font-bold hover:scale-105 transition-transform">
          {t('loyalty.learnMore')}
        </button>
      </div>
      <span 
        className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl opacity-10" 
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        military_tech
      </span>
    </div>
  );
}