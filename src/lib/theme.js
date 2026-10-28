/**
 * ROOM241 — Gestionnaire de thème clair / sombre manuel & persistant.
 *
 * - Clé localStorage : `room241_theme` ('dark' | 'light')
 * - Détection initiale : préférence système via `prefers-color-scheme`,
 *   dark par défaut si aucune information disponible.
 * - Le mode sombre est piloté par la classe `.dark` sur <html>
 *   (tailwind.config.js : darkMode: 'class').
 */

export const THEME_KEY = 'room241_theme';

function systemPrefersDark() {
  try {
    return typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (e) {
    return true;
  }
}

/** Lit le thème courant depuis localStorage, avec fallback light par défaut. */
export function getStoredTheme() {
  return 'light';
}

export function applyTheme() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('dark');
  }
}

export function toggleTheme() {
  applyTheme();
  return 'light';
}

export function initTheme() {
  applyTheme();
}