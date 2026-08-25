// components/sections/CollectionsGrid.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Collection {
  name: string;
  image: string;
  href?: string;
}

interface CollectionsGridProps {
  collections?: Collection[];
}

export const CollectionsGrid = ({
  collections,
}: CollectionsGridProps) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const defaultCollections: Collection[] = [
    {
      name: t("collections.eclatDuSahel"),
      image: "https://images.pexels.com/photos/3622613/pexels-photo-3622613.jpeg?w=1000&h=600&fit=crop",
    },
    {
      name: t("collections.wedding"),
      image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?w=1000&h=600&fit=crop",
    },
    {
      name: t("collections.heritageWax"),
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?w=1000&h=600&fit=crop",
    },
    {
      name: t("collections.essentials"),
      image: "https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?w=1000&h=600&fit=crop",
    },
  ];
  const items = collections ?? defaultCollections;

  // Scroll reveal effect
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
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-20 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="mb-12 md:mb-16 reveal" data-reveal="">
        <div className="mb-3 text-xs font-bold tracking-[0.2em] uppercase text-primary/80"
             style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
          {t("collections.title") || "Collections"}
        </div>
        <h2 className="text-display-lg text-on-background max-w-2xl"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
          {t("collections.subtitle") || "Explorez nos univers exclusifs"}
        </h2>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {items.map((collection, idx) => {
          const fallbackImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23e5e7eb' width='600' height='400'/%3E%3C/svg%3E`;
          const displayImage = imageErrors[collection.name] ? fallbackImage : collection.image;
          
          return (
            <a
              key={collection.name}
              href={collection.href || "#"}
              className="group reveal block overflow-hidden rounded-2xl"
              data-reveal=""
              style={{
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              <div className="relative aspect-video overflow-hidden bg-surface-container">
                {/* Image */}
                <img
                  src={displayImage}
                  alt={collection.name}
                  onError={() => setImageErrors(prev => ({ ...prev, [collection.name]: true }))}
                  className="absolute inset-0 w-full h-full object-cover
                             transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay gradient - more elegant */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-black/20
                               opacity-70 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/30 to-transparent
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-light mb-3 md:mb-4
                                leading-tight drop-shadow-lg"
                      style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                    {collection.name}
                  </h3>

                  {/* CTA Button */}
                  <div className="flex items-center gap-3 text-gold text-sm font-semibold tracking-wider
                                 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0
                                 transition-all duration-500"
                       style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                    <span>{t("collections.discoverCollection") || "Découvrir"}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/30
                               rounded-2xl transition-colors duration-500 pointer-events-none" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mt-16 md:mt-20 pt-16 md:pt-20 border-t border-outline-variant/20
                    flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="max-w-lg">
          <h3 className="text-lg md:text-xl font-bold text-on-surface mb-3"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
            Créations sur mesure
          </h3>
          <p className="text-sm text-on-surface/60">
            Chaque pièce est une histoire. Nous créons des collections uniques pour vos moments précieux.
          </p>
        </div>
        <a href="#" className="text-primary font-bold text-sm tracking-wider uppercase
                             hover:text-gold transition-colors flex items-center gap-2"
           style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
          Voir toutes les collections
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
};

export default CollectionsGrid;