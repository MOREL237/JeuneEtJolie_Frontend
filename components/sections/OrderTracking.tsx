'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function OrderTracking() {
  const { t } = useTranslation();

  const trackingSteps = [
    { icon: 'check', label: t('dashboard.orders.processing'), date: '12 Oct', isCompleted: true, isActive: false },
    { icon: 'inventory_2', label: t('dashboard.orders.prepared') || 'Préparée', date: '13 Oct', isCompleted: true, isActive: false },
    { icon: 'local_shipping', label: t('dashboard.orders.onTheWay'), date: '14 Oct', isCompleted: true, isActive: true },
    { icon: 'home', label: t('dashboard.orders.delivered'), date: 'Est. 16 Oct', isCompleted: false, isActive: false },
  ];

  return (
    <div className="bg-surface p-8 rounded-2xl shadow-sm border border-outline-variant">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h3 className="font-headline-md text-xl">{t('dashboard.orders.orderTrackingTitle') || 'Suivi commande #JJ-9283'}</h3>
        <span className="text-xs bg-primary text-on-primary px-3 py-1 rounded-full">{t('dashboard.orders.onTheWay')}</span>
      </div>
      
      <div className="relative overflow-x-auto pb-4">
        <div className="relative flex justify-between items-start min-w-max px-4">
          <div className="absolute top-5 left-0 w-full h-[2px] bg-outline-variant -z-0"></div>
          
          {trackingSteps.map((step, index) => (
            <div key={index} className={`relative z-10 flex flex-col items-center gap-2 min-w-[72px] ${!step.isCompleted && !step.isActive ? 'opacity-40' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step.isCompleted || step.isActive 
                ? 'bg-primary text-on-primary' 
                : 'bg-surface-container-high text-on-surface/60'
            } ${step.isActive ? 'ring-4 ring-primary/20' : ''}`}>
              <span className="material-symbols-outlined text-sm" style={step.isCompleted ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                {step.icon}
              </span>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase">{step.label}</p>
              <p className="text-[10px] text-on-surface-variant/60">{step.date}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
