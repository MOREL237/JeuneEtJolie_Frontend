// components/layout/Footer.tsx
'use client';

import React from 'react';

interface FooterProps {
  variant?: 'full' | 'minimal' | 'catalogue' | 'dashboard' | 'checkout';
}

const footerLinks = {
  boutique: [
    { label: 'Nouveautés', href: '#' },
    { label: 'Meilleures ventes', href: '#' },
    { label: 'Promotions', href: '#' },
    { label: 'Lookbook', href: '#' },
  ],
  aide: [
    { label: 'Livraison & Retours', href: '#' },
    { label: 'Paiement Sécurisé', href: '#' },
    { label: 'Guide des Tailles', href: '#' },
    { label: 'Contact', href: '#' },
  ],
};

const paymentMethods = ['ORANGE MONEY', 'MTN MOMO', 'VISA', 'WAVE'];

const catalogueLinks = {
  services: [
    'Guide des Tailles',
    'Livraison & Retours',
    'Paiement Sécurisé',
    'Suivi de Commande',
  ],
  brand: ['À Propos', 'Nos Ateliers', 'Contact', 'Mentions Légales'],
};

const dashboardLinks = {
  shopping: ['Nouveautés', 'Collections', 'Guide des Tailles', 'Accessoires'],
  serviceClient: ['Contact', 'Livraison & Retours', 'Paiement Sécurisé', 'FAQ'],
};

const checkoutLinks = {
  aide: ['Livraison & Retours', 'Paiement Sécurisé', 'Guide des Tailles'],
  informations: ['À Propos', 'Contact'],
};

