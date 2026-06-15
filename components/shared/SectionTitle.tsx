// components/shared/SectionTitle.tsx
"use client";

import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionTitle = ({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="font-headline-lg text-on-surface mb-2">{title}</h2>
      {centered && <div className="h-1 w-20 bg-primary mx-auto" />}
      {subtitle && <p className="text-outline mt-2">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;