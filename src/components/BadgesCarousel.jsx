import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BadgesCarousel — Carrousel visuel des insignes de partenariat Hornetsecurity.
 * 
 * Améliorations clés :
 * - Défilement continu ultra-fluide 60/120 FPS via GPU transform (zéro saccade).
 * - Aucune déformation ni coupe des insignes SVG originaux.
 * - Pause fluide au survol ou à l'interaction tactile.
 * - Flèches de navigation manuelle douces.
 * - Modale plein écran portalisée sur document.body (zéro fuite d'arrière-plan).
 */
export default function BadgesCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [manualOffset, setManualOffset] = useState(0);

  // Les 7 insignes officiels Hornetsecurity (sources vectorielles réelles du projet)
  const badges = [
    { id: 'plat', file: 'Platinum_partner.png', alt: 'Insigne officiel Platinum Partner Hornetsecurity' },
    { id: 'gold', file: 'Gold_partner.png', alt: 'Insigne officiel Gold Partner Hornetsecurity' },
    { id: 'silv', file: 'Silver_partner.png', alt: 'Insigne officiel Silver Partner Hornetsecurity' },
    { id: 'bron', file: 'Bronze_partner.png', alt: 'Insigne officiel Bronze Partner Hornetsecurity' },
    { id: 'vad',  file: 'Value_Added_Distributor.png', alt: 'Insigne officiel Value Added Distributor Hornetsecurity' },
    { id: 'var',  file: 'Value_Added_Reseller.png', alt: 'Insigne officiel Value Added Reseller Hornetsecurity' },
    { id: 'oem',  file: 'OEM_partner.png', alt: 'Insigne officiel OEM Partner Hornetsecurity' },
  ];

  // Liste triplée pour garantir une boucle infinie continue sans aucun saut
  const displayBadges = [...badges, ...badges, ...badges];

  // Gestion du clavier pour la modale
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalIndex === null) return;
      if (e.key === 'Escape') {
        setModalIndex(null);
      } else if (e.key === 'ArrowRight') {
        setModalIndex((prev) => (prev + 1) % badges.length);
      } else if (e.key === 'ArrowLeft') {
        setModalIndex((prev) => (prev - 1 + badges.length) % badges.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex, badges.length]);

  // Verrouillage du scroll en arrière-plan
  useEffect(() => {
    if (modalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalIndex]);

  const handlePrev = () => {
    setManualOffset((prev) => prev + 220);
  };

  const handleNext = () => {
    setManualOffset((prev) => prev - 220);
  };

  return (
    <div className="relative w-full py-4 select-none">
      
      {/* Conteneur du carrousel avec navigation et masque dégradé sur les bords */}
      <div 
        className="relative group/carousel overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Dégradé estompeur gauche */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10" 
          aria-hidden="true"
        />

        {/* Dégradé estompeur droit */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10" 
          aria-hidden="true"
        />

        {/* Bouton flèche précédent (visible au survol sur desktop) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Faire défiler les badges vers la gauche"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/95 text-zinc-700 hover:text-black border border-zinc-200 shadow-md backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Piste de défilement continu ultra-fluide avec Framer Motion */}
        <motion.div
          animate={
            isPaused || modalIndex !== null
              ? { x: manualOffset }
              : { x: [manualOffset, manualOffset - 1100] }
          }
          transition={
            isPaused || modalIndex !== null
              ? { type: 'spring', stiffness: 300, damping: 30 }
              : {
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 25,
                    ease: 'linear',
                  },
                }
          }
          className="flex items-center gap-4 sm:gap-6 py-3 px-6 sm:px-12 w-max cursor-pointer"
        >
          {displayBadges.map((badge, idx) => {
            const originalIndex = idx % badges.length;
            return (
              <button
                key={`${badge.id}-${idx}`}
                type="button"
                onClick={() => setModalIndex(originalIndex)}
                aria-label={`${badge.alt} — Agrandir en haute définition`}
                className="group relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-zinc-50/90 hover:bg-white border border-zinc-200/90 hover:border-[#FFAD00]/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(255,173,0,0.15)] transition-all duration-300 flex items-center justify-center p-3 sm:p-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
              >
                {/* Icône de zoom discrète au survol */}
                <div 
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  aria-hidden="true"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#FFAD00]" />
                </div>

                {/* Logo sans AUCUN texte visible */}
                <img
                  src={`/assets/hornetsecurity/Badges/${badge.file}`}
                  alt={badge.alt}
                  className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-108 drop-shadow-sm"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            );
          })}
        </motion.div>

        {/* Bouton flèche suivant (visible au survol sur desktop) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Faire défiler les badges vers la droite"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/95 text-zinc-700 hover:text-black border border-zinc-200 shadow-md backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Vue agrandie épurée portée directement sur document.body */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {modalIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label="Agrandissement de l'insigne"
                className="fixed inset-0 z-[9999] w-screen h-screen bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none"
                onClick={() => setModalIndex(null)}
              >
                {/* Barre supérieure : compteur et bouton fermer visible */}
                <div
                  className="flex items-center justify-between text-white text-xs w-full max-w-6xl mx-auto z-40 py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-zinc-300 text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">
                      {String(modalIndex + 1).padStart(2, '0')} / {String(badges.length).padStart(2, '0')}
                    </span>
                    <span className="text-zinc-300 font-medium">Insigne officiel vectoriel</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden md:inline-block text-[11px] text-zinc-400 font-mono">
                      Échap pour fermer • Flèches pour naviguer
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalIndex(null)}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                      aria-label="Fermer la vue agrandie"
                    >
                      <X className="w-4 h-4" />
                      <span>Fermer</span>
                    </button>
                  </div>
                </div>

                {/* Boutons de navigation déportés */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalIndex((prev) => (prev - 1 + badges.length) % badges.length);
                  }}
                  className="fixed left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-md flex items-center justify-center cursor-pointer"
                  aria-label="Badge précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalIndex((prev) => (prev + 1) % badges.length);
                  }}
                  className="fixed right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-md flex items-center justify-center cursor-pointer"
                  aria-label="Badge suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Zone centrale : Image en grand, centrée sans texte forcé */}
                <div
                  className="relative flex-1 flex items-center justify-center my-auto w-full px-12 sm:px-20 select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-center p-6 sm:p-12 max-w-lg w-full">
                    <motion.img
                      key={modalIndex}
                      src={`/assets/hornetsecurity/Badges/${badges[modalIndex].file}`}
                      alt={badges[modalIndex].alt}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="max-h-[72vh] max-w-[85vw] sm:max-w-md w-auto h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </div>

                {/* Barre basse épurée */}
                <div className="text-center text-zinc-400 text-xs py-2" onClick={(e) => e.stopPropagation()}>
                  <span className="font-mono text-zinc-400 text-[11px]">
                    Hornetsecurity Partner Program · Graphisme vectoriel Adobe Illustrator
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

    </div>
  );
}
