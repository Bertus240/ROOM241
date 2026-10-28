import React from 'react';
import { Reveal, stagger } from '../lib/motion';

const modes = [
  {
    id: '01',
    name: 'Abonnement éditorial',
    tagline: 'Accompagnement mensuel continu',
    description:
      "Production visuelle récurrente et direction artistique sur-mesure pour installer une présence de marque constante, sans fluctuation de qualité.",
    points: ['Formats piliers hebdomadaires', 'DA sur-mesure & déclinaisons', 'Revue de performance mensuelle'],
    highlight: true
  },
  {
    id: '02',
    name: 'Sprint de production',
    tagline: 'Mission ponctuelle, cadrage serré',
    description:
      "Refonte d'identité, kit visuel événementiel ou captation vidéo terrain : une mission intensive livrée sur un périmètre précis et une échéance tenue.",
    points: ["Périmètre défini à l'avance", 'Livraison en une à trois semaines', 'Zéro engagement récurrent'],
    highlight: false
  },
  {
    id: '03',
    name: 'Studio partenaire',
    tagline: 'Direction artistique externalisée 360°',
    description:
      'Votre service créatif à distance : direction artistique globale, supports événementiels XXL, campagnes organiques et paid, reporting ROI.',
    points: ['DA externalisée complète', 'Priorité sur les sprints urgents', 'Reporting ROI & attribution B2B'],
    highlight: false
  }
];

export default function InterventionModes({ navigate }) {
  const goToOffres = (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate('/offres');
    else window.location.href = '/offres';
  };

  return (
    <section id="offres" className="py-24 sm:py-32 border-b border-room-border bg-room-bg">
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">

        {/* Editorial Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div>
            <span className="text-xs font-mono text-room-muted uppercase tracking-[0.25em] mb-4 block">
              04 / MODES D'INTERVENTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
              Trois façons de travailler ensemble.
            </h2>
          </div>
          <p className="text-room-muted text-base font-sans max-w-md leading-relaxed">
            Chaque mission s'adapte à la maturité visuelle et au rythme d'acquisition de votre entreprise. Le détail des formules et budgets est présenté sur la page Offres.
          </p>
        </Reveal>

        {/* Intervention Modes Grid — chaque carte redirige vers /offres */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {modes.map((mode, idx) => (
            <Reveal
              key={mode.id}
              delay={stagger(idx)}
              role="link"
              tabIndex={0}
              aria-label={`Découvrir le mode d'intervention : ${mode.name} — voir la page Offres`}
              onClick={goToOffres}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  goToOffres(e);
                }
              }}
              className={`group cursor-pointer flex flex-col rounded-2xl p-8 border transition-all duration-200 ease-premium card-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-room-amber/40 ${
                mode.highlight
                  ? 'bg-room-surface border-room-amber/40'
                  : 'bg-room-surface border-room-border hover:border-room-borderHover'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-room-muted font-semibold">[ {mode.id} ]</span>
                {mode.highlight && (
                  <span className="glass-badge text-[11px] font-sans font-medium text-room-amber px-2.5 py-0.5 border border-room-amber/30 rounded-md bg-room-amber/5">
                    Le plus choisi
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white font-sans tracking-tight mb-1">
                {mode.name}
              </h3>
              <p className="text-[11px] font-mono uppercase tracking-wider text-room-subtle mb-5">
                {mode.tagline}
              </p>

              <p className="text-sm text-room-muted leading-relaxed font-sans mb-8">
                {mode.description}
              </p>

              <div className="pt-6 border-t border-room-border space-y-2.5 mb-8 mt-auto">
                {mode.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-baseline gap-3">
                    <span className="text-room-amber text-xs shrink-0">—</span>
                    <span className="text-sm text-room-text font-sans leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              <span className="btn-secondary inline-flex items-center justify-center gap-2 py-3.5 px-6 text-room-muted group-hover:text-room-text text-xs font-sans font-semibold rounded-lg w-full">
                Voir les formules ↗
              </span>
            </Reveal>
          ))}
        </div>

        {/* Redirect banner vers la page Offres */}
        <Reveal delay={150} className="p-6 bg-room-surface border border-room-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-xs font-sans text-room-muted">
            <strong className="text-room-text font-semibold">Dispositifs &amp; Périmètres :</strong> découvrez le détail des formats piliers, sprints et directions artistiques externalisées sur la page Offres.
          </div>
          <a
            href="/offres"
            onClick={goToOffres}
            className="link-arrow text-xs font-sans text-room-text font-semibold whitespace-nowrap transition-colors duration-150 hover:text-room-amber"
          >
            Consulter les dispositifs ↗
          </a>
        </Reveal>

      </div>
    </section>
  );
}