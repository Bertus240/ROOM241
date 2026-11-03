import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film,
  Award,
  Palette,
  Monitor,
  Target,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Video,
  Layers,
  Shield,
  Eye
} from 'lucide-react';
import MochiAvatar from '../components/MochiAvatar';
import { projectsData } from '../data/projects';

/**
 * Univers des Projets — Expérience de découverte éditoriale guidée par Mochi
 * Studio ROOM241 • Rémi Brocart
 */

const CATEGORIES = [
  {
    id: 'video',
    title: 'Vidéo & motion design',
    desc: 'Films, formats courts, captation, After Effects et narration audiovisuelle.',
    icon: Film,
    mochiText: 'J\'ai de superbes réalisations audiovisuelles à vous montrer.',
    leadSlug: 'jardimax',
  },
  {
    id: 'event',
    title: 'Événementiel & activation',
    desc: 'Salons internationaux, stands d\'envergure (> 150 m²), scénographie et terrain.',
    icon: Award,
    mochiText: 'Voici les projets déployés sur le terrain et lors de grands salons.',
    leadSlug: 'hornetsecurity',
  },
  {
    id: 'identity',
    title: 'Identité & direction artistique',
    desc: 'Logos, chartes graphiques, design éditorial et déclinaisons visuelles de marque.',
    icon: Palette,
    mochiText: 'Regardons les identités visuelles et univers graphiques conçus par Rémi.',
    leadSlug: 'fresh-data',
  },
  {
    id: 'digital',
    title: 'Digital & expérience web',
    desc: 'Interfaces logicielles, plateformes SaaS, démonstrations et e-commerce.',
    icon: Monitor,
    mochiText: 'Voici les projets touchant aux interfaces et aux parcours numériques.',
    leadSlug: 'fresh-data',
  },
  {
    id: 'strategy',
    title: 'Communication & stratégie',
    desc: 'Positionnement de marque, storytelling de valeur et kits investisseurs.',
    icon: Target,
    mochiText: 'Découvrez les dispositifs conçus pour asseoir un positionnement et convaincre.',
    leadSlug: 'hornetsecurity',
  },
  {
    id: 'all',
    title: 'Tout découvrir',
    desc: 'Accéder à l\'ensemble des réalisations documentées du studio.',
    icon: Sparkles,
    mochiText: 'Avec plaisir ! Voici l\'ensemble des réalisations documentées.',
    leadSlug: 'hornetsecurity',
  },
];

