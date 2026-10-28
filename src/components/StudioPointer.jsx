import React, { useEffect, useRef } from 'react';

/**
 * StudioPointer — Halo radial jaune chaud ambiant suivant le curseur.
 * - Lumière douce, diffuse et organique (#FFAD00), apportant texture et profondeur.
 * - Interpolation fluide via requestAnimationFrame (lerp 0.09) sans saccades.
 * - Désactivé sur mobile/tactile et sous prefers-reduced-motion.
 * - N'interfère jamais avec les clics (pointer-events-none).
 * - S'estompe automatiquement lorsque la visionneuse ou un modal est ouvert.
 */
export default function StudioPointer() {
  const haloRef = useRef(null);

  useEffect(() => {
    // Désactivation sur écrans tactiles ou préférence de réduction des mouvements
    if (
      typeof window === 'undefined' ||
      !window.matchMedia ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }

    const halo = haloRef.current;
    if (!halo) return;

    let targetX = -600;
    let targetY = -600;
    let currentX = -600;
    let currentY = -600;
    let rafId = null;
    let isVisible = false;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Si une visionneuse ou un modal verrouille le scroll du body, cacher le halo
      const isModalOpen = document.body.style.overflow === 'hidden';
      if (isModalOpen) {
        if (isVisible) {
          isVisible = false;
          halo.style.opacity = '0';
        }
        return;
      }

      if (!isVisible) {
        isVisible = true;
        halo.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      halo.style.opacity = '0';
    };

    const render = () => {
      // Vérification continue de l'état modal pour éviter tout halo sur la visionneuse
      if (document.body.style.overflow === 'hidden' && isVisible) {
        isVisible = false;
        halo.style.opacity = '0';
      }

      // Interpolation fluide et soyeuse (lerp 0.09)
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;

      halo.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={haloRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[520px] h-[520px] rounded-full pointer-events-none z-20 transition-opacity duration-300 opacity-0 mix-blend-multiply dark:mix-blend-screen"
      style={{
        background:
          'radial-gradient(circle, rgba(255, 173, 0, 0.08) 0%, rgba(255, 173, 0, 0.035) 40%, transparent 70%)',
        willChange: 'transform, opacity',
      }}
    />
  );
}
