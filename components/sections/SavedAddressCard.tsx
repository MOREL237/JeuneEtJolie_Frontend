interface SavedAddressCardProps {
  name: string;
  address: string;
  city: string;
  phone: string;
  isSelected: boolean;
}

export default function SavedAddressCard({ 
  name, 
  address, 
  city, 
  phone, 
  isSelected 
}: SavedAddressCardProps) {
  return (
    <label className={`relative flex p-6 cursor-pointer rounded-lg border-2 ${
      isSelected ? 'border-primary bg-surface-container-low ring-1 ring-primary/10' : 'border-outline-variant'
    }`}>
      <input 
        checked={isSelected} 
        className="sr-only" 
        name="address" 
        type="radio" 
        value="saved"
      />
      <div className="flex flex-col">
        <span className="font-bold text-on-surface mb-2">{name}</span>
        <span className="text-sm text-on-surface-variant">{address}</span>
        <span className="text-sm text-on-surface-variant">{city}</span>
        <span className="text-sm text-on-surface-variant mt-2">{phone}</span>
      </div>
      {isSelected && (
        <span 
          className="absolute top-4 right-4 text-primary material-symbols-outlined" 
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      )}
    </label>
  );
}