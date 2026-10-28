import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

/**
 * BadgesCarousel — Carrousel horizontal visuel des insignes de partenariat Hornetsecurity.
 * 
 * Spécifications :
 * - Purement visuel : AUCUN libellé, texte, nom ou description dans le bandeau de défilement.
 * - Respect des proportions vectorielles : object-contain, pas de coupe ni d'étirement.
 * - Défilement fluide : utilisable au doigt (touch) sur mobile, à la souris/molette sur ordinateur.
 * - Défilement automatique doux avec pause immédiate au survol (hover) ou au toucher (touch).
 * - Respect strict de prefers-reduced-motion.
 * - Agrandissement au clic / tap : modal haute résolution épuré, centré, avec fermeture visible.
 */
export default function BadgesCarousel() {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Les 7 insignes officiels Hornetsecurity (sources réelles du projet)
  const badges = [
    { id: 'plat', file: 'Platinum_partner.png', alt: 'Insigne officiel Platinum Partner Hornetsecurity' },
    { id: 'gold', file: 'Gold_partner.png', alt: 'Insigne officiel Gold Partner Hornetsecurity' },
    { id: 'silv', file: 'Silver_partner.png', alt: 'Insigne officiel Silver Partner Hornetsecurity' },
    { id: 'bron', file: 'Bronze_partner.png', alt: 'Insigne officiel Bronze Partner Hornetsecurity' },
    { id: 'vad',  file: 'Value_Added_Distributor.png', alt: 'Insigne officiel Value Added Distributor Hornetsecurity' },
    { id: 'var',  file: 'Value_Added_Reseller.png', alt: 'Insigne officiel Value Added Reseller Hornetsecurity' },
    { id: 'oem',  file: 'OEM_partner.png', alt: 'Insigne officiel OEM Partner Hornetsecurity' },
  ];

  // Défilement automatique doux et régulier
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId;
    let lastTime = performance.now();
    const speed = 0.035; // Pixels par milliseconde (défilement très lent et discret)

    const step = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && !isInteracting && modalIndex === null && container) {
        container.scrollLeft += delta * speed;
        // Si on atteint la moitié du conteneur (effet boucle), on réinitialise discrètement
        if (container.scrollLeft >= (container.scrollWidth - container.clientWidth) - 2) {
          container.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, isInteracting, modalIndex]);

  // Clavier pour la vue agrandie
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

  // Verrouillage du scroll en arrière-plan quand la vue agrandie est ouverte
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

  const scrollLeftNav = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -260, behavior: 'smooth' });
    }
  };

  const scrollRightNav = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 260, behavior: 'smooth' });
    }
  };

  // Liste dupliquée pour assurer une boucle visuelle continue sans coupure
  const displayBadges = [...badges, ...badges];

  return (
    <div className="relative w-full py-4 select-none">
      
      {/* Conteneur du carrousel avec navigation et masque dégradé sur les bords */}
      <div 
        className="relative group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
      >
        {/* Dégradé estompeur gauche */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" 
          aria-hidden="true"
        />

        {/* Dégradé estompeur droit */}
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" 
          aria-hidden="true"
        />

        {/* Bouton flèche précédent (visible au survol sur desktop) */}
        <button
          type="button"
          onClick={scrollLeftNav}
          aria-label="Faire défiler les badges vers la gauche"
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-white/90 text-zinc-700 hover:text-black border border-zinc-200 shadow-md backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-105 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Bande de défilement horizontal */}
        <div
          ref={scrollContainerRef}
          role="region"
          aria-label="Carrousel visuel des insignes de partenariat"
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-3 px-6 sm:px-12 scroll-smooth cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {displayBadges.map((badge, idx) => {
            const originalIndex = idx % badges.length;
            return (
              <button
                key={`${badge.id}-${idx}`}
                type="button"
                onClick={() => setModalIndex(originalIndex)}
                aria-label={`${badge.alt} — Agrandir en haute définition`}
                className="group relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-zinc-50/90 hover:bg-white border border-zinc-200/90 hover:border-[#FFAD00]/50 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(255,173,0,0.12)] transition-all duration-300 flex items-center justify-center p-3 sm:p-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
              >
                {/* Icône de zoom discrète au survol */}
                <div 
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  aria-hidden="true"
                >
                  <Maximize2 className="w-3 h-3 text-[#FFAD00]" />
                </div>

                {/* Logo sans AUCUN texte visible */}
                <img
                  src={`/assets/hornetsecurity/Badges/${badge.file}`}
                  alt={badge.alt}
                  className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>

        {/* Bouton flèche suivant (visible au survol sur desktop) */}
        <button
          type="button"
          onClick={scrollRightNav}
          aria-label="Faire défiler les badges vers la droite"
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 items-center justify-center rounded-full bg-white/90 text-zinc-700 hover:text-black border border-zinc-200 shadow-md backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-all hover:scale-105 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Vue agrandie épurée (Lightbox haute résolution sans texte superflu) */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Agrandissement de l'insigne"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setModalIndex(null)}
          >
            {/* Barre supérieure : compteur et bouton fermer visible */}
            <div
              className="flex items-center justify-between text-white text-xs w-full max-w-4xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-300 text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">
                  {String(modalIndex + 1).padStart(2, '0')} / {String(badges.length).padStart(2, '0')}
                </span>
                <span className="text-zinc-300 font-medium">Insigne officiel</span>
              </div>

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

            {/* Zone centrale : Image en grand, centrée sans texte forcé */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 max-w-4xl mx-auto w-full select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Précédent */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalIndex((prev) => (prev - 1 + badges.length) % badges.length);
                }}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105 shadow-xl cursor-pointer"
                aria-label="Badge précédent"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="flex items-center justify-center p-6 sm:p-12 max-w-lg w-full">
                <motion.img
                  key={modalIndex}
                  src={`/assets/hornetsecurity/Badges/${badges[modalIndex].file}`}
                  alt={badges[modalIndex].alt}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[68vh] max-w-[85vw] sm:max-w-md w-auto h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Suivant */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalIndex((prev) => (prev + 1) % badges.length);
                }}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105 shadow-xl cursor-pointer"
                aria-label="Badge suivant"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Barre basse épurée */}
            <div className="text-center text-zinc-400 text-xs py-1" onClick={(e) => e.stopPropagation()}>
              <span className="font-mono text-zinc-400 text-[11px]">
                Hornetsecurity Partner Program · Graphisme vectoriel Adobe Illustrator
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

