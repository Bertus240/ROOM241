import React, { useState } from 'react';
import { Play, Maximize2, Timer, Sparkles, CheckCircle2 } from 'lucide-react';
import { Reveal } from '../lib/motion';

export default function PresentationVideo({ openVideoModal }) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const handleStartPlay = () => {
    setIsPlayingInline(true);
  };

  return (
    <section
      id="presentation-video"
      className="relative border-b border-room-border bg-room-bg text-room-text scroll-mt-24 py-16 sm:py-24 overflow-hidden"
    >
      {/* Halo lumineux d'ambiance feutré */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,173,0,0.06)_0%,transparent_70%)] blur-[90px]" />
      </div>

      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header compact, calme et direct */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/50 dark:bg-white/[0.05] border border-neutral-300/50 dark:border-white/10 text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-room-amber" />
              <span>Le pitch en 88 secondes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1] max-w-2xl">
              Mettre un visage et une voix sur votre futur partenaire.
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base font-sans max-w-md leading-relaxed">
            Pas d'agence anonyme ni de slides théoriques : 88 secondes pour comprendre comment j'articule rigueur analytique, tournage terrain et direction artistique B2B.
          </p>
        </Reveal>

        {/* Cinematic Stage */}
        <Reveal>
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-white/10 hover:border-room-amber/40 bg-neutral-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 group">
            
            {/* The 16:9 Player Viewport */}
            <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
              {isPlayingInline ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/Bg9Pce0Qqg0?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                  title="Vidéo de présentation Rémi Brocart — Room241"
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div
                  onClick={handleStartPlay}
                  role="button"
                  tabIndex={0}
                  aria-label="Lancer la vidéo de présentation de Rémi Brocart (88 secondes)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStartPlay();
                    }
                  }}
                  className="relative w-full h-full cursor-pointer select-none group/cover"
                >
                  {/* High-Definition Poster Image */}
                  <img
                    src="/assets/video-pitch-remi.jpg"
                    alt="Rémi Brocart — Direction artistique et marketing digital B2B"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/cover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 transition-opacity duration-300 group-hover/cover:opacity-75" />

                  {/* Top Minimal Badge */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-xs font-sans font-medium shadow-md">
                      Rémi Brocart · Fondateur &amp; DA
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="relative mb-3 flex items-center justify-center">
                      <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-room-amber/20 animate-ping opacity-75" />
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-room-amber hover:bg-room-amberHover text-black flex items-center justify-center shadow-[0_0_35px_rgba(255,173,0,0.5)] transition-transform duration-300 ease-premium group-hover/cover:scale-110">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-black" />
                      </div>
                    </div>

                    <span className="text-white font-sans font-bold text-lg sm:text-xl drop-shadow-md tracking-tight block">
                      Lancer la vidéo
                    </span>
                    <span className="text-white/80 font-sans text-xs mt-0.5">
                      1 min 28 s • Son &amp; haute définition
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-bar below video: Direct info & Fullscreen Mode */}
            <div className="px-5 sm:px-6 py-3.5 bg-neutral-900/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-neutral-300">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-sans text-neutral-400">
                <span className="inline-flex items-center gap-1.5 text-room-amber font-semibold">
                  <Timer className="w-3.5 h-3.5" />
                  1:28
                </span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-neutral-300">Double cursus Ingénieur &amp; Marketing</span>
                <span className="text-white/20 hidden sm:inline">•</span>
                <span className="text-neutral-300">Approche terrain &amp; conversion B2B</span>
              </div>

              {openVideoModal && (
                <button
                  type="button"
                  onClick={openVideoModal}
                  className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-room-amber transition-colors text-xs font-sans font-medium ml-auto"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Mode cinéma</span>
                </button>
              )}
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
