// components/sections/ProductAccordion.tsx
'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface ProductAccordionProps {
  items: AccordionItem[];
}

export const ProductAccordion = ({ items }: ProductAccordionProps) => {
  return (
    <div className="divide-y divide-outline-variant mt-4">
      {items.map((item, index) => (
        <details key={index} className="group py-4" open={index === 0}>
          <summary className="flex justify-between items-center cursor-pointer list-none">
            <span className="font-headline-md text-lg">{item.title}</span>
            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pt-4 text-outline leading-relaxed text-body-md">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
};

export default ProductAccordion;