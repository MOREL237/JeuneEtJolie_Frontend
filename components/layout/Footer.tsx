// components/layout/Footer.tsx
//
// Footer éditorial multi-variant — design system uniforme sur toutes les variantes.
// Variant 'full' : fond minuit éditorial avec colonnes, réseaux sociaux et paiements.
// Variants catalogue/dashboard/checkout : fond surface, grille mobile-first.

'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface FooterProps {
  variant?: 'full' | 'minimal' | 'catalogue' | 'dashboard' | 'checkout';
}

const PAYMENT_METHODS = ['Orange Money', 'MTN MoMo', 'Wave', 'Visa'];

const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);
const IconFacebook = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20 20 4"/>
  </svg>
);

const SOCIAL = [
  { label: 'Instagram', href: '#instagram', Icon: IconInstagram },
  { label: 'Facebook',  href: '#facebook',  Icon: IconFacebook  },
  { label: 'Twitter',   href: '#twitter',   Icon: IconTwitter   },
];

/* ── Lien footer générique (surfaces claires) ── */
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm text-on-surface/45 hover:text-primary transition-colors duration-200
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
  >
    {children}
  </a>
);

/* ── Lien footer sur fond sombre (variante 'full') ── */
const DarkLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm text-white/40 hover:text-white transition-colors duration-200
               focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
  >
    {children}
  </a>
);

