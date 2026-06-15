const navItems = [
  { icon: 'dashboard', label: 'Tableau de bord', href: '#', isActive: true },
  { icon: 'local_shipping', label: 'Commandes', href: '#' },
  { icon: 'location_on', label: 'Adresses', href: '#' },
  { icon: 'favorite', label: 'Wishlist', href: '#' },
  { icon: 'settings', label: 'Paramètres', href: '#' },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-80 border-r border-slate-100 py-10 px-8 flex flex-col gap-10 bg-white">
      {/* Profile */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary ring-4 ring-primary/10">
          <img 
            alt="User Avatar" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_k3UG_HgScqb5A7I-S-nazBXiyluB4aINvTkHgXoQ6zrx3G1AlFQ0A_J99gjuDRlm1B_svo6RbmWuv7En7DBYlRRnYSya1xTzJQNg-Gyi2Lg5w0eWroQzGsnM7CdN7t4aH3xFwfMK4yH5-07MbtU6cUVT82tVewmzCiaNDG4kjYsmOEYpj69Z9wDPcLVPnmJzILq968B_BJRZZP6no0SnkxxARY7Z1xKr4UtL5xRiXaqOvSLZyJ6yT48zibkfIvlYcoMBwBP_Qsk"
          />
        </div>
        <div>
          <h3 className="font-headline-md text-xl font-bold">Aminata Traoré</h3>
          <p className="text-sm text-slate-500 font-body-md">Membre Gold depuis 2023</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
              item.isActive 
                ? 'active-tab text-primary font-bold' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-sm uppercase tracking-wider font-label-md">{item.label}</span>
          </a>
        ))}
      </nav>
      
      {/* Logout */}
      <div className="mt-auto pt-10">
        <button className="w-full py-3 border border-pink-600 text-pink-600 rounded-xl font-bold hover:bg-pink-50 transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">logout</span>
          Déconnexion
        </button>
      </div>
    </aside>
  );
}