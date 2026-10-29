import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Play, CheckCircle2, TrendingUp, Sparkles, Building2, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Studio({ navigate }) {
  const [isPlayingFreshVideo, setIsPlayingFreshVideo] = useState(false);
  const [selectedRaAsset, setSelectedRaAsset] = useState(0);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  const raAssets = [
    {
      src: "/assets/social-proof-ra/post_pool_craft.png",
      title: "Précision artisanale aux abords d'une piscine",
      caption: "Mise en valeur du geste métier et du savoir-faire de pose sur chantier résidentiel."
    },
    {
      src: "/assets/social-proof-ra/post_terrace_before_after.png",
      title: "Rénovation avant / après — Terrasse de 52 m²",
      caption: "Format comparatif direct montrant la métamorphose d'une dalle béton sans démolition préalable."
    },
    {
      src: "/assets/social-proof-ra/post_trowel_craft.png",
      title: "Pédagogie matière — La règle des 8 mm",
      caption: "Publication technique expliquant l'épaisseur idéale d'un revêtement en résine drainante."
    },
    {
      src: "/assets/social-proof-ra/FB_stats.png",
      title: "Statistiques d'audience organique Meta",
      caption: "Progression des visites de profil générées sans budget publicitaire sur la période de relance."
    },
    {
      src: "/assets/social-proof-ra/fb-resume.png",
      title: "Couverture globale Facebook et Instagram",
      caption: "Bilan des impressions obtenues grâce à la régularité des publications terrain."
    },
    {
      src: "/assets/social-proof-ra/Comparaison_FB_entreprises_similaires.png",
      title: "Benchmark sectoriel régional",
      caption: "Comparatif des interactions face aux entreprises de travaux et revêtements similaires."
    }
  ];

  return (
    <div className="pt-32 pb-28 space-y-28 sm:space-y-36">

      {/* ========================================================
          EN-TÊTE ÉDITORIAL DU STUDIO
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10">
        <div className="space-y-6">
          
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={handleNav('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52525B] hover:text-[#09090B] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </a>
            <span className="text-zinc-300">•</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Collaborations &amp; Graphisme Freelance
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#09090B] leading-[1.08]">
              Studio — Réalisations documentées.
            </h1>
            <p className="text-lg text-[#52525B] leading-relaxed">
              Sélection de projets menés en indépendant : de l'accompagnement d'une campagne de financement participatif et de vulgarisation de données grande distribution à la valorisation de chantiers artisanaux dans le BTP haut de gamme.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================
          PROJET 1 : FRESH DATA (RETAIL DATA & FINANCEMENT)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-12">
        
        <div className="border-t border-zinc-200/80 pt-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
            <Sprout className="w-4 h-4" />
            <span>Retail Data &amp; Veille Promotionnelle</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
              Fresh Data — Univers visuel &amp; Campagne Ulule (validée à 116 %)
            </h2>
            <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-3 py-1 rounded-full w-fit">
              Validation : Marc-Henri Blarel
            </span>
          </div>
          <p className="text-base text-[#52525B] max-w-3xl leading-relaxed">
            Construction d'une identité visuelle cohérente pour une solution de qualification et de mesure des fruits et légumes. L'accompagnement intégrait la campagne de crowdfunding Ulule, les habillages graphiques pour une émission radio et la captation vidéo au salon international MEDFEL.
          </p>
        </div>

        {/* Vidéo interview salon MEDFEL avec lecteur 16:9 click-to-play */}
        <div className="space-y-3">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-zinc-200/80 bg-neutral-950 shadow-sm">
            {isPlayingFreshVideo ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/mf6eguKkok8?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                title="Fresh Data - Interview et captation salon MEDFEL"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                onClick={() => setIsPlayingFreshVideo(true)}
                role="button"
                tabIndex={0}
                aria-label="Lancer la vidéo de captation au salon international MEDFEL"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsPlayingFreshVideo(true);
                  }
                }}
                className="relative w-full h-full cursor-pointer group"
              >
                <img
                  src="/assets/fresh-data-video-cover.jpg"
                  alt="Production vidéo salon MEDFEL et campagne Ulule — Fresh Data"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/15" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFAD00]/30 animate-ping opacity-75" />
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_35px_rgba(255,173,0,0.6)] transition-all duration-200 group-hover:scale-110 active:scale-95">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-[#71717A] text-center">
            Captation terrain &amp; interview vidéo au salon international MEDFEL (Click-to-play)
          </p>
        </div>

        {/* 3 Blocs factuels rigoureux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              1. Identité &amp; Financement
            </h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Création des supports graphiques pour la campagne Ulule qui a dépassé son objectif initial en validant la campagne à 116 % grâce à une mise en scène claire de la proposition de valeur.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              2. Déploiement omnicanal
            </h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Conception des éléments graphiques pour les passages en émission de radio et réalisation d'une captation vidéo sur le terrain lors du salon MEDFEL à Perpignan.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              3. Retombées opérationnelles
            </h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              La lisibilité et la rigueur des supports ont permis de clarifier la proposition de valeur de la solution et d'outiller efficacement les présentations commerciales auprès des professionnels de la grande distribution.
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================
          PROJET 2 : RÉSIN'ARCHITECTE (BTP HAUT DE GAMME)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-12">
        
        <div className="border-t border-zinc-200/80 pt-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
            <Building2 className="w-4 h-4" />
            <span>Direction artistique &amp; Graphisme freelance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Résin'Architecte — Formalisation d'identité &amp; Valorisation de chantiers
          </h2>
          <p className="text-base text-[#52525B] max-w-3xl leading-relaxed">
            Mon intervention a consisté en l'adaptation et la formalisation d'une identité visuelle existante (et non une refonte complète de marque). L'enjeu était de professionnaliser la présence sur les réseaux sociaux et de constituer une bibliothèque de réassurance commerciale fondée sur visuels de chantiers concrets.
          </p>
        </div>

        {/* Galerie interactive des chantiers & preuves réelles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Grand visuel actif */}
          <div className="lg:col-span-8 space-y-3">
            <div className="aspect-[16/10] w-full rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-50 flex items-center justify-center p-4">
              <img
                src={raAssets[selectedRaAsset].src}
                alt={raAssets[selectedRaAsset].title}
                className="max-h-[460px] w-auto max-w-full object-contain rounded-xl"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#71717A] pt-1">
              <span className="font-semibold text-[#09090B]">{raAssets[selectedRaAsset].title}</span>
              <span>{raAssets[selectedRaAsset].caption}</span>
            </div>
          </div>

          {/* Grille de sélection des 6 assets de preuve */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            {raAssets.map((asset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedRaAsset(idx)}
                className={`text-left aspect-video rounded-xl overflow-hidden border p-1 transition-all ${
                  selectedRaAsset === idx
                    ? 'border-[#FFAD00] ring-2 ring-[#FFAD00]/30 shadow-sm'
                    : 'border-zinc-200/80 opacity-70 hover:opacity-100 hover:border-zinc-300'
                }`}
              >
                <img
                  src={asset.src}
                  alt={asset.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            ))}
          </div>

        </div>

        {/* 3 Blocs factuels Résin'Architecte */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              1. Formalisation graphique
            </h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Mise en place de règles graphiques strictes (typographies lisibles, contrastes de matières, palettes minérales) et conception de modèles réutilisables pour pérenniser la communication.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              2. Valorisation de chantiers
            </h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Sélection et mise en page de photographies réelles issues de chantiers réels : carrousels avant/après, gestes techniques à la taloche et pédagogie sur la règle des 8 mm.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              3. Réassurance commerciale
            </h3>
            <p className="text-sm text-[#52525B] leading-relaxed">
              Création d'un ensemble de supports rassurants pour les particuliers en phase de décision (rénovation de terrasses, tours de piscine, allées carrossables) attesté par les statistiques d'engagement réelles.
            </p>
          </div>

        </div>

        {/* Bas de page Studio avec navigation */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100">
          <a
            href="/hornetsecurity"
            onClick={handleNav('/hornetsecurity')}
            className="text-xs font-semibold text-[#52525B] hover:text-[#09090B] inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Étude Hornetsecurity</span>
          </a>

          <a
            href="/hors-cadre"
            onClick={handleNav('/hors-cadre')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <span>Découvrir la photographie (Hors-cadre)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
          </a>
        </div>

      </section>

    </div>
  );
}
