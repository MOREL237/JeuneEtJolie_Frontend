// components/sections/ProductGrid.tsx
'use client';

import { useState } from 'react';
import { LayoutGrid, List, ChevronDown, X } from 'lucide-react';
import  ProductCard  from '../shared/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  category?: string;
  rating?: number;
  reviews?: number;
  sizes?: string[];
  onAddToCart?: () => void;
}

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  activeFilters?: string[];
  onRemoveFilter?: (filter: string) => void;
  onClearAllFilters?: () => void;
  showHeader?: boolean;
  columns?: 3 | 4;
  onProductAddToCart?: (productId: string) => void;
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
  activeFilters = [],
  onRemoveFilter,
  onClearAllFilters,
  showHeader = true,
  columns = 3,
  onProductAddToCart,
}: ProductGridProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const gridColumnsClass = columns === 4
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';

  return (
    <div className="flex-1">
      {/* Header - conditionnel */}
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            {title && <h1 className="font-headline-lg text-on-surface">{title}</h1>}
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
                <div className="absolute right-0 top-full mt-2 bg-surface rounded-lg shadow-lg border border-outline-variant py-2 z-10 min-w-[180px]">
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
      )}

      {/* Active Filters - conditionnel */}
      {activeFilters.length > 0 && onRemoveFilter && onClearAllFilters && (
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

      {/* Product Grid/List */}
      {viewMode === 'grid' ? (
        /* Mode Grille */
        <div className={`grid ${gridColumnsClass} gap-6 lg:gap-8`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
              badge={product.badge}
              badgeVariant={product.badgeVariant}
              rating={product.rating}
              reviews={product.reviews}
              sizes={product.sizes}
              onAddToCart={product.onAddToCart || (() => onProductAddToCart?.(product.id))}
              onAddToWishlist={() => console.log('Wishlist', product.id)}
            />
          ))}
        </div>
      ) : (
        /* Mode Liste */
        <div className="space-y-6 lg:space-y-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row gap-4 md:gap-6 bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <a
                href={`/fr/produit/${product.id}`}
                className="relative w-full md:w-64 lg:w-80 h-64 md:h-80 shrink-0 block"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.category && (
                    <span className="bg-surface/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                      {product.category}
                    </span>
                  )}
                  {product.badge && (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${
                      product.badgeVariant === 'tertiary'
                        ? 'bg-tertiary-container text-on-tertiary'
                        : 'bg-primary text-on-primary'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-secondary text-on-secondary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all shadow-sm"
                  aria-label="Ajouter aux favoris"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </a>

              {/* Info */}
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                <div className="space-y-3 md:space-y-4">
                  {product.rating !== undefined && (
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`material-symbols-outlined text-lg ${
                              i < Math.floor(product.rating!) ? 'text-gold' : 'text-on-surface/20'
                            }`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-on-surface-variant">
                        ({product.rating} • {product.reviews} avis)
                      </span>
                    </div>
                  )}

                  <a href={`/fr/produit/${product.id}`}>
                    <h3 className="font-headline-md text-xl md:text-2xl text-on-surface hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </a>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-bold text-2xl md:text-3xl text-primary">
                      {product.price.toLocaleString()} FCFA
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-on-surface-variant line-through">
                        {product.originalPrice.toLocaleString()} FCFA
                      </span>
                    )}
                  </div>

                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-on-surface-variant font-bold">
                        Tailles disponibles:
                      </span>
                      <div className="flex gap-2 flex-wrap">
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="text-sm border-2 border-outline-variant px-3 py-2 rounded-lg hover:border-primary hover:text-primary transition-colors cursor-pointer font-medium"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 md:mt-6">
                  <button
                    className="flex-1 bg-primary text-on-primary py-3 md:py-4 rounded-lg text-sm md:text-base font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    onClick={() => product.onAddToCart?.() || onProductAddToCart?.(product.id)}
                  >
                    <span className="material-symbols-outlined">shopping_bag</span>
                    Ajouter au panier
                  </button>
                  <a
                    href={`/fr/produit/${product.id}`}
                    className="px-4 md:px-5 bg-surface-container text-on-surface rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined">visibility</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;