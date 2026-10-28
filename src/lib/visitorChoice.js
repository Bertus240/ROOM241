/**
 * ROOM241 — Préférences de visite (choix de mesure, RGPD).
 *
 * NB : nommage volontairement neutre afin que les chemins de modules ne
 * déclenchent pas les filtres des bloqueurs de publicité (ERR_BLOCKED_BY_CLIENT).
 *
 * - Aucun traceur ne s'exécute sans choix explicite de l'utilisateur.
 * - Le choix est stocké en `localStorage` (pas de cookie).
 * - Conservation max ~13 mois : au-delà, le choix expire et le bandeau
 *   est présenté à nouveau (données locales purgées).
 */

export const CONSENT_KEY = 'room241_notice_choice';
export const CONSENT_TS_KEY = 'room241_notice_ts';
export const ANALYTICS_EVENTS_KEY = 'room241_events_log';
export const PAGE_VIEWS_KEY = 'room241_view_count';

/* ~13 mois en millisecondes (398 jours) */
export const RETENTION_MS = 398 * 24 * 60 * 60 * 1000;

export function getConsentState() {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    const ts = parseInt(localStorage.getItem(CONSENT_TS_KEY) || '0', 10);
    if (value !== 'accepted' && value !== 'refused') return 'pending';
    if (!ts || Date.now() - ts > RETENTION_MS) return 'expired';
    return value;
  } catch (err) {
    return 'pending';
  }
}

export function hasAnalyticsConsent() {
  return getConsentState() === 'accepted';
}

export function saveConsent(choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
    localStorage.setItem(CONSENT_TS_KEY, String(Date.now()));
    if (choice === 'refused') purgeLocalAnalytics();
  } catch (err) {
    console.error('Failed to save choice:', err);
  }
}

export function purgeLocalAnalytics() {
  try {
    localStorage.removeItem(ANALYTICS_EVENTS_KEY);
    localStorage.removeItem(PAGE_VIEWS_KEY);
  } catch (err) {
    console.error('Failed to purge local data:', err);
  }
}

export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_TS_KEY);
  } catch (err) {
    console.error('Failed to reset choice:', err);
  }
  purgeLocalAnalytics();
}
