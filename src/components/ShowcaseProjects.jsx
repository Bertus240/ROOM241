import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import { formatNbsp } from './ProjectBadgeHeader';

// Dérivation déterministe et autonome des projets du showcase depuis la source de vérité projectsData
export const SHOWCASE_PROJECTS = Object.values(projectsData).map((p, idx) => ({
  id: p.slug,
  slug: p.slug,
  number: String(idx + 1).padStart(2, '0'),
  projectName: p.projectName,
  category: p.category,
  editorialTag: p.editorialTag || p.tag,
  shortTag: p.shortTag,
  title: p.title,
  description: p.description,
  highlights: p.highlights || (p.tags ? p.tags.slice(0, 3) : []),
  link: p.destination || `/realisations/${p.slug}`,
  image: p.image,
  alt: p.alt || p.title,
  badgeLabel: p.statusLabel || p.category,
  metricBadge: p.metricBadge,
  secondaryMetric: p.secondaryMetric,
}));

export default function ShowcaseProjects({ navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const containerRef = useRef(null);
  const total = SHOWCASE_PROJECTS.length;
  const currentProject = SHOWCASE_PROJECTS[currentIndex];
  const nextIndex = (currentIndex + 1) % total;
  const nextProject = SHOWCASE_PROJECTS[nextIndex];

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % total;
      }
      return (prev - 1 + total) % total;
    });
  }, [total]);

  // Navigation au clavier lorsque le composant est actif ou survolé
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isHovered) return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHovered, paginate]);

  // Gestion du swipe tactile sans bloquer le scroll vertical naturel
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStart = (e) => {
    setIsTouching(true);
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e) => {
    setIsTouching(false);
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Seuil de détection du swipe horizontal : au moins 45px
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4 && deltaTime < 600) {
      if (deltaX < 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    }
  };

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.99,
      transition: {
        opacity: { duration: 0.18 },
        x: { duration: 0.18 },
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Sélection de réalisations ROOM241"
      className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-8 sm:space-y-10 outline-none select-none"
    >
      {/* 1. En-tête éditorial avec contrôles de navigation intégrés */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-5 border-b border-zinc-200/80 dark:border-white/10">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span>Sélection éditoriale • Projets clés</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B] dark:text-white">
            Sélection de réalisations
          </h2>
          <p className="text-xs sm:text-sm text-[#71717A] dark:text-zinc-400 font-normal leading-relaxed">
            Une sélection de collaborations concrètes articulant scénographie grand format, univers de marque et valorisation technique de terrain.
          </p>
        </div>

        {/* Commandes : Compteur & Flèches de navigation circulaire */}
        <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-end shrink-0">
          {/* Indicateur de progression typographique */}
          <div className="text-xs font-mono tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">
            <span className="text-[#09090B] dark:text-white font-bold text-sm">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="mx-1">/</span>
            <span>{String(total).padStart(2, '0')}</span>
          </div>

          {/* Boutons flèches minimalistes */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-white/30 text-zinc-900 dark:text-white flex items-center justify-center transition-all active:scale-95 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] cursor-pointer"
              aria-label="Projet précédent"
              title="Projet précédent (flèche gauche)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-white/30 text-zinc-900 dark:text-white flex items-center justify-center transition-all active:scale-95 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] cursor-pointer"
              aria-label="Projet suivant"
              title="Projet suivant (flèche droite)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Lien vers tous les projets */}
          <a
            href="/projets"
            onClick={handleNav('/projets')}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#09090B] dark:text-white hover:text-[#FFAD00] dark:hover:text-[#FFAD00] transition-colors pl-2"
          >
            <span>Voir tous les projets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Scène du Showcase avec Réalisation Principale + Aperçu Suivant (Peek-Ahead) */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Carte Principale Active (Framer Motion) */}
          <div className="lg:col-span-10 relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-6 sm:p-10 rounded-3xl bg-zinc-50/95 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* Visuel principal haute définition avec overlay progressif */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/15 bg-zinc-950 shadow-sm group">
                      <img
                        src={currentProject.image}
                        alt={currentProject.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading={currentIndex === 0 ? "eager" : "lazy"}
                      />
                      {/* Overlay photographique progressif depuis le bas */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                      
                      {/* Badge métrique en verre dépoli (Frosted Glass) */}
                      {currentProject.metricBadge && (
                        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 pointer-events-none">
                          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-xl bg-black/55 backdrop-blur-md border border-white/20 shadow-md text-white">
                            <span className="font-mono font-bold text-xs sm:text-base text-[#FFAD00] tracking-tight whitespace-nowrap">
                              {formatNbsp(currentProject.metricBadge.value)}
                            </span>
                            <span className="text-[10px] sm:text-xs text-zinc-200 font-medium tracking-wide whitespace-nowrap">
                              {formatNbsp(currentProject.metricBadge.label)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Badge de statut / tag éditorial au bas de l'image */}
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white bg-black/65 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border border-white/20 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]" />
                          <span>{currentProject.shortTag || currentProject.editorialTag || currentProject.badgeLabel}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bloc éditorial descriptif */}
                  <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                        <span>{currentProject.editorialTag || currentProject.category}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#09090B] dark:text-white leading-[1.2]">
                        {currentProject.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#52525B] dark:text-zinc-300 leading-relaxed font-normal">
                        {currentProject.description}
                      </p>
                    </div>

                    {/* Points saillants qualitatifs & métrique secondaire */}
                    <div className="space-y-2 pt-1">
                      {currentProject.secondaryMetric && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-white/10">
                          <span className="font-bold text-[#FFAD00] whitespace-nowrap">{formatNbsp(currentProject.secondaryMetric.value)}</span>
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 whitespace-nowrap">{formatNbsp(currentProject.secondaryMetric.label)}</span>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                        {currentProject.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action principale vers l'étude de cas */}
                    <div className="pt-3">
                      <a
                        href={currentProject.link}
                        onClick={handleNav(currentProject.link)}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#09090B] dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-[#09090B] text-xs font-semibold tracking-wide transition-all active:scale-95 shadow-xs cursor-pointer group"
                      >
                        <span>Consulter l'étude de cas</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00] dark:text-zinc-950 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Aperçu du Projet Suivant sur Desktop (Peek-Ahead) */}
          <div
            onClick={() => paginate(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                paginate(1);
              }
            }}
            className="hidden lg:flex lg:col-span-2 flex-col justify-between p-5 rounded-3xl bg-zinc-100/70 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200/70 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden"
            aria-label={`Aperçu du projet suivant : ${nextProject.title}`}
            title="Cliquer pour voir ce projet"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
                  Suivant • {nextProject.number}
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Miniature avec recadrage élégant */}
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-white/10 shadow-2xs relative">
                <img
                  src={nextProject.image}
                  alt={nextProject.alt}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#FFAD00] block mb-1">
                  {nextProject.category}
                </span>
                <p className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                  {nextProject.title}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200/60 dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white">
              <span>Découvrir</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Raccourci tactile mobile vers tous les projets */}
      <div className="flex items-center justify-end pt-2 md:hidden">
        <a
          href="/projets"
          onClick={handleNav('/projets')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09090B] dark:text-white hover:text-[#FFAD00] transition-colors"
        >
          <span>Tous les projets</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
