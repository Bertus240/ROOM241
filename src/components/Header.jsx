import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStoredTheme, applyTheme, onThemeChange } from '../lib/theme';

/**
 * Header & Menu Mobile Plein Écran Éditorial — Studio ROOM241
 * 
 * Intègre la navigation entre les deux univers :
 * - « Mon travail » (Univers Professionnel • Mode clair)
 * - « Au-delà du travail » (Univers Personnel • Véritable mode sombre)
 */
export default function Header({ currentPath = '/', navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, ready: false });
  const [currentTheme, setCurrentTheme] = useState(getStoredTheme());
  const navRef = useRef(null);
  const tabRefs = useRef([]);

  // Écoute des changements de thème globaux
  useEffect(() => {
    return onThemeChange((theme) => {
      setCurrentTheme(theme);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermeture du menu mobile avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Bloquer le scroll d'arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Liens de navigation éditoriale — Exactement 3 entrées principales
  const navLinks = [
    { label: 'Accueil', path: '/', subtitle: 'Vision créative & réalisations' },
    { label: 'Projets', path: '/projets', subtitle: 'Stands > 150 m², identités de marque & vidéo' },
    { label: 'Parcours', path: '/parcours', subtitle: 'Expériences, compétences & CV' },
  ];

  // Calcul déterministe de l'index actif (Accueil: 0, Projets: 1, Parcours: 2)
  useEffect(() => {
    if (
      currentPath.startsWith('/parcours') ||
      currentPath.startsWith('/a-propos')
    ) {
      setActiveIndex(2);
    } else if (
      currentPath.startsWith('/projets') ||
      currentPath.startsWith('/hornetsecurity') ||
      currentPath.startsWith('/studio') ||
      currentPath.startsWith('/realisations')
    ) {
      setActiveIndex(1);
    } else if (currentPath === '/') {
      setActiveIndex(0);
    } else {
      setActiveIndex(-1);
    }
  }, [currentPath]);

  // Mesure et mise à jour de la position exacte du curseur coulissant
  const updateIndicator = () => {
    const nav = navRef.current;
    if (activeIndex === -1 || !tabRefs.current[activeIndex] || !nav) {
      setIndicatorStyle({ left: 0, width: 0, ready: false });
      return;
    }

    const activeTab = tabRefs.current[activeIndex];
    const navRect = nav.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    setIndicatorStyle({
      left: tabRect.left - navRect.left - nav.clientLeft,
      width: tabRect.width,
      ready: true,
    });
  };

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeIndex, currentTheme]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);

    let ro;
    if (navRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateIndicator());
      ro.observe(navRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateIndicator);
      if (ro) ro.disconnect();
    };
  }, [activeIndex]);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    // Si on navigue vers l'univers personnel, on active le mode sombre
    if (path === '/hors-cadre' || path === '/au-dela-du-travail') {
      applyTheme('dark');
    } else if (path === '/' || path === '/projets' || path === '/parcours') {
      // Optionnel : ne pas forcer le mode clair si l'utilisateur souhaite naviguer en sombre
    }

    if (navigate) {
      navigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const isDark = currentTheme === 'dark' || currentPath.startsWith('/hors-cadre') || currentPath.startsWith('/au-dela-du-travail');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-[#0B0A09]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/10 py-3 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
            : 'bg-white/80 dark:bg-[#0B0A09]/80 backdrop-blur-sm py-4 border-b border-zinc-100 dark:border-white/5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">

          {/* Gauche : Logo officiel ROOM241 (s'adapte au mode) */}
          <a
            href="/"
            onClick={handleNav('/')}
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] rounded-lg px-1 py-0.5"
            aria-label="ROOM241 - Retour à l'accueil"
          >
            <img
              src={isDark ? '/assets/logos/430x95_Framer_white@4x.png' : '/assets/logos/430x95_Framer_Black@4x.png'}
              alt="ROOM241"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              loading="eager"
            />
          </a>

          {/* Centre : Navigation principale Desktop avec curseur coulissant continu */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center relative p-1 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-white/10 shadow-inner"
            aria-label="Navigation principale"
          >
            {/* Curseur coulissant physique continu */}
            <span
              className={`absolute top-1 bottom-1 rounded-full bg-white dark:bg-zinc-800 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
                indicatorStyle.ready ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
              }}
              aria-hidden="true"
            />

            {navLinks.map((link, index) => {
              const active = index === activeIndex;
              const isPersonalLink = link.path === '/hors-cadre';
              return (
                <a
                  key={link.path}
                  ref={(el) => (tabRefs.current[index] = el)}
                  href={link.path}
                  onClick={handleNav(link.path)}
                  className={`relative z-10 px-4 py-2 text-xs font-semibold rounded-full transition-colors duration-200 select-none flex items-center gap-1.5 ${
                    active
                      ? 'text-zinc-950 dark:text-white font-bold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {isPersonalLink && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Droite : Bouton Contact Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={handleNav('#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#09090B] dark:bg-white text-white dark:text-[#09090B] text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
            </a>
          </div>

          {/* Mobile : Bouton Menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 text-zinc-900 dark:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] active:scale-95"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="w-5 h-5 text-zinc-900 dark:text-white" strokeWidth={2.25} />
            </button>
          </div>

        </div>
      </header>

      {/* MENU MOBILE PLEIN ÉCRAN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            className="fixed inset-0 z-50 md:hidden flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          >
            {/* Arrière-plan feutré */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Boîte de dialogue du menu */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#121110] border border-zinc-200 dark:border-white/15 p-6 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/10 pb-4">
                <img
                  src={isDark ? '/assets/logos/430x95_Framer_white@4x.png' : '/assets/logos/430x95_Framer_Black@4x.png'}
                  alt="ROOM241"
                  className="h-6 w-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Liste des liens de navigation (Accueil, Projets, Parcours) */}
              <div className="space-y-2">
                {navLinks.map((link, idx) => (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={handleNav(link.path)}
                    className="block p-3 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-zinc-900 dark:text-white">
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-400" />
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-0.5">
                      {link.subtitle}
                    </span>
                  </a>
                ))}
              </div>

              {/* CTA Contact */}
              <div className="pt-2 border-t border-zinc-100 dark:border-white/10">
                <a
                  href="#contact"
                  onClick={handleNav('#contact')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#09090B] dark:bg-white text-white dark:text-[#09090B] text-xs font-bold"
                >
                  <span>Prendre contact</span>
                  <ArrowUpRight className="w-4 h-4 text-[#FFAD00]" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
