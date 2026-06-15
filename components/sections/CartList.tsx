// components/sections/CartList.tsx
'use client';

import React from 'react';
import { CartItem } from './CartItem';

interface CartItemData {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartListProps {
  items: CartItemData[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartList = ({ items, onQuantityChange, onRemove }: CartListProps) => {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          variant={item.variant}
          price={item.price}
          quantity={item.quantity}
          image={item.image}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;