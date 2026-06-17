// app/[lang]/panier/page.tsx
'use client';

import React, { useState } from 'react';
import { PromoBanner } from '@/components/layout/PromoBanner';
import { CartList } from '@/components/sections/CartList';
import { OrderSummary } from '@/components/sections/OrderSummary';
import { UpsellProducts } from '@/components/sections/UpsellProducts';
import { Footer } from '@/components/layout/Footer';
import TopNavBar from '@/components/layout/TopNavBar';

const cartItems = [
  {
    id: '1',
    name: 'Robe Wrap "Lumière du Sahel"',
    variant: 'Taille: 38 | Couleur: Rose Fuchsia',
    price: 185,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
  },
  {
    id: '2',
    name: "Collier \"Soleil d'Abidjan\"",
    variant: 'Matière: Or Plaquage 24k',
    price: 75,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: '3',
    name: 'Sandales "Nomade" Cuir Or',
    variant: 'Taille: 39 | Couleur: Doré',
    price: 120,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
  },
];

const deliveryOptions = [
  { value: 'standard', label: 'Livraison Standard', price: 0 },
  { value: 'express', label: "Livraison Express", price: 15 },
  { value: 'pickup', label: 'Retrait en Boutique', price: 0 },
];

const upsellProducts = [
  {
    id: 'u1',
    name: 'Foulard "Sahara" Soie',
    price: 45,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',
  },
  {
    id: 'u2',
    name: "Pochette \"Nuit d'Or\"",
    price: 95,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
  },
  {
    id: 'u3',
    name: 'Boucles d\'Oreilles "Lotus"',
    price: 55,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: 'u4',
    name: 'Capeline "Riviera"',
    price: 65,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  },
];

export default function CartPage() {
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
    console.log('Checkout:', { items, delivery, promoCode, total: subtotal });
  };

  const handleQuickAdd = (id: string) => {
    console.log('Quick add:', id);
  };

  return (
    <>
      <PromoBanner />
      <TopNavBar />

      <main className="max-w-[1440px] mx-auto px-5 lg:px-20 py-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Mon Panier{' '}
            <span className="text-primary font-normal">({items.length} articles)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left: Cart Items */}
          <div className="lg:col-span-8 space-y-8">
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
        <UpsellProducts products={upsellProducts} onQuickAdd={handleQuickAdd} />
      </main>

      <Footer variant="catalogue" />
    </>
  );
}