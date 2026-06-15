// app/[lang]/layout.tsx
import type { Metadata } from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import { i18n, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoSerif = Noto_Serif({ subsets: ['latin'], variable: '--font-noto-serif', weight: ['400', '700'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
  const dict = await getDictionary(lang);
  return {
    title: 'Jeune & Jolie | L\'Élégance Africaine Moderne',
    description: dict.hero.description,
  };
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={lang} className={`${inter.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-on-background transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}