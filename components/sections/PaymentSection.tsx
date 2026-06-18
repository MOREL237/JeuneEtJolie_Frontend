import PaymentTabs from './PaymentTabs';
import CreditCardForm from './CreditCardForm';

export default function PaymentSection() {
  return (
    <section className="bg-surface-container-lowest p-5 md:p-6 lg:p-8 rounded-xl shadow-sm">
      <h2 className="font-headline-md text-xl md:text-2xl text-on-surface mb-6 md:mb-8">
        ③ Paiement
      </h2>
      <PaymentTabs activeTab="card" />
      <CreditCardForm />
    </section>
  );
}