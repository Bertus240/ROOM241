import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Eye, Layers } from 'lucide-react';

/**
 * ============================================================================
 * SOCIAL CAROUSEL SQUARE — CARROUSEL FORMAT CARRÉ STRICT 1:1 (1080 × 1080 PX)
 * Studio ROOM241 • Conçu pour les campagnes réseaux sociaux & acquisition
 * 
 * Spécifications validées :
 * - Format carré strict 1:1 (dimensions de référence 1080 × 1080 px).
 * - Toutes les slides au même ratio uniforme, zéro déformation, zéro coupure de texte.
 * - Ordre narratif complet : Couverture, Progression, Développement, Conclusion.
 * - Commandes complètes : Précédent / Suivant, indicateurs d'étapes (dots),
 *   navigation tactile mobile (touch swipe) et clavier accessible (ArrowLeft / ArrowRight).
 * - Sélecteur d'onglets pour passer d'une série à l'autre sans rechargement.
 * ============================================================================
 */

export const FIC_INSTAGRAM_SLIDES = [
  {
    id: 'fic-01',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v201.png',
    title: 'Suite 365 Total Protection MSP',
    step: '01 / 06 · Accroche MSP',
    narrative: 'Suite 365 MSP',
    description: "Présentation de la suite tout-en-un Hornetsecurity pour les MSP lors du Forum InCyber à Lille : sécurité, sauvegarde & gouvernance.",
    tag: 'Accroche'
  },
  {
    id: 'fic-02',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v202.png',
    title: 'Sécurité Email & Filtrage IA',
    step: '02 / 06 · Filtrage IA',
    narrative: 'Défense IA',
    description: "Filtrage multicouche et analyse en temps réel : défense avancée contre le phishing ciblé, les attaques BEC et les ransomwares.",
    tag: 'Défense IA'
  },
  {
    id: 'fic-03',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v203.png',
    title: 'Sauvegarde M365 & Restauration',
    step: '03 / 06 · Backup Cloud',
    narrative: 'Backup M365',
    description: "Sauvegarde automatisée et restauration granulaire pour boîtes mail, canaux Teams, bibliothèques SharePoint et OneDrive.",
    tag: 'Backup Cloud'
  },
  {
    id: 'fic-04',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v204.png',
    title: 'Sensibilisation des équipes',
    step: '04 / 06 · Facteur humain',
    narrative: 'Sensibilisation',
    description: "Construction d'un pare-feu humain via des simulations de phishing automatisées et des parcours de formation continue personnalisés.",
    tag: 'Sensibilisation'
  },
  {
    id: 'fic-05',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v205.png',
    title: 'Conformité & Gouvernance',
    step: '05 / 06 · Gouvernance IT',
    narrative: 'Conformité',
    description: "Application homogène des politiques de conformité, signatures électroniques centralisées et disclaimers légaux sur tous les tenants.",
    tag: 'Conformité'
  },
  {
    id: 'fic-06',
    src: '/assets/hornetsecurity/FIC_assets_2026/SOME/Post_7/v206.png',
    title: 'Rendez-vous InCyber Forum 2026',
    step: '06 / 06 · Invitation FIC',
    narrative: 'Rendez-vous FIC',
    description: "Une plate-forme unifiée pour une protection complète. Invitation sur le stand Hornetsecurity au Zénith de Lille (31 mars – 2 avril 2026).",
    tag: 'FIC 2026'
  }
];

