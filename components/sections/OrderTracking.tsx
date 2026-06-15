const trackingSteps = [
  { icon: 'check', label: 'Confirmée', date: '12 Oct', isCompleted: true, isActive: false },
  { icon: 'inventory_2', label: 'Préparée', date: '13 Oct', isCompleted: true, isActive: false },
  { icon: 'local_shipping', label: 'En route', date: '14 Oct', isCompleted: true, isActive: true },
  { icon: 'home', label: 'Livrée', date: 'Est. 16 Oct', isCompleted: false, isActive: false },
];

export default function OrderTracking() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-headline-md text-xl">Suivi commande #JJ-9283</h3>
        <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">En livraison</span>
      </div>
      
      <div className="relative flex justify-between items-start">
        <div className="absolute top-5 left-0 w-full h-[2px] bg-slate-100 -z-0"></div>
        
        {trackingSteps.map((step, index) => (
          <div key={index} className={`relative z-10 flex flex-col items-center gap-2 ${!step.isCompleted && !step.isActive ? 'opacity-40' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step.isCompleted || step.isActive 
                ? 'bg-primary text-white' 
                : 'bg-slate-200 text-slate-600'
            } ${step.isActive ? 'ring-4 ring-primary/20' : ''}`}>
              <span className="material-symbols-outlined text-sm" style={step.isCompleted ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                {step.icon}
              </span>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold uppercase">{step.label}</p>
              <p className="text-[10px] text-slate-400">{step.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}