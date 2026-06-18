'use client';

interface LookCardProps {
  id: string;
  number: string;
  title: string;
  image: string;
}

export const LookCard = ({ number, title, image }: LookCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
        <span className="text-4xl md:text-5xl font-bold opacity-50 mb-2 block">
          {number}
        </span>
        <h3 className="text-xl md:text-2xl font-headline-md mb-4">
          {title}
        </h3>
        <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-pink-50 transition-colors flex items-center gap-2">
          Découvrir
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default LookCard;
