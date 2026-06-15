interface PaymentTabsProps {
  activeTab: 'card' | 'mobile' | 'cash';
}

const tabs = [
  { id: 'card', label: 'Carte Bancaire' },
  { id: 'mobile', label: 'Mobile Money' },
  { id: 'cash', label: 'Paiement à la livraison' },
];

export default function PaymentTabs({ activeTab }: PaymentTabsProps) {
  return (
    <div className="flex border-b border-outline-variant mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-8 py-4 border-b-2 whitespace-nowrap ${
            tab.id === activeTab 
              ? 'border-primary text-primary font-bold' 
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}