export const Footer = ({ variant = 'full' }: FooterProps) => {
  // ========== VARIANT MINIMAL ==========
  if (variant === 'minimal') {
    return (
      <footer className="bg-white flex flex-col items-center gap-8 py-20 px-10 border-t border-outline-variant/30">
        <div className="text-xl font-serif font-bold text-on-surface tracking-widest">
          Jeune & Jolie
        </div>
        <div className="flex flex-wrap justify-center gap-10">
          {['Sustainability', 'Bespoke Service', 'Shipping & Returns', 'Contact'].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
              >
                {link}
              </a>
            )
          )}
        </div>
        <div className="flex gap-6 mt-4">
          {['F', 'I', 'T'].map((social) => (
            <a
              key={social}
              href="#"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-all"
            >
              <span className="text-xs font-bold">{social}</span>
            </a>
          ))}
        </div>
        <p className="text-[11px] tracking-widest uppercase text-on-surface-variant mt-10">
          © 2026 JEUNE & JOLIE LUXURY. CRAFTED IN AFRICA.
        </p>
      </footer>
    );
  }

  // ========== VARIANT CATALOGUE ==========
  if (variant === 'catalogue') {
    return (
      <footer className="bg-surface-container-low border-t border-outline-variant/30 mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <span className="text-xl font-bold text-on-surface font-serif">
              Jeune & Jolie
            </span>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              L'excellence de l'artisanat africain au service de l'élégance contemporaine.
              Créations exclusives conçues pour la femme moderne.
            </p>
            <div className="flex items-center gap-4">
              {['share', 'mail'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all"
                >
                  <span className="material-symbols-outlined text-sm">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">
              Services
            </h4>
            <ul className="space-y-4">
              {catalogueLinks.services.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* La Marque */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">
              La Marque
            </h4>
            <ul className="space-y-4">
              {catalogueLinks.brand.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">
              Newsletter
            </h4>
            <p className="text-xs text-on-surface-variant mb-4">
              Inscrivez-vous pour recevoir nos nouvelles collections et offres exclusives.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-white border border-outline-variant rounded-lg px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary text-xs font-bold py-2 rounded-lg hover:bg-primary-container transition-all"
              >
                S'ABONNER
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-outline-variant py-8 px-5 lg:px-20">
          <p className="text-center text-on-surface-variant text-xs">
            © 2026 Jeune & Jolie. Artisanat et Elégance Africaine. Tous droits réservés.
          </p>
        </div>
      </footer>
    );
  }

  // ========== VARIANT DASHBOARD ==========
  if (variant === 'dashboard') {
    return (
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-inter text-xs leading-relaxed">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xl font-bold text-slate-900 dark:text-white font-headline-md">
              Jeune & Jolie
            </h4>
            <p className="text-slate-500 dark:text-slate-400">
              L'art de l'élégance africaine moderne. Créations exclusives conçues pour la femme contemporaine qui célèbre ses racines.
            </p>
            <div className="flex gap-4">
              <a href="#" className="material-symbols-outlined text-slate-400 hover:text-pink-600 cursor-pointer transition-colors">
                language
              </a>
              <a href="#" className="material-symbols-outlined text-slate-400 hover:text-pink-600 cursor-pointer transition-colors">
                mail
              </a>
            </div>
          </div>

          {/* Shopping */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-2">
              Shopping
            </h5>
            {dashboardLinks.shopping.map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 dark:text-slate-400 hover:underline decoration-pink-500 underline-offset-4 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Service Client */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-2">
              Service Client
            </h5>
            {dashboardLinks.serviceClient.map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 dark:text-slate-400 hover:underline decoration-pink-500 underline-offset-4 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-2">
              Newsletter
            </h5>
            <p className="text-slate-500 dark:text-slate-400">
              Inscrivez-vous pour recevoir nos dernières actualités et offres exclusives.
            </p>
            <div className="flex gap-2">
              <input
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg flex-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Votre email"
                type="email"
              />
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-pink-700 transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="max-w-7xl mx-auto px-5 lg:px-20 py-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400">
            © 2026 Jeune & Jolie. Artisanat et Elégance Africaine.
          </p>
          <div className="flex gap-8 text-slate-400">
            <a className="hover:text-pink-600 transition-colors" href="#">
              Mentions Légales
            </a>
            <a className="hover:text-pink-600 transition-colors" href="#">
              Politique de Confidentialité
            </a>
          </div>
        </div>
      </footer>
    );
  }

  // ========== VARIANT CHECKOUT ==========
  if (variant === 'checkout') {
    return (
      <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Jeune & Jolie
            </div>
            <p className="font-inter text-xs leading-relaxed text-slate-500 max-w-sm mb-6">
              Artisanat et Élégance Africaine. Chaque pièce est conçue pour célébrer la force et la beauté de la femme moderne.
            </p>
            <div className="flex gap-4">
              <a href="#" className="material-symbols-outlined text-slate-400 hover:text-pink-600 cursor-pointer transition-colors">
                public
              </a>
              <a href="#" className="material-symbols-outlined text-slate-400 hover:text-pink-600 cursor-pointer transition-colors">
                camera_alt
              </a>
              <a href="#" className="material-symbols-outlined text-slate-400 hover:text-pink-600 cursor-pointer transition-colors">
                mail
              </a>
            </div>
          </div>

          {/* Aide & Services */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
              Aide & Services
            </h4>
            <ul className="space-y-3 font-inter text-xs text-slate-500">
              {checkoutLinks.aide.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:underline decoration-pink-500 underline-offset-4 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
              Informations
            </h4>
            <ul className="space-y-3 font-inter text-xs text-slate-500">
              {checkoutLinks.informations.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:underline decoration-pink-500 underline-offset-4 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 lg:px-20 py-8 border-t border-slate-100 flex justify-between items-center">
          <p className="font-inter text-xs text-slate-400">
            © 2026 Jeune & Jolie. Artisanat et Elégance Africaine.
          </p>
          <div className="flex gap-6 grayscale opacity-40">
            <span className="material-symbols-outlined">account_balance</span>
            <span className="material-symbols-outlined">payments</span>
          </div>
        </div>
      </footer>
    );
  }

  // ========== VARIANT FULL (par défaut - page d'accueil) ==========
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-20 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <span className="text-xl font-bold text-on-surface font-serif">
            Jeune & Jolie
          </span>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            Artisanat et Élégance Africaine. Nous créons des pièces uniques qui
            célèbrent la beauté et la force de la femme moderne.
          </p>
          <div className="flex gap-4">
            {['F', 'I', 'T'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-all"
              >
                <span className="text-xs font-bold">{social}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Boutique */}
        <div>
          <h4 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">
            Boutique
          </h4>
          <ul className="space-y-4">
            {footerLinks.boutique.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Aide */}
        <div>
          <h4 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">
            Aide
          </h4>
          <ul className="space-y-4">
            {footerLinks.aide.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Paiement */}
        <div>
          <h4 className="font-bold text-on-surface mb-6 uppercase text-xs tracking-widest">
            Paiement
          </h4>
          <div className="flex flex-wrap gap-3 mb-6">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-2 py-1 bg-white rounded border border-outline-variant text-[10px] font-bold text-on-surface-variant"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant">
            © 2026 Jeune & Jolie. Artisanat et Elégance Africaine.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;