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

  const accessoires = [
    {
      id: '1',
      name: 'Collier Perles Royales',
      price: 12500,
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
      category: 'Bijoux',
      badge: 'NOUVEAU',
      badgeVariant: 'primary' as const,
    },
    {
      id: '2',
      name: 'Sac Tissé Ndop',
      price: 28000,
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
      category: 'Sacs',
      badge: 'POPULAIRE',
      badgeVariant: 'tertiary' as const,
    },
    {
      id: '3',
      name: 'Ceinture Wax Dorée',
      price: 8500,
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
      category: 'Ceintures',
    },
    {
      id: '4',
      name: 'Foulard Soie Imprimé',
      price: 15000,
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
      category: 'Foulards',
      badge: 'NOUVEAU',
      badgeVariant: 'primary' as const,
    },
    {
      id: '5',
      name: 'Boucles d\'Oreilles Kente',
      price: 9800,
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
      category: 'Bijoux',
    },
    {
      id: '6',
      name: 'Sac Clutch Brodé',
      price: 22000,
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
      category: 'Sacs',
    },
    {
      id: '7',
      name: 'Coiffe Traditionnelle',
      price: 18500,
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
      category: 'Coiffes',
      badge: 'POPULAIRE',
      badgeVariant: 'tertiary' as const,
    },
    {
      id: '8',
      name: 'Bracelet Cuir Tressé',
      price: 6500,
      image: 'https://lh3.googleusercontent.com/aida/ADBb0ugslgsjqU5R0ZV2Ageie9XcwZw-flEl096qDxABlCT0EOgailmOC7cOWL3zKXbcyqsYzw7IzLw3YQ_6xzWWu3SqTCC_HO-azDeGxfYe3cWRmkf9FR4-Fqba96-bDHsA1NhZyAdbKCkTD9wMuMVuj9fKOpvBtwlcP648nmaXRMfeHXbx2HNcJDvCIYKrKK5Prtda5f6UGcpjuoIqoFGx3ZSGAmFdBTybweOSfCbq-W-eX3FTqYrgeTgxBb8',
      category: 'Bijoux',
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