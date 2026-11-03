import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Layers, ArrowUpRight } from 'lucide-react';

export const SHOWCASE_PROJECTS = [
  {
    id: 'hornetsecurity',
    slug: 'hornetsecurity',
    number: '01',
    category: 'Scénographie & Cybersécurité B2B',
    title: "Stand de plus de 150 m² au FIC, arche vidéo After Effects & Captain Security",
    description: "Conception graphique et habillage de stands internationaux pour le leader européen de la cybersécurité Cloud (Forum InCyber à Lille, it-sa à Nuremberg). Création de la boucle motion design diffusée sur l'arche vidéo du stand, incarnation de marque et supports partenaires B2B.",
    highlights: [
      'Scénographie grand format (> 150 m²)',
      'Arche vidéo After Effects',
      'Salons européens (Lille & Nuremberg)',
    ],
    link: '/projets#hornetsecurity',
    image: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
    alt: "Scénographie événementielle, stand et arche d'accueil Hornetsecurity",
    badgeLabel: "Étude de cas phare",
  },
  {
    id: 'fresh-data',
    slug: 'fresh-data',
    number: '02',
    category: 'Retail Data & Financement',
    title: "Fresh Data — Identité visuelle, pige publicitaire & captation salon MEDFEL",
    description: "Conception de l'univers visuel et des supports de communication pour une solution de veille concurrentielle et de pige publicitaire grande distribution : vulgarisation visuelle de flux de données, supports de présentation commerciale et captation d'interviews au salon MEDFEL.",
    highlights: [
      'Veille publicitaire grande distribution',
      'Campagne de financement participatif',
      'Captation & interviews terrain',
    ],
    link: '/projets#fresh-data',
    image: '/assets/fresh-data-video-cover.jpg',
    alt: "Fresh Data - Couverture salon MEDFEL et supports de communication",
    badgeLabel: "Retail & Vidéo",
  },
  {
    id: 'resin-architecte',
    slug: 'resin-architecte',
    number: '03',
    category: 'Revêtements de sol & Savoir-faire',
    title: "Résin'Architecte — Valorisation technique & communication de chantiers",
    description: "Formalisation de la charte graphique et structuration de la communication pour un spécialiste des revêtements de sol en résine minérale : conception de gabarits éditoriaux, mise en valeur du geste technique et fiches didactiques d'explication de pose.",
    highlights: [
      'Moquette de pierre & résines drainantes',
      'Pédagogie matière & chantiers réels',
      'Gabarits de communication terrain',
    ],
    link: '/projets#resin-architecte',
    image: '/assets/social-proof-ra/post_pool_craft.png',
    alt: "Résin'Architecte - Démonstration technique de pose de résine drainante aux abords d'une piscine",
    badgeLabel: "Direction artistique BTP",
  },
  {
    id: 'jardimax',
    slug: 'jardimax',
    number: '04',
    category: 'Vidéo, Motion & Retail',
    title: "Jardimax — Production vidéo, intervention face caméra & motion design",
    description: "Conception et réalisation d'un dispositif vidéo pour l'enseigne de motoculture Jardimax (SAS DESMEL à Bailleul) : écriture éditoriale, tournage showroom et atelier, animation motion design pédagogique et déclinaisons 16:9 et 9:16.",
    highlights: [
      'Formats 16:9 (YouTube) & 9:16 (TikTok)',
      'Motion design pédagogique "430 €"',
      'Tournage in situ à Bailleul (Flandres)',
    ],
    link: '/projets#jardimax',
    image: '/assets/jardimax/jardimax_cover.jpg',
    alt: "Jardimax - Showroom physique et production vidéo à Bailleul",
    badgeLabel: "Vidéo & Motion",
  },
];

