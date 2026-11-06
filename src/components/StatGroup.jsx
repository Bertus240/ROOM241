import React from 'react';
import AnimatedStat from './AnimatedStat';

/**
 * ============================================================================
 * STAT GROUP — SYSTÈME UNIFIÉ DE COMPOSITION ADAPTATIVE DES STATISTIQUES (ROOM241)
 * Studio ROOM241 • Rémi Brocart
 * 
 * Principes architecturaux & Art Direction :
 * - Grille CSS déterministe et adaptative selon le nombre d'éléments :
 *   • 1 stat : Élément centré avec largeur contrôlée (max-w-md sm:max-w-lg mx-auto).
 *   • 2 stats : 2 colonnes équilibrées (max-w-2xl mx-auto, 1 col mobile, 2 cols sm+).
 *   • 3 stats : 3 colonnes régulières (max-w-4xl mx-auto, 1 col mobile, 3 cols sm+).
 *   • 4 stats : 4 colonnes strictes sur desktop (lg:grid-cols-4), 2x2 sur tablette/mobile.
 *               ÉLIMINATION ABSOLUE ET DÉFINITIVE DE TOUT ORPHELIN ACCIDENTEL (3 + 1).
 *   • 5 stats : Composition éditoriale équilibrée (3 rangée 1 + 2 centrées en dessous).
 *   • 6 stats : 6 colonnes ou 3x2 (grid-cols-2 md:grid-cols-3 lg:grid-cols-6).
 *   • 7 stats : Composition éditoriale équilibrée (4 rangée 1 + 3 centrées en dessous).
 * - Alignement vertical automatique et étirement uniforme des cartes (items-stretch).
 * - Prise en charge des 3 variantes sémantiques : 'editorial', 'card', 'minimal'.
 * ============================================================================
 */

export default function StatGroup({
  stats = [],
  variant = 'editorial', // 'editorial' | 'card' | 'minimal'
  columns,               // override optionnel du nombre de colonnes
  size = 'hero',         // 'hero' | 'large' | 'card' | 'compact'
  align = 'center',      // 'center' | 'left'
  navigate,
  className = '',
  containerClassName = '',
}) {
  if (!stats || stats.length === 0) return null;

  const count = stats.length;

  // Calcul déterministe de la composition
  const getLayoutConfig = () => {
    if (columns) {
      switch (columns) {
        case 1:
          return { containerClass: 'grid grid-cols-1 max-w-md mx-auto', isGrid: true };
        case 2:
          return { containerClass: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto', isGrid: true };
        case 3:
          return { containerClass: 'grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto', isGrid: true };
        case 4:
        default:
          return { containerClass: 'grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto', isGrid: true };
      }
    }

    switch (count) {
      case 1:
        return {
          containerClass: 'w-full max-w-md sm:max-w-lg mx-auto',
          isGrid: false,
          isSingle: true,
        };
      case 2:
        return {
          containerClass: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto items-stretch',
          isGrid: true,
        };
      case 3:
        return {
          // 3 colonnes sur desktop et tablette (sm:grid-cols-3), 1 colonne confortable sur mobile
          containerClass: 'grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto items-stretch',
          isGrid: true,
        };
      case 4:
        return {
          // Règle absolue ROOM241 : STRICTEMENT 4 colonnes sur desktop (>= 1024px), 2x2 réguliers sur tablette et mobile.
          // ZÉRO orphelin, ZÉRO disposition accidentelle 3 + 1.
          containerClass: 'grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto items-stretch',
          isGrid: true,
        };
      case 5:
        return {
          // 3 cartes rangée 1, 2 cartes centrées rangée 2 sur desktop
          containerClass: 'flex flex-wrap justify-center items-stretch gap-4 sm:gap-6 max-w-5xl mx-auto',
          itemBasis: 'w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]',
          isGrid: false,
        };
      case 6:
        return {
          containerClass: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto items-stretch',
          isGrid: true,
        };
      case 7:
        return {
          // 4 cartes rangée 1, 3 cartes centrées rangée 2 sur desktop
          containerClass: 'flex flex-wrap justify-center items-stretch gap-4 sm:gap-6 max-w-6xl mx-auto',
          itemBasis: 'w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.2rem)]',
          isGrid: false,
        };
      default:
        return {
          containerClass: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto items-stretch',
          isGrid: true,
        };
    }
  };

  const { containerClass, itemBasis, isGrid, isSingle } = getLayoutConfig();

  // Style spécifique selon la variante éditoriale
  const getItemVariantClass = (isInteractive) => {
    switch (variant) {
      case 'card':
        return `p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-white/10 shadow-2xs transition-all duration-200 flex flex-col justify-between h-full ${
          isInteractive
            ? 'hover:border-[#FFAD00] hover:shadow-md hover:-translate-y-0.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]'
            : 'hover:border-zinc-300'
        }`;
      case 'minimal':
        return `p-2 flex flex-col justify-between h-full ${
          isInteractive
            ? 'cursor-pointer group hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]'
            : ''
        }`;
      case 'editorial':
      default:
        return `border-l-2 border-zinc-950 dark:border-[#FFAD00] pl-3.5 sm:pl-4 pr-3 py-2.5 rounded-r-xl transition-all duration-200 flex flex-col justify-between h-full ${
          isInteractive
            ? 'hover:border-[#FFAD00] hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 hover:pl-4.5 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00]'
            : ''
        }`;
    }
  };

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className={`w-full ${containerClass} ${className}`}>
        {stats.map((stat, idx) => {
          const isInteractive = Boolean(stat.href || stat.onClick);
          const handleItemClick = (e) => {
            if (stat.onClick) stat.onClick(e);
            if (stat.href) {
              if (e && e.preventDefault) e.preventDefault();
              const [path, hash] = stat.href.split('#');
              if (navigate && path) {
                navigate(path);
                if (hash) {
                  // Triple vérification différée pour garantir le défilement après rendu de la page cible
                  [60, 220, 500].forEach((delay) => {
                    setTimeout(() => {
                      const el = document.getElementById(hash);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, delay);
                  });
                }
              } else {
                window.location.href = stat.href;
              }
            }
          };

          const itemWrapperClass = isGrid
            ? getItemVariantClass(isInteractive)
            : isSingle
            ? getItemVariantClass(isInteractive)
            : `${itemBasis} shrink-0 ${getItemVariantClass(isInteractive)}`;

          const CardTag = stat.href ? 'a' : (isInteractive ? 'button' : 'div');
          const interactiveProps = isInteractive
            ? {
                onClick: handleItemClick,
                href: stat.href || undefined,
                type: CardTag === 'button' ? 'button' : undefined,
                tabIndex: 0,
                'aria-label': `${stat.value} — ${stat.label || ''}${stat.attribution ? ` (${stat.attribution})` : ''}`,
                'data-stat-card': 'true',
                onKeyDown: (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleItemClick(e);
                  }
                }
              }
            : {};

          return (
            <CardTag
              key={idx}
              className={`${itemWrapperClass} text-left select-none no-underline`}
              {...interactiveProps}
            >
              <AnimatedStat
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                description={stat.description}
                attribution={stat.attribution}
                tag={stat.tag}
                size={stat.size || size}
                delay={idx * 0.08}
                animated={stat.animated !== undefined ? stat.animated : true}
                isCardInteractive={isInteractive}
              />
            </CardTag>
          );
        })}
      </div>
    </div>
  );
}
