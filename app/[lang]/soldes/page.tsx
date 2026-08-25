// app/[lang]/soldes/page.tsx
'use client';

import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import TopNavBar from '@/components/layout/TopNavBar';
import Footer from '@/components/layout/Footer';
import { SaleHeroSection } from '@/components/sections/SaleHeroSection';
import { SaleStatsBanner } from '@/components/sections/SaleStatsBanner';
import { SaleProductFilters } from '@/components/sections/SaleProductFilters';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { UrgencySection } from '@/components/sections/UrgencySection';
import { UpsellProducts } from '@/components/sections/UpsellProducts';
import { Toast } from '@/components/ui/Toast';
import PromoBanner from '@/components/layout/PromoBanner';

// Types pour les produits soldés
interface SaleProduct {
  id: string;
  nameKey: string;
  name_fr: string;
  name_en: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  category_fr?: string;
  category_en?: string;
  sizes?: string[];
}

const saleProductsData: SaleProduct[] = [
  {
    id: 'sale-1',
    nameKey: 'redWaxDress',
    name_fr: 'Robe Longue Wax Rouge',
    name_en: 'Red Wax Long Dress',
    price: 45000,
    originalPrice: 90000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
    badge: '-50%',
    badgeVariant: 'primary',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'sale-2',
    nameKey: 'embroideredCocktailDress',
    name_fr: 'Robe Cocktail Brodée',
    name_en: 'Embroidered Cocktail Dress',
    price: 37500,
    originalPrice: 125000,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
    badge: '-70%',
    badgeVariant: 'secondary',
    sizes: ['S', 'M'],
  },
  {
    id: 'sale-3',
    nameKey: 'modernPagneEnsemble',
    name_fr: 'Ensemble Pagne Moderne',
    name_en: 'Modern Pagne Ensemble',
    price: 56000,
    originalPrice: 80000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
    badge: '-30%',
    badgeVariant: 'primary',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 'sale-4',
    nameKey: 'premiumKenteSuit',
    name_fr: 'Tailleur Kente Premium',
    name_en: 'Premium Kente Suit',
    price: 75000,
    originalPrice: 150000,
    image: 'https://images.unsplash.com/photo-1539008588-bbf93cc3f00b?w=600&h=800&fit=crop',
    badge: '-50%',
    badgeVariant: 'primary',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'sale-5',
    nameKey: 'printedLeatherBag',
    name_fr: 'Sac Cuir Imprimé',
    name_en: 'Printed Leather Bag',
    price: 32500,
    originalPrice: 65000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop',
    badge: '-50%',
    badgeVariant: 'primary',
    category_fr: 'Accessoires',
    category_en: 'Accessories',
  },
  {
    id: 'sale-6',
    nameKey: 'traditionalWeddingDress',
    name_fr: 'Robe Mariage Traditionnelle',
    name_en: 'Traditional Wedding Dress',
    price: 250000,
    originalPrice: 500000,
    image: 'https://images.unsplash.com/photo-1495777497141-30e3eca9a15f?w=600&h=800&fit=crop',
    badge: '-50%',
    badgeVariant: 'primary',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'sale-7',
    nameKey: 'tieDyeBlouse',
    name_fr: 'Blouse Tie-Dye',
    name_en: 'Tie-Dye Blouse',
    price: 13500,
    originalPrice: 45000,
    image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop',
    badge: '-70%',
    badgeVariant: 'secondary',
    sizes: ['S', 'M'],
  },
  {
    id: 'sale-8',
    nameKey: 'wrapSkirt',
    name_fr: 'Jupe Portefeuille',
    name_en: 'Wrap Skirt',
    price: 19200,
    originalPrice: 32000,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop',
    badge: '-40%',
    badgeVariant: 'primary',
    sizes: ['M', 'L'],
  },
];

const crossSellProductsData = [
  {
    id: 'cross-1',
    name_fr: 'Robe de Soirée Azur',
    name_en: 'Azure Evening Dress',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
  },
  {
    id: 'cross-2',
    name_fr: 'Veste Tailleur Ivoire',
    name_en: 'Ivory Blazer',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1539008588-bbf93cc3f00b?w=600&h=800&fit=crop',
  },
  {
    id: 'cross-3',
    name_fr: 'Robe de Soirée Azur',
    name_en: 'Azure Evening Dress',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
  },
  {
    id: 'cross-4',
    name_fr: 'Veste Tailleur Ivoire',
    name_en: 'Ivory Blazer',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
  },
];

