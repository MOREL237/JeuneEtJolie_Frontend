// components/sections/HeroSection.tsx
'use client';

import React from 'react';
import { Button } from '../ui/Button';

interface HeroDict {
  tag: string;
  title: string;
  description: string;
  discover: string;
  promotions: string;
}

interface HeroSectionProps {
  dict: HeroDict;
  centered?: boolean;
  height?: string;
  showButtons?: boolean;
  backgroundImage?: string;
}

export const HeroSection = ({
  dict,
  centered = false,
  height = 'h-[600px] lg:h-[870px]',
  showButtons = true,
  backgroundImage = 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920',
}: HeroSectionProps) => {
  return (
    <section className={`relative ${height} overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      <div
        className={`relative max-w-[1440px] mx-auto px-5 lg:px-20 h-full flex flex-col justify-center ${
          centered ? 'items-center text-center' : 'items-start text-left'
        } text-white`}
      >
        <p className="font-label-md uppercase tracking-[0.3em] mb-4 text-secondary-fixed">
          {dict.tag}
        </p>
        <h1 className={`font-display-xl text-white mb-6 max-w-2xl leading-tight ${centered ? 'mx-auto' : ''}`}>
          {dict.title}
        </h1>
        <p className={`font-body-lg text-white/90 mb-10 max-w-lg ${centered ? 'mx-auto' : ''}`}>
          {dict.description}
        </p>
        {showButtons && (
          <div className="flex gap-4 flex-wrap justify-center">
            <Button variant="primary" size="lg">{dict.discover}</Button>
            <Button variant="outlined" size="lg" className="border-white text-white hover:bg-white/10">
              {dict.promotions}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;