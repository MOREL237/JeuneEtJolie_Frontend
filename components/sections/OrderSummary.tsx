// components/sections/OrderSummary.tsx
'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { DeliverySelector } from './DeliverySelector';
import { PromoCodeInput } from './PromoCodeInput';

interface OrderSummaryProps {
  subtotal: number;
  deliveryOptions: { value: string; label: string; price: number }[];
  deliverySelected: string;
  onDeliveryChange: (value: string) => void;
  onPromoApply: (code: string) => void;
  promoCode?: string;
  discount?: number;
  onCheckout: () => void;
}

export const OrderSummary = ({
  subtotal,
  deliveryOptions,
  deliverySelected,
  onDeliveryChange,
  onPromoApply,
  promoCode,
  discount,
  onCheckout,
}: OrderSummaryProps) => {
  const deliveryPrice = deliveryOptions.find((o) => o.value === deliverySelected)?.price || 0;
  const total = subtotal + deliveryPrice - (discount || 0);

  return (
    <aside className="lg:col-span-4 sticky top-28">
      <div className="bg-white p-8 rounded-lg shadow-md border border-outline-variant/30">
        <h3 className="font-headline-md text-2xl mb-6">Récapitulatif</h3>

        <div className="space-y-4 mb-6 border-b border-outline-variant pb-6">
          {/* Subtotal */}
          <div className="flex justify-between text-body-md">
            <span>Sous-total</span>
            <span>{subtotal.toLocaleString()} €</span>
          </div>

          {/* Delivery */}
          <DeliverySelector
            options={deliveryOptions}
            selected={deliverySelected}
            onChange={onDeliveryChange}
          />

          {/* Promo */}
          <PromoCodeInput
            onApply={onPromoApply}
            appliedCode={promoCode}
            discount={discount}
          />
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-8">
          <span className="font-headline-md text-xl">Total</span>
          <span className="font-headline-md text-3xl text-primary">
            {total.toLocaleString()} €
          </span>
        </div>

        {/* Checkout */}
        <Button
          variant="primary"
          size="lg"
          className="w-full shadow-lg hover:scale-[1.02] active:opacity-80 mb-6"
          onClick={onCheckout}
        >
          Passer la commande
        </Button>

        {/* Security */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-green-700 bg-green-50 p-3 rounded-lg text-sm">
            <ShieldCheck className="w-5 h-5" />
            <p>Paiement 100% sécurisé et encrypté</p>
          </div>

          {/* Payment Icons */}
          <div className="flex justify-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="h-6 w-10 bg-surface-container rounded" /> {/* Visa placeholder */}
            <div className="h-6 w-10 bg-surface-container rounded" /> {/* MC placeholder */}
            <div className="h-6 w-10 bg-surface-container rounded" /> {/* PayPal placeholder */}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;