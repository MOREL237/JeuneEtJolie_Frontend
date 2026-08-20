'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface FilterBarProps {
  categories: string[];
  totalItems: number;
  activeCategory: string;
  onCategoryChange?: (category: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
  maxPrice?: number;
  onSortChange?: (sort: string) => void;
}

const SORT_KEYS = ['relevance', 'priceAsc', 'priceDesc', 'newest'] as const;

export const FilterBar = ({
  categories,
  totalItems,
  activeCategory: initialActive,
  onCategoryChange,
  priceRange: externalRange,
  onPriceRangeChange,
  maxPrice = 150000,
  onSortChange,
}: FilterBarProps) => {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] = useState(initialActive);
  const [sortOpen,  setSortOpen]  = useState(false);
  const [sortLabel, setSortLabel] = useState('');
  const sortRef = useRef<HTMLDivElement>(null);

  /* Ferme le dropdown sort sur clic extérieur */
  useEffect(() => {
    if (!sortOpen) return;
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [sortOpen]);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    onCategoryChange?.(cat);
  };

  const handleSort = (key: string, label: string) => {
    setSortLabel(label);
    setSortOpen(false);
    onSortChange?.(key);
  };

  return (
    <section className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-8 md:py-10">
      <div className="flex flex-col gap-4 border-b border-outline-variant/30 pb-6">

        {/* Ligne 1 : catégories pill */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200
                ${category === activeCategory
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface/70 hover:bg-surface-container-high hover:text-on-surface border border-outline-variant/40'
                }`}
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ligne 2 : prix (desktop) + compteur + tri */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Prix — desktop seulement */}
          <div className="hidden lg:flex items-center gap-3">
            <span
              className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-on-surface/50"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {t('filters.priceRange') || 'Prix'}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={maxPrice}
                step={1000}
                defaultValue={externalRange?.[1] ?? maxPrice}
                onChange={(e) => onPriceRangeChange?.([0, Number(e.target.value)])}
                className="w-28 h-1 appearance-none rounded-full cursor-pointer accent-primary bg-surface-container-highest"
                aria-label={t('filters.priceRange') || 'Fourchette de prix'}
              />
              <span className="text-xs font-semibold text-on-surface/60 tabular-nums min-w-[60px]">
                {externalRange
                  ? `≤ ${(externalRange[1] / 1000).toFixed(0)}k`
                  : `≤ ${(maxPrice / 1000).toFixed(0)}k`}
              </span>
            </div>
          </div>

          {/* Compteur articles */}
          <p
            className="text-xs font-semibold text-on-surface/50 tabular-nums"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            <span className="text-on-surface font-bold">{totalItems}</span>
            {' '}{t('accessories.filterBar.totalItems') || 'articles trouvés'}
          </p>

          {/* Dropdown tri */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen((o) => !o)}
              aria-expanded={sortOpen}
              aria-haspopup="listbox"
              className="flex items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.15em] uppercase
                         text-on-surface/55 hover:text-primary transition-colors duration-200 py-1
                         border-b border-transparent hover:border-primary"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {sortLabel || t('filters.sortBy') || 'Trier par'}
              <ChevronDown
                size={13}
                strokeWidth={2}
                className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {sortOpen && (
              <div
                role="listbox"
                aria-label={t('filters.sortBy') || 'Trier par'}
                className="absolute right-0 top-full mt-2 w-52 bg-surface border border-outline-variant/30
                           rounded-xl shadow-ambient-lg z-40 py-1.5 overflow-hidden"
              >
                {SORT_KEYS.map((key) => {
                  const label = t(`accessories.sortOptions.${key}`) || key;
                  return (
                    <button
                      key={key}
                      role="option"
                      aria-selected={sortLabel === label}
                      onClick={() => handleSort(key, label)}
                      className="w-full px-4 py-2.5 text-left text-sm text-on-surface/70 hover:text-primary
                                 hover:bg-surface-container transition-colors duration-150"
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
