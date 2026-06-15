export default function CreditCardForm() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="relative">
        <label className="text-xs font-label-md text-on-surface-variant uppercase mb-2 block">
          Numéro de Carte
        </label>
        <input 
          className="w-full bg-background border-outline-variant rounded-md px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
          placeholder="0000 0000 0000 0000" 
          type="text"
        />
        <span className="absolute right-4 top-9 material-symbols-outlined text-outline">
          credit_card
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-label-md text-on-surface-variant uppercase mb-2 block">
            Expiration
          </label>
          <input 
            className="w-full bg-background border-outline-variant rounded-md px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
            placeholder="MM/YY" 
            type="text"
          />
        </div>
        <div>
          <label className="text-xs font-label-md text-on-surface-variant uppercase mb-2 block">
            CVV
          </label>
          <input 
            className="w-full bg-background border-outline-variant rounded-md px-4 py-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
            placeholder="123" 
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 py-4">
        <input 
          className="rounded text-primary focus:ring-primary" 
          id="save-card" 
          type="checkbox"
        />
        <label className="text-sm text-on-surface-variant" htmlFor="save-card">
          Sauvegarder ma carte pour mes prochains achats
        </label>
      </div>
    </div>
  );
}