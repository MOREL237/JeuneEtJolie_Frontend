// components/providers/I18nProvider.tsx
//
// Provider i18n avec navigation réelle vers la bonne locale.
// setLocale() redirige vers /<newLocale><currentPath> au lieu de
// juste mettre à jour l'état local (qui ne rechargeait pas le dictionnaire).

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type Locale, i18n } from '@/lib/i18n/config';

interface I18nContextType {
  locale: Locale;
  /** Change de locale et navigue vers la page équivalente */
  setLocale: (locale: Locale) => void;
  /** Direction du texte (ltr / rtl) */
  dir: 'ltr' | 'rtl';
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/* Locales RTL à ajouter si Arabic / Hebrew sont supportés plus tard */
const RTL_LOCALES: Locale[] = [];

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router   = useRouter();
  const pathname = usePathname();

  /* Synchronise lang + dir sur <html> à chaque changement */
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir  = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  /**
   * Navigue vers la même page dans la nouvelle locale.
   * Ex : /fr/catalogue → /en/catalogue
   */
  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;

      // Retire la locale courante du début du chemin
      const pathWithoutLocale = pathname.replace(
        new RegExp(`^\\/(${i18n.locales.join('|')})`),
        ''
      );
      const newPath = `/${newLocale}${pathWithoutLocale || '/'}`;

      setLocaleState(newLocale);
      localStorage.setItem('jj-locale', newLocale);
      router.push(newPath);
    },
    [locale, pathname, router]
  );

  const dir: 'ltr' | 'rtl' = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  return (
    <I18nContext.Provider value={{ locale, setLocale, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within <I18nProvider>');
  return ctx;
}
