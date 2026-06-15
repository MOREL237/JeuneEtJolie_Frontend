export default function CheckoutFooter() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-20 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Jeune & Jolie
          </div>
          <p className="font-inter text-xs leading-relaxed text-slate-500 max-w-sm mb-6">
            Artisanat et Élégance Africaine. Chaque pièce est conçue pour célébrer la force et la beauté de la femme moderne.
          </p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-slate-400 hover:text-pink-600 cursor-pointer">
              public
            </span>
            <span className="material-symbols-outlined text-slate-400 hover:text-pink-600 cursor-pointer">
              camera_alt
            </span>
            <span className="material-symbols-outlined text-slate-400 hover:text-pink-600 cursor-pointer">
              mail
            </span>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
            Aide & Services
          </h4>
          <ul className="space-y-3 font-inter text-xs text-slate-500">
            <li><a className="hover:underline decoration-pink-500 underline-offset-4" href="#">Livraison & Retours</a></li>
            <li><a className="hover:underline decoration-pink-500 underline-offset-4" href="#">Paiement Sécurisé</a></li>
            <li><a className="hover:underline decoration-pink-500 underline-offset-4" href="#">Guide des Tailles</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-4">
            Informations
          </h4>
          <ul className="space-y-3 font-inter text-xs text-slate-500">
            <li><a className="hover:underline decoration-pink-500 underline-offset-4" href="#">À Propos</a></li>
            <li><a className="hover:underline decoration-pink-500 underline-offset-4" href="#">Newsletter</a></li>
            <li><a className="hover:underline decoration-pink-500 underline-offset-4" href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-20 py-8 border-t border-slate-100 flex justify-between items-center">
        <p className="font-inter text-xs text-slate-400">
          © 2026 Jeune & Jolie. Artisanat et Elégance Africaine.
        </p>
        <div className="flex gap-6 grayscale opacity-40">
          <span className="material-symbols-outlined">account_balance</span>
          <span className="material-symbols-outlined">payments</span>
        </div>
      </div>
    </footer>
  );
}