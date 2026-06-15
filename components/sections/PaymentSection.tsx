import PaymentTabs from './PaymentTabs';
import CreditCardForm from './CreditCardForm';

export default function PaymentSection() {
  return (
    <section className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-8">
        ③ Paiement
      </h2>
      <PaymentTabs activeTab="card" />
      <CreditCardForm />
    </section>
  );
}