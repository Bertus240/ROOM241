import React, { useState, useEffect, useRef } from 'react';

/**
 * Composant partagé d'affichage et d'animation pour les statistiques de ROOM241.
 * 
 * Typographie : Sans-sérif éditoriale pure (Geist / Inter), graisse semibold (600),
 * chiffres proportionnels et lisibles avec tabular-nums pour la stabilité.
 * 
 * Animations :
 * 1. Révélation typographique : Opacité fluide + montée verticale douce (8px -> 0).
 * 2. Compteur numérique doux : Interpolation courte (1.1s) sur courbe ease-out naturelle.
 * 3. Accessibilité : Respect strict de prefers-reduced-motion (valeur directe statique).
 */
export default function AnimatedStat({
  value,
  label,
  description,
  tag,
  size = 'hero',
  delay = 0,
  className = '',
}) {
  const [hasEntered, setHasEntered] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef(null);

  // Analyse syntaxique pour décomposer la valeur (préfixe, nombre cible, suffixe)
  const parsed = useRef(null);
  if (!parsed.current) {
    // Normalisation des espaces insécables
    const cleanStr = String(value).replace(/&nbsp;/g, ' ').trim();
    // Regex pour isoler le nombre et le préfixe / suffixe
    // Exemples: "> 150 m²" -> prefix: "> ", num: 150, suffix: " m²"
    // "4 000+" -> prefix: "", num: 4000, suffix: "+"
    // "3+ ans" -> prefix: "", num: 3, suffix: "+ ans"
    // "116 %" -> prefix: "", num: 116, suffix: " %"
    // "Europe" -> aucun nombre
    const match = cleanStr.match(/^([^\d]*?)(\d[\d\s]*)(.*)$/);
    if (match) {
      const rawPrefix = match[1];
      const rawNumStr = match[2].replace(/\s/g, '');
      const rawSuffix = match[3];
      const numVal = parseInt(rawNumStr, 10);
      if (!isNaN(numVal)) {
        parsed.current = {
          isNumeric: true,
          prefix: rawPrefix,
          targetNumber: numVal,
          suffix: rawSuffix,
          hasThousands: rawNumStr.length > 3,
        };
      } else {
        parsed.current = { isNumeric: false };
      }
    } else {
      parsed.current = { isNumeric: false };
    }
  }

  useEffect(() => {
    // Détection de la préférence utilisateur pour la réduction de mouvement
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // Si mouvement réduit, afficher immédiatement la valeur finale exacte
    if (prefersReducedMotion) {
      setHasEntered(true);
      setDisplayValue(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    // Détection à l'entrée dans le viewport (IntersectionObserver)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [value]);

  // Décompte progressif fluide déclenché à l'entrée dans le viewport
  useEffect(() => {
    if (!hasEntered) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setDisplayValue(value);
      return;
    }

    const info = parsed.current;
    if (!info || !info.isNumeric) {
      setDisplayValue(value);
      return;
    }

    let animationFrameId;
    let startTime = null;
    const duration = 1100; // 1.1s : rythme vif, maîtrisé et éditorial

    // Easing naturel : easeOutExpo adouci pour une fin très délicate
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // Fonction de formatage d'un nombre entier avec espace insécable
    const formatNumber = (val) => {
      if (val >= 1000) {
        return Math.round(val).toLocaleString('fr-FR').replace(/\s/g, '\u00A0');
      }
      return String(Math.round(val));
    };

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentNumber = easedProgress * info.targetNumber;
      const formattedCurrent = formatNumber(currentNumber);
      setDisplayValue(`${info.prefix}${formattedCurrent}${info.suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Rétablir la valeur exacte originale pour garantir une précision absolue
        setDisplayValue(value);
      }
    };

    // Démarrage après un éventuel délai d'attente
    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasEntered, value, delay]);

  // Tailles de typographie selon le contexte d'affichage
  const valueSizeClass =
    size === 'hero'
      ? 'text-3xl sm:text-4xl lg:text-[40px]'
      : size === 'card'
      ? 'text-2xl sm:text-3xl lg:text-[32px]'
      : 'text-2xl sm:text-3xl';

  return (
    <div
      ref={ref}
      className={`space-y-1.5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      aria-label={`${value} - ${label || ''}`}
    >
      {/* Tag ou catégorie optionnelle */}
      {tag && (
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFAD00]" />
          <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-zinc-400">
            {tag}
          </span>
        </div>
      )}

      {/* Valeur numérique mise en avant — Police sans-sérif éditoriale, semibold 600, jamais condensée */}
      <div
        className={`${valueSizeClass} font-semibold font-sans text-[#09090B] tracking-[-0.03em] tabular-nums whitespace-nowrap leading-none py-1 select-none`}
      >
        {displayValue}
      </div>

      {/* Intitulé principal lisible et contrasté */}
      {label && (
        <div className="text-xs font-bold text-zinc-900 tracking-tight leading-snug">
          {label}
        </div>
      )}

      {/* Description secondaire discrète */}
      {description && (
        <p className="text-xs text-zinc-500 leading-relaxed max-w-[280px]">
          {description}
        </p>
      )}
    </div>
  );
}

