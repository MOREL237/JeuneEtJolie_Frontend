// components/sections/SaleProductFilters.tsx
'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

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

export const SaleProductFilters = ({
  reductionFilter = 'all',
  categoryFilter = 'all',
  sortBy = 'best-discount',
  onReductionChange,
  onCategoryChange,
  onSortChange,
}: SaleProductFiltersProps) => {
  const { t } = useTranslation();

  const reductionOptions: FilterOption[] = [
    { value: 'all', label: t('sale.filterAllReductions') },
    { value: '20', label: '-20% et plus' },
    { value: '50', label: '-50% et plus' },
    { value: '70', label: '-70%' },
  ];

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: t('sale.filterAllCategories') },
    { value: 'robes', label: 'Robes' },
    { value: 'tailleurs', label: 'Tailleurs' },
    { value: 'accessoires', label: 'Accessoires' },
  ];

  const sortOptions: FilterOption[] = [
    { value: 'best-discount', label: t('sale.filterBestDiscount') },
    { value: 'price-asc', label: t('sale.filterPriceAsc') },
    { value: 'price-desc', label: t('sale.filterPriceDesc') },
    { value: 'newest', label: t('sale.filterNewest') },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-outline-variant pb-8">
      {/* Left side filters */}
      <div className="flex items-center space-x-8">
        {/* Reduction filter */}
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
            {t('sale.filterReduction')}
          </label>
          <div className="relative">
            <select
              value={reductionFilter}
              onChange={(e) => onReductionChange?.(e.target.value)}
              className="border-0 bg-transparent font-sans-lato text-sm focus:ring-0 p-0 cursor-pointer text-on-surface appearance-none pr-6"
            >
              {reductionOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60 pointer-events-none" />
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-col space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
            {t('sale.filterCategories')}
          </label>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange?.(e.target.value)}
              className="border-0 bg-transparent font-sans-lato text-sm focus:ring-0 p-0 cursor-pointer text-on-surface appearance-none pr-6"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Right side sort */}
      <div className="flex items-center space-x-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
          {t('sale.filterSortBy')}
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="border-0 bg-transparent font-sans-lato text-sm focus:ring-0 p-0 cursor-pointer text-on-surface appearance-none pr-6"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SaleProductFilters;
