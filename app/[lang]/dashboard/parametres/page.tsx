import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';

export default function ParametresPage() {
  return (
    <div className="bg-background font-body-md text-on-surface">
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
        <DashboardSidebar />
        
        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-slate-50/30">
          <header className="mb-8 md:mb-10">
            <h2 className="font-headline-lg text-2xl md:text-3xl mb-2">Paramètres du compte</h2>
            <p className="text-sm md:text-base text-slate-500">
              Gérez vos informations personnelles et préférences
            </p>
          </header>
          
          <div className="space-y-6 md:space-y-8">
            {/* Informations personnelles */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-headline-md text-xl mb-6">Informations personnelles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Prénom</label>
                  <input 
                    type="text" 
                    defaultValue="Aminata" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                  <input 
                    type="text" 
                    defaultValue="Traoré" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    defaultValue="aminata.traore@example.com" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    defaultValue="+221 77 123 45 67" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              <button className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors">
                Enregistrer les modifications
              </button>
            </div>

            {/* Mot de passe */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-headline-md text-xl mb-6">Changer le mot de passe</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe actuel</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nouveau mot de passe</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirmer le mot de passe</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              <button className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors">
                Changer le mot de passe
              </button>
            </div>

            {/* Préférences */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-headline-md text-xl mb-6">Préférences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Newsletter</h4>
                    <p className="text-sm text-slate-500">Recevoir les dernières nouveautés et offres</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-pink-600 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Notifications par email</h4>
                    <p className="text-sm text-slate-500">Recevoir les mises à jour de commandes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-pink-600 rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900">Notifications SMS</h4>
                    <p className="text-sm text-slate-500">Recevoir les alertes de livraison</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 text-pink-600 rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
