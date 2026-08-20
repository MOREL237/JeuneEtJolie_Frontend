// app/[lang]/soldes/page.tsx
'use client';

import { useState, useCallback } from 'react';
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
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  badgeVariant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  category?: string;
  sizes?: string[];
}

// Données mockées pour les produits soldés
const saleProducts: SaleProduct[] = [
  {
    id: 'sale-1',
    name: 'Robe Longue Wax Rouge',
    price: 45000,
    originalPrice: 90000,
    image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
    badge: '-50%',
    badgeVariant: 'primary',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'sale-2',
    name: 'Robe Cocktail Brodée',
    price: 37500,
    originalPrice: 125000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB56h9vBU11FhwNvGoaAljBDpaM53hFXCbFPvaTuPDrIV05UKACSIQLHT-Wwpzplr7IhgLPaO9apbQM_xVE-2OlydOnm7I19N8fLu5eeAqK-OHL23ZAztWpBJU978MI_wgU4ic7fAMBnQGq1ZBClZjxPNUPG3T4fRpOXJdlsFgZvo9qq_uRe66LGG2PLK8cVl7o1e645fUhQWC-SBUp92M5mIYBXllKf_jDpJHRvaDgtTiJ3HtmB1pNWXmYTldtKPiqm8Nj_cjOAaI',
    badge: 'BEST OFFER -70%',
    badgeVariant: 'secondary',
    sizes: ['S', 'M'],
  },
  {
    id: 'sale-3',
    name: 'Ensemble Pagne Moderne',
    price: 56000,
    originalPrice: 80000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8aPNeNXdsjt1eDCPb6clAvJC7RNSLWCpSBgfhIbh5eOeE1eORxMT8gtHxoIVcpgAbcOb3KlwlMoUyqBCs9OKNoAGzwv9sH1DA6Mp8g63qHhnCz5nYy_pSqV7o3k02pY5ed6J61zz2mVk6Ra6CJgENkrZka5OuX-mWM2NqqO0YKxCV1QXhsdNQ3dhWkM8RDfJJ42WNM3q92rNQ9EFJROkXiM0JSaGpaDSqCiOp9g-BxDZOnmx6x_OytDAEJe9Osn8dS86LVYgjuSQ',
    badge: '-30%',
    badgeVariant: 'primary',
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: 'sale-4',
    name: 'Tailleur Kente Premium',
    price: 75000,
    originalPrice: 150000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEmLm2Zw5_HIqNQ5ROcWrkDkpUhCdH4Jn-uyjYLCkcX46Z1OpZ7mcUycOv-pgJyupVztUyxr0wPExPe3H2eEgldQhHn6L4PM4N1FA0UF-7LWlzQyLhyZpo8cJfeun_toSSI43vVUFoyQs6WDjvuJwBipi6a9f9HyOVIQkrbDVjlZTyIR7zX1TLxXGltcaYnrAmI5HFgF6Q9X2tkj2BqrLIGRGlDt6iaD_821yGxbVeqJDX4O3Po8CK2Dj27wA48nSMjqvGXmopJGM',
    badge: '-50%',
    badgeVariant: 'primary',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'sale-5',
    name: 'Sac Cuir Imprimé',
    price: 32500,
    originalPrice: 65000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXgiyV0IDjpkkpr9SoX8xaVjCcotPvIdUGpiLsJdJPmQ3oHtjXQH7A3z0nb3q0kx0tKW7gA1nN96nBQdnJxDIEjH65MMFBnrBqYKZJz7-e-HUs7LL3Enw_nZC17_ypMpFu4lNS9HV_ae8wWfhI5eWSgKPTjgimOXsXEtDrzIOVFiWGvNzf9YbFKQ6Y1zijVsSqhO2M1t11u4gtEL08HZpE33F_nee_YInUcbHS7SR9_XR_gbZ_VrBQVZ0gPJ3vObFhfcEqqYLAS3g',
    badge: '-50%',
    badgeVariant: 'primary',
    category: 'Accessoires',
  },
  {
    id: 'sale-6',
    name: 'Robe Mariage Traditionnelle',
    price: 250000,
    originalPrice: 500000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTRxf0UREK-r-O5ZWViKGu_m08CRFTz6K5AFobNwgGuvQ62sbFFYq-usqvlSJXOns9LzQUrTsVHBy-Vy5X49aSZKiKBYdWLsj-zXZScNzSEXEkXhop5-yi8Etqi504fyu0vrquLcrAc_ioTBDMo3ieZNXVdoBl2XHLg73gUOFtXXF-nMTnxShQ5a84IErNxjijq5t1TcKc6Ll3OCI3YIceaHR-zTflTkV0OeaXD6VZkteSjEU69_qnIfGenXAaDquTfCS4Py3e21s',
    badge: '-50%',
    badgeVariant: 'primary',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'sale-7',
    name: 'Blouse Tie-Dye',
    price: 13500,
    originalPrice: 45000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_WEkoBJeMX70wR0Tl0V6XcynPO-CrhjjzigpSP0F-J71whWHn_AweP0qcKYw_7QEiuNn91rxY_WlkT3h08fqPh7Et8uKdmGkdKCwJwdt8orDjy7G_f9Vxmo7PuhUjIDOoaU3yfhqRPiJAvHfk_MPj9Fw2relcyRGIyhp2W7_4qraNJ0KOW6Ya8nNPn4h8Q5KHBOJVwKJBUY1DQvwV7gq-a8yJ4HtqrstyvkOVa3PyMlQsZc03kzOi2tFzqNe59jQZ1rmpF8ZJywE',
    badge: '-70%',
    badgeVariant: 'secondary',
    sizes: ['S', 'M'],
  },
  {
    id: 'sale-8',
    name: 'Jupe Portefeuille',
    price: 19200,
    originalPrice: 32000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVj00lLg0DuUY8qyrks4d9Wg7d81JLXkEAILDe1baVzKfcIKcpb63Y442_SGxXyTFgWIC5TsdFXvAldVRrGxsNn5RDzk2E3jnHvf2G-8RVYf41eauIHUrhJddEAeBpuurYTDWVmA203Bslbx7i31KGC8OPClnWlE-ltX0EE2W7giAi2OXbkCwAu1oP8JJDQOLFtiCZrrZQ3mF0z6SS5FllP0YIlT67Mk35tTB9bKArd0-He8es8o-3EWA7fwKQ5R3fcjTMGTrSb7o',
    badge: '-40%',
    badgeVariant: 'primary',
    sizes: ['M', 'L'],
  },
];

