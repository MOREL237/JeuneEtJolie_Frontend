// components/sections/FilterSidebar.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  title: string;
  type: 'checkbox' | 'buttons' | 'colors' | 'range' | 'rating';
  options?: FilterOption[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  activeFilters: string[];
  onFilterChange: (filter: string) => void;
  onClearAll: () => void;
  priceRange?: { min: number; max: number };
  onPriceRangeChange?: (min: number, max: number) => void;
}

const COLOR_SWATCHES = [
  { name: 'Rose',   bg: '#e05a88', value: 'rose'   },
  { name: 'Jaune',  bg: '#e8c84a', value: 'jaune'  },
  { name: 'Noir',   bg: '#1a1a2e', value: 'noir'   },
  { name: 'Vert',   bg: '#2d8a5e', value: 'vert'   },
  { name: 'Orange', bg: '#e07535', value: 'orange' },
  { name: 'Bleu',   bg: '#4a6fa5', value: 'bleu'   },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const SECTION_TITLE = 'text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-on-surface/40 pb-2 border-b border-outline-variant/20 mb-4';

/* ── Dual-range price slider ──
 * Deux sliders indépendants (min / max) avec segment coloré calculé par CSS.
 * Approche fiable : chaque input capture ses propres événements sans chevauchement. */
function PriceRangeSlider({
  min,
  max,
  absoluteMin,
  absoluteMax,
  onChange,
}: {
  min: number;
  max: number;
  absoluteMin: number;
  absoluteMax: number;
  onChange: (min: number, max: number) => void;
}) {
  const fmt = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), max - 1000);
    onChange(val, max);
  };
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), min + 1000);
    onChange(min, val);
  };

  /* Pourcentage pour le gradient de la track */
  const range  = absoluteMax - absoluteMin;
  const leftPct  = ((min  - absoluteMin) / range) * 100;
  const rightPct = ((max  - absoluteMin) / range) * 100;

  const trackGradient = `linear-gradient(to right,
    var(--color-surface-container-highest, #e2e0fc) 0%,
    var(--color-surface-container-highest, #e2e0fc) ${leftPct}%,
    var(--color-primary, #C41352) ${leftPct}%,
    var(--color-primary, #C41352) ${rightPct}%,
    var(--color-surface-container-highest, #e2e0fc) ${rightPct}%,
    var(--color-surface-container-highest, #e2e0fc) 100%
  )`;

  return (
    <div className="px-1 space-y-4">
      {/* Valeurs actuelles */}
      <div className="flex items-center justify-between tabular-nums">
        <div className="text-center">
          <p className="text-[10px] text-on-surface/40 mb-0.5">Min</p>
          <p className="text-xs font-bold text-primary">{fmt(min)} FCFA</p>
        </div>
        <div className="h-px flex-1 mx-3 bg-outline-variant/30" />
        <div className="text-center">
          <p className="text-[10px] text-on-surface/40 mb-0.5">Max</p>
          <p className="text-xs font-bold text-primary">{fmt(max)} FCFA</p>
        </div>
      </div>

      {/* Slider minimum */}
      <div className="space-y-1">
        <label className="text-[10px] text-on-surface/40 flex justify-between">
          <span>{fmt(absoluteMin)} FCFA</span>
          <span>→ {fmt(max - 1000)} FCFA</span>
        </label>
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={1000}
          value={min}
          onChange={handleMin}
          aria-label="Prix minimum"
          className="w-full h-1.5 rounded-full cursor-pointer appearance-none accent-primary"
          style={{ background: trackGradient }}
        />
      </div>

      {/* Slider maximum */}
      <div className="space-y-1">
        <label className="text-[10px] text-on-surface/40 flex justify-between">
          <span>{fmt(min + 1000)} FCFA</span>
          <span>→ {fmt(absoluteMax)} FCFA</span>
        </label>
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step={1000}
          value={max}
          onChange={handleMax}
          aria-label="Prix maximum"
          className="w-full h-1.5 rounded-full cursor-pointer appearance-none accent-primary"
          style={{ background: trackGradient }}
        />
      </div>
    </div>
  );
}

