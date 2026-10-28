import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Mochi — Compagnon interactif et créatif du studio ROOM241.
 * 
 * Spécifications complètes :
 * - Créature vivante en capsule 3D organique (inspiration Dynamic Island / micro-mascotte).
 * - Yeux expressifs avec suivi oculaire fluide du curseur sur desktop.
 * - Clignement naturel périodique (cycle aléatoire entre 3,2 et 5,8 s).
 * - Réaction sensorielle au clic / tap : rebond élastique et yeux arqués joyeux (^ ^).
 * - Déplacement discret et naturel : petites explorations espacées dans sa zone sûre,
 *   sans jamais gêner la lecture, le scroll, les boutons ou les carrousels.
 * - Présentation contextuelle des projets (phrases courtes éditoriales préécrites).
 * - Bulle refermable automatiquement (6,5s) ou manuellement, réouvrable au clic sur Mochi.
 * - Aucune répétition intempestive (mémorisation des sections déjà visitées).
 * - Discrétion absolue lors de l'ouverture d'un modal ou du menu mobile (retrait immédiat).
 * - 100 % autonome, 0 appel réseau, 0 chatbot, respect de prefers-reduced-motion.
 */

// Phrases de présentation éditoriales fournies dans le cahier des charges
const CONTEXT_MESSAGES = {
  home: {
    key: 'home',
    text: "Salut, moi c'est Mochi. Je te fais découvrir quelques projets ?",
    title: "Bienvenue sur le portfolio"
  },
  hornetsecurity: {
    key: 'hornetsecurity',
    text: "Ici, il y a du graphisme, du motion design et du concret sur le terrain.",
    title: "Hornetsecurity • Salons européens"
  },
  captain: {
    key: 'captain',
    text: "Le design ne s'arrête pas à l'écran : il peut aussi prendre vie sur un salon.",
    title: "Captain Security • Présence terrain"
  },
  helix: {
    key: 'helix',
    text: "36 heures pour imaginer un personnage 3D, écrire son histoire et préparer une vidéo.",
    title: "Helix Nova • Sprint de Hanovre"
  },
  freshdata: {
    key: 'freshdata',
    text: "Un univers graphique pensé pour accompagner un projet jusqu'à sa campagne de financement.",
    title: "Fresh Data • Financement Ulule"
  },
  resin: {
    key: 'resin',
    text: "Ici, l'identité visuelle se prolonge sur les réseaux, dans les supports commerciaux et jusque sur les chantiers.",
    title: "Résin'Architecte • Sur le terrain"
  },
  parcours: {
    key: 'parcours',
    text: "Un pied dans la technique, l'autre dans la communication : c'est ce qui façonne ma manière de travailler.",
    title: "Parcours • Double profil"
  }
};

