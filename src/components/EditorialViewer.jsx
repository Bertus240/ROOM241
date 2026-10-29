import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, MapPin, Play } from 'lucide-react';

/**
 * EditorialViewer — Visionneuse de médias haut de gamme ROOM241
 * 
 * Expérience éditoriale sombre (darkroom), typographie raffinée, respect des ratios naturels,
 * navigation reliée au média, zoom haute résolution contrôlé et rail de miniatures fluide.
 */
export default function EditorialViewer({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onIndexChange,
  projectContext = "ROOM241 • Galerie éditoriale"
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const mediaContainerRef = useRef(null);

  // Verrouillage du scroll en arrière-plan
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Réinitialisation du zoom à chaque changement de média
  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex, isOpen]);

  // Navigation circulaire sécurisée
  const goToNext = useCallback(() => {
    if (!items || items.length === 0) return;
    setIsZoomed(false);
    const nextIdx = (currentIndex + 1) % items.length;
    if (onIndexChange) onIndexChange(nextIdx);
  }, [currentIndex, items, onIndexChange]);

  const goToPrev = useCallback(() => {
    if (!items || items.length === 0) return;
    setIsZoomed(false);
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    if (onIndexChange) onIndexChange(prevIdx);
  }, [currentIndex, items, onIndexChange]);

  // Écoute des raccourcis clavier (Échap, Flèche Gauche, Flèche Droite)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isZoomed) {
          setIsZoomed(false);
        } else if (onClose) {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, goToNext, goToPrev, onClose]);

  // Gestion des gestes tactiles (swipe gauche / droite sur mobile)
  const handleTouchStart = (e) => {
    if (isZoomed) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (isZoomed || touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  if (!isOpen || !items || items.length === 0) return null;

  const currentItem = items[currentIndex] || items[0];
  const totalCount = items.length;
  const currentTitle = currentItem.title || currentItem.caption || currentItem.alt || "Photographie";
  const currentDesc = currentItem.description || currentItem.caption || "";
  const currentBadge = currentItem.badge || currentItem.category || currentItem.place || "";

  const viewerContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={currentTitle}
          style={{ backgroundColor: 'rgba(9, 9, 11, 0.98)' }}
          className="fixed inset-0 z-[99999] w-screen h-screen backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-5 md:p-6 select-none overflow-hidden text-white"
          onClick={() => {
            if (isZoomed) setIsZoomed(false);
            else if (onClose) onClose();
          }}
        >
          {/* ========================================================
              ZONE 1 : EN-TÊTE ÉDITORIAL — Index, Contexte, Fermeture
             ======================================================== */}
          <div
            className="flex items-center justify-between text-white text-xs w-full max-w-6xl mx-auto z-40 pb-3 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
              <span className="shrink-0 font-mono text-xs font-bold text-[#FFAD00] tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
                {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
              </span>

              <span aria-hidden="true" className="text-zinc-600">
                |
              </span>

              <span className="hidden min-w-0 truncate text-xs font-medium text-zinc-300 sm:inline">
                {projectContext} {currentBadge ? `• ${currentBadge}` : ""}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden font-mono text-[11px] text-zinc-400 md:inline">
                Échap pour fermer • Flèches pour naviguer
              </span>

              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la visionneuse"
                className="rounded-full bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] shadow-sm hover:scale-105 active:scale-95"
              >
                <span>Fermer</span>
                <X className="w-3.5 h-3.5 text-zinc-300" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* ========================================================
              ZONE 2 : SCÈNE PRINCIPALE — Média & Commandes reliées
             ======================================================== */}
          <div
            ref={mediaContainerRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={(e) => e.stopPropagation()}
            className={`relative flex min-h-0 w-full flex-1 items-center justify-center p-2 sm:p-4 my-2 transition-all ${
              isZoomed
                ? 'overflow-auto max-h-[66vh] cursor-grab active:cursor-grabbing'
                : 'overflow-hidden max-h-[58vh] sm:max-h-[62vh]'
            }`}
          >
            {/* Contrôle de zoom haute résolution discret */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 hover:bg-black text-zinc-200 hover:text-white text-xs font-medium border border-white/20 shadow-xl backdrop-blur-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
              aria-label={isZoomed ? "Réinitialiser la vue normale" : "Agrandir à 100%"}
            >
              {isZoomed ? (
                <ZoomOut className="w-3.5 h-3.5 text-[#FFAD00]" />
              ) : (
                <ZoomIn className="w-3.5 h-3.5 text-[#FFAD00]" />
              )}
              <span className="hidden sm:inline font-mono text-[11px]">
                {isZoomed ? "Ajuster" : "Agrandir 100%"}
              </span>
            </button>

            {/* Bouton Précédent connecté au média */}
            {totalCount > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                aria-label="Média précédent"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Bouton Suivant connecté au média */}
            {totalCount > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Média suivant"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Affichage du média avec respect rigoureux des proportions */}
            <AnimatePresence mode="wait">
              {currentItem.type === 'video' ? (
                <motion.video
                  key={currentItem.src}
                  src={currentItem.src}
                  controls
                  autoPlay
                  playsInline
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="max-h-[54vh] sm:max-h-[58vh] max-w-full w-auto h-auto rounded-xl sm:rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] object-contain"
                />
              ) : (
                <motion.img
                  key={currentItem.src}
                  src={currentItem.src}
                  alt={currentItem.alt || currentTitle}
                  style={currentItem.straighten ? { transform: 'rotate(-0.85deg) scale(1.035)' } : undefined}
                  initial={{ opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    isZoomed
                      ? "block max-w-none max-h-none rounded-xl sm:rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                      : "block max-h-[54vh] sm:max-h-[58vh] max-w-full w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                  }
                />
              )}
            </AnimatePresence>
          </div>

          {/* ========================================================
              ZONE 3 : LÉGENDE ÉDITORIALE INDÉPENDANTE (SOUS LE MÉDIA)
             ======================================================== */}
          <div
            className="w-full max-w-4xl mx-auto px-2 pt-1 pb-1 z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg text-white tracking-tight truncate sm:whitespace-normal">
                  {currentTitle}
                </h3>
                {currentDesc && currentDesc !== currentTitle && (
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-0.5 line-clamp-2 sm:line-clamp-none">
                    {currentDesc}
                  </p>
                )}
              </div>

              {currentItem.place && (
                <div className="shrink-0 flex items-center gap-1.5 text-zinc-400 text-xs font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#FFAD00]" />
                  <span>{currentItem.place}</span>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================
              ZONE 4 : RAIL DE NAVIGATION — MINIATURES HORIZONTALES
             ======================================================== */}
          {totalCount > 1 && (
            <div
              className="flex w-full min-w-0 items-center justify-center gap-2 overflow-x-auto overflow-y-hidden border-t border-white/10 pt-2.5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-5xl mx-auto z-40"
              onClick={(e) => e.stopPropagation()}
            >
              {items.map((item, idx) => {
                const isActive = idx === currentIndex;
                const isVideo = item.type === 'video' || (item.src && item.src.endsWith('.mp4'));
                const thumb = item.thumbUrl || (!isVideo ? item.src : null);
                return (
                  <button
                    key={item.id || idx}
                    type="button"
                    onClick={() => {
                      setIsZoomed(false);
                      if (onIndexChange) onIndexChange(idx);
                    }}
                    aria-label={`Afficher le média ${idx + 1} : ${item.title || item.caption || item.alt || ""}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative h-11 w-15 sm:h-12 sm:w-18 shrink-0 overflow-hidden rounded-lg border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] ${
                      isActive
                        ? 'border-[#FFAD00] ring-2 ring-[#FFAD00]/40 scale-105 opacity-100 shadow-md'
                        : 'border-white/20 opacity-50 hover:opacity-90 hover:border-white/40'
                    }`}
                  >
                    {thumb ? (
                      <img
                        src={thumb}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-[#FFAD00]">
                        <Play className="w-4 h-4 fill-[#FFAD00]/30" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(viewerContent, document.body) : null;
}
