import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

/**
 * Kuro — Compagnon interactif et créatif du studio ROOM241.
 * 
 * Spécifications :
 * 1. Présentation centrale au chargement (desktop uniquement, >= 768px) :
 *    - Signature supérieure : ROOM241 | KURO, COMPAGNON CRÉATIF
 *    - Titre : Bienvenue chez ROOM241.
 *    - Texte : Moi, c’est Kuro. Je vous accompagne à travers les projets de Rémi : du design, de la vidéo et des idées qui prennent vie sur le terrain.
 *    - Bouton principal : Explorer le portfolio ↗ (conduit vers /projets)
 *    - Fermeture explicite par bouton de fermeture et touche Échap (ne se ferme pas au clic aléatoire).
 * 2. Mobile (< 768px) :
 *    - Pas d'ouverture automatique de la modale centrale.
 *    - Taille de Kuro bornée à 32px (w-8 h-8) avec marges adaptées (bottom-4 left-4).
 * 3. Interactions et défilement :
 *    - Pendant le défilement, atténuation discrète de Kuro (opacity-30), restauration à l'arrêt du scroll.
 *    - Respect de prefers-reduced-motion.
 *    - Suivi oculaire du curseur, clignement périodique, bulles éditoriales et saut de joie.
 */

// Vivier de répliques éditoriales sans répétition immédiate
const GENERAL_PHRASES = [
  "Je t'accompagne dans la découverte des projets de Rémi. N'hésite pas à explorer !",
  "Chaque projet présenté ici correspond à un travail réel, documenté et vérifiable.",
  "De la conception 3D à l'habillage de stand, le design s'exprime sur tous les formats.",
  "Le motion design permet de donner du rythme et de la clarté aux messages complexes.",
  "Une identité visuelle réussie doit vivre aussi bien sur un écran que sur un chantier.",
  "Curieux d'en savoir plus sur une réalisation ? Les études de cas détaillent la démarche.",
  "La rigueur technique et la sensibilité graphique forment un équilibre précieux.",
  "N'hésite pas à consulter le CV pour découvrir le parcours académique et professionnel.",
  "Derrière chaque chiffre affiché, il y a une réalité mesurée et documentée.",
  "Bonne visite ! Je reste disponible si tu as besoin d'un éclairage."
];