export const Footer = ({ variant = 'full' }: FooterProps) => {
  const { t } = useTranslation();

  /* ── MINIMAL ── */
  if (variant === 'minimal') {
    return (
      <footer className="bg-background border-t border-outline-variant/20 py-14 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-8">
          <span
            className="text-lg text-on-surface tracking-widest"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Jeune & Jolie
          </span>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3" aria-label="Liens du footer">
            {['sustainability', 'bespokeService', 'shippingReturns', 'contact'].map((k) => (
              <FooterLink key={k} href={`#${k}`}>{t(`footer.${k}`)}</FooterLink>
            ))}
          </nav>
          <div className="flex gap-3" role="group" aria-label="Réseaux sociaux">
            {SOCIAL.map(({ label, href, Icon }) => (
              <a key={label} href={href} aria-label={label}
                className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center
                           text-on-surface/40 hover:text-primary hover:border-primary transition-all duration-200">
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-on-surface/25"
             style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            {t('footer.copyrightMinimal')}
          </p>
        </div>
      </footer>
    );
  }

  /* ── CATALOGUE ── */
  if (variant === 'catalogue') {
    return (
      <footer className="bg-surface-container-low border-t border-outline-variant/20 mt-20">
        <div className="max-w-[1440px] mx-auto py-14 px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <BrandCol t={t} desc={t('footer.brandMinimal')} />
            <LinksCol title={t('footer.services')} links={[
              { key: 'sizeGuide',       label: t('footer.sizeGuide') },
              { key: 'deliveryReturns', label: t('footer.deliveryReturns') },
              { key: 'securePayment',   label: t('footer.securePayment') },
              { key: 'orderTracking',   label: t('footer.orderTracking') },
            ]} />
            <LinksCol title={t('footer.theBrand')} links={[
              { key: 'aboutUs',     label: t('footer.aboutUs') },
              { key: 'contact',     label: t('footer.contact') },
              { key: 'legalNotice', label: t('footer.legalNotice') },
            ]} />
            <NewsletterCol t={t} id="footer-nl-catalogue" />
          </div>
          <BottomBar t={t} />
        </div>
      </footer>
    );
  }

  /* ── DASHBOARD ── */
  if (variant === 'dashboard') {
    return (
      <footer className="bg-surface-container-low border-t border-outline-variant/20 mt-20">
        <div className="max-w-[1440px] mx-auto py-14 px-6 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <BrandCol t={t} desc={t('footer.brandDashboard')} />
            <LinksCol title={t('footer.shopping')} links={[
              { key: 'newArrivals',  label: t('footer.newArrivals') },
              { key: 'collections',  label: t('footer.collections') },
              { key: 'sizeGuide',    label: t('footer.sizeGuide') },
            ]} />
            <LinksCol title={t('footer.customerService')} links={[
              { key: 'contact',         label: t('footer.contact') },
              { key: 'deliveryReturns', label: t('footer.deliveryReturns') },
              { key: 'faq',             label: t('footer.faq') },
            ]} />
            <NewsletterCol t={t} id="footer-nl-dashboard" text={t('footer.newsletterTextDashboard')} />
          </div>
          <BottomBar t={t} />
        </div>
      </footer>
    );
  }

  /* ── CHECKOUT ── */
  if (variant === 'checkout') {
    return (
      <footer className="bg-surface-container-low border-t border-outline-variant/20 mt-16">
        <div className="max-w-[1440px] mx-auto py-10 px-6 lg:px-20
                        flex flex-col sm:flex-row justify-between items-center gap-5">
          <span
            className="text-on-surface/50 text-sm tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Jeune & Jolie
          </span>
          <p className="text-on-surface/30 text-xs text-center">{t('footer.copyright')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PAYMENT_METHODS.map((m) => (
              <span key={m}
                className="text-[10px] font-bold text-on-surface/30 tracking-wide border border-outline-variant/30
                           px-2.5 py-1 rounded"
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  /* ── FULL (page d'accueil) ── */
  return (
    <footer className="bg-[var(--background)] dark:bg-[#060614] border-t border-outline-variant/10 dark:border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 pt-20 pb-12">

        {/* Ligne supérieure : logo + réseaux */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8
                        mb-14 pb-14 border-b border-outline-variant/15 dark:border-white/[0.06]">
          <div className="max-w-xs">
            <h2
              className="text-on-background dark:text-white/90 mb-3"
              style={{
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
              }}
            >
              Jeune & Jolie
            </h2>
            <p className="text-on-surface/45 dark:text-white/35 text-sm leading-relaxed">
              {t('footer.brand')}
            </p>
          </div>

          <div className="flex gap-3" role="group" aria-label="Réseaux sociaux">
            {SOCIAL.map(({ label, href, Icon }) => (
              <a key={label} href={href} aria-label={label}
                className="w-10 h-10 rounded-full border border-outline-variant/30 dark:border-white/10
                           flex items-center justify-center
                           text-on-surface/40 dark:text-white/35
                           hover:text-gold hover:border-gold/40
                           transition-all duration-300
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Colonnes de liens — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 gap-y-10 mb-14">

          {/* Boutique */}
          <div>
            <h4 className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-on-surface/30 dark:text-white/30 mb-5"
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
              {t('footer.shop')}
            </h4>
            <ul className="space-y-3">
              {[
                { k: 'newArrivals', l: t('footer.newArrivals') },
                { k: 'bestSellers', l: t('footer.bestSellers') },
                { k: 'promotions',  l: t('footer.promotions')  },
                { k: 'lookbook',    l: t('footer.lookbook')    },
              ].map(({ k, l }) => (
                <li key={k}><DarkLink href={`#${k}`}>{l}</DarkLink></li>
              ))}
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h4 className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-on-surface/30 dark:text-white/30 mb-5"
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
              {t('footer.help')}
            </h4>
            <ul className="space-y-3">
              {[
                { k: 'deliveryReturns', l: t('footer.deliveryReturns') },
                { k: 'securePayment',   l: t('footer.securePayment')   },
                { k: 'sizeGuide',       l: t('footer.sizeGuide')       },
                { k: 'contact',         l: t('footer.contact')         },
              ].map(({ k, l }) => (
                <li key={k}><DarkLink href={`#${k}`}>{l}</DarkLink></li>
              ))}
            </ul>
          </div>

          {/* La Marque */}
          <div>
            <h4 className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-on-surface/30 dark:text-white/30 mb-5"
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
              {t('footer.theBrand')}
            </h4>
            <ul className="space-y-3">
              {[
                { k: 'aboutUs',      l: t('footer.aboutUs')      },
                { k: 'ourWorkshops', l: t('footer.ourWorkshops') },
                { k: 'legalNotice',  l: t('footer.legalNotice')  },
              ].map(({ k, l }) => (
                <li key={k}><DarkLink href={`#${k}`}>{l}</DarkLink></li>
              ))}
            </ul>
          </div>

          {/* Paiement + contact */}
          <div>
            <h4 className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-on-surface/30 dark:text-white/30 mb-5"
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
              {t('footer.payment')}
            </h4>
            <div className="flex flex-wrap gap-2 mb-5">
              {PAYMENT_METHODS.map((m) => (
                <span key={m}
                  className="px-2.5 py-1 rounded border border-outline-variant/20 dark:border-white/10
                             text-[10px] font-semibold text-on-surface/30 dark:text-white/35 tracking-wide"
                  style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
                  {m}
                </span>
              ))}
            </div>
            <a href="mailto:contact@jeunejolie.com"
               className="flex items-center gap-2 text-sm text-on-surface/35 dark:text-white/35
                          hover:text-gold transition-colors duration-200">
              <Mail size={13} strokeWidth={1.5} />
              contact@jeunejolie.com
            </a>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4
                        pt-8 border-t border-outline-variant/10 dark:border-white/[0.06]">
          <p className="text-on-surface/20 dark:text-white/20 text-xs tracking-wide text-center sm:text-left">
            {t('footer.copyrightFull')}
          </p>
          <div className="flex gap-6">
            <a href="#legal"   className="text-on-surface/20 dark:text-white/20 text-xs hover:text-primary dark:hover:text-white/50 transition-colors">
              {t('footer.legalNotice')}
            </a>
            <a href="#privacy" className="text-on-surface/20 dark:text-white/20 text-xs hover:text-primary dark:hover:text-white/50 transition-colors">
              {t('footer.privacyPolicy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ── Sous-composants internes ── */

function BrandCol({ t, desc }: { t: (k: string) => string; desc: string }) {
  return (
    <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
      <span className="block text-lg text-on-surface font-light tracking-wide"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
        Jeune & Jolie
      </span>
      <p className="text-sm text-on-surface/50 leading-relaxed">{desc}</p>
      <div className="flex gap-3" role="group" aria-label="Réseaux sociaux">
        {SOCIAL.map(({ label, href, Icon }) => (
          <a key={label} href={href} aria-label={label}
            className="w-9 h-9 rounded-full border border-outline-variant/40 flex items-center justify-center
                       text-on-surface/40 hover:text-primary hover:border-primary transition-all duration-200">
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
}

function LinksCol({ title, links }: { title: string; links: { key: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-on-surface/40 mb-5"
          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(({ key, label }) => (
          <li key={key}><FooterLink href={`#${key}`}>{label}</FooterLink></li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterCol({ t, id, text }: { t: (k: string) => string; id: string; text?: string }) {
  return (
    <div>
      <h4 className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-on-surface/40 mb-5"
          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
        {t('footer.newsletter')}
      </h4>
      <p className="text-sm text-on-surface/45 mb-4 leading-relaxed">
        {text ?? t('footer.newsletterText')}
      </p>
      <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={id} className="sr-only">{t('footer.newsletterPlaceholder')}</label>
        <input
          id={id}
          type="email"
          placeholder={t('footer.newsletterPlaceholder')}
          className="flex-1 min-w-0 bg-surface-container border border-outline-variant/40 rounded-full
                     px-4 py-2 text-xs text-on-surface placeholder:text-on-surface/30
                     focus:outline-none focus:border-primary transition-colors"
        />
        <button type="submit" className="btn-primary px-4 py-2 text-xs rounded-full shrink-0">
          {t('footer.newsletterButtonShort')}
        </button>
      </form>
    </div>
  );
}

function BottomBar({ t }: { t: (k: string) => string }) {
  return (
    <div className="border-t border-outline-variant/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-xs text-on-surface/30 text-center sm:text-left">{t('footer.copyrightFull')}</p>
      <div className="flex gap-6">
        <FooterLink href="#legal">{t('footer.legalNotice')}</FooterLink>
        <FooterLink href="#privacy">{t('footer.privacyPolicy')}</FooterLink>
      </div>
    </div>
  );
}

export default Footer;
