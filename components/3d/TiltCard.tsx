// components/3d/TiltCard.tsx
//
// Wrapper de carte avec effet tilt 3D magnétique au survol.
// Utilise transform CSS (pas de reflow) avec perspective.
// Désactivé sur pointer:coarse (touch) et reduced-motion.

'use client';

import { useRef, useCallback, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Intensité du tilt en degrés (défaut 12) */
  maxTilt?: number;
  /** Facteur de translation de la lumière spéculaire (défaut 20px) */
  glareSize?: number;
  /** Active le reflet lumineux */
  glare?: boolean;
}

export function TiltCard({
  children,
  className = '',
  maxTilt   = 12,
  glare     = true,
}: TiltCardProps) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);

  /* Calcule et applique le tilt dans un rAF pour ne jamais bloquer le rendu */
  const applyTilt = useCallback((rotX: number, rotY: number, glareX: number, glareY: number) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      }
      if (glare && glareRef.current) {
        glareRef.current.style.background =
          `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
      }
    });
  }, [glare]);

  const resetTilt = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform =
          'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      }
      if (glare && glareRef.current) {
        glareRef.current.style.background = 'transparent';
      }
    });
  }, [glare]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    /* Désactivé sur touch et reduced-motion */
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect   = e.currentTarget.getBoundingClientRect();
    const cx     = e.clientX - rect.left;
    const cy     = e.clientY - rect.top;
    const pctX   = cx / rect.width;   // 0→1
    const pctY   = cy / rect.height;

    /* rotateX : inclinaison verticale (souris en haut → penche vers l'arrière) */
    const rotX   = (pctY - 0.5) * -maxTilt;
    /* rotateY : inclinaison horizontale */
    const rotY   = (pctX - 0.5) * maxTilt;

    applyTilt(rotX, rotY, pctX * 100, pctY * 100);
  }, [maxTilt, applyTilt]);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={resetTilt}
      className={`relative will-change-transform transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Reflet lumineux spéculaire */}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
