import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, ArrowRight, Sparkles, Compass } from 'lucide-react';

/**
 * Kuro (ex-Mochi) — Compagnon interactif et créatif du studio ROOM241.
 * 
 * Fonctionnalités majeures :
 * 1. Arrivée au centre de l'écran avec fond flouté au premier chargement :
 *    - Kuro se présente, explique brièvement le portfolio et la démarche.
 *    - Un clic sur « Découvrir le portfolio » l'envoie fluidement se nicher dans son coin (bottom-6 left-6).
 * 2. Compagnon discret en coin :
 *    - Corps 3D organique en capsule noire avec reflets satinés et lueur ambrée.
 *    - Yeux expressifs avec suivi oculaire du curseur, clignement naturel et expressions de joie.
 *    - Bulles de parole contextuelles courtes et éditoriales selon la section scrollée.
 *    - Bouton pour réinvoquer la présentation au centre à tout moment.
 *    - Retrait discret automatique lorsqu'une modale est ouverte.
 */

// Phrases de présentation éditoriales
const CONTEXT_MESSAGES = {
  home: {
    key: 'home',
    text: "Je t'accompagne dans la découverte des projets de Rémi. N'hésite pas à explorer !",
    title: "Bienvenue sur le portfolio"
  },
  hornetsecurity: {
    key: 'hornetsecurity',
    text: "Ici, il y a du graphisme, du motion design et du concret sur le terrain.",
    title: "Hornetsecurity • Salons européens"
  },
  captain: {
    key: 'captain',
    text: "Le design ne s'arrête pas à l'écran : il prend aussi vie sur les salons et stands.",
    title: "Captain Security • Présence terrain"
  },
  helix: {
    key: 'helix',
    text: "36 heures pour imaginer un personnage 3D, écrire son histoire et réaliser un teaser.",
    title: "Helix Nova • Sprint de Hanovre"
  },
  freshdata: {
    key: 'freshdata',
    text: "Un univers graphique pensé pour accompagner un projet jusqu'à son financement Ulule.",
    title: "Fresh Data • Financement Ulule"
  },
  resin: {
    key: 'resin',
    text: "L'identité visuelle se déploie sur les réseaux, les supports commerciaux et sur les chantiers.",
    title: "Résin'Architecte • Sur le terrain"
  },
  parcours: {
    key: 'parcours',
    text: "Un pied dans la technique, l'autre dans la communication : c'est ce qui façonne ma vision.",
    title: "Parcours • Double profil"
  }
};

