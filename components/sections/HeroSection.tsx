// components/sections/HeroSection.tsx
//
// Hero signature de Jeune & Jolie.
// Structure : image plein écran + simulation tissu Three.js + contenu éditorial.
// L'animation de tissu (HeroCanvas) est l'élément distinctif de la marque —
// référence aux textiles africains comme motif vivant.

'use client';

import React, { useEffect, useRef } from 'react';
import { HeroCanvas } from '@/components/3d/HeroCanvas';
import { useTheme } from '@/components/providers/ThemeProvider';

interface HeroDict {
  tag:         string;
  title:       string;
  description: string;
  discover:    string;
  promotions:  string;
}

interface HeroSectionProps {
  dict:             HeroDict;
  centered?:        boolean;
  height?:          string;
  showButtons?:     boolean;
  backgroundImage?: string;
  onDiscover?:      () => void;
  onPromotions?:    () => void;
}

export const HeroSection = ({
  dict,
  centered         = false,
  height           = 'h-[100svh] min-h-[600px]',
  showButtons      = true,
  backgroundImage  = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop',
  onDiscover,
  onPromotions,
}: HeroSectionProps) => {
  const { theme } = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);

  /* Reveal au chargement — animation d'entrée du contenu */
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const children = el.querySelectorAll<HTMLElement>('.hero-reveal');
    children.forEach((child, i) => {
      child.style.opacity   = '0';
      child.style.transform = 'translateY(32px)';
      child.style.transition = `opacity 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.15 + 0.3}s,
                                 transform 0.9s cubic-bezier(0.4,0,0.2,1) ${i * 0.15 + 0.3}s`;

      /* Déclenche après le premier paint */
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          child.style.opacity   = '1';
          child.style.transform = 'translateY(0)';
        });
      });
    });
  }, []);

  /* Couleurs Three.js adaptées au thème */
  const fabricColor  = theme === 'dark' ? '#FF5C8D' : '#C41352';
  const accentColor  = '#C9A84C';

  return (
    <section className={`relative ${height} overflow-hidden bg-[#060614]`}>

      {/* ── Fond photographique ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* ── Overlays directionnels ── */}
      {/* Dégradé bas vers haut : ancre le contenu dans l'image */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060614]/90 via-[#060614]/40 to-transparent" />
      {/* Dégradé gauche-droite : zone de lecture */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060614]/60 via-transparent to-transparent" />

      {/* ── Simulation tissu Three.js ── */}
      {/* pointer-events-none : le canvas est purement décoratif */}
      <HeroCanvas
        color={fabricColor}
        accentColor={accentColor}
        className="opacity-70"
      />

      {/* ── Motif de fond géométrique (référence wax) ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            var(--gold) 0px, var(--gold) 1px,
            transparent 1px, transparent 28px
          ), repeating-linear-gradient(
            -45deg,
            var(--gold) 0px, var(--gold) 1px,
            transparent 1px, transparent 28px
          )`,
        }}
        aria-hidden="true"
      />

      {/* ── Contenu éditorial ── */}
      <div
        ref={contentRef}
        className={`
          relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20
          h-full flex flex-col justify-end pb-16 md:pb-20 lg:pb-24
          ${centered ? 'items-center text-center' : 'items-start text-left'}
        `}
      >
        {/* Eyebrow — label de collection */}
        <div className="hero-reveal section-eyebrow text-gold mb-5 md:mb-6">
          {dict.tag}
        </div>

        {/* Titre principal — Cormorant Garamond éditorial */}
        <h1
          className={`
            hero-reveal
            font-display text-display-2xl
            text-white mb-5 md:mb-7
            max-w-4xl
            ${centered ? 'mx-auto' : ''}
          `}
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
        >
          {dict.title}
        </h1>

        {/* Séparateur or */}
        <div className="hero-reveal divider-gold mb-5 md:mb-7" />

        {/* Description */}
        <p
          className={`
            hero-reveal
            text-white/80 text-base md:text-lg lg:text-xl
            leading-relaxed mb-8 md:mb-12
            max-w-lg
            ${centered ? 'mx-auto' : ''}
          `}
        >
          {dict.description}
        </p>

        {/* Boutons CTA */}
        {showButtons && (
          <div className="hero-reveal flex gap-4 md:gap-5 flex-wrap">
            <button 
              onClick={onDiscover}
              className="btn-primary"
            >
              {dict.discover}
            </button>
            <button 
              onClick={onPromotions}
              className="btn-outline border-white/40 text-white hover:border-gold hover:text-gold"
            >
              {dict.promotions}
            </button>
          </div>
        )}

        {/* Scroll indicator */}
        <div className="hero-reveal absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2 text-white/40">
          <span className="text-label-caps" style={{ writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>
            SCROLL
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