export const FilterSidebar = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  priceRange: initialRange = { min: 0, max: 150000 },
  onPriceRangeChange,
}: FilterSidebarProps) => {
  const { t } = useTranslation();

  const ABSOLUTE_MIN = 0;
  const ABSOLUTE_MAX = 150000;

  const [priceMin, setPriceMin] = useState(initialRange.min);
  const [priceMax, setPriceMax] = useState(initialRange.max);

  const handlePriceChange = useCallback((min: number, max: number) => {
    setPriceMin(min);
    setPriceMax(max);
    onPriceRangeChange?.(min, max);
  }, [onPriceRangeChange]);

  const activeCount = activeFilters.length;

  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-8">

      {/* En-tête avec compteur + effacer */}
      {activeCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-on-surface/60">
            {activeCount} {t('filters.activeFilters') || 'filtre(s) actif(s)'}
          </span>
          <button
            onClick={onClearAll}
            className="text-xs text-primary hover:underline font-semibold transition-colors"
          >
            {t('common.filter') && t('filters.clearAll') || 'Tout effacer'}
          </button>
        </div>
      )}

      {/* Catégories */}
      <div>
        <h3 className={SECTION_TITLE} style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
          {t('filters.categories') || 'Catégories'}
        </h3>
        <div className="space-y-1.5">
          {filters
            .find((f) => f.type === 'checkbox')
            ?.options?.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group py-0.5">
                <input
                  type="checkbox"
                  checked={activeFilters.includes(option.value)}
                  onChange={() => onFilterChange(option.value)}
                  className="rounded border-outline-variant text-primary focus:ring-primary/20 w-4 h-4
                             accent-primary cursor-pointer"
                />
                <span className="text-sm text-on-surface/65 group-hover:text-primary transition-colors duration-150 flex-1">
                  {option.label}
                </span>
                {option.count !== undefined && (
                  <span className="text-[10px] text-on-surface/30 tabular-nums">({option.count})</span>
                )}
              </label>
            ))}
        </div>
      </div>

      {/* Tailles */}
      <div>
        <h3 className={SECTION_TITLE} style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
          {t('catalogue.filterGroups.size') || t('filters.sizes') || 'Taille'}
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((size) => {
            const active = activeFilters.includes(`size-${size}`);
            return (
              <button
                key={size}
                onClick={() => onFilterChange(`size-${size}`)}
                aria-pressed={active}
                className={`h-9 text-xs font-bold rounded-lg transition-all duration-200
                  ${active
                    ? 'bg-primary text-on-primary border border-primary shadow-sm'
                    : 'border border-outline-variant/50 text-on-surface/60 hover:border-primary hover:text-primary'
                  }`}
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Couleurs */}
      <div>
        <h3 className={SECTION_TITLE} style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
          {t('catalogue.filterGroups.color') || t('filters.colors') || 'Couleur'}
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_SWATCHES.map((color) => {
            const active = activeFilters.includes(`color-${color.value}`);
            return (
              <button
                key={color.value}
                onClick={() => onFilterChange(`color-${color.value}`)}
                aria-pressed={active}
                aria-label={color.name}
                title={color.name}
                className={`w-8 h-8 rounded-full p-0.5 transition-all duration-200
                  ${active
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                    : 'ring-1 ring-outline-variant/40 hover:ring-primary hover:scale-105'
                  }`}
              >
                <span
                  className="block w-full h-full rounded-full"
                  style={{ backgroundColor: color.bg }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Fourchette de prix — double slider */}
      <div>
        <h3 className={SECTION_TITLE} style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
          {t('catalogue.filterGroups.price') || t('filters.priceRange') || 'Prix'}
          <span className="ml-1 normal-case font-normal text-on-surface/30">(FCFA)</span>
        </h3>
        <PriceRangeSlider
          min={priceMin}
          max={priceMax}
          absoluteMin={ABSOLUTE_MIN}
          absoluteMax={ABSOLUTE_MAX}
          onChange={handlePriceChange}
        />
      </div>

      {/* Note minimum */}
      <div>
        <h3 className={SECTION_TITLE} style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
          {t('filters.rating') || 'Note'}
        </h3>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((stars) => {
            const active = activeFilters.includes(`rating-${stars}`);
            return (
              <button
                key={stars}
                onClick={() => onFilterChange(`rating-${stars}`)}
                aria-pressed={active}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-left transition-all duration-150
                  ${active ? 'bg-primary/8 text-primary' : 'hover:bg-surface-container'}`}
              >
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-sm leading-none ${i < stars ? 'text-gold' : 'text-outline-variant/60'}`}>
                      ★
                    </span>
                  ))}
                </span>
                <span className="text-xs text-on-surface/55">
                  {t('filters.andMore') || '& plus'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
