// app/[lang]/catalogue/page.tsx
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { PromoBanner } from '@/components/layout/PromoBanner';
import TopNavBar from '@/components/layout/TopNavBar';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { FilterBar } from '@/components/sections/FilterBar';
import { FilterSidebar } from '@/components/sections/FilterSidebar';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { Pagination } from '@/components/sections/Pagination';
import { Footer } from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

const products = [
  {
    id: '1',
    name: 'Silk Sunset Dress',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    badge: 'New',
    badgeVariant: 'primary' as const,
    rating: 5,
    reviews: 12,
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '2',
    name: 'Indigo Royal Dress',
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
    name: 'Cotton Lightness',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600',
    rating: 5,
    reviews: 5,
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: '4',
    name: 'Golden Geometry Dress',
    price: 110000,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
    rating: 4,
    reviews: 19,
  },
  {
    id: '5',
    name: 'Savanna Flower Dress',
    price: 58000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
    badge: 'New',
    badgeVariant: 'primary' as const,
    rating: 5,
    reviews: 42,
    sizes: ['S', 'M'],
  },
  {
    id: '6',
    name: 'Emerald Night Dress',
    price: 92000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    rating: 4,
    reviews: 15,
  },
];

export default function CataloguePage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: lang === 'en' ? 'Home' : 'Accueil', href: `/${lang}` },
    { label: lang === 'en' ? 'Ready-to-Wear' : 'Prêt-à-porter', href: `/${lang}/catalogue` },
    { label: lang === 'en' ? 'Dresses' : 'Robes' },
  ];

  const filterGroups = [
    {
      title: lang === 'en' ? 'Categories' : 'Catégories',
      type: 'checkbox' as const,
      options: [
        { label: lang === 'en' ? 'All dresses' : 'Toutes les robes', value: 'all' },
        { label: lang === 'en' ? 'Summer Dresses' : "Robes d'été", value: 'summer' },
        { label: lang === 'en' ? 'Maxi Dresses' : 'Maxi Robes', value: 'maxi' },
        { label: lang === 'en' ? 'Evening Dresses' : 'Robes de Soirée', value: 'evening' },
      ],
    },
  ];

  const categories = lang === 'en' 
    ? ['All', 'Summer Dresses', 'Maxi Dresses', 'Evening Dresses']
    : ['Toutes', 'Robes d\'été', 'Maxi Robes', 'Robes de Soirée'];

  const [activeFilters,   setActiveFilters]   = useState<string[]>([]);
  const [activeCategory,  setActiveCategory]  = useState(categories[0]);
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
          categories={categories}
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
            title={lang === 'en' ? 'Dresses' : 'Robes'}
            subtitle={lang === 'en' ? `${filteredProducts.length} items — tradition & modernity` : `${filteredProducts.length} articles — tradition & modernité`}
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