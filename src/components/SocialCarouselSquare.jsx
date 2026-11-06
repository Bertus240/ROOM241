import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ============================================================================
 * SOCIAL CAROUSEL — PRÉSENTATION ÉDITORIALE DES CARROUSELS DE CAMPAGNES
 * Studio ROOM241 • Rémi Brocart
 *
 * Direction artistique éditoriale ROOM241 :
 * - Fond ivoire chaleureux #FAF8F5 & surfaces #F3EFEA
 * - Typographie éditoriale #1A1918 & accents bronze #C5A880 / ambre #FFAD00 discret
 * - Ratio physique réel 4:5 (1080 × 1350 px / 4320 × 5400 px) sans déformation
 * - Hiérarchie sobre : Identification du projet, Visuel principal 4:5, Titre,
 *   Description contextualisée, Navigation fluide tactile et clavier.
 * ============================================================================
 */

export const FIC_INSTAGRAM_SLIDES = [
  {
    id: 'fic-01',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v201.png',
    title: 'Suite 365 Total Protection MSP',
    step: 'Étape 01 sur 06',
    narrative: 'Suite 365 MSP',
    description: "Présentation de la suite tout-en-un Hornetsecurity pour les MSP lors du Forum InCyber à Lille : sécurité, sauvegarde & gouvernance unifiées.",
    channel: 'Campagne Instagram & LinkedIn InCyber 2026'
  },
  {
    id: 'fic-02',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v202.png',
    title: 'Sécurité Email & Filtrage par IA',
    step: 'Étape 02 sur 06',
    narrative: 'Défense IA',
    description: "Filtrage multicouche et analyse en temps réel : défense avancée contre le phishing ciblé, les attaques BEC et les ransomwares.",
    channel: 'Campagne Instagram & LinkedIn InCyber 2026'
  },
  {
    id: 'fic-03',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v203.png',
    title: 'Sauvegarde Cloud & Restauration M365',
    step: 'Étape 03 sur 06',
    narrative: 'Backup Cloud',
    description: "Sauvegarde automatisée et restauration granulaire pour boîtes mail, canaux Teams, bibliothèques SharePoint et OneDrive.",
    channel: 'Campagne Instagram & LinkedIn InCyber 2026'
  },
  {
    id: 'fic-04',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v204.png',
    title: 'Sensibilisation & Pare-feu humain',
    step: 'Étape 04 sur 06',
    narrative: 'Sensibilisation',
    description: "Construction d'un pare-feu humain via des simulations de phishing automatisées et des parcours de formation continue personnalisés.",
    channel: 'Campagne Instagram & LinkedIn InCyber 2026'
  },
  {
    id: 'fic-05',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v205.png',
    title: 'Conformité, Signatures & Gouvernance IT',
    step: 'Étape 05 sur 06',
    narrative: 'Conformité',
    description: "Application homogène des politiques de conformité, signatures électroniques centralisées et disclaimers légaux sur tous les tenants.",
    channel: 'Campagne Instagram & LinkedIn InCyber 2026'
  },
  {
    id: 'fic-06',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v206.png',
    title: 'Rendez-vous InCyber Forum 2026',
    step: 'Étape 06 sur 06',
    narrative: 'Rendez-vous FIC',
    description: "Une plate-forme unifiée pour une protection complète. Invitation sur le stand Hornetsecurity au Zénith de Lille lors du Forum InCyber.",
    channel: 'Campagne Instagram & LinkedIn InCyber 2026'
  }
];