// Données pour cross-selling
const crossSellProducts = [
  {
    id: 'cross-1',
    name: 'Robe de Soirée Azur',
    price: 145000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBNu4NiHz7FZyOWmrZOIiwloGy8kdrnF416CuoU3WXVfk8w9OhoRGhb1ln9L1D97tl4sGddA8J6FrK-HyPfwDePZFyI7JyUE4A6Gcza5NdZtxsCAg8idCNflyr7Xvgg6Uaev0WvVHeuAf4LH0a1kKWIilqEbF76iL_4jxANWHw6gJkVUHj8l3YWnhHPNWgyPnrVr1l7SiPHsNUoBZGtonHLHExUoeFAJfKx7i6vmeAURW1fVF1oI__N1i7cWPpbex_H7rKK6ZE_-8',
  },
  {
    id: 'cross-2',
    name: 'Veste Tailleur Ivoire',
    price: 85000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZRRWj_bSbCqd0o4KtN9IIkHEgKxE7O4ScEwOMw92NFlLiPUzRbfkzJt9BRs75sABQnnwN9lNgQnSoZYvfWn61zHWUOOCgjNEaRfjkjXuhXH_YUP3EtlWK-Tib-r-VbcsbFP4hYtAtEJjtmdaaGRloL6N1RZTi8Sz6xfDtkrczBrW4WnGIzQAtjDzhppm2Ce4XK-Jkr2OVhGpI-2EOCTBjN4cDyA5KDVTSPXzemR7781r4_eXwi9HlVQkIAWQIf3T9uivfCw2QRLo',
  },
  {
    id: 'cross-3',
    name: 'Robe de Soirée Azur',
    price: 145000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBNu4NiHz7FZyOWmrZOIiwloGy8kdrnF416CuoU3WXVfk8w9OhoRGhb1ln9L1D97tl4sGddA8J6FrK-HyPfwDePZFyI7JyUE4A6Gcza5NdZtxsCAg8idCNflyr7Xvgg6Uaev0WvVHeuAf4LH0a1kKWIilqEbF76iL_4jxANWHw6gJkVUHj8l3YWnhHPNWgyPnrVr1l7SiPHsNUoBZGtonHLHExUoeFAJfKx7i6vmeAURW1fVF1oI__N1i7cWPpbex_H7rKK6ZE_-8',
  },
  {
    id: 'cross-4',
    name: 'Veste Tailleur Ivoire',
    price: 85000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZRRWj_bSbCqd0o4KtN9IIkHEgKxE7O4ScEwOMw92NFlLiPUzRbfkzJt9BRs75sABQnnwN9lNgQnSoZYvfWn61zHWUOOCgjNEaRfjkjXuhXH_YUP3EtlWK-Tib-r-VbcsbFP4hYtAtEJjtmdaaGRloL6N1RZTi8Sz6xfDtkrczBrW4WnGIzQAtjDzhppm2Ce4XK-Jkr2OVhGpI-2EOCTBjN4cDyA5KDVTSPXzemR7781r4_eXwi9HlVQkIAWQIf3T9uivfCw2QRLo',
  },
];

export default function SoldesPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [reductionFilter, setReductionFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('best-discount');

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
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  }, []);

  const handleProductAddToCart = useCallback(
    (productId: string) => {
      const product = saleProducts.find((p) => p.id === productId);
      if (product) {
        showToast(`"${product.name}" ajouté au panier !`);
      }
    },
    [showToast]
  );

  const handleQuickAdd = useCallback(
    (id: string) => {
      const product = crossSellProducts.find((p) => p.id === id);
      if (product) {
        showToast(`"${product.name}" ajouté au panier !`);
      }
    },
    [showToast]
  );

  const scrollToOffers = useCallback(() => {
    document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
     
      {/* Navigation */}
      <div className="sticky top-[36px] z-50">
        <PromoBanner/>
        <TopNavBar />
      </div>

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
            title="Vous aimerez aussi"
            subtitle="Découvrez nos pièces iconiques en parallèle des soldes."
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