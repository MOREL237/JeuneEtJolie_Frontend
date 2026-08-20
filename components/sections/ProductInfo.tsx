// components/sections/ProductInfo.tsx
'use client';

import React, { useState } from 'react';
import { ShoppingBag, Heart, AlertCircle } from 'lucide-react';
import { StarRating } from '../shared/StarRating';
import { QuantitySelector } from './QuantitySelector';
import { Button } from '../ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

interface ColorOption {
  name: string;
  hex: string;
  value: string;
}

interface SizeOption {
  label: string;
  available: boolean;
}

interface ProductInfoProps {
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  colors: ColorOption[];
  sizes: SizeOption[];
  stockWarning?: number;
}

export const ProductInfo = ({
  brand,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  colors,
  sizes,
  stockWarning,
}: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.value);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { t } = useTranslation();

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div className="flex flex-col gap-8 sticky top-32">
      {/* Brand & Title */}
      <div className="flex flex-col gap-2">
        <a href="#" className="text-primary font-label-md uppercase tracking-widest hover:underline">
          {brand}
        </a>
        <h1 className="font-headline-lg text-on-surface leading-tight">{name}</h1>
        
        {/* Rating */}
        <div className="flex items-center gap-4 mt-2">
          <StarRating rating={rating} size="md" />
          <span className="text-body-md text-outline">
            ({rating} • {reviews} {t('productPage.reviews')})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-4 mt-4">
          <span className="text-headline-lg font-bold text-primary">
            {price.toLocaleString()} FCFA
          </span>
          {originalPrice && (
            <>
              <span className="text-body-lg text-outline line-through">
                {originalPrice.toLocaleString()} FCFA
              </span>
              <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Color Selection */}
      <div className="flex flex-col gap-3">
        <span className="text-label-md text-on-surface uppercase tracking-wider">
          {t('productPage.color')}{' '}
          <span className="font-normal text-outline">
            {colors.find((c) => c.value === selectedColor)?.name}
          </span>
        </span>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`w-10 h-10 rounded-full p-0.5 transition-all ${
                selectedColor === color.value
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'ring-1 ring-outline-variant hover:ring-primary'
              }`}
              title={color.name}
            >
              <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-label-md text-on-surface uppercase tracking-wider">{t('productPage.size')}</span>
          <button className="text-label-md text-primary underline underline-offset-4 hover:text-on-secondary-fixed-variant">
            {t('productPage.sizeGuide')}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => size.available && setSelectedSize(size.label)}
              disabled={!size.available}
              className={`px-6 py-3 rounded-lg text-body-md transition-all ${
                selectedSize === size.label
                  ? 'border-2 border-primary bg-primary/5 text-primary font-bold'
                  : size.available
                  ? 'border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
                  : 'border border-outline-variant opacity-40 cursor-not-allowed line-through text-on-surface-variant'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
        
        {/* Stock Warning */}
        {stockWarning && stockWarning <= 5 && (
          <p className="flex items-center gap-2 text-error font-medium text-sm mt-1">
            <AlertCircle className="w-4 h-4" />
            {t('productPage.stockWarning').replace('{count}', String(stockWarning))}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 h-14">
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <Button
            variant="primary"
            size="lg"
            className="flex-1 shadow-lg hover:translate-y-[-2px] transition-all flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            {t('productPage.addToCart')}
          </Button>
        </div>
        
        <Button
          variant="outlined"
          size="lg"
          className="w-full flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          {t('productPage.addToWishlist')}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;