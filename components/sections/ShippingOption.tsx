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
    <label className="flex items-center justify-between p-6 rounded-lg border-2 border-outline-variant hover:border-primary cursor-pointer transition-all">
      <div className="flex items-center gap-4">
        <input 
          checked={isSelected} 
          className="w-5 h-5 text-primary border-outline focus:ring-primary" 
          name="shipping" 
          type="radio" 
          value={id}
        />
        <div>
          <p className="font-bold text-on-surface">{name}</p>
          <p className="text-sm text-on-surface-variant">{description}</p>
        </div>
      </div>
      <span className="font-headline-md text-lg">{price}</span>
    </label>
  );
}