import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * MochiAvatar — Le compagnon créatif emblématique de Studio ROOM241
 * 
 * Sphère vitrée sombre (#09090B), reflets spéculaires haute fidélité,
 * halo ambré (#FFAD00), yeux expressifs avec suivi pupillaire dynamique,
 * clignements naturels et respiration organique.
 */
export default function MochiAvatar({
  size = 'md', // 'sm' (36px) | 'md' (56px) | 'lg' (88px) | 'xl' (110px)
  reaction = 0, // incrémenter pour déclencher une micro-impulsion corporelle
  interactive = true, // active le suivi oculaire du curseur
  className = '',
  onClick = null,
}) {
  const containerRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Détection du mode mouvement réduit
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);
      const listener = (e) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // Clignement naturel périodique (toutes les ~4.2s, durée 120ms)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let blinkTimeout = null;
    const scheduleBlink = () => {
      const delay = 3500 + Math.random() * 2000;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 120);
      }, delay);
    };

    scheduleBlink();
    return () => {
      if (blinkTimeout) clearTimeout(blinkTimeout);
    };
  }, [prefersReducedMotion]);

  // Suivi oculaire du curseur / touch
  useEffect(() => {
    if (!interactive || prefersReducedMotion) return;

    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < 1) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }

      // Ampleur maximale selon la taille
      const maxOffset = size === 'xl' ? 4.5 : size === 'lg' ? 3.5 : size === 'md' ? 2.5 : 1.5;
      const normalizedDist = Math.min(distance / 300, 1);
      const offsetX = (deltaX / distance) * normalizedDist * maxOffset;
      const offsetY = (deltaY / distance) * normalizedDist * maxOffset;

      setEyeOffset({
        x: Math.round(offsetX * 10) / 10,
        y: Math.round(offsetY * 10) / 10,
      });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [interactive, size, prefersReducedMotion]);

  // Dimensions adaptatives selon la taille
  const dimMap = {
    sm: {
      container: 'w-9 h-9',
      eyeW: 'w-2 h-3',
      pupil: 'w-1.5 h-1.5',
      pupilReflect: 'w-[1px] h-[1px]',
      gap: 'gap-1',
    },
    md: {
      container: 'w-14 h-14',
      eyeW: 'w-3 h-4',
      pupil: 'w-2 h-2',
      pupilReflect: 'w-[1.5px] h-[1.5px]',
      gap: 'gap-1.5',
    },
    lg: {
      container: 'w-20 h-20 sm:w-24 sm:h-24',
      eyeW: 'w-4 h-5 sm:w-4.5 sm:h-6',
      pupil: 'w-2.5 h-2.5 sm:w-3 sm:h-3',
      pupilReflect: 'w-[2px] h-[2px]',
      gap: 'gap-2 sm:gap-2.5',
    },
    xl: {
      container: 'w-24 h-24 sm:w-28 sm:h-28',
      eyeW: 'w-5 h-6.5 sm:w-6 sm:h-7.5',
      pupil: 'w-3 h-3 sm:w-3.5 sm:h-3.5',
      pupilReflect: 'w-[2.5px] h-[2.5px]',
      gap: 'gap-2.5 sm:gap-3',
    },
  };

  const currentDim = dimMap[size] || dimMap.md;

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : -1}
      aria-label="Mochi, le guide interactif de Studio ROOM241"
      className={`relative ${currentDim.container} flex items-center justify-center shrink-0 select-none ${
        onClick ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] rounded-full' : ''
      } ${className}`}
    >
      {/* Halo ambré doux réagissant à l'état et à la respiration */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.14, 1],
                opacity: isHovered ? [0.4, 0.7, 0.4] : [0.18, 0.35, 0.18],
              }
        }
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -inset-2 sm:-inset-3 rounded-full bg-gradient-to-tr from-[#FFAD00]/40 to-transparent blur-md pointer-events-none"
        aria-hidden="true"
      />

      {/* Corps sphérique vitré de Mochi */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : reaction > 0
            ? {
                scale: [1, 1.12, 0.95, 1],
                y: [0, -5, 1, 0],
              }
            : {
                scale: isHovered ? 1.05 : [1, 1.035, 1],
                y: isHovered ? -1.5 : [0, -2, 0],
              }
        }
        transition={
          reaction > 0
            ? { duration: 0.42, ease: [0.16, 1, 0.3, 1] }
            : {
                duration: 4.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className="relative w-full h-full rounded-full bg-[#09090B] flex items-center justify-center border border-white/25 shadow-[0_12px_28px_rgba(0,0,0,0.45),inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-4px_10px_rgba(255,173,0,0.35)]"
      >
        {/* Reflet spéculaire supérieur courbe de verre */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 32% 24%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.2) 28%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        {/* Halo ambré réfléchi au bas de la sphère */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 92%, rgba(255, 173, 0, 0.35) 0%, transparent 45%)',
          }}
          aria-hidden="true"
        />

        {/* Les deux yeux expressifs avec sclérotique et pupille mobile */}
        <div
          className={`flex items-center ${currentDim.gap} pointer-events-none z-10 -translate-y-0.5`}
          aria-hidden="true"
        >
          {/* Œil gauche */}
          <div
            className={`relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner ${currentDim.eyeW}`}
            style={{
              transform: isBlinking ? 'scaleY(0.12)' : 'scaleY(1)',
              transition: 'transform 0.1s ease-out',
              transformOrigin: 'center',
            }}
          >
            <div
              className={`rounded-full bg-[#09090B] relative ${currentDim.pupil}`}
              style={{
                transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <span
                className={`absolute rounded-full bg-white top-[15%] left-[15%] ${currentDim.pupilReflect}`}
              />
            </div>
          </div>

          {/* Œil droit */}
          <div
            className={`relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner ${currentDim.eyeW}`}
            style={{
              transform: isBlinking ? 'scaleY(0.12)' : 'scaleY(1)',
              transition: 'transform 0.1s ease-out',
              transformOrigin: 'center',
            }}
          >
            <div
              className={`rounded-full bg-[#09090B] relative ${currentDim.pupil}`}
              style={{
                transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <span
                className={`absolute rounded-full bg-white top-[15%] left-[15%] ${currentDim.pupilReflect}`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

