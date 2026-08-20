'use client';

import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import { useTranslation } from '@/hooks/useTranslation';

export default function ParametresPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-background font-body-md text-on-surface">
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen overflow-hidden">
        <DashboardSidebar />
        
        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-surface-container-low/40 min-w-0">
          <header className="mb-8 md:mb-10">
            <h2 className="font-headline-lg text-2xl md:text-3xl mb-2">{t('dashboard.settings.title')}</h2>
            <p className="text-sm md:text-base text-on-surface-variant">
              {t('dashboard.settings.subtitle')}
            </p>
          </header>
          
          <div className="space-y-6 md:space-y-8">
            {/* Informations personnelles */}
            <div className="bg-surface p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant">
              <h3 className="font-headline-md text-xl mb-6">{t('dashboard.settings.personalInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">{t('dashboard.settings.firstName')}</label>
                  <input 
                    type="text" 
                    defaultValue="Aminata" 
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">{t('dashboard.settings.lastName')}</label>
                  <input 
                    type="text" 
                    defaultValue="Traoré" 
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">{t('dashboard.settings.email')}</label>
                  <input 
                    type="email" 
                    defaultValue="aminata.traore@example.com" 
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">{t('dashboard.settings.phone')}</label>
                  <input 
                    type="tel" 
                    defaultValue="+221 77 123 45 67" 
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low text-on-surface"
                  />
                </div>
              </div>
              <button className="btn-primary mt-6">
                {t('dashboard.settings.saveChanges')}
              </button>
            </div>

            {/* Mot de passe */}
            <div className="bg-surface p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant">
              <h3 className="font-headline-md text-xl mb-6">{t('dashboard.settings.changePassword')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">{t('dashboard.settings.currentPassword')}</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">{t('dashboard.settings.newPassword')}</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-2">{t('dashboard.settings.confirmPassword')}</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface-container-low text-on-surface"
                  />
                </div>
              </div>
              <button className="btn-primary mt-6">
                {t('dashboard.settings.changePassword')}
              </button>
            </div>

            {/* Préférences */}
            <div className="bg-surface p-6 md:p-8 rounded-2xl shadow-sm border border-outline-variant">
              <h3 className="font-headline-md text-xl mb-6">{t('dashboard.settings.preferences')}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-on-surface">{t('dashboard.settings.newsletter')}</h4>
                    <p className="text-sm text-on-surface-variant">{t('dashboard.settings.newsletterDesc')}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-on-surface">{t('dashboard.settings.emailNotifications')}</h4>
                    <p className="text-sm text-on-surface-variant">{t('dashboard.settings.emailNotificationsDesc')}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-primary rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-on-surface">{t('dashboard.settings.smsNotifications')}</h4>
                    <p className="text-sm text-on-surface-variant">{t('dashboard.settings.smsNotificationsDesc')}</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-primary rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
