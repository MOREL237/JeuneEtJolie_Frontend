'use client';

import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import SavedAddressCard from './SavedAddressCard';
import NewAddressForm from './NewAddressForm';

export default function AddressSection() {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';

  const shippingAddressTitle = isEnglish ? t('checkout.shippingAddressTitle') : t('checkout.shippingAddressTitle');
  const editLabel = isEnglish ? 'Edit' : 'Modifier';
  const newAddressLabel = isEnglish ? t('checkout.addNewAddress') : t('checkout.addNewAddress');

  return (
    <section className="bg-surface-container-lowest p-5 md:p-6 lg:p-8 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 mb-6 md:mb-8">
        <h2 className="font-headline-md text-xl md:text-2xl text-on-surface">
          {shippingAddressTitle}
        </h2>
        <button className="text-primary text-sm md:text-base font-label-md hover:underline decoration-secondary">
          {editLabel}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <SavedAddressCard 
          name="Aminata Diallo (Maison)"
          address="Rue de l'Indépendance, Villa 45"
          city="Dakar, Sénégal"
          phone="+221 77 123 45 67"
          isSelected={true}
        />
        <div className="p-5 md:p-6 rounded-lg border-2 border-outline-variant border-dashed flex flex-col items-center justify-center text-outline transition-colors hover:border-primary group cursor-pointer min-h-[160px]">
          <span className="material-symbols-outlined text-3xl md:text-4xl mb-2 group-hover:text-primary">
            add_location
          </span>
          <span className="font-label-md text-sm md:text-base">{newAddressLabel}</span>
        </div>
      </div>
      
      <NewAddressForm />
    </section>
  );
}