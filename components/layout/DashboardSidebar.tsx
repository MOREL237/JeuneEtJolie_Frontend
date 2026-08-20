'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, MapPin, Heart, Settings, LogOut,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const NAV_SEGMENTS = [
  { icon: LayoutDashboard, key: 'dashboard',   segment: 'dashboard'   },
  { icon: Package,         key: 'orders',       segment: 'commandes'   },
  { icon: MapPin,          key: 'addresses',    segment: 'adresses'    },
  { icon: Heart,           key: 'wishlist',     segment: 'wishlist'    },
  { icon: Settings,        key: 'settings',     segment: 'parametres'  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const params   = useParams();
  const lang     = (params?.lang as string) || 'fr';
  const { t }    = useTranslation();

  const isActive = (segment: string) => {
    const href = `/${lang}/dashboard${segment === 'dashboard' ? '' : `/${segment}`}`;
    return segment === 'dashboard'
      ? pathname === href
      : pathname.startsWith(href);
  };

  return (
    <aside className="
      w-full lg:w-72 shrink-0
      border-b lg:border-b-0 lg:border-r border-outline-variant/20
      py-6 md:py-8 lg:py-10
      px-5 md:px-6 lg:px-8
      flex flex-col gap-8 lg:gap-10
      bg-surface
    ">
      {/* Profil */}
      <div className="flex flex-row lg:flex-col items-center lg:text-center gap-4">
        <div className="w-16 h-16 lg:w-20 lg:h-20 shrink-0 rounded-full overflow-hidden
                        border-2 border-primary ring-4 ring-primary/10">
          <img
            alt="Aminata Traoré"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200"
          />
        </div>
        <div>
          <h3
            className="text-lg font-semibold text-on-surface"
            style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
          >
            Aminata Traoré
          </h3>
          <p
            className="text-xs text-on-surface/45 mt-0.5"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {t('dashboard.goldMemberSince')} 2023
          </p>
          {/* Badge fidélité */}
          <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full
                           bg-gold/10 text-gold text-[10px] font-bold tracking-wide">
            ✦ GOLD
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible
                      scrollbar-hide pb-1 lg:pb-0">
        {NAV_SEGMENTS.map(({ icon: Icon, key, segment }) => {
          const active = isActive(segment);
          const href   = `/${lang}/dashboard${segment === 'dashboard' ? '' : `/${segment}`}`;
          return (
            <Link
              key={segment}
              href={href}
              className={`
                flex items-center gap-3 py-2.5 px-4 rounded-xl
                whitespace-nowrap lg:whitespace-normal
                transition-all duration-200 shrink-0 lg:shrink
                text-xs tracking-wider uppercase
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                ${active
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-on-surface/60 hover:bg-surface-container hover:text-on-surface'
                }
              `}
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={16} strokeWidth={active ? 2 : 1.75} className="shrink-0" />
              {t(`dashboard.nav.${key}`)}
            </Link>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="mt-auto pt-6 lg:pt-8 border-t border-outline-variant/20 hidden lg:block">
        <button
          className="w-full py-2.5 px-4 rounded-xl border border-outline-variant/40
                     text-on-surface/50 text-xs tracking-wider uppercase
                     hover:border-primary hover:text-primary hover:bg-primary/5
                     transition-all duration-200 flex items-center justify-center gap-2"
          style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
        >
          <LogOut size={14} strokeWidth={1.75} />
          {t('dashboard.nav.logout')}
        </button>
      </div>
    </aside>
  );
}
