import TopNavBar from '@/components/layout/TopNavBar';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import WishlistItem from '@/components/sections/WishlistItem';
import Footer from '@/components/layout/Footer';

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
  {
    id: 4,
    name: 'Blazer Lin Naturel',
    detail: 'Taille: 40',
    price: '195 €',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARewl4SasxSccFsxf1mBD_CpnMKjZSkSqAuiFYwWvmXbgIrezbZWQyWUpI0qajGiThBUMldvzOt5jkq9-29i9m7E3Jn-1_xHW-pWmZ1xtV5Ye128Jm-QMBTFS6GB-lGQPVTxsksELDmgffc8UIYZXYChaQ1N0Rgmg2f4zzA7knNS76FoaJushnux5bJboD93auWOrQo8dXiubwim6qa2qDz-Y3_q2ENJj51TJ_gUmV3tx0NP-Jtl66IJwxmld0JL3hEtlhtzroG7w',
  },
  {
    id: 5,
    name: 'Sandales Cuir Camel',
    detail: 'Pointure: 39',
    price: '110 €',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_k3UG_HgScqb5A7I-S-nazBXiyluB4aINvTkHgXoQ6zrx3G1AlFQ0A_J99gjuDRlm1B_svo6RbmWuv7En7DBYlRRnYSya1xTzJQNg-Gyi2Lg5w0eWroQzGsnM7CdN7t4aH3xFwfMK4yH5-07MbtU6cUVT82tVewmzCiaNDG4kjYsmOEYpj69Z9wDPcLVPnmJzILq968B_BJRZZP6no0SnkxxARY7Z1xKr4UtL5xRiXaqOvSLZyJ6yT48zibkfIvlYcoMBwBP_Qsk',
  },
  {
    id: 6,
    name: 'Boucles d\'Oreilles Perles',
    detail: 'Matière: Argent 925',
    price: '65 €',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXJgWg9MCbNwZ5YB6BX0v9lm3i1sZHlalTLslF0sdhkLNIGI99DBPQ_rMrzSDOgZaWIH8qvPciktYJK1Ld4HpJnI-rh_yxjOc8RcMcrMObb-bY8mH-UcMz7N8Y8jEuaZTGAFcNNe3WRAs_0hkkkkukeHietuRU0Rs5kWZVxQ6VepXw33hYoxrFLfNLnPiZUr8LMw1w9iySW4JpSoN_suXXGXPDr7o4jDOiHExkeSdb4BzMepNC9Phjo1nME6yL-f9nSgp77Ts1fAI',
  },
];

export default function WishlistPage() {
  return (
    <div className="bg-background font-body-md text-on-surface">
      <TopNavBar />
      
      <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
        <DashboardSidebar />
        
        <section className="flex-1 p-5 md:p-8 lg:p-10 bg-slate-50/30">
          <header className="mb-8 md:mb-10">
            <h2 className="font-headline-lg text-2xl md:text-3xl mb-2">Ma Wishlist</h2>
            <p className="text-sm md:text-base text-slate-500">
              {wishlistItems.length} {wishlistItems.length > 1 ? 'articles sauvegardés' : 'article sauvegardé'}
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100">
                <WishlistItem {...item} />
              </div>
            ))}
          </div>
          
          {wishlistItems.length === 0 && (
            <div className="bg-white p-12 md:p-16 rounded-2xl shadow-sm border border-slate-100 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">favorite_border</span>
              <h3 className="font-headline-md text-xl md:text-2xl mb-2">Votre wishlist est vide</h3>
              <p className="text-slate-500 mb-6">Ajoutez vos articles préférés pour les retrouver facilement</p>
              <a 
                href="/fr/catalogue" 
                className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors"
              >
                Découvrir nos produits
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
