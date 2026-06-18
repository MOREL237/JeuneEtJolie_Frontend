import OrderItem from './OrderItem';
import PaymentIcons from './PaymentIcons';

const orderItems = [
  {
    id: 1,
    name: 'Sac Signature "L\'élégante"',
    color: 'Terracotta',
    quantity: 1,
    price: '125 000 FCFA',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7BmnvjS4x3MYKwPin0IcYgY2cewOUVNvdrb7Ejg5NkAUv8RK6mFDm3_z823Eiq4zLTaR625rFJycaVvt5hWpDcQCi8tUKB-2nj3bp-00dTEx9gMv5fq2jB5nZ003GSMoCI82dJZLWVja6tFyOKvmqlkJCUM4MX9T1vpbhfyKN2Y72-YD1rAL_UZttIQ2TTF8Xv5DSGwcacLJHq55lPYWXHV_r0D7oTzeB5HIHE2LSkELnKacUsBupTOjAYbUjhelSgq0SH_CaJEw',
  },
  {
    id: 2,
    name: 'Foulard en Soie Imprimée',
    color: 'Fuchsia',
    quantity: 1,
    price: '45 000 FCFA',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkgflePClnwHf66gEPnEN1mrZf2ooDmzyPddYgH8yTSZwGjT1ZieunHWn_1Rd3awYF9YhTFzEUtWbBAo-R79nbCPm_1KpODPWxSGTJCY8p2Uc40jwPQG9Dr0X6O1dhWNpn7_WHVXzCBc-NNaofx8l0AQBxIk8OeGiPwe7tKw7unQdgvQqEE5kQS7TH7rjaJaK_UZwlxKJfWXBaeCLC2muu0NjjNRkN-dZ-MmXy43lHYMoRNt67dEKUg8vjNCXIO8f7Da6igmV93WM',
  },
];

export default function OrderSummaryCheckout() {
  const subtotal = '170 000 FCFA';
  const shipping = '3 000 FCFA';
  const total = '173 000 FCFA';

  return (
    <div className="bg-surface-container-lowest p-5 md:p-6 lg:p-8 rounded-xl shadow-lg border border-surface-container-high">
      <h3 className="font-headline-md text-lg md:text-xl text-on-surface mb-5 md:mb-6 border-b border-outline-variant pb-3 md:pb-4">
        Résumé de la commande
      </h3>
      
      <div className="space-y-3 md:space-y-4 mb-5 md:mb-6">
        {orderItems.map((item) => (
          <OrderItem key={item.id} {...item} />
        ))}
      </div>
      
      <div className="space-y-2 md:space-y-3 pt-5 md:pt-6 border-t border-outline-variant">
        <div className="flex justify-between text-sm md:text-base text-on-surface-variant">
          <span>Sous-total</span>
          <span>{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm md:text-base text-on-surface-variant">
          <span>Frais de livraison</span>
          <span>{shipping}</span>
        </div>
        <div className="flex justify-between text-sm md:text-base text-on-surface-variant">
          <span>Taxes (TVA)</span>
          <span>Incluse</span>
        </div>
        <div className="flex justify-between text-on-surface font-bold text-base md:text-lg pt-3 md:pt-4">
          <span>Total</span>
          <span className="text-primary">{total}</span>
        </div>
      </div>
      
      <button className="w-full bg-primary text-on-primary py-4 md:py-5 rounded-lg mt-6 md:mt-8 font-bold text-sm md:text-base uppercase tracking-wider md:tracking-widest shadow-md hover:bg-secondary transition-all active:scale-95 flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-lg md:text-xl">lock</span>
        Confirmer et payer
      </button>
      
      <PaymentIcons />
    </div>
  );
}