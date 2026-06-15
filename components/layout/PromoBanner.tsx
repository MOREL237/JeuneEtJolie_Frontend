// components/layout/PromoBanner.tsx
"use client";

import React from "react";

interface PromoBannerProps {
  message?: string;
  className?: string;
}

export const PromoBanner = ({
  message = "Livraison gratuite dès 30 000 FCFA 🎁",
  className = "",
}: PromoBannerProps) => {
  return (
    <div
      className={`bg-primary text-on-primary py-2 text-center font-label-md text-xs tracking-widest uppercase ${className}`}
    >
      {message}
    </div>
  );
};

export default PromoBanner;