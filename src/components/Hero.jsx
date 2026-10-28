import React, { useState } from 'react';
import { Play, ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  const scrollTo = (id) => (e) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#FFFFFF] text-[#09090B] border-b border-zinc-200/70 overflow-hidden"
    >
      {/* Flou très diffus et subtil en arrière-plan (#FFAD00 avec faible opacité et blur large) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,173,0,0.045)_0%,transparent_70%)] blur-[140px]" />
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Main Grid: Pitch text on Left / Responsive Video on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Value proposition for recruiters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#09090B]">
              Rigueur d'ingénieur, vision stratégique &amp; exécution 360°.
            </h1>

            <p className="text-base sm:text-lg text-[#3F3F46] font-normal leading-relaxed max-w-xl">
              Après un parcours en Sciences de l'Ingénieur, je me suis orienté vers le marketing, la communication et le digital à l'ISEG Lille. Aujourd'hui, je travaille sur des projets qui mêlent identité visuelle, création vidéo et expérience de marque. Du stand événementiel aux contenus réalisés sur le terrain, j'aime donner forme aux idées et les rendre concrètes.
            </p>

            {/* CTAs sobres sans boîtes lourdes */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#hornetsecurity"
                onClick={scrollTo('hornetsecurity')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <span>Découvrir les réalisations</span>
                <span className="text-[#FFAD00]">↓</span>
              </a>

              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3F3F46] hover:text-[#09090B] px-3 py-3 transition-colors"
              >
                <span>Planifier un échange</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
              </a>
            </div>

            {/* Repères synthétiques sobres */}
            <div className="pt-8 border-t border-zinc-100 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#09090B] block tracking-tight">
                  3 ans
                </span>
                <span className="text-xs text-[#71717A] block mt-0.5">
                  Lead créatif cybersécurité
                </span>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#09090B] block tracking-tight">
                  +4 000
                </span>
                <span className="text-xs text-[#71717A] block mt-0.5">
                  Leads B2B salons
                </span>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#09090B] block tracking-tight">
                  2h48
                </span>
                <span className="text-xs text-[#71717A] block mt-0.5">
                  Marathon (Discipline)
                </span>
              </div>
            </div>

          </motion.div>

          {/* Right: Integrated Pitch Video (16:9, responsive, rounded-2xl, border-zinc-200/80) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-sm group">
              
              {/* 16:9 Aspect Video Container */}
              <div className="relative aspect-video w-full">
                {isPlayingInline ? (
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/Bg9Pce0Qqg0?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                    title="Présentation vidéo de Rémi Brocart"
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => setIsPlayingInline(true)}
                    role="button"
                    tabIndex={0}
                    aria-label="Lancer la vidéo de présentation"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsPlayingInline(true);
                      }
                    }}
                    className="relative w-full h-full cursor-pointer select-none group/cover"
                  >
                    <img
                      src="/assets/video-pitch-remi.jpg"
                      alt="Rémi Brocart — Présentation vidéo"
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover/cover:scale-105"
                      loading="eager"
                    />

                    {/* Gradient léger */}
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover/cover:bg-black/20" />

                    {/* Play Button avec halo ambré discret #FFAD00 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,173,0,0.4)] transition-transform duration-200 group-hover/cover:scale-110">
                        <Play className="w-6 h-6 fill-current ml-0.5 text-black" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
            
            <p className="text-xs text-[#71717A] mt-2.5 text-center">
              Vidéo de présentation • 1 min 28 s
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
