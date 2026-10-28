import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Shield,
  Sprout,
  Building2,
  Play,
  Award,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Video,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Search,
  TrendingUp,
  Layers,
  Users,
  Target,
  HelpCircle,
  FileCheck,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MotionVideoCarousel from '../components/MotionVideoCarousel';

export default function Projects({ navigate }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'hornetsecurity' | 'fresh-data' | 'resin-architecte'
  const [selectedArchFace, setSelectedArchFace] = useState('front'); // 'front' | 'back'
  const [isVideoFicPlaying, setIsVideoFicPlaying] = useState(false);
  const [isPlayingFreshVideo, setIsPlayingFreshVideo] = useState(false);
  const [isPlayingHelixVideo, setIsPlayingHelixVideo] = useState(false);
  const [hornetMediaIndex, setHornetMediaIndex] = useState(0);
  // Liste ordonnée des 6 médias du dispositif scénographique FIC 2026
  const ficMediaList = [
    {
      id: 'stand-view',
      tabLabel: 'Vue du stand',
      title: "Stand d'exposition de plus de 150 m² — Vue in situ à Lille Grand Palais",
      type: 'image',
      src: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      badge: "Photographie in situ • Stand actif"
    },
    {
      id: 'arch-ae',
      tabLabel: 'Arche After Effects',
      title: "Arche vidéo LED — Boucle motion design d'accueil (After Effects)",
      type: 'arch-video',
      badge: "Animation After Effects • 1080p"
    },
    {
      id: 'vid-stand',
      tabLabel: 'Stand & signalétique',
      title: "Stand & Totems — Intégration de la signalétique et des écrans interactifs",
      type: 'video',
      src: '/assets/hornetsecurity/fic/Videos/vid1_fic.mp4',
      badge: "Captation in situ • Signalétique"
    },
    {
      id: 'vid-karting',
      tabLabel: 'Piste e-karting',
      title: "Dispositif e-karting — Animation événementielle et engagement visiteurs",
      type: 'video',
      src: '/assets/hornetsecurity/fic/Videos/vid2_fic.mp4',
      badge: "Expérience événementielle • E-Karting"
    },
    {
      id: 'vid-salon',
      tabLabel: 'Vie du salon',
      title: "Vie du salon & Affluence — Interactions et échanges professionnels",
      type: 'video',
      src: '/assets/hornetsecurity/fic/Videos/vid3_fic.mp4',
      badge: "Ambiance salon • FIC 2026"
    },
    {
      id: 'vid-recap',
      tabLabel: 'Récapitulatif',
      title: "Récapitulatif de l'événement — Synthèse visuelle de l'édition 2026",
      type: 'video',
      src: '/assets/hornetsecurity/fic/Videos/vid4_fic.mp4',
      badge: "Aftermovie • Synthèse 3 jours"
    }
  ];

 // 0 = photo stand, 1 = video arche
  const [isHornetVideoPlaying, setIsHornetVideoPlaying] = useState(false);
  const [selectedRaAsset, setSelectedRaAsset] = useState(0);

  // Modals pour agrandissement haute résolution
  const [badgeModalIndex, setBadgeModalIndex] = useState(null);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [raModalIndex, setRaModalIndex] = useState(null);

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  // Verrouillage du scroll en arrière-plan lorsqu'un modal est ouvert
  useEffect(() => {
    const isAnyModalOpen = isPosterModalOpen || raModalIndex !== null;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [badgeModalIndex, isPosterModalOpen, raModalIndex]);

  // Gestion des raccourcis clavier (Échap et flèches)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPosterModalOpen(false);
        setRaModalIndex(null);
      }

      if (raModalIndex !== null) {
        if (e.key === 'ArrowRight') setRaModalIndex((prev) => (prev + 1) % raAssets.length);
        if (e.key === 'ArrowLeft') setRaModalIndex((prev) => (prev - 1 + raAssets.length) % raAssets.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [raModalIndex]);



  const raAssets = [
    {
      src: "/assets/social-proof-ra/post_terrace_before_after.png",
      title: "Rénovation avant / après — Terrasse de 52 m²",
      caption: "Mise en avant visuelle d'une transformation complète d'une dalle béton en 48h sans démolition."
    },
    {
      src: "/assets/social-proof-ra/post_pool_craft.png",
      title: "Précision artisanale aux abords d’une piscine",
      caption: "Mise en valeur photographique et éditoriale de la précision de pose de résine drainante aux abords d'un bassin résidentiel. La communication documente le geste artisanal, la régularité du talochage et les finitions soignées pour démontrer le savoir-faire technique auprès d'une clientèle exigeante sans recours à des allégations publicitaires agressives."
    },
    {
      src: "/assets/social-proof-ra/post_trowel_craft.png",
      title: "Pédagogie matière — La règle des 8 mm",
      caption: "Explication technique de l'épaisseur requise pour un revêtement en résine drainante pérenne."
    },
    {
      src: "/assets/social-proof-ra/FB_stats.png",
      title: "Statistiques d'audience Meta Business",
      caption: "Capture de preuve : +219 % de portée organique et +209 % d'interactions en 30 jours."
    },
    {
      src: "/assets/social-proof-ra/Insta_1.png",
      title: "Tableau de bord Meta Instagram",
      caption: "Capture de preuve : 648 visites de profil générées sans aucun budget publicitaire (0 €)."
    },
    {
      src: "/assets/social-proof-ra/Comparaison_FB_entreprises_similaires.png",
      title: "Benchmark sectoriel régional",
      caption: "Comparatif des interactions face aux entreprises de revêtements du secteur."
    }
  ];

  return (
    <div className="pt-28 pb-28 space-y-20 sm:space-y-32">

      {/* ========================================================
          EN-TÊTE ÉDITORIAL DE LA SECTION PROJETS
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-[#52525B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span>Réalisations &amp; Études de cas</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#09090B] leading-[1.08]">
              Projets professionnels documentés.
            </h1>
            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
              De la conception de stands d'envergure européenne en cybersécurité (&gt; 150 m² au FIC) au branding d'une levée de fonds participative, découvrez le détail de mes interventions concrètes, mes choix graphiques et les résultats établis.
            </p>
          </div>

          {/* Sélecteur d'ancrage rapide sobre */}
          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-zinc-100">
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-zinc-100 text-[#52525B] hover:text-black hover:bg-zinc-200'
              }`}
            >
              Tous les projets (3)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('hornetsecurity');
                const el = document.getElementById('hornetsecurity');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'hornetsecurity'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-zinc-100 text-[#52525B] hover:text-black hover:bg-zinc-200'
              }`}
            >
              Hornetsecurity (Stands &amp; Marque)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('fresh-data');
                const el = document.getElementById('fresh-data');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'fresh-data'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-zinc-100 text-[#52525B] hover:text-black hover:bg-zinc-200'
              }`}
            >
              Fresh Data (AgTech)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('resin-architecte');
                const el = document.getElementById('resin-architecte');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'resin-architecte'
                  ? 'bg-[#09090B] text-white shadow-sm'
                  : 'bg-zinc-100 text-[#52525B] hover:text-black hover:bg-zinc-200'
              }`}
            >
              Résin'Architecte (BTP)
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          ÉTUDE 1 : HORNETSECURITY (STANDS ÉVÉNEMENTIELS, MARQUE & CAPTAIN SECURITY)
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'hornetsecurity') && (
        <section
          id="hornetsecurity"
          className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24 space-y-12"
        >
          <div className="border-t border-zinc-200/90 pt-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#71717A] bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200/80">
                01 — 03
              </span>
              <span className="text-zinc-300">•</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
                <Shield className="w-3.5 h-3.5" />
                <span>Cybersécurité B2B internationale</span>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B]">
                  FIC 2026 — Scénographie &amp; expérience événementielle
                </h2>
                <p className="text-sm sm:text-base text-[#52525B] mt-2 max-w-3xl leading-relaxed">
                  Trois années d'expérience en environnement international anglophone, réparties sur deux postes distincts : de la marque employeur et du recrutement technique au design graphique d'espaces événementiels et à l'incarnation de la marque sur le terrain.
                </p>
              </div>

              <span className="text-xs font-semibold text-zinc-900 bg-zinc-100 px-3.5 py-1.5 rounded-full border border-zinc-200 w-fit shrink-0">
                Lille • Nuremberg • Londres • Hanovre
              </span>
            </div>

            {/* Repères chiffrés représentatifs & vérifiés (4 colonnes équilibrées) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-3">
              <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/80">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">&gt; 150 m²</span>
                <span className="text-xs text-[#52525B] mt-0.5 block leading-tight">Stand FIC Lille Grand Palais</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/80">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">4 000+</span>
                <span className="text-xs text-[#52525B] mt-0.5 block leading-tight">Contacts B2B recueillis (collectif)</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/80">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">36 h</span>
                <span className="text-xs text-[#52525B] mt-0.5 block leading-tight">Design Sprint de Hanovre (3D)</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200/80">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">B2B</span>
                <span className="text-xs text-[#52525B] mt-0.5 block leading-tight">Campagnes marketing &amp; supports</span>
              </div>
            </div>
          </div>

          {/* Distinction explicite des deux postes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                  Période 1 • Alternance
                </span>
                <span className="text-xs font-semibold text-zinc-700 bg-white px-2.5 py-0.5 rounded border border-zinc-200">
                  Sept 2023 – Août 2025
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#09090B]">
                Chargé de marque employeur (Vade → Hornetsecurity)
              </h3>
              <ul className="text-xs sm:text-sm text-[#52525B] space-y-1.5 leading-relaxed">
                <li>• Campagnes d'attractivité RH pour le recrutement de développeurs et ingénieurs cybersécurité.</li>
                <li>• Structuration du programme d'employee advocacy et accompagnement individuel des collaborateurs sur LinkedIn.</li>
                <li>• Logistique d'événements internes, séminaires et animation de la culture post-acquisition.</li>
              </ul>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00]">
                  Période 2 • CDI
                </span>
                <span className="text-xs font-semibold text-zinc-700 bg-white px-2.5 py-0.5 rounded border border-zinc-200">
                  Sept 2025 – Octobre 2026
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#09090B]">
                Graphic Designer (Hornetsecurity by Proofpoint)
              </h3>
              <ul className="text-xs sm:text-sm text-[#52525B] space-y-1.5 leading-relaxed">
                <li>• Création graphique et habillage de stands pour les salons européens (dont le stand de plus de 150 m² au FIC à Lille, ainsi qu'à it-sa Nuremberg et InfoSec Londres).</li>
                <li>• Coordination graphique avec les prestataires techniques et scénographes internationaux.</li>
                <li>• Supports marketing et publicitaires B2B (Paid Ads comparatives), fiches techniques et visuels pour webinaires.</li>
                <li>• Travail quotidien en anglais au sein d'une équipe de design basée principalement en Allemagne.</li>
              </ul>
            </div>

          </div>

          {/* Dispositif FIC 2026 à Lille Grand Palais — Refonte Scénographie & Médias */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FFAD00] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]" />
                <span>FORUM INCYBER (FIC) • LILLE GRAND PALAIS</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] dark:text-white tracking-tight">
                Scénographie immersive &amp; stand de plus de 150 m²
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] dark:text-zinc-300 max-w-3xl leading-relaxed">
                Habillage graphique du stand, animation motion design sur l’arche d’entrée et dispositifs événementiels pensés pour accompagner le parcours des visiteurs.
              </p>
            </div>
            
            {/* Module Média 6 Onglets : Stand in situ, Arche After Effects & 4 Captations terrain */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/70 border border-zinc-200/90 dark:border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.03)] space-y-6">
              
              {/* En-tête éditorial et barre des 6 onglets */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#09090B] dark:text-white">
                      {ficMediaList[hornetMediaIndex]?.tabLabel || "Média"} • FIC 2026
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-extrabold text-[#09090B] dark:text-white tracking-tight">
                    {ficMediaList[hornetMediaIndex]?.title}
                  </h4>
                </div>

                {/* 6 Onglets de sélection fluide */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-xs font-mono overflow-x-auto max-w-full">
                  {ficMediaList.map((m, idx) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setHornetMediaIndex(idx);
                        setIsHornetVideoPlaying(false);
                      }}
                      className={`px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer font-medium ${
                        hornetMediaIndex === idx
                          ? "bg-white dark:bg-zinc-700 text-[#09090B] dark:text-white font-bold shadow-xs"
                          : "text-zinc-500 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')} · {m.tabLabel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conteneur principal 16:9 du média actif */}
              <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-950 shadow-md">
                <AnimatePresence mode="wait">
                  {hornetMediaIndex === 0 ? (
                    /* ONGLETS 1 : Vue du stand (Photo réelle in situ) */
                    <motion.div
                      key="stand-photo"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full group"
                    >
                      <img
                        src="/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg"
                        alt="Stand événementiel de plus de 150 m² Hornetsecurity au Forum InCyber 2026"
                        className="w-full h-full object-cover object-[center_40%]"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
                        <div className="space-y-0.5 max-w-xl">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFAD00] px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                            Photographie in situ • Stand actif
                          </span>
                          <p className="text-xs sm:text-sm font-semibold pt-1">
                            Lille Grand Palais • Stand de plus de 150 m² accueillant plus de 4 000 contacts B2B
                          </p>
                        </div>
                        <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                          01 / 06
                        </span>
                      </div>
                    </motion.div>
                  ) : hornetMediaIndex === 1 ? (
                    /* ONGLETS 2 : Arche After Effects (Face avant / Face arrière) */
                    <motion.div
                      key="arche-video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex items-center justify-center bg-black"
                    >
                      {isHornetVideoPlaying ? (
                        <video
                          src={
                            selectedArchFace === "front"
                              ? "/assets/hornetsecurity/FIC_assets_2026/Video_arch/FRONT_Global_Arch_1920x1080.mp4"
                              : "/assets/hornetsecurity/FIC_assets_2026/Video_arch/BACK_Global_Arch_1920x1080.mp4"
                          }
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div
                          onClick={() => setIsHornetVideoPlaying(true)}
                          role="button"
                          tabIndex={0}
                          aria-label="Lancer la vidéo de l'arche After Effects"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setIsHornetVideoPlaying(true);
                            }
                          }}
                          className="relative w-full h-full cursor-pointer group flex items-center justify-center select-none"
                        >
                          <img
                            src="/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg"
                            alt="Arche vidéo d'accueil animée"
                            className="w-full h-full object-cover object-center opacity-85 group-hover:scale-102 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors" />

                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,173,0,0.5)] group-hover:scale-110 active:scale-95 transition-all">
                              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-black" />
                            </div>
                            <span className="text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20">
                              Lancer l'animation After Effects (1080p)
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white z-10">
                            <div className="space-y-0.5 max-w-xl">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFAD00] px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                                Animation After Effects • {selectedArchFace === "front" ? "Face avant" : "Face arrière"}
                              </span>
                              <p className="text-xs sm:text-sm font-semibold pt-1">
                                Boucle motion design diffusée sur l'arche d'accueil LED du stand
                              </p>
                            </div>
                            <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-300 bg-black/60 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                              02 / 06
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    /* ONGLETS 3 à 6 : Captations réelles du salon (Stand, Karting, Vie du salon, Récapitulatif) */
                    <motion.div
                      key={ficMediaList[hornetMediaIndex].id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex items-center justify-center bg-black"
                    >
                      <video
                        src={ficMediaList[hornetMediaIndex].src}
                        controls
                        preload="metadata"
                        playsInline
                        className="w-full h-full object-contain"
                      >
                        Votre navigateur ne supporte pas la lecture vidéo.
                      </video>
                      <div className="absolute top-4 left-4 pointer-events-none">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20">
                          {ficMediaList[hornetMediaIndex].badge}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Angle régie pour l'arche After Effects */}
              {hornetMediaIndex === 1 && (
                <div className="flex items-center justify-between gap-4 pt-1 border-t border-zinc-100 dark:border-white/10">
                  <span className="text-xs text-zinc-500 font-mono">Angle de diffusion :</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedArchFace("front");
                        setIsHornetVideoPlaying(false);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedArchFace === "front"
                          ? "bg-[#09090B] dark:bg-white text-white dark:text-black shadow-xs"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
                      }`}
                    >
                      Face avant
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedArchFace("back");
                        setIsHornetVideoPlaying(false);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedArchFace === "back"
                          ? "bg-[#09090B] dark:bg-white text-white dark:text-black shadow-xs"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200"
                      }`}
                    >
                      Face arrière
                    </button>
                  </div>
                </div>
              )}

              {/* Fiche explicative en 3 colonnes : Motion Design, Habillage graphique, Présence terrain */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3 border-t border-zinc-200/60 dark:border-white/10">
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                    <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                      Motion design
                    </h5>
                  </div>
                  <p className="text-xs text-[#52525B] dark:text-zinc-300 leading-relaxed">
                    Animation réalisée sur Adobe After Effects et diffusée sur l’arche LED à l’entrée du salon. Une boucle de motion design accompagnait la transition de marque « HORNETSECURITY FORMERLY Vade ».
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                    <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                      Habillage graphique
                    </h5>
                  </div>
                  <p className="text-xs text-[#52525B] dark:text-zinc-300 leading-relaxed">
                    Habillage graphique et signalétique du stand de plus de 150 m² pour le FIC 2026. En lien avec les équipes de design, j’ai contribué à l’identité visuelle de l’espace et à l’organisation des parcours visiteurs.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                    <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                      Présence sur le terrain
                    </h5>
                  </div>
                  <p className="text-xs text-[#52525B] dark:text-zinc-300 leading-relaxed">
                    Présence sur les trois jours du salon, au contact des visiteurs et autour des dispositifs événementiels, notamment Captain Security et la piste de e-karting (+4 000 contacts qualifiés enregistrés collectivement).
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
                <h4 className="text-xs font-semibold text-[#09090B]">
                  Affichage urbain extérieur — Zénith de Lille (Édition FIC 2025)
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
                <h4 className="text-xs font-semibold text-[#09090B]">
                  Signalétique directionnelle &amp; Couloir e-karting
                </h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Scénographie du couloir de transit aux couleurs de la marque avec damier rouge et noir orientant les flux de visiteurs vers l'animation.
                </p>
              </div>
            </div>
          </div>

          {/* L'incarnation de marque : Captain Security */}
          <div className="p-6 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Présence terrain &amp; Incarnation
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B]">
                Captain Security : Donner vie à l'univers de marque face aux visiteurs
              </h3>
              <p className="text-sm text-[#52525B] max-w-3xl leading-relaxed">
                Lors de plusieurs salons majeurs (notamment le FIC à Lille et it-sa à Nuremberg), j'ai incarné le héros de la marque, Captain Security. Cette expérience singulière montre que ma relation au design ne s'arrête pas aux fichiers numériques : elle prend corps sur le terrain, créant une accroche humaine forte avec les visiteurs et partenaires.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              
              <div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm flex items-center justify-center">
                  <img
                    src="/assets/hornetsecurity/fic/Capain/captain2.jpg"
                    alt="Rémi Brocart en Captain Security sur la scène plénière avec les mascottes partenaires au Forum InCyber"
                    className="w-full h-full object-cover object-[center_35%]"
                    loading="lazy"
                  />
                </div>
              </div>

              <div>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm flex items-center justify-center">
                  <img
                    src="/assets/hornetsecurity/fic/Capain/captain.jpeg"
                    alt="Rémi Brocart en costume de Captain Security sur la passerelle d'accès"
                    className="w-full h-full object-cover object-[center_25%]"
                    loading="lazy"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Séquence dédiée : Affiche et univers de marque Helix Nova (Sprint de Hanovre) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/60 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Sprint de Hanovre • Univers de héros cyber
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] mt-1">
                  Affiche de présentation du héros Helix Nova
                </h3>
              </div>
              <span className="text-xs font-semibold text-zinc-700 bg-white px-3 py-1 rounded-full border border-zinc-200 w-fit shrink-0">
                Sprint de 36 h • Hanovre, Allemagne
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
                    className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
                    <div className="self-end p-2 rounded-full bg-white/90 text-black shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between text-white text-xs drop-shadow">
                      <span className="font-semibold font-mono">HELIX NOVA</span>
                      <span className="text-white/80 text-[11px]">Cliquer pour agrandir</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#71717A] text-center">
                  Photographie in situ de l'affiche imprimée grand format (cliquer pour agrandir)
                </p>
              </div>

              {/* Colonne droite : Explication éditoriale & distinction stricte */}
              <div className="lg:col-span-6 space-y-4">
                <h4 className="text-base sm:text-lg font-bold text-[#09090B]">
                  Un univers de personnage distinct de Captain Security
                </h4>

                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  Lors d’un <strong className="text-[#09090B]">sprint créatif de 36 heures au siège d’Hornetsecurity, à Hanovre</strong>, j’ai imaginé et développé seul le concept d’<strong className="text-[#09090B]">Helix Nova</strong>, un cyber-héros conçu en 3D. L’exercice réunissait plusieurs participants en compétition autour de propositions créatives.
                </p>

                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  J’ai conçu son identité visuelle et ses supports de présentation, en imaginant un univers graphique articulé autour d’une armure sombre, d’accents jaunes et d’ailes translucides inspirées du frelon. Là où Captain Security prend vie à travers un costume porté lors des salons professionnels, Helix Nova explore une autre facette de l’univers de marque, pensée pour un environnement numérique.
                </p>

                {/* Lecteur vidéo officiel Helix Nova (16:9 à la demande) */}
                <div className="space-y-2 pt-1">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
                    {isPlayingHelixVideo ? (
                      <iframe
                        src="https://www.youtube-nocookie.com/embed/-h8V1xBcDBQ?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                        title="Vidéo de présentation du héros cyber Helix Nova"
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
                        className="relative w-full h-full cursor-pointer group"
                      >
                        <img
                          src="https://img.youtube.com/vi/-h8V1xBcDBQ/hqdefault.jpg"
                          alt="Aperçu vidéo du cyber-héros Helix Nova"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/25" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,173,0,0.4)] transition-transform duration-200 group-hover:scale-110">
                            <Play className="w-6 h-6 fill-current ml-0.5 text-black" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-mono text-white">
                          Vidéo de présentation • Sprint 36 h Hanovre
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-[#71717A] leading-relaxed">
                    Vidéo officielle de présentation conçue en synergie internationale sous contrainte de temps (36 h). Rôle axé sur la direction narrative et les supports graphiques associés.
                  </p>
                </div>
              </div>

            </div>
          </div>

          

          {/* Section Motion Design & Vidéo : Carrousel interactif complet */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/60 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  Motion Design &amp; Production Vidéo
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] mt-0.5">
                  Arches lumineuses LED, scénographie &amp; captations de terrain
                </h3>
              </div>
              <span className="text-xs font-semibold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
                5 réalisations vidéo à la demande
              </span>
            </div>

            <MotionVideoCarousel />
          </div>

        </section>
      )}

      {/* Séparateur architectural entre Projets 01 & 02 avec design glassmorphism */}
      {activeTab === 'all' && (
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-12">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/15" />
            </div>
            <a
              href="#fresh-data"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('fresh-data');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative select-none backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 hover:bg-white dark:hover:bg-zinc-800/90 px-5 sm:px-7 py-2.5 rounded-full border border-zinc-200/90 dark:border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] hover:border-[#FFAD00]/50 transition-all duration-300 flex items-center gap-3 text-xs font-mono cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)] group-hover:scale-125 transition-transform" />
              <span className="font-bold text-[#09090B] dark:text-white tracking-wide">Projet suivant</span>
              <span className="text-zinc-400">·</span>
              <span className="text-[#71717A] dark:text-zinc-400">02 — 03</span>
              <span className="text-zinc-400 group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>
        </div>
      )}

      {/* ========================================================
          ÉTUDE 2 : FRESH DATA (AGTECH & FINANCEMENT ULULE)
          Cas d'école complet et documenté en 10 dimensions vérifiées
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'fresh-data') && (
        <section
          id="fresh-data"
          className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24 space-y-10"
        >
          <div className="border-t border-zinc-200/90 pt-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#71717A] bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200/80">
                02 — 03
              </span>
              <span className="text-zinc-300">•</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
                <Sprout className="w-3.5 h-3.5" />
                <span>AgTech &amp; R&amp;D Agricole • Graphisme Freelance</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B]">
                  Fresh Data — Système visuel, campagne Ulule (116 %) &amp; salon international MEDFEL
                </h2>
                <p className="text-sm sm:text-base text-[#52525B] mt-2 max-w-3xl leading-relaxed">
                  Intervention globale en tant que graphiste freelance pour bâtir l'univers de marque, vulgariser une technologie spectrale complexe et orchestrer le lancement public d'une solution de qualification des fruits et légumes, pour documenter et propulser la solution auprès des décideurs de la filière.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-zinc-900 bg-zinc-100 px-3.5 py-1.5 rounded-full border border-zinc-200">
                  Ulule atteint à 116 %
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                  Pilotes Auchan, Grand Frais, E.Leclerc
                </span>
              </div>
            </div>
          </div>

          {/* Grille des 4 dimensions fondamentales du projet */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#FFAD00]" />
                1. Contexte &amp; objectif
              </span>
              <p className="text-xs text-[#52525B] leading-relaxed">
                <strong className="text-[#09090B]">Qualification non destructive :</strong> Évaluer instantanément le taux de sucre et la maturité des fruits sans altérer la récolte, pour réduire le gaspillage alimentaire en rayon et optimiser les flux logistiques.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#FFAD00]" />
                2. Publics concernés
              </span>
              <p className="text-xs text-[#52525B] leading-relaxed">
                <strong className="text-[#09090B]">B2B &amp; Partenaires :</strong> Arboriculteurs, coopératives agricoles, centrales d'achat de la grande distribution et investisseurs de la filière AgriTech française et européenne.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#FFAD00]" />
                3. Direction artistique
              </span>
              <p className="text-xs text-[#52525B] leading-relaxed">
                <strong className="text-[#09090B]">Rigueur fonctionnelle :</strong> Typographie épurée sans empattement, grilles strictes, clarté didactique des schémas techniques et équilibre entre fraîcheur végétale et précision scientifique.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#FFAD00]" />
                4. Contribution de Rémi
              </span>
              <p className="text-xs text-[#52525B] leading-relaxed">
                <strong className="text-[#09090B]">Graphisme &amp; Contenus 360° :</strong> Bannières Ulule, fiches explicatives, habillages radio, captation terrain et montage des interviews au salon MEDFEL.
              </p>
            </div>

          </div>

          {/* Lecteur vidéo salon MEDFEL avec miniature réelle & contexte éditorial */}
          <div className="space-y-3">
            <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200 bg-neutral-950 shadow-sm">
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
                  aria-label="Lancer la vidéo interview au salon MEDFEL"
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,173,0,0.45)] transition-transform duration-200 group-hover:scale-110">
                      <Play className="w-7 h-7 fill-current ml-0.5 text-black" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#71717A] px-1 gap-1">
              <span>Captation vidéo et interview réalisée sur le stand du salon international MEDFEL à Perpignan (Click-to-play)</span>
              <span className="font-mono text-[11px]">Durée · 100 % captation &amp; montage autonome</span>
            </div>
          </div>

          {/* Livrables détaillés & Retombées documentées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#09090B]">
                  1. Campagne participative Ulule
                </h3>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  116 % atteint
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Conception de l'architecture graphique complète de la campagne de financement participatif : bannières narratives, infographies pédagogiques vulgarisant la spectroscopie et visuels des contreparties, permettant de dépasser l'objectif initial avec plus de 12 700 € réunis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#09090B]">
                  2. Kit Médias, Presse &amp; Radio
                </h3>
                <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-200/80 px-2 py-0.5 rounded">
                  Multi-supports
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Création des déclinaisons visuelles institutionnelles pour accompagner les passages en studios de radio, les interviews presse et les plaquettes techniques remises en main propre aux partenaires et décideurs de la filière.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#09090B]">
                  3. Débouchés Grande Distribution
                </h3>
                <span className="text-[11px] font-mono font-bold text-[#09090B] bg-[#FFAD00]/20 px-2 py-0.5 rounded">
                  Contacts qualifiés
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                La rigueur des livrables graphiques et la clarté de la démonstration ont directement soutenu l'ouverture d'échanges qualifiés avec les centrales d'achats d'<strong className="text-[#09090B]">Auchan, Grand Frais et E.Leclerc</strong> pour envisager des déploiements pilotes en rayon.
              </p>
            </div>

          </div>
        </section>
      )}

      {/* Séparateur architectural entre Projets 02 & 03 avec design glassmorphism */}
      {activeTab === 'all' && (
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-8 sm:py-12">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/15" />
            </div>
            <a
              href="#resin-architecte"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('resin-architecte');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative select-none backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 hover:bg-white dark:hover:bg-zinc-800/90 px-5 sm:px-7 py-2.5 rounded-full border border-zinc-200/90 dark:border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] hover:border-[#FFAD00]/50 transition-all duration-300 flex items-center gap-3 text-xs font-mono cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)] group-hover:scale-125 transition-transform" />
              <span className="font-bold text-[#09090B] dark:text-white tracking-wide">Projet suivant</span>
              <span className="text-zinc-400">·</span>
              <span className="text-[#71717A] dark:text-zinc-400">03 — 03</span>
              <span className="text-zinc-400 group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>
        </div>
      )}

      {/* ========================================================
          ÉTUDE 3 : RÉSIN'ARCHITECTE (BTP HAUT DE GAMME)
          Cadrage de projet, gestion, roadmap 12 mois (SEO/GEO) & Preuves réelles 30 jours
         ======================================================== */}
      {(activeTab === 'all' || activeTab === 'resin-architecte') && (
        <section
          id="resin-architecte"
          className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 scroll-mt-24 space-y-10"
        >
          <div className="border-t border-zinc-200/90 pt-10 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold tracking-widest text-[#71717A] bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200/80">
                03 — 03
              </span>
              <span className="text-zinc-300">•</span>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFAD00]">
                <Building2 className="w-3.5 h-3.5" />
                <span>BTP Haut de gamme • Cadrage, Contenus &amp; Stratégie</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B]">
                  Résin'Architecte — Captation de chantier, formalisation d'identité &amp; supports commerciaux
                </h2>
                <p className="text-sm sm:text-base text-[#52525B] mt-2 max-w-3xl leading-relaxed">
                  Intervention concrète pour un artisan applicateur de moquette de pierre : captation vidéo directement sur les chantiers, formalisation de l'identité visuelle existante, création de modèles graphiques réutilisables pour les réseaux sociaux, visuels avant/après authentiques et fiches techniques d'aide à la vente.
                </p>
              </div>

              <span className="text-xs font-semibold text-zinc-900 bg-zinc-100 px-3.5 py-1.5 rounded-full border border-zinc-200 w-fit shrink-0">
                Terrain, Captation &amp; Graphisme
              </span>
            </div>
          </div>

          {/* Bloc 1 : Cadrage concret des interventions */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#09090B] flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#FFAD00]" />
              Intervention concrète &amp; Rôle terrain
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1 text-xs sm:text-sm text-[#52525B]">
              <div className="space-y-1.5">
                <span className="font-bold text-[#09090B] block">• Captation vidéo sur chantier</span>
                <p className="leading-relaxed">
                  Présence directe sur les chantiers pour filmer les étapes réelles d'application à la taloche, les finitions de seuils et les transformations de dalles béton dégradées.
                </p>
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-[#09090B] block">• Formalisation d'identité &amp; Modèles</span>
                <p className="leading-relaxed">
                  Stabilisation de l'identité existante : création de gabarits éditoriaux réutilisables pour les réseaux sociaux et harmonisation des typographies et teintes minérales.
                </p>
              </div>
              <div className="space-y-1.5">
                <span className="font-bold text-[#09090B] block">• Supports commerciaux &amp; Pédagogie</span>
                <p className="leading-relaxed">
                  Fiches techniques d'aide à la vente, pédagogie de la règle des 8 mm drainants et comparatifs avant/après de chantiers réels pour rassurer les clients particuliers.
                </p>
              </div>
            </div>
          </div>

          {/* Bloc 2 : Les 4 métriques réelles à 30 jours (strictement isolées) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#09090B] flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#FFAD00]" />
                Résultats réels constatés en 30 jours (Mesures Meta Business)
              </span>
              <span className="text-xs text-[#71717A]">
                Période de test initial • 100 % organique sans achat d'espace
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm">
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090B] font-mono tracking-tight block">
                  +219 %
                </span>
                <span className="text-xs text-[#52525B] font-medium block">
                  Portée organique en 30 jours
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090B] font-mono tracking-tight block">
                  648
                </span>
                <span className="text-xs text-[#52525B] font-medium block">
                  Visites de profil générées
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090B] font-mono tracking-tight block">
                  +209 %
                </span>
                <span className="text-xs text-[#52525B] font-medium block">
                  D'interactions globales
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#09090B] font-mono tracking-tight block">
                  0 €
                </span>
                <span className="text-xs text-[#52525B] font-medium block">
                  Publicité payante (100 % organique)
                </span>
              </div>
            </div>
          </div>

          {/* Bloc 3 : Présentation épurée des réalisations : « Sur le terrain » */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-200/60 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Réalisations concrètes
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] mt-0.5">
                  Sur le terrain
                </h3>
              </div>
              <span className="text-xs text-[#71717A]">
                Chantiers résidentiels, gestes de pose et transformation des sols
              </span>
            </div>

            {/* Grille harmonieuse des 3 réalisations majeures */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Projet 1 : Rénovation terrasse */}
              <div
                onClick={() => setRaModalIndex(0)}
                role="button"
                tabIndex={0}
                aria-label="Agrandir la rénovation de terrasse"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setRaModalIndex(0);
                  }
                }}
                className="group cursor-pointer space-y-3"
              >
                <div className="aspect-[16/11] rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-50 p-2 relative shadow-sm group-hover:border-zinc-300 transition-all flex items-center justify-center">
                  <img
                    src={raAssets[0].src}
                    alt={raAssets[0].title}
                    className="max-h-full w-auto max-w-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="space-y-1 px-1">
                  <h4 className="text-sm font-bold text-[#09090B] group-hover:text-zinc-700 transition-colors">
                    Rénovation avant / après — Terrasse de 52 m²
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    Transformation d'une dalle béton dégradée en résine drainante en 48h sans démolition.
                  </p>
                </div>
              </div>

              {/* Projet 2 : Abords de piscine */}
              <div
                onClick={() => setRaModalIndex(1)}
                role="button"
                tabIndex={0}
                aria-label="Agrandir les abords de piscine"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setRaModalIndex(1);
                  }
                }}
                className="group cursor-pointer space-y-3"
              >
                <div className="aspect-[16/11] rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-50 p-2 relative shadow-sm group-hover:border-zinc-300 transition-all flex items-center justify-center">
                  <img
                    src={raAssets[1].src}
                    alt={raAssets[1].title}
                    className="max-h-full w-auto max-w-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="space-y-1 px-1">
                  <h4 className="text-sm font-bold text-[#09090B] group-hover:text-zinc-700 transition-colors">
                    Précision artisanale aux abords d'une piscine
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    Continuité minérale, finition sans raccord et confort thermique au sol sur chantier résidentiel.
                  </p>
                </div>
              </div>

              {/* Projet 3 : Geste artisanal 8 mm */}
              <div
                onClick={() => setRaModalIndex(2)}
                role="button"
                tabIndex={0}
                aria-label="Agrandir le geste artisanal"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setRaModalIndex(2);
                  }
                }}
                className="group cursor-pointer space-y-3"
              >
                <div className="aspect-[16/11] rounded-2xl overflow-hidden border border-zinc-200/90 bg-zinc-50 p-2 relative shadow-sm group-hover:border-zinc-300 transition-all flex items-center justify-center">
                  <img
                    src={raAssets[2].src}
                    alt={raAssets[2].title}
                    className="max-h-full w-auto max-w-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="space-y-1 px-1">
                  <h4 className="text-sm font-bold text-[#09090B] group-hover:text-zinc-700 transition-colors">
                    Pédagogie matière — La règle des 8 mm
                  </h4>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    Application manuelle à la taloche garantissant la perméabilité et la tenue dans le temps.
                  </p>
                </div>
              </div>

            </div>

            {/* Accès discret aux métriques de diffusion Meta (sans polluer la galerie de chantiers) */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#71717A] bg-zinc-50 p-4 rounded-2xl border border-zinc-200/70">
              <span className="font-medium">
                Photographies de chantiers réels (cliquez sur une réalisation pour l'examiner en haute définition).
              </span>
              <button
                type="button"
                onClick={() => setRaModalIndex(3)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#09090B] hover:text-[#FFAD00] transition-colors cursor-pointer"
              >
                <span>Consulter les tableaux de bord Meta Business</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </button>
            </div>
          </div>

          {/* Bloc 4 : Perspectives de développement — Design Glassmorphism Éditorial */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.03)] space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-zinc-200/60 dark:border-white/10 pb-5">
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-[#FFAD00] flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Feuille de route &amp; Horizons de développement</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] dark:text-white mt-1 tracking-tight">
                  Perspectives de développement
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100/90 dark:bg-white/10 border border-zinc-200/80 dark:border-white/10 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <span>Synthèse en 3 phases</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#52525B] dark:text-zinc-300 leading-relaxed max-w-4xl">
              Pour pérenniser la traction des premiers chantiers sans dépendre d'achats publicitaires continus, la réflexion stratégique pose trois priorités claires, conçues en synergie avec l'architecture technique d'AntheDesign.
            </p>

            {/* Perspectives de développement — Design Éditorial Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              
              {/* Horizon 1 : Réalisé */}
              <div className="group p-7 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/90 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-xl space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white tracking-wider">
                      HORIZON 01
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-white/15 bg-zinc-100/90 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#09090B] dark:bg-white" />
                      RÉALISÉ (30 JOURS)
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    01 · Socle &amp; Contenus de terrain
                  </h4>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span>Stabilisation de la charte graphique et des modèles visuels avant/après.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span>Conception des fiches didactiques d'aide à la vente (règle des 8 mm).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span>Cadrage du circuit de captation sur chantiers et sessions Qualiopi.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span>Traction initiale mesurée en 30 jours (+219 % de portée, 648 visites de profil).</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Phase : Fondations</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold font-mono">100 % opérationnel</span>
                </div>
              </div>

              {/* Horizon 2 : Priorités suivantes */}
              <div className="group p-7 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/90 dark:border-white/10 hover:border-[#FFAD00]/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-xl space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white tracking-wider">
                      HORIZON 02
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-white/15 bg-zinc-100/90 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full border border-zinc-600 dark:border-zinc-400" />
                      PRIORITÉS SUIVANTES
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    02 · Consolidation &amp; Double flux
                  </h4>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span><strong className="text-zinc-900 dark:text-white">Scission B2C / B2B :</strong> Séparer les flux pour les particuliers (devis terrasse/piscine) et les professionnels (formation Qualiopi).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span><strong className="text-zinc-900 dark:text-white">Avis Google Reviews :</strong> Concentration des avis clients sur Google pour distancer les concurrents locaux.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span><strong className="text-zinc-900 dark:text-white">Alimentation SEO :</strong> Transmission mensuelle de cas concrets à AntheDesign pour nourrir le cocon sémantique.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Phase : Développement</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold font-mono">Plan d'action cadré</span>
                </div>
              </div>

              {/* Horizon 3 : Vision à moyen terme */}
              <div className="group p-7 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/90 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-xl space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white tracking-wider">
                      HORIZON 03
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200/80 dark:border-white/15 bg-zinc-100/90 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-mono font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                      VISION À MOYEN TERME
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    03 · Autorité technique &amp; Visibilité IA
                  </h4>
                  <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-2.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span><strong className="text-zinc-900 dark:text-white">Essais documentés (RA LAB) :</strong> Bancs d'essais (résistance UV, perméabilité) créant des sources citables durables.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span><strong className="text-zinc-900 dark:text-white">GEO (Moteurs IA) :</strong> Structuration des données pour être naturellement cité par les assistants conversationnels.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#FFAD00] shrink-0 font-bold">—</span>
                      <span><strong className="text-zinc-900 dark:text-white">Réseau ambassadeur :</strong> Mobilisation des applicateurs formés pour démultiplier les réalisations locales.</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Phase : Pérennisation</span>
                  <span className="text-zinc-800 dark:text-zinc-200 font-semibold font-mono">Vision stratégique</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation vers Parcours */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 pt-8 flex items-center justify-between border-t border-zinc-100">
        <a
          href="/"
          onClick={handleNav('/')}
          className="text-xs font-semibold text-[#52525B] hover:text-black"
        >
          ← Retour à l'accueil
        </a>

        <a
          href="/parcours"
          onClick={handleNav('/parcours')}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
        >
          <span>Découvrir le parcours &amp; profil</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
        </a>
      </div>

      {/* ========================================================
          MODALES PORTALISÉES SUR DOCUMENT.BODY (ZÉRO FUITE EN HAUT)
         ======================================================== */}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            

            {/* MODAL 2 : ZOOM HAUTE RÉSOLUTION DE L'AFFICHE HELIX NOVA */}
            <AnimatePresence>
              {isPosterModalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-0 z-[9999] w-screen h-screen bg-black/98 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none"
                  onClick={() => setIsPosterModalOpen(false)}
                >
                  {/* Barre haute */}
                  <div
                    className="flex items-center justify-between text-white text-xs w-full max-w-6xl mx-auto z-40 py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-zinc-300 text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">
                        Affiche officielle
                      </span>
                      <span className="text-zinc-300 font-medium">Helix Nova · Sprint de Hanovre (36 h)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPosterModalOpen(false)}
                      className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                      aria-label="Fermer la prévisualisation"
                    >
                      <X className="w-4 h-4" />
                      <span>Fermer</span>
                    </button>
                  </div>

                  {/* Zone centrale : Image pleine hauteur non coupée */}
                  <div
                    className="relative flex-1 flex items-center justify-center my-auto w-full px-4 sm:px-12 select-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src="/assets/hornetsecurity/affiche_helix_sprint.jpg"
                      alt="Affiche de présentation officielle du héros cyber Helix Nova"
                      className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-white/10"
                    />
                  </div>

                  {/* Barre basse */}
                  <div className="text-center text-zinc-300 text-xs py-2" onClick={(e) => e.stopPropagation()}>
                    <p className="font-semibold text-white">HELIX NOVA — Hornetsecurity by Proofpoint</p>
                    <p className="text-zinc-400 text-[11px] font-mono mt-0.5">Photographie in situ · Format d'origine respecté</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MODAL 3 : LIGHTBOX ÉDITORIALE CLAIRE — RÉSIN'ARCHITECTE */}
            <AnimatePresence>
              {raModalIndex !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Visionneuse de réalisation Résin'Architecte"
                  className="fixed inset-0 z-[9999] w-screen h-screen bg-black/45 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 select-none"
                  onClick={() => setRaModalIndex(null)}
                >
                  {/* Carte principale claire et éditoriale (Glass Design ROOM241) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-4xl sm:max-w-5xl bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_24px_80px_rgba(24,24,27,0.12)] border border-zinc-200/90 dark:border-white/15 flex flex-col max-h-[92vh] overflow-y-auto space-y-4"
                  >
                    {/* En-tête intégré sobre : pagination dynamique, indication Échap et fermeture */}
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/10 select-none">
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]" />
                        <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white tracking-wider">
                          {String(raModalIndex + 1).padStart(2, '0')} sur {String(raAssets.length).padStart(2, '0')}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-600">·</span>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                          Résin’Architecte · Réalisation &amp; Analyse
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="hidden md:inline-block text-[11px] text-zinc-400 font-mono">
                          Échap pour fermer
                        </span>
                        <button
                          type="button"
                          onClick={() => setRaModalIndex(null)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                          aria-label="Fermer la vue agrandie"
                        >
                          <X className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                          <span>Fermer</span>
                        </button>
                      </div>
                    </div>

                    {/* Cadre média équilibré avec boutons de navigation discrets */}
                    <div className="relative w-full flex items-center justify-center min-h-[260px] sm:min-h-[380px] max-h-[56vh] bg-zinc-50/70 dark:bg-zinc-900/40 rounded-2xl p-2 sm:p-4 overflow-hidden border border-zinc-100 dark:border-white/5">
                      {/* Bouton Précédent discret */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRaModalIndex((prev) => (prev - 1 + raAssets.length) % raAssets.length);
                        }}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 border border-zinc-200/90 dark:border-white/10 shadow-md backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                        aria-label="Capture précédente"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Bouton Suivant discret */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRaModalIndex((prev) => (prev + 1) % raAssets.length);
                        }}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 dark:bg-zinc-800/90 hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 border border-zinc-200/90 dark:border-white/10 shadow-md backdrop-blur-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
                        aria-label="Capture suivante"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Image responsive plein format, respectant les dimensions et le ratio naturel */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={raModalIndex}
                          src={raAssets[raModalIndex].src}
                          alt={raAssets[raModalIndex].title}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="max-h-[52vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-xs"
                        />
                      </AnimatePresence>
                    </div>

                    {/* Légende éditoriale intégrée dans le flux de la carte (zéro bandeau noir, lisibilité intégrale) */}
                    <div className="space-y-1.5 pt-1">
                      <h3 className="font-extrabold text-base sm:text-lg text-[#09090B] dark:text-white tracking-tight">
                        {raAssets[raModalIndex].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#52525B] dark:text-zinc-300 leading-relaxed max-w-3xl">
                        {raAssets[raModalIndex].caption}
                      </p>
                    </div>

                    {/* Rangée de miniatures discrètes */}
                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-white/10 overflow-x-auto pb-1 max-w-full">
                      {raAssets.map((asset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRaModalIndex(idx)}
                          className={`h-9 w-14 sm:h-11 sm:w-16 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                            idx === raModalIndex
                              ? 'border-[#FFAD00] ring-2 ring-[#FFAD00]/40 scale-105 shadow-xs opacity-100'
                              : 'border-zinc-200/80 dark:border-white/10 opacity-60 hover:opacity-100 hover:border-zinc-300'
                          }`}
                          aria-label={`Afficher ${asset.title}`}
                        >
                          <img src={asset.src} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}

    </div>
  );
}
