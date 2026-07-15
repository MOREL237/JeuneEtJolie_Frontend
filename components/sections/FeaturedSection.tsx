// components/sections/FeaturedSection.tsx
//
// Section « mise en avant » — disposition éditoriale gauche/droite.
// Grande image produit à gauche, grille de mini-produits + texte à droite.
// Fond surface-container pour contraster avec les sections sombres.

'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { TiltCard } from '@/components/3d/TiltCard';

interface FeaturedProduct {
  name:        string;
  description: string;
  price:       number;
  image:       string;
}

interface FeaturedSectionProps {
  title?:           string;
  backgroundImage?: string;
  products?:        FeaturedProduct[];
}

const DEFAULT_PRODUCTS: FeaturedProduct[] = [
  {
    name:        "Sandales « Soleil d'Or »",
    description: 'Confort et élégance',
    price:       22000,
    image:       'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
  },
  {
    name:        "Montre « Aurore »",
    description: "L'accessoire intemporel",
    price:       68000,
    image:       'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400',
  },
];

export const FeaturedSection = ({
  title           = "L'Essentiel",
  backgroundImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDspnpCuTtIqPwJa6OoRIhLdca4ahsigW_HDrYKphFT_r_O51hnmCsKfIcX4Z136PmrpWLcVMUIASwh8nzCvsnZSfJuoLOy8wRAIzl3SF3iOJNuCmL3nJ4UR9wc9UPH1mOryfDpnDCS5F_JVpyLric4EI_ETxSCgq81WT6Ix-C5R4Ne2r-6BLKVh-38isnm0un7nNsRWSGYmcH2dN_wJAnO0sbIJaNRWVM24r51F8Z-kjN6BsELDLot4JtctIJv1OgpgFo1BC2Tno',
  products        = DEFAULT_PRODUCTS,
}: FeaturedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const els = section.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20">

        {/* En-tête */}
        <div className="reveal mb-12 md:mb-16" data-reveal="">
          <div className="section-eyebrow mb-3">Sélection</div>
          <h2
            className="text-display-lg text-on-background"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            {title}
          </h2>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">

          {/* Grande image gauche */}
          <div className="reveal" data-reveal="">
            <TiltCard className="h-full rounded-2xl overflow-hidden min-h-[420px]" maxTilt={6}>
              <div className="relative h-full min-h-[420px]">
                <img
                  src={backgroundImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060614]/75 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <h3
                    className="text-white mb-4"
                    style={{
                      fontFamily: 'var(--font-cormorant, Georgia, serif)',
                      fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                      fontWeight: 300,
                      lineHeight: 1.1,
                    }}
                  >
                    {title}
                  </h3>
                  <button className="btn-gold">
                    Explorer la sélection <ArrowRight size={14} className="inline ml-1" />
                  </button>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-5">

            {/* Bloc éditorial */}
            <div
              className="reveal bg-surface-container rounded-2xl p-8 md:p-10 flex flex-col justify-center"
              data-reveal=""
              style={{ transitionDelay: '120ms' }}
            >
              <div className="divider-gold mb-4" />
              <p className="text-on-surface/70 text-base md:text-lg leading-relaxed mb-6">
                Des pièces sélectionnées pour leur savoir-faire artisanal
                et leur élégance intemporelle — chaque détail porte l&apos;histoire
                de nos ateliers africains.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
                           text-primary hover:gap-3 transition-all duration-300"
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                Voir toute la collection <ArrowRight size={13} />
              </a>
            </div>

            {/* Mini-cartes produits */}
            {products.map((product, idx) => (
              <div
                key={product.name}
                className="reveal"
                data-reveal=""
                style={{ transitionDelay: `${(idx + 2) * 100}ms` }}
              >
                <TiltCard
                  className="bg-surface rounded-xl overflow-hidden shadow-card hover:shadow-card-hover
                             transition-shadow duration-300"
                  maxTilt={8}
                  glare
                >
                  <a href="#" className="flex items-center gap-4 p-4 group">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-on-surface/45 text-xs mb-0.5">{product.description}</p>
                      <h4
                        className="text-on-surface group-hover:text-primary transition-colors duration-200 truncate"
                        style={{
                          fontFamily: 'var(--font-cormorant, Georgia, serif)',
                          fontSize: '1.1rem',
                          fontWeight: 500,
                        }}
                      >
                        {product.name}
                      </h4>
                      <p className="text-sm font-bold text-on-surface mt-1">
                        {product.price.toLocaleString()}{' '}
                        <span className="text-on-surface/40 font-normal text-xs">FCFA</span>
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-on-surface/25 group-hover:text-primary group-hover:translate-x-1
                                 transition-all duration-200 flex-shrink-0"
                    />
                  </a>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
