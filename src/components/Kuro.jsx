import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

/**
 * ============================================================================
 * KURO — COMPAGNON CRÉATIF STUDIO ROOM241
 * Studio ROOM241 — Rémi Brocart
 * 
 * Correctif Global & Définitif :
 * 
 * 1. Synchronisation rigoureuse des dialogues avec le portfolio réel :
 *    - Cartographie exhaustive des routes, études de cas et sections documentées :
 *      * Accueil (/)
 *      * Liste des projets (/projets)
 *      * Étude de cas Hornetsecurity (/realisations/hornetsecurity & #hornetsecurity)
 *      * Étude de cas Fresh Data (/realisations/fresh-data & #fresh-data)
 *      * Étude de cas Résin'Architecte (/realisations/resin-architecte & #resin-architecte)
 *      * Parcours (/parcours, /a-propos, /hors-cadre)
 *      * Contact (#contact)
 *    - Détection de scroll optimisée via IntersectionObserver (rootMargin adaptée aux sections longues).
 *    - Synchronisation instantanée lors de la navigation entre études de cas.
 *    - Déclenchement naturel temporisé (1.8s d'attente à l'arrivée), non-répétition et pause de tranquillité (20s).
 *    - Priorité absolue aux clics du visiteur.
 * 
 * 2. Expression neutre au repos :
 *    - Au repos, Kuro a TOUJOURS son regard ouvert, calme et naturel (sclérotique blanche, pupille noire et point de reflet vif).
 *    - Aucune expression heureuse permanente.
 *    - Les clignements (toutes les 4.2s) ferment doucement les yeux pendant 120ms et restaurent l'expression neutre.
 * 
 * 3. Géométrie des yeux 100% stable pendant l'introduction :
 *    - Structure DOM pérenne sans remplacement d'éléments.
 *    - Transition d'ouverture oculaire purement verticale (scaleY: 0.12 -> 1).
 * 
 * 4. Panneau conversationnel Glassmorphism Premium sans superposition :
 *    - Fond graphite translucide à contraste renforcé : rgba(18, 17, 16, 0.90), blur(26px) saturate(140%).
 *    - Reflet spéculaire interne supérieur, fine bordure blanche translucide (0.16).
 *    - Pointeur en losange propre non tronqué, parfaitement aligné au-dessus de Kuro.
 *    - Boutons pleine largeur confortables et lisibles, sans wrap cassé.
 * 
 * 5. Respiration du Mochi & Micro-impulsion :
 *    - Seule la boule vitrée respire (scale: 1 -> 1.045).
 *    - Micro-impulsion corporelle d'éveil avant parole (y: -3px).
 *    - Capsule extérieure et interface parfaitement stables.
 * ============================================================================
 */

const BREATH_CYCLE = 4800; // 4.8s par cycle respiratoire naturel
const SESSION_INTRO_KEY = 'room241_kuro_intro_viewed';

