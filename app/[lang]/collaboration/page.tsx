// app/[lang]/collaboration/page.tsx
import { getDictionary } from '@/lib/i18n/getDictionary';
import { type Locale } from '@/lib/i18n/config';
import { PromoBanner } from '@/components/layout/PromoBanner';
import { CollectionsGrid } from '@/components/sections/CollectionsGrid';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/layout/Footer';
import TopNavBar from '@/components/layout/TopNavBar';

export default async function CollectionsPage({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const collections = [
    {
      name: "L'Éclat du Sahel",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      href: "#",
    },
    {
      name: "Mariage",
      image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800",
      href: "#",
    },
    {
      name: "Héritage Wax",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
      href: "#",
    },
    {
      name: "Essentiels",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      href: "#",
    },
  ];

  return (
    <>
      <PromoBanner message={dict.promo.message} />
      <TopNavBar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-b from-slate-300 to-slate-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 md:px-8">
            <h1 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl text-slate-800 mb-4 md:mb-6">
              Collections
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-2xl uppercase tracking-wider">
              L'union sacrée de l'artisanat ancestral et de<br />l'élégance contemporaine.
            </p>
          </div>
        </section>
        
        {/* Collections Grid */}
        <div className="py-12 md:py-16 lg:py-20">
          <CollectionsGrid collections={collections} />
        </div>
        
        {/* Newsletter Section */}
        <div className="bg-[#fce7f3] py-16 md:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 text-center">
            <h2 className="font-headline-lg text-2xl md:text-3xl lg:text-4xl text-slate-800 mb-4 md:mb-6 uppercase tracking-wide">
              Rejoignez l'univers Aura
            </h2>
            <p className="text-sm md:text-base text-slate-600 mb-8 md:mb-10 max-w-2xl mx-auto">
              Soyez la première à découvrir nos nouvelles collections et événements exclusifs.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-5 md:px-6 py-3 md:py-4 rounded-lg text-sm md:text-base border-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base uppercase tracking-wider hover:bg-secondary transition-colors whitespace-nowrap"
              >
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer variant="minimal" />
    </>
  );
}