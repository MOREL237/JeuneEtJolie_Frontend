// components/providers/ThemeProvider.tsx
//
// Source unique de vérité pour le thème (light / dark).
// ThemeToggle et tout autre consommateur lisent UNIQUEMENT ce contexte
// — plus de useState local dupliqué ailleurs.

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  /** Thème actif */
  theme: Theme;
  /** Bascule light ↔ dark */
  toggleTheme: () => void;
  /** true une fois le thème initial chargé (évite le flash côté client) */
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/* ----------------------------------------------------------------
 * Script injecté avant le premier rendu React pour éviter le FOUC
 * (Flash Of Unstyled Content / mauvais thème).
 * Exécuté inline dans <head> via dangerouslySetInnerHTML.
 * ---------------------------------------------------------------- */
const ANTI_FOUC_SCRIPT = `
(function () {
  try {
    var saved = localStorage.getItem('jj-theme');
    var sys   = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = saved || sys;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: ANTI_FOUC_SCRIPT }}
    />
  );
}

/* ----------------------------------------------------------------
 * Provider
 * ---------------------------------------------------------------- */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  /* Lecture initiale — uniquement côté client */
  useEffect(() => {
    const saved  = localStorage.getItem('jj-theme') as Theme | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = saved ?? system;

    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('jj-theme', next);
      document.documentElement.classList.toggle('dark', next === 'dark');
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* ----------------------------------------------------------------
 * Hook consommateur
 * ---------------------------------------------------------------- */
export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}

export { ThemeContext };
