// app/[lang]/panier/page.tsx
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PromoBanner } from '@/components/layout/PromoBanner';
import { CartList } from '@/components/sections/CartList';
import { OrderSummary } from '@/components/sections/OrderSummary';
import { UpsellProducts } from '@/components/sections/UpsellProducts';
import { Footer } from '@/components/layout/Footer';
import TopNavBar from '@/components/layout/TopNavBar';
import { useTranslation } from '@/hooks/useTranslation';

const cartItems = [
  {
    id: '1',
    name: 'Robe Wrap "Lumière du Sahel"',
    variant: 'Taille : 38 · Couleur : Rose Fuchsia',
    price: 120000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
  },
  {
    id: '2',
    name: "Collier \"Soleil d'Abidjan\"",
    variant: 'Matière : Or plaquage 24k',
    price: 49500,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: '3',
    name: 'Sandales "Nomade" Cuir Or',
    variant: 'Taille : 39 · Couleur : Doré',
    price: 78500,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
  },
];

const upsellProducts = [
  {
    id: 'u1',
    name: 'Foulard "Sahara" Soie',
    price: 29500,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',
  },
  {
    id: 'u2',
    name: "Pochette \"Nuit d'Or\"",
    price: 62000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
  },
  {
    id: 'u3',
    name: "Boucles d'Oreilles \"Lotus\"",
    price: 36000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: 'u4',
    name: 'Capeline "Riviera"',
    price: 42500,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  },
];

export default function CartPage() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const lang   = (params?.lang as string) || 'fr';

  const deliveryOptions = [
    { value: 'standard', label: t('cartPage.deliveryOptions.standard'), price: 0 },
    { value: 'express',  label: t('cartPage.deliveryOptions.express'),  price: 9800 },
    { value: 'pickup',   label: t('cartPage.deliveryOptions.pickup'),   price: 0 },
  ];

  const [items, setItems] = useState(cartItems);
  const [delivery, setDelivery] = useState('standard');
  const [promoCode, setPromoCode] = useState<string | undefined>();
  const [discount, setDiscount] = useState<number | undefined>();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePromoApply = (code: string) => {
    if (code === 'BIENVENUE10') {
      setPromoCode(code);
      setDiscount(Math.round(subtotal * 0.1));
    }
  };

  const handleCheckout = () => {
    router.push(`/${lang}/checkout`);
  };

  const handleQuickAdd = (id: string) => {
    console.log('Quick add:', id);
  };

  return (
    <>
      <PromoBanner />
      <TopNavBar />

      <main className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-on-surface dark:text-slate-100">
            {t('cartPage.title')}{' '}
            <span className="text-primary dark:text-primary-400 font-normal">
              ({items.length} {t('cartPage.articlesCount')})
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12 lg:mb-16">
          {/* Left: Cart Items */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <CartList
              items={items}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          </div>

          {/* Right: Order Summary */}
          <OrderSummary
            subtotal={subtotal}
            deliveryOptions={deliveryOptions}
            deliverySelected={delivery}
            onDeliveryChange={setDelivery}
            onPromoApply={handlePromoApply}
            promoCode={promoCode}
            discount={discount}
            onCheckout={handleCheckout}
          />
        </div>

        {/* Upsell */}
        <div className="mt-12 lg:mt-16">
          <UpsellProducts products={upsellProducts} onQuickAdd={handleQuickAdd} />
        </div>
      </main>

      <Footer variant="catalogue" />
    </>
  );
}