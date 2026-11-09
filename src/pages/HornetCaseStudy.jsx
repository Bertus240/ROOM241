import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Play,
  ArrowLeft,
  Award,
  Sparkles,
  Maximize2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import BadgesCarousel from '../components/BadgesCarousel';
import SupportsUsagesMarquee from '../components/SupportsUsagesMarquee';
import SocialCarouselSquare from '../components/SocialCarouselSquare';
import StatGroup from '../components/StatGroup';
import EditorialViewer from '../components/EditorialViewer';
import CaseStudyNavigation from '../components/CaseStudyNavigation';

/**
 * ============================================================================
 * HORNETSECURITY — ÉTUDE DE CAS COMPLÈTE & DOCUMENTÉE (ROOM241)
 * Studio ROOM241 • Rémi Brocart
 *
 * Contenus intégrés et certifiés :
 * 1. Contexte d'expérience (3 ans d'accompagnement : Alternance puis CDI).
 * 2. 4 repères chiffrés animés via StatGroup (> 150 m², 4 000+, 36 h, Europe).
 * 3. Projet FIC 2025/2026 : Scénographie d'envergure (> 150 m²), carrousel
 *    multimédia (photos in situ, boucles After Effects Recto/Verso, vidéo du stand).
 * 4. Signalétique urbaine grand format & orientation des flux (Zénith, e-karting).
 * 5. Incarnation terrain de Captain Security (plénière & passerelle).
 * 6. Sprint créatif 36 h à Hanovre & HÉROS CYBER HELIX NOVA :
 *    - Grande affiche imprimée grand format avec zoom haute résolution.
 *    - Lecteur vidéo officiel Helix Nova (YouTube -h8V1xBcDBQ) à la demande.
 * 7. Programme de certification des partenaires B2B (7 badges officiels).
 * 8. Campagnes publicitaires Paid Ads LinkedIn (SharePoint vs Proofpoint).
 * 9. Bilan collectif certifié : +4 000 contacts B2B enregistrés sur l'événement.
 * ============================================================================
 */

const HORNET_KEY_STATS = [
  {
    value: '> 150 m²',
    label: "Stand d'exposition FIC",
    description: "Scénographie d'envergure, arche LED et piste e-karting à Lille Grand Palais",
    attribution: "Modélisation 3D & habillage",
    tag: "Scénographie"
  },
  {
    value: '4 000+',
    label: "Contacts B2B enregistrés",
    description: "Volume recueilli sur le stand par l'ensemble des forces de vente durant le salon",
    attribution: "Bilan collectif commercial FIC",
    tag: "Résultat collectif"
  },
  {
    value: '36 h',
    label: "Design Sprint à Hanovre",
    description: "Création graphique et modélisation de l'héroïne cyber Helix Nova au siège",
    attribution: "Production autonome Allemagne",
    tag: "Création 3D"
  },
  {
    value: 'Europe',
    label: "Siège & salons internationaux",
    description: "Équipe basée à Hanovre, déplacements toutes les 6 semaines et 100 % anglais au quotidien",
    attribution: "Contexte international",
    tag: "100 % anglais",
    animated: false
  }
];

