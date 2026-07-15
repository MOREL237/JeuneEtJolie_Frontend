// app/[lang]/catalogue/page.tsx
'use client';

import { useState } from 'react';
import { PromoBanner } from '@/components/layout/PromoBanner';
import TopNavBar from '@/components/layout/TopNavBar';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { FilterBar } from '@/components/sections/FilterBar';
import { FilterSidebar } from '@/components/sections/FilterSidebar';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { Pagination } from '@/components/sections/Pagination';
import { Footer } from '@/components/layout/Footer';

const breadcrumbItems = [
  { label: 'Accueil', href: '/fr' },
  { label: 'Prêt-à-porter', href: '/fr/catalogue' },
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

const CATEGORIES = ['Toutes', 'Robes d\'été', 'Maxi Robes', 'Robes de Soirée'];

export default function CataloguePage() {
  const [activeFilters,   setActiveFilters]   = useState<string[]>([]);
  const [activeCategory,  setActiveCategory]  = useState('Toutes');
  const [priceRange,      setPriceRange]      = useState<[number, number]>([0, 150000]);
  const [currentPage,     setCurrentPage]     = useState(1);

  const handleFilterChange = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const handleClearAll = () => setActiveFilters([]);

  const handlePriceRange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  /* Filtre produits selon le range de prix */
  const filteredProducts = products.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  return (
    <>
      <PromoBanner />
      <TopNavBar />

      <main id="main-content" className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-8 md:py-12">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Barre de filtres catégorie + tri */}
        <FilterBar
          categories={CATEGORIES}
          totalItems={filteredProducts.length}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          priceRange={priceRange}
          onPriceRangeChange={(range) => setPriceRange(range)}
          maxPrice={150000}
        />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
          <FilterSidebar
            filters={filterGroups}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            priceRange={{ min: priceRange[0], max: priceRange[1] }}
            onPriceRangeChange={handlePriceRange}
          />

          <ProductGrid
            title="Robes"
            subtitle={`${filteredProducts.length} articles — tradition & modernité`}
            products={filteredProducts}
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAllFilters={handleClearAll}
          />
        </div>

        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil(filteredProducts.length / 6))}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <Footer variant="catalogue" />
    </>
  );
}