import React from 'react';

/**
 * Utilitaires de formatage typographique strict
 * Garantit qu'aucun chiffre, pourcentage, comparateur ou unité n'est orphelin ou coupé à la ligne.
 */
export function formatNbsp(text) {
  if (!text) return '';
  return String(text)
    // Espace insécable après symbole comparateur (ex: "> 150" -> ">\u00A0150")
    .replace(/([><≥≤~])\s+(\d+)/g, '$1\u00A0$2')
    // Espace insécable entre groupes de chiffres (ex: "+4 000" -> "+4\u00A0000")
    .replace(/(\+?\d+)\s+(\d+)/g, '$1\u00A0$2')
    // Espace insécable avant % ou € ou $ (ex: "100 %" -> "100\u00A0%")
    .replace(/(\d+)\s+([%€$])/g, '$1\u00A0$2')
    // Espace insécable entre chiffre et unité courte
    .replace(/(\d+)\s+(jour|jours|m²|h|leads|visiteurs|clients|contacts)/gi, '$1\u00A0$2');
}

/**
 * Composant d'En-tête de Badges Hiérarchisé pour Cartes Projets — Studio ROOM241
 * 
 * RÈGLES DE HIÉRARCHIE VISUELLE ET DE DÉBORDEMENT MESURABLES :
 * - Niveau 1 (Information principale) : Catégorie / Contexte. Format pilule compacte
 *   avec puce ambrée, fond noir 65% dépoli, texte ambré mono.
 *   Sur desktop large (>= 1024px) : libellé éditorial complet.
 *   Sur tablette & mobile (< 1024px) : variante concise shortTag pour garantir 0 débordement.
 * - Niveau 2 (Résultat / Métrique) : Valeur numérique en premier (jaune #FFAD00 mono gras),
 *   libellé secondaire compact en zinc-200. Espace insécable et whitespace-nowrap stricts.
 * - Niveau 3 (Compléments) : Rejetés STRICTEMENT hors de l'en-tête, placés en zone basse
 *   éditoriale de la carte (tags de compétences et métrique secondaire de footer).
 * 
 * GESTION MULTI-RÉSOLUTIONS :
 * - Desktop large (>= 1024px) : alignement horizontal justify-between (Tag à gauche, Métrique à droite).
 * - Tablette & Mobile (< 1024px) : disposition étagée verticale ordonnée (Tag ligne 1, Métrique ligne 2).
 *   Élimine tout risque de collision ou de rognage sur écran 768px, 390px et 320px.
 */
export default function ProjectBadgeHeader({ project, className = '' }) {
  if (!project) return null;

  // Niveau 1 : Catégorie / Discipline principale
  const primaryTag = project.editorialTag || project.tag || project.category;
  const shortTag = project.shortTag || null;

  // Niveau 2 : Résultat ou Métrique clé
  const metric = project.metricBadge;

  const hasTag = Boolean(primaryTag);
  const hasMetric = Boolean(metric && metric.value);
  const badgeCount = (hasTag ? 1 : 0) + (hasMetric ? 1 : 0);

  if (badgeCount === 0) return null;

  return (
    <div
      className={`relative z-10 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-3 pointer-events-none ${className}`}
      data-badge-layout={badgeCount === 1 ? 'single' : 'dual'}
      data-badges-count={badgeCount}
    >
      {/* NIVEAU 1 — INFORMATION PRINCIPALE (CATÉGORIE / CONTEXTE) */}
      {hasTag && (
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 shadow-sm max-w-full shrink-0 self-start">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)] shrink-0"
            aria-hidden="true"
          />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#FFAD00] font-mono leading-none truncate max-w-[260px] sm:max-w-none">
            {shortTag ? (
              <>
                <span className="lg:hidden">{shortTag}</span>
                <span className="hidden lg:inline">{primaryTag}</span>
              </>
            ) : (
              primaryTag
            )}
          </span>
        </div>
      )}

      {/* NIVEAU 2 — RÉSULTAT OU MÉTRIQUE CHIFCRÉE */}
      {hasMetric && (
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/20 shadow-md text-white shrink-0 self-start lg:self-auto">
          <span className="font-mono font-bold text-xs sm:text-sm text-[#FFAD00] tracking-tight whitespace-nowrap leading-none">
            {formatNbsp(metric.value)}
          </span>
          {metric.label && (
            <span className="text-[10px] sm:text-[11px] text-zinc-200 font-medium tracking-wide whitespace-nowrap leading-none">
              {formatNbsp(metric.label)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
