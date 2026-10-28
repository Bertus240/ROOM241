import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HornetsecurityBento() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section
      id="hornetsecurity"
      className="py-24 sm:py-32 bg-[#FFFFFF] text-[#09090B] border-b border-zinc-200/70 scroll-mt-16"
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 space-y-28 sm:space-y-36">

        {/* ========================================================
            BLOC 1 (EN PREMIER) — DESIGN SPRINT VIDÉO (HANOVRE)
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          {/* Titre sobre */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
              Hornetsecurity — Design Sprint Vidéo
            </h2>
            <p className="text-sm sm:text-base text-[#3F3F46] mt-2">
              Hanovre • Sprint créatif 36 heures chrono
            </p>
          </div>

          {/* Lecteur Vidéo 16:9 Façade Statique Click-to-Load */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-neutral-950 shadow-sm">
            {isVideoPlaying ? (
              <iframe
                src="https://www.youtube-nocookie.com/embed/-h8V1xBcDBQ?autoplay=1&rel=0&modestbranding=1"
                title="Hornetsecurity - Design Sprint Vidéo 3D"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Lancer la vidéo du Design Sprint 3D"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsVideoPlaying(true);
                  }
                }}
                className="relative w-full h-full cursor-pointer select-none group"
              >
                {/* Miniature de l'avatar 3D */}
                <img
                  src="/assets/hornetsecurity/hero-3d-avatar.jpg"
                  alt="Avatar virtuel 3D — Hornetsecurity Design Sprint Hanovre"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />

                {/* Voile sombre léger */}
                <div className="absolute inset-0 bg-black/25 transition-opacity duration-300 group-hover:bg-black/15" />

                {/* Bouton play sobre avec halo ambré discret #FFAD00 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,173,0,0.4)] transition-transform duration-200 group-hover:scale-110">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-0.5 text-black" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3 colonnes de texte brut aérées (sans carte fermée ni fond grisé) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-4">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Contexte
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Évolution de l'offre produit chez Hornetsecurity. Besoin d'un support visuel fort avec un personnage 3D pour présenter la vision en plénière.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Action
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Sprint de 36 heures sur place à Hanovre : conception, script, modélisation 3D et montage de la vidéo d'ouverture.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Résultat
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Vidéo livrée dans les temps pour la plénière, servant de support d'alignement pour la direction et les équipes techniques.
              </p>
            </div>
          </div>
        </motion.div>


        {/* ========================================================
            BLOC 2 (EN SECOND) — STANDS & SUPPORTS DE CAMPAGNE
           ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          {/* Titre sobre */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#09090B]">
              Stands événementiels &amp; Campagnes B2B
            </h2>
            <p className="text-sm sm:text-base text-[#3F3F46] mt-2">
              Salons européens (FIC, it-sa, InfoSec) et acquisition omnicanale (+71k abonnés)
            </p>
          </div>

          {/* Galerie épurée des visuels réels en grand format (sans étiquette collée) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            
            {/* Visuel 1 : Campagne Proofpoint SharePoint */}
            <div className="space-y-3">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 flex items-center justify-center group">
                <img
                  src="/assets/hornetsecurity/proofpoint-sharepoint-real.png"
                  alt="Affiche de campagne — The biggest risk in your SharePoint"
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/hornetsecurity/campaign-sharepoint.jpg';
                  }}
                />
              </div>
              <p className="text-xs text-[#71717A]">
                Affiche Paid Ads — The biggest risk in your SharePoint
              </p>
            </div>

            {/* Visuel 2 : Webinaire Mind the Gap */}
            <div className="space-y-3">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 flex items-center justify-center group">
                <img
                  src="/assets/hornetsecurity/webinar-mindthegap-real.png"
                  alt="Affiche webinaire — Et si votre messagerie s’arrêtait demain / Mind the Gap"
                  className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/hornetsecurity/webinar-mindthegap.jpg';
                  }}
                />
              </div>
              <p className="text-xs text-[#71717A]">
                Webinaire stratégique — Mind the Gap
              </p>
            </div>

            {/* Visuel 3 : Stand FIC (Forum InCyber) */}
            <div className="space-y-3">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 group">
                <img
                  src="/assets/hornetsecurity/booth-xxl.jpg"
                  alt="Stand d'exposition Forum InCyber FIC — Hornetsecurity"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-[#71717A]">
                Scénographie stand &gt; 150 m² — Forum InCyber (FIC) Lille
              </p>
            </div>

          </div>

          {/* 3 colonnes de texte brut sous les images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 pt-4">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Contexte
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Déploiement de l'image de marque sur de grands salons professionnels européens et sur les campagnes d'acquisition web (+71k abonnés).
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Action
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Conception graphique et habillage de stands internationaux, dont le stand de plus de 150 m² au Forum InCyber à Lille (avec e-karting), ainsi que le salon it-sa à Nuremberg, et création des assets publicitaires (Paid Ads, webinaires, plaquettes commerciales).
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                Résultat
              </h3>
              <p className="text-sm text-[#3F3F46] leading-relaxed">
                Résultat global : plus de 4 000 contacts qualifiés enregistrés par les équipes sur le salon FIC, avec une cohérence visuelle assurée sur l'ensemble des points de contact.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
