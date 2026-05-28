import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Surface colors
        surface: '#fcf8ff',
        'surface-dim': '#dad7f3',
        'surface-bright': '#fcf8ff',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f5f2ff',
        'surface-container': '#efecff',
        'surface-container-high': '#e8e5ff',
        'surface-container-highest': '#e2e0fc',
        'on-surface': '#1a1a2e',
        'on-surface-variant': '#5b3f43',
        'inverse-surface': '#2f2e43',
        'inverse-on-surface': '#f2efff',
        
        // Outline
        outline: '#8f6f73',
        'outline-variant': '#e4bdc2',
        
        // Primary colors
        primary: '#b80049',
        'on-primary': '#ffffff',
        'primary-container': '#e2165f',
        'on-primary-container': '#fffbff',
        'inverse-primary': '#ffb2be',
        'primary-fixed': '#ffd9de',
        'primary-fixed-dim': '#ffb2be',
        'on-primary-fixed': '#400014',
        'on-primary-fixed-variant': '#900038',
        'surface-tint': '#bc004b',
        
        // Secondary colors
        secondary: '#b90c55',
        'on-secondary': '#ffffff',
        'secondary-container': '#fe4d86',
        'on-secondary-container': '#590025',
        'secondary-fixed': '#ffd9df',
        'secondary-fixed-dim': '#ffb1c2',
        'on-secondary-fixed': '#3f0018',
        'on-secondary-fixed-variant': '#8f003f',
        
        // Tertiary/Gold colors
        tertiary: '#735c00',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#cca830',
        'on-tertiary-container': '#4f3e00',
        'tertiary-fixed': '#ffe088',
        'tertiary-fixed-dim': '#e9c349',
        'on-tertiary-fixed': '#241a00',
        'on-tertiary-fixed-variant': '#574500',
        
        // Error
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#93000a',
        
        // Background
        background: '#fcf8ff',
        'on-background': '#1a1a2e',
        'surface-variant': '#e2e0fc',
      },
      borderRadius: {
        'sm': '0.25rem',    // 4px
        'DEFAULT': '0.5rem', // 8px
        'md': '0.75rem',     // 12px
        'lg': '1rem',        // 16px
        'xl': '1.5rem',      // 24px
        'full': '9999px',
      },
      spacing: {
        'base': '8px',
        'margin-desktop': '80px',
        'margin-mobile': '20px',
        'gutter': '32px',
        'section-gap': '120px',
        'stack-sm': '12px',
        'stack-md': '24px',
      },
      fontFamily: {
        'serif': ['Noto Serif', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'headline-lg': ['Noto Serif', 'serif'],
        'headline-md': ['Noto Serif', 'serif'],
        'display-xl': ['Noto Serif', 'serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'label-md': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '600' }],
      },
      boxShadow: {
        'ambient': '0 4px 20px rgba(26, 26, 46, 0.08)',
        'ambient-lg': '0 8px 30px rgba(26, 26, 46, 0.12)',
        'hover': '0 8px 25px rgba(26, 26, 46, 0.1)',
      },
      // Ajout du support pour les animations et transitions
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;