import React from 'react';
import { Reveal, stagger } from '../lib/motion';
import TrackedButton from './actions/TrackedButton';
import { ArrowUpRight } from 'lucide-react';

export default function Pricing({ isFullPage, navigate }) {
  const modes = [
    {
      num: "01",
      title: "Abonnement éditorial",
      subtitle: "Cadence hebdomadaire & direction de création continue",
      summary:
        "Pour installer une présence de marque rigoureuse et pérenne. Nous concevons chaque semaine votre contenu pilier (vidéo, carrousel, manifeste technique) et assurons la tenue irréprochable de vos déclinaisons visuelles.",
      deliverables: [
        "1 format pilier hebdomadaire sur-mesure",
        "Direction artistique et système graphique exclusif",
        "Copywriting orienté autorité technique et conversion",
        "Déclinaisons graphiques multi-réseaux (LinkedIn, Web, Print)",
        "Revue mensuelle de performance et ajustements stratégiques"
      ],
      context: "Adapté aux PME techniques et éditeurs logiciels qui ont besoin d'une voix régulière et crédible sans recruter en interne.",
      cta: "Cadrer un abonnement"
    },
    {
      num: "02",
      title: "Sprint d'activation",
      subtitle: "Mission intensive, périmètre clos, échéance ferme",
      summary:
        "Une intervention commando sur 1 à 4 semaines pour délivrer un actif stratégique majeur : refonte d'identité de marque, scénographie de stand pour salon professionnel, ou campagne de lancement produit.",
      deliverables: [
        "Cadrage express et immersion métier sous 48h",
        "Conception de scénographies grand format (> 150 m²) ou kit de marque",
        "Production vidéo terrain et motion design sur-mesure",
        "Assets de campagne prêts au déploiement immédiat",
        "Cession complète des droits et livrables sources"
      ],
      context: "Idéal pour préparer un congrès tech, un salon international ou un lancement produit à fort enjeu.",
      cta: "Planifier un sprint"
    },
    {
      num: "03",
      title: "Studio partenaire",
      subtitle: "Direction artistique externalisée 360°",
      summary:
        "Votre direction artistique externalisée. Nous intervenons en direct auprès des fondateurs et directions marketing pour piloter l'ensemble de l'écosystème visuel : identité, événements, campagnes paid et assets commerciaux.",
      deliverables: [
        "Gouvernance créative globale et cohérence omnicanale",
        "Disponibilité prioritaire sur les besoins urgents",
        "Accompagnement terrain lors de vos temps forts",
        "Design des supports d'aide à la vente (decks grands comptes)",
        "Reporting d'impact et de perception de marque"
      ],
      context: "Conçu pour les entreprises en forte croissance qui exigent le niveau d'exigence d'un grand studio sans la lenteur d'une agence classique.",
      cta: "Échanger avec Rémi"
    }
  ];

  return (
    <section
      id="offres"
      className={`border-b border-room-border bg-room-bg scroll-mt-24 ${
        isFullPage ? 'pt-28 pb-20 sm:pt-32 sm:pb-28' : 'py-20 sm:py-28'
      }`}
    >
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">

        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-room-muted uppercase tracking-[0.25em] mb-4 block">
              04 / MODES D'INTERVENTION
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.05]">
              Trois formats d'engagement.<br />
              <span className="text-room-muted font-normal">Zéro bureaucratie.</span>
            </h2>
          </div>
          <p className="text-room-muted text-base font-sans max-w-md leading-relaxed border-l border-neutral-300 dark:border-white/10 pl-6">
            Nous intervenons en direct avec vous, sans chef de projet intermédiaire ni jargon d'agence. Chaque mission s'adapte à la maturité et aux temps forts de votre entreprise.
          </p>
        </Reveal>

        {/* Grille de 3 Cartes Modernes d'offres */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {modes.map((mode, idx) => (
            <Reveal
              key={mode.num}
              delay={stagger(idx)}
              className="bg-room-surface border border-neutral-200 dark:border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:border-room-amber/40 shadow-sm relative group"
            >
              <div>
                {/* Header Carte */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-room-amber font-semibold tracking-widest">
                    [ {mode.num} ]
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-room-muted px-2.5 py-1 rounded bg-room-bg border border-room-border">
                    Sur-mesure
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white font-sans tracking-tight mb-2">
                  {mode.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-room-muted mb-6 leading-relaxed">
                  {mode.subtitle}
                </p>

                {/* Résumé oral & direct */}
                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed mb-6">
                  {mode.summary}
                </p>

                {/* Contexte adapté */}
                <p className="text-xs text-room-muted font-sans leading-relaxed border-l-2 border-room-amber/40 pl-3 py-1 mb-8">
                  {mode.context}
                </p>

                {/* Livrables concrets */}
                <div className="space-y-3 pt-6 border-t border-neutral-200 dark:border-white/10 mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-room-subtle block mb-3">
                    Ce qu'on prend en charge :
                  </span>
                  {mode.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs font-sans text-room-muted leading-relaxed">
                      <span className="text-room-amber font-mono shrink-0 select-none">—</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton d'action */}
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
                <TrackedButton
                  eventName="click_calendar_booking"
                  eventData={{ mode: mode.title }}
                  href="https://calendar.app.google/VHHhkb2uunEeRVt67"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-room-text text-room-bg text-xs font-sans font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <span>{mode.cta}</span>
                  <ArrowUpRight className="w-4 h-4 text-room-amber" />
                </TrackedButton>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Note de disponibilité studio — sobre et humaine */}
        <Reveal delay={150} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl bg-room-surface border border-neutral-200 dark:border-white/10">
          <div className="space-y-1">
            <span className="font-mono text-xs text-room-amber font-semibold uppercase tracking-wider block">
              Disponibilité &amp; Confidentialité
            </span>
            <p className="text-sm text-room-muted font-sans max-w-2xl leading-relaxed">
              Nous limitons nos accompagnements simultanés pour garantir une présence réelle sur vos chantiers et événements. Tous nos échanges peuvent être encadrés par un accord de confidentialité (NDA).
            </p>
          </div>
          <TrackedButton
            eventName="click_calendar_booking"
            eventData={{ location: 'offres_footer' }}
            href="https://calendar.app.google/VHHhkb2uunEeRVt67"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex shrink-0 items-center gap-2 px-6 py-3.5 bg-room-text text-room-bg text-xs font-sans font-semibold rounded-xl"
          >
            <span>Réserver un échange de cadrage ↗</span>
          </TrackedButton>
        </Reveal>

      </div>
    </section>
  );
}



