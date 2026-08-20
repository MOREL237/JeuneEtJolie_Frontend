'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function KPICards() {
  const { t } = useTranslation();

  const kpiData = [
    {
      icon: 'shopping_basket',
      iconColor: 'text-primary bg-primary/10',
      badge: '+2 ' + t('dashboard.kpi.thisMonth'),
      badgeColor: 'text-green-500 bg-green-500/10',
      labelKey: 'dashboard.kpi.totalOrders',
      value: '12',
    },
    {
      icon: 'pending_actions',
      iconColor: 'text-tertiary-container bg-tertiary-container/10',
      labelKey: 'dashboard.kpi.inProgress',
      value: '01',
    },
    {
      icon: 'military_tech',
      iconColor: 'text-primary bg-primary/10',
      iconFill: true,
      labelKey: 'dashboard.kpi.loyaltyPoints',
      value: '2,450',
    },
    {
      icon: 'account_balance_wallet',
      iconColor: 'text-primary bg-primary/10',
      labelKey: 'dashboard.kpi.totalSpent',
      value: '1 240 000 FCFA',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
      {kpiData.map((kpi, index) => (
        <div 
          key={index}
          className="bg-surface p-5 md:p-6 rounded-2xl shadow-sm border border-outline-variant hover:shadow-md transition-shadow overflow-hidden min-w-0"
        >
          <div className="flex items-center justify-between mb-4 gap-2">
            <span className={`material-symbols-outlined p-2 rounded-lg shrink-0 ${kpi.iconColor}`} style={kpi.iconFill ? { fontVariationSettings: "'FILL' 1" } : undefined}>
              {kpi.icon}
            </span>
            {kpi.badge && (
              <span className={`text-xs font-bold px-2 py-1 rounded shrink-0 ${kpi.badgeColor}`}>
                {kpi.badge}
              </span>
            )}
          </div>
          <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mb-1 truncate">
            {t(kpi.labelKey)}
          </p>
          <h4 className="text-xl md:text-2xl font-black truncate">{kpi.value}</h4>
        </div>
      ))}
    </div>
  );
}
