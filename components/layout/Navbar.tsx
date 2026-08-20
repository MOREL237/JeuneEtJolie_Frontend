// components/layout/Navbar.tsx
//
// Navigation principale — glassmorphism adaptatif.
// Transparente sur le hero, elle devient une barre opaque après le scroll.
// Le sélecteur de langue utilise useI18n() pour une navigation réelle.
// Le toggle thème utilise useTheme() — plus de duplication d'état.

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useI18n } from '@/components/providers/I18nProvider';
import { i18n, type Locale } from '@/lib/i18n/config';

interface NavbarProps {
  lang: Locale;
  dict: {
    navbar: {
      newArrivals:  string;
      collections:  string;
      readyToWear:  string;
      accessories:  string;
      sales:        string;
      search:       string;
      favorites:    string;
      cart:         string;
      account:      string;
    };
  };
}

/* Libellé affiché pour chaque locale */
const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
};

export const Navbar = ({ lang, dict }: NavbarProps) => {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { setLocale } = useI18n();

  /* Détecte le scroll pour passer de transparent → opaque */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Ferme le menu mobile à chaque changement de route */
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { label: dict.navbar.newArrivals, href: `/${lang}` },
    { label: dict.navbar.collections, href: `/${lang}/catalogue` },
    { label: dict.navbar.readyToWear, href: `/${lang}/catalogue` },
    { label: dict.navbar.accessories, href: `/${lang}/accessoires` },
    { label: dict.navbar.sales,       href: `/${lang}/catalogue` },
  ];

  const handleLocaleChange = useCallback(
    (newLocale: Locale) => setLocale(newLocale),
    [setLocale]
  );

  const isActive = (href: string) => pathname === href;

  /* Classe de fond : transparent sur hero, verre après scroll */
  const headerBg = scrolled
    ? 'bg-background/90 backdrop-blur-xl shadow-sm border-b border-outline-variant/20'
    : 'bg-transparent';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            {/* Monogramme décoratif */}
            <span
              className="text-gold text-xs font-bold tracking-[0.3em] border border-gold/40 px-1.5 py-0.5 rounded"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              J&J
            </span>
            <span
              className={`text-xl lg:text-2xl font-light tracking-wide transition-colors duration-500 ${
                scrolled ? 'text-on-background' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
            >
              Jeune & Jolie
            </span>
          </Link>

          {/* ── Navigation desktop ── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  relative text-[0.7rem] font-semibold tracking-[0.18em] uppercase
                  transition-colors duration-300
                  after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-gold
                  after:transition-all after:duration-300
                  ${isActive(link.href)
                    ? 'text-gold after:w-full'
                    : `after:w-0 hover:after:w-full ${scrolled ? 'text-on-surface/80 hover:text-primary' : 'text-white/80 hover:text-white'}`
                  }
                `}
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-1 md:gap-2">

            {/* Recherche */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen((o) => !o)}
                aria-label={dict.navbar.search}
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  transition-colors duration-200
                  ${scrolled
                    ? 'text-on-surface/70 hover:text-primary hover:bg-surface-container'
                    : 'text-white/70 hover:text-white'
                  }
                `}
              >
                <Search size={17} strokeWidth={1.75} />
              </button>

              {/* Barre de recherche dépliable */}
              {searchOpen && (
                <div className="absolute right-0 top-11 w-64 glass-card p-2 shadow-xl">
                  <input
                    autoFocus
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={dict.navbar.search}
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface/40
                               px-3 py-2 rounded-lg border border-outline-variant/40
                               focus:outline-none focus:border-primary"
                  />
                </div>
              )}
            </div>

            {/* Toggle thème */}
            <ThemeToggle
              className={scrolled ? '' : 'text-white/70 hover:text-white hover:bg-white/10'}
            />

            {/* Favoris */}
            <Link href={`/${lang}/dashboard/wishlist`} aria-label={dict.navbar.favorites}>
              <button
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  transition-colors duration-200
                  ${scrolled
                    ? 'text-on-surface/70 hover:text-primary hover:bg-surface-container'
                    : 'text-white/70 hover:text-white'
                  }
                `}
              >
                <Heart size={17} strokeWidth={1.75} />
              </button>
            </Link>

            {/* Panier */}
            <Link href={`/${lang}/panier`} className="relative" aria-label={dict.navbar.cart}>
              <button
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  transition-colors duration-200
                  ${scrolled
                    ? 'text-on-surface/70 hover:text-primary hover:bg-surface-container'
                    : 'text-white/70 hover:text-white'
                  }
                `}
              >
                <ShoppingBag size={17} strokeWidth={1.75} />
              </button>
              {/* Badge compteur */}
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-on-primary
                           text-[9px] font-bold flex items-center justify-center pointer-events-none"
              >
                2
              </span>
            </Link>

            {/* Compte */}
            <Link href={`/${lang}/dashboard`} aria-label={dict.navbar.account} className="hidden md:block">
              <button
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  transition-colors duration-200
                  ${scrolled
                    ? 'text-on-surface/70 hover:text-primary hover:bg-surface-container'
                    : 'text-white/70 hover:text-white'
                  }
                `}
              >
                <User size={17} strokeWidth={1.75} />
              </button>
            </Link>

            {/* Sélecteur de langue — navigation réelle via useI18n */}
            <div className="relative hidden md:block">
              <div className="flex items-center">
                {i18n.locales.map((locale, idx) => (
                  <React.Fragment key={locale}>
                    {idx > 0 && (
                      <span className={`text-[10px] mx-1 ${scrolled ? 'text-on-surface/30' : 'text-white/30'}`}>
                        /
                      </span>
                    )}
                    <button
                      onClick={() => handleLocaleChange(locale)}
                      className={`
                        text-[0.65rem] font-bold tracking-widest
                        transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-0.5
                        ${locale === lang
                          ? 'text-gold'
                          : scrolled
                            ? 'text-on-surface/40 hover:text-primary'
                            : 'text-white/40 hover:text-white'
                        }
                      `}
                      aria-label={`Changer la langue en ${locale.toUpperCase()}`}
                      aria-current={locale === lang ? 'true' : undefined}
                    >
                      {LOCALE_LABELS[locale]}
                    </button>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Burger mobile */}
            <button
              className={`
                lg:hidden w-9 h-9 rounded-full flex items-center justify-center ml-1
                transition-colors duration-200
                ${scrolled
                  ? 'text-on-surface hover:bg-surface-container'
                  : 'text-white hover:bg-white/10'
                }
              `}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      {mobileOpen && (
        <div className="lg:hidden glass-card mx-4 mb-4 rounded-2xl overflow-hidden shadow-2xl">
          <nav className="flex flex-col p-4 gap-1" aria-label="Menu mobile">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  px-4 py-3 rounded-xl text-sm font-medium tracking-wide
                  transition-colors duration-200
                  ${isActive(link.href)
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-on-surface/70 hover:text-on-surface hover:bg-surface-container'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}

            {/* Séparateur */}
            <div className="h-px bg-outline-variant/30 my-2" />

            {/* Locale + actions mobile */}
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex gap-3">
                {i18n.locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => handleLocaleChange(locale)}
                    className={`text-sm font-bold tracking-widest px-2 py-1 rounded
                      ${locale === lang ? 'text-gold' : 'text-on-surface/40 hover:text-primary'}`}
                  >
                    {LOCALE_LABELS[locale]}
                  </button>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
