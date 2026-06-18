// app/[lang]/produit/[slug]/page.tsx
'use client';

import React from 'react';
import { PromoBanner } from '@/components/layout/PromoBanner';
import TopNavBar from '@/components/layout/TopNavBar';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ProductGallery } from '@/components/sections/ProductGallery';
import { ProductInfo } from '@/components/sections/ProductInfo';
import { ProductAccordion } from '@/components/sections/ProductAccordion';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { RelatedProducts } from '@/components/sections/RelatedProducts';
import { Footer } from '@/components/layout/Footer';

const breadcrumbItems = [
  { label: 'Accueil', href: '/fr' },
  { label: 'Prêt-à-porter', href: '/fr/catalogue' },
  { label: 'Robes de Soirée' },
];

const productImages = [
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
  'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
];

const colors = [
  { name: 'Rouge Royal', hex: '#b80049', value: 'rouge' },
  { name: 'Noir', hex: '#1a1a2e', value: 'noir' },
  { name: 'Or', hex: '#d4af37', value: 'or' },
];

const sizes = [
  { label: 'XS', available: true },
  { label: 'S', available: true },
  { label: 'M', available: true },
  { label: 'L', available: true },
  { label: 'XL', available: false },
];

const accordionItems = [
  {
    title: 'Description',
    content: (
      <p>
        Inspirée par la majesté du royaume d'Oyo, cette robe est une célébration de la féminité
        moderne et de l'héritage africain. Confectionnée dans un satin de soie lourd avec des
        empiècements en wax authentique, elle présente une silhouette architecturale qui sublime
        toutes les morphologies.
      </p>
    ),
  },
  {
    title: 'Composition & Entretien',
    content: (
      <ul className="list-disc pl-5 gap-2 flex flex-col">
        <li>80% Soie de mûrier, 20% Coton Wax Premium.</li>
        <li>Nettoyage à sec professionnel recommandé.</li>
        <li>Repassage doux sur l'envers.</li>
      </ul>
    ),
  },
  {
    title: 'Livraison & Retours',
    content: (
      <p>
        Livraison offerte dès 50.000 FCFA d'achat. Retours gratuits sous 14 jours dans leur
        emballage d'origine. Expédition express disponible en 24h à Abidjan et Dakar.
      </p>
    ),
  },
];

const reviewsDistribution = [
  { stars: 5, percentage: 70 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 10 },
  { stars: 2, percentage: 5 },
  { stars: 1, percentage: 0 },
];

const reviews = [
  {
    initials: 'SM',
    name: 'Seynabou M.',
    rating: 5,
    date: 'Il y a 2 jours',
    title: 'Absolument magnifique !',
    content:
      "La coupe est parfaite et le tissu est d'une qualité exceptionnelle. On sent vraiment le travail artisanal dans chaque détail. J'ai reçu tellement de compliments lors de ma soirée.",
    avatarBg: 'bg-secondary-fixed',
  },
  {
    initials: 'AK',
    name: 'Amina K.',
    rating: 4,
    date: 'Il y a 1 semaine',
    title: 'Élégante et moderne',
    content:
      'Très belle robe, la couleur est plus vibrante en vrai que sur les photos. Seul bémol, elle est un peu longue pour moi mais avec des talons ça passe parfaitement.',
    avatarBg: 'bg-surface-container-high',
  },
  {
    initials: 'FD',
    name: 'Fatou D.',
    rating: 5,
    date: 'Il y a 1 mois',
    title: 'Un vrai bijou',
    content:
      "Livraison rapide et soignée. Le packaging est aussi luxueux que la robe elle-même. Je recommande vivement pour une occasion spéciale.",
    avatarBg: 'bg-primary-fixed',
  },
];

const relatedProducts = [
  {
    id: '1',
    name: "Pochette 'Sunu' Dorée",
    price: 12500,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
  },
  {
    id: '2',
    name: "Boucles d'oreilles Nomades",
    price: 8000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
  },
  {
    id: '3',
    name: "Robe d'été 'Fleurs de Coton'",
    price: 22000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
  },
  {
    id: '4',
    name: "Foulard 'Heritage' en Soie",
    price: 15000,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600',
  },
];

export default function ProductPage() {
  return (
    <>
      <PromoBanner />
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-8 md:py-12">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
          {/* Left: Gallery */}
          <ProductGallery images={productImages} hasVideo={true} />
          
          {/* Right: Info */}
          <ProductInfo
            brand="Jeune & Jolie Couture"
            name="Robe Impériale 'Oyo'"
            price={28000}
            originalPrice={35000}
            rating={4.2}
            reviews={28}
            colors={colors}
            sizes={sizes}
            stockWarning={3}
          />
        </div>
        
        {/* Accordions */}
        <div className="mb-16">
          <ProductAccordion items={accordionItems} />
        </div>
        
        {/* Reviews */}
        <div className="mb-16">
          <ReviewsSection
            average={4.2}
            totalReviews={28}
            distribution={reviewsDistribution}
            reviews={reviews}
          />
        </div>
        
        {/* Related Products */}
        <div className="mb-16">
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      
      <Footer variant="catalogue" />
    </>
  );
}