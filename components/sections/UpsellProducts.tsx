// components/sections/UpsellProducts.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { UpsellCard } from './UpsellCard';

interface UpsellProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface UpsellProductsProps {
  title?: string;
  subtitle?: string;
  products: UpsellProduct[];
  onQuickAdd: (id: string) => void;
  currency?: string;
}

export const UpsellProducts = ({
  title = 'Vous aimerez aussi',
  subtitle = 'Complétez votre look avec notre sélection exclusive.',
  products,
  onQuickAdd,
  currency = 'FCFA',
}: UpsellProductsProps) => {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';

  return (
    <section className="mt-12 md:mt-16">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-6 md:mb-8">
        <div>
          <h3 className="font-headline-md text-xl md:text-2xl">{title}</h3>
          {subtitle && <p className="text-sm md:text-base text-outline mt-2">{subtitle}</p>}
        </div>
        <a
          href={`/${lang}/catalogue`}
          className="text-primary text-sm md:text-base font-bold flex items-center gap-2 hover:translate-x-2 transition-transform"
        >
          {lang === 'en' ? 'View all' : 'Voir tout'} <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <UpsellCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onQuickAdd={onQuickAdd}
            currency={currency}
          />
        ))}
      </div>
    </section>
  );
};

export default UpsellProducts;