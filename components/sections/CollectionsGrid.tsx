// components/sections/CollectionsGrid.tsx
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

interface Collection {
  name: string;
  image: string;
  href?: string;
}

interface CollectionsGridProps {
  collections?: Collection[];
}

const defaultCollections: Collection[] = [
  {
    name: "L'Éclat du Sahel",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
  },
  {
    name: "Mariage",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
  },
  {
    name: "Héritage Wax",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
  },
  {
    name: "Essentiels",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
  },
];

export const CollectionsGrid = ({
  collections = defaultCollections,
}: CollectionsGridProps) => {
  return (
    <section className="px-5 md:px-8 lg:px-20 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {collections.map((collection) => (
          <a
            key={collection.name}
            href={collection.href || '#'}
            className="group relative aspect-4/5 bg-surface-container overflow-hidden cursor-pointer rounded-xl block"
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
              <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-white mb-3 md:mb-4 drop-shadow-lg">
                {collection.name}
              </h2>
              <button className="bg-white text-on-surface px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center gap-2 group-hover:translate-x-2">
                Découvrir la collection
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;