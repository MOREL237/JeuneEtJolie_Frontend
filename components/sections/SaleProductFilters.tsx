// components/sections/SaleProductFilters.tsx
'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface SaleProductFiltersProps {
  reductionFilter?: string;
  categoryFilter?: string;
  sortBy?: string;
  onReductionChange?: (value: string) => void;
  onCategoryChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
}

const reductionOptions: FilterOption[] = [
  { value: 'all', label: 'Toutes les réductions' },
  { value: '20', label: '-20% et plus' },
  { value: '50', label: '-50% et plus' },
  { value: '70', label: '-70%' },
];

const categoryOptions: FilterOption[] = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'robes', label: 'Robes' },
  { value: 'tailleurs', label: 'Tailleurs' },
  { value: 'accessoires', label: 'Accessoires' },
];

const sortOptions: FilterOption[] = [
  { value: 'best-discount', label: 'Meilleure remise' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Nouveautés' },
];

export const SaleProductFilters = ({
  reductionFilter = 'all',
  categoryFilter = 'all',
  sortBy = 'best-discount',
  onReductionChange,
  onCategoryChange,
  onSortChange,
}: SaleProductFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
      {/* Left side filters */}
      <div className="flex items-center space-x-8">
        {/* Reduction filter */}
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Réduction
          </label>
          <div className="relative">
            <select
              value={reductionFilter}
              onChange={(e) => onReductionChange?.(e.target.value)}
              className="border-0 bg-transparent font-sans-lato text-sm focus:ring-0 p-0 cursor-pointer text-neutral-800 appearance-none pr-6"
            >
              {reductionOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
            Catégories
          </label>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange?.(e.target.value)}
              className="border-0 bg-transparent font-sans-lato text-sm focus:ring-0 p-0 cursor-pointer text-neutral-800 appearance-none pr-6"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Right side sort */}
      <div className="flex items-center space-x-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
          Trier par :
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="border-0 bg-transparent font-sans-lato text-sm focus:ring-0 p-0 cursor-pointer text-neutral-800 appearance-none pr-6"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SaleProductFilters;