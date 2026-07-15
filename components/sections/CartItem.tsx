// components/sections/CartItem.tsx
'use client';

import { Trash2, Minus, Plus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const formatFCFA = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';

export const CartItem = ({
  id,
  name,
  variant,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex gap-4 md:gap-6 p-4 md:p-6
                    bg-surface border border-outline-variant/20 rounded-2xl
                    hover:border-outline-variant/40 transition-colors duration-200">

      {/* Image */}
      <div className="w-24 h-28 md:w-28 md:h-36 shrink-0 bg-surface-container overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">

        {/* Nom + prix */}
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3
              className="text-on-surface leading-snug"
              style={{
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: 500,
              }}
            >
              {name}
            </h3>
            <p
              className="text-[11px] text-on-surface/45 mt-1"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              {variant}
            </p>
          </div>
          <p
            className="shrink-0 font-bold text-primary tabular-nums text-sm md:text-base"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            {formatFCFA(price * quantity)}
          </p>
        </div>

        {/* Quantité + supprimer */}
        <div className="flex items-center justify-between gap-3">

          {/* Sélecteur quantité */}
          <div className="flex items-center border border-outline-variant/40 rounded-xl overflow-hidden">
            <button
              onClick={() => quantity > 1 && onQuantityChange(id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Diminuer la quantité"
              className="w-9 h-9 flex items-center justify-center
                         text-on-surface/50 hover:text-primary hover:bg-surface-container
                         disabled:opacity-30 disabled:cursor-not-allowed
                         transition-colors duration-150"
            >
              <Minus size={13} strokeWidth={2} />
            </button>
            <span
              className="w-10 text-center text-sm font-semibold text-on-surface tabular-nums
                         border-x border-outline-variant/40"
            >
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              aria-label="Augmenter la quantité"
              className="w-9 h-9 flex items-center justify-center
                         text-on-surface/50 hover:text-primary hover:bg-surface-container
                         transition-colors duration-150"
            >
              <Plus size={13} strokeWidth={2} />
            </button>
          </div>

          {/* Prix unitaire sur mobile */}
          <span className="text-[11px] text-on-surface/40 hidden sm:block tabular-nums"
                style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}>
            {formatFCFA(price)} / pièce
          </span>

          {/* Supprimer */}
          <button
            onClick={() => onRemove(id)}
            aria-label="Retirer l'article"
            className="flex items-center gap-1.5 text-xs text-on-surface/40
                       hover:text-error transition-colors duration-150"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            <Trash2 size={13} strokeWidth={1.75} />
            <span className="hidden sm:inline">Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
