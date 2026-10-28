import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Video, Sparkles, Film, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MotionVideoCarousel — Carrousel vidéo haut de gamme pour les réalisations Motion Design & Vidéo.
 * 
 * Améliorations clés :
 * - 5 affiches et vignettes distinctes, nettes et représentatives (aucune répétition).
 * - Format 16:9 responsive de haute qualité.
 * - Titres complets lisibles sans coupure disgracieuse.
 * - Bouton de lecture raffiné et indicateur de média actif.
 * - Lecture à la demande (click-to-play) sans nuisance sonore automatique.
 */
export default function MotionVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 'arch-front',
      shortTitle: "Arche LED · Face avant",
      title: "Arche vidéo LED — Face avant (After Effects)",
      subtitle: "Forum InCyber (FIC) 2025 • Lille Grand Palais",
      tag: "Motion 1080p",
      desc: "Boucle motion design After Effects diffusée sur l'arche d'accueil à l'entrée du pavillon. Animation de transition du co-branding 'HORNETSECURITY FORMERLY Vade' et signalétique dynamique.",
      type: 'mp4',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/FRONT_Global_Arch_1920x1080.mp4',
      poster: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      badge: 'Motion Design 1080p',
      format: 'MP4 60fps',
    },
    {
      id: 'arch-back',
      shortTitle: "Arche LED · Face arrière",
      title: "Arche vidéo LED — Face arrière (After Effects)",
      subtitle: "Pavillon 150 m² • Sortie & Espace Partenaires",
      tag: "Partenaires IT",
      desc: "Déclinaison motion design orientée vers l'intérieur du stand, animant les logos des partenaires technologiques et le rappel des solutions Cloud 365.",
      type: 'mp4',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/BACK_Global_Arch_1920x1080.mp4',
      poster: '/assets/hornetsecurity/digital-motion.jpg',
      badge: 'Motion Design 1080p',
      format: 'MP4 60fps',
    },
    {
      id: 'stand-ambiance',
      shortTitle: "Pavillon in situ & Flux",
      title: "Ambiance in situ du pavillon & Flux visiteurs",
      subtitle: "Forum InCyber 2025 • Scénographie & Écrans actifs",
      tag: "In situ Salon",
      desc: "Captation vidéo in situ illustrant l'intégration physique de l'arche lumineuse, les totems vidéo et l'orientation des visiteurs au sein du stand.",
      type: 'mp4',
      src: '/assets/hornetsecurity/fic/Videos/vid4_fic.mp4',
      poster: '/assets/hornetsecurity/video-aftermovie.jpg',
      badge: 'Captation salon',
      format: 'Vidéo In situ',
    },
    {
      id: 'helix-nova',
      shortTitle: "Helix Nova · Teaser 3D",
      title: "Helix Nova — Révélation vidéo du héros cyber",
      subtitle: "Sprint créatif de 36 h • Hanovre, Allemagne",
      tag: "Héros 3D",
      desc: "Déclinaison vidéo du héros 3D Helix Nova conçue lors du sprint créatif international bilingue au siège de Hanovre.",
      type: 'youtube',
      youtubeId: '-h8V1xBcDBQ',
      poster: 'https://img.youtube.com/vi/-h8V1xBcDBQ/maxresdefault.jpg',
      badge: 'Sprint 36 h Hanovre',
      format: 'YouTube HD',
    },
    {
      id: 'fresh-data',
      shortTitle: "Fresh Data · Interview MEDFEL",
      title: "Fresh Data — Captation d'interviews au salon MEDFEL",
      subtitle: "Salon International MEDFEL • Perpignan",
      tag: "AgriTech B2B",
      desc: "Captation vidéo de terrain et interview du fondateur Marc-Henri Blarel, vulgarisant la technologie spectrale de qualification des fruits.",
      type: 'youtube',
      youtubeId: 'mf6eguKkok8',
      poster: 'https://img.youtube.com/vi/mf6eguKkok8/maxresdefault.jpg',
      badge: 'Vidéo & Interview',
      format: 'YouTube HD',
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
    <div className="space-y-6">
      
      {/* Lecteur vidéo principal responsive 16:9 */}
      <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-lg">
        {isPlaying ? (
          currentVideo.type === 'youtube' ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={currentVideo.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              key={currentVideo.src}
              src={currentVideo.src}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          )
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            role="button"
            tabIndex={0}
            aria-label={`Lancer la vidéo : ${currentVideo.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsPlaying(true);
              }
            }}
            className="relative w-full h-full cursor-pointer group select-none flex items-center justify-center bg-zinc-950 overflow-hidden"
          >
            {/* Miniature d'arrière-plan haute définition */}
            <img
              src={currentVideo.poster}
              alt={currentVideo.title}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
              loading="eager"
            />

            {/* Voile d'ombrage et dégradé subtil */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/30 group-hover:via-black/20 transition-colors duration-300" />

            {/* Bouton Play ambré avec halo dynamique */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_35px_rgba(255,173,0,0.5)] transition-all duration-300 group-hover:scale-110 active:scale-95">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-black" />
              </div>
              <span className="text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 shadow-md">
                Lancer la lecture
              </span>
            </div>

            {/* Badge de contexte en haut à gauche */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                {currentVideo.badge}
              </span>
              <span className="hidden sm:inline-flex text-[11px] font-mono text-zinc-300 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                {currentVideo.format}
              </span>
            </div>

            {/* Indicateur numérique en haut à droite */}
            <div className="absolute top-4 right-4 z-10">
              <span className="text-[11px] font-mono font-semibold text-white/90 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                {String(currentIndex + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Cartouche d'informations éditoriales & Commandes de navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFAD00]" />
            <span className="text-xs font-bold text-[#09090B] uppercase tracking-wider">
              {currentVideo.subtitle}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#09090B]">
            {currentVideo.title}
          </h4>
          <p className="text-xs sm:text-sm text-[#52525B] max-w-2xl leading-relaxed">
            {currentVideo.desc}
          </p>
        </div>

        {/* Flèches de navigation du carrousel */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Vidéo précédente"
            className="w-10 h-10 rounded-full bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono font-semibold text-zinc-600 px-2">
            {String(currentIndex + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Vidéo suivante"
            className="w-10 h-10 rounded-full bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Rangée de miniatures enrichies : prévisualisations nettes, distinctes et cliquables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
        {videos.map((vid, idx) => {
          const active = idx === currentIndex;
          return (
            <button
              key={vid.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`text-left p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-2.5 group relative ${
                active
                  ? 'bg-white border-[#FFAD00] ring-2 ring-[#FFAD00]/30 shadow-md scale-[1.02]'
                  : 'bg-zinc-50 hover:bg-white border-zinc-200/80 hover:border-zinc-300 shadow-xs'
              }`}
            >
              {/* Miniature avec conteneur 16:9 et badge format */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200/80">
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
                      active ? 'bg-[#FFAD00] text-black' : 'bg-black/60 text-white backdrop-blur-sm border border-white/20'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Badge format sur l'image */}
                <div className="absolute bottom-1.5 right-1.5">
                  <span className="text-[10px] font-mono font-medium text-white px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10">
                    {vid.tag}
                  </span>
                </div>
              </div>

              {/* Titre et statut */}
              <div className="space-y-0.5 px-0.5">
                <span
                  className={`text-xs font-bold leading-tight line-clamp-1 block ${
                    active ? 'text-[#09090B]' : 'text-zinc-700 group-hover:text-black'
                  }`}
                >
                  {vid.shortTitle}
                </span>
                <span className="text-[11px] text-[#71717A] line-clamp-1 block">
                  {vid.subtitle.split('•')[0]}
                </span>
              </div>

              {/* Indicateur d'état actif */}
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
