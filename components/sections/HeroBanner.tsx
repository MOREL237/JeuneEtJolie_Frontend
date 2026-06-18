'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HeroBannerProps {
  title: string;
  subtitle: string;
  breadcrumb: BreadcrumbItem[];
}

export const HeroBanner = ({ title, subtitle, breadcrumb }: HeroBannerProps) => {
  return (
    <section className="relative h-[300px] flex items-center justify-center overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-900 to-black opacity-80" />
      <div className="absolute inset-0 pattern-overlay opacity-30" />
      
      <div className="relative z-10 text-center px-4">
        <nav className="flex justify-center items-center gap-2 text-white/60 text-xs tracking-widest uppercase mb-4 font-label-md">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={item.href}>
              {index > 0 && (
                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
              )}
              {index === breadcrumb.length - 1 ? (
                <span className="text-white">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
        
        <h1 className="font-display-xl text-display-xl text-white uppercase tracking-[0.2em] mb-4">
          {title}
        </h1>
        <p className="font-body-lg text-body-lg text-white/80 italic">{subtitle}</p>
      </div>
    </section>
  );
};

export default HeroBanner;