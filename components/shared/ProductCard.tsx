// components/shared/ProductCard.tsx
'use client';

import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
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
  onViewProduct?: () => void;
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
  onViewProduct,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.();
  };

  const handleAddToCart = (size?: string) => {
    onAddToCart?.(size || selectedSize || undefined);
  };

  return (
    <div className="group product-card relative">
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

        {/* Wishlist - avec état visuel */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur shadow-sm flex items-center justify-center transition-all ${
            isWishlisted 
              ? 'bg-primary text-on-primary' 
              : 'bg-white/80 text-on-surface-variant hover:text-primary'
          }`}
          aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Overlay - uniquement en bas */}
        <div className="absolute bottom-0 left-0 right-0 bg-surface/10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white p-4 rounded-t-xl shadow-xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-[10px] font-bold text-on-surface-variant mb-3 uppercase tracking-widest text-center">
              Ajout Rapide
            </p>
            
            {sizes && sizes.length > 0 ? (
              <div className="space-y-3">
                {/* Sélection de taille */}
                <div className="flex justify-center gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 text-xs font-bold rounded-lg transition-all border-2 ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-outline-variant hover:border-primary hover:text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                
                {/* Bouton ajouter avec icône */}
                <button
                  onClick={() => handleAddToCart()}
                  disabled={!selectedSize}
                  className="w-full py-3 bg-primary text-on-primary text-sm font-bold rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter au panier
                </button>
              </div>
            ) : (
              /* Bouton voir le produit avec icône */
              <button
                onClick={onViewProduct}
                className="w-full py-3 bg-surface-container text-on-surface text-sm font-bold rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
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