import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import OrderItem from '@/components/sections/OrderItem';
import Footer from '@/components/layout/Footer';

const orders = [
  { 
    id: '#JJ-9283', 
    date: '14 Oct 2024', 
    status: 'En route', 
    statusColor: 'bg-pink-50 text-pink-600', 
    amount: '185,00 €',
    items: 3
  },
  { 
    id: '#JJ-8842', 
    date: '28 Sep 2024', 
    status: 'Livrée', 
    statusColor: 'bg-green-50 text-green-600', 
    amount: '320,00 €',
    items: 5
  },
  { 
    id: '#JJ-7521', 
    date: '12 Aoû 2024', 
    status: 'Livrée', 
    statusColor: 'bg-green-50 text-green-600', 
    amount: '95,00 €',
    items: 2
  },
  { 
    id: '#JJ-6842', 
    date: '05 Juil 2024', 
    status: 'Annulée', 
    statusColor: 'bg-red-50 text-red-600', 
    amount: '210,00 €',
    items: 4
  },
  { 
    id: '#JJ-5734', 
    date: '22 Juin 2024', 
    status: 'Livrée', 
    statusColor: 'bg-green-50 text-green-600', 
    amount: '145,00 €',
    items: 2
  },
];

export default function CommandesPage() {
  return (
    <div className="bg-background font-body-md text-on-surface">
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
        <DashboardSidebar />
        
        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-slate-50/30">
          <header className="mb-8 md:mb-10">
            <h2 className="font-headline-lg text-2xl md:text-3xl mb-2">Mes Commandes</h2>
            <p className="text-sm md:text-base text-slate-500">
              {orders.length} {orders.length > 1 ? 'commandes' : 'commande'}
            </p>
          </header>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  <th className="px-6 py-4">Commande #</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Articles</th>
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
                    <td className="px-6 py-4 text-slate-600">{order.items}</td>
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
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
