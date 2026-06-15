// components/sections/CartItem.tsx
'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  name,
  variant,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex gap-6 p-6 bg-white rounded-lg shadow-sm border border-outline-variant/30">
      {/* Image */}
      <div className="w-32 h-40 flex-shrink-0 bg-surface-container overflow-hidden rounded">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline-md text-xl text-on-surface">{name}</h3>
            <p className="text-on-surface-variant font-label-md mt-1">{variant}</p>
          </div>
          <p className="font-headline-md text-xl text-primary">
            {price.toLocaleString()} €
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity */}
          <div className="flex items-center border border-outline-variant rounded-lg">
            <button
              onClick={() => quantity > 1 && onQuantityChange(id, quantity - 1)}
              className="px-3 py-1 hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-sm">remove</span>
            </button>
            <span className="px-4 font-semibold">{quantity}</span>
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              className="px-3 py-1 hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => onRemove(id)}
            className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;