import React from 'react';

/**
 * ============================================================================
 * BADGE — SYSTÈME MODERNE DE BADGES & TAGS ÉDITORIAUX (ROOM241)
 * Studio ROOM241 • Rémi Brocart
 *
 * Famille de badges moderne, hiérarchisée et accessible :
 * - 'category' : Catégorie éditoriale ou discipline (puce ambrée, fond dépoli).
 * - 'skill'    : Compétence ou expertise métier (fond satiné, liséré fin).
 * - 'metric'   : Résultat ou indicateur chiffré (verre dépoli, valeur mise en avant).
 * - 'tool'     : Outil ou technologie d'atelier (typographie technique soignée).
 * - 'format'   : Format ou support de production (1080p 60fps, 16:9, Affiche).
 * - 'status'   : Statut contextuel ou disponibilité (puce statut pulsante).
 * ============================================================================
 */

export default function Badge({
  children,
  variant = 'skill', // 'category' | 'skill' | 'metric' | 'tool' | 'format' | 'status'
  size = 'md',       // 'sm' | 'md' | 'lg'
  icon: Icon,
  active = false,
  interactive = false,
  onClick,
  className = '',
  ...props
}) {
  const isClickable = interactive || Boolean(onClick);

  // Tailles proportionnées
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-[11px] px-2.5 py-1 gap-1.5',
    lg: 'text-xs px-3.5 py-1.5 gap-2'
  };

  // Styles par variante sémantique
  const variantClasses = {
    category: active
      ? 'bg-[#1A1918] text-[#FFAD00] border-[#FFAD00]/60 shadow-xs'
      : 'bg-black/60 backdrop-blur-md text-[#FFAD00] border-white/15 hover:border-[#FFAD00]/50 shadow-2xs font-mono uppercase tracking-wider',
    
    skill: active
      ? 'bg-[#1A1918] text-white border-[#1A1918] shadow-xs'
      : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 border-zinc-200/90 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30 shadow-2xs font-sans',
    
    metric: active
      ? 'bg-[#FFAD00] text-black font-extrabold border-[#FFAD00] shadow-sm'
      : 'bg-[#1A1918]/90 text-white border-white/20 hover:border-[#FFAD00]/60 shadow-sm font-sans font-bold tabular-nums',
    
    tool: active
      ? 'bg-[#1A1918] text-white border-[#FFAD00]/60'
      : 'bg-zinc-100/90 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 font-mono text-[11px]',
    
    format: 'bg-zinc-900/85 text-zinc-300 border-white/10 font-mono text-[11px] tracking-wide',
    
    status: 'bg-white/95 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border-zinc-200/80 dark:border-white/15 font-sans font-medium'
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;
  const selectedVariant = variantClasses[variant] || variantClasses.skill;

  const Tag = isClickable ? 'button' : 'span';
  const interactiveProps = isClickable
    ? {
        type: 'button',
        onClick,
        className: `inline-flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFAD00] ${
          active ? 'scale-102' : 'hover:scale-102 active:scale-98'
        } ${selectedSize} ${selectedVariant} ${className}`,
        ...props
      }
    : {
        className: `inline-flex items-center justify-center rounded-full border transition-colors select-none ${selectedSize} ${selectedVariant} ${className}`,
        ...props
      };

  return (
    <Tag {...interactiveProps}>
      {/* Puce contextuelle pour category et status */}
      {(variant === 'category' || variant === 'status') && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
            variant === 'category'
              ? 'bg-[#FFAD00] shadow-[0_0_6px_rgba(255,173,0,0.8)]'
              : 'bg-[#FFAD00] animate-pulse'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Icône optionnelle */}
      {Icon && <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />}

      {/* Libellé */}
      <span className="leading-none whitespace-nowrap">{children}</span>
    </Tag>
  );
}