// Dictionnaire exhaustif des contextes vérifiés dans le portfolio
const CONTEXT_MESSAGES = {
  home: {
    id: 'home',
    tag: "Studio ROOM241",
    text: "On commence par les projets ?",
    actions: [
      { label: "Découvrir les projets", path: "/projets", primary: true },
      { label: "Voir le parcours", path: "/parcours", primary: false },
    ],
  },
  projets: {
    id: 'projets',
    tag: "Projets • Réalisations",
    text: "Ici, tu peux découvrir les réalisations de Rémi.",
    actions: [
      { label: "Explorer Hornetsecurity", path: "/projets#hornetsecurity", primary: true },
      { label: "Consulter le CV", isCv: true, primary: false },
    ],
  },
  hornetsecurity: {
    id: 'hornetsecurity',
    tag: "Hornetsecurity • Salons",
    text: "Ce projet mêle design, communication et univers cybersécurité.",
    actions: [
      { label: "Voir l'étude complète", path: "/realisations/hornetsecurity", primary: true },
      { label: "Voir Fresh Data", path: "/projets#fresh-data", primary: false },
    ],
  },
  freshdata: {
    id: 'freshdata',
    tag: "Fresh Data • Financement",
    text: "Chaque projet a ses contraintes. C'est ce qui rend le processus intéressant.",
    actions: [
      { label: "Voir l'étude complète", path: "/realisations/fresh-data", primary: true },
      { label: "Voir Résin'Architecte", path: "/projets#resin-architecte", primary: false },
    ],
  },
  resin: {
    id: 'resin',
    tag: "Résin'Architecte • BTP",
    text: "Identité visuelle et présence digitale pour un cabinet d'architecture d'intérieur.",
    actions: [
      { label: "Voir l'étude complète", path: "/realisations/resin-architecte", primary: true },
      { label: "Voir le parcours", path: "/parcours", primary: false },
    ],
  },
  parcours: {
    id: 'parcours',
    tag: "Parcours • Profil",
    text: "Tu veux découvrir son parcours ? C'est par ici.",
    actions: [
      { label: "Consulter le CV", isCv: true, primary: true },
      { label: "Découvrir les projets", path: "/projets", primary: false },
    ],
  },
  caseStudyHornet: {
    id: 'caseStudyHornet',
    tag: "Étude de cas • Hornetsecurity",
    text: "Ce projet mêle design, communication et univers cybersécurité.",
    actions: [
      { label: "Projet suivant : Fresh Data", path: "/realisations/fresh-data", primary: true },
      { label: "Retour aux projets", path: "/projets", primary: false },
    ],
  },
  caseStudyFresh: {
    id: 'caseStudyFresh',
    tag: "Étude de cas • Fresh Data",
    text: "Chaque projet a ses contraintes. C'est ce qui rend le processus intéressant.",
    actions: [
      { label: "Projet suivant : Résin'Architecte", path: "/realisations/resin-architecte", primary: true },
      { label: "Retour aux projets", path: "/projets", primary: false },
    ],
  },
  caseStudyResin: {
    id: 'caseStudyResin',
    tag: "Étude de cas • Résin'Architecte",
    text: "Identité visuelle et présence digitale pour un cabinet d'architecture d'intérieur.",
    actions: [
      { label: "Voir le parcours", path: "/parcours", primary: true },
      { label: "Retour aux projets", path: "/projets", primary: false },
    ],
  },
  contact: {
    id: 'contact',
    tag: "Contact direct",
    text: "Une idée en tête ? On peut regarder ça ensemble.",
    actions: [
      { label: "Envoyer un email", isMail: true, primary: true },
      { label: "Consulter le CV", isCv: true, primary: false },
    ],
  },
};

