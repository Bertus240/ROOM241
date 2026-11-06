import React from 'react';
import { Compass, Maximize2 } from 'lucide-react';

export default function ParcoursAthleticProof({
  athleticProof,
  marathonPhoto,
  onOpenLightbox,
}) {
  if (!athleticProof) return null;

  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
      <div className="p-7 sm:p-10 md:p-12 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-2">
            <div
              onClick={() => onOpenLightbox(14)}
              role="button"
              tabIndex={0}
              aria-label="Agrandir la photographie du Marathon de Venise"
              className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 cursor-pointer group shadow-sm relative"
            >
              <img
                src={athleticProof.image}
                alt={marathonPhoto?.alt || 'Marathon de Venise'}
                className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                <span className="font-medium truncate drop-shadow">Venise, Italie</span>
                <span className="font-mono text-[10px] text-white/80 shrink-0">Agrandir ↗</span>
              </div>
            </div>
            {marathonPhoto?.caption && (
              <p className="text-xs text-zinc-400 text-center">
                {marathonPhoto.caption}
              </p>
            )}
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
              <Compass className="w-4 h-4" />
              <span>Endurance &amp; Rigueur personnelle</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              Le Marathon de Venise : La discipline de l'effort continu
            </h3>

            <p className="text-sm text-zinc-600 leading-relaxed">
              Courir un marathon en 2 h 48 min 25 s, c’est surtout des mois d’entraînement, des sorties par tous les temps et beaucoup de régularité. Il faut apprendre à gérer son effort, à tenir son allure et à continuer même quand les jambes commencent à peser.
            </p>

            <p className="text-sm text-zinc-600 leading-relaxed">
              J’y retrouve quelque chose qui me parle aussi dans la création : avancer avec méthode, accepter que tout ne se passe pas comme prévu et rester concentré jusqu’au bout. Le résultat compte, bien sûr, mais il représente surtout tout le travail réalisé en amont.
            </p>

            <div className="pt-2 grid grid-cols-3 gap-3 border-t border-zinc-200/60 text-xs">
              <div>
                <span className="text-zinc-400 block text-[11px]">Épreuve</span>
                <span className="font-bold text-zinc-950">{athleticProof.event}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Distance</span>
                <span className="font-bold text-zinc-950">{athleticProof.distance}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[11px]">Chrono officiel</span>
                <span className="font-semibold text-zinc-950 font-sans tabular-nums">{athleticProof.officialChrono}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

