// components/sections/CategoryGrid.tsx
//
// Grille "Explorer par Univers" — 6 cartes portrait uniformes (2 colonnes mobile, 3 desktop).
// Chaque carte : image plein format + overlay footer avec nom + description.
// Effet TiltCard 3D au survol + scroll-reveal.

'use client';

import { useEffect, useRef } from 'react';
import { TiltCard } from '@/components/3d/TiltCard';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight } from 'lucide-react';

interface Category {
  name:        string;
  image:       string;
  href?:       string;
  description?: string;
  eyebrow?:    string;
}

interface CategoryGridProps {
  categories?: Category[];
}

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const defaultCategories: Category[] = [
    {
      name:        t('categories.dresses') || 'Robes',
      image:       'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      description: 'Robes fluides et structurées pour l\'élégance africaine',
      eyebrow:     'Prêt-à-porter',
    },
    {
      name:        'Hauts',
      image:       'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800',
      description: 'Blouses, tops et chemises de caractère',
      eyebrow:     'Prêt-à-porter',
    },
    {
      name:        'Pantalons',
      image:       'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800',
      description: 'Coupes droites et fluides, du casual au chic',
      eyebrow:     'Prêt-à-porter',
    },
    {
      name:        t('categories.bags') || 'Sacs',
      image:       'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
      description: 'Pochettes, totes et sacs signés artisan',
      eyebrow:     'Accessoires',
    },
    {
      name:        t('categories.jewelry') || 'Bijoux',
      image:       'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      description: 'Or, perles et traditions réinterprétées',
      eyebrow:     'Accessoires',
    },
    {
      name:        t('categories.shoes') || 'Chaussures',
      image:       'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
      description: 'Sandales, escarpins et mules artisanales',
      eyebrow:     'Accessoires',
    },
  ];

  const items = categories ?? defaultCategories;

  /* Scroll-reveal */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20"
    >
      {/* En-tête */}
      <div className="flex items-end justify-between mb-10 md:mb-14 reveal" data-reveal="">
        <div>
          <div className="section-eyebrow mb-3">{t('categories.exploreByUniverse') || 'Explorer par Univers'}</div>
          <h2
            className="text-display-lg text-on-background"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Nos Univers
          </h2>
        </div>
        <a
          href="#"
          className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase
                     text-on-surface/50 hover:text-primary transition-colors duration-200"
          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          Tout voir <ArrowRight size={14} />
        </a>
      </div>

      {/* Grille 6 cartes — 2 col mobile · 3 col desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {items.slice(0, 6).map((cat, idx) => (
          <div
            key={cat.name}
            className="reveal"
            data-reveal=""
            style={{
              aspectRatio: '3/4',
              transitionDelay: `${idx * 60}ms`,
            }}
          >
            <TiltCard className="h-full rounded-2xl overflow-hidden" maxTilt={10} glare>
              <a
                href={cat.href ?? '#'}
                className="group relative block h-full"
                aria-label={cat.name}
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover
                             transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Dégradé bas */}
                <div className="absolute inset-0 bg-gradient-to-t
                                from-[#060614]/85 via-[#060614]/25 to-transparent" />

                {/* Bouton discret haut-droit */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full
                                flex items-center justify-center
                                text-white/50 group-hover:text-gold transition-colors duration-300">
                  <ArrowRight size={13} />
                </div>

                {/* Footer texte */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  {cat.eyebrow && (
                    <p
                      className="text-gold/80 mb-1 leading-none"
                      style={{
                        fontFamily: 'var(--font-space-grotesk, sans-serif)',
                        fontSize: '0.55rem',
                        fontWeight: 600,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {cat.eyebrow}
                    </p>
                  )}

                  <h3
                    className="text-white leading-tight mb-1 md:mb-2"
                    style={{
                      fontFamily: 'var(--font-cormorant, Georgia, serif)',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                      fontWeight: 400,
                    }}
                  >
                    {cat.name}
                  </h3>

                  {cat.description && (
                    <p
                      className="text-white/55 leading-snug line-clamp-2
                                 max-h-0 group-hover:max-h-10 overflow-hidden
                                 transition-all duration-500 hidden md:block"
                      style={{ fontSize: '0.72rem' }}
                    >
                      {cat.description}
                    </p>
                  )}

                  {/* Indicateur hover */}
                  <div
                    className="flex items-center gap-1.5 mt-2 text-gold
                               opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                               transition-all duration-300"
                    style={{
                      fontFamily: 'var(--font-space-grotesk, sans-serif)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Explorer <ArrowRight size={11} />
                  </div>
                </div>
              </a>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
