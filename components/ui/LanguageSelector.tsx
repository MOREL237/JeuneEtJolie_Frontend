// components/ui/LanguageSelector.tsx
'use client';

import { useParams } from 'next/navigation';
import { i18n } from '@/lib/i18n/config';

interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector = ({ className = '' }: LanguageSelectorProps) => {
  const params = useParams();
  const lang = (params?.lang as string) || i18n.defaultLocale;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const currentPath = window.location.pathname;
    
    // Extraire la langue actuelle et construire la nouvelle URL
    const pathWithoutLang = currentPath.replace(/^\/(fr|en)/, '');
    const newPath = `/${newLang}${pathWithoutLang || '/'}`;
    
    // Rediriger vers la nouvelle URL
    window.location.href = newPath;
  };

  return (
    <select 
      value={lang}
      onChange={handleLanguageChange}
      className={`bg-transparent text-sm text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 cursor-pointer rounded min-h-[44px] px-2 ${className}`}
      aria-label="Language selector / Sélecteur de langue"
    >
      {i18n.locales.map((locale) => (
        <option key={locale} value={locale} className="bg-white dark:bg-slate-800">
          {locale === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;