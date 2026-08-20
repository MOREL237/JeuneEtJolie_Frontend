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

        // 🆕 AJOUTS POUR LA PAGE SOLDES
        gold: '#D4AF37',
        'sale-red': '#E8142A',
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
        // 🆕 AJOUTS POUR LA PAGE SOLDES
        'serif-luxury': ['Cormorant Garamond', 'serif'],
        'sans-lato': ['Lato', 'sans-serif'],
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
        // 🆕 Shadow pour hover des cartes
        'card-hover': '0 20px 40px -12px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 40px rgba(184, 0, 73, 0.15)',
        'glow-dark': '0 0 40px rgba(255, 178, 190, 0.1)',
      },
      // ✅ ANIMATIONS COMPLÈTES
      animation: {
        // Existantes
        'scroll-text': 'scroll-text 20s linear infinite',
        
        // ✅ Nouvelles animations pour TopNavBar et composants
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'fade-in-delay-1': 'fadeIn 0.3s ease-out 0.1s forwards',
        'fade-in-delay-2': 'fadeIn 0.3s ease-out 0.2s forwards',
        'fade-in-delay-3': 'fadeIn 0.3s ease-out 0.3s forwards',
        'fade-in-delay-4': 'fadeIn 0.3s ease-out 0.4s forwards',
        'fade-in-delay-5': 'fadeIn 0.3s ease-out 0.5s forwards',
        'fade-in-delay-6': 'fadeIn 0.3s ease-out 0.6s forwards',
        
        'slide-down': 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
        'slide-in-bottom': 'slideInBottom 0.4s ease-out forwards',
        
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        
        'soft-pulse': 'softPulse 2s ease-in-out infinite',
        'blink': 'blink 1.5s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rainbow': 'rainbow 4s linear infinite',
        
        // Loading
        'loading': 'loading 1.5s ease-in-out infinite',
      },
      keyframes: {
        // Existantes
        'scroll-text': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        
        // ✅ Nouvelles keyframes
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        
        'slideDown': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(-12px) scale(0.98)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          },
        },
        
        'slideUp': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(12px) scale(0.98)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          },
        },
        
        'slideInRight': {
          'from': { 
            opacity: '0', 
            transform: 'translateX(20px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        
        'slideInLeft': {
          'from': { 
            opacity: '0', 
            transform: 'translateX(-20px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        
        'slideInBottom': {
          'from': { 
            opacity: '0', 
            transform: 'translateY(30px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        
        'scaleIn': {
          'from': { 
            opacity: '0', 
            transform: 'scale(0.92)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
        },
        
        'bounceIn': {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.8)' 
          },
          '50%': { 
            transform: 'scale(1.05)' 
          },
          '70%': { 
            transform: 'scale(0.95)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
        },
        
        'softPulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
        
        'spin': {
          'to': { transform: 'rotate(360deg)' },
        },
        
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        
        'rainbow': {
          '0%': { color: '#ff6b6b' },
          '20%': { color: '#feca57' },
          '40%': { color: '#48dbfb' },
          '60%': { color: '#1dd1a1' },
          '80%': { color: '#5f27cd' },
          '100%': { color: '#ff6b6b' },
        },
        
        'loading': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      // ✅ Transitions améliorées
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'all': 'all',
        'transform': 'transform',
        'opacity': 'opacity',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    // ✅ Plugin pour les animations personnalisées (optionnel)
    function({ addUtilities, theme }: any) {
      const newUtilities = {
        '.stagger-children > *': {
          'animation-fill-mode': 'forwards',
          'opacity': '0',
        },
        '.stagger-children > *:nth-child(1)': { 'animation-delay': '0ms' },
        '.stagger-children > *:nth-child(2)': { 'animation-delay': '50ms' },
        '.stagger-children > *:nth-child(3)': { 'animation-delay': '100ms' },
        '.stagger-children > *:nth-child(4)': { 'animation-delay': '150ms' },
        '.stagger-children > *:nth-child(5)': { 'animation-delay': '200ms' },
        '.stagger-children > *:nth-child(6)': { 'animation-delay': '250ms' },
        '.stagger-children > *:nth-child(7)': { 'animation-delay': '300ms' },
        '.stagger-children > *:nth-child(8)': { 'animation-delay': '350ms' },
        '.stagger-children > *:nth-child(9)': { 'animation-delay': '400ms' },
        '.stagger-children > *:nth-child(10)': { 'animation-delay': '450ms' },
        '.stagger-children > *:nth-child(11)': { 'animation-delay': '500ms' },
        '.stagger-children > *:nth-child(12)': { 'animation-delay': '550ms' },
        
        // ✅ Hover utilities
        '.hover-lift': {
          'transition': 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        '.hover-lift:hover': {
          'transform': 'translateY(-4px)',
          'box-shadow': '0 12px 24px -8px rgba(0, 0, 0, 0.15)',
        },
        '.hover-scale': {
          'transition': 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        '.hover-scale:hover': {
          'transform': 'scale(1.05)',
        },
        '.hover-glow': {
          'transition': 'box-shadow 0.3s ease',
        },
        '.hover-glow:hover': {
          'box-shadow': '0 0 24px rgba(184, 0, 73, 0.3)',
        },
        
        // ✅ Glass morphism
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.12)',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'border': '1px solid rgba(255, 255, 255, 0.18)',
        },
        '.dark .glass': {
          'background': 'rgba(0, 0, 0, 0.2)',
          'border-color': 'rgba(255, 255, 255, 0.08)',
        },
        
        // ✅ Filter bar sticky
        '.filter-bar-sticky': {
          'position': 'sticky',
          'top': '0',
          'z-index': '40',
          'backdrop-filter': 'blur(12px)',
          '-webkit-backdrop-filter': 'blur(12px)',
          'background-color': 'rgba(252, 248, 255, 0.92)',
        },
        '.dark .filter-bar-sticky': {
          'background-color': 'rgba(26, 26, 46, 0.92)',
        },
        
        // ✅ Skip to main
        '.skip-to-main': {
          'position': 'absolute',
          'left': '-9999px',
          'z-index': '999',
          'padding': '1rem 1.5rem',
          'background-color': '#b80049',
          'color': '#ffffff',
          'text-decoration': 'none',
          'border-radius': '0 0 4px 0',
        },
        '.skip-to-main:focus': {
          'left': '0',
          'top': '0',
        },
        
        // ✅ Scrollbar hide
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          'display': 'none',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

export default config;