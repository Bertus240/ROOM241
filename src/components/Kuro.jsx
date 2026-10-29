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
 *    - Texte : Moi, c’est Kuro. Je vous accompagne à travers les projets de Rémi : du design, de la vidéo et des idées qui prennent vie sur le terrain. Par ici, je vous montre tout ça.
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
  "Chaque projet a son histoire. Je vous emmène découvrir celles que Rémi a contribué à construire, de la première idée au résultat final.",
  "Pour comprendre son travail, il faut aussi connaître le chemin parcouru. Je vous présente les expériences qui ont façonné son regard et sa manière de créer.",
  "Des stands de grande envergure aux animations diffusées sur écran géant, voici comment Rémi a contribué à faire vivre une identité de marque sur le terrain.",
  "Rémi aime aussi prendre le temps de regarder. Des lumières, des lieux, des détails parfois discrets… Je vous laisse découvrir ce qui attire son œil en dehors du travail.",
  "Vous avez un projet en tête ? Une idée à explorer ? Je peux vous orienter pour prendre contact avec Rémi.",
  "Chaque projet présenté ici correspond à un travail réel, documenté et vérifiable.",
  "Une identité visuelle réussie doit vivre aussi bien sur un écran que sur un stand ou sur un chantier.",
  "La rigueur technique et la sensibilité graphique forment un équilibre précieux.",
  "N'hésitez pas à consulter le CV pour découvrir le parcours académique et professionnel.",
  "Bonne visite ! Je reste disponible si vous avez besoin d'un éclairage."
];

