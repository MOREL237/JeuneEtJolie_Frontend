export default function CheckoutHeader() {
  return (
    <header className="bg-surface/95 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant shadow-sm">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-20 py-4 md:py-6 flex justify-center items-center">
        <span 
          className="text-2xl md:text-3xl font-light tracking-widest"
          style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)' }}
        >
          Jeune & Jolie
        </span>
      </div>
    </header>
  );
}