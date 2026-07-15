// components/shared/ProductCard.tsx
//
// Carte produit premium avec :
//   • Effet TiltCard 3D magnétique au survol
//   • Overlay "Quick Add" avec sélection de taille
//   • Bouton wishlist avec état visuel persistant
//   • Badge de réduction calculé automatiquement

'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Eye, ArrowRight } from 'lucide-react';
import { TiltCard } from '@/components/3d/TiltCard';
import { Badge } from '../ui/Badge';
import { StarRating } from './StarRating';
import { useTranslation } from '@/hooks/useTranslation';

interface ProductCardProps {
  id?:            string;
  name:           string;
  description?:   string;
  price:          number;
  originalPrice?: number;
  image:          string;
  badge?:         string;
  badgeVariant?:  'primary' | 'secondary' | 'tertiary' | 'neutral';
  rating?:        number;
  reviews?:       number;
  sizes?:         string[];
  onAddToCart?:   (size?: string) => void;
  onAddToWishlist?: () => void;
  onViewProduct?: () => void;
}

export const ProductCard = ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  badge,
  badgeVariant    = 'primary',
  rating,
  reviews,
  sizes,
  onAddToCart,
  onAddToWishlist,
  onViewProduct,
}: ProductCardProps) => {
  const { t, lang }      = useTranslation();
  const [wishlisted,     setWishlisted]     = useState(false);
  const [selectedSize,   setSelectedSize]   = useState<string | null>(null);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const productUrl = id ? `/${lang}/produit/${id}` : '#';

  const handleWishlist = () => {
    setWishlisted((w) => !w);
    onAddToWishlist?.();
  };

  const handleAddToCart = () => {
    onAddToCart?.(selectedSize ?? undefined);
  };

  return (
    <TiltCard className="product-card group" maxTilt={10} glare>
      {/* ── Image ── */}
      <a
        href={productUrl}
        className="block relative overflow-hidden rounded-xl bg-surface-container mb-4"
        style={{ aspectRatio: '3/4' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
        />

        {/* Overlay dégradé au bas */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#060614]/60 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {badge && (
            <Badge variant={badgeVariant} className="text-[10px] px-2 py-0.5">
              {badge}
            </Badge>
          )}
          {discount && (
            <span className="inline-block bg-[#060614]/80 text-gold text-[10px] font-bold
                             px-2 py-0.5 rounded-full tracking-wide">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? t('common.removeFromWishlist') : t('common.addToFavorites')}
          className={`
            absolute top-3 right-3 z-10
            w-9 h-9 min-w-[44px] min-h-[44px] rounded-full
            flex items-center justify-center
            backdrop-blur-sm shadow-sm
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${wishlisted
              ? 'bg-primary text-on-primary'
              : 'bg-white/80 dark:bg-surface/80 text-on-surface/50 hover:text-primary'
            }
          `}
        >
          <Heart size={15} strokeWidth={1.75} className={wishlisted ? 'fill-current' : ''} />
        </button>

        {/* Quick-add overlay — slide up au hover */}
        <div
          className="
            absolute inset-x-0 bottom-0 z-10
            bg-background/95 dark:bg-surface/95 backdrop-blur-sm
            rounded-t-xl px-4 py-4
            translate-y-full group-hover:translate-y-0
            transition-transform duration-350 ease-out
          "
        >
          <p className="text-label-caps text-on-surface/40 text-center mb-3">
            {t('common.quickAdd')}
          </p>

          {sizes && sizes.length > 0 ? (
            <div className="space-y-3">
              {/* Sélection taille */}
              <div className="flex justify-center gap-2 flex-wrap">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    aria-label={`${t('common.selectSize')} ${sz}`}
                    className={`
                      w-9 h-9 min-w-[44px] min-h-[44px] text-xs font-bold rounded-lg border-2
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                      ${selectedSize === sz
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-outline-variant text-on-surface/60 hover:border-primary hover:text-primary'
                      }
                    `}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              {/* Ajouter au panier */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="
                  w-full min-h-[44px] btn-primary justify-center rounded-xl
                  disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                <ShoppingCart size={14} />
                {t('common.addToCart')}
              </button>
            </div>
          ) : (
            /* Voir le produit */
            <a href={productUrl} onClick={onViewProduct}>
              <button className="w-full min-h-[44px] btn-outline rounded-xl justify-center">
                <Eye size={14} />
                {t('common.viewProduct')}
              </button>
            </a>
          )}
        </div>
      </a>

      {/* ── Infos texte ── */}
      <a
        href={productUrl}
        className="block space-y-1 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
      >
        {rating !== undefined && (
          <StarRating rating={rating} reviews={reviews} size="sm" />
        )}

        <h3
          className="text-base leading-snug text-on-surface group-hover:text-primary transition-colors duration-200"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontWeight: 500 }}
        >
          {name}
        </h3>

        {description && (
          <p className="text-[0.72rem] text-on-surface/50 leading-relaxed line-clamp-2 mt-0.5">
            {description}
          </p>
        )}

        <div className="flex items-baseline gap-2.5">
          <span className="font-bold text-on-surface text-sm">
            {price.toLocaleString()} FCFA
          </span>
          {originalPrice && (
            <span className="text-xs text-on-surface/35 line-through">
              {originalPrice.toLocaleString()} FCFA
            </span>
          )}
        </div>
      </a>
    </TiltCard>
  );
};

export default ProductCard;
