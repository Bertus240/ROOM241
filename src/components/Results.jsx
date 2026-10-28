import React from 'react';
import { Reveal, stagger } from '../lib/motion';

export default function Results({ navigate }) {
  const proofPoints = [
    {
      outcome: "Plus de 4 000 contacts enregistrés au FIC (résultat global)",
      client: "Éditeur Logiciel Cloud",
      story: "Un stand de plus de 150 m² conçu comme un parcours immersif au Forum InCyber. L'accroche visuelle a permis aux équipes commerciales d'enregistrer collectivement plus de 4 000 contacts qualifiés au cours du salon.",
      route: "/realisations/editeur-saas-cloud",
      tag: "Scénographie > 150 m² (FIC)"
    },
    {
      outcome: "Formalisation de l'identité et supports d'aide à la vente",
      client: "Résin'Architecte",
      story: "Adaptation de la charte graphique existante, création de modèles pour les réseaux sociaux, mise en page de visuels avant/après de chantiers et supports d'aide à la vente pour appuyer le discours commercial.",
      route: "/realisations/resin-architecte",
      tag: "Identité visuelle & Supports chantiers"
    },
    {
      outcome: "Campagne de lancement financée au-delà de l'objectif",
      client: "Fresh Data (Retail Data & Veille)",
      story: "Pour leur participation au salon MEDFEL, nous avons tourné une vidéo de terrain au contact direct de leurs premiers utilisateurs. L'identité graphique de la campagne Ulule a permis de dépasser le premier palier avec plus de 12 700 € réunis sur un objectif de 20k.",
      route: "/realisations/fresh-data",
      tag: "Vidéo terrain & Lancement"
    }
  ];

  /* Chaque projet sert de passerelle SPA directe vers son étude de cas. */
  const goToCaseStudy = (route) => {
    if (navigate) {
      navigate(route);
    } else {
      window.location.href = route;
    }
  };

  const handleMetricClick = (route) => (e) => {
    if (e) e.stopPropagation();
    goToCaseStudy(route);
  };

  const handleMetricKeyDown = (route) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToCaseStudy(route);
    }
  };

  return (
    <section id="resultats" className="bg-luxe py-24 sm:py-32 border-b border-room-border relative overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Editorial Section Header */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-room-muted uppercase tracking-[0.25em] mb-4 block">
              03 / CE QUE ÇA CHANGE VRAIMENT
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.08]">
              Des résultats tangibles sur le terrain.<br />
              <span className="text-room-muted font-normal">Pas des métriques isolées de leur contexte.</span>
            </h2>
          </div>
          <p className="text-room-muted text-base font-sans max-w-md leading-relaxed border-l border-neutral-300 dark:border-white/10 pl-6">
            L'image de marque n'est pas un vernis : c'est ce qui fait qu'un prospect s'arrête sur votre stand, vous rappelle ou signe votre devis plutôt que celui du concurrent.
          </p>
        </Reveal>

        {/* 3 Récits d'impact concrets */}
        <div className="divide-y divide-neutral-200 dark:divide-white/10 border-t border-b border-neutral-200 dark:border-white/10">
          {proofPoints.map((item, idx) => (
            <Reveal
              key={idx}
              delay={stagger(idx)}
              role="link"
              tabIndex={0}
              aria-label={`Voir l'étude de cas : ${item.client}`}
              onClick={handleMetricClick(item.route)}
              onKeyDown={handleMetricKeyDown(item.route)}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group cursor-pointer hover:bg-room-surface/30 px-4 sm:px-6 rounded-2xl transition-colors duration-150"
            >
              <div className="lg:col-span-1 font-mono text-xs text-room-amber font-semibold pt-1">
                [ 0{idx + 1} ]
              </div>

              {/* Titre & Client */}
              <div className="lg:col-span-5 space-y-3">
                <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-room-muted px-2.5 py-1 rounded-md bg-room-surface border border-room-border">
                  {item.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white font-sans tracking-tight group-hover:text-room-amber transition-colors">
                  {item.outcome}
                </h3>
                <p className="text-xs font-mono text-room-muted uppercase tracking-wider">
                  Client : {item.client}
                </p>
              </div>

              {/* Récit factuel */}
              <div className="lg:col-span-6 space-y-4">
                <p className="text-base text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                  {item.story}
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-room-amber font-semibold group-hover:underline">
                    Lire le retour d'expérience complet ↗
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}



