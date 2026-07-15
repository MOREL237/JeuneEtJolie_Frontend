// components/sections/ProductSection.tsx
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "../shared/SectionTitle";
import { ProductCard } from "../shared/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";

interface Product {
  id: string;
  name: string;
  description?: string;
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
  bgColor = "bg-background",
  showViewAll = true,
}: ProductSectionProps) => {
  const { t } = useTranslation();
  return (
    <section className={`py-12 md:py-16 lg:py-20 ${bgColor}`}>
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-10 md:mb-12">
          <div>
            <SectionTitle title={title} subtitle={subtitle} className="mb-0" />
          </div>
          {showViewAll && (
            <a
              href="/fr/catalogue"
              className="text-primary dark:text-primary-400 font-label-md text-sm md:text-base flex items-center gap-2 hover:gap-3 transition-all group"
            >
              {t("common.viewAll")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          )}
        </div>

        {/* Products Grid - Exactement 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
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