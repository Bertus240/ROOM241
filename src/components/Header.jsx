import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Mail, Phone, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Header & Menu Mobile Plein Écran Éditorial — Studio ROOM241
 * 
 * Direction artistique :
 * - Desktop : Barre de navigation minimaliste blanche avec curseur coulissant continu 100% stable
 * - Mobile : Expérience plein écran immersive (Full-Screen Editorial Drawer)
 *   * Typographie Geist / Inter généreuse et aérée
 *   * Entrée séquentielle soignée (staggered delay)
 *   * Liens avec numérotation 01, 02, 03 et sous-titres éditoriaux
 *   * Zone inférieure structurée (Disponibilité, Coordonnées directes, CTA de contact)
 *   * Respect strict de prefers-reduced-motion, accessibilité ARIA et fermeture Échap
 */
export default function Header({ currentPath = '/', navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, ready: false });
  const navRef = useRef(null);
  const tabRefs = useRef([]);

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

  // Exactement 3 entrées principales documentées
  const navLinks = [
    { label: 'Accueil', path: '/', subtitle: 'Vision créative & présentation 360°' },
    { label: 'Projets', path: '/projets', subtitle: 'Stands > 150 m², identités de marque & vidéo' },
    { label: 'Parcours', path: '/parcours', subtitle: 'Expériences, compétences, photo & marathon' },
  ];

  // Calcul déterministe de l'index actif (Accueil: 0, Projets: 1, Parcours: 2)
  useEffect(() => {
    if (
      currentPath.startsWith('/parcours') ||
      currentPath.startsWith('/a-propos') ||
      currentPath.startsWith('/hors-cadre')
    ) {
      setActiveIndex(2);
    } else if (
      currentPath.startsWith('/projets') ||
      currentPath.startsWith('/hornetsecurity') ||
      currentPath.startsWith('/studio') ||
      currentPath.startsWith('/realisations')
    ) {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  }, [currentPath]);

  // Mesure et mise à jour de la position exacte du curseur coulissant continu
  const updateIndicator = () => {
    const nav = navRef.current;
    const activeTab = tabRefs.current[activeIndex];
    if (!nav || !activeTab) return;

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
  }, [activeIndex]);

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

  // Vérifie si un chemin est actif
  const isActive = (path) => {
    if (path === '/') return activeIndex === 0;
    if (path.startsWith('/projets')) return activeIndex === 1;
    if (path.startsWith('/parcours')) return activeIndex === 2;
    return currentPath === path;
  };

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    if (navigate) {
      navigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/80 py-3 shadow-[0_2px_15px_rgba(0,0,0,0.03)]'
            : 'bg-white/80 backdrop-blur-sm py-4 border-b border-zinc-100'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">

          {/* Gauche : Logo officiel ROOM241 pur sans point ambré */}
          <a
            href="/"
            onClick={handleNav('/')}
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] rounded-lg px-1 py-0.5"
            aria-label="ROOM241 - Retour à l'accueil"
          >
            <img
              src="/assets/logos/430x95_Framer_Black@4x.png"
              alt="ROOM241"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              loading="eager"
            />
          </a>

          {/* Centre : Navigation principale Desktop avec curseur coulissant continu 100% stable */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center relative p-1 rounded-full bg-zinc-100/90 border border-zinc-200/80 shadow-inner"
            aria-label="Navigation principale"
          >
            {/* Curseur coulissant physique continu */}
            <span
              className={`absolute top-1 bottom-1 rounded-full bg-white shadow-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
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
              return (
                <a
                  key={link.path}
                  ref={(el) => (tabRefs.current[index] = el)}
                  href={link.path}
                  onClick={handleNav(link.path)}
                  className={`relative z-10 px-5 py-2 text-xs font-semibold rounded-full transition-colors duration-200 select-none ${
                    active ? 'text-zinc-950 font-bold' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Droite : Bouton distinct d'action « Prendre contact » Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={handleNav('#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <span>Prendre contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
            </a>
          </div>

          {/* Mobile : Bouton hamburger d'ouverture */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] active:scale-95"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="w-5 h-5 text-zinc-900" strokeWidth={2.25} />
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================
          MENU MOBILE PLEIN ÉCRAN ÉDITORIAL (EXPÉRIENCE D'AUTEUR)
         ======================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 md:hidden bg-white flex flex-col justify-between overflow-y-auto"
          >
            {/* Lueur d'ambiance dorée d'arrière-plan */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FFAD00]/10 via-amber-200/5 to-transparent blur-3xl pointer-events-none" />

            {/* 1. Barre d'en-tête du menu mobile */}
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between shrink-0 relative z-10 bg-white/80 backdrop-blur-md">
              <a
                href="/"
                onClick={handleNav('/')}
                className="flex items-center"
                aria-label="ROOM241 - Accueil"
              >
                <img
                  src="/assets/logos/430x95_Framer_Black@4x.png"
                  alt="ROOM241"
                  className="h-6 w-auto object-contain"
                />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 flex items-center justify-center transition-all cursor-pointer active:scale-95 border border-zinc-200 shadow-2xs"
                aria-label="Fermer le menu"
              >
                <X className="w-5 h-5 text-zinc-900" strokeWidth={2.25} />
              </button>
            </div>

            {/* 2. Navigation centrale avec typographie éditoriale généreuse */}
            <div className="px-6 py-8 flex-grow flex flex-col justify-center space-y-6 relative z-10">
              
              <div className="flex items-center gap-2 pb-2 border-b border-zinc-100">
                <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.8)]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                  Navigation // Studio ROOM241
                </span>
              </div>

              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, index) => {
                  const active = index === activeIndex || isActive(link.path);
                  return (
                    <motion.a
                      key={link.path}
                      href={link.path}
                      onClick={handleNav(link.path)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className={`group p-4 rounded-2xl transition-all flex items-center justify-between ${
                        active
                          ? 'bg-zinc-50 border border-zinc-200 shadow-2xs'
                          : 'hover:bg-zinc-50/70 border border-transparent'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-[#FFAD00] transition-colors">
                            0{index + 1}
                          </span>
                          <span className={`text-2xl font-extrabold tracking-tight ${
                            active ? 'text-zinc-950' : 'text-zinc-800 group-hover:text-zinc-950'
                          }`}>
                            {link.label}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 pl-7 leading-snug">
                          {link.subtitle}
                        </p>
                      </div>

                      {active ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFAD00]/15 border border-[#FFAD00]/30 text-xs font-sans font-bold text-amber-950 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] animate-pulse" />
                          Actuel
                        </span>
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

            </div>

            {/* 3. Zone inférieure intégrée : Statut, Coordonnées & CTA d'action */}
            <div className="p-6 bg-zinc-50/90 border-t border-zinc-200/80 space-y-4 shrink-0 relative z-10">
              
              {/* Carte de disponibilité */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Statut
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                  Disponible immédiatement • Lille &amp; Hybride
                </span>
              </div>

              {/* Contact direct & LinkedIn */}
              <div className="flex items-center justify-between gap-2 text-xs font-medium text-zinc-600 px-1">
                <a
                  href="mailto:brocart.remi02@gmail.com"
                  className="hover:text-zinc-950 flex items-center gap-1.5 truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FFAD00] shrink-0" />
                  <span className="truncate">brocart.remi02@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/remibrocart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 flex items-center gap-1 shrink-0"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Bouton d'action principal « Prendre contact » */}
              <a
                href="#contact"
                onClick={handleNav('#contact')}
                className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Prendre contact avec Rémi</span>
                <ArrowUpRight className="w-4 h-4 text-[#FFAD00]" />
              </a>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
