import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, FileText, ArrowRight } from 'lucide-react';

export default function ParcoursHero({
  identity,
  manifesto,
  photo,
  onOpenCvModal,
  onOpenLightbox,
}) {
  return (
    <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* Photographie d'ouverture : Rémi et sa copine face à la mer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 order-2 lg:order-1"
        >
          <div
            onClick={() => onOpenLightbox(0)}
            role="button"
            tabIndex={0}
            aria-label="Agrandir la photographie d'ouverture"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(0);
              }
            }}
            className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5] max-h-[560px] w-full rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm group cursor-pointer"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#09090B] opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md">
              <Maximize2 className="w-4 h-4" />
            </div>

            <div className="absolute bottom-4 left-5 right-5 flex items-baseline justify-between text-white text-xs">
              <span className="font-medium tracking-wide">
                {photo.caption}
              </span>
              <span className="text-white/70 text-[11px] font-mono">
                {photo.place}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#71717A] mt-2 px-1">
            Photographie personnelle • Prise de vue numérique
          </p>
        </motion.div>

        {/* Présentation introductive & Manifeste */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 order-1 lg:order-2 space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-[#52525B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
            <span>{identity?.brand} • Mon parcours</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#09090B] leading-[1.08]">
            {manifesto?.title}
          </h1>

          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
            {manifesto?.paragraphs?.[0]}
          </p>

          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
            {manifesto?.paragraphs?.[1]}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 bg-white text-[#09090B] text-xs font-semibold hover:bg-zinc-50 transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4 text-[#FFAD00]" />
              <span>Consulter le CV synthétique</span>
            </button>

            <a
              href="#experiences"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#52525B] hover:text-[#09090B] transition-colors"
            >
              <span>Voir le parcours détaillé</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