// Phrases contextuelles selon la section
const CONTEXT_MESSAGES = {
  home: {
    key: 'home',
    text: "Moi, c’est Kuro. Je vous accompagne à travers les projets de Rémi : du design, de la vidéo et des idées qui prennent vie sur le terrain. Par ici, je vous montre tout ça.",
    title: "Bienvenue chez ROOM241"
  },
  projets: {
    key: 'projets',
    text: "Chaque projet a son histoire. Je vous emmène découvrir celles que Rémi a contribué à construire, de la première idée au résultat final.",
    title: "Projets • Réalisations"
  },
  parcours: {
    key: 'parcours',
    text: "Pour comprendre son travail, il faut aussi connaître le chemin parcouru. Je vous présente les expériences qui ont façonné son regard et sa manière de créer.",
    title: "Parcours • Expériences"
  },
  hornetsecurity: {
    key: 'hornetsecurity',
    text: "Des stands de grande envergure aux animations diffusées sur écran géant, voici comment Rémi a contribué à faire vivre une identité de marque sur le terrain.",
    title: "Hornetsecurity • Salons européens"
  },
  freshdata: {
    key: 'freshdata',
    text: "Vulgarisation technique et campagne participative : un univers graphique complet conçu pour porter un projet jusqu'au financement Ulule (validé à 116 %).",
    title: "Fresh Data • Financement Ulule"
  },
  resin: {
    key: 'resin',
    text: "L'identité visuelle se déploie sur les réseaux, les supports d'aide à la vente et directement sur les chantiers sans démolition.",
    title: "Résin'Architecte • Sur le terrain"
  },
  photographie: {
    key: 'photographie',
    text: "Rémi aime aussi prendre le temps de regarder. Des lumières, des lieux, des détails parfois discrets… Je vous laisse découvrir ce qui attire son œil en dehors du travail.",
    title: "Photographie • Regard"
  },
  contact: {
    key: 'contact',
    text: "Vous avez un projet en tête ? Une idée à explorer ? Je peux vous orienter pour prendre contact avec Rémi.",
    title: "Contact • Échange"
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
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isArrivalWaveActive, setIsArrivalWaveActive] = useState(false);
  const [kuroCoords, setKuroCoords] = useState({ x: 36, y: typeof window !== 'undefined' ? window.innerHeight - 36 : 600 });
  const [isMicroWaveActive, setIsMicroWaveActive] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Présence subtile et élégante : Kuro reste calme dans son coin au chargement, pas de popup intempestif
  const [isCenterStage, setIsCenterStage] = useState(false);

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

  // Déclenchement de la séquence d'ondes lumineuses d'arrivée (une seule fois par session)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (prefersReducedMotion) return;

    const played = sessionStorage.getItem('room241_kuro_waves_played');
    if (played === 'true') return;

    // Mesurer les coordonnées physiques réelles de Kuro dès son ancrage
    const timer = setTimeout(() => {
      if (kuroRef.current) {
        const rect = kuroRef.current.getBoundingClientRect();
        setKuroCoords({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
      setIsArrivalWaveActive(true);

      // Clôture et démontage complet du portail d'ondes après 2.6s
      const teardown = setTimeout(() => {
        setIsArrivalWaveActive(false);
        sessionStorage.setItem('room241_kuro_waves_played', 'true');
      }, 2600);

      return () => clearTimeout(teardown);
    }, 350);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // Détection du scroll : atténue discrètement Kuro pendant le défilement et restaure à l'arrêt
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScrollActivity = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250);

      // Détection de proximité du pied de page pour éviter tout chevauchement avec les liens
      const distanceToBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setIsNearBottom(distanceToBottom < 180);
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
    let messageData = { key: 'general', title: 'Kuro | Notes de studio', text: GENERAL_PHRASES[nextIdx] };
    if (path.includes('projets') || path.includes('hornet')) messageData = CONTEXT_MESSAGES.hornetsecurity;
    if (path.includes('parcours')) messageData = CONTEXT_MESSAGES.parcours;

    setActiveMessage(messageData);
    setIsBubbleOpen(true);

    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    autoCloseTimerRef.current = setTimeout(() => {
      setIsBubbleOpen(false);
    }, 6500);
  };

  // Détection du scroll contextuel (met à jour le contexte en coulisse sans ouvrir intempestivement la bulle)
  useEffect(() => {
    if (isCenterStage) return;

    const sections = [
      { id: 'projets', data: CONTEXT_MESSAGES.projets },
      { id: 'hornetsecurity', data: CONTEXT_MESSAGES.hornetsecurity },
      { id: 'fresh-data', data: CONTEXT_MESSAGES.freshdata },
      { id: 'resin-architecte', data: CONTEXT_MESSAGES.resin },
      { id: 'parcours', data: CONTEXT_MESSAGES.parcours },
      { id: 'hors-cadre', data: CONTEXT_MESSAGES.photographie },
      { id: 'contact', data: CONTEXT_MESSAGES.contact },
    ];

    const handleScroll = () => {
      // Ferme automatiquement la bulle dès que l'utilisateur scrolle pour ne jamais masquer le contenu
      if (isBubbleOpen) {
        setIsBubbleOpen(false);
      }

      const scrollPos = window.scrollY + window.innerHeight * 0.45;

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos <= bottom) {
            setActiveMessage(sec.data);
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
        {/* Reflet spéculaire doux, organique et asymétrique (verre poli sphérique, zéro forme rigide de gélule) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
          style={{
            background: isLarge
              ? 'radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.14) 28%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)'
              : 'radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.16) 28%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        {/* Liseré de courbure supérieure de verre délicat */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 2%, rgba(255, 255, 255, 0.22) 0%, transparent 35%)',
          }}
          aria-hidden="true"
        />

        {/* Halo ambré micro-réfléchi au bas de la sphère de verre */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 95%, rgba(255, 173, 0, 0.25) 0%, transparent 45%)',
          }}
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
          0. ONDES CONCENTRIQUES LUMINEUSES D'ARRIVÉE (SIGNATURE VISUELLE IMMERSIVE)
          Strictement décoratif, pointer-events-none, sans scrollbar ni layout shift
         ======================================================== */}
      {typeof document !== 'undefined' &&
        isArrivalWaveActive &&
        createPortal(
          <div
            className="fixed inset-0 pointer-events-none overflow-hidden z-30 select-none"
            aria-hidden="true"
          >
            {/* Lueur d'ambiance radiale dorée douce centrée sur Kuro */}
            <div
              className="absolute rounded-full transition-opacity duration-1000"
              style={{
                left: kuroCoords.x,
                top: kuroCoords.y,
                width: 500,
                height: 500,
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(circle, rgba(255, 173, 0, 0.18) 0%, rgba(255, 173, 0, 0.05) 45%, transparent 70%)',
              }}
            />

            {/* Onde 1 : Vaste onde lumineuse principale */}
            <motion.div
              initial={{ width: 36, height: 36, opacity: 0.65, scale: 0.8 }}
              animate={{
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? 700 : 1800,
                height: typeof window !== 'undefined' && window.innerWidth < 768 ? 700 : 1800,
                opacity: 0,
                scale: 1,
              }}
              transition={{
                duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 1.8 : 2.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute rounded-full border border-[#FFAD00]/45 shadow-[0_0_25px_rgba(255,173,0,0.35)]"
              style={{
                left: kuroCoords.x,
                top: kuroCoords.y,
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Onde 2 : Écho médian décalé */}
            <motion.div
              initial={{ width: 36, height: 36, opacity: 0.55, scale: 0.8 }}
              animate={{
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? 520 : 1350,
                height: typeof window !== 'undefined' && window.innerWidth < 768 ? 520 : 1350,
                opacity: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.28,
                duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 1.6 : 2.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute rounded-full border border-[#FFAD00]/40 shadow-[0_0_20px_rgba(255,173,0,0.25)]"
              style={{
                left: kuroCoords.x,
                top: kuroCoords.y,
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Onde 3 : Cœur dense et précis */}
            <motion.div
              initial={{ width: 36, height: 36, opacity: 0.5, scale: 0.8 }}
              animate={{
                width: typeof window !== 'undefined' && window.innerWidth < 768 ? 360 : 950,
                height: typeof window !== 'undefined' && window.innerWidth < 768 ? 360 : 950,
                opacity: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.55,
                duration: typeof window !== 'undefined' && window.innerWidth < 768 ? 1.4 : 1.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute rounded-full border border-[#FFAD00]/30 shadow-[0_0_15px_rgba(255,173,0,0.2)]"
              style={{
                left: kuroCoords.x,
                top: kuroCoords.y,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>,
          document.body
        )}

      {/* ========================================================
          1. PRÉSENTATION CENTRALE (UNIQUEMENT LORS D'UN APPEL EXPLICITE)
         ======================================================== */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isCenterStage && !isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label="Présentation officielle de Kuro, compagnon du studio ROOM241"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md select-none"
              >
                <div className="absolute inset-0 cursor-default" onClick={handleDismissCenter} />

                <motion.div
                  initial={{ scale: 0.9, y: 16, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.9, y: 16, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-lg rounded-3xl bg-[#09090B] border border-white/20 p-7 sm:p-9 shadow-2xl text-center space-y-6 z-10 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={handleDismissCenter}
                    className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Fermer la présentation de Kuro"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex justify-center pt-2">
                    <div className="relative">
                      <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#FFAD00]/30 to-transparent blur-2xl animate-pulse pointer-events-none" />
                      <motion.div
                        animate={prefersReducedMotion ? {} : { y: [0, -4, 0] }}
                        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        {renderKuroCapsule(true)}
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono font-medium tracking-wider text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)]" />
                      <span>ROOM241 | KURO, COMPAGNON CRÉATIF</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      Bienvenue chez ROOM241.
                    </h2>

                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md mx-auto font-normal">
                      Moi, c’est Kuro. Je vous accompagne à travers les projets de Rémi : du design, de la vidéo et des idées qui prennent vie sur le terrain. Par ici, je vous montre tout ça.
                    </p>
                  </div>

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
          2. KURO NICHE DANS SON COIN (AVEC SAFE-AREA, TOUCH TARGET 44PX & MICRO-ONDE)
          Atténuation discrète pendant le défilement (isScrolling)
         ======================================================== */}
      {!isCenterStage && !isModalOpen && (
        <motion.div
          ref={kuroRef}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            left: 'max(1rem, env(safe-area-inset-left, 1rem))',
            bottom: isNearBottom
              ? 'max(5.5rem, calc(env(safe-area-inset-bottom, 1rem) + 4.5rem))'
              : 'max(1rem, env(safe-area-inset-bottom, 1rem))',
          }}
          className={`fixed z-40 select-none flex flex-col items-start gap-3 transition-all duration-300 ${
            isScrolling ? 'opacity-30 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Bulle de dialogue contextuelle au-dessus de Kuro (bornée à la largeur mobile pour ne jamais déborder) */}
          <AnimatePresence>
            {isBubbleOpen && activeMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[calc(100vw-2rem)] sm:max-w-sm rounded-2xl bg-[#09090B] text-white p-4 shadow-2xl border border-white/15 backdrop-blur-xl space-y-2"
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

          {/* Bouton tactile capsule Kuro dans son coin avec flottement organique subtil */}
          <div className="relative group">
            {/* Halo d'aura ambré subtil */}
            <div
              className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#FFAD00]/25 to-transparent blur-md transition-opacity duration-300 pointer-events-none ${
                isHappy ? 'opacity-100 scale-125' : isHovered ? 'opacity-80 scale-105' : 'opacity-40'
              }`}
              aria-hidden="true"
            />

            {/* Micro-onde lumineuse lors du survol ou du toucher mobile */}
            <AnimatePresence>
              {isMicroWaveActive && !prefersReducedMotion && (
                <motion.div
                  initial={{ width: 36, height: 36, opacity: 0.85, scale: 0.85 }}
                  animate={{ width: 96, height: 96, opacity: 0, scale: 2.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FFAD00]/70 pointer-events-none shadow-[0_0_15px_rgba(255,173,0,0.5)]"
                />
              )}
            </AnimatePresence>

            {/* Wrapper d'animation organique lente (flottement 3-4px & micro-inclinaison 1°, désactivé sur reduced-motion et scroll) */}
            <motion.div
              animate={
                prefersReducedMotion || isScrolling
                  ? {}
                  : {
                      y: [0, -3.5, 0],
                      rotate: [-0.75, 0.75, -0.75],
                    }
              }
              transition={{
                y: {
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 6.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              <motion.button
                type="button"
                animate={controls}
                onClick={handleCornerClick}
                onMouseEnter={() => {
                  setIsHovered(true);
                  if (!prefersReducedMotion) {
                    setIsMicroWaveActive(true);
                    setTimeout(() => setIsMicroWaveActive(false), 650);
                  }
                }}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => {
                  setIsTouched(true);
                  if (!prefersReducedMotion) {
                    setIsMicroWaveActive(true);
                    setTimeout(() => setIsMicroWaveActive(false), 650);
                  }
                }}
                onTouchEnd={() => setIsTouched(false)}
                className={`relative flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 min-h-[44px] min-w-[44px] rounded-full bg-[#09090B]/95 hover:bg-[#09090B] backdrop-blur-xl border border-white/15 hover:border-[#FFAD00]/50 shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] ${
                  isTouched ? 'scale-95' : ''
                }`}
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
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
