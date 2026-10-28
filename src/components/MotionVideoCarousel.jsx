import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Video, Sparkles, Film, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MotionVideoCarousel — Carrousel vidéo et médias authentiques pour l'étude de cas Hornetsecurity / FIC.
 * 
 * Direction artistique & Qualité éditoriale :
 * - Médias 100% authentiques vérifiés : Arche LED (front/back), stand 150 m² in situ, 5 captations de terrain, Captain Security sur scène plénière.
 * - Miniatures 16:9 sans filtres opaques masquants, avec titres et métadonnées placés sous l'image pour une lisibilité totale.
 * - Style Glass Design contemporain, sobre et contrasté avec accents ambrés (#FFAD00).
 * - Lecture à la demande, sans son automatique intrusif.
 */
export default function MotionVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSubVideo, setActiveSubVideo] = useState(0);

  const videos = [
    {
      id: 'arch-front',
      badge: 'Motion Design 1080p',
      tag: 'After Effects',
      format: 'MP4 60fps',
      title: "Arche LED — Face avant (After Effects)",
      subtitle: "FIC 2026 • Lille Grand Palais",
      desc: "Conception et réalisation sur Adobe After Effects de l’animation vidéo diffusée sur l'arche LED d'accueil à l’entrée du salon. Cette boucle de motion design accompagnait la transition de marque « HORNETSECURITY FORMERLY Vade » et guidait le regard des visiteurs vers les pôles d'expertise et les espaces partenaires.",
      type: 'mp4',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/FRONT_Global_Arch_1920x1080.mp4',
      poster: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      caption: "Photographie in situ de l'arche lumineuse d'accueil au Forum InCyber (Lille Grand Palais).",
    },
    {
      id: 'arch-back',
      badge: 'Motion Design 1080p',
      tag: 'Partenaires IT',
      format: 'MP4 60fps',
      title: "Arche LED — Face arrière (After Effects)",
      subtitle: "FIC 2026 • Stand 150 m²",
      desc: "Déclinaison motion design orientée vers l'intérieur du salon, mettant en valeur la protection Cloud 365, les partenaires technologiques et l'univers graphique unifié de la marque.",
      type: 'mp4',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/BACK_Global_Arch_1920x1080.mp4',
      poster: '/assets/hornetsecurity/arch_back_motion.png',
      caption: "Image extraite du rendu After Effects 1080p 60fps de la face arrière de l'arche.",
    },
    {
      id: 'stand-ambiance',
      badge: 'Scénographie in situ',
      tag: 'Vue d’ensemble',
      format: 'Photo HD & Vidéo',
      title: "Stand 150 m² & Flux visiteurs",
      subtitle: "FIC 2026 • Scénographie & Écrans actifs",
      desc: "Vue d'ensemble en plongée du stand de plus de 150 m² au Forum InCyber. Mise en scène de l'arche centrale, des totems vidéo interactifs et du flux continu des visiteurs professionnels (+4 000 contacts qualifiés enregistrés collectivement).",
      type: 'mp4',
      src: '/assets/hornetsecurity/fic/Videos/vid4_fic.mp4',
      poster: '/assets/hornetsecurity/fic/Stand/IMG20250401075301.jpg',
      caption: "Prise de vue panoramique en plongée du stand 150 m² et du flux visiteurs au FIC Lille Grand Palais.",
    },
    {
      id: 'salon-videos',
      badge: '5 captations terrain',
      tag: 'Vidéos in situ',
      format: 'Full HD 1080p',
      title: "Vidéos in situ du salon",
      subtitle: "FIC 2026 • 5 séquences documentées",
      desc: "Série de 5 captations vidéo réalisées sur le terrain pendant l'événement, documentant la vie du stand, la dynamique des allées, l'impact visuel des écrans et les interventions en direct.",
      type: 'subplaylist',
      poster: '/assets/hornetsecurity/fic/Stand/IMG20250401075149.jpg',
      caption: "Perspective des allées et des totems de signalétique du stand Hornetsecurity.",
      subVideos: [
        { id: 'v1', label: '1. Scène plénière & écran', src: '/assets/hornetsecurity/fic/Videos/vid1_fic.mp4', duration: '30s' },
        { id: 'v2', label: '2. Allée centrale & arche', src: '/assets/hornetsecurity/fic/Videos/vid2_fic.mp4', duration: '28s' },
        { id: 'v3', label: '3. Flux & affluence stand', src: '/assets/hornetsecurity/fic/Videos/vid3_fic.mp4', duration: '54s' },
        { id: 'v4', label: '4. Arche en fonctionnement', src: '/assets/hornetsecurity/fic/Videos/vid4_fic.mp4', duration: '19s' },
        { id: 'v5', label: '5. Captain Security sur scène', src: '/assets/hornetsecurity/fic/Videos/vid5_fic.mp4', duration: '30s' },
      ],
    },
    {
      id: 'captain-security',
      badge: 'Incarnation de marque',
      tag: 'Scène plénière',
      format: 'Photo HD & Vidéo',
      title: "Captain Security sur scène plénière",
      subtitle: "FIC 2026 • Incarnation & Animation",
      desc: "Incarnation du personnage officiel Captain Security en costume sur la grande scène plénière du Forum InCyber et dans les travées du salon. Rôle d'animation, création de lien direct avec les visiteurs et amplification de la notoriété de marque.",
      type: 'mp4',
      src: '/assets/hornetsecurity/fic/Videos/vid5_fic.mp4',
      poster: '/assets/hornetsecurity/fic/Capain/captain2.jpg',
      caption: "Rémi Brocart en costume de Captain Security sur la scène plénière du FIC Lille Grand Palais.",
    },
  ];

  const currentVideo = videos[currentIndex];

  const handleSelect = (idx) => {
    setIsPlaying(false);
    setCurrentIndex(idx);
    setActiveSubVideo(0);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setActiveSubVideo(0);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setActiveSubVideo(0);
  };

  const currentMediaSrc = currentVideo.type === 'subplaylist' && currentVideo.subVideos
    ? currentVideo.subVideos[activeSubVideo]?.src
    : currentVideo.src;

  return (
    <div className="space-y-6 select-none">
      
      {/* Lecteur média principal responsive 16:9 avec style glassmorphism */}
      <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-white/10 bg-zinc-950 shadow-2xl">
        {isPlaying ? (
          <div className="relative w-full h-full bg-black">
            <video
              key={currentMediaSrc}
              src={currentMediaSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            >
              Votre navigateur ne supporte pas la lecture de cette vidéo.
            </video>
          </div>
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            role="button"
            tabIndex={0}
            aria-label={`Lancer la lecture de : ${currentVideo.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsPlaying(true);
              }
            }}
            className="group relative w-full h-full cursor-pointer"
          >
            {/* Image de couverture authentique en haute définition */}
            <img
              src={currentVideo.poster}
              alt={currentVideo.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            {/* Dégradé léger et transparent pour préserver la netteté de l'image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15 group-hover:via-black/20 transition-colors" />

            {/* Badges contextuels discrets en haut */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)]" />
                {currentVideo.badge}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                {currentVideo.format}
              </span>
            </div>

            {/* Bouton de lecture central avec accent ambré signature */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-[#FFAD00]/30 blur-xl group-hover:bg-[#FFAD00]/50 transition-all duration-300" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] text-zinc-950 flex items-center justify-center shadow-[0_0_40px_rgba(255,173,0,0.6)] group-hover:scale-110 active:scale-95 transition-transform duration-300">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
              </div>
            </div>

            {/* Légende en bas de l'affiche */}
            <div className="absolute bottom-4 left-5 right-5 text-white space-y-1">
              <p className="font-mono text-xs text-[#FFAD00] font-semibold tracking-wider uppercase">
                {currentVideo.subtitle}
              </p>
              <h3 className="text-base sm:text-xl font-bold tracking-tight drop-shadow-md">
                {currentVideo.title}
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* Cartouche descriptif éditorial avec commandes de navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/80 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#09090B] dark:text-white">
              {currentVideo.title}
            </span>
            <span className="text-zinc-400">·</span>
            <span className="text-xs text-[#71717A] dark:text-zinc-400 font-mono">
              {currentVideo.subtitle}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#52525B] dark:text-zinc-300 leading-relaxed whitespace-pre-line">
            {currentVideo.desc}
          </p>

          {/* Sélecteur de sous-vidéos si disponible (Vidéos du salon) */}
          {currentVideo.subVideos && (
            <div className="pt-3 flex flex-wrap gap-2">
              {currentVideo.subVideos.map((sub, sIdx) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => {
                    setActiveSubVideo(sIdx);
                    setIsPlaying(true);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeSubVideo === sIdx && isPlaying
                      ? 'bg-[#FFAD00] text-black font-bold shadow-sm'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>{sub.label}</span>
                  <span className="text-[10px] opacity-70">({sub.duration})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Flèches de navigation du carrousel */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Média précédent"
            className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-200 dark:border-white/15 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 px-2">
            {String(currentIndex + 1).padStart(2, '0')} <span className="text-[#FFAD00]">/</span> {String(videos.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Média suivant"
            className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-200 dark:border-white/15 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rangée de miniatures 16:9 enrichies : titres clairs, complets et hautement lisibles SOUS l'image */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
        {videos.map((vid, idx) => {
          const active = idx === currentIndex;
          return (
            <button
              key={vid.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`text-left p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2.5 group relative backdrop-blur-xl ${
                active
                  ? 'bg-white dark:bg-zinc-850 border-[#FFAD00] ring-2 ring-[#FFAD00]/40 shadow-lg scale-[1.02]'
                  : 'bg-white/60 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-850 border-zinc-200/80 dark:border-white/10 hover:border-zinc-300 shadow-xs'
              }`}
            >
              {/* Miniature 16:9 sans voile noir opaque */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200/80 dark:border-white/10">
                <img
                  src={vid.poster}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                
                {/* Icône de lecture subtile au survol ou si actif */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                  active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 ${
                      active ? 'bg-[#FFAD00] text-black font-bold' : 'bg-black/75 text-white backdrop-blur-sm border border-white/20'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Badge format discret en haut à droite */}
                <div className="absolute top-1.5 right-1.5">
                  <span className="text-[9px] font-mono font-medium text-white px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                    {vid.tag}
                  </span>
                </div>
              </div>

              {/* Titre et sous-titre placés SOUS la miniature — lisibilité totale sans troncature */}
              <div className="space-y-1 px-0.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#FFAD00] uppercase font-bold tracking-wider block">
                    0{idx + 1} · {vid.tag}
                  </span>
                  <h4
                    className={`text-xs font-bold leading-snug pt-0.5 ${
                      active ? 'text-[#09090B] dark:text-white' : 'text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white'
                    }`}
                  >
                    {vid.title}
                  </h4>
                </div>
                <p className="text-[11px] font-mono text-[#71717A] dark:text-zinc-400 pt-0.5">
                  {vid.subtitle}
                </p>
              </div>

              {/* Indicateur discret d'état actif */}
              {active && (
                <div className="absolute top-2 right-2">
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFAD00] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFAD00]" />
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
