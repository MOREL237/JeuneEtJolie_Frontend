// components/sections/SaleSection.tsx
"use client";

import { ProductCard } from "../shared/ProductCard";
import { useTranslation } from "@/hooks/useTranslation";
import { ArrowRight } from "lucide-react";

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
  const { t } = useTranslation();
  
  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="relative max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-5xl text-white mb-4 md:mb-5">
              {title}
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-6">
              {subtitle}
            </p>
            <a 
              href="/fr/soldes" 
              className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 font-label-md transition-colors group"
            >
              {t("common.viewAll") || "Voir toutes les offres"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Countdown */}
          <div className="flex gap-3 md:gap-4 items-center bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            {[
              { value: countdown.days, label: t("countdown.days") || "Jours" },
              { value: countdown.hours, label: t("countdown.hours") || "Heures" },
              { value: countdown.minutes, label: t("countdown.minutes") || "Minutes" },
            ].map((item, index, arr) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center font-headline-md text-xl lg:text-2xl shadow-lg">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] uppercase mt-2 tracking-widest text-slate-400 font-label-sm">
                    {item.label}
                  </span>
                </div>
                {index < arr.length - 1 && (
                  <div className="text-2xl font-bold text-slate-600 -mt-6">:</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                badge={`-${product.discount}%`}
                badgeVariant="secondary"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SaleSection;