import ShippingOption from './ShippingOption';

const shippingOptions = [
  {
    id: 'standard',
    name: 'Standard (3-5j)',
    description: 'Livraison sécurisée à domicile',
    price: '3 000 FCFA',
    isSelected: true,
  },
  {
    id: 'express',
    name: 'Express (24h)',
    description: 'Priorité maximale, livraison le lendemain',
    price: '7 000 FCFA',
    isSelected: false,
  },
];

export default function ShippingSection() {
  return (
    <section className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-8">
        ② Mode de Livraison
      </h2>
      <div className="space-y-4">
        {shippingOptions.map((option) => (
          <ShippingOption key={option.id} {...option} />
        ))}
      </div>
    </section>
  );
}