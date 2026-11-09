import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowUpRight } from 'lucide-react';

/**
 * ============================================================================
 * KURO — COMPAGNON DE NAVIGATION & RACCOURCIS (ROOM241)
 * Studio ROOM241 • Rémi Brocart
 *
 * Spécification validée :
 * 1. Apparence authentique restaurée :
 *    - Sphère vitrée organique d'origine en #09090B avec ses proportions,
 *      ses reflets spéculaires calottés, son halo ambré inférieur et ses yeux blancs expressifs.
 *    - Animation de respiration d'origine et micro-suivi subtil du regard.
 * 2. Nouveau menu compact validé conservé :
 *    - Déploiement au clic uniquement (zéro auto-trigger intrusif).
 *    - 3 raccourcis majeurs :
 *      01. Stand FIC Lille (> 150 m²)
 *      02. Résin'Architecte (+219 %)
 *      03. Vidéo de présentation (1 min 28 s)
 *    - Pied de carte avec lien « Mon parcours » et consultation du CV.
 * ============================================================================
 */

const BREATH_CYCLE = 4800;

const SHORTCUTS = [
  {
    id: 'hornetsecurity',
    title: "Stand grand format (> 150 m²)",
    subtitle: "Scénographie, arche vidéo & espace B2B",
    path: "/realisations/hornetsecurity",
    badge: "Scénographie"
  },
  {
    id: 'resin-architecte',
    title: "Résin'Architecte",
    subtitle: "Identité visuelle & captation chantier",
    path: "/realisations/resin-architecte",
    badge: "+219 %"
  },
  {
    id: 'video',
    title: "Film de présentation",
    subtitle: "Vision, méthode & compétences",
    isAnchor: true,
    anchorId: 'presentation-video',
    fallbackPath: '/#presentation-video',
    badge: "Vidéo"
  }
];

