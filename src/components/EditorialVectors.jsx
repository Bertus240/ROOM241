import React from 'react';

/**
 * ============================================================================
 * ILLUSTRATIONS VECTORIELLES ÉDITORIALES ROOM241
 * Studio ROOM241 • Rémi Brocart
 *
 * SVGs légers, originaux, intégrés au design system :
 * Palette : #1A1918, #C5A880 (bronze), #FFAD00 (ambre), #FAF8F5 (ivoire), #71717A (zinc).
 * ============================================================================
 */

// 1. COMPRENDRE : Cadrage, analyse des besoins, observation du réel
export function VectorComprendre({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Cercle d'observation externe */}
      <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      {/* Réticule de visée / Cadrage */}
      <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 3V7M16 25V29M3 16H7M25 16H29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Point focal ambre */}
      <circle cx="16" cy="16" r="2.5" fill={accent} />
    </svg>
  );
}

// 2. CONCEVOIR : Architecture de marque, compas & hiérarchie visuelle
export function VectorConcevoir({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Compas d'architecte / Lignes de construction */}
      <path d="M16 4L6 26M16 4L26 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 18H22.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="4" r="2" fill={accent} />
      {/* Arc de rayon */}
      <path d="M12 24C13.2 24.6 14.6 25 16 25C17.4 25 18.8 24.6 20 24" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

// 3. PRODUIRE : Exécution de terrain, fabrication concrète & montage
export function VectorProduire({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Cadre de captation / Moniteur de régie */}
      <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Diagonale de clap / Déclencheur */}
      <path d="M4 12H28" stroke={color} strokeWidth="1.25" />
      <path d="M10 6L8 12M18 6L16 12M26 6L24 12" stroke={color} strokeWidth="1.25" />
      {/* Témoin d'enregistrement actif (REC) */}
      <circle cx="23" cy="20" r="2" fill={accent} />
      {/* Repère de lecture */}
      <path d="M13 17L17 19.5L13 22V17Z" fill="currentColor" />
    </svg>
  );
}

// 4. SCÉNOGRAPHIE & ESPACE (Arche & perspective des allées)
export function VectorScenographie({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Arche monumentale en perspective */}
      <path d="M6 26V10C6 8 8 6 16 6C24 6 26 8 26 10V26" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 26V13C10 12 11.5 10 16 10C20.5 10 22 12 22 13V26" stroke={color} strokeWidth="1.25" />
      {/* Lignes de fuite au sol */}
      <path d="M2 26H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 26L14 18M20 26L18 18" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="16" cy="6" r="1.5" fill={accent} />
    </svg>
  );
}

// 5. DIRECTION ARTISTIQUE & MARQUE (Système géométrique et typographique)
export function VectorBrandDA({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Carré de grille */}
      <rect x="5" y="5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      {/* Cercle d'harmonie */}
      <circle cx="20" cy="20" r="7" stroke={color} strokeWidth="1.5" />
      {/* Intersection & point d'accent */}
      <circle cx="18" cy="18" r="2" fill={accent} />
      <path d="M12 5V18M5 12H18" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 1.5" opacity="0.5" />
    </svg>
  );
}

// 6. VIDÉO & MOTION DESIGN (Format 16:9 / 9:16 synchronisé)
export function VectorMotionVideo({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Format paysage 16:9 */}
      <rect x="4" y="9" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Format vertical 9:16 incrusté */}
      <rect x="19" y="6" width="9" height="16" rx="1.5" stroke={color} strokeWidth="1.25" fill="#161514" />
      {/* Flèche de lecture */}
      <path d="M11 13.5L15 16L11 18.5V13.5Z" fill={accent} />
    </svg>
  );
}

// 7. FORMATION : SCEAU STRATÉGIQUE (Master ISEG Lille)
export function VectorMasterISEG({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Écusson d'académie épuré */}
      <path d="M16 4L6 8V16C6 22 10.5 26.5 16 28C21.5 26.5 26 22 26 16V8L16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 10L11 12.5V16C11 19.5 13 22 16 23C19 22 21 19.5 21 16V12.5L16 10Z" stroke={color} strokeWidth="1.25" />
      <circle cx="16" cy="15" r="2" fill={accent} />
    </svg>
  );
}

// 8. FORMATION : PRISME SCIENTIFIQUE (Baccalauréat Scientifique SI)
export function VectorScientific({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Prisme triangulaire équilatéral */}
      <path d="M16 5L5 25H27L16 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Rayon de réfraction interne */}
      <path d="M2 17L12 16L20 9L29 7" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M20 9L29 13" stroke={accent} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M20 9L29 19" stroke={color} strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

// 9. ANIMATION & DYNAMIQUE DE GROUPE (BAFA)
export function VectorBAFA({ className = "w-6 h-6", color = "#C5A880", accent = "#FFAD00" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Cercle d'équipe et de partage */}
      <circle cx="16" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 26C8 22 11.5 20 16 20C20.5 20 24 22 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Satellites de transmission */}
      <circle cx="6" cy="14" r="2.5" stroke={color} strokeWidth="1.25" />
      <circle cx="26" cy="14" r="2.5" stroke={color} strokeWidth="1.25" />
      <circle cx="16" cy="11" r="1.5" fill={accent} />
    </svg>
  );
}

