'use client';

import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import KPICards from '@/components/sections/KPICards';
import OrderTracking from '@/components/sections/OrderTracking';
import OrdersTable from '@/components/sections/OrdersTable';
import WishlistPreview from '@/components/sections/WishlistPreview';
import LoyaltyPromoCard from '@/components/sections/LoyaltyPromoCard';
import Footer from '@/components/layout/Footer';
import PromoBanner from '@/components/layout/PromoBanner';
import { useTranslation } from '@/hooks/useTranslation';

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <PromoBanner />
      <TopNavBar />

      <main
        id="main-content"
        className="max-w-[1440px] mx-auto flex flex-col lg:flex-row overflow-hidden min-w-0"
      >
        <DashboardSidebar />

        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-surface-container-low/40 min-w-0">

          {/* En-tête */}
          <header className="mb-8 md:mb-10">
            <p
              className="text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-gold mb-2"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {t('dashboard.memberSpace')}
            </p>
            <h2
              className="text-on-surface mb-1"
              style={{
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              {t('dashboard.welcome')}, Aminata
            </h2>
            <p className="text-sm text-on-surface/50">
              {t('dashboard.welcomeMessage')}
            </p>
          </header>

          {/* KPIs */}
          <div className="mb-8 md:mb-10">
            <KPICards />
          </div>

          {/* Contenu principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
              <OrderTracking />
              <OrdersTable />
            </div>
            <div className="flex flex-col gap-6 md:gap-8">
              <WishlistPreview />
              <LoyaltyPromoCard />
            </div>
          </div>
        </section>
      </main>

      <Footer variant="dashboard" />
    </div>
  );
}
