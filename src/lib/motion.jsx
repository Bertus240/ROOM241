import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * ROOM241 — Motion primitives & Parallax / Reveal System (zéro dépendance).
 *
 * Règles :
 * - Uniquement `transform` + `opacity` (60/120 FPS via GPU)
 * - Easing signature : cubic-bezier(0.16, 1, 0.3, 1)
 * - Respect de `prefers-reduced-motion`
 */

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const STAGGER_STEP = 50;

/** Helper stagger : `delay={stagger(idx)}` → 0, 50, 100… ms */
export function stagger(index, step = STAGGER_STEP) {
  return index * step;
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(REDUCED_QUERY).matches
  );
}

/**
 * Reveal — apparition subtile au scroll.
 */
export function Reveal({ as: Tag = 'div', children, delay = 0, className = '', onClick, onKeyDown, role, tabIndex, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={role}
      tabIndex={tabIndex}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * ParallaxBox — décalage vertical subtil lié au scroll pour créer un effet 3D doux.
 * @param {number} speed - vitesse relative (-0.08 à 0.08 recommandé pour rester subtil et luxueux)
 */
export function ParallaxBox({ children, speed = 0.05, className = '', as: Tag = 'div', ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight || 800;
            // Calcule la distance par rapport au centre de l'écran
            const offsetCenter = rect.top + rect.height / 2 - windowHeight / 2;
            const translateY = Math.round(offsetCenter * speed);
            el.style.transform = `translate3d(0, ${translateY}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return (
    <Tag ref={ref} className={className} style={{ willChange: 'transform' }} {...props}>
      {children}
    </Tag>
  );
}

/**
 * ImageShutterReveal — Découverte d'image avec volet d'ombre et zoom arrière subtil
 */
export function ImageShutterReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setRevealed(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`image-reveal-wrapper ${revealed ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * SpotCard — carte avec halo radial discret qui suit la souris.
 */
export function SpotCard({ as: Tag = 'div', children, className = '', ...props }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    cancelAnimationFrame(raf.current);
    const x = e.clientX;
    const y = e.clientY;
    raf.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--mx', `${x - rect.left}px`);
      ref.current.style.setProperty('--my', `${y - rect.top}px`);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spot-card${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
