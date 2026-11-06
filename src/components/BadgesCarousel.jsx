import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BadgesCarousel — Carrousel horizontal visuel des insignes de partenariat Hornetsecurity.
 * 
 * Spécifications historiques fidèlement reproduites :
 * - Sept badges originaux.
 * - Une seule ligne horizontale.
 * - Défilement continu fluide (GPU transform 60/120 FPS).
 * - Aucun texte, aucune légende, aucun titre dans le bandeau.
 * - Images seules, avec leurs proportions d'origine (object-contain).
 * - Boucle fluide et sans rupture.
 * - Rendu transversal, premium et responsive.
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
          animation: badges-marquee 30s linear infinite;
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
        {/* Dégradé d'estompage gauche parfaitement accordé au conteneur blanc */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/85 to-transparent z-10" 
          aria-hidden="true"
        />

        {/* Dégradé d'estompage droit parfaitement accordé au conteneur blanc */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/85 to-transparent z-10" 
          aria-hidden="true"
        />

        {/* Piste de défilement CSS continue sur une seule ligne */}
        <div className="badges-marquee-track py-3">
          {/* Répétition double pour continuité 100% parfaite sans saut */}
          {[...badges, ...badges].map((badge, idx) => {
            const originalIndex = idx % badges.length;
            const isDuplicate = idx >= badges.length;
            return (
              <button
                key={`${badge.id}-${idx}`}
                type="button"
                onClick={() => setModalIndex(originalIndex)}
                className="group/badge relative shrink-0 mx-2.5 sm:mx-3.5 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-zinc-50/90 hover:bg-white border border-zinc-200/90 hover:border-[#FFAD00]/50 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(255,173,0,0.12)] transition-all duration-300 flex items-center justify-center p-3 sm:p-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                role={isDuplicate ? undefined : "button"}
                tabIndex={isDuplicate ? -1 : 0}
                aria-hidden={isDuplicate ? "true" : undefined}
                aria-label={isDuplicate ? undefined : `${badge.alt} — Agrandir en haute définition`}
              >
                {/* Icône de zoom discrète au survol */}
                <div 
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/80 text-[#FFAD00] opacity-0 group-hover/badge:opacity-100 transition-opacity shadow-xs"
                  aria-hidden="true"
                >
                  <Maximize2 className="w-3 h-3" />
                </div>

                {/* Image seule, avec ses proportions d'origine : AUCUN texte ni légende */}
                <img
                  src={`/assets/hornetsecurity/Badges/${badge.file}`}
                  alt={badge.alt}
                  className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover/badge:scale-108 drop-shadow-sm select-none pointer-events-none"
                  loading="lazy"
                />
              </button>
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
