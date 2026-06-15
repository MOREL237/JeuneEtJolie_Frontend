// components/sections/PromoCodeInput.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';

interface PromoCodeInputProps {
  onApply: (code: string) => void;
  appliedCode?: string;
  discount?: number;
}

export const PromoCodeInput = ({ onApply, appliedCode, discount }: PromoCodeInputProps) => {
  const [code, setCode] = useState('');

  return (
    <div className="space-y-2">
      <label className="text-label-md text-on-surface-variant block">Code Promo</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Entrez votre code"
          className="flex-grow bg-surface-container-low border-none rounded-lg p-3 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          variant="outlined"
          size="md"
          onClick={() => onApply(code)}
          className="border-tertiary-container text-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container"
        >
          Appliquer
        </Button>
      </div>
      {appliedCode && discount && (
        <div className="flex justify-between text-primary font-medium text-sm">
          <span>Réduction ({appliedCode})</span>
          <span>-{discount.toLocaleString()} €</span>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;