const kpiData = [
  {
    icon: 'shopping_basket',
    iconColor: 'text-primary bg-primary/10',
    badge: '+2 ce mois',
    badgeColor: 'text-green-600 bg-green-50',
    label: 'Commandes totales',
    value: '12',
  },
  {
    icon: 'pending_actions',
    iconColor: 'text-tertiary-container bg-tertiary-container/10',
    label: 'En cours',
    value: '01',
  },
  {
    icon: 'military_tech',
    iconColor: 'text-pink-600 bg-pink-50',
    iconFill: true,
    label: 'Points fidélité',
    value: '2,450',
  },
  {
    icon: 'account_balance_wallet',
    iconColor: 'text-primary bg-primary/10',
    label: 'Total dépensé',
    value: '1.240 €',
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      {kpiData.map((kpi, index) => (
        <div 
          key={index}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`material-symbols-outlined p-2 rounded-lg ${kpi.iconColor}`} style={kpi.iconFill ? { fontVariationSettings: "'FILL' 1" } : undefined}>
              {kpi.icon}
            </span>
            {kpi.badge && (
              <span className={`text-xs font-bold px-2 py-1 rounded ${kpi.badgeColor}`}>
                {kpi.badge}
              </span>
            )}
          </div>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-1">
            {kpi.label}
          </p>
          <h4 className="text-2xl font-black">{kpi.value}</h4>
        </div>
      ))}
    </div>
  );
}