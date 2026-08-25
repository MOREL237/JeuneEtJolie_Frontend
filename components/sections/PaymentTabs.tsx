'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import CreditCardForm from './CreditCardForm';

interface PaymentTabsProps {
  activeTab?: 'card' | 'mobile' | 'cash' | 'om';
  onTabChange?: (tab: 'card' | 'mobile' | 'cash' | 'om') => void;
}

export default function PaymentTabs({ activeTab = 'card', onTabChange }: PaymentTabsProps) {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';
  const [selected, setSelected] = useState<'card' | 'mobile' | 'cash' | 'om'>(activeTab);

  const tabs = [
    { id: 'card', label: isEnglish ? 'Credit Card' : 'Carte Bancaire' },
    { id: 'mobile', label: 'Mobile Money' },
    { id: 'om', label: 'Orange Money' },
    { id: 'cash', label: isEnglish ? t('checkout.paymentAtDelivery') : t('checkout.paymentAtDelivery') },
  ];

  const paymentAtDeliveryDesc = isEnglish ? t('checkout.paymentAtDeliveryDesc') : t('checkout.paymentAtDeliveryDesc');

  const handleTabChange = (tabId: any) => {
    setSelected(tabId);
    onTabChange?.(tabId);
  };

  return (
    <>
      <div className="flex border-b border-outline-variant mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-8 py-4 border-b-2 whitespace-nowrap transition-colors ${
              tab.id === selected 
                ? 'border-primary text-primary font-bold' 
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Display form only for card payments */}
      {(selected === 'card' || selected === 'mobile' || selected === 'om') && (
        <CreditCardForm paymentMethod={selected} />
      )}

      {/* Message for payment on delivery */}
      {selected === 'cash' && (
        <div className="bg-surface-container p-6 rounded-lg border border-outline-variant">
          <p className="text-on-surface">{paymentAtDeliveryDesc}</p>
        </div>
      )}
    </>
  );
}