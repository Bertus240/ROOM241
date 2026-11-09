import React from 'react';
import { VectorMasterISEG, VectorBachelorISEG, VectorScientific, VectorBAFA } from '../EditorialVectors';

export default function ParcoursFormation() {
  return (
    <section id="formation" className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-8">
      <div className="border-t border-zinc-200/80 pt-10 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 font-mono">
            Formation académique
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
          Formation académique &amp; cadre méthodologique
        </h2>
        <p className="text-sm text-zinc-500 max-w-2xl leading-relaxed">
          Une formation supérieure en école de communication (Master ISEG Lille) enrichie par un socle scientifique initial axé sur la logique, la méthode et la gestion des contraintes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Master ISEG */}
        <div className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-950 block">
                2023 — 2025
              </span>
              <VectorMasterISEG className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className="text-base font-bold text-zinc-950 leading-snug">
              Master Marketing, communication et digital
            </h3>
            <p className="text-xs font-semibold text-zinc-600">ISEG Lille · Cérémonie 2026</p>
            <p className="text-xs text-zinc-500 leading-relaxed pt-1">
              Vision stratégique globale, positionnement concurrentiel, architecture de marque, direction de campagnes et pilotage d'expériences événementielles.
            </p>
          </div>
          <span className="text-[11px] font-mono font-semibold text-[#FFAD00] pt-2 block border-t border-zinc-100">
            Niveau Master (Bac+5)
          </span>
        </div>

        {/* Bachelor ISEG */}
        <div className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-950 block">
                2020 — 2023
              </span>
              <VectorBachelorISEG className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className="text-base font-bold text-zinc-950 leading-snug">
              Bachelor Marketing, communication &amp; digital
            </h3>
            <p className="text-xs font-semibold text-zinc-600">ISEG Lille</p>
            <p className="text-xs text-zinc-500 leading-relaxed pt-1">
              Fondations marketing, stratégies de marque, outils numériques, marketing international et masterclass professionnelles.
            </p>
            <div className="pt-2 border-t border-zinc-100 space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">Engagements</span>
              <p className="text-[11px] text-zinc-600">EPEE (Ambassadeur Campus) · The View (Audiovisuel)</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold text-[#FFAD00] pt-2 block border-t border-zinc-100">
            Niveau Bachelor (Bac+3)
          </span>
        </div>

        {/* Baccalauréat Scientifique */}
        <div className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-950 block">
                2020
              </span>
              <VectorScientific className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className="text-base font-bold text-zinc-950 leading-snug">
              Baccalauréat Scientifique (SI)
            </h3>
            <p className="text-xs font-semibold text-zinc-600">Lycée — Filière scientifique</p>
            <p className="text-xs text-zinc-500 leading-relaxed pt-1">
              Formation scientifique axée sur la méthode, la résolution logique de problèmes, la modélisation et la rigueur dans la gestion des contraintes techniques.
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 pt-2 block border-t border-zinc-100">
            Sciences de l'Ingénieur
          </span>
        </div>

        {/* BAFA */}
        <div className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border border-zinc-200/50 shadow-sm shadow-zinc-950/[0.03] space-y-3 hover:bg-white/90 hover:border-zinc-300/60 transition-all duration-300 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-950 block">
                2019
              </span>
              <VectorBAFA className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className="text-base font-bold text-zinc-950 leading-snug">
              Brevet d'Aptitude aux Fonctions d'Animateur (BAFA)
            </h3>
            <p className="text-xs font-semibold text-zinc-600">Animation &amp; Dynamique de groupe</p>
            <p className="text-xs text-zinc-500 leading-relaxed pt-1">
              Sens du collectif, prise de parole en public, écoute active, animation de groupe et pédagogie opérationnelle en situation réelle.
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 pt-2 block border-t border-zinc-100">
            Encadrement certifié
          </span>
        </div>

      </div>
    </section>
  );
}

