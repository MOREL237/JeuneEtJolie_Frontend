// components/sections/CategoryGrid.tsx
"use client";

import React from "react";
import { SectionTitle } from "../shared/SectionTitle";

interface Category {
  name: string;
  image: string;
  href?: string;
}

const defaultCategories: Category[] = [
  { name: "Robes", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600" },
  { name: "Hauts", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600" },
  { name: "Pantalons", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600" },
  { name: "Sacs", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" },
  { name: "Bijoux", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600" },
  { name: "Chaussures", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600" },
];

interface CategoryGridProps {
  categories?: Category[];
}

export const CategoryGrid = ({ categories = defaultCategories }: CategoryGridProps) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
      <div className="mb-10 md:mb-12">
        <SectionTitle title="Explorer par Univers" centered />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {categories.map((category) => (
          <a
            key={category.name}
            href={category.href || "#"}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 md:p-6 lg:p-8">
              <h3 className="text-white font-headline-md text-lg md:text-xl">{category.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;