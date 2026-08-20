// components/layout/TopNavBar.tsx
//
// Navigation principale sticky — adaptatif selon le thème (light/dark).
// Fond semi-transparent → glass sur scroll. Recherche avec fermeture
// Escape/clic-externe et layout plein-écran sur mobile.

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTranslation } from '@/hooks/useTranslation';
import { useI18n } from '@/components/providers/I18nProvider';
import { i18n, type Locale } from '@/lib/i18n/config';

export default function TopNavBar() {
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);
  const params    = useParams();
  const pathname  = usePathname();
  const lang      = (params?.lang as string) || i18n.defaultLocale;
  const { t }     = useTranslation();
  const { setLocale } = useI18n();

  /* Détection scroll pour fond glass */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Ferme menus à chaque changement de route */
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* Bloque le scroll body quand le menu mobile est ouvert */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* Fermeture recherche sur clic externe ou Escape */
  useEffect(() => {
    if (!searchOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    const onClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [searchOpen]);

  const navLinks = [
    { label: t('nav.newArrivals') || 'Nouveautés',    href: `/${lang}`,              exact: true  },
    { label: t('nav.collections') || 'Collections',   href: `/${lang}/collaboration`, exact: false },
    { label: t('nav.readyToWear') || 'Prêt-à-porter', href: `/${lang}/catalogue`,     exact: false },
    { label: t('nav.accessories') || 'Accessoires',   href: `/${lang}/accessoires`,   exact: false },
    { label: t('nav.sales')       || 'Soldes',         href: `/${lang}/soldes`,        exact: false },
  ];

  const isActive = useCallback((link: (typeof navLinks)[0]) => {
    if (link.exact) return pathname === link.href;
    if (link.href === `/${lang}/catalogue`)
      return pathname.startsWith(`/${lang}/catalogue`) || pathname.startsWith(`/${lang}/produit`);
    return pathname.startsWith(link.href);
  }, [pathname, lang]);

  /* Fond header adaptatif — toujours sur une surface colorée (pas hero overlay) */
  const headerCls = scrolled
    ? 'bg-background/95 backdrop-blur-xl shadow-sm border-b border-outline-variant/20'
    : 'bg-background/80 backdrop-blur-md';

  /* Icônes et textes nav — toujours on-surface, jamais blanc (TopNavBar n'overlay pas un hero) */
  const iconCls  = 'text-on-surface/65 hover:text-primary hover:bg-surface-container';
  const linkBase = 'text-on-surface/65 hover:text-primary';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: connecter à la logique de recherche
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${headerCls}`}
      role="banner"
    >
      {/* Skip link accessibilité */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999]
                   focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-lg"
      >
        {t('common.skipToMain') || 'Aller au contenu principal'}
      </a>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link
            href={`/${lang}`}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="Jeune & Jolie — Accueil"
          >
            <span
              className="text-[0.6rem] font-bold tracking-[0.3em] border px-1.5 py-0.5 rounded
                         text-gold border-gold/40 transition-colors duration-300"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              J&J
            </span>
            <span
              className="text-xl md:text-2xl font-light tracking-wide text-on-background transition-colors duration-300"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
            >
              Jeune & Jolie
            </span>
          </Link>

          {/* ── Navigation desktop ── */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label={t('nav.main') || 'Navigation principale'}
          >
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    relative text-[0.68rem] font-semibold tracking-[0.18em] uppercase
                    transition-colors duration-300
                    after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-gold
                    after:transition-all after:duration-300
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-0.5
                    ${active
                      ? 'text-gold after:w-full'
                      : `after:w-0 hover:after:w-full ${linkBase}`
                    }
                  `}
                  style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-1 md:gap-1.5">

            {/* Recherche */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen((o) => !o)}
                aria-label={t('nav.search') || 'Rechercher'}
                aria-expanded={searchOpen}
                aria-controls="search-panel"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${iconCls}`}
              >
                {searchOpen ? <X size={17} strokeWidth={1.75} /> : <Search size={17} strokeWidth={1.75} />}
              </button>

              {/* Panneau de recherche — plein écran sur mobile, dropdown sur desktop */}
              {searchOpen && (
                <div
                  id="search-panel"
                  role="search"
                  className="
                    fixed inset-x-0 top-[calc(var(--navbar-height,64px))] z-40
                    sm:absolute sm:inset-auto sm:right-0 sm:top-12 sm:w-80
                    glass-card shadow-2xl
                    mx-0 sm:mx-0 rounded-none sm:rounded-2xl
                    border-b border-outline-variant/20 sm:border
                    p-4
                  "
                >
                  <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <label htmlFor="nav-search" className="sr-only">
                      {t('nav.search') || 'Rechercher'}
                    </label>
                    <Search size={15} className="shrink-0 text-on-surface/35" />
                    <input
                      id="nav-search"
                      autoFocus
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('nav.search') || 'Rechercher...'}
                      className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface/35
                                 py-1 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="submit"
                        aria-label="Lancer la recherche"
                        className="shrink-0 w-7 h-7 rounded-full bg-primary text-on-primary
                                   flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Thème */}
            <ThemeToggle />

            {/* Favoris */}
            <Link
              href={`/${lang}/dashboard/wishlist`}
              aria-label={t('navbar.favorites') || 'Favoris'}
              className="relative"
            >
              <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${iconCls}`}>
                <Heart size={17} strokeWidth={1.75} />
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-on-primary
                               text-[9px] font-bold flex items-center justify-center pointer-events-none">
                3
              </span>
            </Link>

            {/* Panier */}
            <Link
              href={`/${lang}/panier`}
              aria-label={t('navbar.cart') || 'Panier'}
              className="relative"
            >
              <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${iconCls}`}>
                <ShoppingBag size={17} strokeWidth={1.75} />
              </span>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-on-primary
                               text-[9px] font-bold flex items-center justify-center pointer-events-none">
                2
              </span>
            </Link>

            {/* Compte */}
            <Link
              href={`/${lang}/dashboard`}
              aria-label={t('navbar.account') || 'Compte'}
              className="hidden md:block"
            >
              <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 ${iconCls}`}>
                <User size={17} strokeWidth={1.75} />
              </span>
            </Link>

            {/* Sélecteur de langue */}
            <div className="hidden md:flex items-center gap-1 ml-1">
              {i18n.locales.map((locale, idx) => (
                <span key={locale} className="flex items-center gap-1">
                  {idx > 0 && (
                    <span className="text-[10px] text-on-surface/25">/</span>
                  )}
                  <button
                    onClick={() => setLocale(locale as Locale)}
                    aria-label={`Langue : ${locale.toUpperCase()}`}
                    aria-current={locale === lang ? 'true' : undefined}
                    className={`
                      text-[0.62rem] font-bold tracking-widest px-1 py-0.5 rounded
                      transition-colors duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                      ${locale === lang
                        ? 'text-gold'
                        : 'text-on-surface/35 hover:text-primary'
                      }
                    `}
                    style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
                  >
                    {locale.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {/* Burger mobile */}
            <button
              className={`lg:hidden w-9 h-9 rounded-full flex items-center justify-center ml-1 transition-colors duration-200 ${iconCls}`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? (t('nav.closeMenu') || 'Fermer le menu') : (t('nav.openMenu') || 'Ouvrir le menu')}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Menu mobile ── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden glass-card mx-4 mb-4 rounded-2xl overflow-hidden shadow-2xl"
        >
          <nav
            className="flex flex-col p-4 gap-1"
            aria-label={t('nav.mobile') || 'Menu mobile'}
          >
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    px-4 py-3 rounded-xl text-sm font-medium tracking-wide
                    transition-colors duration-200
                    ${active
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-on-surface/65 hover:text-on-surface hover:bg-surface-container'
                    }
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="h-px bg-outline-variant/30 my-2" />

            {/* Contrôles bas du menu mobile */}
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex gap-3">
                {i18n.locales.map((locale) => (
                  <button
                    key={locale}
                    onClick={() => { setLocale(locale as Locale); setMobileOpen(false); }}
                    className={`text-sm font-bold tracking-widest px-2 py-1 rounded
                      ${locale === lang ? 'text-gold' : 'text-on-surface/40 hover:text-primary'}`}
                  >
                    {locale.toUpperCase()}
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
}