export default function Kuro() {
  const kuroRef = useRef(null);
  const controls = useAnimation();

  // États visuels et interactifs
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État de présentation centrale au premier chargement
  const [isCenterStage, setIsCenterStage] = useState(() => {
    if (typeof window === 'undefined') return false;
    const welcomed = sessionStorage.getItem('room241_kuro_welcomed');
    return welcomed !== 'true';
  });

  // Système de bulles contextuelles en coin
  const [activeMessage, setActiveMessage] = useState(null);
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const seenSectionsRef = useRef(new Set());
  const autoCloseTimerRef = useRef(null);

  // Détection prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Détection d'ouverture d'une modale pour mettre Kuro en retrait
  useEffect(() => {
    const checkModal = () => {
      const isLocked = document.body.style.overflow === 'hidden';
      // Ne pas considérer Kuro lui-même comme une modale bloquante
      if (!isCenterStage) {
        setIsModalOpen(isLocked);
      }
    };
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, [isCenterStage]);

  // Suivi du regard oculaire vers le curseur de la souris
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    const handleMouseMove = (e) => {
      if (!kuroRef.current && !isCenterStage) return;

      let rect;
      if (isCenterStage) {
        rect = { left: window.innerWidth / 2, top: window.innerHeight / 2 };
      } else if (kuroRef.current) {
        rect = kuroRef.current.getBoundingClientRect();
      } else {
        return;
      }

      const centerX = rect.left + 20;
      const centerY = rect.top + 20;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.hypot(deltaX, deltaY);

      if (dist === 0) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }

      const maxRadius = isCenterStage ? 4.5 : 2.5;
      const angle = Math.atan2(deltaY, deltaX);
      const intensity = Math.min(dist / 300, 1) * maxRadius;

      setEyeOffset({
        x: Math.cos(angle) * intensity,
        y: Math.sin(angle) * intensity,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, isCenterStage]);

  // Clignement périodique naturel des yeux
  useEffect(() => {
    if (prefersReducedMotion) return;

    let timeoutId;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        const nextBlink = 3000 + Math.random() * 3500;
        timeoutId = setTimeout(triggerBlink, nextBlink);
      }, 160);
    };

    timeoutId = setTimeout(triggerBlink, 2500);
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  // Fermeture de la présentation centrale et atterrissage dans le coin
  const handleDismissCenter = () => {
    sessionStorage.setItem('room241_kuro_welcomed', 'true');
    setIsCenterStage(false);
    setIsHappy(true);

    // Petit saut de joie à l'arrivée dans le coin
    setTimeout(() => {
      controls.start({
        y: [0, -14, 0],
        rotate: [0, -6, 6, 0],
        scale: [1, 1.15, 1],
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      });
    }, 300);

    // Bulle de bienvenue discrète en coin
    setTimeout(() => {
      setIsHappy(false);
      setActiveMessage({
        key: 'welcome_docked',
        title: 'Kuro est à vos côtés',
        text: "C'est parti ! Retrouvez-moi ici à tout moment pour des détails sur les projets.",
      });
      setIsBubbleOpen(true);

      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = setTimeout(() => {
        setIsBubbleOpen(false);
      }, 5500);
    }, 1000);
  };

  // Réouverture de la présentation centrale
  const handleSummonCenter = () => {
    setIsBubbleOpen(false);
    setIsCenterStage(true);
  };

  // Clic sur Kuro dans son coin
  const handleCornerClick = () => {
    setIsHappy(true);
    controls.start({
      scale: [1, 1.25, 0.95, 1.05, 1],
      rotate: [0, -8, 8, -4, 0],
      transition: { duration: 0.5, ease: 'easeOut' },
    });

    setTimeout(() => setIsHappy(false), 900);

    const path = window.location.pathname;
    let fallback = CONTEXT_MESSAGES.home;
    if (path.includes('projets') || path.includes('hornet')) fallback = CONTEXT_MESSAGES.hornetsecurity;
    if (path.includes('parcours')) fallback = CONTEXT_MESSAGES.parcours;

    setActiveMessage(activeMessage || fallback);
    setIsBubbleOpen(true);

    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    autoCloseTimerRef.current = setTimeout(() => {
      setIsBubbleOpen(false);
    }, 6500);
  };

  // Détection du scroll contextuel pour les bulles en coin
  useEffect(() => {
    if (isCenterStage) return;

    const sections = [
      { id: 'hornetsecurity', data: CONTEXT_MESSAGES.hornetsecurity },
      { id: 'captain-security', data: CONTEXT_MESSAGES.captain },
      { id: 'helix-nova', data: CONTEXT_MESSAGES.helix },
      { id: 'fresh-data', data: CONTEXT_MESSAGES.freshdata },
      { id: 'resin-architecte', data: CONTEXT_MESSAGES.resin },
    ];

    const handleScroll = () => {
      if (isBubbleOpen) return;

      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos <= bottom) {
            if (!seenSectionsRef.current.has(sec.data.key)) {
              seenSectionsRef.current.add(sec.data.key);
              setActiveMessage(sec.data);
              setIsBubbleOpen(true);
              if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
              autoCloseTimerRef.current = setTimeout(() => {
                setIsBubbleOpen(false);
              }, 6500);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCenterStage, isBubbleOpen]);

  // Rendu de la capsule 3D organique de Kuro
  const renderKuroCapsule = (isLarge = false) => {
    const sizeClasses = isLarge
      ? 'w-20 h-20 sm:w-24 sm:h-24'
      : 'w-8 h-8 sm:w-9 sm:h-9';
    const eyeWidth = isLarge ? 'w-4 h-5' : 'w-2.5 h-3';
    const pupilSize = isLarge ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5';
    const shineSize = isLarge ? 'top-2 left-3 w-7 h-3' : 'top-1 left-2 w-3.5 h-1.5';

    return (
      <div
        className={`relative ${sizeClasses} rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 shadow-2xl`}
        style={{
          background: 'radial-gradient(circle at 35% 30%, #27272a 0%, #18181b 55%, #09090b 100%)',
          boxShadow: isLarge
            ? 'inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -4px 8px rgba(255, 173, 0, 0.35), 0 20px 40px rgba(0,0,0,0.6)'
            : 'inset 0 1px 2px rgba(255, 255, 255, 0.35), inset 0 -2px 4px rgba(255, 173, 0, 0.25), 0 2px 8px rgba(0,0,0,0.5)',
        }}
      >
        {/* Reflet brillant 3D sur le dessus */}
        <div
          className={`absolute ${shineSize} rounded-full bg-white/35 blur-[0.6px] pointer-events-none -rotate-12`}
          aria-hidden="true"
        />

        {/* Yeux expressifs */}
        <div className={`flex items-center ${isLarge ? 'gap-3 pt-1' : 'gap-2 pt-0.5'} pointer-events-none`}>
          {isHappy ? (
            // Yeux joyeux arqués (^ ^)
            <>
              <div
                className={`${isLarge ? 'w-4 h-3.5 border-t-3 border-r-3' : 'w-2.5 h-2 border-t-2 border-r-2'} border-white rounded-tr-md -rotate-45`}
              />
              <div
                className={`${isLarge ? 'w-4 h-3.5 border-t-3 border-l-3' : 'w-2.5 h-2 border-t-2 border-l-2'} border-white rounded-tl-md rotate-45`}
              />
            </>
          ) : isBlinking ? (
            // Yeux fermés lors du clignement
            <>
              <div className={`${isLarge ? 'w-4 h-1' : 'w-2.5 h-0.5'} bg-white/90 rounded-full`} />
              <div className={`${isLarge ? 'w-4 h-1' : 'w-2.5 h-0.5'} bg-white/90 rounded-full`} />
            </>
          ) : (
            // Yeux ouverts expressifs avec pupilles qui suivent le curseur
            <>
              {/* Œil gauche */}
              <div
                className={`relative ${eyeWidth} rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden`}
              >
                <div
                  className={`${pupilSize} rounded-full bg-[#09090B] relative transition-transform duration-75`}
                  style={{
                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                  }}
                >
                  <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white" />
                </div>
              </div>

              {/* Œil droit */}
              <div
                className={`relative ${eyeWidth} rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden`}
              >
                <div
                  className={`${pupilSize} rounded-full bg-[#09090B] relative transition-transform duration-75`}
                  style={{
                    transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                  }}
                >
                  <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ========================================================
          1. PRÉSENTATION CENTRALE AU PREMIER CHARGEMENT (AVEC FOND FLOU)
         ======================================================== */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isCenterStage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[9990] w-screen h-screen bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-md sm:max-w-lg bg-[#FFFFFF] rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-zinc-200/90 text-center space-y-6"
                >
                  {/* Bouton fermer discret en haut à droite */}
                  <button
                    type="button"
                    onClick={handleDismissCenter}
                    className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer"
                    aria-label="Fermer et aller dans le coin"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Kuro en vedette au centre avec halo ambré */}
                  <div className="flex flex-col items-center justify-center pt-2">
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#FFAD00]/40 to-transparent blur-xl animate-pulse pointer-events-none" />
                      {renderKuroCapsule(true)}
                    </div>
                  </div>

                  {/* Présentation éditoriale sobre et humaine */}
                  <div className="space-y-2.5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-[#52525B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                      <span>Kuro · Compagnon interactif</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#09090B]">
                      Bienvenue dans l'univers ROOM241
                    </h2>

                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed max-w-md mx-auto pt-1 font-normal">
                      Bonjour ! Je suis <strong>Kuro</strong>. Je vous accompagne dans la découverte du portfolio de Rémi : direction artistique, campagnes cybersécurité, motion design et identités visuelles.
                    </p>
                  </div>

                  {/* Points de repère du portfolio */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left text-xs text-[#52525B] pt-1 border-t border-zinc-100">
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                      <span className="font-bold text-[#09090B] block">01. Projets</span>
                      <p className="text-[11px] leading-tight text-zinc-500">Hornetsecurity, Fresh Data, Résin'Architecte.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                      <span className="font-bold text-[#09090B] block">02. Parcours</span>
                      <p className="text-[11px] leading-tight text-zinc-500">Expériences CDI/alternance, CV et photographies.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-1">
                      <span className="font-bold text-[#09090B] block">03. Présence</span>
                      <p className="text-[11px] leading-tight text-zinc-500">Je reste discrètement dans le coin de l'écran.</p>
                    </div>
                  </div>

                  {/* Bouton d'action principal */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleDismissCenter}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                    >
                      <span>Découvrir le portfolio</span>
                      <ArrowRight className="w-4 h-4 text-[#FFAD00]" />
                    </button>
                    <span className="block text-[11px] text-zinc-400 font-mono mt-2">
                      Prenez le temps d'explorer à votre rythme
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ========================================================
          2. KURO NICHE DANS SON COIN (BOTTOM-6 LEFT-6)
         ======================================================== */}
      {!isCenterStage && !isModalOpen && (
        <motion.div
          ref={kuroRef}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-40 select-none flex flex-col items-start gap-3"
        >
          {/* Bulle de dialogue contextuelle au-dessus de Kuro */}
          <AnimatePresence>
            {isBubbleOpen && activeMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-xs sm:max-w-sm rounded-2xl bg-[#09090B] text-white p-4 shadow-2xl border border-white/15 backdrop-blur-xl space-y-2"
              >
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                    <span className="text-[11px] font-mono font-semibold text-zinc-300">
                      {activeMessage.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBubbleOpen(false)}
                    className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Fermer la bulle"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-zinc-200 leading-relaxed font-normal">
                  {activeMessage.text}
                </p>

                {/* Lien discret pour réinvoquer la présentation centrale */}
                <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                  <span>Kuro · Compagnon</span>
                  <button
                    type="button"
                    onClick={handleSummonCenter}
                    className="text-[#FFAD00] hover:underline cursor-pointer"
                  >
                    Revoir la présentation ↗
                  </button>
                </div>

                {/* Pointe de la bulle orientée vers Kuro */}
                <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#09090B] border-r border-b border-white/15 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bouton tactile capsule Kuro dans son coin */}
          <div className="relative group">
            {/* Halo d'aura ambré subtil */}
            <div
              className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#FFAD00]/30 to-transparent blur-md transition-opacity duration-300 pointer-events-none ${
                isHappy ? 'opacity-100 scale-125' : isHovered ? 'opacity-80 scale-105' : 'opacity-40'
              }`}
              aria-hidden="true"
            />

            <motion.button
              type="button"
              animate={controls}
              onClick={handleCornerClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-[#09090B]/95 hover:bg-[#09090B] backdrop-blur-xl border border-white/15 hover:border-[#FFAD00]/50 shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
              aria-label="Kuro, compagnon interactif du studio ROOM241. Cliquez pour échanger."
              title="Kuro · Cliquez pour échanger"
            >
              {renderKuroCapsule(false)}

              <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors pr-1">
                Kuro
              </span>

              <span
                className={`w-1.5 h-1.5 rounded-full bg-[#FFAD00] transition-transform duration-300 ${
                  isHappy ? 'scale-150 animate-ping' : ''
                }`}
                aria-hidden="true"
              />
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  );
}
