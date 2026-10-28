import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SectionFreshData() {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  return (
    <section
      id="fresh-data"
      className="py-24 sm:py-32 bg-[#FFFFFF] text-[#09090B] border-b border-zinc-200/70 scroll-mt-16"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-12">
        
        {/* Titre sobre */}
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
            Fresh Data — Financement &amp; Stratégie Contenu
          </h2>
          <p className="text-sm sm:text-base text-[#3F3F46] mt-2">
            Identité graphique de la campagne de financement, visuels pour les passages médias et montage d'interviews vidéo (salon MEDFEL).
          </p>
        </div>

        {/* Lecteur Vidéo 16:9 Façade Statique */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-neutral-950 shadow-sm">
          {isPlayingVideo ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/mf6eguKkok8?autoplay=1&rel=0&modestbranding=1&playsinline=1"
              title="Fresh Data - Interview MEDFEL"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              onClick={() => setIsPlayingVideo(true)}
              role="button"
              tabIndex={0}
              aria-label="Lancer la vidéo interview Fresh Data MEDFEL"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsPlayingVideo(true);
                }
              }}
              className="relative w-full h-full cursor-pointer select-none group"
            >
              <img
                src="/assets/fresh-data-video-cover.jpg"
                alt="Production vidéo salon MEDFEL et campagne Ulule — Fresh Data"
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/25 transition-opacity duration-300 group-hover:bg-black/15" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,173,0,0.4)] transition-transform duration-200 group-hover:scale-110">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-0.5 text-black" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3 colonnes de texte brut aérées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-4">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Contexte
            </h3>
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              Solution SaaS de pige publicitaire et de veille concurrentielle multicanale (tracts promos, prospectus, spots radio) pour la grande distribution. Nécessité de vulgariser les flux de données promo et de financer le lancement.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Action
            </h3>
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              Création de l'architecture graphique de la campagne Ulule, habillages visuels pour les chroniques radio du fondateur, dossiers commerciaux B2B et captation vidéo terrain au salon MEDFEL à Perpignan.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
              Résultat
            </h3>
            <p className="text-sm text-[#3F3F46] leading-relaxed">
              Campagne Ulule financée avec succès et ouverture d'échanges qualifiés avec les centrales d'achats (Auchan, Grand Frais, E.Leclerc).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
