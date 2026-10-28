import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Play, Shield, Sparkles, Camera, Award, CheckCircle2, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { profileData } from '../data/profile';

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

              {/* Repères éditoriaux typographiques (style studio suisse épuré) */}
              <div className="pt-8 border-t border-zinc-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-left">
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#09090B] tracking-tight">
                    3+ ans
                  </div>
                  <div className="text-xs font-semibold text-zinc-900">
                    Expérience 360°
                  </div>
                  <p className="text-xs text-zinc-500 leading-snug">
                    Design graphique, scénographie et vidéo de terrain.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#09090B] tracking-tight">
                    4 000+
                  </div>
                  <div className="text-xs font-semibold text-zinc-900">
                    Contacts FIC
                  </div>
                  <p className="text-xs text-zinc-500 leading-snug">
                    Enregistrés collectivement sur le stand &gt; 150 m².
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#09090B] tracking-tight">
                    116 %
                  </div>
                  <div className="text-xs font-semibold text-zinc-900">
                    Objectif Ulule
                  </div>
                  <p className="text-xs text-zinc-500 leading-snug">
                    Campagne Fresh Data financée avec succès.
                  </p>
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
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFAD00] hover:bg-[#E59B00] text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,173,0,0.45)] transition-transform duration-200 group-hover:scale-110">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5 text-black" />
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
          2. SÉLECTION DES PROJETS MAJEURS
         ======================================================== */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 space-y-10 sm:space-y-12">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FFAD00] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Réalisations professionnelles
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#09090B] mt-1.5">
              Sélection de projets
            </h2>
          </div>

          <a
            href="/projets"
            onClick={handleNav('/projets')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#09090B] hover:text-[#FFAD00] transition-colors"
          >
            <span>Voir tous les projets</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Projet 1 mis en vedette : Hornetsecurity */}
        <div className="p-6 sm:p-10 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-[#09090B]">
                <span>Hornetsecurity • Salons européens</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#09090B]">
                Stand de plus de 150 m² au FIC, arche vidéo After Effects &amp; Captain Security
              </h3>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                Conception graphique et habillage de stands internationaux pour le leader européen de la cybersécurité Cloud (Forum InCyber à Lille, it-sa à Nuremberg). Création de la boucle motion design After Effects diffusée sur l'arche vidéo du stand, incarnation sur scène du personnage Captain Security et refonte du système de badges partenaires B2B.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#71717A]">
                <span>Stand FIC &gt; 150 m²</span>
                <span>•</span>
                <span>Arche vidéo After Effects</span>
                <span>•</span>
                <span>4 000+ contacts B2B recueillis (collectif FIC)</span>
              </div>

              <div className="pt-2">
                <a
                  href="/projets#hornetsecurity"
                  onClick={handleNav('/projets#hornetsecurity')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#09090B] hover:text-[#FFAD00] transition-colors"
                >
                  <span>Lire l'étude de cas complète</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 group">
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

        {/* Projets 2 & 3 en colonnes : Fresh Data & Résin'Architecte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Fresh Data */}
          <div
            onClick={handleNav('/projets#fresh-data')}
            className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all space-y-5"
          >
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-100">
              <img
                src="/assets/fresh-data-video-cover.jpg"
                alt="Fresh Data - Couverture vidéo salon MEDFEL et campagne Ulule"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#FFAD00]">AgTech &amp; Crowdfunding</span>
                <span className="text-zinc-400">Ulule 116 %</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] group-hover:text-zinc-700 transition-colors">
                Fresh Data
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Création de l'univers visuel sous validation de Marc-Henri Blarel, campagne Ulule financée à 116 %, visuels radio et captation vidéo au salon MEDFEL ayant ouvert des discussions avec Auchan, Grand Frais et E.Leclerc.
              </p>
            </div>

            <div className="pt-1 flex items-center gap-1.5 text-xs font-bold text-[#09090B]">
              <span>Découvrir le projet</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Résin'Architecte */}
          <div
            onClick={handleNav('/projets#resin-architecte')}
            className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200/80 hover:border-zinc-300 transition-all space-y-5"
          >
            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 flex items-center justify-center p-3">
              <img
                src="/assets/social-proof-ra/post_pool_craft.png"
                alt="Résin'Architecte - Publication démonstration artisanale"
                className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#FFAD00]">BTP Haut de gamme</span>
                <span className="text-zinc-400">+219 % portée · 648 visites</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#09090B] group-hover:text-zinc-700 transition-colors">
                Résin'Architecte
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Mise en valeur de chantiers réels, adaptation de l'identité visuelle, gabarits pour réseaux sociaux, visuels avant/après et supports d'aide à la vente (+219 % de portée organique, 648 visites de profil, 0 € de publicité payante).
              </p>
            </div>

            <div className="pt-1 flex items-center gap-1.5 text-xs font-bold text-[#09090B]">
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
