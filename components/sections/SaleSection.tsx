// components/sections/SaleSection.tsx
"use client";

import React from "react";
import { ProductCard } from "../shared/ProductCard";

interface SaleProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: number;
}

interface SaleSectionProps {
  title?: string;
  subtitle?: string;
  products?: SaleProduct[];
  countdown?: {
    days: number;
    hours: number;
    minutes: number;
  };
}

const defaultProducts: SaleProduct[] = [
  {
    id: "1",
    name: 'Robe de Soirée "Ebene"',
    price: 27000,
    originalPrice: 45000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
    discount: 40,
  },
  {
    id: "2",
    name: 'Lunettes "Regard d\'Or"',
    price: 15000,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    discount: 50,
  },
  {
    id: "3",
    name: 'Clutch "Perle de Soie"',
    price: 21000,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    discount: 30,
  },
];

export const SaleSection = ({
  title = "Soldes jusqu'à -50%",
  subtitle = "Ne manquez pas nos offres exceptionnelles sur une sélection d'articles.",
  products = defaultProducts,
  countdown = { days: 2, hours: 14, minutes: 35 },
}: SaleSectionProps) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-on-surface text-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6 md:gap-8">
          <div>
            <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-tertiary-fixed mb-3 md:mb-4">{title}</h2>
            <p className="text-sm md:text-base text-slate-400">{subtitle}</p>
          </div>

          {/* Countdown */}
          <div className="flex gap-3 md:gap-4 items-center">
            {[
              { value: countdown.days, label: "Jours" },
              { value: countdown.hours, label: "Heures" },
              { value: countdown.minutes, label: "Minutes" },
            ].map((item, index, arr) => (
              <React.Fragment key={item.label}>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-slate-800 rounded-lg flex items-center justify-center font-headline-md text-xl lg:text-2xl border border-slate-700">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] uppercase mt-2 tracking-widest text-slate-500">
                    {item.label}
                  </span>
                </div>
                {index < arr.length - 1 && (
                  <div className="text-2xl font-bold mb-4">:</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaleSection;