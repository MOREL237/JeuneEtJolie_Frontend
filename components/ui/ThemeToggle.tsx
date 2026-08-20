// components/ui/ThemeToggle.tsx
//
// Bouton bascule thème — lit UNIQUEMENT useTheme() (plus de useState local).
// Affiche un skeleton neutre jusqu'au montage pour éviter le flash.

'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme, mounted } = useTheme();

  /* Placeholder invisible pendant l'hydratation (évite le layout shift) */
  if (!mounted) {
    return <div className={`w-10 h-10 ${className}`} aria-hidden="true" />;
  }

  const label = theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair';

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`
        inline-flex items-center justify-center
        w-10 h-10 min-w-[44px] min-h-[44px]
        rounded-full
        text-on-surface/70 hover:text-primary
        hover:bg-surface-container
        transition-colors duration-200
        focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2
        ${className}
      `}
    >
      {theme === 'light' ? (
        <Moon size={18} strokeWidth={1.75} />
      ) : (
        <Sun size={18} strokeWidth={1.75} />
      )}
    </button>
  );
};

export default ThemeToggle;
