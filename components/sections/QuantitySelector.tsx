// components/sections/QuantitySelector.tsx
'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) => {
  const decrement = () => value > min && onChange(value - 1);
  const increment = () => value < max && onChange(value + 1);

  return (
    <div className="flex items-center border border-outline-variant rounded-lg h-14">
      <button
        onClick={decrement}
        className="p-2 hover:text-primary transition-colors"
        disabled={value <= min}
      >
        <Minus className="w-5 h-5" />
      </button>
      <span className="w-12 text-center font-bold">{value}</span>
      <button
        onClick={increment}
        className="p-2 hover:text-primary transition-colors"
        disabled={value >= max}
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuantitySelector;