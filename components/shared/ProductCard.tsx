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
  category?: string; // 🆕 Pour Accessoires
  rating?: number;
  reviews?: number;
  sizes?: string[];
  onAddToCart?: (size?: string) => void;
  onAddToWishlist?: () => void;
  onViewProduct?: () => void;
}

export const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  badge,
  badgeVariant = 'primary',
  category, // 🆕
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(selectedSize || undefined);
  };

  const handleViewProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewProduct?.();
  };

  const productUrl = id ? `/fr/produit/${id}` : '#';

  return (
    <div className="group product-card relative bg-surface-container-lowest overflow-hidden transition-all duration-500">
      {/* Image Container - PAS de <a> ici pour éviter le conflit avec les boutons */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-container">
        {/* Lien image uniquement */}
        <a href={productUrl} className="block w-full h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </a>

        {/* 🆕 Badges catégorie + promo (style Accessoires) */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
          {/* Badge catégorie (ex: Bijoux, Sacs) - style Accessoires */}
          {category && (
            <div className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-on-surface">
              {category}
            </div>
          )}
          {/* Badge promotionnel (ex: NOUVEAU, POPULAIRE) - style Accessoires */}
          {badge && (
            <div className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase ${
              badgeVariant === 'tertiary' 
                ? 'bg-tertiary-container text-on-tertiary' 
                : 'bg-primary text-on-primary'
            }`}>
              {badge}
            </div>
          )}
          {/* Badge discount */}
          {discount && (
            <Badge variant="neutral" className="text-[10px] px-2 py-1">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Wishlist - avec état visuel */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur shadow-sm flex items-center justify-center transition-all z-10 ${
            isWishlisted 
              ? 'bg-primary text-on-primary' 
              : 'bg-white/80 text-on-surface-variant hover:text-primary'
          }`}
          aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* 🆕 Quick Add Overlay - style Accessoires (uniquement en bas) */}
        <div className="absolute bottom-0 left-0 right-0 bg-surface/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-white p-4 rounded-t-xl shadow-xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-auto">
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedSize(size);
                      }}
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
                
                {/* Bouton ajouter avec icône panier */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="w-full py-3 bg-primary text-on-primary text-sm font-bold rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter au panier
                </button>
              </div>
            ) : (
              /* Bouton voir le produit avec icône œil */
              <button
                onClick={handleViewProduct}
                className="w-full py-3 bg-surface-container text-on-surface text-sm font-bold rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Voir le produit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Info - style Accessoires (centré, avec favoris à côté du titre) */}
      <div className="pt-4 pb-6 px-2 text-center">
        <div className="flex justify-between items-start mb-1 px-2">
          <a href={productUrl} className="block flex-1 text-left">
            <h3 className="font-headline-md text-lg text-on-surface group-hover:text-primary transition-colors">
              {name}
            </h3>
          </a>
          {/* 🆕 Favoris inline (style Accessoires) */}
          <button 
            onClick={handleWishlist}
            className={`transition-colors shrink-0 ml-2 ${
              isWishlisted ? 'text-primary' : 'text-outline-variant hover:text-primary'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
        <p className="font-body-md text-primary font-bold text-left px-2">
          {price.toLocaleString()} FCFA
        </p>
        {originalPrice && (
          <p className="text-xs text-on-surface-variant line-through text-left px-2">
            {originalPrice.toLocaleString()} FCFA
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;