export const SHAREPOINT_LINKEDIN_SLIDES = [
  {
    id: 'sp-01',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/1@4x.png',
    title: 'Alerte DSI : La faille humaine',
    step: '01 / 06 · Accroche DSI',
    narrative: 'Alerte DSI',
    description: "Campagne d'interpellation Paid Ads LinkedIn pour décideurs IT : sensibilisation aux failles de configuration humaine dans SharePoint.",
    tag: 'Alerte DSI'
  },
  {
    id: 'sp-02',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/2@4x.png',
    title: 'Droits non supervisés & Volume',
    step: '02 / 06 · Volume & Risque',
    narrative: 'Volume & Droits',
    description: "Mise en lumière de l'explosion des droits d'accès distincts non supervisés au sein des environnements d'entreprise Microsoft 365.",
    tag: 'Volume & Droits'
  },
  {
    id: 'sp-03',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/3@4x.png',
    title: 'Nommage trompeur des permissions',
    step: '03 / 06 · Faille de nommage',
    narrative: 'Labels trompeurs',
    description: "Démonstration visuelle de l'écart critique entre ce que l'administrateur lit (« Read ») et les droits réels accordés (« Full Control »).",
    tag: 'Labels trompeurs'
  },
  {
    id: 'sp-04',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/4@4x.png',
    title: 'Comptes résiduels & Accès fantômes',
    step: '04 / 06 · Accès fantômes',
    narrative: 'Accès fantômes',
    description: "Analyse des comptes résiduels conservant des droits d'accès aux fichiers stratégiques après le départ effectif des collaborateurs.",
    tag: 'Accès fantômes'
  },
  {
    id: 'sp-05',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/5@4x.png',
    title: 'Exfiltration furtive de fichiers',
    step: '05 / 06 · Fuite furtive',
    narrative: 'Fuite furtive',
    description: "Scénarisation didactique des 4 étapes d'une fuite furtive : création d'une bibliothèque masquée sans trace d'audit visible.",
    tag: 'Fuite furtive'
  },
  {
    id: 'sp-06',
    src: '/assets/hornetsecurity/Proofpoint_Sharepoint/6@4x.png',
    title: 'Audit proactif 365 Total Protection',
    step: '06 / 06 · Audit proactif',
    narrative: 'Audit proactif',
    description: "Appel à l'audit proactif via 365 Total Protection pour révéler et neutraliser les failles invisibles de l'écosystème SharePoint.",
    tag: 'Audit proactif'
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
      className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
    >
      {/* En-tête : Sélecteur de série + Commandes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1918] dark:text-white">
              Carrousels de campagnes (Ratio 4:5 · Formats verticaux réseaux sociaux)
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Proportions réelles 4:5 respectées sans déformation ni recadrage · 6 slides narratives par série
          </p>
        </div>

        {/* Sélecteur de série d'actifs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center p-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs">
            <button
              type="button"
              onClick={() => handleTabChange('fic')}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                activeTab === 'fic'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              InCyber 2026 (Instagram)
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('sharepoint')}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                activeTab === 'sharepoint'
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              SharePoint vs Proofpoint (LinkedIn)
            </button>
          </div>

          {/* Boutons Suivant / Précédent */}
          <div className="flex items-center gap-1.5 shrink-0 pl-1">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Slide précédente"
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-200 dark:border-white/10 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 px-2 min-w-[50px] text-center select-none">
              {String(currentIndex + 1).padStart(2, '0')}{' '}
              <span className="text-[#FFAD00]">/</span>{' '}
              {String(slides.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Slide suivante"
              className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-200 dark:border-white/10 flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Onglets de navigation des 6 slides */}
      <div
        role="tablist"
        aria-label="Liste des slides"
        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {slides.map((s, idx) => {
          const isSelected = idx === currentIndex;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setCurrentIndex(idx)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-zinc-950 text-white font-bold shadow-2xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 hover:text-zinc-950'
              }`}
            >
              <span className={`font-mono text-[10px] ${isSelected ? 'text-[#FFAD00] font-bold' : 'text-zinc-400'}`}>
                0{idx + 1}
              </span>
              <span className="truncate max-w-[140px] sm:max-w-none">{s.narrative}</span>
            </button>
          );
        })}
      </div>

      {/* Composition principale : Slide au ratio 4:5 à gauche, Contenu éditorial à droite */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center"
      >
        {/* Conteneur strict 4:5 pour la slide (format vertical Instagram / LinkedIn) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-950 flex items-center justify-center shadow-lg relative group">
            <img
              src={currentSlide.src}
              alt={currentSlide.title}
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />
          </div>
        </div>

        {/* Panneau éditorial détaillé de la slide active */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFAD00]/15 text-[#9E6A00] dark:text-[#FFAD00] border border-[#FFAD00]/30 text-xs font-mono font-bold">
              {currentSlide.step}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-mono text-zinc-600 dark:text-zinc-300">
              {currentSlide.tag}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#1A1918] dark:text-white tracking-tight leading-snug">
            {currentSlide.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#52525B] dark:text-zinc-400 leading-relaxed">
            {currentSlide.description}
          </p>

          <div className="pt-3 border-t border-zinc-100 dark:border-white/10 space-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center justify-between">
              <span>Ratio &amp; dimensions :</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-200">1:1 (1080 × 1080 px)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Étape du storytelling :</span>
              <span className="font-bold text-[#FFAD00]">{currentSlide.narrative}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Canal de diffusion :</span>
              <span className="text-zinc-700 dark:text-zinc-300">
                {activeTab === 'fic' ? 'Instagram & LinkedIn' : 'LinkedIn Paid Ads'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Points indicateurs d'étape */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Aller à la slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              idx === currentIndex
                ? 'w-6 bg-[#FFAD00]'
                : 'w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