// Phrases contextuelles selon la section
const CONTEXT_MESSAGES = {
  home: {
    key: 'home',
    text: "Je t'accompagne dans la découverte des projets de Rémi. N'hésite pas à explorer !",
    title: "Bienvenue chez ROOM241"
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

export default function Kuro({ navigate }) {
  const kuroRef = useRef(null);
  const controls = useAnimation();

  // États visuels et interactifs
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // État de présentation centrale au premier chargement (uniquement >= 768px)
  const [isCenterStage, setIsCenterStage] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Règle impérative : pas d'ouverture automatique en dessous de 768px (mobile)
    if (window.innerWidth < 768) return false;
    const welcomed = sessionStorage.getItem('room241_kuro_welcomed');
    return welcomed !== 'true';
  });

  // Système de bulles contextuelles en coin
  const [activeMessage, setActiveMessage] = useState(null);
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const seenSectionsRef = useRef(new Set());
  const autoCloseTimerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastPhraseIndexRef = useRef(-1);

  // Détection prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Détection du scroll : atténue discrètement Kuro pendant le défilement et restaure à l'arrêt
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScrollActivity = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250);
    };

    window.addEventListener('scroll', handleScrollActivity, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollActivity);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Fermeture par la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCenterStage) {
        handleDismissCenter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCenterStage]);

  // Détection d'ouverture d'une modale (CvModal, Lightbox) pour masquer Kuro en arrière-plan
  useEffect(() => {
    const checkModal = () => {
      const isLocked = document.body.style.overflow === 'hidden';
      if (!isCenterStage) {
        setIsModalOpen(isLocked);
      }
    };
    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, [isCenterStage]);

  // Suivi du regard oculaire vers le curseur
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

  // Fermeture de la modale d'accueil et ancrage dans le coin
  const handleDismissCenter = () => {
    sessionStorage.setItem('room241_kuro_welcomed', 'true');
    setIsCenterStage(false);
    setIsHappy(true);

    // Animation de saut léger à l'arrivée
    setTimeout(() => {
      controls.start({
        y: [0, -12, 0],
        rotate: [0, -5, 5, 0],
        scale: [1, 1.12, 1],
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
      });
    }, 250);

    setTimeout(() => {
      setIsHappy(false);
    }, 1200);
  };

  // Clic sur « Explorer le portfolio ↗ » : ferme la modale et navigue vers /projets
  const handleExplorePortfolio = () => {
    handleDismissCenter();
    if (navigate) {
      navigate('/projets');
    } else {
      window.history.pushState({}, '', '/projets');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Réouverture de la présentation
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

    setTimeout(() => setIsHappy(false), 850);

    // Tirage aléatoire sans répétition immédiate
    let nextIdx = Math.floor(Math.random() * GENERAL_PHRASES.length);
    if (nextIdx === lastPhraseIndexRef.current) {
      nextIdx = (nextIdx + 1) % GENERAL_PHRASES.length;
    }
    lastPhraseIndexRef.current = nextIdx;

    const path = window.location.pathname;
    let messageData = { key: 'general', title: 'Kuro // Notes de studio', text: GENERAL_PHRASES[nextIdx] };
    if (path.includes('projets') || path.includes('hornet')) messageData = CONTEXT_MESSAGES.hornetsecurity;
    if (path.includes('parcours')) messageData = CONTEXT_MESSAGES.parcours;

    setActiveMessage(messageData);
    setIsBubbleOpen(true);

    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    autoCloseTimerRef.current = setTimeout(() => {
      setIsBubbleOpen(false);
    }, 6500);
  };

  // Détection du scroll contextuel
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

  // Rendu de la capsule 3D organique de Kuro (taille limitée à 32px sur mobile)
  const renderKuroCapsule = (isLarge = false) => {
    const sizeClasses = isLarge
      ? 'w-20 h-20 sm:w-24 sm:h-24'
      : 'w-8 h-8 sm:w-9 sm:h-9'; // Exactement 32px sur mobile (w-8 h-8)
    const eyeWidth = isLarge ? 'w-4 h-5' : 'w-2 h-2.5 sm:w-2.5 sm:h-3';
    const pupilSize = isLarge ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5';
    const shineSize = isLarge ? 'top-2 left-3 w-7 h-3' : 'top-0.5 left-1.5 w-3 h-1 sm:top-1 sm:left-2 sm:w-3.5 sm:h-1.5';

    return (
      <div
        className={`relative ${sizeClasses} rounded-full bg-[#09090B] flex items-center justify-center transition-transform duration-300 select-none ${
          isHovered && !isLarge ? 'scale-105' : ''
        }`}
        style={{
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
        <div className={`flex items-center ${isLarge ? 'gap-3 pt-1' : 'gap-1.5 sm:gap-2 pt-0.5'} pointer-events-none`}>
          {isHappy ? (
            // Yeux joyeux arqués (^ ^)
            <>
              <div
                className={`${isLarge ? 'w-4 h-3.5 border-t-3 border-r-3' : 'w-2 h-1.5 sm:w-2.5 sm:h-2 border-t-2 border-r-2'} border-white rounded-tr-md -rotate-45`}
              />
              <div
                className={`${isLarge ? 'w-4 h-3.5 border-t-3 border-l-3' : 'w-2 h-1.5 sm:w-2.5 sm:h-2 border-t-2 border-l-2'} border-white rounded-tl-md rotate-45`}
              />
            </>
          ) : isBlinking ? (
            // Yeux fermés lors du clignement
            <>
              <div className={`${isLarge ? 'w-4 h-1' : 'w-2 h-0.5 sm:w-2.5 sm:h-0.5'} bg-white/90 rounded-full`} />
              <div className={`${isLarge ? 'w-4 h-1' : 'w-2 h-0.5 sm:w-2.5 sm:h-0.5'} bg-white/90 rounded-full`} />
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
                  <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white" />
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
                  <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white" />
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
          1. MODALE D'ACCUEIL ÉDITORIALE KURO (AVEC FOND FLOU)
          Fermeture stricte via le bouton de fermeture ou Échap
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
                className="fixed inset-0 z-[9990] w-screen h-screen bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 select-none"
              >
                {/* Carte de la modale : clic intérieur isolé */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-md sm:max-w-lg bg-[#09090B]/95 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-white/15 text-center space-y-6 text-white"
                >
                  {/* Bouton de fermeture explicite en haut à droite */}
                  <button
                    type="button"
                    onClick={handleDismissCenter}
                    className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                    aria-label="Fermer la présentation"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Kuro en vedette au centre avec halo ambré subtil */}
                  <div className="flex flex-col items-center justify-center pt-2">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#FFAD00]/30 to-transparent blur-2xl animate-pulse pointer-events-none" />
                      {renderKuroCapsule(true)}
                    </div>
                  </div>

                  {/* Contenu textuel officiel et exact */}
                  <div className="space-y-3.5">
                    {/* Signature supérieure discrète et élégante */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-medium tracking-wider text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)]" />
                      <span>ROOM241 | KURO, COMPAGNON CRÉATIF</span>
                    </div>

                    {/* Titre officiel avec point */}
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      Bienvenue chez ROOM241.
                    </h2>

                    {/* Texte descriptif exact */}
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md mx-auto font-normal">
                      Moi, c’est Kuro. Je vous accompagne à travers les projets de Rémi : du design, de la vidéo et des idées qui prennent vie sur le terrain.
                    </p>
                  </div>

                  {/* Bouton d'action principal avec accent ambré mesuré */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleExplorePortfolio}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-zinc-950 hover:bg-zinc-100 text-xs sm:text-sm font-bold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] group"
                    >
                      <span>Explorer le portfolio ↗</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ========================================================
          2. KURO NICHE DANS SON COIN (BOTTOM-4 LEFT-4 MOBILE, BOTTOM-6 LEFT-6 DESKTOP)
          Atténuation discrète pendant le défilement (isScrolling)
         ======================================================== */}
      {!isCenterStage && !isModalOpen && (
        <motion.div
          ref={kuroRef}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none flex flex-col items-start gap-3 transition-opacity duration-300 ${
            isScrolling ? 'opacity-30 pointer-events-none' : 'opacity-100'
          }`}
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

                {/* Lien pour réinvoquer la présentation centrale */}
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
                <div className="absolute -bottom-1.5 left-4 sm:left-6 w-3 h-3 bg-[#09090B] border-r border-b border-white/15 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bouton tactile capsule Kuro dans son coin */}
          <div className="relative group">
            {/* Halo d'aura ambré subtil */}
            <div
              className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#FFAD00]/25 to-transparent blur-md transition-opacity duration-300 pointer-events-none ${
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
              className="relative flex items-center gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full bg-[#09090B]/95 hover:bg-[#09090B] backdrop-blur-xl border border-white/15 hover:border-[#FFAD00]/50 shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
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