export default function Mochi() {
  const mochiRef = useRef(null);
  const controls = useAnimation();
  const driftControls = useAnimation();

  // États visuels et interactifs
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Système de bulles contextuelles
  const [activeMessage, setActiveMessage] = useState(null);
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const seenSectionsRef = useRef(new Set());
  const autoCloseTimerRef = useRef(null);

  // Détection prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Détection d'ouverture de modal ou de menu mobile pour mise en retrait discrète
  useEffect(() => {
    const checkModalState = () => {
      // Si le body est overflow hidden, un modal ou drawer est ouvert
      const isLocked = document.body.style.overflow === 'hidden';
      setIsModalOpen(isLocked);
      if (isLocked) {
        setIsBubbleOpen(false);
      }
    };

    const interval = setInterval(checkModalState, 300);
    return () => clearInterval(interval);
  }, []);

  // Déclenchement d'un message contextuel avec auto-fermeture
  const triggerContextMessage = useCallback((msgObj) => {
    if (!msgObj) return;
    setActiveMessage(msgObj);
    setIsBubbleOpen(true);

    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }

    // Auto-fermeture douce après 6,5 secondes
    autoCloseTimerRef.current = setTimeout(() => {
      setIsBubbleOpen(false);
    }, 6500);
  }, []);

  // Fermeture manuelle de la bulle
  const handleCloseBubble = (e) => {
    if (e) e.stopPropagation();
    setIsBubbleOpen(false);
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
  };

  // Suivi subtil du curseur pour les yeux (Desktop)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      if (!mochiRef.current) return;
      const rect = mochiRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      const maxDistance = 3.5;
      const clampedDistance = Math.min(distance * 0.015, maxDistance);
      const angle = Math.atan2(deltaY, deltaX);

      setEyeOffset({
        x: Math.cos(angle) * clampedDistance,
        y: Math.sin(angle) * clampedDistance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  // Clignement naturel périodique
  useEffect(() => {
    if (prefersReducedMotion) return;

    let timeoutId;
    const scheduleBlink = () => {
      const delay = 3200 + Math.random() * 2600;
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 150);
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  // Déplacement discret et naturel (petite exploration flottante dans sa zone sûre)
  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    // Pas de déplacement sur petit écran (reste à poste fixe sur mobile pour ne jamais masquer)
    if (window.innerWidth < 768) return;

    let intervalId;
    const runDrift = () => {
      // Déplacement doux et organique espacé toutes les 16 secondes
      driftControls.start({
        x: [0, 14, -6, 10, 0],
        y: [0, -8, 2, -5, 0],
        rotate: [0, 2, -1.5, 1, 0],
        transition: {
          duration: 9,
          ease: 'easeInOut',
          times: [0, 0.3, 0.6, 0.8, 1],
        },
      });
    };

    intervalId = setInterval(() => {
      if (!isHovered && !isModalOpen && !isBubbleOpen) {
        runDrift();
      }
    }, 18000);

    return () => clearInterval(intervalId);
  }, [driftControls, isHovered, isModalOpen, isBubbleOpen, prefersReducedMotion]);

  // Observation des sections et déclenchement éditorial des messages
  useEffect(() => {
    const handleNavigationContext = () => {
      const path = window.location.pathname;

      // 1. Sur la page Parcours
      if (path.startsWith('/parcours') || path.startsWith('/a-propos') || path.startsWith('/hors-cadre')) {
        if (!seenSectionsRef.current.has('parcours')) {
          seenSectionsRef.current.add('parcours');
          setTimeout(() => triggerContextMessage(CONTEXT_MESSAGES.parcours), 900);
        }
        return;
      }

      // 2. Sur la page Accueil ou Projets : observation du scroll
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Message d'accueil initial
      if (scrollY < 200 && (path === '/' || path === '')) {
        if (!seenSectionsRef.current.has('home')) {
          seenSectionsRef.current.add('home');
          setTimeout(() => triggerContextMessage(CONTEXT_MESSAGES.home), 1200);
        }
        return;
      }

      // Observation par ID d'élément pour les projets
      const checkSection = (id, msgKey) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // La section est au premier tiers de l'écran
          if (rect.top <= viewportHeight * 0.65 && rect.bottom >= viewportHeight * 0.25) {
            if (!seenSectionsRef.current.has(msgKey)) {
              seenSectionsRef.current.add(msgKey);
              triggerContextMessage(CONTEXT_MESSAGES[msgKey]);
            }
          }
        }
      };

      checkSection('hornetsecurity', 'hornetsecurity');
      checkSection('fresh-data', 'freshdata');
      checkSection('resin-architecte', 'resin');
    };

    // Vérification initiale
    handleNavigationContext();

    // Écoute de défilement passive et temporisée
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleNavigationContext();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('popstate', handleNavigationContext);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('popstate', handleNavigationContext);
    };
  }, [triggerContextMessage]);

  // Clic ou tap : Mochi réagit avec joie et réouvre la dernière phrase contextuelle
  const handleInteraction = () => {
    if (isHappy) return;
    setIsHappy(true);

    if (!prefersReducedMotion) {
      controls.start({
        y: [0, -10, 2, -4, 0],
        scale: [1, 1.12, 0.95, 1.04, 1],
        transition: { duration: 0.65, ease: 'easeOut' },
      });
    }

    // Bascule ou réouverture de la bulle
    if (isBubbleOpen) {
      setIsBubbleOpen(false);
    } else {
      // Déterminer le meilleur message selon la page actuelle
      const path = window.location.pathname;
      let targetMsg = activeMessage || CONTEXT_MESSAGES.home;
      if (path.startsWith('/parcours')) targetMsg = CONTEXT_MESSAGES.parcours;
      else if (path.startsWith('/projets')) targetMsg = CONTEXT_MESSAGES.hornetsecurity;
      triggerContextMessage(targetMsg);
    }

    setTimeout(() => {
      setIsHappy(false);
    }, 900);
  };

  // Si une modale est ouverte, Mochi se met discrètement en retrait
  if (isModalOpen) {
    return null;
  }

  return (
    <motion.div
      ref={mochiRef}
      animate={driftControls}
      className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-30 select-none pointer-events-auto"
    >
      <div className="relative group">
        
        {/* ========================================================
            BULLE DE PAROLE CONTEXTUELLE DE MOCHI (COURTE & ÉPURÉE)
           ======================================================== */}
        <AnimatePresence>
          {isBubbleOpen && activeMessage && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.94 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute bottom-full left-0 mb-3.5 w-64 sm:w-72 p-4 rounded-2xl bg-[#09090B]/95 backdrop-blur-xl border border-white/15 text-white shadow-[0_15px_35px_-5px_rgba(0,0,0,0.5)] z-40"
              role="region"
              aria-live="polite"
              aria-label="Message de Mochi"
            >
              {/* Entête de la bulle avec titre de projet et bouton fermeture */}
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-white/10 text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
                  <span className="font-semibold text-zinc-200 truncate">{activeMessage.title}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCloseBubble}
                  className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Fermer le message de Mochi"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Texte éditorial concis */}
              <p className="text-xs text-zinc-200 leading-relaxed pt-2">
                « {activeMessage.text} »
              </p>

              {/* Pointe décorative de la bulle orientée vers Mochi */}
              <div 
                className="absolute -bottom-1.5 left-5 w-3 h-3 bg-[#09090B]/95 border-b border-r border-white/15 rotate-45"
                aria-hidden="true" 
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info-bulle discrète au survol (uniquement si la bulle éditoriale est fermée) */}
        {!isBubbleOpen && (
          <div
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-2.5 py-1 rounded-full bg-[#09090B]/90 backdrop-blur-md text-[11px] font-medium text-white border border-white/10 shadow-lg pointer-events-none whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
            aria-hidden="true"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] animate-pulse" />
            <span>Mochi · Cliquez pour échanger</span>
          </div>
        )}

        {/* Halo d'aura ambré subtil en arrière-plan */}
        <div
          className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#FFAD00]/30 via-[#FFAD00]/10 to-transparent blur-md transition-opacity duration-300 pointer-events-none ${
            isHappy ? 'opacity-100 scale-125' : isHovered ? 'opacity-70 scale-105' : 'opacity-35'
          }`}
          aria-hidden="true"
        />

        {/* Bouton tactile capsule Mochi */}
        <motion.button
          type="button"
          animate={controls}
          onClick={handleInteraction}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleInteraction();
            }
          }}
          className="relative flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full bg-[#09090B]/95 hover:bg-[#09090B] backdrop-blur-xl border border-white/15 hover:border-[#FFAD00]/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.4)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          aria-label="Mochi, compagnon vivant du studio ROOM241. Cliquez pour découvrir les projets."
          title="Cliquez pour interagir avec Mochi"
        >
          {/* Corps 3D organique de Mochi */}
          <div
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #27272a 0%, #18181b 55%, #09090b 100%)',
              boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.35), inset 0 -2px 4px rgba(255, 173, 0, 0.25), 0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            {/* Reflet brillant 3D sur le dessus */}
            <div
              className="absolute top-1 left-2 w-3.5 h-1.5 rounded-full bg-white/30 blur-[0.6px] pointer-events-none -rotate-12"
              aria-hidden="true"
            />

            {/* Yeux expressifs */}
            <div className="flex items-center gap-2 pt-0.5 pointer-events-none">
              
              {isHappy ? (
                // Yeux joyeux arqués (^ ^) lors de l'interaction
                <>
                  <div className="w-2.5 h-2 border-t-2 border-r-2 border-white rounded-tr-md -rotate-45" />
                  <div className="w-2.5 h-2 border-t-2 border-l-2 border-white rounded-tl-md rotate-45" />
                </>
              ) : isBlinking ? (
                // Yeux fermés lors du clignement
                <>
                  <div className="w-2.5 h-0.5 bg-white/90 rounded-full" />
                  <div className="w-2.5 h-0.5 bg-white/90 rounded-full" />
                </>
              ) : (
                // Yeux ouverts expressifs avec pupilles qui suivent le curseur
                <>
                  {/* Œil gauche */}
                  <div className="relative w-2.5 h-3 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#09090B] relative transition-transform duration-75"
                      style={{
                        transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                      }}
                    >
                      <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Œil droit */}
                  <div className="relative w-2.5 h-3 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#09090B] relative transition-transform duration-75"
                      style={{
                        transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)`,
                      }}
                    >
                      <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white" />
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Micro libellé de statut subtil */}
          <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-300 pr-1">
            Mochi
          </span>

          {/* Point d'état ambré */}
          <span
            className={`w-1.5 h-1.5 rounded-full bg-[#FFAD00] transition-transform duration-300 ${
              isHappy ? 'scale-150 animate-ping' : ''
            }`}
            aria-hidden="true"
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
