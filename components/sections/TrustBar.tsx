// components/sections/TrustBar.tsx
"use client";

import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const trustItems = [
  {
    icon: Truck,
    titleKey: "trustBar.delivery",
    descKey: "trustBar.deliveryDesc",
  },
  {
    icon: RotateCcw,
    titleKey: "trustBar.returns",
    descKey: "trustBar.returnsDesc",
  },
  {
    icon: ShieldCheck,
    titleKey: "trustBar.payment",
    descKey: "trustBar.paymentDesc",
  },
  {
    icon: Headphones,
    titleKey: "trustBar.support",
    descKey: "trustBar.supportDesc",
  },
];

export const TrustBar = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-surface-container-low py-10 md:py-12 lg:py-14 border-y border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {trustItems.map((item) => (
          <div key={item.titleKey} className="flex flex-col items-center text-center gap-4 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <item.icon className="text-primary group-hover:text-white w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-label-lg text-sm md:text-base text-on-surface font-semibold mb-1">
                {t(item.titleKey) || "Livraison rapide"}
              </p>
              <p className="text-xs md:text-sm text-on-surface-variant">
                {t(item.descKey) || "Dans toute l'Afrique"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;