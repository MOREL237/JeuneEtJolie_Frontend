'use client';

import { useState } from 'react';
import { ShoppingBag, Trash2, Heart } from 'lucide-react';

interface WishlistItemProps {
  id: number;
  name: string;
  detail: string;
  price: number;
  image: string;
  onRemove?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

const formatFCFA = (n: number) =>
  n.toLocaleString('fr-FR') + ' FCFA';

export default function WishlistItem({
  id,
  name,
  detail,
  price,
  image,
  onRemove,
  onAddToCart,
}: WishlistItemProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
    onAddToCart?.(id);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex gap-4 items-start">
      {/* Image */}
      <a
        href="#"
        className="shrink-0 w-20 h-24 rounded-xl overflow-hidden bg-surface-container block"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </a>

      {/* Contenu */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 gap-2">
        <div className="min-w-0">
          <a href="#">
            <h4
              className="text-sm font-medium text-on-surface hover:text-primary transition-colors truncate"
              style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: '1rem' }}
            >
              {name}
            </h4>
          </a>
          <p
            className="text-[11px] text-on-surface/45 mt-0.5 truncate"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {detail}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span
            className="text-sm font-bold text-on-surface tabular-nums"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {formatFCFA(price)}
          </span>

          <div className="flex items-center gap-1">
            {/* Supprimer */}
            <button
              onClick={() => onRemove?.(id)}
              aria-label="Retirer de la wishlist"
              className="w-8 h-8 rounded-full flex items-center justify-center
                         text-on-surface/30 hover:text-error hover:bg-error/10
                         transition-all duration-200"
            >
              <Trash2 size={13} strokeWidth={1.75} />
            </button>

            {/* Ajouter au panier */}
            <button
              onClick={handleAddToCart}
              aria-label="Ajouter au panier"
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold
                transition-all duration-200
                ${added
                  ? 'bg-gold/15 text-gold'
                  : 'bg-primary text-on-primary hover:bg-primary/90'
                }
              `}
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {added
                ? <><Heart size={11} className="fill-current" /> Ajouté</>
                : <><ShoppingBag size={11} /> Panier</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
