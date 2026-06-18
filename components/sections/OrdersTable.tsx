const orders = [
  { id: '#JJ-9283', date: '14 Oct 2024', status: 'En route', statusColor: 'bg-pink-50 text-pink-600', amount: '185,00 €' },
  { id: '#JJ-8842', date: '28 Sep 2024', status: 'Livrée', statusColor: 'bg-green-50 text-green-600', amount: '320,00 €' },
  { id: '#JJ-7521', date: '12 Aoû 2024', status: 'Livrée', statusColor: 'bg-green-50 text-green-600', amount: '95,00 €' },
];

export default function OrdersTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-headline-md text-xl">Dernières commandes</h3>
        <a className="text-sm font-bold text-primary hover:underline" href="/fr/dashboard/commandes">Voir tout</a>
      </div>
      
      <table className="w-full text-left">
        <thead className="bg-slate-50/50">
          <tr className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
            <th className="px-6 py-4">Commande #</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Statut</th>
            <th className="px-6 py-4">Montant</th>
            <th className="px-6 py-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {orders.map((order) => (
            <tr key={order.id} className="text-sm hover:bg-slate-50/30 transition-colors">
              <td className="px-6 py-4 font-bold">{order.id}</td>
              <td className="px-6 py-4 text-slate-500">{order.date}</td>
              <td className="px-6 py-4">
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.statusColor}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 font-medium">{order.amount}</td>
              <td className="px-6 py-4 text-right">
                <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">
                  visibility
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}