export default function SoldesPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';
  
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [reductionFilter, setReductionFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('best-discount');

  // Ajouter les noms traduits aux produits
  const saleProducts = useMemo(
    () =>
      saleProductsData.map((p) => ({
        ...p,
        name: isEnglish ? p.name_en : p.name_fr,
        category: isEnglish ? (p.category_en || 'Dresses') : (p.category_fr || 'Robes'),
      })),
    [isEnglish]
  );

  const crossSellProducts = useMemo(
    () =>
      crossSellProductsData.map((p) => ({
        ...p,
        name: isEnglish ? p.name_en : p.name_fr,
      })),
    [isEnglish]
  );

  // Filtrer les produits
  const filteredProducts = saleProducts.filter((product) => {
    if (reductionFilter !== 'all' && product.originalPrice) {
      const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
      if (discount < parseInt(reductionFilter)) return false;
    }
    if (categoryFilter !== 'all') {
      const cat = product.category?.toLowerCase() || 'robes';
      if (cat !== categoryFilter) return false;
    }
    return true;
  });

  // Trier les produits
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'best-discount':
          const discountA = a.originalPrice
            ? ((a.originalPrice - a.price) / a.originalPrice) * 100
            : 0;
          const discountB = b.originalPrice
            ? ((b.originalPrice - b.price) / b.originalPrice) * 100
            : 0;
          return discountB - discountA;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  }, []);

  const handleProductAddToCart = useCallback(
    (productId: string) => {
      const product = saleProducts.find((p) => p.id === productId);
      if (product) {
        const toastMsg = isEnglish 
          ? `"${product.name}" added to cart!`
          : `"${product.name}" ajouté au panier !`;
        showToast(toastMsg);
      }
    },
    [saleProducts, isEnglish, showToast]
  );

  const handleQuickAdd = useCallback(
    (id: string) => {
      const product = crossSellProducts.find((p) => p.id === id);
      if (product) {
        const toastMsg = isEnglish
          ? `"${product.name}" added to cart!`
          : `"${product.name}" ajouté au panier !`;
        showToast(toastMsg);
      }
    },
    [crossSellProducts, isEnglish, showToast]
  );

  const scrollToOffers = useCallback(() => {
    document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const upsellTitle = isEnglish ? 'You might also like' : 'Vous aimerez aussi';
  const upsellSubtitle = isEnglish 
    ? 'Discover our signature pieces to complete your look.'
    : 'Découvrez nos pièces iconiques en parallèle des soldes.';

  return (
    <div className="min-h-screen bg-background">
     
      {/* Navigation */}
      <PromoBanner/>
      <TopNavBar />

      <main>
        {/* Hero Section */}
        <SaleHeroSection />

        {/* Stats Banner */}
        <SaleStatsBanner />

        {/* Product Listing */}
        <section className="py-16 md:py-24 container mx-auto px-5 md:px-8 lg:px-20" id="offers">
          {/* Filters */}
          <SaleProductFilters
            reductionFilter={reductionFilter}
            categoryFilter={categoryFilter}
            sortBy={sortBy}
            onReductionChange={setReductionFilter}
            onCategoryChange={setCategoryFilter}
            onSortChange={setSortBy}
          />

          {/* Product Grid - using onProductAddToCart for unified cart handling */}
          <ProductGrid
            products={sortedProducts}
            showHeader={false}
            columns={4}
            onProductAddToCart={handleProductAddToCart}
          />
        </section>

        {/* Urgency Section */}
        <UrgencySection onButtonClick={scrollToOffers} />

        {/* Cross-selling */}
        <section className="py-16 md:py-24 container mx-auto px-5 md:px-8 lg:px-20">
          <UpsellProducts
            title={upsellTitle}
            subtitle={upsellSubtitle}
            products={crossSellProducts}
            onQuickAdd={handleQuickAdd}
            currency="FCFA"
          />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast */}
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
