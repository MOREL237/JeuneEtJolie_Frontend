// app/[lang]/collaboration/page.tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/layout/Footer';
import TopNavBar from '@/components/layout/TopNavBar';
import PromoBanner from '@/components/layout/PromoBanner';

export default function CollectionsPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';

  const isEnglish = lang === 'en';

  const handleDiscover = () => {
    document.getElementById('featured-pieces')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePromotions = () => {
    window.location.href = `/${lang}/soldes`;
  };

  return (
    <>
      <PromoBanner />
      <TopNavBar />
      
      <main>
        {/* Hero Section with 3D animations */}
        <HeroSection 
          dict={{
            tag: isEnglish ? 'New Collection' : 'Nouvelle Collection',
            title: isEnglish ? 'Lights of Africa' : 'Lumières d\'Afrique',
            description: isEnglish 
              ? 'A celebration of contemporary elegance. Refined silhouettes meeting the subtle radiance of traditional textiles reimagined for the modern woman.'
              : 'Une celebration de l\'élégance contemporaine. Des silhouettes épurées rencontrant l\'éclat subtil des textiles traditionnels revisités pour la femme moderne.',
            discover: isEnglish ? 'Discover the pieces' : 'Découvrir les pièces',
            promotions: isEnglish ? 'View collections' : 'Voir les collections',
          }}
          backgroundImage="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1920&h=1080&fit=crop"
          showButtons={true}
          centered={true}
          onDiscover={handleDiscover}
          onPromotions={handlePromotions}
        />

        {/* Inspiration Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-background">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
            {/* Title */}
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl text-on-surface mb-4" style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                {isEnglish ? 'The Inspiration' : 'L\'Inspiration'}
              </h2>
              <div className="w-12 h-1 bg-primary mx-auto"></div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
              {/* Left Text */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl md:text-3xl text-on-surface mb-6" style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                  {isEnglish ? 'A sensory journey' : 'Un voyage sensoriel'}
                </h3>
                <div className="space-y-4 text-on-surface/70 text-sm md:text-base leading-relaxed">
                  <p>
                    {isEnglish 
                      ? 'The \'Lights of Africa\' collection draws its essence from the striking contrasts of the earth. We wanted to capture that fleeting moment when the setting sun tints landscapes with shades of gold and purple.'
                      : 'La collection \'Lumières d\'Afrique\' puise son essence dans les contrastes saisissants de la terre. Nous avons voulu capturer l\'instant fugace où le soleil couchant teinte les paysages de nuances dorées et pourpres.'
                    }
                  </p>
                  <p>
                    {isEnglish
                      ? 'Each piece is conceived as a blank canvas, where delicate embroidery touches and artisanal weaving come together to structure minimalist cuts, creating a wardrobe that is both bold and poetic.'
                      : 'Chaque pièce est pensée comme une toile vierge, où des touches de broderies délicates et de tissages artisanaux viennent structurer des coupes minimalistes, créant une garde-robe à la fois forte et poétique.'
                    }
                  </p>
                </div>
              </div>

              {/* Right Images Grid */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {/* Large image top */}
                  <div className="col-span-2 md:col-span-1 row-span-2">
                    <img 
                      src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop"
                      alt={isEnglish ? 'Inspiration textile' : 'Inspiration textile'}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Small images right */}
                  <div className="col-span-1">
                    <img 
                      src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop"
                      alt={isEnglish ? 'Design sketch' : 'Design sketch'}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="col-span-1">
                    <img 
                      src="https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&h=300&fit=crop"
                      alt={isEnglish ? 'Fabric detail' : 'Détail tissu'}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pièces Maîtresses Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-surface-container-low/30" id="featured-pieces">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 md:mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl text-on-surface mb-2" style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
                  {isEnglish ? 'Master Pieces' : 'Pièces Maîtresses'}
                </h2>
                <div className="w-12 h-1 bg-primary"></div>
              </div>
              <Link href={`/${lang}/catalogue`} className="text-primary text-sm font-bold uppercase tracking-widest hover:text-primary/80">
                {isEnglish ? 'View all' : 'Voir tout'}
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product 1 */}
              <div className="bg-white rounded-lg overflow-hidden group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop"
                    alt={isEnglish ? 'Midi Sol Dress' : 'Robe Midi Sol'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white">
                    ♡
                  </button>
                  <span className="absolute bottom-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {isEnglish ? 'New' : 'Nouveauté'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-on-surface font-semibold mb-2">{isEnglish ? 'Midi Sol Dress' : 'Robe Midi Sol'}</h3>
                  <p className="text-primary font-bold">145 €</p>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-white rounded-lg overflow-hidden group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=600&fit=crop"
                    alt={isEnglish ? 'Dawn Tailored Suit' : 'Ensemble Tailleur Aube'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white">
                    ♡
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-on-surface font-semibold mb-2">{isEnglish ? 'Dawn Tailored Suit' : 'Ensemble Tailleur Aube'}</h3>
                  <p className="text-primary font-bold">220 €</p>
                </div>
              </div>

              {/* Product 3 */}
              <div className="bg-white rounded-lg overflow-hidden group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=600&fit=crop"
                    alt={isEnglish ? 'Zenith Cuff' : 'Manchette Zénith'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white">
                    ♡
                  </button>
                  <span className="absolute bottom-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {isEnglish ? 'Artisan' : 'Artisan'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-on-surface font-semibold mb-2">{isEnglish ? 'Zenith Cuff' : 'Manchette Zénith'}</h3>
                  <p className="text-primary font-bold">85 €</p>
                </div>
              </div>

              {/* Product 4 */}
              <div className="bg-white rounded-lg overflow-hidden group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop"
                    alt={isEnglish ? 'Twilight Bag' : 'Sac Crépuscule'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white">
                    ♡
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-on-surface font-semibold mb-2">{isEnglish ? 'Twilight Bag' : 'Sac Crépuscule'}</h3>
                  <p className="text-primary font-bold">195 €</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-surface-container-low">
          <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 text-center">
            <h2 className="text-4xl md:text-5xl text-on-surface mb-8" style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
              {isEnglish ? 'Ready to shine?' : 'Prête à rayonner ?'}
            </h2>
            <Link 
              href={`/${lang}/catalogue`}
              className="inline-block bg-primary hover:bg-primary/90 text-on-primary px-10 py-4 font-bold text-sm uppercase tracking-widest transition-colors"
            >
              {isEnglish ? 'Explore the full collection' : 'Explorer toute la collection'}
            </Link>
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter 
          dict={{
            title: isEnglish ? 'Stay inspired' : 'Restez inspirée',
            subtitle: isEnglish ? 'Discover our latest creations and exclusive events directly in your inbox.' : 'Découvrez nos dernières créations et événements exclusifs directement dans votre boîte mail.',
            placeholder: isEnglish ? 'your@email.com' : 'votre@email.com',
            button: isEnglish ? 'Subscribe' : 'S\'inscrire',
          }}
          variant="dark"
        />
      </main>
      
      <Footer variant="minimal" />
    </>
  );
}