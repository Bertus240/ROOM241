/**
 * ROOM241 — Gestionnaire des Deux Univers (Professionnel & Personnel)
 * 
 * - Univers Professionnel (Mode clair pur) : 'light' (défaut) — Studio ROOM241, créations, études de cas clients, CV.
 *   Routes : '/', '/projets', '/parcours', '/realisations/*', '/mentions-legales', '/politique-de-confidentialite'
 * - Univers Personnel (Véritable Mode sombre) : 'dark' — « Au-delà du travail », explorations, Meridian, rituels, endurance.
 *   Routes : '/hors-cadre', '/au-dela-du-travail'
 * 
 * Règle d'or : L'attribution du thème est déterministe et strictement pilotée par la route active.
 * Naviguer vers ou recharger une page professionnelle restaure impérativement le mode clair.
 * Le mode sombre est rigoureusement réservé à l'univers personnel.
 */

export const THEME_KEY = 'room241_theme';

const listeners = new Set();

/** Détecte si le chemin correspond à l'univers personnel sombre. */
export function isPersonalRoute(pathname) {
  if (!pathname || typeof pathname !== 'string') return false;
  const cleanPath = pathname.split('#')[0].split('?')[0];
  return (
    cleanPath === '/hors-cadre' ||
    cleanPath === '/au-dela-du-travail' ||
    cleanPath.startsWith('/hors-cadre/') ||
    cleanPath.startsWith('/au-dela-du-travail/')
  );
}

/** Résout le thème déterministe associé à une route ('dark' pour hors-cadre, sinon 'light'). */
export function getThemeForRoute(pathname) {
  return isPersonalRoute(pathname) ? 'dark' : 'light';
}

/** Lit le thème courant depuis le contexte du navigateur ou 'light' par défaut. */
export function getStoredTheme() {
  if (typeof window === 'undefined') return 'light';
  return getThemeForRoute(window.location.pathname);
}

/** Applique le thème spécifié ('light' ou 'dark') au DOM et notifie les composants abonnés. */
export function applyTheme(theme) {
  if (typeof document === 'undefined') return theme;

  const validTheme = theme === 'dark' ? 'dark' : 'light';

  try {
    localStorage.setItem(THEME_KEY, validTheme);
  } catch (e) {
    // Ignore quota errors
  }

  const root = document.documentElement;
  if (validTheme === 'dark') {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }

  listeners.forEach((callback) => {
    try {
      callback(validTheme);
    } catch (e) {
      console.error('[ROOM241] Erreur listener theme:', e);
    }
  });

  return validTheme;
}

/** Synchronise immédiatement le thème DOM en fonction de la route fournie. */
export function syncThemeWithRoute(pathname) {
  const targetTheme = getThemeForRoute(
    pathname || (typeof window !== 'undefined' ? window.location.pathname : '/')
  );
  return applyTheme(targetTheme);
}

/** Bascule entre l'univers professionnel ('light') et l'univers personnel ('dark'). */
export function toggleTheme() {
  const current = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  return applyTheme(next);
}

/** Initialise le thème au chargement sans flash selon l'URL active. */
export function initTheme(pathname) {
  const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
  return syncThemeWithRoute(path);
}

/** Permet aux composants React de s'abonner aux changements de thème. */
export function onThemeChange(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
