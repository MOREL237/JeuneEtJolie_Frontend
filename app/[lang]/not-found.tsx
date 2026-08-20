'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import TopNavBar from '@/components/layout/TopNavBar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <TopNavBar />
      
      <main className="flex-1 flex items-center justify-center px-5 py-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-primary" style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}>
              404
            </span>
          </div>
          <h1
            className="text-on-surface mb-3"
            style={{
              fontFamily: 'var(--font-cormorant, Georgia, serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 400,
            }}
          >
            Page introuvable
          </h1>
          <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href={`/${lang}`}
            className="btn-primary text-xs px-8"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>

      <Footer variant="full" />
    </div>
  );
}
