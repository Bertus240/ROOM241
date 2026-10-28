import React, { useState, useEffect } from 'react';
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
import BadgesCarousel from '../components/BadgesCarousel';
import MotionVideoCarousel from '../components/MotionVideoCarousel';

export default function Projects({ navigate }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'hornetsecurity' | 'fresh-data' | 'resin-architecte'
  const [selectedArchFace, setSelectedArchFace] = useState('front'); // 'front' | 'back'
  const [isVideoFicPlaying, setIsVideoFicPlaying] = useState(false);
  const [isPlayingFreshVideo, setIsPlayingFreshVideo] = useState(false);
  const [isPlayingHelixVideo, setIsPlayingHelixVideo] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState('Platinum');
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
    const isAnyModalOpen = badgeModalIndex !== null || isPosterModalOpen || raModalIndex !== null;
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
        setBadgeModalIndex(null);
        setIsPosterModalOpen(false);
        setRaModalIndex(null);
      }
      if (badgeModalIndex !== null) {
        if (e.key === 'ArrowRight') setBadgeModalIndex((prev) => (prev + 1) % partnerBadges.length);
        if (e.key === 'ArrowLeft') setBadgeModalIndex((prev) => (prev - 1 + partnerBadges.length) % partnerBadges.length);
      }
      if (raModalIndex !== null) {
        if (e.key === 'ArrowRight') setRaModalIndex((prev) => (prev + 1) % raAssets.length);
        if (e.key === 'ArrowLeft') setRaModalIndex((prev) => (prev - 1 + raAssets.length) % raAssets.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [badgeModalIndex, raModalIndex]);

  const partnerBadges = [
    {
      name: 'Platinum',
      file: 'Platinum_partner.png',
      label: 'Platinum Partner',
      level: 'Niveau 1 · Partenariat stratégique européen',
      description: 'Plus haut niveau d\'accréditation B2B. Réservé aux intégrateurs certifiés générant des volumes majeurs de solutions de cybersécurité Cloud.'
    },
    {
      name: 'Gold',
      file: 'Gold_partner.png',
      label: 'Gold Partner',
      level: 'Niveau 2 · Partenaire certifié avancé',
      description: 'Accréditation accordée aux partenaires disposant d\'ingénieurs formés et assurant un déploiement continu des briques 365 Total Protection.'
    },
    {
      name: 'Silver',
      file: 'Silver_partner.png',
      label: 'Silver Partner',
      level: 'Niveau 3 · Partenaire certifié',
      description: 'Niveau intermédiaire validant une expertise commerciale régulière sur la protection des messageries d\'entreprises.'
    },
    {
      name: 'Bronze',
      file: 'Bronze_partner.png',
      label: 'Bronze Partner',
      level: 'Niveau 4 · Entrée réseau agréé',
      description: 'Insigne d\'accueil officialisant l\'adhésion au programme partenaire Hornetsecurity pour les revendeurs informatiques.'
    },
    {
      name: 'OEM',
      file: 'OEM_partner.png',
      label: 'OEM Partner',
      level: 'Partenaire constructeur / OEM',
      description: 'Programme spécifique d\'intégration directe des technologies de filtrage et de chiffrement dans des solutions tierces.'
    },
    {
      name: 'VAR',
      file: 'Value_Added_Reseller.png',
      label: 'Value Added Reseller',
      level: 'Revendeur à valeur ajoutée',
      description: 'Certification des distributeurs apportant conseil, installation clé en main et support de proximité aux entreprises clientes.'
    },
    {
      name: 'VAD',
      file: 'Value_Added_Distributor.png',
      label: 'Value Added Distributor',
      level: 'Distributeur officiel à valeur ajoutée',
      description: 'Insigne d\'autorité pour les grossistes et centrales d\'achats IT approvisionnant les réseaux de revendeurs européens.'
    },
  ];

  const raAssets = [
    {
      src: "/assets/social-proof-ra/post_terrace_before_after.png",
      title: "Rénovation avant / après — Terrasse de 52 m²",
      caption: "Mise en avant visuelle d'une transformation complète d'une dalle béton en 48h sans démolition."
    },
    {
      src: "/assets/social-proof-ra/post_pool_craft.png",
      title: "Précision artisanale aux abords d'une piscine",
      caption: "Valorisation du savoir-faire technique et de la précision de pose sur chantier résidentiel."
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
                  Hornetsecurity — Stands événementiels (&gt; 150 m² au FIC), branding &amp; incarnation de marque
                </h2>
                <p className="text-sm sm:text-base text-[#52525B] mt-2 max-w-3xl leading-relaxed">
                  Trois années d'expérience en environnement international anglophone, réparties sur deux postes distincts : de la marque employeur et du recrutement technique au design graphique d'espaces événementiels et à l'incarnation de la marque sur le terrain.
                </p>
              </div>

              <span className="text-xs font-semibold text-zinc-900 bg-zinc-100 px-3.5 py-1.5 rounded-full border border-zinc-200 w-fit shrink-0">
                Lille • Nuremberg • Londres • Hanovre
              </span>
            </div>

            {/* Repères chiffrés représentatifs & vérifiés */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3">
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">&gt; 150 m²</span>
                <span className="text-[11px] text-[#52525B] mt-0.5 block leading-tight">Pavillon FIC Lille Grand Palais</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">&gt; 4 000</span>
                <span className="text-[11px] text-[#52525B] mt-0.5 block leading-tight">Contacts qualifiés (collectif)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">36 h</span>
                <span className="text-[11px] text-[#52525B] mt-0.5 block leading-tight">Sprint créatif de Hanovre</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">6 créations</span>
                <span className="text-[11px] text-[#52525B] mt-0.5 block leading-tight">Campagnes Paid Ads comparatives</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 col-span-2 sm:col-span-1">
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#09090B] block">7 insignes</span>
                <span className="text-[11px] text-[#52525B] mt-0.5 block leading-tight">Badges vectoriels partenaires</span>
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
                Graphic Designer Junior (Hornetsecurity by Proofpoint)
              </h3>
              <ul className="text-xs sm:text-sm text-[#52525B] space-y-1.5 leading-relaxed">
                <li>• Création graphique et habillage de stands pour les salons européens (dont le stand de plus de 150 m² au FIC à Lille, ainsi qu'à it-sa Nuremberg et InfoSec Londres).</li>
                <li>• Coordination graphique avec les prestataires techniques et scénographes internationaux.</li>
                <li>• Supports publicitaires (Paid Ads SharePoint vs Proofpoint), fiches solutions et refonte de badges partenaires.</li>
                <li>• Travail quotidien en anglais au sein d'une équipe de design basée principalement en Allemagne.</li>
              </ul>
            </div>

          </div>

          {/* Dispositif FIC 2025 à Lille Grand Palais */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] block">
                Forum InCyber (FIC) 2025 • Lille Grand Palais
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#09090B]">
                Stand de plus de 150 m², arche vidéo After Effects et piste e-karting
              </h3>
            </div>
            
            {/* Arche vidéo motion design */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/60 pb-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#09090B] flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-[#FFAD00]" />
                    Création vidéo / Motion design événementiel
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-[#09090B] mt-0.5">
                    Arche vidéo d'accueil animée sur After Effects
                  </h4>
                </div>
                <span className="text-xs text-[#71717A]">
                  Lille Grand Palais • 1-3 Avril 2025
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed max-w-3xl">
                Conception et réalisation sur Adobe After Effects de l'animation vidéo diffusée sur l'arche vidéo LED du stand à l'entrée du salon. Cette boucle motion design assurait la transition visuelle du co-branding « HORNETSECURITY FORMERLY Vade » et orientait les visiteurs vers les totems partenaires. La structure métallique physique a été montée par les équipes techniques du salon.
              </p>

              {/* Sélecteur Face avant / Face arrière */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedArchFace('front')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedArchFace === 'front'
                      ? 'bg-[#09090B] text-white shadow-sm'
                      : 'bg-zinc-200/80 text-zinc-700 hover:bg-zinc-300'
                  }`}
                >
                  Face avant (Accueil salon)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedArchFace('back')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedArchFace === 'back'
                      ? 'bg-[#09090B] text-white shadow-sm'
                      : 'bg-zinc-200/80 text-zinc-700 hover:bg-zinc-300'
                  }`}
                >
                  Face arrière (Partenaires &amp; Sortie)
                </button>
              </div>

              {/* Présentation diptyque : Animation vidéo & Rendu in situ */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
                
                {/* Vidéo de l'animation After Effects */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-300 bg-zinc-950 shadow-sm">
                    <video
                      key={selectedArchFace}
                      src={
                        selectedArchFace === 'front'
                          ? '/assets/hornetsecurity/FIC_assets_2026/Video_arch/FRONT_Global_Arch_1920x1080.mp4'
                          : '/assets/hornetsecurity/FIC_assets_2026/Video_arch/BACK_Global_Arch_1920x1080.mp4'
                      }
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      poster="/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#71717A] px-1">
                    <span className="font-medium text-[#09090B]">
                      Boucle motion design (After Effects) • {selectedArchFace === 'front' ? 'Face avant' : 'Face arrière'}
                    </span>
                    <span className="font-mono text-[11px]">1920 × 1080</span>
                  </div>
                </div>

                {/* Photographie in situ */}
                <div className="lg:col-span-5 space-y-2">
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
                    <img
                      src="/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg"
                      alt="Arche vidéo d'accueil Hornetsecurity formerly Vade au Forum InCyber 2025"
                      className="w-full h-full object-cover object-[center_35%]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#71717A] px-1">
                    <span>Installation active sur le salon</span>
                    <span className="font-mono text-[11px]">In situ Lille Grand Palais</span>
                  </div>
                </div>

              </div>

              {/* Rôles distincts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-[#52525B]">
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 space-y-1">
                  <span className="font-bold text-[#09090B] block">• Scénarisation graphique</span>
                  <p>Définition du storyboard, rythme de transition des logos et lisibilité à distance.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 space-y-1">
                  <span className="font-bold text-[#09090B] block">• Production After Effects</span>
                  <p>Animation vectorielle, effets de particules lumineuses et export calibré pour les régies LED.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 space-y-1">
                  <span className="font-bold text-[#09090B] block">• Intégration sur régie</span>
                  <p>Vérification du calage des flux vidéo avec les prestataires audiovisuels de l'événement.</p>
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
                  Affichage urbain grand format — Façade du Zénith de Lille
                </h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Conception de la bâche extérieure grand format invitant les visiteurs du forum à rejoindre la piste d'e-karting privatisée au Zénith.
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
                  Au cours d'un <strong className="text-[#09090B]">sprint d'urgence de 36 heures au siège de Hanovre</strong>, j'ai collaboré en anglais avec l'équipe de design allemande pour concevoir l'identité visuelle et les supports de présentation du cyber-héros <strong className="text-[#09090B]">Helix Nova</strong>.
                </p>

                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  Contrairement à <strong className="text-[#09090B]">Captain Security</strong> (qui est une mascotte vivante incarnée en costume sur les salons du FIC et d'it-sa), <strong className="text-[#09090B]">Helix Nova</strong> relève d'un univers cybernétique 3D : armure high-tech sombre, alvéoles d'énergie jaune et ailes de frelon translucides symbolisant la protection Cloud proactive.
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

          {/* Système de badges partenaires B2B : Carrousel horizontal visuel sans texte */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white border border-zinc-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                  Système de certification &amp; Branding B2B
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B]">
                  Refonte des 7 insignes officiels du programme de partenariat
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] max-w-2xl leading-relaxed">
                  Harmonisation graphique et vectorielle des 7 niveaux d'accréditation utilisés sur l'ensemble des supports commerciaux et sites web du réseau de distribution européen. Cliquez sur un insigne pour l'examiner en haute résolution.
                </p>
              </div>
              <span className="text-xs text-[#71717A] font-mono shrink-0">
                7 insignes vectoriels
              </span>
            </div>

            {/* Carrousel visuel horizontal : défilement fluide tactile et souris, pause au survol, aucun texte superflu */}
            <BadgesCarousel />
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

      {/* Séparateur architectural entre Projets 01 & 02 */}
      {activeTab === 'all' && (
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200/80" />
            </div>
            <div className="relative bg-[#FFFFFF] px-4 sm:px-6 py-1.5 rounded-full border border-zinc-200/90 shadow-sm flex items-center gap-2 text-xs font-mono text-[#71717A]">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
              <span className="font-bold text-[#09090B]">Projet suivant</span>
              <span>·</span>
              <span>02 — 03</span>
            </div>
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
                  Intervention globale en tant que graphiste freelance pour bâtir l'univers de marque, vulgariser une technologie spectrale complexe et orchestrer le lancement public d'une solution de qualification des fruits et légumes, sous la validation de Marc-Henri Blarel.
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
                1. Contexte &amp; Besoin client
              </span>
              <p className="text-xs text-[#52525B] leading-relaxed">
                <strong className="text-[#09090B]">Qualification non destructive :</strong> Évaluer instantanément le taux de sucre et la maturité des fruits sans altérer la récolte, pour réduire le gaspillage alimentaire en rayon et optimiser les flux logistiques.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#FFAD00]" />
                2. Cibles &amp; Écosystème
              </span>
              <p className="text-xs text-[#52525B] leading-relaxed">
                <strong className="text-[#09090B]">B2B &amp; Partenaires :</strong> Arboriculteurs, coopératives agricoles, centrales d'achat de la grande distribution et investisseurs de la filière AgriTech française et européenne.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#FFAD00]" />
                3. Choix de conception suisse
              </span>
              <p className="text-xs text-[#52525B] leading-relaxed">
                <strong className="text-[#09090B]">Rigueur fonctionnelle :</strong> Typographie épurée sans empattement, grilles strictes, clarté didactique des schémas techniques et équilibre entre fraîcheur végétale et précision scientifique.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#FFAD00]" />
                4. Rôle de Rémi Brocart
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

      {/* Séparateur architectural entre Projets 02 & 03 */}
      {activeTab === 'all' && (
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200/80" />
            </div>
            <div className="relative bg-[#FFFFFF] px-4 sm:px-6 py-1.5 rounded-full border border-zinc-200/90 shadow-sm flex items-center gap-2 text-xs font-mono text-[#71717A]">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
              <span className="font-bold text-[#09090B]">Projet suivant</span>
              <span>·</span>
              <span>03 — 03</span>
            </div>
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

          {/* Bloc 4 : Perspectives de développement (3 horizons synthétiques sans dévoiler 12 mois) */}
          <div className="p-6 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200/60 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                  <Compass className="w-4 h-4" />
                  Méthodologie &amp; Vision
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] mt-1">
                  Perspectives de développement
                </h3>
              </div>
              <span className="text-xs font-semibold text-zinc-700 bg-white px-3 py-1 rounded-full border border-zinc-200 w-fit shrink-0">
                Synthèse en 3 horizons
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed max-w-4xl">
              Pour pérenniser la traction des premiers chantiers sans dépendre d'achats publicitaires continus, la réflexion stratégique pose trois priorités claires, conçues en synergie avec l'architecture technique d'AntheDesign.
            </p>

            {/* 3 Horizons synthétiques : Réalisé / Priorités suivantes / Vision à moyen terme */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
              
              {/* Horizon 1 : Réalisé */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#09090B]">Horizon 1</span>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded font-bold">
                    Réalisé
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#09090B]">Socle &amp; Contenus de terrain</h4>
                <ul className="text-xs text-[#52525B] space-y-1.5 leading-relaxed">
                  <li>• Stabilisation de la charte graphique et des modèles visuels avant/après.</li>
                  <li>• Conception des fiches didactiques d'aide à la vente (règle des 8 mm).</li>
                  <li>• Cadrage du circuit de captation sur chantiers et sessions Qualiopi.</li>
                  <li>• Traction initiale mesurée en 30 jours (+219 % de portée, 648 visites de profil).</li>
                </ul>
              </div>

              {/* Horizon 2 : Priorités suivantes */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#09090B]">Horizon 2</span>
                  <span className="text-[10px] font-mono text-[#09090B] bg-[#FFAD00]/25 px-2 py-0.5 rounded font-bold">
                    Priorités suivantes
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#09090B]">Consolidation &amp; Double flux</h4>
                <ul className="text-xs text-[#52525B] space-y-1.5 leading-relaxed">
                  <li>• <strong className="text-[#09090B]">Scission B2C / B2B :</strong> Séparer les flux pour les particuliers (devis terrasse/piscine) et les professionnels (formation Qualiopi).</li>
                  <li>• <strong className="text-[#09090B]">Avis Google Reviews :</strong> Concentration des avis clients sur Google pour distancer les concurrents locaux.</li>
                  <li>• <strong className="text-[#09090B]">Alimentation SEO :</strong> Transmission mensuelle de cas concrets à AntheDesign pour nourrir le cocon sémantique.</li>
                </ul>
              </div>

              {/* Horizon 3 : Vision à moyen terme */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#09090B]">Horizon 3</span>
                  <span className="text-[10px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded font-bold">
                    Vision à moyen terme
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#09090B]">Autorité &amp; Visibilité IA</h4>
                <ul className="text-xs text-[#52525B] space-y-1.5 leading-relaxed">
                  <li>• <strong className="text-[#09090B]">Essais documentés (RA LAB) :</strong> Bancs d'essais (résistance UV, perméabilité) créant des sources citables durables.</li>
                  <li>• <strong className="text-[#09090B]">GEO (Moteurs IA) :</strong> Structuration des données pour être naturellement cité par les assistants conversationnels.</li>
                  <li>• <strong className="text-[#09090B]">Réseau ambassadeur :</strong> Mobilisation des applicateurs formés pour démultiplier les réalisations locales.</li>
                </ul>
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
          MODAL 1 : ZOOM HAUTE RÉSOLUTION DES BADGES HORNETSECURITY
         ======================================================== */}
      <AnimatePresence>
        {badgeModalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 sm:bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setBadgeModalIndex(null)}
          >
            {/* Barre haute */}
            <div
              className="flex items-center justify-between text-white text-xs w-full max-w-4xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-300 text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                  {String(badgeModalIndex + 1).padStart(2, '0')} / {String(partnerBadges.length).padStart(2, '0')}
                </span>
                <span className="text-zinc-300 font-medium">Insigne officiel B2B</span>
              </div>

              <button
                type="button"
                onClick={() => setBadgeModalIndex(null)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                aria-label="Fermer la prévisualisation"
              >
                <X className="w-4 h-4" />
                <span>Fermer</span>
              </button>
            </div>

            {/* Zone centrale avec badge et flèches */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 max-w-4xl mx-auto w-full select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBadgeModalIndex((prev) => (prev - 1 + partnerBadges.length) % partnerBadges.length);
                }}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105 shadow-xl cursor-pointer"
                aria-label="Badge précédent"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 max-w-md w-full backdrop-blur-sm">
                <div className="w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center mb-6">
                  <motion.img
                    key={badgeModalIndex}
                    src={`/assets/hornetsecurity/Badges/${partnerBadges[badgeModalIndex].file}`}
                    alt={`Badge ${partnerBadges[badgeModalIndex].label}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                  />
                </div>

                <div className="text-center space-y-2 text-white">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                    {partnerBadges[badgeModalIndex].label}
                  </h3>
                  <span className="inline-block text-xs font-mono text-[#FFAD00] px-3 py-1 rounded-full bg-[#FFAD00]/10 border border-[#FFAD00]/30">
                    {partnerBadges[badgeModalIndex].level}
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed max-w-sm pt-2">
                    {partnerBadges[badgeModalIndex].description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setBadgeModalIndex((prev) => (prev + 1) % partnerBadges.length);
                }}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105 shadow-xl cursor-pointer"
                aria-label="Badge suivant"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Barre basse */}
            <div className="text-center text-zinc-400 text-xs py-1" onClick={(e) => e.stopPropagation()}>
              <span className="font-mono">Hornetsecurity Partner Program · Graphisme vectoriel Adobe Illustrator</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MODAL 2 : ZOOM HAUTE RÉSOLUTION DE L'AFFICHE HELIX NOVA
         ======================================================== */}
      <AnimatePresence>
        {isPosterModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 sm:bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setIsPosterModalOpen(false)}
          >
            {/* Barre haute */}
            <div
              className="flex items-center justify-between text-white text-xs w-full max-w-4xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-300 text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
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
              className="relative flex-1 flex items-center justify-center my-2 max-w-4xl mx-auto w-full select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/assets/hornetsecurity/affiche_helix_sprint.jpg"
                alt="Affiche de présentation officielle du héros cyber Helix Nova"
                className="max-h-[82vh] max-w-[90vw] sm:max-w-[80vw] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>

            {/* Barre basse */}
            <div className="text-center text-zinc-300 text-xs py-1" onClick={(e) => e.stopPropagation()}>
              <p className="font-semibold text-white">HELIX NOVA — Hornetsecurity by Proofpoint</p>
              <p className="text-zinc-400 text-[11px] font-mono mt-0.5">Photographie in situ · Format d'origine respecté</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          MODAL 3 : ZOOM HAUTE RÉSOLUTION DES PREUVES RÉSIN'ARCHITECTE
         ======================================================== */}
      <AnimatePresence>
        {raModalIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 sm:bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setRaModalIndex(null)}
          >
            {/* Barre haute */}
            <div
              className="flex items-center justify-between text-white text-xs w-full max-w-4xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-zinc-300 text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/10">
                  {String(raModalIndex + 1).padStart(2, '0')} / {String(raAssets.length).padStart(2, '0')}
                </span>
                <span className="text-zinc-300 font-medium">Résin'Architecte · Réalisation &amp; Analyse</span>
              </div>

              <button
                type="button"
                onClick={() => setRaModalIndex(null)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                aria-label="Fermer la prévisualisation"
              >
                <X className="w-4 h-4" />
                <span>Fermer</span>
              </button>
            </div>

            {/* Zone centrale avec image et navigation */}
            <div
              className="relative flex-1 flex items-center justify-center my-2 max-w-4xl mx-auto w-full select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRaModalIndex((prev) => (prev - 1 + raAssets.length) % raAssets.length);
                }}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105 shadow-xl cursor-pointer"
                aria-label="Capture précédente"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="relative max-h-[78vh] max-w-full flex items-center justify-center">
                <motion.img
                  key={raModalIndex}
                  src={raAssets[raModalIndex].src}
                  alt={raAssets[raModalIndex].title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="max-h-[78vh] max-w-[90vw] sm:max-w-[80vw] object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRaModalIndex((prev) => (prev + 1) % raAssets.length);
                }}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105 shadow-xl cursor-pointer"
                aria-label="Capture suivante"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Barre basse */}
            <div className="text-center text-white max-w-xl mx-auto w-full space-y-1 py-1" onClick={(e) => e.stopPropagation()}>
              <p className="font-semibold text-xs sm:text-sm text-zinc-100">
                {raAssets[raModalIndex].title}
              </p>
              <p className="text-zinc-400 text-xs">
                {raAssets[raModalIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