export default function Projects({ navigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mochiMessage, setMochiMessage] = useState(
    'Vous recherchez plutôt quoi ? Je peux vous aider à trouver les projets les plus cohérents.'
  );
  const [mochiReaction, setMochiReaction] = useState(0);
  const resultsRef = useRef(null);

  // Synchronisation avec un éventuel hash dans l'URL (#jardimax, #hornetsecurity, etc.)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && projectsData[hash]) {
      // Trouver la catégorie associée ou afficher tout
      const proj = projectsData[hash];
      if (proj && proj.categories && proj.categories.length > 0) {
        setSelectedCategory(proj.categories[0]);
      } else {
        setSelectedCategory('all');
      }

      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  }, []);

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setMochiReaction((prev) => prev + 1);

    const cat = CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      setMochiMessage(cat.mochiText);
    }

    // Défilement doux vers la galerie de résultats
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  // Filtrage déterministe des projets selon les métadonnées vérifiées
  const allProjectsList = Object.values(projectsData);
  const filteredProjects =
    selectedCategory === 'all'
      ? allProjectsList
      : allProjectsList.filter(
          (p) => p.categories && p.categories.includes(selectedCategory)
        );

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[5];

  // Sélection du projet phare (Lead project) et des cartes secondaires
  const leadProject =
    filteredProjects.find((p) => p.slug === activeCategoryObj.leadSlug) ||
    filteredProjects[0];
  const secondaryProjects = filteredProjects.filter((p) => p.slug !== leadProject?.slug);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0A09] text-[#09090B] dark:text-[#EDEDED] transition-colors duration-300">
      
      {/* 1. HERO ÉDITORIAL AVEC MOCHI (GUIDE DE DÉCOUVERTE) */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 border-b border-zinc-200/80 dark:border-white/10 relative overflow-hidden">
        
        {/* Halo d'ambiance signature */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-[#FFAD00]/15 to-transparent blur-3xl rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10 space-y-12">
          
          {/* Bloc d'introduction avec Mochi */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-3xl mx-auto text-center sm:text-left">
            <MochiAvatar
              size="lg"
              reaction={mochiReaction}
              onClick={() => setMochiReaction((prev) => prev + 1)}
              className="cursor-pointer"
            />

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-white/10 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]" />
                <span>GUIDE DE DÉCOUVERTE INTERACTIF</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#09090B] dark:text-white leading-tight">
                Qu'est-ce qui vous intéresse ?
              </h1>

              {/* Bulle conversationnelle fluide de Mochi */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={mochiMessage}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium"
                >
                  « {mochiMessage} »
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Grille des 6 choix visuels d'univers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 max-w-5xl mx-auto">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer group border ${
                    isSelected
                      ? 'bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] border-[#09090B] dark:border-white shadow-md scale-[1.02]'
                      : 'bg-zinc-50 dark:bg-zinc-900/60 text-[#09090B] dark:text-zinc-200 border-zinc-200/80 dark:border-white/10 hover:border-[#FFAD00]/60 dark:hover:border-[#FFAD00]/60 hover:bg-white dark:hover:bg-zinc-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#FFAD00] text-black'
                          : 'bg-zinc-200/80 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 group-hover:text-[#FFAD00]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {isSelected && (
                      <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#FFAD00] dark:text-zinc-950">
                        Sélectionné
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold leading-snug">{cat.title}</h3>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        isSelected ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      {cat.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. LA GALERIE ÉDITORIALE MAGAZINE (SHOWCASE DES RÉSULTATS) */}
      <section ref={resultsRef} className="py-16 sm:py-24 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-12">
          
          {/* Barre de contexte éditoriale avec petit Mochi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-white/10">
            <div className="flex items-center gap-3">
              <MochiAvatar size="sm" reaction={mochiReaction} />
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Univers sélectionné
                </span>
                <span className="text-sm font-bold text-[#09090B] dark:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  {activeCategoryObj.title} ({filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3 h-3 text-[#FFAD00]" />
                <span>Changer de recherche</span>
              </button>

              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => handleSelectCategory('all')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#09090B] dark:bg-white text-white dark:text-[#09090B] text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all cursor-pointer shadow-2xs"
                >
                  <Sparkles className="w-3 h-3 text-[#FFAD00] dark:text-zinc-950" />
                  <span>Tout découvrir</span>
                </button>
              )}
            </div>
          </div>

          {/* Affichage des projets en composition magazine asymétrique */}
          {filteredProjects.length === 0 ? (
            /* Cas sans résultat */
            <div className="p-12 text-center rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 space-y-4 max-w-lg mx-auto">
              <MochiAvatar size="md" />
              <h3 className="text-lg font-bold">Aucune réalisation ne correspond à ce filtre</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Je n'ai pas trouvé de projet pour cette sélection. Je vous propose de découvrir l'ensemble des réalisations documentées.
              </p>
              <button
                type="button"
                onClick={() => handleSelectCategory('all')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#09090B] text-white text-xs font-bold"
              >
                <span>Voir tous les projets</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* CARTE PHARE (LEAD PROJECT) */}
              {leadProject && (
                <article
                  id={leadProject.slug}
                  onClick={handleNav(`/realisations/${leadProject.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNav(`/realisations/${leadProject.slug}`)(e);
                  }}
                  className="group relative rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-white/15 shadow-sm hover:border-[#FFAD00]/60 dark:hover:border-[#FFAD00]/60 transition-all duration-300 cursor-pointer p-6 sm:p-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Visuel immersif */}
                    <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-white/10">
                      <img
                        src={leadProject.image}
                        alt={leadProject.alt || leadProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-white border border-white/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                          <span>PROJET PHARE SÉLECTIONNÉ</span>
                        </span>
                      </div>
                    </div>

                    {/* Bloc descriptif */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="space-y-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#FFAD00] font-bold block">
                          {leadProject.category}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#09090B] dark:text-white leading-tight">
                          {leadProject.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                          {leadProject.description}
                        </p>
                      </div>

                      {/* Métrique vérifiée */}
                      {leadProject.metric && (
                        <div className="p-4 rounded-2xl bg-white dark:bg-black/50 border border-zinc-200/80 dark:border-white/10 space-y-1">
                          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#09090B] dark:text-white block">
                            {leadProject.metric}
                          </span>
                          <span className="text-xs text-zinc-500 font-mono">
                            {leadProject.metricLabel}
                          </span>
                        </div>
                      )}

                      {/* Tags */}
                      {leadProject.tags && (
                        <div className="flex flex-wrap gap-2">
                          {leadProject.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-[#09090B] dark:text-white group-hover:text-[#FFAD00] transition-colors">
                          <span>Explorer l'étude de cas</span>
                          <ArrowRight className="w-4 h-4 text-[#FFAD00] group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>

                  </div>
                </article>
              )}

              {/* CARTES SECONDAIRES */}
              {secondaryProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  {secondaryProjects.map((proj) => (
                    <article
                      key={proj.slug}
                      id={proj.slug}
                      onClick={handleNav(`/realisations/${proj.slug}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleNav(`/realisations/${proj.slug}`)(e);
                      }}
                      className="group rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 hover:border-[#FFAD00]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-white/10">
                          <img
                            src={proj.image}
                            alt={proj.alt || proj.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-white border border-white/20">
                              {proj.statusLabel || proj.category}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[11px] font-mono text-[#FFAD00] font-bold uppercase tracking-wider block">
                            {proj.category}
                          </span>
                          <h3 className="text-lg font-bold text-[#09090B] dark:text-white leading-snug">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                            {proj.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-zinc-200/60 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-[#09090B] dark:text-white group-hover:text-[#FFAD00]">
                        <span>Consulter l'étude</span>
                        <ArrowUpRight className="w-4 h-4 text-[#FFAD00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </article>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      </section>

      {/* 3. TRANSITION ÉDITORIALE VERS L'UNIVERS PERSONNEL (INVITATION DE MOCHI) */}
      <section className="py-20 border-t border-zinc-200/80 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950/40">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 text-center space-y-6">
          <MochiAvatar size="md" className="mx-auto" />
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] dark:text-white">
              « Tu connais maintenant ce que je fais. Voici un peu plus de ce qui me définit. »
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Passez de l'autre côté du travail pour découvrir mes explorations personnelles, Meridian, mes rituels de concentration et ma pratique de la course.
            </p>
          </div>
          <div>
            <a
              href="/hors-cadre"
              onClick={handleNav('/hors-cadre')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] dark:bg-white text-white dark:text-[#09090B] text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <span>Découvrir mon univers personnel</span>
              <ArrowRight className="w-4 h-4 text-[#FFAD00] dark:text-zinc-950" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
