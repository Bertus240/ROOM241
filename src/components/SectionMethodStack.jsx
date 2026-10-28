import React from 'react';
import { motion } from 'framer-motion';

export default function SectionMethodStack() {
  const poles = [
    {
      title: "Suite Adobe (Édition & Graphisme)",
      tools: "Photoshop, Illustrator, InDesign",
      text: "Systèmes graphiques rigoureux, identités vectorielles, retouches avancées et préparation des fichiers d'impression pour l'imprimerie (CMJN, vernis, découpe)."
    },
    {
      title: "Vidéo & Motion Design",
      tools: "Premiere Pro, After Effects, Sound Design",
      text: "Prises de vues terrain en salons, montage d'aftermovies dynamiques, étalonnage couleur, sous-titrage et animation graphique."
    },
    {
      title: "UI/UX & Design Systems",
      tools: "Figma, Design Tokens, Prototypage",
      text: "Conception d'interfaces web et mobiles épurées, grilles chirurgicales, composants modulaires et spécifications sans friction pour le développement."
    },
    {
      title: "Intégration Web & Front-End",
      tools: "React, Tailwind CSS, HTML/CSS, Webflow",
      text: "Intégration d'interfaces web ultra-réactives, respect scrupuleux du responsive, accessibilité et animations fluides."
    }
  ];

  return (
    <section
      id="parcours"
      className="py-24 sm:py-32 bg-[#FFFFFF] text-[#09090B] border-b border-zinc-200/70 scroll-mt-16"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-16">
        
        {/* Titre sobre */}
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Parcours &amp; Méthode
          </h2>
          <p className="text-sm sm:text-base text-[#3F3F46] mt-2">
            Double cursus scientifique et marketing, rigueur athlétique et autonomie opérationnelle.
          </p>
        </div>

        {/* 2 Colonnes : Parcours & Rigueur Marathon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 pt-2">
          
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Formation &amp; Vision
            </h3>
            <p className="text-base text-[#09090B] font-semibold">
              Bac S Sciences de l'Ingénieur • Master Stratégie &amp; Marketing (ISEG)
            </p>
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              Une articulation rare entre esprit d'analyse technique et sensibilité créative. Chaque choix visuel ou scénographique est guidé par une intention stratégique documentée, au service de la clarté et de l'atteinte d'objectifs business concrets.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Discipline &amp; Exigence
            </h3>
            <p className="text-base text-[#09090B] font-semibold">
              Marathonien (Record 2h48 à Venise — Top 1% amateur)
            </p>
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              La préparation d'un marathon à moins de 4 minutes au kilomètre forge une discipline quotidienne, une résistance naturelle à l'effort soutenu et une tenue stricte des engagements et des délais dans les environnements à fort enjeu.
            </p>
          </div>

        </div>

        {/* Grille des compétences techniques */}
        <div className="pt-8 border-t border-zinc-100">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-8">
            Stack &amp; Autonomie Opérationnelle
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {poles.map((p, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-sm font-bold text-[#09090B]">
                  {p.title}
                </h4>
                <p className="text-xs font-medium text-[#FFAD00]">
                  {p.tools}
                </p>
                <p className="text-xs text-[#3F3F46] leading-relaxed pt-1">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
