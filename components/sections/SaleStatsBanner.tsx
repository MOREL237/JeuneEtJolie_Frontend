// components/sections/SaleStatsBanner.tsx
'use client';

import React from 'react';

interface StatItem {
  value: string;
  label: string;
  color?: string;
}

interface SaleStatsBannerProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { value: '+200', label: 'Articles soldés', color: 'text-primary' },
  { value: "Jusqu'à -70%", label: 'De remise immédiate', color: 'text-sale-red' },
  { value: 'LIVRAISON OFFERTE', label: 'Dès 30 000 FCFA', color: 'text-gold' },
];

export const SaleStatsBanner = ({
  stats = defaultStats,
}: SaleStatsBannerProps) => {
  return (
    <section className="bg-white border-b border-gray-100 py-10">
      <div className="container mx-auto px-5 md:px-8 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4 py-4 md:py-0">
              <span className={`font-headline-md text-xl md:text-2xl ${stat.color || 'text-on-surface'}`}>
                {stat.value}
              </span>
              <span className="font-sans-lato text-sm text-neutral-600 uppercase tracking-wide mt-1">
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