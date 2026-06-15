// components/sections/FilterSidebar.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';

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
  onPriceChange?: (value: number) => void;
}

const colors = [
  { name: 'Rose', bg: 'bg-pink-600', value: 'rose' },
  { name: 'Jaune', bg: 'bg-yellow-500', value: 'jaune' },
  { name: 'Noir', bg: 'bg-slate-900', value: 'noir' },
  { name: 'Vert', bg: 'bg-emerald-600', value: 'vert' },
  { name: 'Orange', bg: 'bg-orange-500', value: 'orange' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const FilterSidebar = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  priceRange = { min: 0, max: 150000 },
  onPriceChange,
}: FilterSidebarProps) => {
  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-10">
      {/* Categories */}
      <div>
        <h3 className="font-label-md text-on-surface mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest">
          Catégories
        </h3>
        <div className="space-y-2">
          {filters
            .find((f) => f.type === 'checkbox')
            ?.options?.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={activeFilters.includes(option.value)}
                  onChange={() => onFilterChange(option.value)}
                  className="rounded border-outline text-primary focus:ring-primary/20 w-4 h-4"
                />
                <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-label-md text-on-surface mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest">
          Taille
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onFilterChange(`size-${size}`)}
              className={`h-10 text-xs font-bold rounded-lg transition-all ${
                activeFilters.includes(`size-${size}`)
                  ? 'border border-primary bg-primary text-on-primary'
                  : 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-label-md text-on-surface mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest">
          Couleur
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => onFilterChange(`color-${color.value}`)}
              className={`w-8 h-8 rounded-full p-0.5 transition-all ${
                activeFilters.includes(`color-${color.value}`)
                  ? 'border-2 border-primary'
                  : 'border border-outline-variant hover:border-primary'
              }`}
              title={color.name}
            >
              <div className={`w-full h-full rounded-full ${color.bg}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-label-md text-on-surface mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest">
          Prix (FCFA)
        </h3>
        <div className="px-2">
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step={1000}
            className="w-full accent-primary"
            onChange={(e) => onPriceChange?.(Number(e.target.value))}
          />
          <div className="flex justify-between mt-2 text-xs text-on-surface-variant font-bold">
            <span>{priceRange.min.toLocaleString()} FCFA</span>
            <span>{(priceRange.max / 1000).toFixed(0)}k FCFA</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-label-md text-on-surface mb-4 border-b border-outline-variant pb-2 uppercase tracking-widest">
          Note
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => onFilterChange(`rating-${stars}`)}
              className="flex items-center gap-2 group w-full text-left"
            >
              <div className="flex text-tertiary-container">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < stars ? 'text-tertiary-container' : 'text-outline-variant'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-on-surface-variant group-hover:text-primary">
                & plus
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;