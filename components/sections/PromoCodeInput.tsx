// components/sections/PromoCodeInput.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useTranslation } from '@/hooks/useTranslation';

interface PromoCodeInputProps {
  onApply: (code: string) => void;
  appliedCode?: string;
  discount?: number;
}

export const PromoCodeInput = ({ onApply, appliedCode, discount }: PromoCodeInputProps) => {
  const [code, setCode] = useState('');
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <label className="text-label-md text-on-surface-variant block">{t('cartPage.promoCode.placeholder')}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t('cartPage.promoCode.placeholder')}
          className="flex-grow bg-surface-container-low border-none rounded-lg p-3 text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button
          variant="outlined"
          size="md"
          onClick={() => onApply(code)}
          className="border-tertiary-container text-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container"
        >
          {t('cartPage.promoCode.apply')}
        </Button>
      </div>
      {appliedCode && discount && (
        <div className="flex justify-between text-primary font-medium text-sm">
          <span>{t('orderSummary.discount').replace('{code}', appliedCode)}</span>
          <span>-{discount.toLocaleString()} FCFA</span>
        </div>
      )}
    </div>
  );
};

export default PromoCodeInput;