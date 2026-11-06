import React from 'react';

/**
 * SupportsUsagesMarquee — Bandeau horizontal défilant pour « Déclinaisons graphiques & supports de communication »
 * 
 * Spécifications validées :
 * - Défilement infini ultra-fluide 60/120 FPS via animation CSS GPU native.
 * - Pause naturelle au survol et au focus clavier.
 * - Prise en charge de prefers-reduced-motion (mode statique / scroll natif doux).
 * - Masques de fondu progressif latéraux gauche et droite.
 * - Conçu pour les 6 catégories de supports réelles :
 *   1. Salons professionnels
 *   2. Stands & booths
 *   3. Bannières web
 *   4. Bannières e-mail
 *   5. Réseaux sociaux
 *   6. Supports print
 * - Zéro texte technique parasite (« Défilement continu », « Survol pour pause »).
 */

export const DECLINAISONS_CATEGORIES = [
  'Salons professionnels',
  'Stands & booths',
  'Bannières web',
  'Bannières e-mail',
  'Réseaux sociaux',
  'Supports print'
];

export default function SupportsUsagesMarquee({
  items = DECLINAISONS_CATEGORIES,
  className = ''
}) {
  const safeItems = items && items.length > 0 ? items : DECLINAISONS_CATEGORIES;

  // Répétition double : avec transform: translate3d(-50%, 0, 0), la boucle se réinitialise à l'exact subpixel
  const repeatedItems = [...safeItems, ...safeItems];

  return (
    <div
      role="region"
      aria-label="Déclinaisons graphiques et supports de communication"
      className={`relative w-full overflow-hidden select-none group/marquee rounded-xl border border-zinc-200/80 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/60 py-2.5 ${className}`}
    >
      <style>{`
        @keyframes declinaisons-marquee-anim {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .declinaisons-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          animation: declinaisons-marquee-anim 24s linear infinite;
          will-change: transform;
        }
        .group\\/marquee:hover .declinaisons-marquee-track,
        .declinaisons-marquee-track:hover,
        .group\\/marquee:focus-within .declinaisons-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .declinaisons-marquee-track {
            animation: none;
            overflow-x: auto;
            width: 100%;
            justify-content: flex-start;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
      `}</style>

      {/* Masque dégradé gauche */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-zinc-50 dark:from-zinc-900 via-zinc-50/90 dark:via-zinc-900/90 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Masque dégradé droit */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-zinc-50 dark:from-zinc-900 via-zinc-50/90 dark:via-zinc-900/90 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Piste de défilement CSS sans rupture */}
      <div className="declinaisons-marquee-track">
        {repeatedItems.map((category, idx) => {
          const isDuplicate = idx >= safeItems.length;
          return (
            <div
              key={`${category}-${idx}`}
              className="inline-flex items-center shrink-0 px-2 sm:px-2.5"
              aria-hidden={isDuplicate ? 'true' : undefined}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/90 dark:border-white/15 shadow-2xs text-xs font-semibold tracking-tight hover:border-[#FFAD00]/60 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.6)] shrink-0" />
                <span className="whitespace-nowrap font-medium text-zinc-900 dark:text-zinc-100">{category}</span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700 ml-3 sm:ml-4 select-none" aria-hidden="true">
                •
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