export default function Kuro({ currentPath = '/', navigate, onOpenCvModal }) {
  // 1. Gestion de l'introduction
  const [isIntroActive, setIsIntroActive] = useState(() => {
    if (typeof window === 'undefined') return false;
    const viewed = sessionStorage.getItem(SESSION_INTRO_KEY);
    return viewed !== 'true';
  });
  const [isExitingIntro, setIsExitingIntro] = useState(false);

  // 2. Machine à états : 'neutral' est strictement la référence au repos
  const [expression, setExpression] = useState(isIntroActive ? 'blink' : 'neutral');
  const [isAwake, setIsAwake] = useState(!isIntroActive);

  // 3. Animation corporelle du mochi (prise de parole)
  const [isPerkingUp, setIsPerkingUp] = useState(false);

  // 4. Bulle conversationnelle et interactions
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeContext, setActiveContext] = useState(CONTEXT_MESSAGES.home);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const scrollTimeout = useRef(null);
  const autoShowTimeoutRef = useRef(null);
  const autoCloseTimeoutRef = useRef(null);
  const lastDismissedAtRef = useRef(0);
  const shownContextsRef = useRef(new Set());
  const currentPathRef = useRef(currentPath);

  // Détection de prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Déclenchement de la parole avec micro-mouvement corporel du mochi
  const speak = useCallback((contextData, isAuto = false) => {
    setActiveContext(contextData);

    // 1. Micro-impulsion corporelle d'éveil avant parole (220ms)
    setIsPerkingUp(true);

    setTimeout(() => {
      setIsBubbleOpen(true);
      setIsPerkingUp(false);

      // Fermeture automatique douce après 8.5s si déclenchement automatique
      if (isAuto) {
        if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
        autoCloseTimeoutRef.current = setTimeout(() => {
          setIsBubbleOpen(false);
        }, 8500);
      }
    }, 220);
  }, []);

  // Fermeture de la bulle avec temporisation anti-intrusion
  const closeBubble = useCallback(() => {
    setIsBubbleOpen(false);
    lastDismissedAtRef.current = Date.now();
    if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
  }, []);

  // Synchronisation stricte lors de la navigation
  useEffect(() => {
    currentPathRef.current = currentPath;
    const path = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    let ctx = CONTEXT_MESSAGES.home;

    if (path.startsWith('/realisations/')) {
      const slug = path.replace('/realisations/', '');
      if (slug.includes('hornet')) ctx = CONTEXT_MESSAGES.caseStudyHornet;
      else if (slug.includes('fresh')) ctx = CONTEXT_MESSAGES.caseStudyFresh;
      else if (slug.includes('resin')) ctx = CONTEXT_MESSAGES.caseStudyResin;
      else ctx = CONTEXT_MESSAGES.caseStudyHornet;
    } else if (path.startsWith('/parcours') || path.startsWith('/a-propos') || path.startsWith('/hors-cadre')) {
      ctx = CONTEXT_MESSAGES.parcours;
    } else if (path.startsWith('/projets') || path.startsWith('/hornetsecurity') || path.startsWith('/studio')) {
      ctx = CONTEXT_MESSAGES.projets;
    } else {
      ctx = CONTEXT_MESSAGES.home;
    }

    setActiveContext(ctx);
    setExpression('neutral');

    // Annuler tout timer précédent lors d'un changement de route
    if (autoShowTimeoutRef.current) clearTimeout(autoShowTimeoutRef.current);

    // Si la bulle était déjà ouverte lors d'un changement d'étude de cas, actualiser immédiatement
    if (isBubbleOpen) {
      // Laisse le nouveau contexte s'afficher
    } else if (!isIntroActive) {
      const now = Date.now();
      const hasRecentlyDismissed = now - lastDismissedAtRef.current < 20000;
      const alreadyShown = shownContextsRef.current.has(ctx.id);

      if (!hasRecentlyDismissed && !alreadyShown) {
        autoShowTimeoutRef.current = setTimeout(() => {
          if (currentPathRef.current === path) {
            shownContextsRef.current.add(ctx.id);
            speak(ctx, true);
          }
        }, 1800); // 1.8s d'attente pour que la page soit visible
      }
    }

    return () => {
      if (autoShowTimeoutRef.current) clearTimeout(autoShowTimeoutRef.current);
    };
  }, [currentPath, isIntroActive, isBubbleOpen, speak]);

  // Détection contextuelle fiable au scroll (rootMargin adaptée aux sections longues)
  useEffect(() => {
    if (isIntroActive) return;

    const sections = [
      { id: 'hornetsecurity', ctx: CONTEXT_MESSAGES.hornetsecurity },
      { id: 'fresh-data', ctx: CONTEXT_MESSAGES.freshdata },
      { id: 'resin-architecte', ctx: CONTEXT_MESSAGES.resin },
      { id: 'contact', ctx: CONTEXT_MESSAGES.contact },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = sections.find((s) => s.id === entry.target.id);
            if (matched) {
              setActiveContext(matched.ctx);
              const now = Date.now();
              const hasRecentlyDismissed = now - lastDismissedAtRef.current < 20000;
              const alreadyShown = shownContextsRef.current.has(matched.ctx.id);

              if (!hasRecentlyDismissed && !alreadyShown && !isBubbleOpen) {
                shownContextsRef.current.add(matched.ctx.id);
                speak(matched.ctx, true);
              }
            }
          }
        });
      },
      // rootMargin centrée pour détecter la section active sans blocage lié à la hauteur
      { rootMargin: '-25% 0px -35% 0px', threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isIntroActive, isBubbleOpen, speak, currentPath]);

  // Clignement naturel périodique au repos
  useEffect(() => {
    if (prefersReducedMotion || !isAwake) return;

    let timeoutId;
    const executeBlink = () => {
      setExpression('blink');
      setTimeout(() => {
        setExpression('neutral');
      }, 120);

      timeoutId = setTimeout(executeBlink, 4200);
    };

    timeoutId = setTimeout(executeBlink, 3200);
    return () => clearTimeout(timeoutId);
  }, [isAwake, prefersReducedMotion]);

  // Séquence d'introduction : réveil progressif des yeux
  useEffect(() => {
    if (!isIntroActive) {
      setIsAwake(true);
      setExpression('neutral');
      return;
    }

    setIsAwake(false);
    setExpression('blink');

    const timerWake = setTimeout(() => {
      setIsAwake(true);
      setExpression('neutral');
    }, 600);

    return () => clearTimeout(timerWake);
  }, [isIntroActive]);

  // Suivi subtil du regard vers le curseur
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;

      if (!isIntroActive && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.hypot(deltaX, deltaY);

      if (dist === 0) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }

      const angle = Math.atan2(deltaY, deltaX);
      const intensity = Math.min(dist / 220, 1) * 2.2;

      setEyeOffset({
        x: Math.cos(angle) * intensity,
        y: Math.sin(angle) * intensity,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isIntroActive, prefersReducedMotion]);

  // Atténuation lors du défilement actif
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Fermeture par la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isIntroActive && !isExitingIntro) {
          handleDismissIntro();
        } else if (isBubbleOpen) {
          closeBubble();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isIntroActive, isExitingIntro, isBubbleOpen, closeBubble]);

  // Fermeture au clic en dehors de la bulle
  useEffect(() => {
    if (!isBubbleOpen || isIntroActive) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeBubble();
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isBubbleOpen, isIntroActive, closeBubble]);

  // Ondes ambrées de verre liquide plein écran
  useEffect(() => {
    if (!isIntroActive || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const startTime = performance.now();

    const render = (now) => {
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed = now - startTime;
      const cycleProgress = (elapsed % BREATH_CYCLE) / BREATH_CYCLE;
      const breathIntensity = (1 - Math.cos(cycleProgress * 2 * Math.PI)) / 2;

      const originX = width / 2;
      const originY = height / 2;
      const maxRadius = Math.hypot(width, height) * 0.75;

      // Halo central ambré respirant en profondeur
      const haloRadius = 240 + breathIntensity * 130;
      const haloGrad = ctx.createRadialGradient(
        originX,
        originY,
        20,
        originX,
        originY,
        haloRadius
      );
      haloGrad.addColorStop(0, `rgba(255, 173, 0, ${0.12 + breathIntensity * 0.16})`);
      haloGrad.addColorStop(0.35, `rgba(255, 173, 0, ${0.05 + breathIntensity * 0.08})`);
      haloGrad.addColorStop(0.75, `rgba(255, 173, 0, ${0.01 + breathIntensity * 0.02})`);
      haloGrad.addColorStop(1, 'rgba(255, 173, 0, 0)');

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(originX, originY, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      // Ondes de réfraction liquide ambrée
      const waveOffsets = [0, 0.33, 0.66];

      waveOffsets.forEach((offset, idx) => {
        const localProgress = (cycleProgress + offset) % 1;
        const radius = 60 + localProgress * (maxRadius - 60);
        const waveAlpha = Math.sin(localProgress * Math.PI) * (0.15 + breathIntensity * 0.22);

        if (waveAlpha > 0.005) {
          ctx.save();
          ctx.beginPath();

          const segments = 72;
          for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const distortion =
              Math.sin(theta * 3 + elapsed * 0.0016 + idx) * (14 * localProgress) +
              Math.cos(theta * 2 - elapsed * 0.0011) * (9 * localProgress);
            const r = Math.max(0, radius + distortion);
            const x = originX + Math.cos(theta) * r;
            const y = originY + Math.sin(theta) * r;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();

          ctx.strokeStyle = `rgba(255, 173, 0, ${waveAlpha})`;
          ctx.lineWidth = 1.5 + (1 - localProgress) * 2.2;
          ctx.shadowColor = 'rgba(255, 173, 0, 0.5)';
          ctx.shadowBlur = 15 * (1 - localProgress);
          ctx.stroke();
          ctx.restore();
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isIntroActive, prefersReducedMotion]);

  // Fermeture de l'introduction et transition continue vers la capsule
  const handleDismissIntro = useCallback(() => {
    setIsExitingIntro(true);
    sessionStorage.setItem(SESSION_INTRO_KEY, 'true');

    setTimeout(() => {
      setIsIntroActive(false);
      setIsExitingIntro(false);
      setExpression('neutral');
    }, 450);
  }, []);

  // Rejouer l'introduction complète
  const handleReplayIntro = useCallback(() => {
    closeBubble();
    setIsExitingIntro(false);
    setIsIntroActive(true);
  }, [closeBubble]);

  // Exécution d'une action contextuelle
  const handleAction = (action) => (e) => {
    if (e) e.preventDefault();
    closeBubble();

    if (action.isMail) {
      window.location.href = 'mailto:contact@room241.fr';
      return;
    }

    if (action.isCv) {
      if (onOpenCvModal) onOpenCvModal();
      return;
    }

    if (navigate) {
      navigate(action.path);
    } else {
      window.history.pushState({}, '', action.path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  /**
   * ==========================================================================
   * TÊTE DE KURO — GÉOMÉTRIE STRICTEMENT STABLE ET RESPIRATION MOCHI
   * - Respiration lente de la boule vitrée (scale: 1 -> 1.045).
   * - Micro-impulsion corporelle d'éveil avant parole (y: -3.5px).
   * - Capsule extérieure et interface environnante 100% stables.
   * - Yeux 100% stables sans remplacement de nœuds DOM.
   * ==========================================================================
   */
  const renderGlassSphere = (isLarge = false) => {
    const sizeClasses = isLarge ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-8 h-8 sm:w-9 sm:h-9';
    const eyeWidthPx = isLarge ? 16 : 9;
    const eyeHeightPx = isLarge ? 20 : 12;
    const pupilSizePx = isLarge ? 10 : 5.5;
    const eyeGapPx = isLarge ? 12 : 6;

    // Déplacement pupillaire subtil
    const pxOffsetX = eyeOffset.x * (isLarge ? 1.4 : 1);
    const pxOffsetY = eyeOffset.y * (isLarge ? 1.4 : 1);

    const isClosed = expression === 'blink';

    return (
      <div className={`relative ${sizeClasses} flex items-center justify-center shrink-0 select-none`}>
        {/* RESPIRATION MOCHI & MICRO-IMPULSION CORPORELLE */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : isPerkingUp
              ? {
                  y: -3.5,
                  scale: 1.06,
                }
              : {
                  y: 0,
                  scale: [1, 1.045, 1],
                }
          }
          transition={
            isPerkingUp
              ? { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
              : {
                  scale: {
                    duration: BREATH_CYCLE / 1000,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                  y: { duration: 0.25 },
                }
          }
          className="relative w-full h-full rounded-full bg-[#09090B] flex items-center justify-center"
          style={{
            boxShadow: isLarge
              ? 'inset 0 2px 4px rgba(255, 255, 255, 0.45), inset 0 -4px 8px rgba(255, 173, 0, 0.4), 0 20px 45px rgba(0,0,0,0.65)'
              : 'inset 0 1px 2px rgba(255, 255, 255, 0.45), inset 0 -2px 5px rgba(255, 173, 0, 0.35), 0 4px 12px rgba(0,0,0,0.5)',
          }}
          aria-hidden="true"
        >
          {/* Reflet spéculaire elliptique asymétrique réagissant à la respiration */}
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    opacity: [0.45, 0.72, 0.45],
                  }
            }
            transition={{
              duration: BREATH_CYCLE / 1000,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse at 32% 23%, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.2) 26%, rgba(255, 255, 255, 0.03) 48%, transparent 64%)',
            }}
          />

          {/* Micro-liseré supérieur de courbure de verre */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.22) 0%, transparent 40%)',
            }}
          />

          {/* Halo ambré micro-réfléchi au bas de la sphère */}
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : isPerkingUp
                ? { opacity: 0.65 }
                : { opacity: [0.25, 0.45, 0.25] }
            }
            transition={
              isPerkingUp
                ? { duration: 0.2 }
                : {
                    duration: BREATH_CYCLE / 1000,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 92%, rgba(255, 173, 0, 0.35) 0%, transparent 45%)',
            }}
          />

          {/* YEUX EXPRESSIFS PERMANENTS ET GÉOMÉTRIQUEMENT STABLES */}
          <div
            className="flex items-center pointer-events-none z-10"
            style={{ gap: `${eyeGapPx}px`, paddingTop: isLarge ? '4px' : '2px' }}
          >
            {/* Œil gauche */}
            <div
              className="relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner"
              style={{
                width: `${eyeWidthPx}px`,
                height: `${eyeHeightPx}px`,
                transform: isClosed ? 'scaleY(0.12)' : 'scaleY(1)',
                transition: 'transform 0.12s ease-out',
                transformOrigin: 'center',
              }}
            >
              <div
                className="rounded-full bg-[#09090B] relative"
                style={{
                  width: `${pupilSizePx}px`,
                  height: `${pupilSizePx}px`,
                  transform: `translate(${pxOffsetX}px, ${pxOffsetY}px)`,
                  transition: 'transform 0.08s ease-out',
                }}
              >
                <span
                  className="absolute rounded-full bg-white"
                  style={{
                    width: isLarge ? '3.5px' : '2px',
                    height: isLarge ? '3.5px' : '2px',
                    top: isLarge ? '1.5px' : '1px',
                    left: isLarge ? '1.5px' : '1px',
                  }}
                />
              </div>
            </div>

            {/* Œil droit */}
            <div
              className="relative rounded-full bg-white flex items-center justify-center overflow-hidden shadow-inner"
              style={{
                width: `${eyeWidthPx}px`,
                height: `${eyeHeightPx}px`,
                transform: isClosed ? 'scaleY(0.12)' : 'scaleY(1)',
                transition: 'transform 0.12s ease-out',
                transformOrigin: 'center',
              }}
            >
              <div
                className="rounded-full bg-[#09090B] relative"
                style={{
                  width: `${pupilSizePx}px`,
                  height: `${pupilSizePx}px`,
                  transform: `translate(${pxOffsetX}px, ${pxOffsetY}px)`,
                  transition: 'transform 0.08s ease-out',
                }}
              >
                <span
                  className="absolute rounded-full bg-white"
                  style={{
                    width: isLarge ? '3.5px' : '2px',
                    height: isLarge ? '3.5px' : '2px',
                    top: isLarge ? '1.5px' : '1px',
                    left: isLarge ? '1.5px' : '1px',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <>
      {/* ======================================================================
          INTRODUCTION IMMERSIVE SÉQUENCÉE
         ====================================================================== */}
      <AnimatePresence>
        {isIntroActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExitingIntro ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Introduction interactive de Kuro"
          >
            {/* Ondes ambrées de verre liquide plein écran */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* Voile d'ambiance laissant transparaître le portfolio */}
            <div
              onClick={handleDismissIntro}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-md cursor-pointer z-10 transition-opacity"
              aria-hidden="true"
            />

            {/* Panneau de verre fumé avec révélation cadencée */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={
                isExitingIntro
                  ? { opacity: 0, scale: 0.90, y: -10 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[340px] sm:max-w-md bg-[#09090B]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.12)] border border-white/20 text-center space-y-5 text-white z-20 font-sans"
            >
              {/* Bouton de fermeture accessible */}
              <button
                type="button"
                onClick={handleDismissIntro}
                className="absolute top-4 right-4 w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                aria-label="Fermer l'introduction"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tête centrale de Kuro avec respiration et yeux stables */}
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="relative">
                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? {}
                        : {
                            scale: [1, 1.25, 1],
                            opacity: [0.35, 0.85, 0.35],
                          }
                    }
                    transition={{
                      duration: BREATH_CYCLE / 1000,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#FFAD00]/40 to-transparent blur-2xl pointer-events-none"
                    aria-hidden="true"
                  />
                  {renderGlassSphere(true)}
                </div>
              </div>

              {/* Révélation cadencée du texte */}
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-medium tracking-wider text-zinc-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)] animate-pulse" />
                  <span>ROOM241 | KURO</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight"
                >
                  Bienvenue chez ROOM241.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.45 }}
                  className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-sm mx-auto font-normal"
                >
                  Moi, c’est Kuro. Je vous accompagne à travers les projets de Rémi : du design, de la vidéo et des idées qui prennent vie sur le terrain.
                </motion.p>
              </div>

              {/* Bouton d'action ambré */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05, duration: 0.4 }}
                className="pt-2"
              >
                <button
                  type="button"
                  onClick={handleDismissIntro}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <span>Explorer le portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
          CAPSULE FLOTTANTE FIXE EN BAS À GAUCHE (POST-INTRODUCTION)
         ====================================================================== */}
      {!isIntroActive && (
        <div
          ref={containerRef}
          id="kuro-container"
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 select-none print:hidden"
        >
          {/* PANNEAU CONVERSATIONNEL GLASSMORPHISM SANS SUPERPOSITION */}
          <AnimatePresence>
            {isBubbleOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 6 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-[calc(100%+14px)] left-0 w-[310px] sm:w-[350px] max-w-[calc(100vw-2rem)] rounded-2xl text-white font-sans z-50 p-4 sm:p-5 flex flex-col"
                style={{
                  backgroundColor: 'rgba(18, 17, 16, 0.90)',
                  backdropFilter: 'blur(26px) saturate(140%)',
                  WebkitBackdropFilter: 'blur(26px) saturate(140%)',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow:
                    '0 25px 60px rgba(0, 0, 0, 0.72), inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(255, 173, 0, 0.08)',
                }}
                role="dialog"
                aria-modal="false"
                aria-label="Dialogue avec Kuro"
              >
                {/* Reflet spéculaire interne confiné dans un conteneur arrondi */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" aria-hidden="true">
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at 35% 0%, rgba(255, 255, 255, 0.09) 0%, transparent 65%)',
                    }}
                  />
                </div>

                {/* En-tête de la bulle avec badge et bouton fermer */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)] animate-pulse" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                      {activeContext.tag}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={closeBubble}
                    className="w-7 h-7 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                    aria-label="Fermer le dialogue avec Kuro"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Corps de texte fluide sans compression */}
                <div className="mb-3.5 relative z-10">
                  <p className="text-xs sm:text-[13px] text-zinc-100 leading-relaxed font-normal">
                    {activeContext.text}
                  </p>
                </div>

                {/* Boutons d'actions structurés et contenus sans débordement */}
                {activeContext.actions && activeContext.actions.length > 0 && (
                  <div className="flex flex-col gap-2 pt-2.5 border-t border-white/10 relative z-10">
                    {activeContext.actions.map((act, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={handleAction(act)}
                        className={`w-full min-h-[38px] px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                          act.primary
                            ? 'bg-[#FFAD00] hover:bg-[#E59B00] text-black shadow-[0_4px_16px_rgba(255,173,0,0.25)]'
                            : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                        }`}
                      >
                        <span className="truncate pr-2">{act.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-80" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Lien discret de rejeu de l'introduction */}
                <div className="pt-2 text-center relative z-10">
                  <button
                    type="button"
                    onClick={handleReplayIntro}
                    className="text-[11px] text-zinc-400 hover:text-[#FFAD00] transition-colors cursor-pointer py-0.5 inline-flex items-center gap-1"
                  >
                    <span>Revoir l'introduction</span>
                    <span className="text-[10px]">↗</span>
                  </button>
                </div>

                {/* Pointeur en losange propre dirigé vers Kuro (non tronqué par overflow) */}
                <div
                  className="absolute -bottom-1.5 left-6 w-3 h-3 border-r border-b border-white/20 rotate-45 pointer-events-none"
                  style={{
                    backgroundColor: 'rgba(18, 17, 16, 0.95)',
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* CAPSULE FIXE AU REPOS — CLIC DU VISITEUR PRIORITAIRE */}
          <button
            type="button"
            onClick={() => {
              if (isBubbleOpen) {
                closeBubble();
              } else {
                speak(activeContext, false);
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`group relative flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-[#09090B]/95 hover:bg-black text-white border border-white/20 hover:border-[#FFAD00]/60 shadow-[0_8px_25px_rgba(0,0,0,0.4)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] transition-all duration-300 min-h-[44px] ${
              isScrolling ? 'opacity-35 pointer-events-none' : 'opacity-100'
            } ${isHovered ? 'scale-105' : 'scale-100'}`}
            aria-label="Kuro, compagnon interactif. Cliquez pour échanger."
            aria-expanded={isBubbleOpen}
            title="Kuro · Compagnon interactif"
          >
            {/* Halo ambré doux en arrière-plan */}
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.14, 1],
                      opacity: isHovered ? [0.6, 0.85, 0.6] : [0.18, 0.38, 0.18],
                    }
              }
              transition={{
                duration: BREATH_CYCLE / 1000,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FFAD00]/40 to-transparent blur-md pointer-events-none"
              aria-hidden="true"
            />

            {/* Sphère vitrée de Kuro avec respiration organique du mochi et regard neutre */}
            {renderGlassSphere(false)}

            <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors pr-0.5">
              Kuro
            </span>

            <span
              className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]"
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </>
  );
}