export default function ShowcaseProjects({ navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
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
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Seuil de détection du swipe horizontal : au moins 45px, plus horizontal que vertical
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4 && deltaTime < 600) {
      if (deltaX < 0) {
        paginate(1); // Swipe gauche -> projet suivant
      } else {
        paginate(-1); // Swipe droite -> projet précédent
      }
    }
  };

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.32 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.985,
      transition: {
        opacity: { duration: 0.2 },
        x: { duration: 0.2 },
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-5 border-b border-zinc-200/80">
        <div className="space-y-1.5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span>Sélection éditoriale • Projets clés</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Sélection de réalisations
          </h2>
          <p className="text-xs sm:text-sm text-[#71717A] font-normal leading-relaxed">
            Une sélection de collaborations concrètes articulant scénographie grand format, univers de marque et valorisation technique de terrain.
          </p>
        </div>

        {/* Commandes : Compteur 01/03 & Flèches de navigation circulaire */}
        <div className="flex items-center gap-4 sm:gap-6 self-start sm:self-end shrink-0">
          {/* Indicateur de progression typographique */}
          <div className="text-xs font-mono tracking-wider font-semibold text-zinc-400">
            <span className="text-[#09090B] font-bold text-sm">
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
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 hover:border-zinc-300 text-zinc-900 flex items-center justify-center transition-all active:scale-95 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] cursor-pointer"
              aria-label="Projet précédent"
              title="Projet précédent (flèche gauche)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 hover:border-zinc-300 text-zinc-900 flex items-center justify-center transition-all active:scale-95 shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] cursor-pointer"
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
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-[#09090B] hover:text-[#FFAD00] transition-colors pl-2"
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
                className="p-6 sm:p-10 rounded-3xl bg-zinc-50/95 border border-zinc-200/90 shadow-sm flex flex-col justify-between"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* Visuel principal haute définition */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm group">
                      <img
                        src={currentProject.image}
                        alt={currentProject.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading={currentIndex === 0 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Badge flottant sur l'image */}
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                          <span>{currentProject.badgeLabel}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bloc éditorial descriptif */}
                  <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
                        <span>{currentProject.category}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#09090B] leading-[1.2]">
                        {currentProject.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                        {currentProject.description}
                      </p>
                    </div>

                    {/* Points saillants qualitatifs (sans métriques non vérifiées) */}
                    <div className="pt-1 flex flex-col gap-2 text-xs text-zinc-700 font-medium">
                      {currentProject.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-zinc-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action principale vers l'étude de cas */}
                    <div className="pt-3">
                      <a
                        href={currentProject.link}
                        onClick={handleNav(currentProject.link)}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-semibold tracking-wide transition-all active:scale-95 shadow-xs cursor-pointer group"
                      >
                        <span>Consulter l'étude de cas</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00] group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Aperçu du Projet Suivant sur Desktop (Peek-Ahead Atlas Style) */}
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
            className="hidden lg:flex lg:col-span-2 flex-col justify-between p-5 rounded-3xl bg-zinc-100/70 hover:bg-zinc-100 border border-zinc-200/70 hover:border-zinc-300 transition-all cursor-pointer group relative overflow-hidden"
            aria-label={`Aperçu du projet suivant : ${nextProject.title}`}
            title="Cliquer pour voir ce projet"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                  Suivant • {nextProject.number}
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-800 group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Miniature avec recadrage élégant */}
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200 shadow-2xs relative">
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
                <p className="text-xs font-bold text-zinc-900 line-clamp-2 leading-snug group-hover:text-zinc-700 transition-colors">
                  {nextProject.title}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-200/60 flex items-center justify-between text-[11px] font-semibold text-zinc-600 group-hover:text-zinc-950">
              <span>Découvrir</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. Ligne de progression discrète en bas de section */}
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="flex-grow h-1 rounded-full bg-zinc-100 overflow-hidden relative">
          <motion.div
            className="absolute top-0 bottom-0 left-0 bg-[#FFAD00] rounded-full"
            initial={false}
            animate={{
              width: `${((currentIndex + 1) / total) * 100}%`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Raccourci tactile mobile vers tous les projets */}
        <div className="md:hidden shrink-0">
          <a
            href="/projets"
            onClick={handleNav('/projets')}
            className="text-xs font-bold text-[#09090B] hover:text-[#FFAD00] transition-colors inline-flex items-center gap-1"
          >
            <span>Tous les projets</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

