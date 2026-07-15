// components/sections/SaleHeroSection.tsx
'use client';

import React from 'react';
import { CountdownTimer } from '../ui/CountdownTimer';

interface SaleHeroSectionProps {
  endDate?: Date;
}

export const SaleHeroSection = ({ endDate }: SaleHeroSectionProps) => {
  return (
    <section className="h-[400px] relative flex items-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#333333]">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-5 md:px-8 lg:px-20 flex flex-col items-center text-center relative z-10">
        <h1 className="font-display-xl text-display-xl text-gold italic tracking-tight mb-4 text-shadow-gold">
          SOLDES
        </h1>
        <p className="font-serif-luxury text-2xl text-white mb-8">
          Jusqu'à <span className="text-sale-red font-bold">-70%</span> sur une sélection exceptionnelle
        </p>

        {/* Countdown */}
        <div className="flex flex-col items-center mb-10">
          <div className="text-white font-sans-lato text-xs tracking-[0.2em] mb-3 uppercase opacity-80">
            L'offre se termine dans :
          </div>
          <CountdownTimer endDate={endDate} />
        </div>

        <a
          href="#offers"
          className="bg-sale-red text-white px-10 py-4 font-label-md rounded-[10px] hover:scale-105 transition-transform shadow-lg shadow-sale-red/20"
        >
          VOIR TOUTES LES OFFRES
        </a>
      </div>

      {/* Decorative Gold Accent */}
      <div className="absolute right-0 bottom-0 w-1/4 h-full bg-gold/5 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default SaleHeroSection;