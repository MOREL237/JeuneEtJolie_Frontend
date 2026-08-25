// components/sections/SaleProductFilters.tsx
'use client';

import React, { useState } from 'react';
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

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  label 
}: { 
  options: FilterOption[], 
  value: string, 
  onChange: (v: string) => void,
  label: string
}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative">
      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 block mb-2">
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-on-surface hover:border-outline transition-colors"
      >
        <span>{options.find(o => o.value === value)?.label || label}</span>
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container border border-outline-variant rounded-lg shadow-lg z-10">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-surface-container-high transition-colors ${
                value === opt.value ? 'bg-primary/10 text-primary font-semibold' : 'text-on-surface'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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
    <div className="sticky top-20 z-40 bg-background py-4 mb-8 border-b border-outline-variant pb-8 flex flex-wrap items-end justify-between gap-6">
      {/* Left side filters */}
      <div className="flex items-end space-x-8">
        {/* Reduction filter */}
        <CustomSelect
          options={reductionOptions}
          value={reductionFilter}
          onChange={onReductionChange || (() => {})}
          label={t('sale.filterReduction')}
        />

        {/* Category filter */}
        <CustomSelect
          options={categoryOptions}
          value={categoryFilter}
          onChange={onCategoryChange || (() => {})}
          label={t('sale.filterCategories')}
        />
      </div>

      {/* Right side sort */}
      <div className="flex items-end">
        <CustomSelect
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange || (() => {})}
          label={t('sale.filterSortBy')}
        />
      </div>
    </div>
  );
};

export default SaleProductFilters;