export default function Kuro({ currentPath = '/', navigate, onOpenCvModal }) {
  const getInitialOpen = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('kuro') === 'open';
    }
    return false;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(getInitialOpen);
  const [showFirstVisitInvite, setShowFirstVisitInvite] = useState(false);
  const [expression, setExpression] = useState('neutral');
  const [isPerkingUp, setIsPerkingUp] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isReturning, setIsReturning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef(null);
  const headRef = useRef(null);
  const capsuleButtonRef = useRef(null);
  const scrollTimeout = useRef(null);
  const inviteDismissTimerRef = useRef(null);

  const dismissInvite = useCallback(() => {
    setShowFirstVisitInvite(false);
    if (inviteDismissTimerRef.current) {
      clearTimeout(inviteDismissTimerRef.current);
      inviteDismissTimerRef.current = null;
    }
    try {
      localStorage.setItem('room241_kuro_welcomed', 'true');
    } catch {
      // Ignorer si localStorage est inaccessible
    }
  }, []);

  // Détection première visite pour invitation discrète avec auto-disparition après 7 secondes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const alreadyWelcomed = localStorage.getItem('room241_kuro_welcomed');
      if (!alreadyWelcomed) {
        const timer = setTimeout(() => {
          setShowFirstVisitInvite(true);
          // Auto-disparition après 7 secondes sans clic
          inviteDismissTimerRef.current = setTimeout(() => {
            dismissInvite();
          }, 7000);
        }, 1800);
        return () => {
          clearTimeout(timer);
          if (inviteDismissTimerRef.current) clearTimeout(inviteDismissTimerRef.current);
        };
      }
    } catch {
      // Ignorer si localStorage est inaccessible (ex. navigation privée stricte)
    }
  }, [dismissInvite]);

  // Détection de prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Détection du scroll pour discrétion visuelle (désactivée si le menu ou l'invitation est actif pour éviter tout désynchronisme d'opacité)
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen || showFirstVisitInvite) {
        setIsScrolling(false);
        return;
      }
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 140);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [isMenuOpen, showFirstVisitInvite]);

  // Clignement périodique des yeux (organique et discret d'origine)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let blinkTimeout = null;
    const scheduleBlink = () => {
      const interval = 4000 + Math.random() * 2800;
      blinkTimeout = setTimeout(() => {
        setExpression('blink');
        setTimeout(() => {
          setExpression('neutral');
          scheduleBlink();
        }, 120);
      }, interval);
    };

    scheduleBlink();
    return () => {
      if (blinkTimeout) clearTimeout(blinkTimeout);
    };
  }, [prefersReducedMotion]);

  // Suivi tactile & curseur d'origine (amplitude max 1.8px)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId = null;
    const handleMouseMove = (e) => {
      if (!headRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = headRef.current.getBoundingClientRect();
        const headCenterX = rect.left + rect.width / 2;
        const headCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - headCenterX;
        const deltaY = e.clientY - headCenterY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 500) {
          setIsReturning(true);
          setEyeOffset({ x: 0, y: 0 });
          return;
        }

        setIsReturning(false);
        const maxOffset = 1.8;
        const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX / 110));
        const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY / 110));

        setEyeOffset({ x: clampedX, y: clampedY });
      });
    };

    const handleMouseLeave = () => {
      setIsReturning(true);
      setEyeOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Ouverture / fermeture manuelle
  const toggleMenu = useCallback(() => {
    dismissInvite();
    setIsPerkingUp(true);
    setIsMenuOpen((prev) => !prev);
    setTimeout(() => setIsPerkingUp(false), 220);
  }, [dismissInvite]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    if (capsuleButtonRef.current) {
      capsuleButtonRef.current.focus();
    }
  }, []);

  // Fermeture par touche Échap et clic à l'extérieur
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
      }
    };

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  // Opacité synchronisée : ne jamais atténuer si le menu ou l'invitation est visible
  const isDimmed = isScrolling && !isMenuOpen && !showFirstVisitInvite;

  // Gestion des clics sur les raccourcis
  const handleShortcutClick = (shortcut) => (e) => {
    if (e) e.preventDefault();
    closeMenu();

    // Raccourci vers la vidéo
    if (shortcut.isAnchor) {
      const isHome = currentPath === '/' || currentPath === '';
      if (isHome) {
        const el = document.getElementById(shortcut.anchorId);
        if (el) {
          el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          return;
        }
      }
      if (navigate) {
        navigate(shortcut.fallbackPath);
      } else {
        window.location.href = shortcut.fallbackPath;
      }
      return;
    }

    // Navigation standard vers les réalisations
    if (navigate) {
      navigate(shortcut.path);
    } else {
      window.location.href = shortcut.path;
    }
  };

  /**
   * ==========================================================================
   * TÊTE DE KURO — SPHÈRE VITRÉE ET REGARD ORGANIQUE D'ORIGINE
   * (Proportions, dégradés, liseré et reflets spéculaires authentiques)
   * ==========================================================================
   */
  const renderGlassSphere = (isLarge = false) => {
    const sizeClasses = isLarge ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-8 h-8 sm:w-9 sm:h-9';
    const eyeWidthPx = isLarge ? 16 : 9;
    const eyeHeightPx = isLarge ? 20 : 12;
    const pupilSizePx = isLarge ? 10 : 5.5;
    const eyeGapPx = isLarge ? 12 : 6;

    const pxOffsetX = eyeOffset.x * (isLarge ? 1.4 : 1);
    const pxOffsetY = eyeOffset.y * (isLarge ? 1.4 : 1);
    const isClosed = expression === 'blink';

    return (
      <div
        ref={headRef}
        className={`relative ${sizeClasses} flex items-center justify-center shrink-0 select-none`}
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : isPerkingUp
              ? { y: -3.5, scale: 1.06 }
              : { y: 0, scale: [1, 1.045, 1] }
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
          {/* Reflet spéculaire elliptique d'origine */}
          <motion.div
            animate={prefersReducedMotion ? {} : { opacity: [0.45, 0.72, 0.45] }}
            transition={{ duration: BREATH_CYCLE / 1000, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse at 32% 23%, rgba(255, 255, 255, 0.52) 0%, rgba(255, 255, 255, 0.2) 26%, rgba(255, 255, 255, 0.03) 48%, transparent 64%)',
            }}
          />

          {/* Liseré de courbure de verre */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.22) 0%, transparent 40%)',
            }}
          />

          {/* Halo ambré inférieur */}
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
                : { duration: BREATH_CYCLE / 1000, repeat: Infinity, ease: 'easeInOut' }
            }
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 92%, rgba(255, 173, 0, 0.35) 0%, transparent 45%)',
            }}
          />

          {/* Yeux expressifs et stables d'origine */}
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
                  transition: isReturning
                    ? 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 0.08s ease-out',
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
                  transition: isReturning
                    ? 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'transform 0.08s ease-out',
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
    <div
      ref={containerRef}
      id="kuro-container"
      className="fixed bottom-4 left-3.5 sm:bottom-6 sm:left-6 z-40 select-none print:hidden pointer-events-auto font-sans"
    >
      {/* ======================================================================
          TOAST D'INVITATION PREMIÈRE VISITE (DISCRET, NON-BLOQUANT, SANS RÉPÉTITION)
         ====================================================================== */}
      <AnimatePresence>
        {showFirstVisitInvite && !isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 1, scale: 1, y: [0, -5, 0, -2, 0] }
            }
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.9, times: [0, 0.3, 0.6, 0.8, 1], ease: 'easeInOut' }
            }
            className="absolute bottom-[calc(100%+12px)] left-0 w-[260px] sm:w-[290px] max-w-[calc(100vw-2rem)] rounded-2xl text-white z-40 p-3 flex items-center justify-between gap-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]"
            style={{
              backgroundColor: 'rgba(22, 21, 20, 0.97)',
              backdropFilter: 'blur(24px) saturate(135%)',
              WebkitBackdropFilter: 'blur(24px) saturate(135%)',
              border: '1px solid rgba(255, 173, 0, 0.25)',
            }}
            role="status"
            aria-live="polite"
          >
            <button
              type="button"
              onClick={() => {
                dismissInvite();
                toggleMenu();
              }}
              className="flex items-center gap-2.5 text-left flex-1 min-w-0 cursor-pointer group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFAD00] rounded-lg"
              aria-label="Explorer le portfolio avec Kuro"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.9)] shrink-0 animate-pulse" />
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-semibold text-zinc-100 group-hover:text-[#FFAD00] transition-colors block leading-snug">
                  Explorer le portfolio
                </span>
                <span className="text-[11px] text-zinc-400 group-hover:text-zinc-300 transition-colors block truncate">
                  Accès direct aux projets et études de cas
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={dismissInvite}
              className="w-7 h-7 min-w-[28px] min-h-[28px] rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center shrink-0 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFAD00]"
              aria-label="Fermer l'invitation"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
          MENU COMPACT DE RACCOURCIS (DÉPLOYÉ AU CLIC MANUEL)
         ====================================================================== */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[calc(100%+12px)] left-0 w-[290px] sm:w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl text-white z-50 p-3 sm:p-4 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.65),0_4px_16px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(255,173,0,0.12)]"
            style={{
              backgroundColor: 'rgba(22, 21, 20, 0.97)',
              backdropFilter: 'blur(28px) saturate(135%)',
              WebkitBackdropFilter: 'blur(28px) saturate(135%)',
              border: '1px solid rgba(255, 173, 0, 0.22)',
            }}
            role="dialog"
            aria-modal="false"
            aria-label="Menu de raccourcis Kuro"
          >
            {/* Liseré supérieur biseauté */}
            <div
              className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none rounded-t-2xl"
              aria-hidden="true"
            />

            {/* En-tête sobre */}
            <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)]" />
                <span className="text-[11px] font-semibold tracking-wider text-[#FFAD00] uppercase">
                  ROOM241 · ACCÈS RAPIDE
                </span>
              </div>

              <button
                type="button"
                onClick={closeMenu}
                className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                aria-label="Fermer le menu des raccourcis"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Liste des 3 raccourcis clés */}
            <div className="space-y-1.5">
              {SHORTCUTS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={handleShortcutClick(item)}
                  className="w-full text-left p-2.5 rounded-xl border border-white/5 hover:border-[#FFAD00]/40 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFAD00]"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[11px] font-mono text-zinc-400">
                        0{idx + 1}.
                      </span>
                      <span className="text-xs font-semibold text-white group-hover:text-[#FFAD00] transition-colors truncate">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 group-hover:text-zinc-300 transition-colors truncate">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] font-mono font-medium text-[#FFAD00] bg-[#FFAD00]/10 px-1.5 py-0.5 rounded border border-[#FFAD00]/25">
                      {item.badge}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FFAD00] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            {/* Pied de menu épuré avec « Le parcours de Rémi » */}
            <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <a
                href="/parcours"
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  if (navigate) navigate('/parcours');
                  else window.location.href = '/parcours';
                }}
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 py-1"
              >
                <span>Le parcours de Rémi</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>

              {onOpenCvModal ? (
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onOpenCvModal();
                  }}
                  className="text-zinc-400 hover:text-[#FFAD00] transition-colors font-medium py-1 cursor-pointer"
                >
                  Consulter CV
                </button>
              ) : (
                <a
                  href="mailto:brocart.remi02@gmail.com"
                  className="text-zinc-400 hover:text-[#FFAD00] transition-colors font-medium py-1"
                >
                  Contact
                </a>
              )}
            </div>

            {/* Connecteur géométrique vers la capsule */}
            <div
              className="absolute -bottom-1.5 left-7 w-3 h-3 rotate-45 pointer-events-none"
              style={{
                backgroundColor: 'rgba(22, 21, 20, 0.97)',
                borderRight: '1px solid rgba(255, 173, 0, 0.22)',
                borderBottom: '1px solid rgba(255, 173, 0, 0.22)',
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================================
          CAPSULE VISUELLE AU REPOS D'ORIGINE :
          Fond #09090B/95, halo ambré doux [1, 1.14, 1], sphère vitrée authentique
         ====================================================================== */}
      <button
        ref={capsuleButtonRef}
        type="button"
        onClick={toggleMenu}
        onMouseEnter={() => {
          if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-[#09090B]/95 hover:bg-black text-white border border-white/20 hover:border-[#FFAD00]/60 shadow-[0_8px_25px_rgba(0,0,0,0.4)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] transition-all duration-200 min-h-[44px] ${
          isDimmed ? 'opacity-35 pointer-events-none' : 'opacity-100'
        } ${isHovered ? 'scale-105' : 'scale-100'}`}
        aria-label="Kuro, menu de raccourcis du portfolio. Cliquez pour ouvrir."
        aria-expanded={isMenuOpen}
        title="Kuro · Raccourcis rapides"
      >
        {/* Halo ambré doux d'origine */}
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

        {/* Sphère vitrée organique d'origine */}
        {renderGlassSphere(false)}

        <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors pr-0.5">
          Kuro
        </span>

        {/* Témoin d'activité ambre subtil */}
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
