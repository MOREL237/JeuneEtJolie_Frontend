// components/sections/Newsletter.tsx
//
// Section newsletter pleine largeur avec ParticleField Three.js en fond.
// Aesthetic : fond minuit, particules dorées, formulaire épuré.

'use client';

import React, { useState } from 'react';
import { ParticleField } from '@/components/3d/ParticleField';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface NewsletterDict {
  title?:       string;
  subtitle?:    string;
  placeholder?: string;
  button?:      string;
  titleLight?:  string;
  subtitleLight?: string;
}

interface NewsletterProps {
  dict:     NewsletterDict;
  variant?: 'dark' | 'light';
}

export const Newsletter = ({ dict, variant = 'dark' }: NewsletterProps) => {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const isLight = variant === 'light';
  const title    = isLight ? dict.titleLight    : dict.title;
  const subtitle = isLight ? dict.subtitleLight : dict.subtitle;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    /* Simule un appel API */
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-[#060614]">

      {/* Fond particules dorées Three.js */}
      <ParticleField count={80} color="#C9A84C" opacity={0.35} />

      {/* Motif géométrique wax subtil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 40px
          ), repeating-linear-gradient(
            90deg, var(--gold) 0px, var(--gold) 1px, transparent 1px, transparent 40px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Halo central lumineux */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(196,19,82,0.15) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <div className="section-eyebrow justify-center mb-5">
          Newsletter Exclusive
        </div>

        {/* Titre */}
        <h2
          className="text-white mb-4"
          style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>

        {/* Séparateur or */}
        <div className="w-12 h-px bg-gradient-to-r from-gold to-transparent mx-auto mb-6" />

        {/* Sous-titre */}
        <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10">
          {subtitle}
        </p>

        {/* Formulaire */}
        {submitted ? (
          /* Confirmation */
          <div className="flex flex-col items-center gap-4 py-6">
            <CheckCircle size={40} className="text-gold" strokeWidth={1.5} />
            <p
              className="text-white text-lg"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
            >
              Bienvenue dans l&apos;univers Jeune & Jolie
            </p>
            <p className="text-white/50 text-sm">
              Votre code de bienvenue arrivera sous peu.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict.placeholder ?? 'votre@email.com'}
              required
              disabled={loading}
              className="
                flex-grow bg-white/5 border border-white/10 rounded-full
                px-5 py-3 text-sm text-white placeholder:text-white/35
                focus:outline-none focus:border-gold/60 focus:bg-white/8
                transition-colors duration-200
                disabled:opacity-50
              "
            />
            <button
              type="submit"
              disabled={loading}
              className="
                btn-gold flex items-center gap-2 whitespace-nowrap
                disabled:opacity-60 disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              ) : (
                <>
                  {dict.button ?? "S'inscrire"} <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        )}

        {/* Promesse de confidentialité */}
        {!submitted && (
          <p className="text-white/25 text-xs mt-4 tracking-wide">
            Pas de spam · Désabonnement en 1 clic
          </p>
        )}
      </div>
    </section>
  );
};
