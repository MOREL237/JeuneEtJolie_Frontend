import CheckoutHeader from '@/components/layout/CheckoutHeader';
import Stepper from '@/components/sections/Stepper';
import AddressSection from '@/components/sections/AddressSection';
import ShippingSection from '@/components/sections/ShippingSection';
import PaymentSection from '@/components/sections/PaymentSection';
import OrderSummaryCheckout from '@/components/sections/OrderSummaryCheckout';
import CheckoutFooter from '@/components/sections/CheckoutFooter';

export default function CheckoutPage() {
  return (
    <div className="bg-background text-on-surface font-body-md selection:bg-secondary-container/30">
      <CheckoutHeader />
      
      <main className="max-w-[1440px] mx-auto px-10 py-12">
        <Stepper currentStep={1} />
        
        <div className="grid grid-cols-12 gap-gutter items-start">
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <AddressSection />
            <ShippingSection />
            <PaymentSection />
          </div>
          
          <aside className="col-span-12 lg:col-span-4 sticky top-32 space-y-6">
            <OrderSummaryCheckout />
          </aside>
        </div>
      </main>
      
      <CheckoutFooter />
    </div>
  );
}