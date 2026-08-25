'use client';

import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import ShippingOption from './ShippingOption';

export default function ShippingSection() {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';

  const shippingOptions = [
    {
      id: 'standard',
      name: isEnglish ? t('checkout.standardDelivery') : t('checkout.standardDelivery'),
      description: isEnglish ? t('checkout.standardDeliveryDesc') : t('checkout.standardDeliveryDesc'),
      price: '3 000 FCFA',
      isSelected: true,
    },
    {
      id: 'express',
      name: isEnglish ? t('checkout.expressDelivery') : t('checkout.expressDelivery'),
      description: isEnglish ? t('checkout.expressDeliveryDesc') : t('checkout.expressDeliveryDesc'),
      price: '7 000 FCFA',
      isSelected: false,
    },
  ];

  const deliveryModeTitle = isEnglish ? t('checkout.deliveryModeTitle') : t('checkout.deliveryModeTitle');

  return (
    <section className="bg-surface-container-lowest p-5 md:p-6 lg:p-8 rounded-xl shadow-sm">
      <h2 className="font-headline-md text-xl md:text-2xl text-on-surface mb-6 md:mb-8">
        {deliveryModeTitle}
      </h2>
      <div className="space-y-3 md:space-y-4">
        {shippingOptions.map((option) => (
          <ShippingOption key={option.id} {...option} />
        ))}
      </div>
    </section>
  );
}