export default function HornetCaseStudy({ navigate }) {
  // Navigation FIC Carrousel
  const [hornetMediaIndex, setHornetMediaIndex] = useState(0);
  const [isFicViewerOpen, setIsFicViewerOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabContainerRef = useRef(null);
  const tabRefs = useRef([]);

  // États lecteurs vidéo dédiés
  const [isPlayingHelixVideo, setIsPlayingHelixVideo] = useState(false);
  const [isVideoBilanPlaying, setIsVideoBilanPlaying] = useState(false);

  // États des modales d'agrandissement haute résolution
  const [captainViewerIndex, setCaptainViewerIndex] = useState(null);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
    else window.location.href = path;
  };

  // Liste ordonnée des médias du dispositif scénographique FIC
  const ficMediaList = [
    {
      id: 'stand-arch-photo',
      tabLabel: "Arche (photo)",
      title: "Arche d'accueil active — Repère visuel au cœur du stand au Zénith",
      subtitle: "Forum InCyber (Accès Grand Palais · Implantation au Zénith)",
      type: 'image',
      src: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      badge: "Photographie in situ • Stand actif",
      caption: "Lille Grand Palais • Stand de plus de 150 m² accueillant plus de 4 000 contacts B2B collectifs",
      straighten: true
    },
    {
      id: 'stand-overview',
      tabLabel: "Vue plongeante",
      title: "Perspective panoramique en plongée du hall dédié au Zénith — Stand > 150 m²",
      subtitle: "Orientation globale des flux et visibilité de l'arche",
      type: 'image',
      src: '/assets/hornetsecurity/fic/Stand/IMG20250401075301.jpg',
      badge: "Photographie in situ • Vue en plongée",
      caption: "Vue d'ensemble du hall dédié au Zénith : organisation des flux et identification immédiate du stand",
      straighten: false
    },
    {
      id: 'arch-front-video',
      tabLabel: "Arche (Recto)",
      title: "Arche d'accueil vidéo — Recto / Face avant (After Effects 1080p)",
      subtitle: "Animation After Effects 60 fps pour arche vidéo d'entrée",
      type: 'video',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/FRONT_Global_Arch_1920x1080.mp4',
      badge: "Animation After Effects • 1080p",
      caption: "Boucle visuelle dynamique After Effects diffusée sur la face avant de l'arche à l'entrée du stand"
    },
    {
      id: 'arch-back-video',
      tabLabel: "Arche (Verso)",
      title: "Arche d'accueil vidéo — Verso / Face arrière (After Effects 1080p)",
      subtitle: "Animation After Effects 60 fps orientée vers le cœur du stand",
      type: 'video',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/BACK_Global_Arch_1920x1080.mp4',
      badge: "Animation After Effects • 1080p",
      caption: "Boucle graphique After Effects diffusée sur la face arrière de l'arche orientée vers l'espace de négociation"
    },
    {
      id: 'vid-stand-life',
      tabLabel: "Vie du stand",
      title: "Vie du stand — Échanges et affluence avec les visiteurs professionnels",
      subtitle: "Captation in situ de l'effervescence commerciale",
      type: 'video',
      src: '/assets/hornetsecurity/fic/Videos/vid3_fic.mp4',
      badge: "Captation in situ • Stand actif",
      caption: "Affluence continue et dynamique d'échanges avec les professionnels de la cybersécurité sur le stand"
    },
    {
      id: 'vid-ambiance',
      tabLabel: "Ambiance salon",
      title: "Ambiance & flux visiteurs — Dynamique de l'espace événementiel",
      subtitle: "Immersion dans les allées du Forum InCyber",
      type: 'video',
      src: '/assets/hornetsecurity/fic/Videos/vid4_fic.mp4',
      badge: "Captation in situ • Ambiance salon",
      caption: "Mise en lumière de l'animation de marque et de l'expérience visiteurs au Zénith de Lille"
    }
  ];

  const captainMediaList = [
    {
      id: 'captain-stage',
      src: '/assets/hornetsecurity/fic/Capain/captain2.jpg',
      alt: "Rémi Brocart en Captain Security sur la scène plénière avec les mascottes partenaires au Forum InCyber",
      title: "Captain Security — Scène plénière FIC & it-sa",
      description: "Animation plénière et rencontre des partenaires sur la grande scène. L'incarnation physique de la marque renforce l'impact mémoriel et catalyse la proximité avec les visiteurs professionnels.",
      badge: "Scène plénière",
      place: "Lille & Nuremberg"
    },
    {
      id: 'captain-ramp',
      src: '/assets/hornetsecurity/fic/Capain/captain.jpeg',
      alt: "Rémi Brocart en costume de Captain Security sur la passerelle d'accès du salon",
      title: "Captain Security — Passerelle & Scénographie",
      description: "Photographie plein pied sur la passerelle d'accès du salon. Costume sur-mesure aux couleurs de la marque cyber, créant une attraction visuelle immédiate.",
      badge: "Costume de marque",
      place: "Salons Européens"
    }
  ];

  const helixPosterMedia = [
    {
      id: 'helix-poster',
      src: '/assets/hornetsecurity/affiche_helix_sprint.jpg',
      alt: "Affiche officielle du héros cyber Helix Nova pour Hornetsecurity by Proofpoint",
      title: "Helix Nova — Affiche officielle",
      description: "Photographie in situ de l'affiche imprimée grand format • Sprint créatif de Hanovre (36 h) pour Hornetsecurity by Proofpoint.",
      badge: "Sprint Hanovre 36 h",
      place: "Hanovre, Allemagne"
    }
  ];

  const handleHornetPrev = () => {
    setHornetMediaIndex((prev) => (prev - 1 + ficMediaList.length) % ficMediaList.length);
  };

  const handleHornetNext = () => {
    setHornetMediaIndex((prev) => (prev + 1) % ficMediaList.length);
  };

  // Détection dynamique du débordement et affordance de défilement horizontal
  const updateScrollAffordance = () => {
    const el = tabContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  useEffect(() => {
    const el = tabContainerRef.current;
    if (!el) return;
    updateScrollAffordance();
    el.addEventListener('scroll', updateScrollAffordance, { passive: true });
    window.addEventListener('resize', updateScrollAffordance);
    return () => {
      el.removeEventListener('scroll', updateScrollAffordance);
      window.removeEventListener('resize', updateScrollAffordance);
    };
  }, []);

  // Synchronisation du défilement des onglets
  useEffect(() => {
    const activeTabEl = tabRefs.current[hornetMediaIndex];
    if (activeTabEl && tabContainerRef.current) {
      activeTabEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
    updateScrollAffordance();
  }, [hornetMediaIndex]);

  return (
    <article className="pt-32 pb-28 space-y-24 sm:space-y-32 bg-[#FAF8F5] text-[#1A1918]">

      {/* ========================================================
          1. EN-TÊTE ÉDITORIAL & POSITIONNEMENT STRATÉGIQUE
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="space-y-8">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-200/60">
            <div className="flex items-center gap-3">
              <a
                href="/projets"
                onClick={handleNav('/projets')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C857B] hover:text-[#1A1918] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#FFAD00]" />
                <span>Retour aux réalisations</span>
              </a>
              <span className="text-zinc-300">•</span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Étude de cas · Cybersécurité B2B
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-zinc-600">
              <span className="font-semibold text-zinc-900 tracking-tight">Lille · Nuremberg · Hanovre</span>
              <span className="text-zinc-300">/</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-zinc-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                100 % anglais au quotidien
              </span>
              <span className="text-zinc-300">/</span>
              <span className="text-zinc-500">Sept 2023 – Octobre 2026</span>
            </div>
          </div>

          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.16em] text-[#FFAD00] block">
              Hornetsecurity by Proofpoint · 3 ans d'accompagnement
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1A1918] leading-[1.14] [text-wrap:balance]">
              Scénographie événementielle (&gt; 150 m²), motion design &amp; branding B2B.
            </h1>
            <p className="text-base sm:text-xl text-[#52525B] leading-relaxed">
              Trois années d'évolution continue au sein du leader européen de la cybersécurité Cloud : de la marque employeur et la refonte des badges partenaires jusqu'au design graphique de stands d'exposition majeurs, la création d'Helix Nova et l'incarnation de Captain Security sur les scènes internationales.
            </p>
          </div>

          {/* Les 4 repères chiffrés harmonisés via StatGroup */}
          <div className="pt-4 border-t border-zinc-200/80">
            <StatGroup stats={HORNET_KEY_STATS} variant="card" size="card" />
          </div>

          {/* Distinction stricte et chronologique des deux périodes professionnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8C857B]">
                  Période 1 · Alternance Master (2 ans)
                </span>
                <span className="text-xs font-mono font-semibold text-zinc-700 tracking-tight">
                  Sept 2023 – Août 2025
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#1A1918]">
                Chargé de marque employeur — Vade, puis Hornetsecurity
              </h2>
              <ul className="text-xs text-[#52525B] space-y-2 leading-relaxed">
                <li>• Campagnes d'attractivité RH pour attirer des profils techniques pointus (ingénieurs en détection de menaces, développeurs).</li>
                <li>• Structuration du programme d'employee advocacy et accompagnement individuel des collaborateurs sur LinkedIn.</li>
                <li>• Organisation des séminaires d'intégration, kits d'onboarding et vidéos internes post-acquisition.</li>
              </ul>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFAD00]">
                  Période 2 · CDI
                </span>
                <span className="text-xs font-mono font-semibold text-zinc-700 tracking-tight">
                  Sept 2025 – Octobre 2026
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-[#1A1918]">
                Graphic Designer &amp; Brand Production (Hornetsecurity by Proofpoint)
              </h2>
              <ul className="text-xs text-[#52525B] space-y-2 leading-relaxed">
                <li>• Conception graphique et signalétique des stands pour les salons professionnels européens (&gt; 150 m² au FIC).</li>
                <li>• Réalisation sous After Effects des boucles dynamiques 1080p 60fps diffusées sur les arches LED d'accueil.</li>
                <li>• Création de supports publicitaires de performance (Paid Ads LinkedIn) et déclinaison des chartes B2B.</li>
                <li>• Travail quotidien en anglais au sein d'une équipe design internationale basée principalement en Allemagne.</li>
              </ul>
            </div>
          </div>

          {/* Contexte international & Évolution de l'entreprise */}
          <div className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-zinc-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                  100 % anglais au quotidien
                </span>
                <span className="text-zinc-300">/</span>
                <span className="text-zinc-700 font-medium">
                  Équipe basée à Hanovre (Allemagne) · Déplacements au siège toutes les 6 semaines
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">
                Contexte d'entreprise
              </span>
            </div>

            <div className="pt-2 border-t border-zinc-200/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="text-zinc-600 font-medium">
                  Deux opérations de rachat successives ont jalonné mon parcours :
                </span>
                <div className="inline-flex items-center gap-2 font-mono font-semibold text-zinc-900 bg-white px-3 py-1.5 rounded-xl border border-zinc-200/80 shadow-2xs">
                  <span className="text-zinc-700">Vade</span>
                  <span className="text-zinc-400">→</span>
                  <span className="text-zinc-900 font-bold">Hornetsecurity</span>
                  <span className="text-zinc-400">→</span>
                  <span className="text-[#FFAD00] font-bold">Proofpoint</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. ACTE I & II — SCÉNOGRAPHIE DU STAND FIC (> 150 M²)
          (Ancre ciblée pour le clic depuis la statistique > 150 m²)
          ======================================================== */}
      <section id="scenographie-fic" className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24 space-y-10">
        
        <div className="space-y-3 border-t border-zinc-200/80 pt-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#FFAD00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span>Acte I &amp; II · Scénographie &amp; Signalétique</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A1918]">
            Forum InCyber (FIC) : Scénographie du stand (&gt; 150 m²) &amp; boucle After Effects 2026
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] max-w-3xl leading-relaxed">
            Conception de l'environnement graphique du stand, de la signalétique, des parcours visuels et des animations After Effects 1080p 60fps destinées à l'arche LED d'accueil pour l'édition 2026 du Forum InCyber à Lille. La structure métallique a été réalisée par le prestataire scénographique, sur un stand d'exposition supérieur à 150 m² au Zénith de Lille.
          </p>
        </div>

        {/* Carrousel Scénographique & Médias FIC complet */}
        <div className="p-5 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6">
          
          {/* En-tête éditorial du carrousel avec commandes unifiées */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1918]">
                  {ficMediaList[hornetMediaIndex]?.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#1A1918] tracking-tight">
                {ficMediaList[hornetMediaIndex]?.title}
              </h3>
            </div>

            {/* Commandes unifiées : Flèches Prev/Next + Compteur */}
            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              <button
                type="button"
                onClick={handleHornetPrev}
                aria-label="Média précédent"
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-zinc-700 px-2 min-w-[56px] text-center">
                {String(hornetMediaIndex + 1).padStart(2, '0')} <span className="text-[#FFAD00]">/</span> {String(ficMediaList.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={handleHornetNext}
                aria-label="Média suivant"
                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Barre de sélection d'onglets studio ROOM241 avec affordance de défilement horizontal */}
          <div className="relative w-full">
            {/* Masques de dégradé indicateurs de défilement (visibles sur mobile quand le contenu dépasse) */}
            <div
              aria-hidden="true"
              className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none transition-opacity duration-200 sm:hidden ${
                canScrollLeft ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div
              aria-hidden="true"
              className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none transition-opacity duration-200 sm:hidden ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <div
              ref={tabContainerRef}
              className="flex items-center gap-1 p-1 rounded-full bg-zinc-100/80 border border-zinc-200/70 text-xs overflow-x-auto no-scrollbar sm:grid sm:grid-cols-6 backdrop-blur-xs"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {ficMediaList.map((m, idx) => {
                const isActive = hornetMediaIndex === idx;
                return (
                  <button
                    key={m.id}
                    ref={(el) => (tabRefs.current[idx] = el)}
                    type="button"
                    onClick={() => {
                      setHornetMediaIndex(idx);
                    }}
                    className={`min-h-[40px] py-2 px-3.5 rounded-full transition-all duration-200 shrink-0 cursor-pointer text-xs font-sans whitespace-nowrap sm:whitespace-normal flex items-center justify-center gap-1.5 ${
                      isActive
                        ? "bg-white text-zinc-950 font-bold shadow-xs border border-zinc-200/90"
                        : "text-zinc-500 hover:text-zinc-950 hover:bg-white/50"
                    }`}
                  >
                    <span className={`font-mono text-[11px] ${isActive ? "text-[#FFAD00] font-bold" : "text-zinc-400"}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{m.tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conteneur média 16:9 haute fidélité */}
          <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-md">
            <AnimatePresence mode="wait">
              {ficMediaList[hornetMediaIndex]?.type === 'image' ? (
                <motion.div
                  key={ficMediaList[hornetMediaIndex].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full group overflow-hidden"
                >
                  <div
                    onClick={() => setIsFicViewerOpen(true)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Agrandir la photographie : ${ficMediaList[hornetMediaIndex].title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsFicViewerOpen(true);
                      }
                    }}
                    className="relative w-full h-full cursor-pointer"
                  >
                    <img
                      src={ficMediaList[hornetMediaIndex].src}
                      alt={ficMediaList[hornetMediaIndex].title}
                      style={ficMediaList[hornetMediaIndex]?.straighten ? { transform: 'rotate(-0.85deg) scale(1.035)' } : undefined}
                      className="w-full h-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-102"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Bouton d'agrandissement haute résolution */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-zinc-900 shadow-md opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Légende in situ */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white pointer-events-none">
                      <div className="space-y-0.5 max-w-xl">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#FFAD00] px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                          {ficMediaList[hornetMediaIndex].badge}
                        </span>
                        <p className="text-xs sm:text-sm font-semibold pt-1 drop-shadow">
                          {ficMediaList[hornetMediaIndex].caption}
                        </p>
                      </div>
                      <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                        Cliquer pour agrandir ↗
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={ficMediaList[hornetMediaIndex].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full flex items-center justify-center bg-black"
                >
                  <video
                    key={ficMediaList[hornetMediaIndex].src}
                    src={ficMediaList[hornetMediaIndex].src}
                    controls
                    preload="metadata"
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                  <div className="absolute top-4 left-4 pointer-events-none z-10">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-white px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20">
                      {ficMediaList[hornetMediaIndex].badge}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fiche explicative en 3 volets sous le carrousel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-zinc-200/60">
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Scénographie &amp; Signalétique
                </h4>
              </div>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Habillage graphique et signalétique du stand de plus de 150 m² au Zénith de Lille (accès Grand Palais). Organisation des flux et hiérarchisation de l'information pour rendre le stand immédiatement identifiable dans un environnement scénique inédit.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Motion Design After Effects
                </h4>
              </div>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Animation After Effects 1080p 60fps diffusée sur l'arche LED à l'entrée du stand. Un signal immersif clé qui assurait le repérage du stand au Zénith et valorisait la transition de co-branding « HORNETSECURITY FORMERLY Vade ».
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
                  Présence &amp; Terrain
                </h4>
              </div>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Présence active sur les 3 jours de l'événement, contact avec les visiteurs, animation autour de la piste e-karting et retombée collective de plus de 4 000 contacts B2B enregistrés par les équipes commerciales.
              </p>
            </div>
          </div>

        </div>

        {/* Diptyque Bâche Zénith & Couloir karting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
          <div className="space-y-2">
            <div className="aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
              <img
                src="/assets/hornetsecurity/fic/Stand/tmp_8551ceee-de3b-46ec-ba5a-a37cac8e00df.jpeg"
                alt="Affichage urbain géant sur la façade du Zénith de Lille pour l'e-karting"
                className="w-full h-full object-cover object-[center_20%]"
                loading="lazy"
              />
            </div>
            <h4 className="text-xs font-semibold text-[#1A1918]">
              Affichage urbain extérieur — Façade du Zénith de Lille (Édition FIC 2025)
            </h4>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Conception de la bâche extérieure grand format sur la façade du Zénith de Lille invitant les visiteurs du forum à rejoindre l'espace privatisé lors de l'édition FIC 2025.
            </p>
          </div>

          <div className="space-y-2">
            <div className="aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
              <img
                src="/assets/hornetsecurity/fic/Stand/IMG20250401075149.jpg"
                alt="Signalétique directionnelle avec motif drapeau à damier vers la piste karting"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <h4 className="text-xs font-semibold text-[#1A1918]">
              Signalétique directionnelle &amp; Couloir e-karting
            </h4>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Scénographie du couloir de transit aux couleurs de la marque avec damier rouge et noir orientant les flux de visiteurs vers l'animation.
            </p>
          </div>
        </div>

      </section>

      {/* ========================================================
          3. ACTE III — INCARNATION TERRAIN : CAPTAIN SECURITY
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10">
        
        <div className="space-y-3 border-t border-zinc-200/80 pt-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#FFAD00]">
            <Award className="w-3.5 h-3.5 text-[#FFAD00]" />
            <span>Acte III · Événementiel International &amp; Incarnation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A1918]">
            Captain Security : Donner vie à l'univers de marque face aux visiteurs
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] max-w-3xl leading-relaxed">
            Lors de plusieurs salons majeurs (notamment le FIC à Lille et it-sa à Nuremberg), j'ai incarné le héros de la marque, Captain Security. Cette expérience singulière montre que ma relation au design ne s'arrête pas aux fichiers numériques : elle prend corps sur le terrain, créant une accroche humaine forte avec les visiteurs professionnels.
          </p>
        </div>

        {/* Diptyque équilibré 50% / 50% avec zoom haute résolution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Photo 1 : Sur scène plénière */}
          <div
            onClick={() => setCaptainViewerIndex(0)}
            role="button"
            tabIndex={0}
            aria-label="Agrandir la photographie sur scène plénière"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCaptainViewerIndex(0);
              }
            }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm flex items-center justify-center group cursor-pointer"
          >
            <img
              src="/assets/hornetsecurity/fic/Capain/captain2.jpg"
              alt="Rémi Brocart en Captain Security sur la scène plénière avec les mascottes partenaires au Forum InCyber"
              className="w-full h-full object-cover object-[center_35%] transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
              <div className="self-end p-2 rounded-full bg-white/90 text-black shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between text-white text-xs drop-shadow">
                <span className="font-semibold font-mono">SCÈNE PLÉNIÈRE</span>
                <span className="text-white/80 text-[11px]">Cliquer pour agrandir ↗</span>
              </div>
            </div>
          </div>

          {/* Photo 2 : Passerelle terrain en costume de plein pied */}
          <div
            onClick={() => setCaptainViewerIndex(1)}
            role="button"
            tabIndex={0}
            aria-label="Agrandir la photographie sur la passerelle d'accès"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCaptainViewerIndex(1);
              }
            }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm flex items-center justify-center group cursor-pointer"
          >
            <img
              src="/assets/hornetsecurity/fic/Capain/captain.jpeg"
              alt="Rémi Brocart en costume de Captain Security sur la passerelle d'accès"
              className="w-full h-full object-cover object-[center_28%] transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
              <div className="self-end p-2 rounded-full bg-white/90 text-black shadow-md">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between text-white text-xs drop-shadow">
                <span className="font-semibold font-mono">PASSERELLE &amp; COSTUME</span>
                <span className="text-white/80 text-[11px]">Cliquer pour agrandir ↗</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================
          4. ACTE IV — RESTAURATION MAJEURE : SPRINT DE HANOVRE & VIDÉO HELIX NOVA
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10">
        
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/60 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Sprint créatif de Hanovre · Univers de cyber-héros 3D
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1918] mt-1">
                Helix Nova : Identité visuelle, affiche officielle &amp; vidéo de présentation
              </h2>
            </div>
            <span className="text-xs font-mono font-medium text-zinc-500 tracking-tight">
              Sprint 36 h chrono · Siège à Hanovre, Allemagne
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Colonne gauche : Grande affiche avec format vertical respecté et zoom plein écran */}
            <div className="lg:col-span-6 space-y-2">
              <div
                onClick={() => setIsPosterModalOpen(true)}
                role="button"
                tabIndex={0}
                aria-label="Agrandir l'affiche Helix Nova en haute résolution"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsPosterModalOpen(true);
                  }
                }}
                className="relative aspect-[3/4] sm:aspect-[4/5] max-h-[560px] w-full rounded-2xl overflow-hidden border border-zinc-300 bg-zinc-950 shadow-md group cursor-pointer flex items-center justify-center p-2 sm:p-3"
              >
                <img
                  src="/assets/hornetsecurity/affiche_helix_sprint.jpg"
                  alt="Affiche officielle de présentation du héros cyber Helix Nova pour Hornetsecurity by Proofpoint"
                  className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
                  <div className="self-end p-2 rounded-full bg-white/90 text-black shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-between text-white text-xs drop-shadow">
                    <span className="font-semibold font-mono">AFFICHE HELIX NOVA</span>
                    <span className="text-white/80 text-[11px]">Cliquer pour agrandir ↗</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#8C857B] text-center">
                Photographie in situ de l'affiche imprimée grand format au siège à Hanovre (cliquer pour agrandir)
              </p>
            </div>

            {/* Colonne droite : Explication éditoriale & lecteur vidéo Helix Nova restauré */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1918]">
                Un univers de personnage distinct de Captain Security
              </h3>

              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Lors d’un <strong className="text-[#1A1918]">sprint créatif de 36 heures au siège d’Hornetsecurity, à Hanovre</strong>, j’ai imaginé et développé en autonomie le concept d’<strong className="text-[#1A1918]">Helix Nova</strong>, un cyber-héros conçu en modélisation 3D. L’exercice réunissait plusieurs propositions créatives au sein de l'équipe design internationale.
              </p>

              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                J’ai conçu son identité visuelle et ses supports de présentation, en articulant un univers graphique autour d’une armure sombre, d’accents jaunes vifs et d’ailes translucides inspirées du frelon. Là où Captain Security prend vie à travers un costume porté lors des salons physiques, Helix Nova explore la facette numérique de l’univers de marque.
              </p>

              {/* LECTEUR VIDÉO OFFICIEL HELIX NOVA RESTAURÉ (YouTube -h8V1xBcDBQ) */}
              <div className="space-y-2 pt-2">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-md">
                  {isPlayingHelixVideo ? (
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/-h8V1xBcDBQ?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                      title="Vidéo officielle de présentation du héros cyber Helix Nova"
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div
                      onClick={() => setIsPlayingHelixVideo(true)}
                      role="button"
                      tabIndex={0}
                      aria-label="Lancer la vidéo de présentation du héros Helix Nova"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setIsPlayingHelixVideo(true);
                        }
                      }}
                      className="relative w-full h-full cursor-pointer group select-none"
                    >
                      <img
                        src="https://img.youtube.com/vi/-h8V1xBcDBQ/hqdefault.jpg"
                        alt="Aperçu vidéo du cyber-héros Helix Nova"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/25" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,173,0,0.5)] transition-transform duration-200 group-hover:scale-110">
                          <Play className="w-6 h-6 fill-current ml-0.5 text-black" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-sm text-[11px] font-mono text-white">
                        Vidéo officielle • Sprint 36 h Hanovre
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-[#8C857B] leading-relaxed">
                  Vidéo officielle de présentation conçue en synergie internationale sous contrainte de temps (36 h). Rôle axé sur la direction narrative et les supports graphiques associés.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          5. ACTE V — DÉCLINAISONS GRAPHIQUES & SUPPORTS DE COMMUNICATION
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10">
        
        {/* En-tête transversal de la section */}
        <div className="space-y-3 border-t border-zinc-200/80 pt-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#FFAD00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span>Acte V · Déploiement Multi-Supports</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A1918]">
            Déclinaisons graphiques &amp; supports de communication
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] max-w-3xl leading-relaxed">
            De la scénographie événementielle aux campagnes d'acquisition digitale, conception et adaptation d'une gamme complète d'actifs marketing déployés à l'international pour soutenir la visibilité de la marque et les conversions commerciales.
          </p>
        </div>

        {/* 1. Bandeau horizontal transversal des supports (6 catégories exactes, défilement continu GPU fluide) */}
        <div className="w-full">
          <SupportsUsagesMarquee />
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/60 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Programme Partenaires B2B · Grille vectorielle
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1918] mt-1">
                Refonte du système officiel de badges partenaires
              </h3>
            </div>
            <span className="text-xs font-mono font-medium text-zinc-500 tracking-tight">
              7 insignes vectoriels officiels
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#52525B] max-w-3xl leading-relaxed">
            Harmonisation de la grille visuelle pour les 7 statuts officiels du programme international Hornetsecurity (Platinum Partner, Gold Partner, Silver Partner, Bronze Partner, Value Added Distributor, Value Added Reseller, OEM Partner). Déclinaisons graphiques rigoureuses conçues pour les portails B2B, les signatures de communication et les supports de communication partenaires.
          </p>

          {/* Bandeau défilant des 7 badges officiels Hornetsecurity — Défilement continu, une seule ligne, images seules sans aucun texte */}
          <BadgesCarousel />

          {/* Carrousel interactif des formats carrousels ratio 4:5 (InCyber 2026 Instagram & SharePoint LinkedIn) */}
          <div className="pt-6 border-t border-zinc-200/60">
            <SocialCarouselSquare />
          </div>

        </div>

      </section>

      {/* ========================================================
          6. ACTE VI — BILAN COLLECTIF & DYNAMISME TERRAIN (+4 000 CONTACTS B2B)
          (Ancre ciblée pour le clic depuis la statistique +4 000)
         ======================================================== */}
      <section id="contacts-b2b" className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24 space-y-10">
        
        <div className="space-y-3 border-t border-zinc-200/80 pt-10">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#FFAD00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span>Acte VI · Retombées &amp; Dynamisme Collectif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1A1918]">
            Dynamisme du stand et résultat commercial collectif
          </h2>
          <p className="text-sm sm:text-base text-[#52525B] max-w-3xl leading-relaxed">
            Selon les données communiquées lors de l'événement, le Forum InCyber a permis d'enregistrer <strong className="text-[#1A1918]">plus de 4 000 contacts B2B collectivement par les équipes commerciales</strong> sur les trois jours. Ce résultat collectif témoigne de la puissance combinée de la scénographie, de l'animation e-karting et de la mobilisation des équipes.
          </p>
        </div>

        {/* Repère chiffré collectif — Centrage harmonieux adaptatif */}
        <div className="py-2">
          <StatGroup
            stats={[
              {
                value: '+4 000',
                label: 'Contacts B2B enregistrés sur le salon',
                description: 'Volume de contacts recueilli collectivement par les équipes commerciales durant les 3 jours du salon',
                attribution: 'Bilan commercial collectif FIC',
                tag: 'RÉSULTAT COLLECTIF SALON',
                size: 'large'
              }
            ]}
            variant="card"
            size="large"
          />
        </div>

        {/* Lecteur vidéo de terrain in-situ */}
        <div className="space-y-3">
          <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
            {isVideoBilanPlaying ? (
              <video
                src="/assets/hornetsecurity/fic/Videos/vid4_fic.mp4"
                controls
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                onClick={() => setIsVideoBilanPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Lancer la vidéo d'ambiance du stand InCyber"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsVideoBilanPlaying(true);
                  }
                }}
                className="relative w-full h-full cursor-pointer group"
              >
                <img
                  src="/assets/hornetsecurity/FIC_photo+videos/Stand/IMG20250401075104.jpg"
                  alt="Aperçu vidéo du stand au Forum InCyber Lille"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/35 transition-opacity group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,173,0,0.4)] transition-transform duration-200 group-hover:scale-110">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-0.5 text-black" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono pointer-events-none">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                    Captation vidéo terrain • Stand et ambiance FIC
                  </span>
                  <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                    Cliquer pour lire
                  </span>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-[#8C857B] text-center">
            Captation vidéo terrain • Stand et animations Forum InCyber Lille Grand Palais
          </p>
        </div>

        {/* Navigation unifiée circulaire entre études de cas */}
        <CaseStudyNavigation currentSlug="hornetsecurity" navigate={navigate} />

      </section>

      {/* ========================================================
          MODALES HAUTE RÉSOLUTION VIA EDITORIAL VIEWER (PORTAL)
         ======================================================== */}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {/* Visionneuse Scénographie FIC 2025/2026 */}
            <EditorialViewer
              isOpen={isFicViewerOpen}
              onClose={() => setIsFicViewerOpen(false)}
              items={ficMediaList.filter((m) => m.type === 'image')}
              currentIndex={0}
              onIndexChange={() => {}}
              projectContext="Forum InCyber · Scénographie Stand > 150 m²"
            />

            {/* Visionneuse Incarnation Captain Security */}
            <EditorialViewer
              isOpen={captainViewerIndex !== null}
              onClose={() => setCaptainViewerIndex(null)}
              items={captainMediaList}
              currentIndex={captainViewerIndex || 0}
              onIndexChange={(idx) => setCaptainViewerIndex(idx)}
              projectContext="Hornetsecurity · Incarnation Terrain Captain Security"
            />

            {/* Visionneuse Affiche Helix Nova */}
            <EditorialViewer
              isOpen={isPosterModalOpen}
              onClose={() => setIsPosterModalOpen(false)}
              items={helixPosterMedia}
              currentIndex={0}
              projectContext="Direction Artistique · Cyber-héros Helix Nova"
            />
          </>,
          document.body
        )}

    </article>
  );
}
