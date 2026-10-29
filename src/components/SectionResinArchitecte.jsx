import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SectionResinArchitecte() {
  const [selectedAsset, setSelectedAsset] = useState(0);

  const proofAssets = [
    {
      src: "/assets/social-proof-ra/post_pool_craft.png",
      title: "Démonstration artisanale & gestes techniques",
      caption: "Mise en avant de la précision de pose aux abords d'une piscine."
    },
    {
      src: "/assets/social-proof-ra/post_terrace_before_after.png",
      title: "Rénovation avant / après — 52 m²",
      caption: "Transformation d'un béton fissuré en 48h sans démolition."
    },
    {
      src: "/assets/social-proof-ra/post_trowel_craft.png",
      title: "Précision matière — Règle des 8 mm",
      caption: "Pédagogie technique sur l'épaisseur idéale d'un revêtement drainant."
    },
    {
      src: "/assets/social-proof-ra/FB_stats.png",
      title: "Statistiques d'audience Meta",
      caption: "648 visites de profil générées sur la période de relance (0 € d'ads)."
    }
  ];

  return (
    <section
      id="resin-architecte"
      className="py-24 sm:py-32 bg-[#FFFFFF] text-[#09090B] border-b border-zinc-200/70 scroll-mt-16"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-12">
        
        {/* Titre sobre */}
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Résin'Architecte — Identité &amp; Contenu Terrain
          </h2>
          <p className="text-sm sm:text-base text-[#3F3F46] mt-2 leading-relaxed max-w-3xl">
            Résin’Architecte développe des solutions de revêtements de sol en résine pour les espaces intérieurs et extérieurs (moquette de pierre, moquette de marbre, résines drainantes, EPDM, revêtements sur béton). Adaptation d'identité, fiches d'aide à la vente et captation directe sur le terrain.
          </p>
        </div>

        {/* Galerie épurée des réalisations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Grand visuel actif */}
          <div className="lg:col-span-8 space-y-3">
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-50 flex items-center justify-center p-3">
              <img
                src={proofAssets[selectedAsset].src}
                alt={proofAssets[selectedAsset].title}
                className="max-h-[460px] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
            <p className="text-xs text-[#71717A]">
              {proofAssets[selectedAsset].title} — {proofAssets[selectedAsset].caption}
            </p>
          </div>

          {/* Sélecteur de visuels */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {proofAssets.map((asset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedAsset(idx)}
                className={`text-left aspect-video rounded-xl overflow-hidden border p-1 transition-all ${
                  selectedAsset === idx
                    ? 'border-[#FFAD00] ring-2 ring-[#FFAD00]/20'
                    : 'border-zinc-200/80 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={asset.src}
                  alt={asset.title}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>

        </div>

        {/* 3 colonnes de texte brut aérées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-4">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Contexte
            </h3>
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              Savoir-faire technique reconnu dans le revêtement en résine minérale, mais absence de charte éditoriale claire et déficit d'image sur les réseaux sociaux.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Action
            </h3>
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              Définition des brand guidelines (typographies, palettes minérales), captation photo et vidéo directe sur les chantiers, mise en avant des gestes métiers et schémas techniques.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Résultat
            </h3>
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              +219 % de portée organique dès le premier mois, 648 visites de profil générées sans achat d'espace (0 € d'ads) et autorité établie auprès des prescripteurs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
