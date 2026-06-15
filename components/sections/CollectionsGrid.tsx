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
    <section className="px-5 lg:px-20 py-section-gap max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="group relative aspect-[4/5] bg-surface-container overflow-hidden cursor-pointer rounded-xl"
          >
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex flex-col justify-end p-6 lg:p-10">
              <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h2 className="font-headline-lg text-white mb-4">
                  {collection.name}
                </h2>
                <Button
                  variant="inverted"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="bg-white text-on-surface hover:bg-secondary hover:text-on-secondary"
                >
                  Découvrir la collection
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;