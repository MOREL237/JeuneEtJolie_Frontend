// components/sections/CheckoutFooter.tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function CheckoutFooter() {
  const { t } = useTranslation();
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-20">
      <div className="max-w-7xl mx-auto px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-xl font-bold text-on-surface mb-6">
            Jeune & Jolie
          </div>
          <p className="font-inter text-xs leading-relaxed text-on-surface-variant max-w-sm mb-6">
            {t('checkoutFooter.brandDesc')}
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary cursor-pointer">
              public
            </span>
            <span className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary cursor-pointer">
              camera_alt
            </span>
            <span className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary cursor-pointer">
              mail
            </span>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-on-surface text-sm mb-4">
            {t('checkoutFooter.helpAndServices')}
          </h4>
          <ul className="space-y-3 font-inter text-xs text-on-surface-variant">
            <li><a className="hover:underline decoration-primary underline-offset-4" href="#">{t('footer.deliveryReturns')}</a></li>
            <li><a className="hover:underline decoration-primary underline-offset-4" href="#">{t('footer.securePayment')}</a></li>
            <li><a className="hover:underline decoration-primary underline-offset-4" href="#">{t('footer.sizeGuide')}</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-on-surface text-sm mb-4">
            {t('checkoutFooter.info')}
          </h4>
          <ul className="space-y-3 font-inter text-xs text-on-surface-variant">
            <li><a className="hover:underline decoration-primary underline-offset-4" href="#">{t('footer.aboutUs')}</a></li>
            <li><a className="hover:underline decoration-primary underline-offset-4" href="#">{t('footer.newsletter')}</a></li>
            <li><a className="hover:underline decoration-primary underline-offset-4" href="#">{t('footer.contact')}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-20 py-8 border-t border-outline-variant flex justify-between items-center">
        <p className="font-inter text-xs text-on-surface-variant/60">
          {t('checkoutFooter.copyright')}
        </p>
        <div className="flex gap-6 grayscale opacity-40">
          <span className="material-symbols-outlined">account_balance</span>
          <span className="material-symbols-outlined">payments</span>
        </div>
      </div>
    </footer>
  );
}
