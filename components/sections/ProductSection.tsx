// components/shared/ProductCard.tsx
'use client';

import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { StarRating } from '../shared/StarRating';

interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  rating?: number;
  reviews?: number;
  sizes?: string[];
  onAddToCart?: (size?: string) => void;
  onAddToWishlist?: () => void;
}

export const ProductCard = ({
  name,
  price,
  originalPrice,
  image,
  badge,
  badgeVariant = 'primary',
  rating,
  reviews,
  sizes,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div className="group product-card">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-container mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {badge && (
            <Badge variant={badgeVariant} className="text-[10px] px-2 py-1">
              {badge}
            </Badge>
          )}
          {discount && (
            <Badge variant="neutral" className="text-[10px] px-2 py-1">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={onAddToWishlist}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
        >
          <Heart className="w-5 h-5" />
        </button>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-surface/10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
          <div className="bg-white p-4 rounded-xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-[10px] font-bold text-on-surface-variant mb-3 uppercase tracking-widest text-center">
              Ajout Rapide
            </p>
            {sizes && sizes.length > 0 ? (
              <div className="flex justify-between gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => onAddToCart?.(size)}
                    className="flex-1 h-8 text-xs font-bold hover:bg-surface-container rounded transition-colors border border-outline-variant"
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => onAddToCart?.()}
                className="w-full py-2 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary-container transition-colors"
              >
                Voir le produit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1 px-1">
        {rating !== undefined && (
          <StarRating rating={rating} reviews={reviews} size="sm" />
        )}
        <h3 className="font-headline-md text-lg leading-tight group-hover:text-primary transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="font-bold text-on-surface">
            {price.toLocaleString()} FCFA
          </span>
          {originalPrice && (
            <span className="text-xs text-on-surface-variant line-through">
              {originalPrice.toLocaleString()} FCFA
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;