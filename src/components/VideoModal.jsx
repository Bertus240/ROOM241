import React, { useEffect, useRef } from 'react';
import { X, Calendar, ArrowUpRight, Sparkles } from 'lucide-react';
import TrackedButton from './actions/TrackedButton';

export default function VideoModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent background scrolling while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Vidéo de présentation de Rémi Brocart — Room241"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10"
    >
      {/* 1. Backdrop with deep theatrical blur */}
      <div
        onClick={onClose}
        className="modal-overlay absolute inset-0 bg-black/85 dark:bg-black/90 backdrop-blur-2xl transition-opacity duration-300"
      />

      {/* 2. Ambient Theater Glow behind video */}
      <div
        aria-hidden="true"
        className="absolute w-[80vw] max-w-[900px] h-[50vh] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,173,0,0.18)_0%,transparent_70%)] blur-[90px] pointer-events-none"
      />

      {/* 3. Modal Shell */}
      <div
        ref={modalRef}
        className="modal-panel relative w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-2xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-neutral-900/90 text-white">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono font-medium text-room-amber uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-room-amber animate-pulse" />
              PITCH 88S • ROOM241
            </span>
            <div className="hidden sm:block text-xs text-neutral-300 font-sans font-medium">
              Rémi Brocart — Fondateur &amp; Directeur Artistique
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la vidéo de présentation (Échap)"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-room-amber/50"
          >
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider opacity-70">Échap</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Viewport (16:9) */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src="https://www.youtube-nocookie.com/embed/Bg9Pce0Qqg0?autoplay=1&rel=0&modestbranding=1&playsinline=1"
            title="Rémi Brocart — Vidéo de présentation Room241"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Footer Meta & Direct Booking Action */}
        <div className="px-5 sm:px-6 py-4 bg-neutral-900/95 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-center gap-3 text-neutral-400 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 text-room-amber font-mono font-semibold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              DOUBLE CULTURE TECH &amp; MARQUE
            </span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hidden md:inline text-neutral-300">Rigueur d'ingénieur, créativité B2B &amp; culture du résultat</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <TrackedButton
              eventName="click_calendar_booking"
              eventData={{ location: 'video_modal_cta' }}
              href="https://calendar.app.google/VHHhkb2uunEeRVt67"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-room-amber hover:bg-room-amberHover text-black text-xs font-semibold tracking-wide transition-colors shadow-sm w-full sm:w-auto"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Réserver 30 min avec Rémi</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </TrackedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
