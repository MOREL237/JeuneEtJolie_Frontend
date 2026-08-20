// components/sections/OrderSummary.tsx
'use client';

import { ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { DeliverySelector } from './DeliverySelector';
import { PromoCodeInput } from './PromoCodeInput';
import { useTranslation } from '@/hooks/useTranslation';

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

const formatFCFA = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';

const PAYMENT_LABELS = ['Orange Money', 'MTN MoMo', 'Wave', 'Visa'];

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
  const { t } = useTranslation();
  const deliveryPrice = deliveryOptions.find((o) => o.value === deliverySelected)?.price ?? 0;
  const total = subtotal + deliveryPrice - (discount ?? 0);

  return (
    <aside className="lg:col-span-4 sticky top-28">
      <div className="bg-surface border border-outline-variant/20 rounded-2xl p-6 md:p-8 shadow-ambient">

        {/* Titre */}
        <h3
          className="text-on-surface mb-6"
          style={{
            fontFamily: 'var(--font-cormorant, Georgia, serif)',
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            fontWeight: 400,
          }}
        >
          {t('orderSummary.title')}
        </h3>

        <div className="space-y-4 mb-6 pb-6 border-b border-outline-variant/20">

          {/* Sous-total */}
          <div className="flex justify-between text-sm">
            <span className="text-on-surface/60">{t('orderSummary.subtotal')}</span>
            <span className="font-semibold text-on-surface tabular-nums">
              {formatFCFA(subtotal)}
            </span>
          </div>

          {/* Livraison */}
          <DeliverySelector
            options={deliveryOptions}
            selected={deliverySelected}
            onChange={onDeliveryChange}
          />

          {/* Code promo */}
          <PromoCodeInput
            onApply={onPromoApply}
            appliedCode={promoCode}
            discount={discount}
          />

          {/* Remise */}
          {discount && discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gold">{t('orderSummary.discount').replace('{code}', promoCode || '')}</span>
              <span className="font-semibold text-gold tabular-nums">
                −{formatFCFA(discount)}
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between items-baseline mb-7">
          <span className="text-sm font-semibold text-on-surface">{t('orderSummary.total')}</span>
          <span
            className="font-bold text-primary tabular-nums"
            style={{
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            }}
          >
            {formatFCFA(total)}
          </span>
        </div>

        {/* Bouton commander */}
        <Button
          variant="primary"
          size="lg"
          className="w-full mb-5"
          onClick={onCheckout}
        >
          {t('orderSummary.placeOrder')}
        </Button>

        {/* Badge sécurité */}
        <div className="flex items-center gap-2.5 bg-primary/5 border border-primary/10
                        rounded-xl px-4 py-3 text-xs text-on-surface/60 mb-4">
          <ShieldCheck size={15} className="shrink-0 text-primary" strokeWidth={1.75} />
          {t('orderSummary.securePayment')}
        </div>

        {/* Méthodes de paiement */}
        <div className="flex flex-wrap justify-center gap-2">
          {PAYMENT_LABELS.map((m) => (
            <span
              key={m}
              className="px-2.5 py-1 rounded-lg border border-outline-variant/30
                         text-[10px] font-semibold text-on-surface/35 tracking-wide"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
