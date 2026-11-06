import React, { useMemo } from 'react';
import Badge from '../Badge';

export default function ParcoursSkills({ skills }) {
  const safeSkillGroups = useMemo(() => {
    // Cas 1 : Si skills est un tableau personnalisé de catégories
    if (Array.isArray(skills)) {
      return skills.map((group, idx) => ({
        id: `skill-group-${idx}`,
        category: group?.category || 'Compétences',
        items: Array.isArray(group?.items) ? group.items : [],
      }));
    }

    // Cas 2 : Catégories éditoriales Glass Studio à partir des compétences documentées
    return [
      {
        id: 'scenography',
        category: 'Scénographie & 3D',
        items: [
          'Scénographie événementielle & Stands (> 150 m²)',
          'Signalétique & Habillage d\'espaces',
          'Parcours visiteurs & Salons européens',
          'Coordination prestataires techniques'
        ]
      },
      {
        id: 'motion',
        category: 'Motion & Vidéo',
        items: [
          'Adobe After Effects (Animations & Boucles LED)',
          'Adobe Premiere Pro (Montage & Titrages)',
          'Production vidéo & Captations de terrain',
          'Direction de contenus audiovisuels'
        ]
      },
      {
        id: 'art-direction',
        category: 'Direction Artistique & UI',
        items: [
          'Direction artistique & Identité de marque',
          'Adobe Illustrator (Design vectoriel, chartes)',
          'Adobe Photoshop (Retouche photo, compositing)',
          'Adobe InDesign (Édition, fiches techniques, print)',
          'Figma (Design system & Ergonomie d\'interfaces)'
        ]
      },
      {
        id: 'tools-tech',
        category: 'Outils & Tech',
        items: [
          'Suite Adobe Creative Cloud',
          'Figma UI/UX',
          'Intelligence Artificielle (ChatGPT, Claude, Gemini)',
          'Supports commerciaux & Sales Enablement'
        ]
      }
    ];
  }, [skills]);

  // Séparation éditoriale : les 3 piliers métiers en cartes d'un côté, Outils & Tech en composition ouverte de l'autre
  const mainPillars = safeSkillGroups.filter((g) => g.id !== 'tools-tech' && g.category !== 'Outils & Tech');
  const toolsTechGroup = safeSkillGroups.find((g) => g.id === 'tools-tech' || g.category === 'Outils & Tech');

  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-8">
      {/* En-tête de section */}
      <div className="border-t border-zinc-200/80 pt-10 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
            Compétences &amp; Stack logicielle
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
          Capacités d'exécution autonome
        </h2>
        <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
          Organisation des compétences clés mobilisées au quotidien dans la conception graphique, le motion design et les projets de marque.
        </p>
      </div>

      {/* 1. Les 3 Piliers de compétences en triptyque éditorial équilibré (3 colonnes) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mainPillars.map((skillGroup) => (
          <div
            key={skillGroup.id}
            className="p-6 sm:p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-4 hover:bg-white/90 hover:border-zinc-300/60 hover:shadow-md hover:shadow-zinc-950/[0.05] transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950">
                  {skillGroup.category}
                </h3>
              </div>

              {/* Badges de compétences */}
              <div className="flex flex-wrap gap-2 pt-1">
                {skillGroup.items.map((item, i) => (
                  <Badge
                    key={i}
                    variant="skill"
                    size="sm"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Outils & Tech — Sorti de la tuile : composition éditoriale ouverte */}
      {toolsTechGroup && (
        <div className="pt-8 border-t border-zinc-200/60 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-950">
                {toolsTechGroup.category}
              </h3>
            </div>
            <span className="text-xs text-zinc-500 font-sans">
              Environnement logiciel, outils créatifs et technologies au quotidien
            </span>
          </div>

          {/* Affichage direct et ouvert des outils sans boîte englobante ni bordure de tuile */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {toolsTechGroup.items.map((item, i) => (
              <Badge
                key={i}
                variant="tool"
                size="md"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
