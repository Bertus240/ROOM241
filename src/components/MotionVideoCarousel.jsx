import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight, Video, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MotionVideoCarousel — Carrousel vidéo interactif pour les réalisations Motion Design & Vidéo.
 * 
 * Spécifications :
 * - Miniatures représentatives pour chaque média.
 * - Navigation fluide entre les créations.
 * - Lecture à la demande (click-to-play) : aucun autoplay bruyant.
 * - Format 16:9 responsive.
 * - Chargement optimisé (preload metadata).
 * - Totalement tactile et accessible au clavier.
 */
export default function MotionVideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const videos = [
    {
      id: 'arch-front',
      title: "Arche vidéo LED — Face avant (After Effects)",
      subtitle: "Forum InCyber (FIC) 2025 • Lille Grand Palais",
      desc: "Boucle motion design After Effects diffusée sur l'arche d'accueil à l'entrée du pavillon. Animation de transition du co-branding 'HORNETSECURITY FORMERLY Vade' et signalétique dynamique.",
      type: 'mp4',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/FRONT_Global_Arch_1920x1080.mp4',
      poster: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      badge: 'Motion Design 1080p',
    },
    {
      id: 'arch-back',
      title: "Arche vidéo LED — Face arrière (After Effects)",
      subtitle: "Pavillon 150 m² • Sortie & Espace Partenaires",
      desc: "Déclinaison motion design orientée vers l'intérieur du stand, animant les logos des partenaires technologiques et le rappel des solutions Cloud 365.",
      type: 'mp4',
      src: '/assets/hornetsecurity/FIC_assets_2026/Video_arch/BACK_Global_Arch_1920x1080.mp4',
      poster: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      badge: 'Motion Design 1080p',
    },
    {
      id: 'stand-ambiance',
      title: "Ambiance in situ du pavillon & Flux visiteurs",
      subtitle: "Forum InCyber 2025 • Scénographie & Écrans actifs",
      desc: "Captation vidéo in situ illustrant l'intégration physique de l'arche lumineuse, les totems vidéo et l'orientation des visiteurs au sein du stand.",
      type: 'mp4',
      src: '/assets/hornetsecurity/fic/Videos/vid4_fic.mp4',
      poster: '/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg',
      badge: 'Captation salon',
    },
    {
      id: 'helix-nova',
      title: "Helix Nova — Révélation vidéo du héros cyber",
      subtitle: "Sprint créatif de 36 h • Hanovre, Allemagne",
      desc: "Déclinaison vidéo du héros 3D Helix Nova conçue lors du sprint créatif international bilingue au siège de Hanovre.",
      type: 'youtube',
      youtubeId: '-h8V1xBcDBQ',
      badge: 'Sprint 36 h Hanovre',
    },
    {
      id: 'fresh-data',
      title: "Fresh Data — Captation d'interviews au salon MEDFEL",
      subtitle: "Salon International MEDFEL • Perpignan",
      desc: "Captation vidéo de terrain et interview du fondateur Marc-Henri Blarel, vulgarisant la technologie spectrale de qualification des fruits.",
      type: 'youtube',
      youtubeId: 'mf6eguKkok8',
      poster: '/assets/fresh-data-video-cover.jpg',
      badge: 'Vidéo & Interview',
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
      <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-300 bg-zinc-950 shadow-md">
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
              className="w-full h-full object-contain"
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
            className="relative w-full h-full cursor-pointer group select-none flex items-center justify-center bg-zinc-900"
          >
            {/* Miniature d'arrière-plan */}
            {currentVideo.poster ? (
              <img
                src={currentVideo.poster}
                alt={currentVideo.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
            ) : currentVideo.type === 'youtube' ? (
              <img
                src={`https://img.youtube.com/vi/${currentVideo.youtubeId}/hqdefault.jpg`}
                alt={currentVideo.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
            ) : null}

            {/* Voile assombrissant et dégradé */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />

            {/* Bouton Play ambré distinctif */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,173,0,0.45)] transition-all duration-300 group-hover:scale-110">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-black" />
              </div>
              <span className="text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                Lancer la vidéo
              </span>
            </div>

            {/* Badge de contexte en haut à gauche */}
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[11px] font-mono font-semibold text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                {currentVideo.badge}
              </span>
            </div>

            {/* Indicateur numérique en haut à droite */}
            <div className="absolute top-4 right-4 z-10">
              <span className="text-[11px] font-mono text-white/90 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                {String(currentIndex + 1).padStart(2, '0')} — {String(videos.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Cartouche d'informations éditoriales & Commandes de navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
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
          <span className="text-xs font-mono text-zinc-500 px-2">
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

      {/* Rangée de miniatures interactives pour sélection directe */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
        {videos.map((vid, idx) => {
          const active = idx === currentIndex;
          return (
            <button
              key={vid.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 group ${
                active
                  ? 'bg-white border-[#FFAD00] ring-2 ring-[#FFAD00]/25 shadow-sm'
                  : 'bg-zinc-50 hover:bg-white border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-zinc-900 border border-zinc-200/60">
                {vid.poster ? (
                  <img
                    src={vid.poster}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : vid.type === 'youtube' ? (
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${active ? 'bg-[#FFAD00] text-black' : 'bg-white/80 text-black'}`}>
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
              <span className={`text-[11px] font-semibold line-clamp-1 ${active ? 'text-[#09090B]' : 'text-zinc-600'}`}>
                {vid.title}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}

