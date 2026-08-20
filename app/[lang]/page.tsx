// app/[lang]/page.tsx
import { getDictionary } from '@/lib/i18n/getDictionary';
import { i18n, type Locale } from '@/lib/i18n/config';
import { PromoBanner } from '@/components/layout/PromoBanner';
import TopNavBar from '@/components/layout/TopNavBar';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { ProductSection } from '@/components/sections/ProductSection';
import { FeaturedSection } from '@/components/sections/FeaturedSection';
import { SaleSection } from '@/components/sections/SaleSection';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/layout/Footer';


export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const nouveautes = [
    {
      id: '1',
      name: 'Veste Tailleur "Heritage"',
      description: 'Coupe structurée en lin texturé, doublure soie imprimée wax.',
      price: 45000,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
      badge: 'Exclusivité',
      badgeVariant: 'primary' as const,
    },
    {
      id: '2',
      name: 'Robe Midi "Sahara Pearl"',
      description: 'Mousseline légère ivoire, broderies dorées aux épaules.',
      price: 32500,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
      badge: 'Nouveauté',
      badgeVariant: 'secondary' as const,
    },
    {
      id: '3',
      name: 'Coffret Foulard Soie',
      description: 'Soie naturelle 90×90 cm, motifs géométriques inspirés du kente.',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600',
      badge: 'Accessoires',
      badgeVariant: 'tertiary' as const,
    },
    {
      id: '4',
      name: 'Combinaison "Nuit d\'Abidjan"',
      description: 'Satin crêpe noir, décolleté dos-nu et ceinture tressée dorée.',
      price: 55000,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
      badge: 'Limité',
      badgeVariant: 'neutral' as const,
    },
  ];

  return (
    <>
      <PromoBanner message={dict.promo.message} />
      <TopNavBar />
      
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
      
      <Footer variant="full" />
    </>
  );
}