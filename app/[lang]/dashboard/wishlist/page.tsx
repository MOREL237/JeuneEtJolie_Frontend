'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import WishlistItem from '@/components/sections/WishlistItem';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'Robe Soie Émeraude',
    detail: 'Taille : 38 · Soie naturelle',
    price: 159000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
  },
  {
    id: 2,
    name: "Collier \"Héritage\" Or",
    detail: 'Or 18k · Artisanat Abidjan',
    price: 78000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: 3,
    name: 'Pochette Cuir Fuchsia',
    detail: 'Couleur : Rose Vibrant',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
  },
  {
    id: 4,
    name: 'Blazer Lin Naturel',
    detail: 'Taille : 40 · Lin 100%',
    price: 126000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
  },
  {
    id: 5,
    name: 'Sandales Cuir Camel',
    detail: 'Pointure : 39 · Cuir pleine fleur',
    price: 71500,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
  },
  {
    id: 6,
    name: "Boucles d'Oreilles Perles",
    detail: 'Argent 925 · Perles de culture',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400',
  },
];

const formatFCFA = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';

export default function WishlistPage() {
  const params = useParams();
  const lang   = (params?.lang as string) || 'fr';
  const { t }  = useTranslation();

  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: number) => {
    console.log('Add to cart:', id);
  };

  const totalValue = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <TopNavBar />

      <main
        id="main-content"
        className="max-w-[1440px] mx-auto flex flex-col lg:flex-row"
      >
        <DashboardSidebar />

        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-surface-container-low/40">

          {/* En-tête */}
          <header className="mb-8 md:mb-10">
            <p
              className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-gold mb-2"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {t('dashboard.wishlist.mySelection')}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h2
                  className="text-on-surface"
                  style={{
                    fontFamily: 'var(--font-cormorant, Georgia, serif)',
                    fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t('dashboard.wishlist.title')}
                </h2>
                <p className="text-sm text-on-surface/50 mt-1">
                  {t('dashboard.wishlist.savedItems').replace('{count}', String(items.length))}
                  {items.length > 0 && (
                    <span className="ml-2 text-primary font-semibold">
                      · {formatFCFA(totalValue)}
                    </span>
                  )}
                </p>
              </div>

              {items.length > 0 && (
                <button
                  className="btn-primary text-xs px-5 py-2.5 self-start sm:self-auto"
                  onClick={() => items.forEach(i => handleAddToCart(i.id))}
                >
                  <ShoppingBag size={14} />
                  {t('dashboard.wishlist.addAllToCart')}
                </button>
              )}
            </div>
          </header>

          {/* Grille wishlist */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface border border-outline-variant/20 rounded-2xl
                             p-4 md:p-5 hover:border-outline-variant/40 hover:shadow-ambient
                             transition-all duration-300"
                >
                  <WishlistItem
                    {...item}
                    onRemove={handleRemove}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* État vide */
            <div className="flex flex-col items-center justify-center
                            bg-surface border border-outline-variant/20 rounded-2xl
                            py-20 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/8 flex items-center justify-center mb-5">
                <Heart size={28} className="text-primary/50" strokeWidth={1.5} />
              </div>
              <h3
                className="text-on-surface mb-2"
                style={{
                  fontFamily: 'var(--font-cormorant, Georgia, serif)',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                }}
              >
                {t('dashboard.wishlist.emptyTitle')}
              </h3>
              <p className="text-sm text-on-surface/45 mb-8 max-w-xs leading-relaxed">
                {t('dashboard.wishlist.emptyDesc')}
              </p>
              <Link
                href={`/${lang}/catalogue`}
                className="btn-primary text-xs px-6"
              >
                {t('dashboard.wishlist.discoverCreations')}
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Suggestion si liste non vide */}
          {items.length > 0 && (
            <div className="mt-8 p-5 md:p-6 bg-surface border border-outline-variant/20 rounded-2xl
                            flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p
                  className="text-sm font-semibold text-on-surface"
                  style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '1rem' }}
                >
                  {t('dashboard.wishlist.continueShopping')}
                </p>
                <p className="text-xs text-on-surface/45 mt-0.5">
                  {t('dashboard.wishlist.continueShoppingDesc')}
                </p>
              </div>
              <Link
                href={`/${lang}/catalogue`}
                className="btn-outline text-xs px-5 py-2 shrink-0"
              >
                {t('dashboard.wishlist.viewCatalogue')} <ArrowRight size={13} />
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer variant="dashboard" />
    </div>
  );
}
