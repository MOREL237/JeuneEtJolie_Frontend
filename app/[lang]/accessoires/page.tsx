// app/[lang]/accessoires/page.tsx
import { getDictionary } from '@/lib/i18n/getDictionary';
import { i18n, type Locale } from '@/lib/i18n/config';
import TopNavBar  from '@/components/layout/TopNavBar';
import Footer from '@/components/layout/Footer';
import { HeroBanner } from '@/components/sections/HeroBanner';
import { FilterBar } from '@/components/sections/FilterBar';
import { ProductGrid } from '@/components/sections/ProductGrid';
import { Pagination } from '@/components/sections/Pagination';
import { LooksSection } from '@/components/sections/LooksSection';
import PromoBanner from '@/components/layout/PromoBanner';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function AccessoiresPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const isEnglish = lang === 'en';

  const accessoires = [
    {
      id: '1',
      name: isEnglish ? dict.products.royalPearls.name : dict.products.royalPearls.name,
      price: 12500,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
      category: isEnglish ? dict.categories.jewelry : dict.categories.jewelry,
      badge: isEnglish ? 'NEW' : 'NOUVEAU',
      badgeVariant: 'primary' as const,
    },
    {
      id: '2',
      name: isEnglish ? dict.products.ndopBag.name : dict.products.ndopBag.name,
      price: 28000,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop',
      category: isEnglish ? dict.categories.bags : dict.categories.bags,
      badge: isEnglish ? 'POPULAR' : 'POPULAIRE',
      badgeVariant: 'tertiary' as const,
    },
    {
      id: '3',
      name: isEnglish ? dict.products.waxBelt.name : dict.products.waxBelt.name,
      price: 8500,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop',
      category: isEnglish ? dict.categories.belts : dict.categories.belts,
    },
    {
      id: '4',
      name: isEnglish ? dict.products.silkScarf2.name : dict.products.silkScarf2.name,
      price: 15000,
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop',
      category: isEnglish ? dict.categories.scarves : dict.categories.scarves,
      badge: isEnglish ? 'NEW' : 'NOUVEAU',
      badgeVariant: 'primary' as const,
    },
    {
      id: '5',
      name: isEnglish ? dict.products.kenteEarrings.name : dict.products.kenteEarrings.name,
      price: 9800,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
      category: isEnglish ? dict.categories.jewelry : dict.categories.jewelry,
    },
    {
      id: '6',
      name: isEnglish ? dict.products.embroideredClutch.name : dict.products.embroideredClutch.name,
      price: 22000,
      image: 'https://images.unsplash.com/photo-1545221776-ecf5ee0beab2?w=600&h=800&fit=crop',
      category: isEnglish ? dict.categories.bags : dict.categories.bags,
    },
    {
      id: '7',
      name: isEnglish ? dict.products.traditionalHeadwrap.name : dict.products.traditionalHeadwrap.name,
      price: 18500,
      image: 'https://images.unsplash.com/photo-1516762714482-59d6f2b83681?w=600&h=800&fit=crop',
      category: isEnglish ? dict.categories.hats : dict.categories.hats,
      badge: isEnglish ? 'POPULAR' : 'POPULAIRE',
      badgeVariant: 'tertiary' as const,
    },
    {
      id: '8',
      name: isEnglish ? dict.products.braiedBracelet.name : dict.products.braiedBracelet.name,
      price: 6500,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop',
      category: isEnglish ? dict.categories.jewelry : dict.categories.jewelry,
    },
  ];

  const categories = [dict.categories.all, dict.categories.jewelry, dict.categories.bags, 
                      dict.categories.belts, dict.categories.scarves, dict.categories.hats, dict.categories.shoes];

  return (
    <div className="bg-background font-body-md text-on-surface">
      <PromoBanner message={dict.promo.message}/>
      <TopNavBar />
      
      <main>
        <HeroBanner 
          title={dict.accessories.pageTitle}
          subtitle={dict.accessories.pageSubtitle}
          breadcrumb={[
            { label: dict.common.home, href: `/${lang}` },
            { label: dict.categories.accessories, href: `/${lang}/accessoires` },
          ]}
        />
        
        <FilterBar 
          categories={categories}
          totalItems={24}
          activeCategory={dict.categories.all}
        />
        
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-12 md:py-16 lg:py-20">
          <ProductGrid 
            products={accessoires} 
            showHeader={false}  // 🆕 Cache le header (filtres déjà dans FilterBar)
            columns={4}         // 🆕 4 colonnes pour Accessoires
          />
        </div>
        
        <Pagination 
          currentPage={1} 
          totalPages={5}
        />
        
        <LooksSection />
      </main>
      
      <Footer />
    </div>
  );
}