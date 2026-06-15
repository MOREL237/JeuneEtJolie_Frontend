// hooks/useTranslation.ts
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type Locale } from '@/lib/i18n/config';

type Dictionary = Record<string, any>;

export function useTranslation() {
  const params = useParams();
  const lang = (params?.lang as Locale) || 'fr';
  const [dict, setDict] = useState<Dictionary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await import(`@/lib/i18n/dictionaries/${lang}.json`);
        setDict(dictionary.default);
      } catch (error) {
        console.error(`Failed to load dictionary for ${lang}:`, error);
        // Fallback to fr
        const fallback = await import('@/lib/i18n/dictionaries/fr.json');
        setDict(fallback.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadDictionary();
  }, [lang]);

  const t = (key: string): string => {
    if (!dict) return key;
    
    const keys = key.split('.');
    let value: any = dict;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, lang, isLoading };
}