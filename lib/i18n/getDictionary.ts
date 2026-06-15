import 'server-only';
import { i18n, type Locale } from './config';

const dictionaries = {
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
} as const;

export const getDictionary = async (locale: Locale) => {
  const loadDictionary = dictionaries[locale];
  
  if (!loadDictionary) {
    console.warn(`[i18n] Locale "${locale}" not found, falling back to "${i18n.defaultLocale}"`);
    return dictionaries[i18n.defaultLocale]();
  }
  
  return loadDictionary();
};