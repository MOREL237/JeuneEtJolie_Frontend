// components/sections/ProductGrid.tsx
'use client';

import React, { useState } from 'react';
import { LayoutGrid, List, ChevronDown, X } from 'lucide-react';
import { ProductCard } from '../shared/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  rating: number;
  reviews: number;
  sizes?: string[];
}

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  activeFilters: string[];
  onRemoveFilter: (filter: string) => void;
  onClearAllFilters: () => void;
}

const sortOptions = [
  { value: 'relevance', label: 'Pertinence' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'newest', label: 'Nouveautés' },
];

export const ProductGrid = ({
  title,
  subtitle,
  products,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
}: ProductGridProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="font-headline-lg text-on-surface">{title}</h1>
          {subtitle && (
            <p className="text-on-surface-variant font-body-md mt-2">{subtitle}</p>
          )}
        </div>

        {/* Control Bar */}
        <div className="flex items-center gap-4 border-b border-outline-variant pb-2">
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1 p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-surface-container text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1 p-2 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-surface-container text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-outline-variant" />

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-transparent border-none pr-8 py-2 font-label-md cursor-pointer text-on-surface"
            >
              {sortOptions.find((o) => o.value === sortBy)?.label}
              <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-outline-variant py-2 z-10 min-w-[180px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors ${
                      sortBy === option.value ? 'text-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full"
            >
              {filter.replace('size-', '').replace('color-', '')}
              <button
                onClick={() => onRemoveFilter(filter)}
                className="hover:text-error transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={onClearAllFilters}
            className="text-xs text-on-surface-variant font-bold hover:text-primary underline underline-offset-4"
          >
            Effacer tout
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div
        className={`grid gap-x-gutter gap-y-16 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1'
        }`}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.image}
            badge={product.badge}
            badgeVariant={product.badgeVariant}
            rating={product.rating}
            reviews={product.reviews}
            sizes={product.sizes}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;