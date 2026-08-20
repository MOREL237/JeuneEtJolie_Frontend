'use client';

import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

const orders = [
  { 
    id: '#JJ-9283', 
    date: '14 Oct 2024', 
    status: 'onTheWay', 
    statusColor: 'bg-primary/10 text-primary', 
    amount: '185 000 FCFA',
    items: 3
  },
  { 
    id: '#JJ-8842', 
    date: '28 Sep 2024', 
    status: 'delivered', 
    statusColor: 'bg-green-500/10 text-green-500', 
    amount: '320 000 FCFA',
    items: 5
  },
  { 
    id: '#JJ-7521', 
    date: '12 Aoû 2024', 
    status: 'delivered', 
    statusColor: 'bg-green-500/10 text-green-500', 
    amount: '95 000 FCFA',
    items: 2
  },
  { 
    id: '#JJ-6842', 
    date: '05 Juil 2024', 
    status: 'cancelled', 
    statusColor: 'bg-error/10 text-error', 
    amount: '210 000 FCFA',
    items: 4
  },
  { 
    id: '#JJ-5734', 
    date: '22 Juin 2024', 
    status: 'delivered', 
    statusColor: 'bg-green-500/10 text-green-500', 
    amount: '145 000 FCFA',
    items: 2
  },
];

export default function CommandesPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background font-body-md text-on-surface">
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen overflow-hidden">
        <DashboardSidebar />
        
        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-surface-container-low/40 min-w-0">
          <header className="mb-8 md:mb-10">
            <h2 className="font-headline-lg text-2xl md:text-3xl mb-2">{t('dashboard.orders.title')}</h2>
            <p className="text-sm md:text-base text-on-surface-variant">
              {t('dashboard.orders.orderCount').replace('{count}', String(orders.length))}
            </p>
          </header>
          
          <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant overflow-x-auto">
            <table className="w-full text-left min-w-[620px]">
              <thead className="bg-surface-container-low/50">
                <tr className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">
                  <th className="px-6 py-4">{t('dashboard.orders.orderNumber')}</th>
                  <th className="px-6 py-4">{t('dashboard.orders.date')}</th>
                  <th className="px-6 py-4">{t('dashboard.orders.articles')}</th>
                  <th className="px-6 py-4">{t('dashboard.orders.status')}</th>
                  <th className="px-6 py-4">{t('dashboard.orders.amount')}</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50">
                {orders.map((order) => (
                  <tr key={order.id} className="text-sm hover:bg-surface-container-low/30 transition-colors">
                    <td className="px-6 py-4 font-bold">{order.id}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{order.date}</td>
                    <td className="px-6 py-4 text-on-surface-variant">{order.items}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.statusColor}`}>
                        {t(`dashboard.orders.${order.status}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">{order.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary transition-colors">
                        visibility
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
