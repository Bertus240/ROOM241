import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BadgesCarousel — Carrousel visuel des insignes de partenariat Hornetsecurity.
 * 
 * Conception & Fluidité :
 * - Défilement infini ultra-fluide 60/120 FPS via animation CSS GPU (aucune saccade, aucun saut).
 * - Pause naturelle au survol ou au toucher sans décrochage visuel.
 * - Format vectoriel d'origine respecté : aucune coupe, aucun étirement.
 * - Modale plein écran responsive avec zoom haute définition sans rognage.
 */
export default function BadgesCarousel() {
  const [modalIndex, setModalIndex] = useState(null);

  // Les 7 insignes officiels Hornetsecurity (sources réelles)
  const badges = [
    { id: 'plat', file: 'Platinum_partner.png', title: 'Platinum Partner', alt: 'Insigne officiel Platinum Partner Hornetsecurity' },
    { id: 'gold', file: 'Gold_partner.png', title: 'Gold Partner', alt: 'Insigne officiel Gold Partner Hornetsecurity' },
    { id: 'silv', file: 'Silver_partner.png', title: 'Silver Partner', alt: 'Insigne officiel Silver Partner Hornetsecurity' },
    { id: 'bron', file: 'Bronze_partner.png', title: 'Bronze Partner', alt: 'Insigne officiel Bronze Partner Hornetsecurity' },
    { id: 'vad',  file: 'Value_Added_Distributor.png', title: 'Value Added Distributor', alt: 'Insigne officiel Value Added Distributor Hornetsecurity' },
    { id: 'var',  file: 'Value_Added_Reseller.png', title: 'Value Added Reseller', alt: 'Insigne officiel Value Added Reseller Hornetsecurity' },
    { id: 'oem',  file: 'OEM_partner.png', title: 'OEM Partner', alt: 'Insigne officiel OEM Partner Hornetsecurity' },
  ];

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

  // Verrouillage du scroll en arrière-plan pendant la modale
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

  return (
    <div className="relative w-full py-4 select-none">
      {/* Style CSS dédié pour une animation marquee parfaitement fluide et sans à-coups */}
      <style>{`
        @keyframes badges-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .badges-marquee-track {
          display: flex;
          width: max-content;
          animation: badges-marquee 32s linear infinite;
          will-change: transform;
        }
        .group\\/carousel:hover .badges-marquee-track,
        .badges-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .badges-marquee-track {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>

      {/* Conteneur avec masques de fondu latéraux */}
      <div className="relative group/carousel overflow-hidden">
        {/* Dégradé d'estompage gauche parfaitement accordé au conteneur */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-zinc-50 via-zinc-50/85 to-transparent z-10" 
          aria-hidden="true"
        />

        {/* Dégradé d'estompage droit parfaitement accordé au conteneur */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-zinc-50 via-zinc-50/85 to-transparent z-10" 
          aria-hidden="true"
        />

        {/* Piste de défilement CSS sans saut ni réinitialisation */}
        <div className="badges-marquee-track py-3">
          {/* Répétition double pour continuité 100% parfaite (les copies sont purement décoratives pour l'accessibilité) */}
          {[...badges, ...badges].map((badge, idx) => {
            const originalIndex = idx % badges.length;
            const isDuplicate = idx >= badges.length;
            return (
              <div
                key={`${badge.id}-${idx}`}
                onClick={() => setModalIndex(originalIndex)}
                className="shrink-0 px-3 sm:px-4 cursor-pointer group/badge focus:outline-none"
                role={isDuplicate ? undefined : "button"}
                tabIndex={isDuplicate ? -1 : 0}
                aria-hidden={isDuplicate ? "true" : undefined}
                aria-label={isDuplicate ? undefined : `Agrandir l'insigne ${badge.title}`}
                onKeyDown={(e) => {
                  if (isDuplicate) return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setModalIndex(originalIndex);
                  }
                }}
              >
                <div className="relative flex flex-col items-center justify-between p-4 sm:p-4.5 w-44 sm:w-52 h-40 sm:h-44 rounded-2xl bg-white border border-zinc-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:border-[#FFAD00]/50 transition-all duration-300 transform group-hover/badge:-translate-y-1">
                  <div className="flex-1 w-full flex items-center justify-center min-h-0 pt-1">
                    <img
                      src={`/assets/hornetsecurity/Badges/${badge.file}`}
                      alt={badge.alt}
                      className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover/badge:scale-108 drop-shadow-sm"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-zinc-800 tracking-tight text-center truncate w-full pt-2 border-t border-zinc-100">
                    {badge.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODALE PLEIN ÉCRAN D'AGRANDISSEMENT DE L'INSIGNE (SANS ROGNAGE) */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {modalIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label="Agrandissement de l'insigne"
                className="fixed inset-0 z-[9999] w-screen h-screen bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none"
                onClick={() => setModalIndex(null)}
              >
                {/* Barre supérieure : Glass bar avec compteur et fermeture */}
                <div
                  className="flex items-center justify-between text-white text-xs w-full max-w-5xl mx-auto z-40 px-4 py-2.5 rounded-full bg-black/85 backdrop-blur-xl border border-white/20 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-white font-bold text-xs px-3 py-1 rounded-full bg-white/15 border border-white/20 tracking-wider">
                      {String(modalIndex + 1).padStart(2, '0')} <span className="text-[#FFAD00]">/</span> {String(badges.length).padStart(2, '0')}
                    </span>
                    <span className="text-white font-semibold text-xs sm:text-sm tracking-tight">
                      {badges[modalIndex].title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden md:inline-block text-[11px] text-zinc-300 font-mono">
                      Échap pour fermer • Flèches pour naviguer
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalIndex(null)}
                      className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white border border-white/25 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                      aria-label="Fermer la vue agrandie"
                    >
                      <X className="w-4 h-4 text-[#FFAD00]" />
                      <span>Fermer</span>
                    </button>
                  </div>
                </div>

                {/* Boutons de navigation latéraux */}
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

                {/* Zone centrale : Image pleine sans rognage, contenue dans le viewport restant */}
                <div
                  className="relative flex-1 min-h-0 w-full flex items-center justify-center px-6 sm:px-16 md:px-24 py-4 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={modalIndex}
                      src={`/assets/hornetsecurity/Badges/${badges[modalIndex].file}`}
                      alt={badges[modalIndex].alt}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                    />
                  </AnimatePresence>
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
