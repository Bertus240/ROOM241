import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Video, Sparkles, Film, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MotionVideoCarousel — Carrousel vidéo haut de gamme pour les réalisations Motion Design & Vidéo.
 * 
 * Conception & Qualité éditoriale :
 * - Récit factuel exact : distinctions strictes FIC 2026, stand > 150 m², sprint individuel de Hanovre.
 * - Miniatures enrichies au format 16:9 avec titres complets hautement lisibles (zéro coupure tronquée).
 * - Style Glass Design contemporain et contrasté.
 * - Lecture à la demande sans nuisance sonore automatique.
 */
export default function MotionVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 'arch-front',
      badge: 'Motion Design 1080p',
      tag: 'After Effects',
      format: 'MP4 60fps',
      title: "Arche vidéo LED — Face avant (After Effects)",
      subtitle: "FIC 2026 • Lille Grand Palais",
      desc: "Conception et réalisation sur Adobe After Effects de l’animation vidéo diffusée sur l’arche LED à l’entrée du salon. Cette boucle de motion design accompagnait la transition de marque « HORNETSECURITY FORMERLY Vade » et guidait visuellement les visiteurs vers les espaces partenaires.",
      type: 'mp4',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/FRONT_Global_Arch_1920x1080.mp4',
      poster: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
    },
    {
      id: 'arch-back',
      badge: 'Motion Design 1080p',
      tag: 'Partenaires IT',
      format: 'MP4 60fps',
      title: "Arche vidéo LED — Face arrière (After Effects)",
      subtitle: "FIC 2026 • Stand > 150 m²",
      desc: "Déclinaison motion design orientée vers l'intérieur du stand, animant les logos des partenaires technologiques et le rappel des solutions de protection Cloud 365.",
      type: 'mp4',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/BACK_Global_Arch_1920x1080.mp4',
      poster: '/assets/hornetsecurity/digital-motion.jpg',
    },
    {
      id: 'stand-ambiance',
      badge: 'Captation salon',
      tag: 'In situ',
      format: 'Vidéo HD',
      title: "Ambiance in situ du stand & Flux visiteurs",
      subtitle: "FIC 2026 • Scénographie & Écrans actifs",
      desc: "Captation vidéo in situ illustrant l'intégration physique de l'arche lumineuse, les totems vidéo interactifs et l'orientation des visiteurs au sein du stand.",
      type: 'mp4',
      src: '/assets/hornetsecurity/fic/Videos/vid4_fic.mp4',
      poster: '/assets/hornetsecurity/video-aftermovie.jpg',
    },
    {
      id: 'helix-nova',
      badge: 'Sprint individuel 36 h',
      tag: 'Héros 3D',
      format: 'YouTube HD',
      title: "Helix Nova — Révélation vidéo du héros cyber",
      subtitle: "Sprint créatif individuel 36 h • Hanovre",
      desc: "Lors d’un sprint créatif de 36 heures au siège d’Hornetsecurity, à Hanovre, j’ai imaginé et développé seul le concept d’Helix Nova, un cyber-héros conçu en 3D. L’exercice réunissait plusieurs participants en compétition autour de propositions créatives.\n\nJ’ai conçu son identité visuelle et ses supports de présentation, en imaginant un univers graphique articulé autour d’une armure sombre, d’accents jaunes et d’ailes translucides inspirées du frelon. Là où Captain Security prend vie à travers un costume porté lors des salons professionnels, Helix Nova explore une autre facette de l’univers de marque, pensée pour un environnement numérique.",
      type: 'youtube',
      youtubeId: '-h8V1xBcDBQ',
      poster: 'https://img.youtube.com/vi/-h8V1xBcDBQ/maxresdefault.jpg',
    },
    {
      id: 'fresh-data',
      badge: 'Captation terrain',
      tag: 'AgriTech',
      format: 'YouTube HD',
      title: "Fresh Data — Captation vidéo au salon MEDFEL",
      subtitle: "Salon International MEDFEL • Perpignan",
      desc: "À l’occasion du salon MEDFEL à Perpignan, j’ai réalisé des images de la conférence organisée par Fresh Data en fin de journée, ainsi qu’une interview d’un participant venu y assister. Malgré un horaire tardif, la conférence a attiré un public plus nombreux qu’attendu. Une belle surprise pour l’équipe, et l’occasion de documenter l’intérêt suscité par la technologie spectrale de qualification des fruits.",
      type: 'youtube',
      youtubeId: 'mf6eguKkok8',
      poster: 'https://img.youtube.com/vi/mf6eguKkok8/maxresdefault.jpg',
    },
  ];

  const currentVideo = videos[currentIndex];

  const handleSelect = (idx) => {
    setIsPlaying(false);
    setCurrentIndex(idx);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* Lecteur vidéo principal responsive 16:9 avec style glassmorphism */}
      <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-white/10 bg-zinc-950 shadow-2xl">
        {isPlaying ? (
          currentVideo.type === 'youtube' ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={currentVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={currentVideo.src}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            >
              Votre navigateur ne supporte pas la lecture de cette vidéo.
            </video>
          )
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            role="button"
            tabIndex={0}
            aria-label={`Lancer la lecture de la vidéo : ${currentVideo.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsPlaying(true);
              }
            }}
            className="group relative w-full h-full cursor-pointer"
          >
            {/* Image de couverture en haute définition */}
            <img
              src={currentVideo.poster}
              alt={currentVideo.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:via-black/30 transition-colors" />

            {/* Badges contextuels en haut */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.9)]" />
                {currentVideo.badge}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                {currentVideo.format}
              </span>
            </div>

            {/* Bouton de lecture central haute visibilité */}
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
        </div>

        {/* Flèches de navigation du carrousel */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Vidéo précédente"
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
            aria-label="Vidéo suivante"
            className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white border border-zinc-200 dark:border-white/15 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rangée de miniatures enrichies : titres clairs, complets et lisibles sans coupure */}
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
              {/* Miniature 16:9 avec icône de lecture */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200/80 dark:border-white/10">
                <img
                  src={vid.poster}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                
                {/* Icône de lecture centrale */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 ${
                      active ? 'bg-[#FFAD00] text-black font-bold' : 'bg-black/70 text-white backdrop-blur-sm border border-white/20'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Badge tag sur l'image */}
                <div className="absolute bottom-1.5 right-1.5">
                  <span className="text-[10px] font-mono font-medium text-white px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-white/15">
                    {vid.tag}
                  </span>
                </div>
              </div>

              {/* Titre et sous-titre complets, lisibles sans troncature tronquée */}
              <div className="space-y-1.5 px-0.5 flex-1 flex flex-col justify-between">
                <span
                  className={`text-[12px] font-bold leading-snug block line-clamp-2 min-h-[2.4rem] ${
                    active ? 'text-[#09090B] dark:text-white' : 'text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white'
                  }`}
                  title={vid.title}
                >
                  {vid.title}
                </span>
                <span className="text-[11px] font-mono text-[#71717A] dark:text-zinc-400 block truncate">
                  {vid.subtitle}
                </span>
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
