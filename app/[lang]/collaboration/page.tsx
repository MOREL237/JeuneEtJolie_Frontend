// app/[lang]/collections/page.tsx
import { getDictionary } from '@/lib/i18n/getDictionary';
import { type Locale } from '@/lib/i18n/config';
import { PromoBanner } from '@/components/layout/PromoBanner';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { CollectionsGrid } from '@/components/sections/CollectionsGrid';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/layout/Footer';

export default async function CollectionsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  return (
    <>
      <PromoBanner message={dict.promo.message} />
      <Navbar lang={lang} dict={dict} />
      
      <main>
        <HeroSection
          dict={{
            tag: dict.collections.title,
            title: dict.collections.title,
            description: dict.collections.subtitle,
            discover: '',
            promotions: '',
          }}
          centered={true}
          height="h-[80vh]"
          showButtons={false}
          backgroundImage="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920"
        />
        
        <CollectionsGrid />
        
        <Newsletter
          dict={dict.newsletter}
          variant="light"
        />
      </main>
      
      <Footer variant="minimal" />
    </>
  );
}