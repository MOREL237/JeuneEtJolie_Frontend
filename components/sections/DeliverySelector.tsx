// components/sections/DeliverySelector.tsx
'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface DeliveryOption {
  value: string;
  label: string;
  price: number;
}

interface DeliverySelectorProps {
  options: DeliveryOption[];
  selected: string;
  onChange: (value: string) => void;
}

export const DeliverySelector = ({ options, selected, onChange }: DeliverySelectorProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-2">
      <label className="text-label-md text-on-surface-variant block">{t('delivery.shippingAndReturns')}</label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-container-low border-none rounded-lg p-3 text-body-md focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} {option.price > 0 ? `(${option.price.toLocaleString()} FCFA)` : `(${t('delivery.free')})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeliverySelector;