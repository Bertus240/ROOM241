import React from 'react';
import { ArrowLeft, ArrowUpRight, Grid } from 'lucide-react';
import { projectsData } from '../data/projects';
import TrackedButton from './actions/TrackedButton';

/**
 * CaseStudyNavigation — Navigation unifiée de bas de page pour toutes les études de cas.
 * Assure la continuité éditoriale circulaire :
 * Hornetsecurity → Fresh Data → Résin'Architecte → Jardimax → Hornetsecurity.
 */
export default function CaseStudyNavigation({ currentSlug, navigate }) {
  const currentProject = projectsData[currentSlug] || {};
  const nextSlug = currentProject.nextSlug || 'hornetsecurity';
  const prevSlug = currentProject.prevSlug || 'jardimax';

  const nextProject = projectsData[nextSlug] || projectsData['hornetsecurity'];
  const prevProject = projectsData[prevSlug] || projectsData['jardimax'];

  const nextHref = nextProject.destination || `/realisations/${nextProject.slug}`;
  const prevHref = prevProject.destination || `/realisations/${prevProject.slug}`;

  const handleNav = (href) => (e) => {
    if (e) e.preventDefault();
    if (navigate) {
      navigate(href);
    } else {
      window.location.href = href;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNav(nextHref)();
    }
  };

  return (
    <nav
      aria-label="Navigation entre études de cas"
      className="border-t border-zinc-200/80 dark:border-white/10 pt-12 sm:pt-16 mt-16 sm:mt-24 space-y-8"
    >
      {/* 1. Barre de navigation discrète (Précédent / Tous les projets) */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
        {/* Lien étude précédente */}
        <a
          href={prevHref}
          onClick={handleNav(prevHref)}
          className="inline-flex items-center gap-2 py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors group"
          aria-label={`Étude précédente : ${prevProject.projectName || prevProject.title}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="font-semibold">Précédent :</span>
          <span className="text-zinc-500 dark:text-zinc-400 truncate max-w-[180px] sm:max-w-[260px]">
            {prevProject.projectName || prevProject.title}
          </span>
        </a>

        {/* Retour à la vue d'ensemble */}
        <a
          href="/projets"
          onClick={handleNav('/projets')}
          className="inline-flex items-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors font-semibold"
          aria-label="Retour à l'ensemble des projets"
        >
          <Grid className="w-3.5 h-3.5 text-[#FFAD00]" />
          <span>Tous les projets</span>
        </a>
      </div>

      {/* 2. Carte maîtresse d'appel d'air : étude de cas suivante */}
      <div
        role="link"
        tabIndex={0}
        aria-label={`Découvrir l'étude de cas suivante : ${nextProject.fullTitle || nextProject.title}`}
        onClick={handleNav(nextHref)}
        onKeyDown={handleNextKeyDown}
        className="group cursor-pointer block border border-zinc-200/80 dark:border-white/10 rounded-3xl bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl p-6 sm:p-9 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-[#FFAD00]/50"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFAD00] shadow-[0_0_8px_rgba(255,173,0,0.6)]" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-mono font-semibold">
                Étude de cas suivante
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
              <span className="text-[11px] uppercase tracking-[0.15em] text-[#FFAD00] font-mono font-semibold hidden sm:inline">
                {nextProject.sector || nextProject.shortTag || nextProject.statusLabel || 'Cas client'}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white group-hover:text-[#FFAD00] transition-colors tracking-tight leading-snug">
              {nextProject.projectName ? `${nextProject.projectName} — ${nextProject.shortTag || nextProject.sector || ''}` : nextProject.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-2">
              {nextProject.description || nextProject.subtitle}
            </p>
          </div>

          <div className="flex items-center self-start lg:self-center shrink-0">
            <span className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] text-xs font-sans font-semibold rounded-full group-hover:scale-103 transition-all shadow-md">
              <span>Découvrir l'étude</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FFAD00]" />
            </span>
          </div>
        </div>
      </div>

      {/* 3. CTA direct de contact / cadrage projet */}
      <div className="flex justify-end pt-2">
        <TrackedButton
          eventName="click_calendar_booking"
          eventData={{ location: `case_study_bottom_${currentSlug}` }}
          href="https://calendar.app.google/VHHhkb2uunEeRVt67"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-sans font-semibold text-xs rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
        >
          <span>Cadrer un projet similaire ↗</span>
        </TrackedButton>
      </div>
    </nav>
  );
}
