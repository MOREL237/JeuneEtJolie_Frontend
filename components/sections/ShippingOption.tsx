interface ShippingOptionProps {
  id: string;
  name: string;
  description: string;
  price: string;
  isSelected: boolean;
}

export default function ShippingOption({ 
  id, 
  name, 
  description, 
  price, 
  isSelected 
}: ShippingOptionProps) {
  return (
    <label className={`flex items-center justify-between p-4 md:p-5 lg:p-6 rounded-lg border-2 cursor-pointer transition-all ${
      isSelected ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:border-outline'
    }`}>
      <div className="flex items-center gap-3 md:gap-4">
        <input 
          checked={isSelected} 
          className="w-4 h-4 md:w-5 md:h-5 text-primary border-outline focus:ring-primary" 
          name="shipping" 
          type="radio" 
          value={id}
        />
        <div>
          <p className="font-bold text-sm md:text-base text-on-surface">{name}</p>
          <p className="text-xs md:text-sm text-on-surface-variant">{description}</p>
        </div>
      </div>
      <span className="font-headline-md text-base md:text-lg shrink-0 ml-2">{price}</span>
    </label>
  );
}