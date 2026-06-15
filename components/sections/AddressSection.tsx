import SavedAddressCard from './SavedAddressCard';
import NewAddressForm from './NewAddressForm';

export default function AddressSection() {
  return (
    <section className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          ① Adresse de Livraison
        </h2>
        <button className="text-primary font-label-md text-label-md hover:underline decoration-secondary">
          Modifier
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <SavedAddressCard 
          name="Aminata Diallo (Maison)"
          address="Rue de l'Indépendance, Villa 45"
          city="Dakar, Sénégal"
          phone="+221 77 123 45 67"
          isSelected={true}
        />
        <div className="p-6 rounded-lg border-2 border-outline-variant border-dashed flex flex-col items-center justify-center text-outline transition-colors hover:border-primary group cursor-pointer">
          <span className="material-symbols-outlined text-4xl mb-2 group-hover:text-primary">
            add_location
          </span>
          <span className="font-label-md">Nouvelle adresse</span>
        </div>
      </div>
      
      <NewAddressForm />
    </section>
  );
}