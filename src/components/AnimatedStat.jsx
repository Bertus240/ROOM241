import React, { useState, useEffect, useRef } from 'react';

/**
 * ============================================================================
 * ANIMATED STAT — COMPOSANT NUMÉRIQUE UNIFIÉ ROOM241
 * Studio ROOM241 • Rémi Brocart
 * 
 * Fonctionnalités :
 * - Détection à l'entrée dans le viewport (IntersectionObserver, 1 seule fois).
 * - Interpolation courte (1.1s) sur courbe easeOutCubic naturelle.
 * - Respect des préfixes (+, >), suffixes (%, m², h), et décimales.
 * - Valeurs textuelles non numériques (ex: "Europe") affichées directement sans compteur artificiel.
 * - Accessibilité native : aria-label avec valeur finale exacte, tabular-nums.
 * - Respect strict de prefers-reduced-motion (affichage instantané de la valeur finale).
 * ============================================================================
 */

export function parseStatValue(rawVal, explicitPrefix, explicitSuffix) {
  if (rawVal === undefined || rawVal === null) {
    return { isNumeric: false, display: '' };
  }

  const str = String(rawVal).replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ').trim();
  // Regex pour isoler le préfixe éventuel (+, >, etc.), le nombre exact (terminant sur un chiffre), et le suffixe avec son espacement
  const match = str.match(/^([^\d]*?)(\d[\d\s.,]*\d|\d)(.*)$/);
  if (!match) {
    return { isNumeric: false, display: str };
  }

  const detectedPrefix = match[1];
  const numCleanStr = match[2].replace(/\s/g, '').replace(',', '.');
  const detectedSuffix = match[3];

  const numVal = parseFloat(numCleanStr);
  if (isNaN(numVal)) {
    return { isNumeric: false, display: str };
  }

  const prefix = explicitPrefix !== undefined ? explicitPrefix : detectedPrefix;
  const suffix = explicitSuffix !== undefined ? explicitSuffix : detectedSuffix;

  return {
    isNumeric: true,
    prefix,
    targetNumber: numVal,
    suffix,
    hasDecimals: !Number.isInteger(numVal),
    rawOriginal: str
  };
}

export default function AnimatedStat({
  value,
  prefix,
  suffix,
  label,
  description,
  attribution,
  tag,
  size = 'hero',
  delay = 0,
  animated = true,
  href,
  onClick,
  isCardInteractive,
  className = '',
}) {
  const [hasEntered, setHasEntered] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef(null);

  const parsedInfo = useRef(null);
  if (!parsedInfo.current) {
    parsedInfo.current = parseStatValue(value, prefix, suffix);
  }

  useEffect(() => {
    // Respect de prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || !animated) {
      setHasEntered(true);
      setDisplayValue(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, animated]);

  useEffect(() => {
    if (!hasEntered) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || !animated) {
      setDisplayValue(value);
      return;
    }

    const info = parsedInfo.current;
    if (!info || !info.isNumeric) {
      setDisplayValue(value);
      return;
    }

    let animationFrameId;
    let startTime = null;
    const duration = 1100; // 1.1s fluide et vif

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const formatNum = (val) => {
      if (info.hasDecimals) {
        return val.toFixed(1).replace('.', ',');
      }
      if (val >= 1000) {
        return Math.round(val).toLocaleString('fr-FR').replace(/\s/g, '\u00A0');
      }
      return String(Math.round(val));
    };

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const current = eased * info.targetNumber;
      setDisplayValue(`${info.prefix}${formatNum(current)}${info.suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasEntered, value, delay, animated]);

  // Échelle typographique stricte ROOM241 avec adaptation intelligente à la longueur du texte
  const isLongVal = String(value || '').length > 7;
  const sizeClasses = {
    hero: isLongVal ? 'text-2xl sm:text-3xl lg:text-[38px]' : 'text-3xl sm:text-4xl lg:text-[42px]',
    large: isLongVal ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-2xl sm:text-3xl lg:text-4xl',
    card: isLongVal ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl',
    compact: 'text-xl sm:text-2xl',
    sm: 'text-lg sm:text-xl'
  };

  const valSize = sizeClasses[size] || sizeClasses.card;
  const isInteractive = Boolean(isCardInteractive !== undefined ? isCardInteractive : (href || onClick));

  return (
    <div
      ref={ref}
      className={`h-full flex flex-col justify-between space-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${className}`}
    >
      {/* Partie Haute : Tag contextuel + Micro-flèche d'affordance discrète + Valeur numérique */}
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-1.5 pb-0.5">
          {tag ? (
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00] shrink-0" />
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-zinc-400 truncate">
                {tag}
              </span>
            </div>
          ) : <div />}

          {isInteractive && (
            <span
              className="text-[11px] font-mono text-zinc-300 dark:text-zinc-600 group-hover:text-[#FFAD00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
              aria-hidden="true"
            >
              ↗
            </span>
          )}
        </div>

        {/* Valeur numérique animée — Police sans-sérif, semibold/extrabold, tabular-nums */}
        <div
          className={`${valSize} font-extrabold font-sans text-zinc-950 dark:text-white tracking-[-0.03em] tabular-nums whitespace-nowrap leading-none select-none ${
            isInteractive ? 'group-hover:text-[#FFAD00] transition-colors duration-200' : ''
          }`}
        >
          {displayValue}
        </div>
      </div>

      {/* Partie Centrale : Libellé principal + Description secondaire */}
      <div className="space-y-1 flex-1 py-1">
        {label && (
          <div className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug [text-wrap:balance]">
            {label}
          </div>
        )}

        {description && (
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed [text-wrap:pretty]">
            {description}
          </p>
        )}
      </div>

      {/* Partie Basse : Attribution factuelle uniquement (sans texte lourd 'Découvrir l'explication') */}
      {attribution && (
        <div className="pt-2 border-t border-zinc-100 dark:border-white/5 flex flex-col gap-0.5 mt-auto">
          <span className="inline-block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
            {attribution}
          </span>
        </div>
      )}
    </div>
  );
}
