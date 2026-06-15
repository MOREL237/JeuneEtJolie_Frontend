// app/[lang]/catalogue/page.tsx
'use client';

import React, { useState } from 'react';
import { PromoBanner } from '@/components/layout/PromoBanner';
import { Navbar } from '@/components/layout/Navbar';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { FilterSidebar } from '@/components/sections/FilterSidebar';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { Pagination } from '@/components/sections/Pagination';
import { Footer } from '@/components/layout/Footer';

const breadcrumbItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Femme', href: '/femme' },
  { label: 'Robes' },
];

const filterGroups = [
  {
    title: 'Catégories',
    type: 'checkbox' as const,
    options: [
      { label: 'Toutes les robes', value: 'all' },
      { label: "Robes d'été", value: 'summer' },
      { label: 'Maxi Robes', value: 'maxi' },
      { label: 'Robes de Soirée', value: 'evening' },
    ],
  },
];

const products = [
  {
    id: '1',
    name: 'Robe Silk Sunset',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    badge: 'Nouveauté',
    badgeVariant: 'primary' as const,
    rating: 5,
    reviews: 12,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '2',
    name: 'Robe Royale Indigo',
    price: 64000,
    originalPrice: 80000,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600',
    badge: '-20%',
    badgeVariant: 'secondary' as const,
    rating: 4.5,
    reviews: 28,
    sizes: ['S', 'M'],
  },
  {
    id: '3',
    name: 'Légèreté de Coton',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600',
    rating: 5,
    reviews: 5,
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: '4',
    name: 'Robe Géométrie Dorée',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
    rating: 4,
    reviews: 19,
  },
  {
    id: '5',
    name: 'Robe Fleur de Savane',
    price: 58000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    badge: 'Nouveauté',
    badgeVariant: 'primary' as const,
    rating: 5,
    reviews: 42,
    sizes: ['S', 'M'],
  },
  {
    id: '6',
    name: 'Robe Émeraude de Nuit',
    price: 92000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    rating: 4,
    reviews: 15,
  },
];

export default function CataloguePage() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['size-S', 'color-rose']);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleClearAll = () => setActiveFilters([]);

  return (
    <>
      <PromoBanner />
      <Navbar lang="fr" dict={{ navbar: {} as any }} />
      
      <main className="max-w-[1440px] mx-auto px-5 lg:px-20 pt-12">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex flex-col lg:flex-row gap-12">
          <FilterSidebar
            filters={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
          />
          
          <ProductGrid
            title="Robes"
            subtitle="Découvrez notre sélection exclusive de 24 articles alliant tradition et modernité."
            products={products}
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAllFilters={handleClearAll}
          />
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={8}
          onPageChange={setCurrentPage}
        />
      </main>
      
      <Footer variant="catalogue" />
    </>
  );
}