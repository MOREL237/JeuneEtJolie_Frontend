// components/layout/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { SearchBar } from '../ui/Input';
import { ThemeToggle } from '../ui/ThemeToggle';
import { i18n, type Locale } from '@/lib/i18n/config';

interface NavbarProps {
  lang: Locale;
  dict: {
    navbar: {
      newArrivals: string;
      collections: string;
      readyToWear: string;
      accessories: string;
      sales: string;
      search: string;
      favorites: string;
      cart: string;
      account: string;
    };
  };
}

export const Navbar = ({ lang, dict }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: dict.navbar.newArrivals, href: `/${lang}` },
    { label: dict.navbar.collections, href: `/${lang}/collections` },
    { label: dict.navbar.readyToWear, href: `/${lang}/ready-to-wear` },
    { label: dict.navbar.accessories, href: `/${lang}/accessories` },
    { label: dict.navbar.sales, href: `/${lang}/sales` },
  ];

  const switchLang = lang === 'fr' ? 'en' : 'fr';
  const newPath = pathname.replace(`/${lang}`, `/${switchLang}`);

  return (
    <header className="bg-white/95 dark:bg-surface/95 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-20 flex flex-col w-full gap-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-3">
            <span className="text-2xl lg:text-3xl font-black text-on-surface italic font-serif">
              Jeune & Jolie
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-serif text-sm tracking-wide uppercase pb-1 transition-colors ${
                  pathname === link.href
                    ? 'text-primary border-b-2 border-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <SearchBar placeholder={dict.navbar.search} className="w-64" />
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeToggle />
              
              <Link href={`/${lang}/favorites`}>
                <IconButton icon="heart" variant="ghost" size="md" label={dict.navbar.favorites} />
              </Link>
              
              <Link href={`/${lang}/cart`} className="relative">
                <IconButton icon="cart" variant="ghost" size="md" label={dict.navbar.cart} />
                <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </Link>
              
              <Link href={`/${lang}/account`}>
                <IconButton icon="user" variant="ghost" size="md" label={dict.navbar.account} />
              </Link>

              {/* Language Switcher */}
              <Link
                href={newPath}
                className="w-10 h-10 rounded-full flex items-center justify-center text-label-md font-bold text-on-surface hover:bg-surface-container-high transition-colors"
              >
                {switchLang.toUpperCase()}
              </Link>

              <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden flex flex-col gap-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-serif text-sm tracking-wide uppercase py-2 ${
                  pathname === link.href ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="md:hidden mt-2">
              <SearchBar placeholder={dict.navbar.search} />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;