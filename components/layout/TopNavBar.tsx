export default function TopNavBar() {
  const navLinks = [
    { label: 'Nouveautés', href: '#' },
    { label: 'Collections', href: '#' },
    { label: 'Prêt-à-porter', href: '#' },
    { label: 'Accessoires', href: '#' },
    { label: 'Soldes', href: '#' },
  ];

  return (
    <header className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-10 flex flex-col w-full gap-4 py-4">
        <div className="flex items-center justify-between w-full">
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <img 
              alt="Jeune & Jolie Logo" 
              className="h-12 w-12 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARewl4SasxSccFsxf1mBD_CpnMKjZSkSqAuiFYwWvmXbgIrezbZWQyWUpI0qajGiThBUMldvzOt5jkq9-29i9m7E3Jn-1_xHW-pWmZ1xtV5Ye128Jm-QMBTFS6GB-lGQPVTxsksELDmgffc8UIYZXYChaQ1N0Rgmg2f4zzA7knNS76FoaJushnux5bJboD93auWOrQo8dXiubwim6qa2qDz-Y3_q2ENJj51TJ_gUmV3tx0NP-Jtl66IJwxmld0JL3hEtlhtzroG7w"
            />
            <h1 className="text-3xl font-black text-slate-900 dark:text-white italic font-headline-lg">
              Jeune & Jolie
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-noto-serif text-sm tracking-wide uppercase">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                className="text-slate-600 dark:text-slate-400 hover:text-pink-500 transition-colors" 
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Utility Icons */}
          <div className="flex items-center gap-6 text-pink-600 dark:text-pink-400">
            <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform">
              favorite
            </span>
            <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform">
              shopping_bag
            </span>
            <span className="material-symbols-outlined cursor-pointer border-b-2 border-pink-600 font-bold pb-1">
              account_circle
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}