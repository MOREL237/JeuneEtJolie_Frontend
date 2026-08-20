// app/[lang]/layout.tsx
//
// Layout racine par locale. Charge les polices de marque et encapsule
// les providers de thème et d'internationalisation.

import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  DM_Sans,
  Space_Grotesk,
} from 'next/font/google';
import { i18n, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { ThemeProvider, ThemeScript } from '@/components/providers/ThemeProvider';
import { CustomCursor } from '@/components/layout/CustomCursor';
import '../globals.css';

/* ----------------------------------------------------------------
 * Polices de marque
 *   Cormorant Garamond — éditorial, haute couture (display)
 *   DM Sans            — corps de texte, lisibilité moderne
 *   Space Grotesk      — labels, data, UI technique
 * ---------------------------------------------------------------- */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

/* ----------------------------------------------------------------
 * Génération statique des locales
 * ---------------------------------------------------------------- */
export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

/* ----------------------------------------------------------------
 * Métadonnées
 * ---------------------------------------------------------------- */
export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: "Jeune & Jolie | L'Élégance Africaine Moderne",
    description: dict.hero?.description ?? 'Artisanat et élégance africaine',
    keywords: ['mode africaine', 'prêt-à-porter', 'accessoires', 'artisanat', 'Abidjan'],
    openGraph: {
      title: "Jeune & Jolie",
      description: "L'union sacrée de l'artisanat ancestral et de l'élégance contemporaine.",
      type: 'website',
    },
  };
}

/* ----------------------------------------------------------------
 * Layout racine
 * ---------------------------------------------------------------- */
export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;

  return (
    <html
      lang={lang}
      className={`${cormorant.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className="antialiased bg-background text-on-background">
        <I18nProvider initialLocale={lang}>
          <ThemeProvider>
            {/* Curseur personnalisé — monté côté client uniquement */}
            <CustomCursor />
            {props.children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
