'use client';

import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

const savedAddresses = [
  {
    id: '1',
    name: 'Domicile',
    address: '12 Rue des Acacias',
    city: 'Dakar',
    postalCode: '10200',
    country: 'Sénégal',
    phone: '+221 77 123 45 67',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Bureau',
    address: '45 Avenue Léopold Sédar Senghor',
    city: 'Dakar',
    postalCode: '10100',
    country: 'Sénégal',
    phone: '+221 77 987 65 43',
    isDefault: false,
  },
];

export default function AdressesPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background font-body-md text-on-surface">
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen overflow-hidden">
        <DashboardSidebar />
        
        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-surface-container-low/40 min-w-0">
          <header className="mb-8 md:mb-10 flex justify-between items-center">
            <div>
              <h2 className="font-headline-lg text-2xl md:text-3xl mb-2">{t('dashboard.addresses.title')}</h2>
              <p className="text-sm md:text-base text-on-surface-variant">
                {t('dashboard.addresses.subtitle')}
              </p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span>
              {t('dashboard.addresses.addNew')}
            </button>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {savedAddresses.map((address) => (
              <div key={address.id} className="bg-surface p-5 md:p-6 rounded-2xl shadow-sm border border-outline-variant">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{address.name}</h3>
                    {address.isDefault && (
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                        {t('dashboard.addresses.default')}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <button 
                      title={t('common.edit') || 'Modifier'}
                      className="w-8 h-8 rounded-full flex items-center justify-center
                                 text-on-surface-variant/60 hover:text-primary hover:bg-primary/10
                                 transition-all duration-200"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button 
                      title={t('common.delete') || 'Supprimer'}
                      className="w-8 h-8 rounded-full flex items-center justify-center
                                 text-on-surface-variant/60 hover:text-error hover:bg-error/10
                                 transition-all duration-200"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
                <div className="text-sm text-on-surface-variant space-y-1">
                  <p>{address.address}</p>
                  <p>{address.city} {address.postalCode}</p>
                  <p>{address.country}</p>
                  <p className="pt-2 font-medium">{address.phone}</p>
                </div>
                {!address.isDefault && (
                  <button className="mt-4 text-primary text-sm font-bold hover:underline">
                    {t('dashboard.addresses.setDefault')}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
