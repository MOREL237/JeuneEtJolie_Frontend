// components/layout/CustomCursor.tsx
//
// Curseur personnalisé double-cercle animé avec GSAP.
// Désactivé sur mobile (pointer: coarse) et en reduced-motion.
// Le curseur intérieur suit la souris instantanément ;
// l'anneau extérieur suit avec un léger lag (effet magnétique).

'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Désactivé sur écrans tactiles et en reduced-motion */
    const isTouch        = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* Position lissée de l'anneau (lerp) */
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId: number;

    const LERP = 0.12; // facteur d'interpolation — plus petit = plus de lag

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      /* Dot suit instantanément */
      dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%)) scale(1)`;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%)) scale(1)`;
      rafId = requestAnimationFrame(loop);
    };

    /* Grandir l'anneau sur les éléments interactifs */
    const onEnterInteractive = () => {
      dot.style.transform  = dot.style.transform.replace('scale(1)', 'scale(2)');
      ring.style.opacity   = '0.3';
      ring.style.borderColor = 'var(--gold)';
    };
    const onLeaveInteractive = () => {
      dot.style.transform  = dot.style.transform.replace('scale(2)', 'scale(1)');
      ring.style.opacity   = '0.6';
      ring.style.borderColor = 'var(--primary)';
    };

    /* Masquer quand la souris quitte la fenêtre */
    const onLeave  = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter  = () => { dot.style.opacity = '1'; ring.style.opacity = '0.6'; };

    const interactives = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], input, select, textarea, label'
    );

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  id="jj-cursor"      aria-hidden="true" />
      <div ref={ringRef} id="jj-cursor-ring" aria-hidden="true" />
    </>
  );
}
