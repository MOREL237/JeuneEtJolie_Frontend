'use client';

import { useParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { LookCard } from './LookCard';

export const LooksSection = () => {
  const { t } = useTranslation();
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const isEnglish = lang === 'en';

  const looks = [
    {
      id: '1',
      number: '1',
      title: isEnglish ? t('looksSection.looks.look1') : t('looksSection.looks.look1'),
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
    },
    {
      id: '2',
      number: '2',
      title: isEnglish ? t('looksSection.looks.look2') : t('looksSection.looks.look2'),
      image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&h=800&fit=crop',
    },
    {
      id: '3',
      number: '3',
      title: isEnglish ? t('looksSection.looks.look3') : t('looksSection.looks.look3'),
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
    },
  ];

  return (
    <section className="bg-surface-container-low/30 py-12 md:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-4">
            {t('looksSection.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {looks.map((look) => (
            <LookCard key={look.id} {...look} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LooksSection;