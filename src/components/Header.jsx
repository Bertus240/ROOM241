import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ currentPath = '/', navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  // Exactement 3 entrées principales
  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Projets', path: '/projets' },
    { label: 'Parcours', path: '/parcours' },
  ];

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

  const isActive = (path) => {
    if (path === '/') return currentPath === '/';
    if (path === '/projets') {
      return (
        currentPath.startsWith('/projets') ||
        currentPath.startsWith('/hornetsecurity') ||
        currentPath.startsWith('/studio') ||
        currentPath.startsWith('/realisations')
      );
    }
    if (path === '/parcours') {
      return (
        currentPath.startsWith('/parcours') ||
        currentPath.startsWith('/a-propos') ||
        currentPath.startsWith('/hors-cadre')
      );
    }
    return currentPath === path;
  };

  return (
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

        {/* Centre : Navigation principale avec pilule coulissante animée (sans point ambré sous l'onglet) */}
        <nav
          className="hidden md:flex items-center gap-1 p-1 rounded-full bg-zinc-100/90 border border-zinc-200/70"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={handleNav(link.path)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-colors duration-200 ${
                  active
                    ? 'text-[#09090B]'
                    : 'text-[#52525B] hover:text-[#09090B]'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="activeHeaderPill"
                    className="absolute inset-0 rounded-full bg-white shadow-sm border border-zinc-200/60"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Droite : Bouton distinct d'action « Prendre contact » */}
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

        {/* Mobile : Bouton hamburger avec croix nette et non floutée */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-100/90 text-zinc-900 hover:bg-zinc-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
            aria-label={mobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-zinc-900" strokeWidth={2.5} />
            ) : (
              <Menu className="w-5 h-5 text-zinc-900" strokeWidth={2.25} />
            )}
          </button>
        </div>

      </div>

      {/* Fond occultant translucide (backdrop) fermant au clic en dehors */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/45 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu mobile déroulant avec typographie nette et fermeture fiable */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation principale mobile"
          className="relative z-40 md:hidden bg-white border-b border-zinc-200 shadow-2xl p-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Navigation</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-zinc-600 hover:text-black hover:bg-zinc-100 transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="w-4 h-4 text-zinc-900" strokeWidth={2.5} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={handleNav(link.path)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-zinc-100 text-[#09090B] font-bold'
                      : 'text-[#52525B] hover:bg-zinc-50 hover:text-[#09090B]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#09090B]" />}
                </a>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-zinc-100">
            <a
              href="#contact"
              onClick={handleNav('#contact')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#09090B] text-white text-sm font-semibold hover:bg-zinc-800 transition-colors"
            >
              <span>Prendre contact</span>
              <ArrowUpRight className="w-4 h-4 text-[#FFAD00]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
