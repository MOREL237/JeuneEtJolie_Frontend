import WishlistItem from './WishlistItem';

const wishlistItems = [
  {
    id: 1,
    name: 'Robe Soie Émeraude',
    detail: 'Taille : 38',
    price: 159000,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
  },
  {
    id: 2,
    name: "Collier \"Héritage\" Or",
    detail: 'Métal : Or 18k',
    price: 78000,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
  },
  {
    id: 3,
    name: 'Pochette Cuir Fuchsia',
    detail: 'Couleur : Rose Vibrant',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
  },
];

export default function WishlistPreview() {
  return (
    <div className="bg-surface border border-outline-variant/20 p-6 rounded-2xl shadow-ambient">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-md text-xl">Ma Wishlist</h3>
        <a className="text-sm font-bold text-primary hover:underline" href="/fr/dashboard/wishlist">Voir tout</a>
      </div>
      <div className="flex flex-col gap-6">
        {wishlistItems.map((item) => (
          <WishlistItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}