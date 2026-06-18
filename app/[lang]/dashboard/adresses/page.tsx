import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';

const savedAddresses = [
  {
    id: '1',
    name: 'Domicile',
    address: '12 Rue des Acacias',
    city: 'Dakar',
    postalCode: '10200',
    country: 'Sénégal',
    phone: '+221 77 123 45 67',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Bureau',
    address: '45 Avenue Léopold Sédar Senghor',
    city: 'Dakar',
    postalCode: '10100',
    country: 'Sénégal',
    phone: '+221 77 987 65 43',
    isDefault: false,
  },
];

export default function AdressesPage() {
  return (
    <div className="bg-background font-body-md text-on-surface">
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
        <DashboardSidebar />
        
        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-slate-50/30">
          <header className="mb-8 md:mb-10 flex justify-between items-center">
            <div>
              <h2 className="font-headline-lg text-2xl md:text-3xl mb-2">Mes Adresses</h2>
              <p className="text-sm md:text-base text-slate-500">
                Gérez vos adresses de livraison
              </p>
            </div>
            <button className="bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span>
              Nouvelle adresse
            </button>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {savedAddresses.map((address, index) => (
              <div key={address.id} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">{address.name}</h3>
                    {address.isDefault && (
                      <span className="inline-block px-3 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-full">
                        Par défaut
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="material-symbols-outlined text-slate-400 hover:text-pink-600 transition-colors">
                      edit
                    </button>
                    <button className="material-symbols-outlined text-slate-400 hover:text-red-600 transition-colors">
                      delete
                    </button>
                  </div>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>{address.address}</p>
                  <p>{address.city} {address.postalCode}</p>
                  <p>{address.country}</p>
                  <p className="pt-2 font-medium">{address.phone}</p>
                </div>
                {!address.isDefault && (
                  <button className="mt-4 text-pink-600 text-sm font-bold hover:underline">
                    Définir par défaut
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
