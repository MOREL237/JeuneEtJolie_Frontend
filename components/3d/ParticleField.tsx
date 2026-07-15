// components/3d/ParticleField.tsx
//
// Champ de particules ambiant — constellation dorée en fond de page.
// Rendu Three.js léger : Points + BufferGeometry, pas de physique lourde.
// Chaque particule orbite lentement pour créer une atmosphère vivante.
// Désactivé si reduced-motion est actif.

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?:    number;
  color?:    string;
  /** Opacité globale du canvas (0-1) */
  opacity?:  number;
  className?: string;
}

export function ParticleField({
  count    = 120,
  color    = '#C9A84C',
  opacity  = 0.4,
  className = '',
}: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const container = mountRef.current;
    if (!container) return;

    /* ---- Scène ---- */
    const scene    = new THREE.Scene();
    const W        = container.clientWidth;
    const H        = container.clientHeight;
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ---- Particules ---- */
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3); // petites orbites aléatoires
    const phases     = new Float32Array(count);      // phase individuelle

    for (let i = 0; i < count; i++) {
      /* Position initiale aléatoire dans un volume 3D */
      positions[i * 3]     = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      /* Vélocité orbitale légère */
      velocities[i * 3]     = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = 0;

      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo     = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    geo.setAttribute('position', posAttr);

    const mat = new THREE.PointsMaterial({
      color:        new THREE.Color(color),
      size:         0.14,
      sizeAttenuation: true,
      transparent:  true,
      opacity,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ---- Lignes de connexion entre particules proches ---- */
    const MAX_CONN_DIST = 6;
    const linePositions = new Float32Array(count * count * 6);
    const lineGeo       = new THREE.BufferGeometry();
    const linePosAttr   = new THREE.BufferAttribute(linePositions, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute('position', linePosAttr);

    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity: opacity * 0.4 })
    );
    scene.add(lines);

    /* ---- Resize ---- */
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ---- Scroll parallax léger ---- */
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---- Boucle d'animation ---- */
    let frameId: number;
    let t = 0;
    const tmpA = new THREE.Vector3();
    const tmpB = new THREE.Vector3();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.004;

      /* Mouvement orbital de chaque particule */
      for (let i = 0; i < count; i++) {
        const ph = phases[i];
        positions[i * 3]     += velocities[i * 3]     + Math.sin(t + ph) * 0.0008;
        positions[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(t + ph * 1.3) * 0.0006;

        /* Rebond sur les bords */
        if (Math.abs(positions[i * 3])     > 26) velocities[i * 3]     *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 16) velocities[i * 3 + 1] *= -1;
      }
      posAttr.needsUpdate = true;

      /* Parallax subtil de la scène entière */
      points.position.y = -scrollY * 0.004;
      lines.position.y  = points.position.y;

      /* Connexions entre particules proches */
      let lineIdx = 0;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          tmpA.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          tmpB.set(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
          if (tmpA.distanceTo(tmpB) < MAX_CONN_DIST) {
            linePositions[lineIdx++] = tmpA.x;
            linePositions[lineIdx++] = tmpA.y;
            linePositions[lineIdx++] = tmpA.z;
            linePositions[lineIdx++] = tmpB.x;
            linePositions[lineIdx++] = tmpB.y;
            linePositions[lineIdx++] = tmpB.z;
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx / 3);
      linePosAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      renderer.dispose();
      geo.dispose();
      lineGeo.dispose();
      mat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [count, color, opacity]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
