import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * ROOM241 — Bouton de retour en haut de page.
 *
 * Minimaliste, accessible et discret :
 * - Invisible en haut de page (déclenchement après 400px de scroll)
 * - Retour fluide vers le haut avec respect de prefers-reduced-motion
 * - Accent subtil #FFAD00 et effet frosted glass
 * - Focus ring accessible et navigation clavier fluide
 */
export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retourner en haut de la page"
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border shadow-lg transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-room-amber focus-visible:ring-offset-2 focus-visible:ring-offset-room-bg ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-4 pointer-events-none scale-90'
      } bg-[#F9F9F8]/85 dark:bg-[#121214]/85 border-neutral-300/80 dark:border-white/15 hover:border-room-amber/60 dark:hover:border-room-amber/60 hover:shadow-xl hover:shadow-room-amber/10 hover:-translate-y-1 active:translate-y-0 active:scale-95`}
    >
      {/* Accent subtil #FFAD00 à l'état hover */}
      <span
        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-room-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />
      
      <ArrowUp
        className="w-4 h-4 text-neutral-700 dark:text-neutral-200 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-room-amber"
        aria-hidden="true"
      />
    </button>
  );
}
