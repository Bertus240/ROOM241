import React from 'react';
import {
  VectorScenographie,
  VectorBrandDA,
  VectorMotionVideo,
  VectorSocialMedia,
  VectorProcessor
} from '../EditorialVectors';

/**
 * ============================================================================
 * PARCOURS SKILLS — COMPÉTENCES & STACK LOGICIELLE
 * Studio ROOM241 • Rémi Brocart
 *
 * Les 5 domaines d'exécution unifiés :
 * 01. Scénographie & Espaces
 * 02. Direction artistique
 * 03. Vidéo & Motion Design
 * 04. Social Media Management (10 compétences intégrales, zéro débordement)
 * 05. Outils & Tech (Environnement logiciel structuré par familles d'atelier)
 * ============================================================================
 */

export default function ParcoursSkills() {
  const domains = [
    {
      id: 'scenography',
      num: '01',
      title: 'Scénographie & Espaces',
      icon: VectorScenographie,
      summary: "Conception graphique et aménagement visuel de stands professionnels, de la signalétique à l'organisation des parcours visiteurs, pour des salons en France et à l'international.",
      skills: [
        "Scénographie événementielle & Stands d'envergure (> 150 m²)",
        "Signalétique & Habillage grand format d'espaces",
        "Organisation des parcours visiteurs & Salons européens",
        "Coordination technique avec les prestataires scénographiques",
        "Déclinaison architecturale de charte sur structures réelles"
      ]
    },
    {
      id: 'art-direction',
      num: '02',
      title: 'Direction artistique',
      icon: VectorBrandDA,
      summary: "Création d'identités visuelles, de chartes graphiques et de supports de communication, du print aux formats numériques.",
      skills: [
        "Direction artistique & Identité de marque globale",
        "Chartes graphiques, logotypes & Systèmes visuels",
        "Typographie, mise en page & Grilles éditoriales",
        "Supports commerciaux, fiches techniques & Sales Enablement",
        "Design d'interfaces & Déclinaisons multi-supports"
      ]
    },
    {
      id: 'video-motion',
      num: '03',
      title: 'Vidéo & Motion Design',
      icon: VectorMotionVideo,
      summary: "Captation vidéo sur le terrain, création d'animations graphiques et montage vidéo, du format court aux contenus multiformats.",
      skills: [
        "Animations graphiques After Effects pour arches LED (1080p 60fps)",
        "Captation vidéo & Prises de vues sur le terrain (Salons, chantiers)",
        "Montage vidéo, titrages dynamiques & Rythmique narrative",
        "Direction de contenus audiovisuels, interviews & Storyboards",
        "Déclinaison multicanale de capsules vidéo engageantes"
      ]
    },
    {
      id: 'social-media',
      num: '04',
      title: 'Social Media Management',
      icon: VectorSocialMedia,
      summary: "Définition de stratégies éditoriales, création et adaptation de contenus, planification des publications, gestion des comptes et suivi des performances pour développer une présence cohérente et durable sur les réseaux sociaux.",
      skills: [
        "Stratégie de présence sur les réseaux sociaux",
        "Lignes éditoriales",
        "Calendriers de publication",
        "Création et adaptation de contenus",
        "Copywriting et design visuel",
        "Montage vidéo court",
        "Planification",
        "Gestion des comptes et animation de communauté",
        "Suivi des performances",
        "Analyse et optimisation éditoriale"
      ]
    }
  ];

  const toolFamilies = [
    {
      id: 'creation-pao',
      category: 'Création & Identité visuelle',
      tools: [
        { name: 'Adobe Illustrator', role: 'Design vectoriel, logos, chartes de marque' },
        { name: 'Adobe Photoshop', role: 'Retouche d\'image haute fidélité, compositing' },
        { name: 'Adobe InDesign', role: 'Édition, fiches techniques, brochures print' }
      ]
    },
    {
      id: 'video-animation',
      category: 'Vidéo & Motion Design',
      tools: [
        { name: 'Adobe Premiere Pro', role: 'Montage vidéo, rythme, étalonnage & mixage' },
        { name: 'Adobe After Effects', role: 'Animation graphique, boucles LED, habillages' }
      ]
    },
    {
      id: 'ui-prototyping',
      category: 'Interface & Prototypage',
      tools: [
        { name: 'Figma', role: 'Design systems, maquettes interactives, ergonomie' },
        { name: 'Composants & Wireframes', role: 'Architecture d\'information & parcours' }
      ]
    },
    {
      id: 'ai-productivity',
      category: 'IA & Recherche appliquée',
      tools: [
        { name: 'ChatGPT (OpenAI)', role: 'Structuration documentaire & cadrage de briefs' },
        { name: 'Claude (Anthropic)', role: 'Analyse critique & synthèse conceptuelle' },
        { name: 'Gemini (Google)', role: 'Exploration créative & veille d\'informations' }
      ]
    }
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10 sm:space-y-12">
      
      {/* En-tête officiel de la section (Section 7 du prompt) */}
      <div className="border-t border-zinc-200/80 pt-10 sm:pt-12 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
            Compétences &amp; Stack logicielle
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-950">
          Capacités d'exécution autonome
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
          Organisation des compétences clés mobilisées au quotidien dans la conception graphique, le motion design et les projets de marque.
        </p>
      </div>

      {/* 1. LES 4 PILIERS MÉTIERS — GRILLE ÉDITORIALE ÉQUILIBRÉE 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
        {domains.map((dom) => {
          const IconComp = dom.icon;
          const isSocialMedia = dom.id === 'social-media';

          return (
            <div
              key={dom.id}
              className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/70 dark:border-white/10 shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 flex flex-col justify-between space-y-5"
            >
              {/* En-tête de carte : numéro + icône vectorielle + titre */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <IconComp className="w-5 h-5 text-zinc-900 dark:text-zinc-100 shrink-0" />
                    <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white tracking-tight">
                      <span className="text-[#C5A880] font-mono mr-2">{dom.num}.</span>
                      {dom.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                    Domaine clé
                  </span>
                </div>

                {/* Synthèse éditoriale du domaine */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {dom.summary}
                </p>
              </div>

              {/* Liste des compétences — adaptative et parfaitement contenue dans le cadre */}
              <div className="pt-2 border-t border-zinc-100 dark:border-white/5 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-semibold">
                  Compétences mobilisées ({dom.skills.length}) :
                </span>

                {isSocialMedia ? (
                  /* Social Media Management : 10 compétences en 2 sous-colonnes aérées, zéro débordement */
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {dom.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0 mt-1.5" />
                        <span className="leading-snug">{skill}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  /* Autres piliers : liste à puces élégante et lisible */
                  <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {dom.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0 mt-1.5" />
                        <span className="leading-snug">{skill}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. 05. OUTILS & TECH — STRUCTURE ÉDITORIALE PAR FAMILLES LOGICIELLES (Section 6 & 7) */}
      <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#FAF8F5] dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-6">
        
        {/* En-tête du pôle logiciel */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/70 dark:border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <VectorProcessor className="w-5 h-5 text-zinc-900 dark:text-zinc-100 shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
              <span className="text-[#C5A880] font-mono mr-2">05.</span>
              Outils &amp; Tech
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans">
            Environnement logiciel, outils créatifs et technologies au quotidien.
          </p>
        </div>

        {/* Grille des 4 familles logicielles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {toolFamilies.map((fam) => (
            <div
              key={fam.id}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/10 space-y-3 shadow-2xs hover:border-[#C5A880]/50 transition-colors"
            >
              <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-white/5 pb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 truncate">
                  {fam.category}
                </h4>
              </div>

              <div className="space-y-3 pt-1">
                {fam.tools.map((t, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-xs font-semibold text-zinc-900 dark:text-white tracking-tight">
                      {t.name}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                      {t.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
