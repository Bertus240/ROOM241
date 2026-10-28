import React from 'react';
import { ArrowUpRight, Lock, Play } from 'lucide-react';
import TrackedButton from './actions/TrackedButton';
import FluidDistortionImage from './webgl/FluidDistortionImage';

export default function CaseStudies({ isPreview, isFullPage, navigate }) {
  const goToProject = (slug) => {
    if (navigate) {
      navigate(`/realisations/${slug}`);
    } else {
      window.location.href = `/realisations/${slug}`;
    }
  };

  const handleCardClick = (slug) => (e) => {
    if (e) e.stopPropagation();
    goToProject(slug);
  };

  const handleCardKeyDown = (slug) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToProject(slug);
    }
  };

  const handleNdaMailClick = (e) => {
    e.stopPropagation();
    window.location.href =
      "mailto:contact@room241.fr?subject=Demande%20de%20pr%C3%A9sentation%20%E2%80%94%20Dispositif%20%C3%A9v%C3%A9nementiel%20150m%C2%B2";
  };

  return (
    <section
      id="etudes-de-cas"
      className={`border-b border-room-border bg-room-bg text-room-text scroll-mt-24 ${
        isFullPage ? 'pt-28 pb-20 sm:pt-32 sm:pb-28' : 'py-20 sm:py-28'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10">

        {/* Section Header: High-End Editorial Direction */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 lg:mb-24 gap-8 border-b border-neutral-200 dark:border-white/10 pb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/50 dark:bg-white/[0.05] border border-neutral-300/50 dark:border-white/10 text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-room-amber" />
              <span>Portfolio · Réalisations sélectionnées</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] max-w-3xl text-neutral-900 dark:text-white">
              Des systèmes visuels pensés pour marquer les esprits et convertir.
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
              Direction artistique globale, activation terrain et performances quantifiables pour entreprises B2B exigeantes.
            </p>
          </div>
        </div>

        {/* Editorial Projects Flow */}
        <div className="space-y-20 lg:space-y-28">

          {/* ========================================================
              PROJET 01 : ÉDITEUR LOGICIEL SAAS & CLOUD (SOUS NDA)
             ======================================================== */}
          <article
            role="link"
            tabIndex={0}
            aria-label="Consulter le projet Éditeur SaaS & Cloud Enterprise"
            onClick={handleCardClick('editeur-saas-cloud')}
            onKeyDown={handleCardKeyDown('editeur-saas-cloud')}
            className="case-card group cursor-pointer block focus:outline-none"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Visual Presentation: Architectural Dark Monograph for NDA Case */}
              <div className="lg:col-span-7">
                <div data-cursor-interactive="true" className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#0F0F11] border border-neutral-200/80 dark:border-white/10 p-8 sm:p-12 flex flex-col justify-between shadow-xl transition-all duration-300 group-hover:border-room-amber/40">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-xs font-sans text-neutral-400">
                    <span className="font-mono text-room-amber font-semibold">01</span>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300 text-[11px] font-sans">
                      <Lock className="w-3 h-3 text-room-amber" />
                      <span>Présentation privée sous NDA</span>
                    </div>
                  </div>

                  {/* Center Architectural Statement */}
                  <div className="my-auto py-6">
                    <span className="text-xs font-mono text-room-amber uppercase tracking-wider block mb-2">
                      DISPOSITIF ÉVÉNEMENTIEL GRAND FORMAT (&gt; 150 M²)
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug max-w-xl">
                      Scénographie immersive, tunnel vidéo &amp; dispositif d'acquisition pour congrès tech européen.
                    </h4>
                  </div>

                  {/* Bottom Metric */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold font-sans text-room-amber">+4 000</div>
                      <div className="text-xs text-neutral-400 font-sans">Contacts qualifiés enregistrés collectivement au salon FIC</div>
                    </div>
                    <div className="text-xs font-sans text-neutral-300 font-medium group-hover:text-room-amber transition-colors flex items-center gap-1">
                      <span>Dossier privé</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5">
                <div className="text-xs font-sans text-neutral-500 dark:text-neutral-400 mb-2">
                  Événementiel &amp; Architecture B2B · 2026
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 text-neutral-900 dark:text-white group-hover:text-room-amber transition-colors duration-200">
                  Éditeur Logiciel SaaS &amp; Cloud Enterprise
                </h3>

                <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-sans mb-4">
                  Direction artistique globale et scénographie grand format (&gt; 150 m²) pour le principal salon européen d'infrastructure logicielle. Conception des parcours visiteurs et tunnel d'activation à haute conversion.
                </p>

                {/* Clean Impact Strip */}
                <div className="flex items-center gap-3 py-3.5 my-5 border-y border-neutral-200 dark:border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold font-sans text-room-amber">+4 000</span>
                  <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans">
                    contacts qualifiés enregistrés par les équipes au salon FIC (résultat global)
                  </span>
                </div>

                <TrackedButton
                  eventName="request_nda_case_study"
                  eventData={{ project: "editeur-saas-cloud" }}
                  onClick={handleNdaMailClick}
                  className="btn-primary inline-flex items-center gap-3 px-6 py-3 bg-room-text text-room-bg text-xs font-sans font-semibold rounded-xl hover:opacity-90 shadow-sm"
                >
                  <span>Recevoir la présentation privée</span>
                  <span className="text-room-amber font-bold">↗</span>
                </TrackedButton>
              </div>

            </div>
          </article>


          {/* ========================================================
              PROJET 02 : RÉSIN'ARCHITECTE (AVEC FLUID DISPLACEMENT)
             ======================================================== */}
          <article
            role="link"
            tabIndex={0}
            aria-label="Consulter le projet Résin'Architecte"
            onClick={handleCardClick('resin-architecte')}
            onKeyDown={handleCardKeyDown('resin-architecte')}
            className="case-card group cursor-pointer block focus:outline-none"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Visual Showcase: WebGL Fluid-Distorted Image Canvas */}
              <div className="lg:col-span-7 lg:order-2">
                <div data-cursor-interactive="true" className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-xl transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:border-room-amber/40">
                  <FluidDistortionImage
                    src="/assets/social-proof-ra/post_terrace_before_after.png"
                    alt="Direction artistique et savoir-faire chantiers — Résin'Architecte"
                    aspectRatio="16/9"
                    intensity={1.2}
                    debug={false}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Real Verified Metric Badge */}
                  <div className="absolute bottom-4 left-4 z-10 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center gap-2.5 pointer-events-none">
                    <span className="text-room-amber font-extrabold text-sm sm:text-base font-sans">
                      +219%
                    </span>
                    <span className="text-xs font-sans text-neutral-200">
                      portée organique dès le 1er mois
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5 lg:order-1">
                <div className="text-xs font-sans text-neutral-500 dark:text-neutral-400 mb-2">
                  BTP &amp; Revêtements Haut de Gamme · 2026
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 text-neutral-900 dark:text-white group-hover:text-room-amber transition-colors duration-200">
                  Résin'Architecte
                </h3>

                <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-sans mb-4">
                  Relance éditoriale complète de zéro. Stratégie de captation vidéo sur chantiers valorisant les gestes techniques et le savoir-faire artisanal pour asseoir l'autorité d'une marque premium.
                </p>

                {/* Clean Impact Strip */}
                <div className="flex items-center gap-3 py-3.5 my-5 border-y border-neutral-200 dark:border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold font-sans text-room-amber">+219%</span>
                  <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans">
                    de portée organique et 648 visites de profil générées sans publicité (0 € d'ads)
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-neutral-900 dark:text-white group-hover:text-room-amber transition-colors duration-150">
                  <span>Consulter l'étude de cas complète</span>
                  <ArrowUpRight className="w-4 h-4 text-room-amber transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </div>
          </article>


          {/* ========================================================
              PROJET 03 : FRESH DATA (AGTECH & CROWDFUNDING)
             ======================================================== */}
          <article
            role="link"
            tabIndex={0}
            aria-label="Consulter le projet Fresh Data"
            onClick={handleCardClick('fresh-data')}
            onKeyDown={handleCardKeyDown('fresh-data')}
            className="case-card group cursor-pointer block focus:outline-none"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Visual Showcase: HD Video Production Poster with Cinema Hover */}
              <div className="lg:col-span-7">
                <div data-cursor-interactive="true" className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 dark:border-white/10 shadow-xl transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:border-room-amber/40">
                  <img
                    src="/assets/fresh-data-video-cover.jpg"
                    alt="Production vidéo salon MEDFEL et campagne Ulule — Fresh Data"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Cinematic Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 transition-opacity duration-300 group-hover:opacity-75" />

                  {/* Stat Stamp */}
                  <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 flex items-center gap-2 pointer-events-none">
                    <span className="text-room-amber font-sans font-extrabold text-sm">+116%</span>
                    <span className="text-[11px] font-sans text-neutral-300">CAMPAGNE ULULE</span>
                  </div>

                  {/* Center Play Radar Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-16 h-16 rounded-full bg-room-amber/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-room-amber/90 group-hover:bg-room-amber text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,173,0,0.5)] transition-transform duration-300 ease-premium group-hover:scale-110">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5 text-black" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Video Badge */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white pointer-events-none">
                    <span className="px-3 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-sans text-neutral-200">
                      Captation salon MEDFEL · Vidéo B2B
                    </span>
                    <span className="hidden sm:inline-flex text-xs font-sans text-room-amber font-medium">
                      Voir l'étude &amp; la vidéo ↗
                    </span>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5">
                <div className="text-xs font-sans text-neutral-500 dark:text-neutral-400 mb-2">
                  AgTech &amp; Production Vidéo · 2026
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4 text-neutral-900 dark:text-white group-hover:text-room-amber transition-colors duration-200">
                  Fresh Data
                </h3>

                <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed font-sans mb-4">
                  Création de l'identité de marque, pilotage du financement participatif Ulule et production vidéo terrain (MEDFEL) pour capter une audience B2B dès la première année.
                </p>

                {/* Clean Impact Strip */}
                <div className="flex items-center gap-3 py-3.5 my-5 border-y border-neutral-200 dark:border-white/10">
                  <span className="text-2xl sm:text-3xl font-extrabold font-sans text-room-amber">+116%</span>
                  <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans">
                    sur l'objectif Ulule et signature des 50 premiers clients pionniers B2B
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-neutral-900 dark:text-white group-hover:text-room-amber transition-colors duration-150">
                  <span>Consulter l'étude &amp; la vidéo</span>
                  <ArrowUpRight className="w-4 h-4 text-room-amber transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </div>
          </article>

                <div className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-room-text group-hover:text-room-amber transition-colors duration-150">
                  <span>Consulter l'étude de cas complète</span>
                  <ArrowUpRight className="w-4 h-4 text-room-amber transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </div>
          </article>

        </div>

      </div>
    </section>
  );
}
