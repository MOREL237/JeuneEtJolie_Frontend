'use client';

import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

export default function NewAddressForm() {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';

  const placeholders = {
    fullName: isEnglish ? 'Full Name' : 'Nom Complet',
    phone: isEnglish ? 'Phone' : 'Téléphone',
    street: isEnglish ? 'Street and number' : 'Rue et numéro',
    city: isEnglish ? 'City' : 'Ville',
  };

  return (
    <div className="mt-6 md:mt-8 space-y-4 md:space-y-5">
      <h3 className="font-label-md text-xs md:text-sm text-on-surface-variant uppercase mb-4">
        {t('checkout.addNewAddress')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <input 
          className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
          placeholder={placeholders.fullName}
          type="text"
        />
        <input 
          className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
          placeholder={placeholders.phone}
          type="tel"
        />
        <input 
          className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all md:col-span-2" 
          placeholder={placeholders.street}
          type="text"
        />
        <input 
          className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
          placeholder={placeholders.city}
          type="text"
        />
        <select className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer">
          <option>Sénégal</option>
          <option>Côte d'Ivoire</option>
          <option>Cameroun</option>
          <option>France</option>
        </select>
      </div>
    </div>
  );
}