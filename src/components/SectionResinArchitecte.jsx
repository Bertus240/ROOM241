import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SectionResinArchitecte() {
  const [selectedAsset, setSelectedAsset] = useState(0);

  const proofAssets = [
    {
      src: "/assets/social-proof-ra/post_terrace_before_after.png",
      title: "Transformation terrasse — 52 m² en 48h",
      caption: "Format avant/après documentant la rénovation d'une dalle fissurée sans démolition pour rassurer sur la rapidité d'exécution.",
      badge: "Réalisation terrain"
    },
    {
      src: "/assets/social-proof-ra/post_pool_craft.png",
      title: "Savoir-faire artisanal — Abords de piscine",
      caption: "Focus éditorial sur la précision du geste technique et la régularité du talochage pour valoriser les finitions haut de gamme.",
      badge: "Geste métier"
    },
    {
      src: "/assets/social-proof-ra/post_trowel_craft.png",
      title: "Pédagogie matière — La règle des 8 mm",
      caption: "Post didactique vulgarisant l'épaisseur indispensable d'une résine drainante pour pérenniser l'ouvrage face au gel.",
      badge: "Contenu expert"
    },
    {
      src: "/assets/social-proof-ra/FB_stats.png",
      title: "Portée & Interactions — Bilan Meta 30 jours",
      caption: "Analyse des retombées organiques : +219 % de portée et +209 % d'interactions générées sans aucun budget publicitaire.",
      badge: "+219 % portée"
    },
    {
      src: "/assets/social-proof-ra/Insta_1.png",
      title: "Acquisition qualifiée — Trafic Instagram",
      caption: "Suivi des visites du profil générées par les gabarits visuels : 648 visites spontanées de prospects locaux.",
      badge: "648 visites"
    },
    {
      src: "/assets/social-proof-ra/Comparaison_FB_entreprises_similaires.png",
      title: "Benchmark sectoriel — Performance régionale",
      caption: "Comparatif d'engagement face aux artisans du secteur : volume d'interactions supérieur à la moyenne locale.",
      badge: "Benchmark"
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
