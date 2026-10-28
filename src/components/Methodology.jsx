import React from 'react';
import { Reveal, stagger } from '../lib/motion';
import { ArrowUpRight } from 'lucide-react';

export default function Methodology({ isFullPage, navigate }) {
  return (
    <section
      id="methode"
      className={`border-b border-room-border bg-room-bg scroll-mt-24 ${
        isFullPage ? 'pt-28 pb-20 sm:pt-32 sm:pb-28' : 'py-20 sm:py-28'
      }`}
    >
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-xs font-mono text-room-muted tracking-wider uppercase font-medium mb-3 block">
              02 / FONCTIONNEMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-room-text leading-[1.1]">
              Pas de bureaucratie.<br />
              Un rythme de travail clair et tenu.
            </h2>
          </div>
          <p className="text-room-muted text-base font-sans max-w-md leading-relaxed">
            Vous parlez directement avec la personne qui crée. Pas de commercial, pas de chef de projet qui fait passe-plat.
          </p>
        </Reveal>

        {/* Rythme concret & parlé */}
        <div className="space-y-0">
          {[
            {
              timing: "LUNDI",
              title: "Cadrage & priorités",
              text: "Un point court de 30 minutes. On définit ce qui sort cette semaine, le message clé et le format attendu. Vous savez exactement ce qu'on prépare."
            },
            {
              timing: "MARDI — JEUDI",
              title: "Production & allers-retours",
              text: "Création des visuels, montage vidéo, maquettes. On vous partage les pistes au fil de l'eau sur un espace partagé. Vous validez ou ajustez en direct."
            },
            {
              timing: "VENDREDI",
              title: "Livraison & déploiement",
              text: "Fichiers sources, exports haute définition prêts à publier (LinkedIn, web, salon, print). Tout est carré et disponible."
            },
            {
              timing: "EN CONTINU",
              title: "Amélioration selon les retours",
              text: "On regarde ce qui a fonctionné, ce que vos prospects ont remarqué, et on calibre la semaine suivante pour faire encore mieux."
            }
          ].map((step, idx) => (
            <Reveal
              key={idx}
              delay={stagger(idx)}
              className="border-t border-room-border py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline transition-colors duration-200 ease-premium hover:bg-room-surface/40 px-2 sm:px-4 rounded-xl"
            >
              <div className="lg:col-span-3 font-mono text-xs text-room-amber font-bold">
                {step.timing}
              </div>

              <div className="lg:col-span-4 text-xl sm:text-2xl font-bold text-room-text font-sans tracking-tight">
                {step.title}
              </div>

              <div className="lg:col-span-5 text-sm sm:text-base text-room-muted font-sans leading-relaxed">
                {step.text}
              </div>
            </Reveal>
          ))}
          <div className="border-b border-room-border" />
        </div>

      </div>
    </section>
  );
}

