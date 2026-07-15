// components/3d/HeroCanvas.tsx
//
// Simulation de tissu soyeux en Three.js — élément signature de la marque.
// Une grille de particules connectées par des ressorts imite un voile de soie
// qui réagit au mouvement de la souris. Référence aux textiles africains
// comme motif vivant et interactif.
//
// Rendu dans un <canvas> superposé en position absolute sur le hero.
// Désactivé via le prop `disabled` si reduced-motion est actif.

'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  /** Couleur primaire des fils (hex) */
  color?: string;
  /** Couleur secondaire / or (hex) */
  accentColor?: string;
  className?: string;
}

/* ----------------------------------------------------------------
 * Paramètres de la simulation
 * ---------------------------------------------------------------- */
const COLS        = 28;   // colonnes de la grille tissu
const ROWS        = 18;   // lignes
const REST_LENGTH = 0.22; // distance de repos entre particules
const STIFFNESS   = 0.35; // raideur des ressorts
const DAMPING     = 0.985;// amortissement de vélocité
const GRAVITY     = new THREE.Vector3(0, -0.00018, 0);
const MOUSE_RADIUS = 1.4; // rayon d'influence de la souris
const MOUSE_FORCE  = 0.012;

export function HeroCanvas({
  color       = '#C41352',
  accentColor = '#C9A84C',
  className   = '',
}: HeroCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const container = mountRef.current;
    if (!container) return;

    /* ---- Scène Three.js ---- */
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ---- Particules (grille 2D dans l'espace 3D) ---- */
    type Particle = {
      pos:     THREE.Vector3;
      prev:    THREE.Vector3;
      vel:     THREE.Vector3;
      pinned:  boolean;
    };

    const particles: Particle[][] = [];

    const totalW = (COLS - 1) * REST_LENGTH;
    const totalH = (ROWS - 1) * REST_LENGTH;

    for (let r = 0; r < ROWS; r++) {
      particles[r] = [];
      for (let c = 0; c < COLS; c++) {
        const x = c * REST_LENGTH - totalW / 2;
        const y = -r * REST_LENGTH + totalH / 2;
        const pos = new THREE.Vector3(x, y, 0);
        particles[r][c] = {
          pos,
          prev: pos.clone(),
          vel:  new THREE.Vector3(),
          /* Épingle les coins du bord supérieur */
          pinned: r === 0 && (c === 0 || c === COLS - 1 || c === Math.floor(COLS / 2)),
        };
      }
    }

    /* ---- Ressorts horizontaux et verticaux ---- */
    type Spring = { a: Particle; b: Particle; rest: number };
    const springs: Spring[] = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (c < COLS - 1) springs.push({ a: particles[r][c], b: particles[r][c + 1], rest: REST_LENGTH });
        if (r < ROWS - 1) springs.push({ a: particles[r][c], b: particles[r + 1][c], rest: REST_LENGTH });
        /* Diagonales pour plus de stabilité */
        if (c < COLS - 1 && r < ROWS - 1) {
          springs.push({ a: particles[r][c], b: particles[r + 1][c + 1], rest: REST_LENGTH * Math.SQRT2 });
          springs.push({ a: particles[r + 1][c], b: particles[r][c + 1], rest: REST_LENGTH * Math.SQRT2 });
        }
      }
    }

    /* ---- Géométrie LineSegments (tissu = grille de lignes) ---- */
    const lineCount  = (ROWS * (COLS - 1)) + ((ROWS - 1) * COLS);
    const positions  = new Float32Array(lineCount * 6); // 2 verts × 3 composantes
    const lineGeo    = new THREE.BufferGeometry();
    const posAttr    = new THREE.BufferAttribute(positions, 3);
    lineGeo.setAttribute('position', posAttr);

    /* Dégradé de couleur : or → rose selon l'index du fil */
    const colorsArr  = new Float32Array(lineCount * 6);
    const colorAttr  = new THREE.BufferAttribute(colorsArr, 3);
    lineGeo.setAttribute('color', colorAttr);

    const cPrimary = new THREE.Color(color);
    const cAccent  = new THREE.Color(accentColor);

    const mesh = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.55 })
    );
    scene.add(mesh);

    /* ---- Suivi souris ---- */
    const mouse3D = new THREE.Vector3(9999, 9999, 0);
    const raycaster = new THREE.Raycaster();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseMove = (e: MouseEvent) => {
      const rect  = container.getBoundingClientRect();
      const ndcX  = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      const ndcY  = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);
      raycaster.ray.intersectPlane(mousePlane, mouse3D);
    };

    window.addEventListener('mousemove', onMouseMove);

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

    /* ---- Boucle de simulation (Verlet integration) ---- */
    const tmp    = new THREE.Vector3();
    let frameId: number;

    const simulate = () => {
      /* 1. Appliquer gravité + influence souris */
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const p = particles[r][c];
          if (p.pinned) continue;

          p.vel.add(GRAVITY);

          /* Force souris — repousse les particules proches */
          tmp.copy(p.pos).sub(mouse3D);
          const dist = tmp.length();
          if (dist < MOUSE_RADIUS && dist > 0.001) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vel.addScaledVector(tmp.normalize(), MOUSE_FORCE * force);
          }

          /* Intégration Verlet */
          const newPos = p.pos.clone().addScaledVector(
            p.vel.clone().add(p.pos.clone().sub(p.prev)),
            DAMPING
          );
          p.prev.copy(p.pos);
          p.pos.copy(newPos);
        }
      }

      /* 2. Contraintes de ressorts (plusieurs itérations pour la rigidité) */
      for (let iter = 0; iter < 3; iter++) {
        for (const s of springs) {
          tmp.copy(s.b.pos).sub(s.a.pos);
          const len    = tmp.length();
          if (len < 0.0001) continue;
          const delta  = (len - s.rest) * STIFFNESS;
          const dir    = tmp.divideScalar(len).multiplyScalar(delta * 0.5);
          if (!s.a.pinned) s.a.pos.add(dir);
          if (!s.b.pinned) s.b.pos.sub(dir);
        }
      }

      /* 3. Mettre à jour la géométrie */
      let idx = 0;
      const setVert = (p: Particle, t: number) => {
        positions[idx * 3]     = p.pos.x;
        positions[idx * 3 + 1] = p.pos.y;
        positions[idx * 3 + 2] = p.pos.z;
        const col = cPrimary.clone().lerp(cAccent, t);
        colorsArr[idx * 3]     = col.r;
        colorsArr[idx * 3 + 1] = col.g;
        colorsArr[idx * 3 + 2] = col.b;
        idx++;
      };

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS - 1; c++) {
          const t = r / ROWS;
          setVert(particles[r][c],     t);
          setVert(particles[r][c + 1], t);
        }
      }
      for (let r = 0; r < ROWS - 1; r++) {
        for (let c = 0; c < COLS; c++) {
          const t = r / ROWS;
          setVert(particles[r][c],     t);
          setVert(particles[r + 1][c], t);
        }
      }

      posAttr.needsUpdate   = true;
      colorAttr.needsUpdate = true;
    };

    /* ---- Rendu ---- */
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      simulate();
      renderer.render(scene, camera);
    };
    animate();

    /* ---- Cleanup ---- */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize',    onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, accentColor]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
