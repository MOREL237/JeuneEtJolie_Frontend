import 'server-only';
import { i18n, type Locale } from './config';
import type en from './dictionaries/en.json';

type Dictionary = typeof en;

const dictionaries = {
  fr: () => import('./dictionaries/fr.json').then((module) => module.default as Dictionary),
  en: () => import('./dictionaries/en.json').then((module) => module.default as Dictionary),
} as const;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loadDictionary = dictionaries[locale];
  
  if (!loadDictionary) {
    console.warn(`[i18n] Locale "${locale}" not found, falling back to "${i18n.defaultLocale}"`);
    return dictionaries[i18n.defaultLocale]();
  }
  
  return loadDictionary();
};