/**
 * ROOM241 — Gestionnaire des Deux Univers (Professionnel & Personnel)
 * 
 * - Univers Professionnel (Mode clair) : 'light' (défaut) — Studio ROOM241, créations, études de cas clients, CV.
 * - Univers Personnel (Véritable Mode sombre) : 'dark' — « Au-delà du travail », explorations, Meridian, rituels, endurance.
 * 
 * Stockage persistant : `localStorage.getItem('room241_theme')`
 * Piloté par la classe `.dark` sur <html> (Tailwind `darkMode: 'class'`).
 */

export const THEME_KEY = 'room241_theme';

const listeners = new Set();

/** Lit le thème courant depuis localStorage (ou 'light' par défaut). */
export function getStoredTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch (e) {
    // Quota ou restriction de stockage
  }
  return 'light';
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

/** Bascule entre l'univers professionnel ('light') et l'univers personnel ('dark'). */
export function toggleTheme() {
  const current = getStoredTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  return applyTheme(next);
}

/** Initialise le thème au chargement sans flash. */
export function initTheme() {
  const theme = getStoredTheme();
  return applyTheme(theme);
}

/** Permet aux composants React de s'abonner aux changements de thème. */
export function onThemeChange(callback) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
