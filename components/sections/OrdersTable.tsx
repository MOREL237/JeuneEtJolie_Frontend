'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

const orders = [
  { id: '#JJ-9283', date: '14 Oct 2024', statusKey: 'onTheWay', statusColor: 'bg-primary/10 text-primary', amount: '185 000 FCFA' },
  { id: '#JJ-8842', date: '28 Sep 2024', statusKey: 'delivered', statusColor: 'bg-green-500/10 text-green-500', amount: '320 000 FCFA' },
  { id: '#JJ-7521', date: '12 Aoû 2024', statusKey: 'delivered', statusColor: 'bg-green-500/10 text-green-500', amount: '95 000 FCFA' },
];

export default function OrdersTable() {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
      <div className="p-6 border-b border-outline-variant/50 flex justify-between items-center">
        <h3 className="font-headline-md text-xl">{t('dashboard.orders.title')}</h3>
        <Link className="text-sm font-bold text-primary hover:underline" href={`/${lang}/dashboard/commandes`}>{t('common.viewAll')}</Link>
      </div>
      
      <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[520px]">
        <thead className="bg-surface-container-low/50">
          <tr className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">
            <th className="px-6 py-4">{t('dashboard.orders.orderNumber')}</th>
            <th className="px-6 py-4">{t('dashboard.orders.date')}</th>
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
              <td className="px-6 py-4">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.statusColor}`}>
                  {t(`dashboard.orders.${order.statusKey}`)}
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
    </div>
  );
}
