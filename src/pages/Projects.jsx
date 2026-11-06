import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import ProjectBadgeHeader, { formatNbsp } from '../components/ProjectBadgeHeader';

/**
 * Univers des Projets — Galerie Éditoriale Magazine Continue
 * Studio ROOM241 • Rémi Brocart
 * 
 * - Composition éditoriale homogène mettant en valeur les réalisations réelles et les photographies authentiques
 * - Galerie continue sans filtres, organisée par pertinence stratégique et récence
 * - Découplage total : navigation fluide sans déclenchement intempestif de Kuro
 */

// Ordre stratégique prescrit des réalisations
const STRATEGIC_PROJECT_KEYS = [
  'hornetsecurity',
  'fresh-data',
  'resin-architecte',
  'jardimax',
];

export default function Projects({ navigate }) {
  const galleryRef = useRef(null);

  // Synchronisation avec un éventuel hash dans l'URL (#hornetsecurity, #resin-architecte, etc.)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && projectsData[hash]) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  }, []);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  // Liste ordonnée de façon déterministe et stratégique
  const projectsList = [
    ...STRATEGIC_PROJECT_KEYS.map((key) => projectsData[key]).filter(Boolean),
    ...Object.values(projectsData).filter(
      (p) => !STRATEGIC_PROJECT_KEYS.includes(p.slug)
    ),
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0A09] text-[#09090B] dark:text-[#EDEDED] transition-colors duration-300">
      
      {/* 1. HERO ÉDITORIAL DU PORTFOLIO */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 border-b border-zinc-200/80 dark:border-white/10 relative overflow-hidden">
        
        {/* Halo d'ambiance signature */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FFAD00]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10 space-y-8">
          
          {/* Titre & Sous-titre sobres */}
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.12em] block">
              Portfolio &amp; Études de cas
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#09090B] dark:text-white leading-[1.12]">
              Les Projets du Studio
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal max-w-2xl">
              Scénographies grand format, univers de marque, réalisations vidéo et expériences numériques : explorez les collaborations concrètes menées par Rémi Brocart à travers une sélection éditoriale continue.
            </p>
          </div>

        </div>
      </section>

      {/* 2. LA GALERIE ÉDITORIALE DE RÉALISATIONS CONTINUE */}
      <section ref={galleryRef} className="py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projectsList.map((project, index) => (
              <motion.article
                key={project.slug}
                id={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '200px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={handleNav(project.destination || `/realisations/${project.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNav(project.destination || `/realisations/${project.slug}`)(e);
                }}
                className="group relative rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-200/80 dark:border-white/10 hover:border-[#FFAD00]/60 dark:hover:border-[#FFAD00]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl min-h-[480px] sm:min-h-[520px]"
              >
                {/* 1. Photographie haute définition en pleine couverture */}
                <img
                  src={project.image}
                  alt={project.alt || project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={index === 0 ? "eager" : "lazy"}
                />

                {/* 2. Overlay photographique progressif depuis le bas (garantit la lisibilité tout en laissant respirer l'image) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 via-50% to-black/20 pointer-events-none" />

                {/* 3. En-tête de carte hiérarchisé : Niveau 1 (Discipline) & Niveau 2 (Métrique clé) */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex items-start justify-between gap-3 pointer-events-none">
                  <ProjectBadgeHeader project={project} />
                </div>

                {/* 4. Bloc éditorial en bas de la photographie */}
                <div className="relative z-10 p-5 sm:p-7 lg:p-8 space-y-4 pt-16 pointer-events-none">
                  <div className="space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium block">
                      {project.projectName || project.client} • {project.id}
                    </span>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight group-hover:text-[#FFAD00] transition-colors duration-200">
                      {project.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal max-w-xl">
                      {project.description}
                    </p>
                  </div>

                  {/* Niveau 3 : Tags de compétences sobres (3 max, zéro débordement) */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-[11px] font-medium text-zinc-300 border border-white/10 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action vers l'étude de cas & métrique secondaire (Niveau 3) */}
                  <div className="pt-4 border-t border-white/15 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 text-xs text-white">
                    {project.secondaryMetric ? (
                      <div className="inline-flex items-center gap-1.5 text-zinc-300 shrink-0">
                        <span className="font-bold text-[#FFAD00] whitespace-nowrap">
                          {formatNbsp(project.secondaryMetric.value)}
                        </span>
                        <span className="text-[11px] text-zinc-300 font-medium whitespace-nowrap">
                          {formatNbsp(project.secondaryMetric.label)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-zinc-400 text-[11px] font-medium shrink-0">{project.category}</span>
                    )}

                    <span className="inline-flex items-center gap-1.5 font-semibold text-white group-hover:text-[#FFAD00] transition-colors whitespace-nowrap ml-auto">
                      <span>Consulter l'étude de cas</span>
                      <ArrowRight className="w-4 h-4 text-[#FFAD00] group-hover:translate-x-1 transition-transform shrink-0" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
