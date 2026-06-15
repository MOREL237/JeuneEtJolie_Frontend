// components/sections/RelatedProducts.tsx
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '../shared/SectionTitle';

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface RelatedProductsProps {
  title?: string;
  subtitle?: string;
  products: RelatedProduct[];
}

export const RelatedProducts = ({
  title = 'Vous aimerez aussi',
  subtitle = 'Complétez votre look avec notre sélection exclusive.',
  products,
}: RelatedProductsProps) => {
  return (
    <section className="mt-section-gap mb-20">
      <div className="flex justify-between items-end mb-10">
        <div>
          <SectionTitle title={title} subtitle={subtitle} className="mb-0" />
        </div>
        <a
          href="#"
          className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform"
        >
          Voir toute la collection <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col gap-4 cursor-pointer">
            <div className="aspect-[3/4] rounded-xl bg-surface-container overflow-hidden relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Quick Buy */}
              <button className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-white text-on-surface py-3 rounded-lg font-bold opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-tertiary-fixed">
                Quick Buy
              </button>
              
              {/* Wishlist */}
              <button className="absolute top-4 right-4 text-white hover:text-primary drop-shadow-md">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">{product.price.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;