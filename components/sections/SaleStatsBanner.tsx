// components/sections/SaleStatsBanner.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

interface StatItem {
  value: string;
  label: string;
  color?: string;
}

interface SaleStatsBannerProps {
  stats?: StatItem[];
}

export const SaleStatsBanner = ({
  stats,
}: SaleStatsBannerProps) => {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';

  const defaultStats: StatItem[] = [
    { value: '+200', label: isEnglish ? 'Items on sale' : t('sale.statsArticles'), color: 'text-primary' },
    { value: isEnglish ? 'Up to 70% off' : "Jusqu'à -70%", label: isEnglish ? 'Immediate savings' : t('sale.statsDiscount'), color: 'text-sale-red' },
    { value: isEnglish ? 'FREE SHIPPING' : 'LIVRAISON OFFERTE', label: isEnglish ? 'From 30,000 FCFA' : t('sale.statsShipping'), color: 'text-gold' },
  ];
  const items = stats ?? defaultStats;

  return (
    <section className="bg-surface border-b border-outline-variant py-10">
      <div className="container mx-auto px-5 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-outline-variant">
          {items.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4 py-4 md:py-0">
              <span className={`font-headline-md text-xl md:text-2xl ${stat.color || 'text-on-surface'}`}>
                {stat.value}
              </span>
              <span className="text-sm text-on-surface-variant uppercase tracking-wide mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaleStatsBanner;
