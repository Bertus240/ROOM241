import React, { useEffect, useState } from 'react';
import { ArrowLeft, Lock, ArrowRight, Play, ExternalLink, RotateCcw, Video } from 'lucide-react';
import { projectsData } from '../data/projects';
import TrackedButton from './actions/TrackedButton';
import { Reveal, SpotCard, stagger, ImageShutterReveal } from '../lib/motion';
import FluidDistortionImage from './webgl/FluidDistortionImage';

/* Figure de preuve sociale : cadre studio + affichage intégral sans recadrage abusif. */
function ProofFigure({ src, title, caption }) {
  const [errored, setErrored] = useState(false);

  return (
    <figure className="group rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 shadow-sm hover:border-room-amber/40 transition-colors duration-300 overflow-hidden flex flex-col justify-between">
      <div className="w-full bg-neutral-100 dark:bg-black/50 rounded-xl overflow-hidden p-2 flex items-center justify-center min-h-[180px]">
        {errored ? (
          <div className="flex aspect-[16/10] w-full items-center justify-center rounded-lg border border-dashed border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900/60">
            <span className="text-xs font-mono uppercase tracking-wider text-room-subtle">
              Visuel indisponible
            </span>
          </div>
        ) : (
          <img
            src={src}
            alt={title}
            loading="lazy"
            onError={() => setErrored(true)}
            className="w-full h-auto max-h-[380px] object-contain rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.015]"
          />
        )}
      </div>
      <figcaption className="pt-4 px-1">
        <span className="block text-sm font-semibold text-neutral-900 dark:text-white font-sans tracking-tight">
          {title}
        </span>
        <span className="block text-xs font-sans text-room-muted mt-1 leading-relaxed">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ProjectDetail({ slug, navigate }) {
  const project = projectsData[slug] || projectsData["editeur-saas-cloud"];
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  /* Projet suivant calculé dynamiquement sur l'ordre de déclaration de projectsData
     (boucle circulaire : le dernier projet renvoie vers le premier). */
  const projectOrder = Object.keys(projectsData);
  const currentIdx = projectOrder.indexOf(project.slug);
  const nextProject = projectsData[projectOrder[(currentIdx + 1) % projectOrder.length]] || project;

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPlayingVideo(false);
  }, [slug]);

  const handleBack = (e) => {
    e.preventDefault();
    if (navigate) navigate('/realisations');
    else window.location.href = '/realisations';
  };

  /* Transition fluide vers l'étude suivante : navigation SPA + scroll remis à zéro. */
  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (navigate) {
      navigate(`/realisations/${nextProject.slug}`);
    } else {
      window.location.href = `/realisations/${nextProject.slug}`;
    }
    window.scrollTo(0, 0);
  };

  const handleNextKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <article className="pt-32 pb-24 sm:pt-44 sm:pb-36 bg-room-bg text-room-text min-h-screen">
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10">
        
        {/* Navigation back link */}
        <div className="mb-12">
          <a
            href="/realisations"
            onClick={handleBack}
            className="link-arrow inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-room-muted hover:text-room-text transition-colors duration-150 py-2"
          >
            <ArrowLeft className="w-4 h-4 text-room-amber" aria-hidden="true" />
            <span>Retour aux réalisations</span>
          </a>
        </div>

        {/* Project Header Info */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 pb-12 border-b border-room-border">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono text-room-amber uppercase font-semibold">
              <span>{project.id}</span>
              <span>—</span>
              <span>{project.category}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-room-text leading-[1.05]">
              {project.title}
            </h1>

            <p className="text-lg sm:text-2xl text-room-muted font-sans font-normal leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-xs font-sans px-3 py-1 bg-room-surface border border-room-border rounded-md text-room-muted font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-room-border pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <div>
              <span className="text-[11px] font-mono text-room-subtle uppercase block mb-1">Impact Majeur</span>
              <div className="text-5xl sm:text-6xl font-black font-sans text-room-text tracking-tight mb-2">
                {project.metric}
              </div>
              <p className="text-xs text-room-muted leading-relaxed font-sans">
                {project.metricLabel}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-room-border text-xs font-sans text-room-muted">
              <div><strong className="text-room-text">Livrables :</strong> {project.deliverables}</div>
              <div><strong className="text-room-text">Année :</strong> {project.year}</div>
            </div>
          </div>
        </Reveal>

        {/* Grille des 4 métriques factuelles (Projet Résin'Architecte) — 4 colonnes desktop, 2x2 mobile */}
        {project.metrics && (
          <Reveal delay={50} className="mb-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="bg-neutral-100 dark:bg-neutral-900 border border-room-border rounded-2xl p-5 sm:p-6 flex flex-col gap-1"
              >
                <span className="text-2xl sm:text-3xl font-black font-sans text-neutral-900 dark:text-white tracking-tight">
                  {m.value}
                </span>
                <span className="text-xs font-sans font-semibold text-neutral-900 dark:text-white">
                  {m.label}
                </span>
                <span className="text-[11px] font-sans text-room-muted leading-snug">
                  {m.detail}
                </span>
              </div>
            ))}
          </Reveal>
        )}

        {/* Media Showcase Section — Mises en scène adaptées à chaque réalisation */}
        <Reveal delay={100} className="mb-24">
          {project.isNda ? (
            /* Monumental Architectural Monograph for SaaS NDA Case */
            <div className="w-full relative rounded-3xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-[#0C0C0E] text-white p-8 sm:p-16 shadow-2xl">
              {/* Architectural Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6 py-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-room-amber font-mono text-[11px] tracking-widest uppercase">
                  <Lock className="w-3.5 h-3.5" />
                  <span>DOSSIER CONFIDENTIEL · ACCORD NDA REQUIS</span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-extrabold font-sans tracking-tight leading-tight">
                  Pavillon Immersif 150 m² &amp; Tunnel Vidéo Haute Résolution
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed max-w-xl mx-auto">
                  La scénographie complète, les plans d'exécution et les modélisations 3D sont réservés aux marques et décideurs partenaires. Dossier technique complet transmis sous 24h ouvrées.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-left">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">SUPERFICIE</div>
                    <div className="text-lg font-mono font-bold text-room-amber">150 m²</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">CONGRÈS</div>
                    <div className="text-sm font-sans font-semibold text-white">Europe Tech</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">ACQUISITION</div>
                    <div className="text-lg font-mono font-bold text-room-amber">+4 000</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase">LIVRABLES</div>
                    <div className="text-sm font-sans font-semibold text-white">Stand &gt; 150 m² (FIC) + Vidéo</div>
                  </div>
                </div>

                <div className="pt-6">
                  <TrackedButton
                    eventName="request_nda_case_study"
                    eventData={{ project: project.slug }}
                    href={project.mailtoUrl}
                    className="btn-primary inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-100 text-xs font-sans font-semibold rounded-xl shadow-xl transition-transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <span>Recevoir la présentation privée (dossier 3D) ↗</span>
                  </TrackedButton>
                </div>
              </div>
            </div>
          ) : project.isVideo ? (
            /* Cinema Stage for Fresh Data */
            <div className="space-y-6">
              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-room-border bg-black shadow-2xl group">
                {isPlayingVideo ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${project.videoId || 'mf6eguKkok8'}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={project.videoTitle || "Fresh Data - Interview MEDFEL"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <div
                    onClick={() => setIsPlayingVideo(true)}
                    role="button"
                    tabIndex={0}
                    aria-label="Lancer la vidéo de l'interview MEDFEL Fresh Data"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsPlayingVideo(true);
                      }
                    }}
                    className="relative w-full h-full cursor-pointer select-none group/player"
                  >
                    {/* HD Poster Cover */}
                    <img
                      src={project.image || "/assets/fresh-data-video-cover.jpg"}
                      alt={project.videoTitle || "Interview MEDFEL Fresh Data"}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover/player:scale-105"
                    />

                    {/* Dark Cinema Vignette & Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50 transition-opacity duration-300 group-hover/player:opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase pointer-events-none">
                      <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white font-medium shadow-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-room-amber animate-ping" />
                        <span>CAPTATION TERRAIN · MEDFEL 2026</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-room-amber font-bold shadow-lg">
                        TÉMOIGNAGE CLIENT
                      </span>
                    </div>

                    {/* Center Radar Play Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="relative mb-3 flex items-center justify-center">
                        <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-room-amber/25 animate-ping opacity-75" />
                        <span className="absolute w-28 sm:w-32 h-28 sm:h-32 rounded-full bg-room-amber/15 animate-pulse" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-room-amber hover:bg-room-amberHover text-black flex items-center justify-center shadow-[0_0_40px_rgba(255,173,0,0.6)] transition-transform duration-300 ease-premium group-hover/player:scale-110">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1 text-black" />
                        </div>
                      </div>
                      <span className="text-white font-sans font-bold text-lg sm:text-2xl drop-shadow-md tracking-tight block">
                        Lancer l'interview MEDFEL
                      </span>
                      <span className="text-white/80 font-mono text-xs uppercase tracking-widest mt-1">
                        Haute définition • Témoignage filière agricole
                      </span>
                    </div>

                    {/* Bottom Metadata Info */}
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between gap-3 text-white pointer-events-none">
                      <div>
                        <div className="text-[11px] font-mono text-room-amber font-semibold uppercase tracking-wider mb-0.5">
                          PRODUCTION VIDÉO ROOM241
                        </div>
                        <div className="text-sm sm:text-base font-bold font-sans tracking-tight drop-shadow-sm">
                          Fresh Data — Démonstration terrain &amp; levée de fonds
                        </div>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-300">
                        Cliquez pour visionner
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sub-bar with Direct Links & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-room-border bg-room-surface">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-room-muted">
                  <span className="inline-flex items-center gap-1.5 text-room-amber font-semibold">
                    <Video className="w-3.5 h-3.5" />
                    Format 16:9 HD
                  </span>
                  <span className="text-room-border hidden sm:inline">•</span>
                  <span>Interviews sur stand · Salon MEDFEL</span>
                  <span className="text-room-border hidden sm:inline">•</span>
                  <span>Campagne Ulule (+116%)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {isPlayingVideo && (
                    <button
                      onClick={() => setIsPlayingVideo(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-room-bg hover:bg-neutral-800 border border-room-border text-xs font-mono text-room-muted hover:text-room-text transition-colors"
                      title="Réafficher la pochette"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Pochette</span>
                    </button>
                  )}
                  <a
                    href="https://www.youtube.com/watch?v=mf6eguKkok8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-room-bg hover:bg-room-amber/10 border border-room-border hover:border-room-amber/40 text-xs font-mono text-room-muted hover:text-room-amber transition-colors"
                  >
                    <span>Ouvrir sur YouTube</span>
                    <ExternalLink className="w-3 h-3 text-room-amber" />
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl border border-room-border bg-room-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] font-mono text-room-amber uppercase tracking-widest block mb-1">
                    CAPTATION TERRAIN MEDFEL · STRATÉGIE DE CONTENU B2B
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold font-sans text-neutral-900 dark:text-white">
                    Fresh Data — Vulgarisation technologique &amp; interviews filière
                  </h4>
                  <p className="text-xs text-room-muted font-sans mt-1">
                    Vidéo manifeste et micro-formats d'experts déployés pour installer la crédibilité auprès des coopératives agricoles.
                  </p>
                </div>
                <div className="shrink-0 px-5 py-3 rounded-xl bg-room-bg border border-room-border text-center">
                  <div className="text-2xl font-mono font-extrabold text-room-amber">+116%</div>
                  <div className="text-[10px] font-mono text-room-muted uppercase">Financement Ulule</div>
                </div>
              </div>
            </div>
          ) : (
            /* Immersive Craft Stage for Résin'Architecte */
            <div className="space-y-8">
              {/* Grand format principal : captation chantier haute résolution avec déformation fluide */}
              <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-room-border bg-neutral-950 shadow-2xl relative group">
                <FluidDistortionImage
                  src={project.image}
                  alt={project.alt}
                  aspectRatio="16/9"
                  priority={true}
                  intensity={1.25}
                  className="w-full h-full"
                />
                
                {/* Overlay discret de contexte avec gradient très local en bas (85% de l'image libre) */}
                <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none bg-gradient-to-t from-black/90 via-black/45 to-transparent pt-16 pb-6 px-6 sm:px-8">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-room-amber tracking-wider uppercase block mb-1">
                        IMMERSION CHANTIER &amp; SAVOIR-FAIRE
                      </span>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        Précision de pose aux abords d'une piscine résidentielle
                      </h4>
                      <p className="text-xs text-neutral-300 font-sans mt-1 max-w-xl hidden sm:block">
                        Captation des gestes techniques valorisant l'artisanat et la qualité minérale du revêtement drainant.
                      </p>
                    </div>
                    <div className="px-3.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-right shadow-lg">
                      <span className="text-xs font-mono text-room-amber font-bold block">+219% ORGANIQUE</span>
                      <span className="text-[10px] font-mono text-neutral-300">0 € D'ACHAT D'ESPACE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bandeau panoramique de validation Meta (ratio 4.7:1 préservé intégralement) */}
              {project.panoramicStats && (
                <div className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 sm:p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-room-muted uppercase">
                    <span className="text-room-amber font-semibold">VALIDATION ANALYTIQUE META BUSINESS SUITE</span>
                    <span>30 PREMIERS JOURS</span>
                  </div>
                  <div className="w-full overflow-hidden rounded-xl bg-neutral-50 dark:bg-black/40 p-2 sm:p-4 border border-neutral-200/60 dark:border-white/5">
                    <img
                      src={project.panoramicStats}
                      alt="Statistiques Meta Business Suite — Résin'Architecte"
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-neutral-200/60 dark:border-white/5 text-xs text-room-muted font-sans">
                    <span>Progression continue des consultations directes de profil et des interactions</span>
                    <span className="font-mono text-neutral-700 dark:text-neutral-300">648 visites de profil · 209 interactions (+62%)</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </Reveal>

        {/* 3-Act Récit Section */}
        <div className="max-w-4xl mb-24">
          <Reveal className="border-t border-room-border pt-10 mt-16">
            <span className="font-mono text-xs text-room-amber font-semibold uppercase tracking-wider block mb-3">
              {project.act1.title}
            </span>
            <p className="text-base sm:text-xl text-room-muted font-sans leading-relaxed">
              {project.act1.text}
            </p>
          </Reveal>

          <Reveal delay={50} className="border-t border-room-border pt-10 mt-16">
            <span className="font-mono text-xs text-room-amber font-semibold uppercase tracking-wider block mb-3">
              {project.act2.title}
            </span>
            <p className="text-base sm:text-xl text-room-muted font-sans leading-relaxed">
              {project.act2.text}
            </p>
          </Reveal>

          <Reveal delay={100} className="border-t border-room-border pt-10 mt-16">
            <span className="font-mono text-xs text-room-amber font-semibold uppercase tracking-wider block mb-3">
              {project.act3.title}
            </span>
            <p className="text-base sm:text-xl text-room-muted font-sans leading-relaxed">
              {project.act3.text}
            </p>
          </Reveal>
        </div>

        {/* Pièces justificatives & Données Meta — galerie de preuve sociale complète */}
        {project.proofAssets && project.proofAssets.length > 0 && (
          <Reveal className="mb-24">
            <div className="border-t border-room-border pt-10">
              <span className="font-mono text-xs text-room-amber font-semibold uppercase tracking-wider block mb-3">
                Pièces justificatives &amp; Données Meta
              </span>
              <p className="text-xs font-mono text-room-subtle uppercase tracking-wider mb-8">
                Captures Meta Business Suite — période de relance (30 jours) · 0 € Paid Ads
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.proofAssets.map((asset, idx) => (
                  <ProofFigure
                    key={idx}
                    src={asset.src}
                    title={asset.title}
                    caption={asset.caption}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Carte d'appel d'air : étude de cas suivante avec style glassmorphism premium */}
        <div className="border-t border-room-border pt-12 space-y-10">
          <div
            role="link"
            tabIndex={0}
            aria-label={`Découvrir l'étude de cas suivante : ${nextProject.title}`}
            onClick={handleNext}
            onKeyDown={handleNextKeyDown}
            className="group cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-zinc-200/80 dark:border-white/10 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl px-7 py-7 sm:px-9 sm:py-8 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-[#FFAD00]/50"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-mono block">
                  Étude de cas suivante
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white group-hover:text-[#FFAD00] transition-colors tracking-tight">
                {nextProject.title}
              </h3>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 px-6 py-3 bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] text-xs font-sans font-semibold rounded-full group-hover:scale-105 transition-all shadow-md">
              <span>Découvrir le projet</span>
              <span className="text-[#FFAD00]">↗</span>
            </span>
          </div>

          <div className="flex justify-center sm:justify-end">
            <TrackedButton
              eventName="click_calendar_booking"
              eventData={{ location: 'project_detail' }}
              href="https://calendar.app.google/VHHhkb2uunEeRVt67"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 bg-room-text text-room-bg font-sans font-semibold text-xs rounded-xl"
            >
              <span>Cadrer un projet similaire ↗</span>
            </TrackedButton>
          </div>
        </div>

      </div>
    </article>
  );
}
