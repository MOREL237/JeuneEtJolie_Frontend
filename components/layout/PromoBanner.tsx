// components/layout/PromoBanner.tsx
//
// Bandeau promotionnel avec ticker défilant — crée un sentiment d'urgence
// et de marque premium. Fond gradient or → rose, texte répété en boucle.

'use client';

import React from 'react';

interface PromoBannerProps {
  message?:  string;
  className?: string;
}

const DEFAULT_MESSAGES = [
  'Livraison gratuite dès 30 000 FCFA',
  'Collection Été 2025 disponible',
  'Artisanat 100% africain',
  'Retours gratuits sous 30 jours',
];

export const PromoBanner = ({
  message,
  className = '',
}: PromoBannerProps) => {
  /* Répète les messages pour remplir le ticker */
  const items = message
    ? Array(8).fill(message)
    : [...DEFAULT_MESSAGES, ...DEFAULT_MESSAGES];

  return (
    <div
      className={`relative overflow-hidden py-2.5 ${className}`}
      style={{
        background: 'linear-gradient(90deg, #C41352 0%, #1A0A2E 40%, #C41352 100%)',
      }}
      role="marquee"
      aria-label="Informations promotionnelles"
    >
      {/* Dégradé de masquage sur les bords */}
      <div
        className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #C41352, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #C41352, transparent)' }}
        aria-hidden="true"
      />

      {/* Ticker animé */}
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: 'ticker-scroll 28s linear infinite',
        }}
      >
        {items.map((msg, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6"
            style={{
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.90)',
            }}
          >
            {msg}
            {/* Séparateur losange or */}
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '4px',
                background: '#C9A84C',
                transform: 'rotate(45deg)',
              }}
              aria-hidden="true"
            />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .flex { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PromoBanner;
