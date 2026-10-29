import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Play, Shield, Sparkles, Camera, Award, CheckCircle2, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';
import AnimatedStat from '../components/AnimatedStat';

export default function Home({ navigate }) {
  const [isPlayingPitch, setIsPlayingPitch] = useState(false);

  const { identity } = profileData;

  const handleNav = (path) => (e) => {
    if (e) e.preventDefault();
    if (navigate) navigate(path);
  };

  return (
    <div className="space-y-20 sm:space-y-32 pb-24">

      {/* ========================================================
          1. HERO : PRÉSENTATION & VIDÉO D'INTRODUCTION
         ======================================================== */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-zinc-200/70 overflow-hidden">
        {/* Lueur d'ambiance diffuse #FFAD00 */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,173,0,0.06)_0%,transparent_70%)] blur-[130px]" />
        </div>

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Colonne gauche : Positionnement affirmé & personnel */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200/80 text-xs font-semibold text-[#52525B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <span>{identity.brand} • {identity.name}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#09090B]">
                Design graphique, scénographie de marque &amp; production de contenus.
              </h1>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-xl font-normal">
                Après un parcours en Sciences de l’Ingénieur, je me suis orienté vers le marketing, la communication et le digital à l’ISEG Lille. Aujourd’hui, je travaille sur des projets qui mêlent identité visuelle, création vidéo et expérience de marque. Du stand événementiel aux contenus réalisés sur le terrain, j’aime donner forme aux idées et les rendre concrètes.
              </p>

              {/* Actions directes */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="/projets"
                  onClick={handleNav('/projets')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <span>Explorer les projets</span>
                  <ArrowRight className="w-4 h-4 text-[#FFAD00]" />
                </a>

                <a
                  href="/parcours"
                  onClick={handleNav('/parcours')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-200 bg-white text-[#09090B] text-xs font-semibold hover:bg-zinc-50 transition-colors"
                >
                  <span>Parcours &amp; univers</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>

              {/* Repères d'impact éditoriaux — Finition Glass Studio ROOM241 */}
              <div className="pt-8">
                <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border border-zinc-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x divide-zinc-200/80 text-left">
                  
                  {/* Stat 1 */}
                  <div className="sm:pr-6">
                    <AnimatedStat
                      value="3+ ans"
                      label="Expérience 360°"
                      description="Design graphique, scénographie et vidéo de terrain."
                      tag="Polyvalence"
                      size="hero"
                      delay={0}
                    />
                  </div>

                  {/* Stat 2 */}
                  <div className="sm:px-6 pt-5 sm:pt-0 border-t sm:border-t-0 border-zinc-200/60">
                    <AnimatedStat
                      value="4 000+"
                      label="Contacts FIC"
                      description="Enregistrés collectivement sur le stand > 150 m²."
                      tag="Événementiel"
                      size="hero"
                      delay={0.08}
                    />
                  </div>

                  {/* Stat 3 */}
                  <div className="sm:pl-6 pt-5 sm:pt-0 border-t sm:border-t-0 border-zinc-200/60">
                    <AnimatedStat
                      value="116 %"
                      label="Validé à 116 %"
                      description="Campagne Ulule Fresh Data validée avec succès."
                      tag="Crowdfunding"
                      size="hero"
                      delay={0.16}
                    />
                  </div>

                </div>
              </div>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="space-y-2.5">
                <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/90 bg-zinc-950 shadow-sm group">
                  {isPlayingPitch ? (
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/Bg9Pce0Qqg0?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                      title="Présentation vidéo de Rémi Brocart"
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div
                      onClick={() => setIsPlayingPitch(true)}
                      role="button"
                      tabIndex={0}
                      aria-label="Lancer la vidéo de présentation de Rémi Brocart"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setIsPlayingPitch(true);
                        }
                      }}
                      className="relative w-full h-full cursor-pointer select-none"
                    >
                      <img
                        src="/assets/video-pitch-remi.jpg"
                        alt="Rémi Brocart — Présentation vidéo de mon univers et de ma vision"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-black/25 transition-opacity group-hover:bg-black/15" />
                      
                      {/* Bouton de lecture explicite */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FFAD00]/30 animate-ping opacity-75" />
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_35px_rgba(255,173,0,0.6)] transition-all duration-200 group-hover:scale-110 active:scale-95">
                            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-[#71717A] px-1">
                  <span>Vidéo de présentation • Rémi Brocart</span>
                  <span className="font-medium text-zinc-500">1 min 28 s</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. SÉLECTION ÉDITORIALE DES RÉALISATIONS (HIGHLIGHTS)
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10 sm:space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-100">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Sélection éditoriale • Projets clés
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B]">
              Sélection de réalisations
            </h2>
            <p className="text-xs sm:text-sm text-[#71717A] max-w-xl font-normal leading-relaxed pt-0.5">
              Une sélection de collaborations concrètes articulant scénographie grand format, univers de marque et valorisation technique de terrain.
            </p>
          </div>

          <a
            href="/projets"
            onClick={handleNav('/projets')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#09090B] hover:text-[#FFAD00] transition-colors shrink-0"
          >
            <span>Voir tous les projets</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Projet 1 mis en majesté : Hornetsecurity (Scénographie > 150 m² & Marque) */}
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-50/90 border border-zinc-200/80 hover:border-zinc-300 transition-all space-y-8 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-[#09090B] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
                <span>Hornetsecurity • Salons européens</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B] group-hover:text-zinc-800 transition-colors">
                Stand de plus de 150 m² au FIC, arche vidéo After Effects &amp; Captain Security
              </h3>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Conception graphique et habillage de stands internationaux pour le leader européen de la cybersécurité Cloud (Forum InCyber à Lille, it-sa à Nuremberg). Création de la boucle motion design After Effects diffusée sur l'arche vidéo du stand, incarnation sur scène du personnage Captain Security et refonte du système de badges partenaires B2B.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#71717A]">
                <span className="font-medium text-zinc-900">Stand FIC &gt; 150 m²</span>
                <span>•</span>
                <span>Arche vidéo LED After Effects</span>
                <span>•</span>
                <span>4 000+ contacts B2B qualifiés</span>
              </div>

              <div className="pt-2">
                <a
                  href="/projets#hornetsecurity"
                  onClick={handleNav('/projets#hornetsecurity')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#09090B] hover:text-[#FFAD00] transition-colors"
                >
                  <span>Lire l'étude de cas complète</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
                <img
                  src="/assets/hornetsecurity/fic/Stand/IMG20250401075104.jpg"
                  alt="Scénographie événementielle, stand et arche vidéo d'accueil Hornetsecurity"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Projets 2 & 3 en colonnes équilibrées : Fresh Data & Résin'Architecte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Fresh Data : Retail Data & Crowdfunding */}
          <div
            onClick={handleNav('/projets#fresh-data')}
            className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-100 shadow-2xs">
                <img
                  src="/assets/fresh-data-video-cover.jpg"
                  alt="Fresh Data - Couverture vidéo salon MEDFEL et campagne Ulule"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#FFAD00]">Retail Data &amp; Crowdfunding</span>
                  <span className="text-zinc-500 font-mono text-[11px]">Validé à 116 % • MEDFEL</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] group-hover:text-zinc-700 transition-colors">
                  Fresh Data
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed">
                  Création de l'univers visuel et des supports de communication de Fresh Data aux côtés du fondateur Marc-Henri Blarel : vulgarisation d'une solution de pige publicitaire grande distribution, campagne Ulule validée à 116 % et supports commerciaux B2B.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#09090B]">
              <span>Découvrir le projet</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Résin'Architecte : Revêtements en résine & Contenu de terrain */}
          <div
            onClick={handleNav('/projets#resin-architecte')}
            className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center p-3 shadow-2xs">
                <img
                  src="/assets/social-proof-ra/post_pool_craft.png"
                  alt="Résin'Architecte - Démonstration technique de pose de résine drainante aux abords d'une piscine"
                  className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#FFAD00]">Revêtements de sol en résine</span>
                  <span className="text-zinc-500 font-mono text-[11px]">+219 % portée • Chantiers réels</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] group-hover:text-zinc-700 transition-colors">
                  Résin'Architecte
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed">
                  Résin’Architecte développe des solutions de revêtements de sol en résine pour les espaces intérieurs et extérieurs. De la moquette de pierre aux revêtements décoratifs, drainants ou appliqués sur béton, l'entreprise associe savoir-faire technique et recherche esthétique pour répondre à des usages variés.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#09090B]">
              <span>Découvrir le projet</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          3. PRÉSENTATION PERSONNELLE : LE VISAGE DERRIÈRE ROOM241
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-zinc-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Photographie authentique de Rémi Brocart */}
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative aspect-square w-48 sm:w-56 lg:w-64 rounded-3xl overflow-hidden border border-zinc-200/80 bg-zinc-100 shadow-sm">
                <img
                  src={identity.avatar}
                  alt="Rémi Brocart — Fondateur du Studio ROOM241"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Biographie naturelle & Lien LinkedIn explicite */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B]">
                Rémi Brocart
              </h2>

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed font-normal max-w-2xl">
                Je suis Rémi Brocart, designer et professionnel du marketing et de la communication digitale. J'aime relier la réflexion à la création, du cadrage d'un projet jusqu'à sa mise en œuvre. Avec ROOM241, je partage les projets, les idées et les réalisations qui illustrent cette approche.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={identity.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <span>Mon profil LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>

                <a
                  href="/parcours"
                  onClick={handleNav('/parcours')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52525B] hover:text-[#09090B] transition-colors"
                >
                  <span>Découvrir mon parcours complet</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. APERÇU PARCOURS & UNIVERS PERSONNEL
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-50 border border-zinc-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                Parcours • Hors-cadre
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B]">
                Le parcours, la photographie et l'endurance
              </h2>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Un designer ne s'arrête pas aux fichiers livrés. Découvrez mon parcours universitaire et professionnel, ma sélection photographique personnelle (prise de vue numérique) ainsi que l'exigence du marathon de Venise (02h48'25).
              </p>

              <div className="pt-2">
                <a
                  href="/parcours"
                  onClick={handleNav('/parcours')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#09090B] text-white text-xs font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <span>En savoir plus sur mon profil</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFAD00]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="aspect-square rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950">
                <img
                  src="/assets/autres/instagram/IMG20260403192340.jpg"
                  alt="Rémi et sa copine sur le pin maritime face à la mer"
                  className="w-full h-full object-cover object-[center_28%]"
                  loading="lazy"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950">
                <img
                  src="/assets/autres/marathon6.jpg"
                  alt="Marathon de Venise - Inscription officielle"
                  className="w-full h-full object-cover object-[center_35%]"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
