// app/[lang]/page.tsx
import { getDictionary } from '@/lib/i18n/getDictionary';
import { type Locale } from '@/lib/i18n/config';
import { PromoBanner } from '@/components/layout/PromoBanner';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { ProductSection } from '@/components/sections/ProductSection';
import { FeaturedSection } from '@/components/sections/FeaturedSection';
import { SaleSection } from '@/components/sections/SaleSection';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/layout/Footer';

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  const nouveautes = [
    {
      id: '1',
      name: 'Veste Tailleur "Heritage"',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
      badge: 'Exclusivité',
      badgeVariant: 'primary' as const,
    },
    {
      id: '2',
      name: 'Robe Midi "Sahara Pearl"',
      price: 32500,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
      badge: 'Nouveauté',
      badgeVariant: 'secondary' as const,
    },
    {
      id: '3',
      name: 'Coffret Foulard Soie',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600',
      badge: 'Accessoires',
      badgeVariant: 'tertiary' as const,
    },
    {
      id: '4',
      name: 'Combinaison "Nuit d\'Abidjan"',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
      badge: 'Limité',
      badgeVariant: 'neutral' as const,
    },
  ];

  return (
    <>
      <PromoBanner message={dict.promo.message} />
      <Navbar lang={lang} dict={dict} />
      
      <main>
        <HeroSection dict={dict.hero} />
        <TrustBar />
        <CategoryGrid />
        <ProductSection
          title="Nouveautés"
          subtitle="Dernières arrivées de notre atelier"
          products={nouveautes}
        />
        <FeaturedSection />
        <SaleSection />
        <Newsletter dict={dict.newsletter} />
      </main>
      
      {/* Footer variant full (page d'accueil) */}
      <Footer variant="full" />
    </>
  );
}