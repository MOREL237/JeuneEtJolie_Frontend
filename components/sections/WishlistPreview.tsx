import WishlistItem from './WishlistItem';

const wishlistItems = [
  {
    id: 1,
    name: 'Robe Soie Émeraude',
    detail: 'Taille: 38',
    price: '245 €',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQf2yCibOmdHxLVLRQ1kVQHVAk0rkYtpSH58hDi4-m46boZwqeYxQJXIzJpwoHoUZHe8qLjtHYzjmTXV4u7KQxCgxcZ3EoS9Lyc_LlQNH1SvruRS_fLJi2Wdm2TaT9QUwpHDIY6yHdzgqhMPG0ol0G5bCSJrhT7fiPjtb7ysjx-Qrb2x4ChZdP78034YMWmEoPABYw7VCALwTRgUKZErRAEJeCqyWzRe0fBkpCpi8-Uh0hXRCPv8PxS2a_i8f4RP5vbajW-1NyvSA',
  },
  {
    id: 2,
    name: "Collier 'Heritage' Or",
    detail: 'Métal: Or 18k',
    price: '120 €',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXJgWg9MCbNwZ5YB6BX0v9lm3i1sZHlalTLslF0sdhkLNIGI99DBPQ_rMrzSDOgZaWIH8qvPciktYJK1Ld4HpJnI-rh_yxjOc8RcMcrMObb-bY8mH-UcMz7N8Y8jEuaZTGAFcNNe3WRAs_0hkkkkukeHietuRU0Rs5kWZVxQ6VepXw33hYoxrFLfNLnPiZUr8LMw1w9iySW4JpSoN_suXXGXPDr7o4jDOiHExkeSdb4BzMepNC9Phjo1nME6yL-f9nSgp77Ts1fAI',
  },
  {
    id: 3,
    name: 'Pochette Cuir Fuchsia',
    detail: 'Couleur: Rose Vibrant',
    price: '85 €',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMu8Xw-StjX-s_QRiMCU10IYRcz0A0PEE8FebkqGsrVBBxnXxaeYHpiJtrWpd8uhQaQZ-pbAZaCnvrwLUSlMvWH4nWIyUIQzp4baJvmOqBMk7sXcrysrEus237b56puzjwNYfqVCNxk3BrKwrkm8pSUZ030Ugsqyxn3KGPZiQeTfcPqfDOnGguTp0QcBpWYxdhzKHMrYE8uLiUa0EN9zP9rJp6fmXKEpyCYBEpBnY2pQa37KKQCLNXzhDmsAcrrdAGFfjmTmeMS-w',
  },
];

export default function WishlistPreview() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-headline-md text-xl">Ma Wishlist</h3>
        <a className="text-sm font-bold text-primary hover:underline" href="#">Voir tout</a>
      </div>
      <div className="flex flex-col gap-6">
        {wishlistItems.map((item) => (
          <WishlistItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}