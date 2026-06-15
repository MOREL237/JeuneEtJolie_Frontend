// providers/I18nProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { type Locale } from '@/lib/i18n/config';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const rtlLocales: Locale[] = []; // Ajoute 'ar' si tu supportes l'arabe

export function I18nProvider({ 
  children, 
  initialLocale 
}: { 
  children: ReactNode; 
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Optionnel : persister dans localStorage
    localStorage.setItem('locale', newLocale);
    
    // Optionnel : recharger la page pour charger le bon dictionnaire
    // window.location.href = `/${newLocale}${window.location.pathname.replace(/^\/[a-z]{2}/, '')}`;
  };

  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  
  return context;
}