// components/sections/TrustBar.tsx
"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Livraison rapide",
    description: "Dans toute l'Afrique",
  },
  {
    icon: RotateCcw,
    title: "Retours 14 jours",
    description: "Échange facile",
  },
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    description: "OM, MTN, Visa",
  },
  {
    icon: Headphones,
    title: "Support 7j/7",
    description: "Une équipe à votre écoute",
  },
];

export const TrustBar = () => {
  return (
    <section className="bg-surface-container-low py-8 md:py-10 lg:py-12 border-b border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3 md:gap-4">
            <item.icon className="text-primary w-7 h-7 md:w-8 md:h-8 shrink-0" />
            <div>
              <p className="font-label-md text-sm md:text-base text-on-surface">{item.title}</p>
              <p className="text-xs text-outline">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;