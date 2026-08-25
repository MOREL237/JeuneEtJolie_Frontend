'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import PaymentTabs from './PaymentTabs';

export default function PaymentSection() {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'cash' | 'om'>('card');

  const paymentTitle = isEnglish ? t('checkout.paymentTitle') : t('checkout.paymentTitle');

  return (
    <section className="bg-surface-container-lowest p-5 md:p-6 lg:p-8 rounded-xl shadow-sm">
      <h2 className="font-headline-md text-xl md:text-2xl text-on-surface mb-6 md:mb-8">
        {paymentTitle}
      </h2>
      <PaymentTabs activeTab={paymentMethod} onTabChange={setPaymentMethod} />
    </section>
  );
}