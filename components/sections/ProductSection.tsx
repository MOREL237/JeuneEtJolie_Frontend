// components/sections/ProductSection.tsx
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "../shared/SectionTitle";
import { ProductCard } from "../shared/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
  badgeVariant?: "primary" | "secondary" | "tertiary" | "neutral";
}

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  bgColor?: string;
  showViewAll?: boolean;
}

export const ProductSection = ({
  title,
  subtitle,
  products,
  bgColor = "bg-surface-container",
  showViewAll = true,
}: ProductSectionProps) => {
  return (
    <section className={`py-section-gap ${bgColor}`}>
      <div className="max-w-[1440px] mx-auto px-5 lg:px-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <SectionTitle title={title} subtitle={subtitle} className="mb-0" />
          </div>
          {showViewAll && (
            <a
              href="#"
              className="text-primary font-label-md flex items-center gap-2 hover:underline shrink-0"
            >
              Voir tout <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              badge={product.badge}
              badgeVariant={product.badgeVariant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;