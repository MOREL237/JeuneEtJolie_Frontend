interface WishlistItemProps {
  name: string;
  detail: string;
  price: string;
  image: string;
}

export default function WishlistItem({ name, detail, price, image }: WishlistItemProps) {
  return (
    <div className="flex gap-4 group cursor-pointer">
      <div className="w-20 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
        <img 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          src={image}
        />
      </div>
      <div className="flex flex-col justify-between py-1 flex-1">
        <div>
          <h4 className="text-sm font-bold truncate">{name}</h4>
          <p className="text-xs text-slate-400">{detail}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-black">{price}</span>
          <button className="material-symbols-outlined text-pink-600 text-sm">
            shopping_bag
          </button>
        </div>
      </div>
    </div>
  );
}