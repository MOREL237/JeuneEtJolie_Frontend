interface OrderItemProps {
  name: string;
  color: string;
  quantity: number;
  price: string;
  image: string;
}

export default function OrderItem({ name, color, quantity, price, image }: OrderItemProps) {
  return (
    <div className="flex gap-4">
      <div className="w-20 h-24 bg-surface-container rounded overflow-hidden flex-shrink-0">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div className="flex flex-col justify-between py-1">
        <div>
          <p className="font-bold text-on-surface text-sm">{name}</p>
          <p className="text-xs text-on-surface-variant">Couleur: {color}</p>
          <p className="text-xs text-on-surface-variant">Quantité: {quantity}</p>
        </div>
        <p className="font-headline-md text-primary text-sm">{price}</p>
      </div>
    </div>
  );
}