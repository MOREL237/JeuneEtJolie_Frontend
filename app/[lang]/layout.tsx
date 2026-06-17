// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import { i18n, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-noto-serif', weight: ['400', '700'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: 'Jeune & Jolie | L\'Élégance Africaine Moderne',
    description: dict.hero?.description || 'Artisanat et élégance africaine',
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as Locale;

  return (
    <html lang={lang} className={`${inter.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-sans antialiased bg-background text-on-background transition-colors duration-300">
        <I18nProvider initialLocale={lang}>
          <ThemeProvider>
            {props.children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}