// components/ui/ThemeToggle.tsx
'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-surface-container-high"
      aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-on-surface" />
      ) : (
        <Sun className="w-5 h-5 text-on-surface" />
      )}
    </button>
  );
};

export default ThemeToggle;