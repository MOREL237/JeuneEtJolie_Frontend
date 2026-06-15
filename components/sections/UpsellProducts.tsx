// components/sections/UpsellProducts.tsx
'use client';

import React from 'react';
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
}

export const UpsellProducts = ({
  title = 'Vous oubliez peut-être',
  subtitle = 'Complétez votre look avec notre sélection exclusive.',
  products,
  onQuickAdd,
}: UpsellProductsProps) => {
  return (
    <section className="mt-section-gap">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="font-headline-md text-headline-md">{title}</h3>
          {subtitle && <p className="text-outline mt-2">{subtitle}</p>}
        </div>
        <a
          href="#"
          className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform"
        >
          Voir tout <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {products.map((product) => (
          <UpsellCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            onQuickAdd={onQuickAdd}
          />
        ))}
      </div>
    </section>
  );
};

export default UpsellProducts;