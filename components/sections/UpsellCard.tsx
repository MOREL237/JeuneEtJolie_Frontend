// components/sections/UpsellCard.tsx
'use client';

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface UpsellCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onQuickAdd: (id: string) => void;
}

export const UpsellCard = ({ id, name, price, image, onQuickAdd }: UpsellCardProps) => {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[3/4] bg-surface-container overflow-hidden rounded-lg mb-4 relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quick Add */}
        <button
          onClick={() => onQuickAdd(id)}
          className="absolute bottom-4 right-4 bg-tertiary-container p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
        >
          <ShoppingCart className="w-5 h-5 text-on-tertiary-container" />
        </button>
      </div>
      
      <div className="flex flex-col gap-1">
        <h4 className="font-headline-md text-lg text-on-surface group-hover:text-primary transition-colors">
          {name}
        </h4>
        <span className="font-bold text-primary">{price.toLocaleString()} €</span>
      </div>
    </div>
  );
};

export default UpsellCard;