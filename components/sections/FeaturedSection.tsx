// components/sections/FeaturedSection.tsx
"use client";

import React from "react";
import { Button } from "../ui/Button";

interface FeaturedProduct {
  name: string;
  description: string;
  price: number;
  image: string;
}

interface FeaturedSectionProps {
  title?: string;
  backgroundImage?: string;
  products?: FeaturedProduct[];
}

const defaultProducts: FeaturedProduct[] = [
  {
    name: 'Sandales "Soleil d\'Or"',
    description: "Confort et élégance",
    price: 22000,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200",
  },
  {
    name: 'Montre "Aurore"',
    description: "L'accessoire intemporel",
    price: 68000,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200",
  },
];

export const FeaturedSection = ({
  title = "L'Essentiel",
  backgroundImage = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
  products = defaultProducts,
}: FeaturedSectionProps) => {
  return (
    <section className="py-section-gap bg-[#fff5f7]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Large Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-[4/5]">
          <img
            src={backgroundImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-12 left-12">
            <h2 className="font-headline-lg text-white text-4xl lg:text-5xl mb-4">
              {title}
            </h2>
            <Button variant="inverted" size="md">
              Explorer la sélection
            </Button>
          </div>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white p-6 lg:p-8 rounded-2xl flex gap-6 items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-headline-md text-lg">{product.name}</h4>
                <p className="text-outline mb-2">{product.description}</p>
                <span className="text-primary font-bold">
                  {product.price.toLocaleString()} FCFA
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;