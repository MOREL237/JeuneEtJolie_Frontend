import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import KPICards from '@/components/sections/KPICards';
import OrderTracking from '@/components/sections/OrderTracking';
import OrdersTable from '@/components/sections/OrdersTable';
import WishlistPreview from '@/components/sections/WishlistPreview';
import LoyaltyPromoCard from '@/components/sections/LoyaltyPromoCard';
import Footer from '@/components/layout/Footer';

export default function DashboardPage() {
  return (
    <div className="bg-background font-body-md text-on-surface">
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
        <DashboardSidebar />
        
        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-slate-50/30">
          <header className="mb-8 md:mb-10">
            <h2 className="font-headline-lg text-2xl md:text-3xl mb-2">Bonjour, Aminata</h2>
            <p className="text-sm md:text-base text-slate-500">Bienvenue dans votre espace privilégié Jeune & Jolie.</p>
          </header>
          
          <div className="mb-8 md:mb-10">
            <KPICards />
          </div>
          
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
      
      <Footer />
    </div>
  );
}