export const SHAREPOINT_LINKEDIN_SLIDES = [
  {
    id: 'sp-01',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/1@4x.png',
    title: 'Alerte DSI : La faille humaine',
    step: 'Étape 01 sur 06',
    narrative: 'Alerte DSI',
    description: "Campagne d'interpellation Paid Ads LinkedIn pour décideurs IT : sensibilisation aux failles de configuration humaine dans SharePoint.",
    channel: 'Campagne sponsorisée LinkedIn DSI'
  },
  {
    id: 'sp-02',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/2@4x.png',
    title: 'Droits non supervisés & Volume d\'accès',
    step: 'Étape 02 sur 06',
    narrative: 'Volume & Droits',
    description: "Mise en lumière de l'explosion des droits d'accès distincts non supervisés au sein des environnements d'entreprise Microsoft 365.",
    channel: 'Campagne sponsorisée LinkedIn DSI'
  },
  {
    id: 'sp-03',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/3@4x.png',
    title: 'Nommage trompeur des permissions',
    step: 'Étape 03 sur 06',
    narrative: 'Labels trompeurs',
    description: "Démonstration visuelle de l'écart critique entre ce que l'administrateur lit (« Read ») et les droits réels accordés (« Full Control »).",
    channel: 'Campagne sponsorisée LinkedIn DSI'
  },
  {
    id: 'sp-04',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/4@4x.png',
    title: 'Comptes résiduels & Accès fantômes',
    step: 'Étape 04 sur 06',
    narrative: 'Accès fantômes',
    description: "Analyse des comptes résiduels conservant des droits d'accès aux fichiers stratégiques après le départ effectif des collaborateurs.",
    channel: 'Campagne sponsorisée LinkedIn DSI'
  },
  {
    id: 'sp-05',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/5@4x.png',
    title: 'Exfiltration furtive de fichiers',
    step: 'Étape 05 sur 06',
    narrative: 'Fuite furtive',
    description: "Scénarisation didactique des étapes d'une fuite furtive : création d'une bibliothèque masquée sans trace d'audit visible.",
    channel: 'Campagne sponsorisée LinkedIn DSI'
  },
  {
    id: 'sp-06',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/6@4x.png',
    title: 'Audit proactif 365 Total Protection',
    step: 'Étape 06 sur 06',
    narrative: 'Audit proactif',
    description: "Appel à l'audit proactif via 365 Total Protection pour révéler et neutraliser les failles invisibles de l'écosystème SharePoint.",
    channel: 'Campagne sponsorisée LinkedIn DSI'
  }
];

export default function SocialCarouselSquare() {
  const [activeTab, setActiveTab] = useState('fic'); // 'fic' | 'sharepoint'
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const slides = activeTab === 'fic' ? FIC_INSTAGRAM_SLIDES : SHAREPOINT_LINKEDIN_SLIDES;
  const currentSlide = slides[currentIndex] || slides[0];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPrev();
    }
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) goToNext();
      else goToPrev();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Carrousel éditorial ratio 4:5"
      className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#FAF8F5] dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] space-y-6 sm:space-y-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
    >
      {/* 1. En-tête éditorial sobre & Sélecteur de série */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Déclinaisons éditoriales (Formats verticaux 4:5)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Séries de 6 visuels conçues pour les réseaux sociaux et l'acquisition B2B.
          </p>
        </div>

        {/* Sélecteur de campagne épuré */}
        <div className="inline-flex items-center p-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 shadow-2xs">
          <button
            type="button"
            onClick={() => handleTabChange('fic')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'fic'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            InCyber (Instagram)
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('sharepoint')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'sharepoint'
                ? 'bg-zinc-950 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            SharePoint (LinkedIn Ads)
          </button>
        </div>
      </div>

      {/* 2. Composition principale : Image 4:5 et Panneau éditorial */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
      >
        {/* Conteneur strict ratio 4:5 respectant les proportions physiques */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200/90 dark:border-white/10 bg-zinc-950 shadow-md flex items-center justify-center">
            <img
              src={currentSlide.src}
              alt={currentSlide.title}
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />
          </div>
        </div>

        {/* Contenu textuel & contextualisation éditoriale */}
        <div className="lg:col-span-6 space-y-5">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#C5A880] font-bold">{currentSlide.step}</span>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <span className="text-zinc-500 dark:text-zinc-400">{currentSlide.narrative}</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight leading-snug">
              {currentSlide.title}
            </h4>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {currentSlide.description}
          </p>

          <div className="pt-4 border-t border-zinc-200/60 dark:border-white/10 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
            <span>Canal : <strong className="text-zinc-800 dark:text-zinc-200 font-medium">{currentSlide.channel}</strong></span>
            <span className="font-mono text-zinc-400">{currentIndex + 1} / {slides.length}</span>
          </div>

          {/* Commandes de navigation : Puces de sélection + Flèches Précédent/Suivant */}
          <div className="pt-2 flex items-center justify-between gap-4">
            {/* 6 indicateurs de slide discrets et interactifs */}
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Navigation des 6 visuels">
              {slides.map((s, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Afficher le visuel ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'w-7 bg-[#C5A880]'
                        : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                    }`}
                  />
                );
              })}
            </div>

            {/* Boutons Suivant / Précédent discrets */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Visuel précédent"
                className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Visuel suivant"
                className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
