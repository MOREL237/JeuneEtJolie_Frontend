'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function TopNavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || 'fr';

  const navLinks = [
    { label: 'Nouveautés', href: `/${lang}`, exact: true },
    { label: 'Collections', href: `/${lang}/collaboration`, exact: false },
    { label: 'Prêt-à-porter', href: `/${lang}/catalogue`, exact: false },
    { label: 'Accessoires', href: `/${lang}/accessoires`, exact: false },
    { label: 'Soldes', href: '#', exact: false },
  ];

  // Fonction pour vérifier si le lien est actif
  const isActive = (link: typeof navLinks[0]) => {
    if (link.exact) {
      return pathname === link.href;
    }
    // Pour Prêt-à-porter, inclure aussi les pages produit
    if (link.href === `/${lang}/catalogue`) {
      return pathname.startsWith(`/${lang}/catalogue`) || pathname.startsWith(`/${lang}/produit`);
    }
    return pathname.startsWith(link.href) && link.href !== '#';
  };

  // Vérifier si on est sur la page panier
  const isPanierActive = pathname === `/${lang}/panier`;
  // Vérifier si on est sur dashboard
  const isDashboardActive = pathname.startsWith(`/${lang}/dashboard`);
  // Vérifier si on est spécifiquement sur wishlist
  const isWishlistActive = pathname === `/${lang}/dashboard/wishlist`;

  return (
    <header className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 flex flex-col w-full gap-4 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Brand Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-3 lg:gap-4">
            <img 
              alt="Jeune & Jolie Logo" 
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARewl4SasxSccFsxf1mBD_CpnMKjZSkSqAuiFYwWvmXbgIrezbZWQyWUpI0qajGiThBUMldvzOt5jkq9-29i9m7E3Jn-1_xHW-pWmZ1xtV5Ye128Jm-QMBTFS6GB-lGQPVTxsksELDmgffc8UIYZXYChaQ1N0Rgmg2f4zzA7knNS76FoaJushnux5bJboD93auWOrQo8dXiubwim6qa2qDz-Y3_q2ENJj51TJ_gUmV3tx0NP-Jtl66IJwxmld0JL3hEtlhtzroG7w"
            />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white italic font-headline-lg">
              Jeune & Jolie
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 font-noto-serif text-sm tracking-wide uppercase">
            {navLinks.map((link) => (
              <Link 
                key={link.label}
                className={`pb-1 transition-all duration-300 ${
                  isActive(link)
                    ? 'text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400'
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Utility Icons */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Favoris/Wishlist - redirige vers dashboard */}
            <Link href={`/${lang}/dashboard`} className="relative" title="Mes favoris">
              <span 
                className={`material-symbols-outlined cursor-pointer transition-all ${
                  isWishlistActive
                    ? 'text-pink-600 dark:text-pink-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 hover:scale-110'
                }`}
                style={isWishlistActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
            </Link>

            {/* Panier */}
            <Link href={`/${lang}/panier`} className="relative" title="Mon panier">
              <span 
                className={`material-symbols-outlined cursor-pointer transition-all ${
                  isPanierActive 
                    ? 'text-pink-600 dark:text-pink-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 hover:scale-110'
                }`}
                style={isPanierActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                shopping_bag
              </span>
              <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </Link>

            {/* Account - Desktop only */}
            <Link href={`/${lang}/dashboard`} className="hidden md:inline-block" title="Mon compte">
              <span 
                className={`material-symbols-outlined cursor-pointer transition-all ${
                  isDashboardActive 
                    ? 'text-pink-600 dark:text-pink-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 hover:scale-110'
                }`}
                style={isDashboardActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                account_circle
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-slate-900 dark:text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden flex flex-col gap-4 pb-4 border-t border-slate-100 dark:border-slate-800 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-noto-serif text-sm tracking-wide uppercase py-2 transition-colors ${
                  isActive(link)
                    ? 'text-pink-600 dark:text-pink-400 font-bold' 
                    : 'text-slate-600 dark:text-slate-400'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile-only links */}
            <Link
              href={`/${lang}/dashboard`}
              className={`font-noto-serif text-sm tracking-wide uppercase py-2 transition-colors md:hidden ${
                pathname === `/${lang}/dashboard`
                  ? 'text-pink-600 dark:text-pink-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Mon Compte
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
