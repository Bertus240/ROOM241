/**
 * ============================================================================
 * MODULE ARCHIVÉ : AUTHENTIFICATION ANALYTICS (DÉSACTIVÉ PAR DÉCISION OPTION 1)
 * Studio ROOM241 • Rémi Brocart
 *
 * Décision d'architecture (Consolidation Upgrade 05) :
 * - L'authentification client-side (SHA-256 dans le bundle) a été désactivée.
 * - Tous les mots de passe et hashs compromis ont été purgés.
 * - Le module est conservé à des fins d'archive technique pour une future
 *   transition vers une solution backend sécurisée (Vercel Serverless / HttpOnly).
 * ============================================================================
 */

export const IS_ANALYTICS_ENABLED = false;

export async function hashPassword(_password) {
  // Désactivé
  return '';
}

export function getLockoutStatus() {
  return { locked: false, remainingSeconds: 0 };
}

export async function authenticateAnalytics(_password) {
  return {
    success: false,
    error: "L'accès Analytics privé est temporairement désactivé conformément aux consignes de sécurité (absence de backend d'authentification dédié)."
  };
}

export function isAnalyticsAuthenticated() {
  return false;
}

export function logoutAnalytics() {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.removeItem("room241_analytics_session_token");
  }
}
