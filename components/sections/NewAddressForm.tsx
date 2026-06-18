export default function NewAddressForm() {
  return (
    <div className="mt-6 md:mt-8 space-y-4 md:space-y-5">
      <h3 className="font-label-md text-xs md:text-sm text-on-surface-variant uppercase mb-4">
        Ajouter une nouvelle adresse
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <input 
          className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
          placeholder="Nom Complet" 
          type="text"
        />
        <input 
          className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
          placeholder="Téléphone" 
          type="tel"
        />
        <input 
          className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all md:col-span-2" 
          placeholder="Rue et numéro" 
          type="text"
        />
        <input 
          className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
          placeholder="Ville" 
          type="text"
        />
        <select className="w-full bg-background border border-outline-variant rounded-md px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer">
          <option>Sénégal</option>
          <option>Côte d'Ivoire</option>
          <option>Cameroun</option>
          <option>France</option>
        </select>
      </div>
    </div>
  );
}